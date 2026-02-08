"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import * as DocumentEngine from "@/lib/engine/docs"
import * as SyncEngine from "@/lib/engine/sync"
import * as NotifyEngine from "@/lib/engine/notify"
import crypto from "crypto"
import { getStudentProfile } from "./student"
import type { GradeHistory, Attendance, TimeTable } from "@/types/student"

function generateSecureCode(length: number): string {
  const bytes = crypto.randomBytes(Math.ceil((length * 2) / 3) + 2)
  const base36 = BigInt("0x" + bytes.toString("hex")).toString(36)
  const clean = base36.replace(/[^a-z0-9]/gi, "").toUpperCase()
  if (clean.length >= length) {
    return clean.substring(0, length)
  }
  return clean + generateSecureCode(length - clean.length)
}

export async function getSecurityStatus() {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  return await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      twoFactorEnabled: true,
      lastLogin: true,
      securityAudits: {
        orderBy: { timestamp: 'desc' },
        take: 10
      },
      backupCodes: true
    }
  })
}

export async function toggle2FA(enabled: boolean) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  const userId = session.user.id

  if (enabled) {
      const secret = generateSecureCode(10)
      const codes = Array.from({ length: 5 }, () => generateSecureCode(6))
      
      await prisma.user.update({
          where: { id: userId },
          data: {
              twoFactorEnabled: true,
              twoFactorSecret: secret,
              backupCodes: JSON.stringify(codes)
          }
      })

      await prisma.securityAudit.create({
          data: {
              userId,
              event: '2FA_ENABLED',
              ipAddress: 'Unknown',
              device: 'Web Client'
          }
      })
      
      return { secret, codes }
  } else {
      await prisma.user.update({
          where: { id: userId },
          data: {
              twoFactorEnabled: false,
              twoFactorSecret: null,
              backupCodes: null
          }
      })

      await prisma.securityAudit.create({
          data: {
              userId,
              event: '2FA_DISABLED',
              ipAddress: 'Unknown',
              device: 'Web Client'
          }
      })

      return { success: true }
  }
}

export async function exportAcademicReport(type: 'GRADES' | 'ATTENDANCE' | 'FINANCE') {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  let data: Record<string, unknown>[] = []
  
  if (type === 'GRADES') {
      const student = await getStudentProfile()
      if (student) {
          const grades = await prisma.gradeHistory.findMany({ where: { studentId: student.id } })
          data = grades.map((g: GradeHistory) => ({ Course: g.courseTitle, Code: g.courseCode, Grade: g.grade, Credits: g.credits }))
      }
  } else if (type === 'ATTENDANCE') {
      const student = await getStudentProfile()
      if (student) {
          const att = await prisma.attendance.findMany({ where: { studentId: student.id }, include: { course: true } })
          data = att.map((a: Attendance) => ({ Course: a.course?.title, Code: a.course?.code, Percentage: a.percentage }))
      }
  }

  return await DocumentEngine.generateCSVExport(type, data)
}

export async function syncInstitutionalData(target: 'ATTENDANCE' | 'MARKS' | 'PROFILE') {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  const result = await SyncEngine.syncLegacyData(target)
  
  await prisma.securityAudit.create({
      data: {
          userId: session.user.id,
          event: `LEGACY_SYNC_${target}`,
          ipAddress: '127.0.0.1',
          device: 'CampusHub Engine'
      }
  })

  return result
}

export async function triggerNotification(target: 'EMAIL' | 'SMS', message: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  return await NotifyEngine.sendNotification(target, {
      to: session.user.email || session.user.mobile || "user@university.edu",
      subject: "CampusHub Institutional Alert",
      message: message
  })
}

export async function downloadTimetableICS() {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  const student = await getStudentProfile()
  if (!student) return null

  const timetable = await prisma.timeTable.findMany({
      where: { studentId: student.id },
      include: { course: true }
  })

  const events = timetable.map((t: TimeTable) => ({
      title: t.course?.title || "Untitled",
      description: `Type: ${t.course.type} | Venue: ${t.venue}`,
      location: t.venue,
      start: new Date().toISOString(), 
      end: new Date().toISOString()
  }))

  return NotifyEngine.generateICS(events)
}

export async function getBiometricReports() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const student = await getStudentProfile()
  if (!student) return []

  return await prisma.biometricReport.findMany({
    where: { studentId: student.id },
    orderBy: { date: 'desc' }
  })
}

export async function getHallTicketEligibility() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return { eligible: true, blockers: [] }

  const student = await getStudentProfile()
  if (!student) return { eligible: false, blockers: ['Profile not found'] }

  const attendance = await prisma.attendance.findMany({
    where: { studentId: student.id }
  })
  
  // Assuming 'results' is meant to be 'attendance' or another data source for GPA
  // and that 'gpa' is a property on items in 'results'.
  // If 'results' is a new variable, it needs to be defined.
  // For now, I'll assume it's a placeholder or a mistake and focus on the attendance part.
  // If 'results' was intended to be 'attendance', the GPA calculation would be incorrect.
  // I will apply the type changes to the existing attendance calculation.

  // The user's snippet introduced totalGpa and avgGpa, but without a 'results' array,
  // this part cannot be directly integrated without making assumptions about data structure.
  // I will only apply the type changes to the existing attendance calculation as per the instruction.

  const avgAttendance = attendance.length > 0 
    ? (attendance.reduce((sum: number, a: Attendance) => sum + (a.percentage || 0), 0) / attendance.length) 
    : 100 // Changed from 0100 to 100 to maintain logical fallback for percentage

  const dues = await prisma.payment.findMany({
    where: { studentId: student.id, status: 'PENDING' }
  })

  const blockers: string[] = []
  if (avgAttendance < 75) blockers.push('Attendance below 75%')
  if (dues.length > 0) blockers.push('Outstanding fee dues')

  return {
    eligible: blockers.length === 0,
    blockers,
    attendance: avgAttendance.toFixed(1),
    pendingDues: dues.length
  }
}
