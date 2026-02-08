"use server"

import prisma from "@/lib/prisma"
import { GradeHistory } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function getStudentProfile() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  return await prisma.studentProfile.findFirst({
    where: {
      userId: session.user.id
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
      id: `${assignmentId}_${profile.id}`
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
  if (!session?.user || !session.user.id) throw new Error("Unauthorized")

  return await prisma.forumPost.create({
    data: {
      courseId,
      authorId: session.user.id,
      title,
      content
    }
  })
}

export async function postForumReply(postId: string, content: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !session.user.id) throw new Error("Unauthorized")

  return await prisma.forumReply.create({
    data: {
      postId,
      authorId: session.user.id,
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
  
  const totalCredits = history.reduce((acc, curr) => acc + curr.credits, 0)
  const totalPoints = history.reduce((acc, curr) => acc + (curr.credits * curr.gradePoint), 0)
  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00"

  type SemesterData = { credits: number, points: number, courses: GradeHistory[] }
  const semesterWise = history.reduce((acc: Record<string, SemesterData>, curr) => {
    if (!acc[curr.semester]) {
      acc[curr.semester] = { credits: 0, points: 0, courses: [] }
    }
    acc[curr.semester].credits += curr.credits
    acc[curr.semester].points += (curr.credits * curr.gradePoint)
    acc[curr.semester].courses.push(curr)
    return acc
  }, {})

  const semesterPerformance = Object.entries(semesterWise).map(([sem, data]) => ({
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

export async function getResearchProfile() {
  const profile = await getStudentProfile()
  if (!profile) return null

  return await prisma.researchProfile.findUnique({
    where: { studentId: profile.id },
    include: {
      supervisor: { include: { user: true } },
      publications: true,
      progressReports: { orderBy: { submittedAt: 'desc' } },
      researchLetters: true
    }
  })
}

export async function getHostelStatus() {
  const profile = await getStudentProfile()
  if (!profile) return null

  const admission = await prisma.hostelAdmission.findFirst({
    where: { studentId: profile.id, type: 'ADMISSION' },
    orderBy: { appliedAt: 'desc' }
  })

  const maintenanceTickets = await prisma.hostelMaintenance.findMany({
    where: { studentId: profile.id },
    orderBy: { createdAt: 'desc' }
  })

  const consentForms = await prisma.hostelConsentForm.findMany({
    where: { studentId: profile.id },
    orderBy: { appliedAt: 'desc' }
  })

  return {
    admission,
    maintenanceTickets,
    consentForms
  }
}

export async function getMessMenus() {
    return await prisma.messMenu.findMany()
}

export async function getLeaveStatus() {
  const profile = await getStudentProfile()
  if (!profile) return null

  return await prisma.leaveRequest.findMany({
    where: { studentId: profile.id },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getFinancialStatus() {
  const profile = await getStudentProfile()
  if (!profile) return null

  const payments = await prisma.payment.findMany({
    where: { studentId: profile.id },
    orderBy: { createdAt: 'desc' }
  })

  const scholarships = await prisma.scholarship.findMany({
    where: { studentId: profile.id },
    orderBy: { appliedDate: 'desc' }
  })

  const feeStructure = await prisma.feeStructure.findMany()

  return {
    payments,
    scholarships,
    feeStructure
  }
}

export async function getServiceRequests() {
  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.serviceRequest.findMany({
    where: { studentId: profile.id },
    orderBy: { requestDate: 'desc' }
  })
}

export async function getDigitalCredentials() {
  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.digitalCredential.findMany({
    where: { studentId: profile.id },
    orderBy: { type: 'asc' }
  })
}

export async function getRegistrationWindows() {
  return await prisma.registrationWindow.findMany({
    orderBy: { startDate: 'desc' }
  })
}

export async function getProgrammeMigrations() {
  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.programmeMigration.findMany({
    where: { studentId: profile.id },
    orderBy: { appliedAt: 'desc' }
  })
}

export async function getCommunications() {
  const profile = await getStudentProfile()
  if (!profile) return { communications: [], councilAnnouncements: [] }

  const communications = await prisma.communication.findMany({
    where: {
      OR: [
        { targetId: null },
        { targetId: profile.id },
        { targetId: profile.batch },
      ]
    },
    orderBy: { date: 'desc' }
  })

  const councilAnnouncements = await prisma.councilAnnouncement.findMany({
    orderBy: { date: 'desc' }
  })

  return {
    communications,
    councilAnnouncements
  }
}

export async function getCareerStatus() {
  const profile = await getStudentProfile()
  if (!profile) return null

  const drives = await prisma.placementDrive.findMany({
    orderBy: { driveDate: 'asc' },
    include: {
      applications: {
        where: { studentId: profile.id }
      }
    }
  })

  const opportunities = await prisma.careerOpportunity.findMany({
    orderBy: { postedAt: 'desc' }
  })

  return {
    drives,
    opportunities
  }
}

export async function getClubsAndEvents() {
  const profile = await getStudentProfile()
  if (!profile) return null

  const clubs = await prisma.club.findMany({
    include: {
      members: {
        where: { studentId: profile.id }
      }
    }
  })

  const events = await prisma.clubEvent.findMany({
    orderBy: { date: 'asc' },
    include: {
      club: true
    }
  })

  return {
    clubs,
    events
  }
}

export async function getAchievementsData() {
  const profile = await getStudentProfile()
  if (!profile) return null

  const achievements = await prisma.achievement.findMany({
    where: { studentId: profile.id },
    orderBy: { date: 'desc' }
  })

  const activityPoints = await prisma.activityPoint.findMany({
    where: { studentId: profile.id },
    orderBy: { date: 'desc' }
  })

  return {
    achievements,
    activityPoints
  }
}

export async function getPendingFeedbacks() {
  const profile = await getStudentProfile()
  if (!profile) return []

  const surveys = await prisma.feedbackSurvey.findMany({
    where: { status: 'ACTIVE' },
    include: {
      responses: {
        where: { studentId: profile.id }
      }
    }
  })

  return surveys.filter(s => s.responses.length === 0)
}

export async function getLibraryStatus() {
  const profile = await getStudentProfile()
  if (!profile) return null

  const issuedBooks = await prisma.bookIssue.findMany({
    where: { studentId: profile.id },
    include: { book: true }
  })

  const reservations = await prisma.bookReservation.findMany({
    where: { studentId: profile.id },
    include: { book: true }
  })

  const dues = await prisma.libraryDue.findMany({
    where: { studentId: profile.id }
  })

  const eResources = await prisma.eResource.findMany()

  return {
    issuedBooks,
    reservations,
    dues,
    eResources
  }
}

export async function searchBooks(query: string) {
  return await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { author: { contains: query } },
        { isbn: { contains: query } },
        { category: { contains: query } }
      ]
    }
  })
}

export async function reserveBook(bookId: string) {
  const profile = await getStudentProfile()
  if (!profile) throw new Error("Unauthorized")

  return await prisma.bookReservation.create({
    data: {
      studentId: profile.id,
      bookId,
      status: 'PENDING'
    }
  })
}
