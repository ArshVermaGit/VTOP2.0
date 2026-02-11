import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🔥 Cleaning all existing data...')
  const models = ['securityAudit', 'facultyLeave', 'payroll', 'parentAnnouncement', 'eResource', 'libraryDue', 'bookReservation', 'bookIssue', 'book', 'feedbackResponse', 'feedbackSurvey', 'activityPoint', 'achievement', 'clubEvent', 'clubMembership', 'club', 'placementApplication', 'careerOpportunity', 'placementDrive', 'councilAnnouncement', 'communication', 'programmeMigration', 'digitalCredential', 'registrationWindow', 'serviceRequest', 'scholarship', 'feeStructure', 'permissionLetter', 'hostelConsentForm', 'messMenu', 'hostelMaintenance', 'hostelAdmission', 'researchLetter', 'progressReport', 'researchPublication', 'reevaluationRequest', 'gradeHistory', 'seatAllocation', 'examSchedule', 'forumReply', 'forumPost', 'courseAnnouncement', 'assignmentSubmission', 'assignment', 'academicEvent', 'semesterMilestone', 'biometricReport', 'examApplication', 'thesisSubmission', 'leaveRequest', 'payment', 'marks', 'attendance', 'timeTable', 'courseRegistration', 'courseMaterial', 'meeting', 'counsellingRecord', 'course', 'researchProfile', 'studentProfile', 'facultyProfile', 'parentProfile', 'adminProfile', 'user']
  
  for (const model of models) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = (prisma as any)[model]
    if (table) {
      await table.deleteMany()
    }
  }

  console.log('✅ Database cleaned!')
  console.log('🌱 Seeding fresh data with Indian profiles...')

  // ============ FACULTY 1: Dr. Anand Krishnamurthy ============
  const faculty1User = await prisma.user.create({
    data: {
      username: 'faculty.anand',
      password: 'password123',
      name: 'Dr. Anand Krishnamurthy',
      role: 'FACULTY',
      email: 'anand.k@vit.edu',
      facultyProfile: {
        create: {
          empId: 'FAC2024001',
          designation: 'Professor',
          school: 'School of Computer Science and Engineering',
          mobile: '9876543210',
          cabin: 'SJT-402',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
          apaarId: 'APAAR-FAC-001',
          emergencyName: 'Priya Krishnamurthy',
          emergencyPhone: '9876543211',
          joiningDate: new Date('2015-06-01'),
          bloodGroup: 'A+',
          dob: new Date('1978-03-15')
        }
      }
    }
  })
  const faculty1Profile = await prisma.facultyProfile.findUnique({ where: { userId: faculty1User.id } })

  // ============ FACULTY 2: Dr. Meenakshi Sharma ============
  const faculty2User = await prisma.user.create({
    data: {
      username: 'faculty.meenakshi',
      password: 'password123',
      name: 'Dr. Meenakshi Sharma',
      role: 'FACULTY',
      email: 'meenakshi.s@vit.edu',
      facultyProfile: {
        create: {
          empId: 'FAC2024002',
          designation: 'Associate Professor',
          school: 'School of Computer Science and Engineering',
          mobile: '9988776655',
          cabin: 'TT-301',
          photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
          apaarId: 'APAAR-FAC-002',
          emergencyName: 'Rajesh Sharma',
          emergencyPhone: '9988776654',
          joiningDate: new Date('2018-08-15'),
          bloodGroup: 'O+',
          dob: new Date('1985-11-22')
        }
      }
    }
  })
  const faculty2Profile = await prisma.facultyProfile.findUnique({ where: { userId: faculty2User.id } })

  // ============ STUDENT 1: Arjun Nair ============
  const student1User = await prisma.user.create({
    data: {
      username: 'student.arjun',
      password: 'password123',
      name: 'Arjun Nair',
      role: 'STUDENT',
      email: 'arjun.nair2024@vit.edu',
      profile: {
        create: {
          regNo: '24BCE0001',
          applicationNo: 'APP20240001',
          program: 'B.Tech Computer Science and Engineering',
          school: 'School of Computer Science and Engineering',
          batch: '2024-2028',
          cgpa: 9.25,
          proctorId: faculty1Profile?.id,
          dob: new Date('2006-04-12'),
          bloodGroup: 'B+',
          mobile: '8899001122',
          aadharNo: '2345-6789-0123',
          nativePlace: 'Kochi, Kerala',
          nationality: 'Indian',
          apaarId: 'APAAR-STU-001',
          emergencyName: 'Suresh Nair',
          emergencyPhone: '8899001100',
          bankAccount: '987654321012',
          bankIfsc: 'HDFC0001234',
          joiningDate: new Date('2024-07-15'),
          abcId: 'ABC-987-654-321',
          hostelBlock: 'MH-A',
          hostelRoom: '305',
          hostelMess: 'VEG-MESS-A',
          photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250'
        }
      }
    }
  })
  const student1Profile = await prisma.studentProfile.findUnique({ where: { userId: student1User.id } })

  // ============ STUDENT 2: Priya Venkatesh ============
  const student2User = await prisma.user.create({
    data: {
      username: 'student.priya',
      password: 'password123',
      name: 'Priya Venkatesh',
      role: 'STUDENT',
      email: 'priya.v2024@vit.edu',
      profile: {
        create: {
          regNo: '24BCE0002',
          applicationNo: 'APP20240002',
          program: 'B.Tech Computer Science and Engineering',
          school: 'School of Computer Science and Engineering',
          batch: '2024-2028',
          cgpa: 8.75,
          proctorId: faculty2Profile?.id,
          dob: new Date('2006-09-28'),
          bloodGroup: 'A+',
          mobile: '9988112233',
          aadharNo: '3456-7890-1234',
          nativePlace: 'Chennai, Tamil Nadu',
          nationality: 'Indian',
          apaarId: 'APAAR-STU-002',
          emergencyName: 'Venkatesh R.',
          emergencyPhone: '9988112200',
          bankAccount: '876543210098',
          bankIfsc: 'ICIC0005678',
          joiningDate: new Date('2024-07-15'),
          abcId: 'ABC-876-543-210',
          hostelBlock: 'LH-B',
          hostelRoom: '412',
          hostelMess: 'VEG-MESS-B',
          photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250'
        }
      }
    }
  })
  const student2Profile = await prisma.studentProfile.findUnique({ where: { userId: student2User.id } })

  // ============ PARENT 1: Suresh Nair (Father of Arjun) ============
  await prisma.user.create({
    data: {
      username: 'parent.suresh',
      password: 'password123',
      name: 'Suresh Nair',
      role: 'PARENT',
      email: 'suresh.nair@gmail.com',
      parentProfile: {
        create: {
          studentId: student1Profile?.id,
          mobile: '8899001100',
          emergencyName: 'Lakshmi Nair',
          emergencyPhone: '8899001101'
        }
      }
    }
  })

  // ============ PARENT 2: Venkatesh R. (Father of Priya) ============
  await prisma.user.create({
    data: {
      username: 'parent.venkatesh',
      password: 'password123',
      name: 'Venkatesh R.',
      role: 'PARENT',
      email: 'venkatesh.r@gmail.com',
      parentProfile: {
        create: {
          studentId: student2Profile?.id,
          mobile: '9988112200',
          emergencyName: 'Kamala Venkatesh',
          emergencyPhone: '9988112201'
        }
      }
    }
  })

  // ============ ADMIN: System Administrator ============
  await prisma.user.create({
    data: {
      username: 'admin',
      password: 'admin123',
      name: 'System Administrator',
      role: 'ADMIN',
      email: 'admin@vit.edu',
      adminProfile: {
        create: {
          level: 3
        }
      }
    }
  })

  // ============ COURSES ============
  const courses = [
    { code: 'CSE1001', title: 'Problem Solving & Programming', credits: 4, type: 'Theory', category: 'Program Core', slot: 'A1+TA1', venue: 'SJT-202' },
    { code: 'CSE1002', title: 'Digital Logic Design', credits: 3, type: 'Theory', category: 'Program Core', slot: 'B1+TB1', venue: 'SJT-303' },
    { code: 'MAT1001', title: 'Calculus for Engineers', credits: 4, type: 'Theory', category: 'University Core', slot: 'C1+TC1', venue: 'TT-101' },
    { code: 'PHY1001', title: 'Engineering Physics', credits: 3, type: 'Theory', category: 'University Core', slot: 'D1+TD1', venue: 'TT-102' },
  ]

  for (const c of courses) {
    const course = await prisma.course.create({
      data: { ...c, facultyId: c.code.startsWith('CSE') ? faculty1Profile?.id : faculty2Profile?.id }
    })

    // Register both students to all courses
    for (const studentProfile of [student1Profile, student2Profile]) {
      if (studentProfile) {
        await prisma.courseRegistration.create({
          data: {
            studentId: studentProfile.id,
            courseId: course.id,
            status: 'REGISTERED',
            sem: 'Winter 2024-25'
          }
        })

        await prisma.attendance.create({
          data: {
            studentId: studentProfile.id,
            courseId: course.id,
            attendedClasses: 28 + Math.floor(Math.random() * 8),
            totalClasses: 36,
            percentage: 85 + Math.random() * 10
          }
        })

        await prisma.marks.create({
          data: {
            studentId: studentProfile.id,
            courseId: course.id,
            cat1: 35 + Math.floor(Math.random() * 10),
            cat2: 38 + Math.floor(Math.random() * 8),
            da1: 9 + Math.floor(Math.random() * 2),
            da2: 8 + Math.floor(Math.random() * 3),
            quiz: 7 + Math.floor(Math.random() * 3),
            fat: 70 + Math.floor(Math.random() * 20),
            total: 85 + Math.floor(Math.random() * 10),
            grade: 'A',
            attendance: 85 + Math.random() * 10
          }
        })

        await prisma.gradeHistory.create({
          data: {
            studentId: studentProfile.id,
            semester: 'Winter 2024',
            courseCode: c.code,
            courseTitle: c.title,
            credits: c.credits,
            grade: 'A',
            gradePoint: 9,
            result: 'PASS'
          }
        })

        const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
        await prisma.timeTable.create({
          data: {
            studentId: studentProfile.id,
            courseId: course.id,
            day: days[Math.floor(Math.random() * days.length)],
            startTime: '09:00 AM',
            endTime: '09:50 AM',
            venue: c.venue,
            slot: c.slot || 'A1'
          }
        })
      }
    }
  }

  // ============ PAYMENTS ============
  for (const studentProfile of [student1Profile, student2Profile]) {
    if (studentProfile) {
      await prisma.payment.createMany({
        data: [
          {
            studentId: studentProfile.id,
            amount: 198000,
            description: 'Annual Tuition Fee',
            type: 'TUITION',
            status: 'PAID',
            dueDate: new Date('2024-07-31'),
            paidDate: new Date('2024-07-15')
          },
          {
            studentId: studentProfile.id,
            amount: 125000,
            description: 'Hostel Accommodation Fee',
            type: 'HOSTEL',
            status: 'PENDING',
            dueDate: new Date('2025-02-28')
          }
        ]
      })
    }
  }

  console.log('✅ Seeding complete!')
  console.log('📊 Created: 2 Faculty, 2 Students, 2 Parents, 1 Admin')
  console.log('📚 Created: 4 Courses with registrations, attendance, marks, and timetables')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
