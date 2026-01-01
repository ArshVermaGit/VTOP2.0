"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getStudentProfile() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  return await prisma.studentProfile.findFirst({
    where: {
      user: {
        username: session.user.name || ""
      }
    },
    include: {
      proctor: {
        include: {
          user: true
        }
      },
      user: true
    }
  })
}



export async function getTimetable() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.timeTable.findMany({
    where: { studentId: profile.id },
    include: { course: true }
  })
}

export async function getMarks() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.marks.findMany({
    where: { studentId: profile.id },
    include: { course: true }
  })
}

export async function getPayments() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.payment.findMany({
    where: { studentId: profile.id },
    orderBy: { dueDate: 'desc' }
  })
}

export async function getResearchProfile() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  const profile = await getStudentProfile()
  if (!profile) return null

  return await prisma.researchProfile.findUnique({
    where: { studentId: profile.id }
  })
}

export async function getExamSchedule() {
  return await prisma.examSchedule.findMany({
    orderBy: { examDate: 'asc' }
  })
}

export async function getLeaveRequests() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.leaveRequest.findMany({
    where: { studentId: profile.id },
    orderBy: { fromDate: 'desc' }
  })
}

export async function getThesisSubmission() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  const profile = await getStudentProfile()
  if (!profile) return null

  return await prisma.thesisSubmission.findUnique({
    where: { studentId: profile.id }
  })
}

export async function getServiceRequests() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.serviceRequest.findMany({
    where: { studentId: profile.id },
    orderBy: { requestDate: 'desc' }
  })
}

export async function getAttendance() {
  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.attendance.findMany({
    where: { studentId: profile.id },
    include: { course: { include: { faculty: { include: { user: true } } } } }
  })
}

export async function getAttendanceLogs() {
  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.attendanceLog.findMany({
    where: { studentId: profile.id },
    include: { course: true, faculty: { include: { user: true } }, student: { include: { user: true } } },
    orderBy: { date: 'desc' },
    take: 50
  })
}

export async function getGlobalAttendanceLogs() {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== "ADMIN") return []

  return await prisma.attendanceLog.findMany({
    include: { course: true, faculty: { include: { user: true } }, student: { include: { user: true } } },
    orderBy: { date: 'desc' },
    take: 100
  })
}

export async function getCourseDetails(courseId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  return await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      faculty: { include: { user: true } },
      materials: true,
      assignments: {
        include: {
          submissions: {
            where: {
              student: {
                user: {
                  username: session.user.name || ""
                }
              }
            }
          }
        }
      },
      announcements: {
        orderBy: { createdAt: 'desc' }
      },
      forumPosts: {
        include: {
          author: true,
          replies: {
            include: { author: true },
            orderBy: { createdAt: 'asc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}

export async function submitAssignment(assignmentId: string, fileUrl: string) {
  const profile = await getStudentProfile()
  if (!profile) throw new Error("Unauthorized")

  return await prisma.assignmentSubmission.upsert({
    where: {
      id: `${assignmentId}_${profile.id}` // Temporary unique ID logic if needed, or handle by unique constraint
    },
    update: {
      fileUrl,
      submittedAt: new Date()
    },
    create: {
      assignmentId,
      studentId: profile.id,
      fileUrl,
      status: 'SUBMITTED'
    }
  })
}

export async function postForumPost(courseId: string, title: string, content: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  return await prisma.forumPost.create({
    data: {
      courseId,
      authorId: (session.user as any).id,
      title,
      content
    }
  })
}

export async function postForumReply(postId: string, content: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  return await prisma.forumReply.create({
    data: {
      postId,
      authorId: (session.user as any).id,
      content
    }
  })
}

export async function postCourseAnnouncement(courseId: string, title: string, content: string) {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== "FACULTY") throw new Error("Unauthorized")

  const faculty = await getFacultyProfile()
  if (!faculty) throw new Error("Faculty profile not found")

  return await prisma.courseAnnouncement.create({
    data: {
      courseId,
      title,
      content
    }
  })
}

export async function getExamSchedules() {
  const profile = await getStudentProfile()
  if (!profile) return []

  const registrations = await prisma.courseRegistration.findMany({
    where: { studentId: profile.id, status: 'REGISTERED' },
    select: { courseId: true }
  })

  const courseIds = registrations.map(r => r.courseId)

  return await prisma.examSchedule.findMany({
    where: {
      courseId: { in: courseIds }
    },
    orderBy: { examDate: 'asc' }
  })
}

export async function getSeatAllocations() {
  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.seatAllocation.findMany({
    where: { studentId: profile.id },
    include: {
      examSchedule: true
    }
  })
}

export async function getDetailedMarks() {
  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.marks.findMany({
    where: { studentId: profile.id },
    include: {
      course: {
        include: { faculty: { include: { user: true } } }
      },
      reevaluation: true
    }
  })
}

export async function getGradeHistory() {
  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.gradeHistory.findMany({
    where: { studentId: profile.id },
    orderBy: [
      { semester: 'desc' },
      { courseCode: 'asc' }
    ]
  })
}

export async function getAcademicPerformance() {
  const profile = await getStudentProfile()
  if (!profile) return null

  const history = await getGradeHistory()
  
  // Basic CGPA calculation logic
  const totalCredits = history.reduce((acc, curr) => acc + curr.credits, 0)
  const totalPoints = history.reduce((acc, curr) => acc + (curr.credits * curr.gradePoint), 0)
  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00"

  // Semester-wise grouping
  const semesterWise = history.reduce((acc: any, curr) => {
    if (!acc[curr.semester]) {
      acc[curr.semester] = { credits: 0, points: 0, courses: [] }
    }
    acc[curr.semester].credits += curr.credits
    acc[curr.semester].points += (curr.credits * curr.gradePoint)
    acc[curr.semester].courses.push(curr)
    return acc
  }, {})

  const semesterPerformance = Object.entries(semesterWise).map(([sem, data]: [string, any]) => ({
    semester: sem,
    gpa: (data.points / data.credits).toFixed(2),
    credits: data.credits,
    courses: data.courses
  }))

  return {
    cgpa,
    totalCredits,
    semesterPerformance: semesterPerformance.sort((a, b) => b.semester.localeCompare(a.semester))
  }
}

export async function applyForReevaluation(marksId: string, type: 'SEE' | 'REVAL') {
  const profile = await getStudentProfile()
  if (!profile) throw new Error("Unauthorized")

  return await prisma.reevaluationRequest.create({
    data: {
      marksId,
      studentId: profile.id,
      type,
      status: 'PENDING',
      feePaid: true // Assuming payment happens before this action in a real app
    }
  })
}

export async function getFacultyProfile() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  return await prisma.facultyProfile.findFirst({
    where: {
      user: {
        username: session.user.name || ""
      }
    },
    include: {
      user: true,
      proctees: {
          include: {
              user: true
          }
      }
    }
  })
}

export async function getParentProfile() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  return await prisma.parentProfile.findFirst({
    where: {
      user: {
        username: session.user.name || ""
      }
    },
    include: {
      user: true
    }
  })
}

export async function getStudentProfileByParent() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  const parent = await getParentProfile()
  if (!parent || !parent.studentId) return null

  return await prisma.studentProfile.findUnique({
    where: { id: parent.studentId },
    include: {
      user: true,
      proctor: {
        include: { user: true }
      }
    }
  })
}

export async function getMeetings() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.meeting.findMany({
    where: { studentId: profile.id },
    include: { faculty: { include: { user: true } } },
    orderBy: { date: 'desc' }
  })
}

