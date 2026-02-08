"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function getParentProfile() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  return await prisma.parentProfile.findUnique({
    where: {
      userId: session.user.id
    },
    include: {
      user: true
    }
  })
}

export async function getStudentProfileByParent() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'PARENT') return null

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

export async function getParentWardMeetings() {
  const student = await getStudentProfileByParent()
  if (!student) return []

  return await prisma.meeting.findMany({
    where: { studentId: student.id },
    include: { faculty: { include: { user: true } } },
    orderBy: { date: 'desc' }
  })
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

export async function getParentWardPayments() {
    const student = await getStudentProfileByParent()
    if (!student) return []

    return await prisma.payment.findMany({
        where: { studentId: student.id },
        orderBy: { createdAt: 'desc' }
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

export async function getParentDashboardData() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'PARENT') return null

  const parentProfile = await prisma.parentProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      student: {
        include: {
          user: true,
          proctor: {
            include: { user: true }
          },
          attendance: {
            include: { course: true }
          },
          marks: {
            include: { course: true }
          },
          gradeHistories: true,
          payments: true,
          timeTable: {
            include: { course: true }
          }
        }
      }
    }
  })

  if (!parentProfile) return null

  const announcements = await prisma.communication.findMany({
    where: {
      OR: [
        { targetId: null },
        { targetId: parentProfile.studentId },
        { targetId: parentProfile.student?.batch },
      ]
    },
    orderBy: { date: 'desc' }
  })

  return {
    profile: parentProfile,
    announcements: announcements
  }
}
