import { ParentProfile, User, StudentProfile, Attendance, Marks, Payment, Communication, FacultyProfile, Course } from "@prisma/client"

export type ParentWithDetails = ParentProfile & {
  user: User
  student: (StudentProfile & {
    user: User
    attendance: (Attendance & { course: Course })[]
    marks: (Marks & { course: Course })[]
    payments: Payment[]
    proctor: (FacultyProfile & {
      user: User
    }) | null
  }) | null
}

export type ParentDashboardData = {
  profile: ParentWithDetails
  announcements: Communication[]
}