export async function getCounsellingRecords() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.counsellingRecord.findMany({
    where: { studentId: profile.id },
    include: { faculty: { include: { user: true } } },
    orderBy: { date: 'desc' }
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

export async function getParentWardMeetings() {
  const student = await getStudentProfileByParent()
  if (!student) return []

  return await prisma.meeting.findMany({
    where: { studentId: student.id },
    include: { faculty: { include: { user: true } } },
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

export async function adminOverrideAttendance(logId: string, newStatus: string) {
    const session = await getServerSession(authOptions)
    if ((session?.user as any)?.role !== "ADMIN") throw new Error("Unauthorized Admin")

    const log = await prisma.attendanceLog.update({
        where: { id: logId },
        data: { status: newStatus },
        include: { student: true, course: true }
    })

    const logs = await prisma.attendanceLog.findMany({
        where: { studentId: log.studentId, courseId: log.courseId }
    })
    const attended = logs.filter(l => l.status === "PRESENT" || l.status === "LATE" || l.status === "ON_DUTY").length
    const total = logs.length

    await prisma.attendance.update({
        where: { 
            studentId_courseId: {
                studentId: log.studentId,
                courseId: log.courseId
            }
        },
        data: {
            attendedClasses: attended,
            totalClasses: total,
            percentage: total > 0 ? (attended / total) * 100 : 0
        }
    })

    return log
}

export async function getParentWardAttendance() {
    const student = await getStudentProfileByParent()
    if (!student) return []

    return await prisma.attendance.findMany({
        where: { studentId: student.id },
        include: { course: { include: { faculty: { include: { user: true } } } } }
    })
}

export async function getParentWardAttendanceLogs() {
    const student = await getStudentProfileByParent()
    if (!student) return []

    return await prisma.attendanceLog.findMany({
        where: { studentId: student.id },
        include: { course: true, faculty: { include: { user: true } } },
        orderBy: { date: 'desc' },
        take: 30
    })
}

export async function getCourseRegistrations() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.courseRegistration.findMany({
    where: { studentId: profile.id },
    include: { course: { include: { faculty: { include: { user: true } } } } },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getCourses() {
  return await prisma.course.findMany({
    include: { faculty: { include: { user: true } } }
  })
}

export async function getCourseMaterials(courseId: string) {
  return await prisma.courseMaterial.findMany({
    where: { courseId }
  })
}

export async function registerCourse(courseId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  const profile = await getStudentProfile()
  if (!profile) throw new Error("Profile not found")

  return await prisma.courseRegistration.create({
    data: {
      studentId: profile.id,
      courseId,
      status: "REGISTERED",
      sem: "Winter 2024-25"
    }
  })
}

export async function dropCourse(registrationId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  return await prisma.courseRegistration.delete({
    where: { id: registrationId }
  })
}

export async function getAcademicEvents() {
  return await prisma.academicEvent.findMany({
    orderBy: { date: 'asc' }
  })
}

export async function getSemesterMilestones() {
  return await prisma.semesterMilestone.findMany({
    orderBy: { date: 'asc' }
  })
}

export async function getWardTimetable() {
    const student = await getStudentProfileByParent()
    if (!student) return []
  
    return await prisma.timeTable.findMany({
      where: { studentId: student.id },
      include: { course: true }
    })
}

export async function createLeaveRequest(data: { type: string, fromDate: Date, toDate: Date, reason: string }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  const profile = await getStudentProfile()
  if (!profile) throw new Error("Profile not found")

  return await prisma.leaveRequest.create({
    data: {
      studentId: profile.id,
      ...data,
      status: "PENDING"
    }
  })
}
