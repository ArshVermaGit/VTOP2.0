"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function getFacultyProfile() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  return await prisma.facultyProfile.findUnique({
    where: {
      userId: session.user.id
    },
    include: {
      user: true,
      proctees: {
          include: {
              user: true,
              attendance: true,
              marks: true
          }
      },
      courses: {
        include: {
          timeTable: true,
          registrations: {
            include: {
              student: {
                include: {
                  user: true
                }
              }
            }
          }
        }
      }
    }
  })
}

export async function getFacultyDashboardData() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'FACULTY') throw new Error("Unauthorized")

  const faculty = await prisma.facultyProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      user: true,
      courses: {
        include: {
          registrations: {
            include: {
              student: {
                include: {
                  user: true
                }
              }
            }
          },
          attendance: true,
          timeTable: true
        }
      },
      proctees: {
        include: {
          user: true,
          attendance: true,
          marks: true
        }
      },
      supervisedScholars: true,
      meetings: true,
      counsellingRecords: {
        include: {
          student: {
            include: {
              user: true
            }
          }
        }
      }
    }
  })

  return faculty
}

export async function getFacultyAdminData() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'FACULTY') throw new Error("Unauthorized")

  const faculty = await prisma.facultyProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      payrolls: {
        orderBy: { processedAt: 'desc' }
      },
      leaves: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  return faculty
}

export async function updateMarksBulk(courseId: string, marksData: { studentId: string, cat1?: number, cat2?: number, fat?: number, da1?: number, da2?: number, quiz?: number }[]) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'FACULTY') throw new Error("Unauthorized")

  const updates = marksData.map(async (data) => {
    const total = (data.cat1 || 0) + (data.cat2 || 0) + (data.fat || 0) + (data.da1 || 0) + (data.da2 || 0) + (data.quiz || 0)
    return prisma.marks.upsert({
      where: { 
        studentId_courseId: { 
          studentId: data.studentId, 
          courseId 
        } 
      },
      update: {
        cat1: data.cat1,
        cat2: data.cat2,
        fat: data.fat,
        da1: data.da1,
        da2: data.da2,
        quiz: data.quiz,
        total
      },
      create: {
        studentId: data.studentId,
        courseId,
        cat1: data.cat1 || 0,
        cat2: data.cat2 || 0,
        fat: data.fat || 0,
        da1: data.da1 || 0,
        da2: data.da2 || 0,
        quiz: data.quiz || 0,
        total
      }
    })
  })

  return await Promise.all(updates)
}

export async function getFacultyTimetable() {
  const faculty = await getFacultyProfile()
  if (!faculty) return []

  const courses = await prisma.course.findMany({
    where: { facultyId: faculty.id },
    include: {
      timeTable: true,
      registrations: {
        include: {
          student: true
        }
      }
    }
  })

  return courses.flatMap(c => c.timeTable.map(t => ({ ...t, course: c })))
}

export async function getProctees() {
  const faculty = await getFacultyProfile()
  if (!faculty) return []

  return await prisma.studentProfile.findMany({
    where: { proctorId: faculty.id },
    include: {
      user: true,
      attendance: {
        include: {
          course: true
        }
      },
      marks: {
        include: {
          course: true
        }
      }
    }
  })
}

export async function getClassesForAttendance() {
  const faculty = await getFacultyProfile()
  if (!faculty) return []

  return await prisma.course.findMany({
    where: { facultyId: faculty.id },
    select: {
      id: true,
      code: true,
      title: true,
      slot: true,
    }
  })
}

export async function getFacultyMeetings() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const faculty = await getFacultyProfile()
  if (!faculty) return []

  return await prisma.meeting.findMany({
    where: { facultyId: faculty.id },
    include: { student: { include: { user: true } } },
    orderBy: { date: 'desc' }
  })
}

export async function getFacultyCounsellingRecords() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const faculty = await getFacultyProfile()
  if (!faculty) return []

  return await prisma.counsellingRecord.findMany({
    where: { facultyId: faculty.id },
    include: { student: { include: { user: true } } },
    orderBy: { date: 'desc' }
  })
}

export async function getCourseStudents(courseId: string) {
  const registrations = await prisma.courseRegistration.findMany({
    where: { courseId, status: "REGISTERED" },
    include: { student: { include: { user: true } } }
  })
  return registrations.map(r => r.student)
}

export async function markAttendance(data: { courseId: string, date: Date, slot: string, students: { studentId: string, status: string }[] }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  const faculty = await getFacultyProfile()
  if (!faculty) throw new Error("Faculty profile not found")

  await prisma.attendanceLog.createMany({
    data: data.students.map(s => ({
      studentId: s.studentId,
      courseId: data.courseId,
      facultyId: faculty.id,
      date: data.date,
      status: s.status,
      slot: data.slot
    }))
  })

  for (const s of data.students) {
    const logs = await prisma.attendanceLog.findMany({
      where: { studentId: s.studentId, courseId: data.courseId }
    })

    const attended = logs.filter(l => l.status === "PRESENT" || l.status === "LATE" || l.status === "ON_DUTY").length
    const total = logs.length

    await prisma.attendance.upsert({
      where: { 
        studentId_courseId: {
          studentId: s.studentId,
          courseId: data.courseId
        }
      },
      update: {
        attendedClasses: attended,
        totalClasses: total,
        percentage: total > 0 ? (attended / total) * 100 : 0
      },
      create: {
        studentId: s.studentId,
        courseId: data.courseId,
        attendedClasses: attended,
        totalClasses: total,
        percentage: total > 0 ? (attended / total) * 100 : 0
      }
    })
  }

  return { success: true }
}
