import { FacultyProfile, User, StudentProfile, Attendance, Marks, Course, TimeTable, ResearchProfile, Meeting, CounsellingRecord, Payroll, FacultyLeave, CourseRegistration } from "@prisma/client"

export type FacultyWithDetails = FacultyProfile & {
  user: User
  proctees: (StudentProfile & {
    user: User
    attendance: Attendance[]
    marks: Marks[]
  })[]
  courses: (Course & {
    timeTable: TimeTable[]
    registrations: {
      student: StudentProfile & {
        user: User
      }
    }[]
    attendance: Attendance[]
  })[]
  supervisedScholars: ResearchProfile[]
  meetings: Meeting[]
  counsellingRecords: (CounsellingRecord & {
    student: StudentProfile & {
      user: User
    }
  })[]
}

export type FacultyAdminDetails = FacultyProfile & {
  payrolls: Payroll[]
  leaves: FacultyLeave[]
}

export type CourseWithDetails = Course & {
  timeTable: TimeTable[]
  registrations: (CourseRegistration & {
    student: StudentProfile & {
      user: User
    }
  })[]
  attendance: Attendance[]
}

export type FacultyTimeTableWithCourse = TimeTable & {
  course: CourseWithDetails
}
