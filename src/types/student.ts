import { StudentProfile, User, FacultyProfile, Course } from "@prisma/client"

// Fallback types for stale Prisma client
export interface Attendance {
  id: string
  studentId: string
  courseId: string
  attendedClasses: number
  totalClasses: number
  percentage: number
  updatedAt: Date
  course?: Course
}

export interface GradeHistory {
  id: string
  studentId: string
  semester: string
  courseCode: string
  courseTitle: string
  credits: number
  grade: string
  gradePoint: number
  result: string
  createdAt: Date
}

export interface LeaveRequest {
  id: string
  studentId: string
  type: string
  category?: string | null
  fromDate: Date
  toDate: Date
  reason: string
  status: string
  leaveApproval?: string | null
  proctorComment?: string | null
  createdAt: Date
}

export interface TimeTable {
  id: string
  studentId: string
  courseId: string
  day: string
  startTime: string
  endTime: string
  venue?: string | null
  slot: string
  course?: Course
}

export interface Communication {
  id: string
  type: string
  category?: string | null
  title: string
  content: string
  authorId?: string | null
  authorName: string
  targetId?: string | null
  date: Date
  expiryDate?: Date | null
  attachmentUrl?: string | null
}

export type StudentProfileWithUser = StudentProfile & {
  user: User
  proctor?: (FacultyProfile & { user: User }) | null
}

export type TimeTableWithCourse = TimeTable & {
  course: Course
}

// Types are now defined directly above or imported from @prisma/client
