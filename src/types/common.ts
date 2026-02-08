export interface User {
  id: string
  username: string
  name: string
  role: string
  email?: string | null
}

export interface StudentProfile {
  id: string
  userId: string
  regNo: string
  program: string
  school: string
  batch: string
}

export interface FacultyProfile {
  id: string
  userId: string
  empId: string
  designation: string
  school: string
  cabin: string
}

export interface Course {
  id: string
  code: string
  title: string
  credits: number
  type: string
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
}

export interface AcademicEvent {
  id: string
  title: string
  description?: string | null
  date: Date
  endDate?: Date | null
  type: string
  location?: string | null
  createdAt: Date
}

export interface SecurityAudit {
  id: string
  userId: string
  event: string
  timestamp: Date
  ipAddress: string
  device: string
}

export interface SecurityStatus {
  twoFactorEnabled: boolean
  lastLogin?: Date | null
  securityAudits: SecurityAudit[]
  backupCodes?: string | null
}

export interface FeedbackSurvey {
  id: string
  type: string
  title: string
  description?: string | null
  status: string
}
