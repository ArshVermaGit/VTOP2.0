// data.js - Student Data Management
const studentData = {
    id: '24BCG10026',
    name: 'Arsh Verma',
    program: 'B.Tech Computer Science',
    email: 'arsh.24bcg10026@vitbhopal.ac.in',
    phone: '+91 9555532013',
    dob: '22-11-2005',
    
    attendance: {
        overall: 87,
        courses: [
            { 
                name: 'Data Structures', 
                code: 'CSE2001', 
                attended: 42, 
                total: 48, 
                percentage: 87.5 
            },
            { 
                name: 'Algorithms', 
                code: 'CSE2002', 
                attended: 38, 
                total: 45, 
                percentage: 84.4 
            },
            { 
                name: 'Database Management Systems', 
                code: 'CSE2003', 
                attended: 45, 
                total: 48, 
                percentage: 93.8 
            },
            { 
                name: 'Operating Systems', 
                code: 'CSE2004', 
                attended: 40, 
                total: 48, 
                percentage: 83.3 
            },
            { 
                name: 'Computer Networks', 
                code: 'CSE2005', 
                attended: 44, 
                total: 48, 
                percentage: 91.7 
            }
        ]
    },
    
    grades: [
        { course: 'Data Structures', code: 'CSE2001', grade: 'A', credits: 4, semester: 5 },
        { course: 'Algorithms', code: 'CSE2002', grade: 'A+', credits: 4, semester: 5 },
        { course: 'Database Management Systems', code: 'CSE2003', grade: 'A', credits: 3, semester: 5 },
        { course: 'Operating Systems', code: 'CSE2004', grade: 'B+', credits: 4, semester: 5 },
        { course: 'Computer Networks', code: 'CSE2005', grade: 'A', credits: 3, semester: 5 }
    ],
    
    gradeHistory: [
        // Semester 1
        { course: 'Programming in C', code: 'CSE1001', grade: 'A', credits: 4, semester: 1 },
        { course: 'Mathematics-I', code: 'MAT1001', grade: 'B+', credits: 4, semester: 1 },
        { course: 'Physics', code: 'PHY1001', grade: 'A', credits: 3, semester: 1 },
        { course: 'Chemistry', code: 'CHE1001', grade: 'B', credits: 3, semester: 1 },
        { course: 'English', code: 'ENG1001', grade: 'A+', credits: 2, semester: 1 },
        
        // Semester 2
        { course: 'Data Structures', code: 'CSE1002', grade: 'A+', credits: 4, semester: 2 },
        { course: 'Mathematics-II', code: 'MAT1002', grade: 'A', credits: 4, semester: 2 },
        { course: 'Digital Logic', code: 'ECE1001', grade: 'A', credits: 3, semester: 2 },
        { course: 'Environmental Science', code: 'ENV1001', grade: 'A', credits: 2, semester: 2 },
        
        // Semester 3
        { course: 'OOP with Java', code: 'CSE2001', grade: 'A+', credits: 4, semester: 3 },
        { course: 'Computer Organization', code: 'CSE2002', grade: 'A', credits: 4, semester: 3 },
        { course: 'Discrete Mathematics', code: 'MAT2001', grade: 'A', credits: 3, semester: 3 },
        { course: 'Probability & Statistics', code: 'MAT2002', grade: 'B+', credits: 3, semester: 3 },
        
        // Semester 4
        { course: 'Algorithms', code: 'CSE2003', grade: 'A+', credits: 4, semester: 4 },
        { course: 'Operating Systems', code: 'CSE2004', grade: 'A', credits: 4, semester: 4 },
        { course: 'Theory of Computation', code: 'CSE2005', grade: 'A', credits: 3, semester: 4 },
        { course: 'Database Systems', code: 'CSE2006', grade: 'A', credits: 4, semester: 4 }
    ],
    
    marks: [
        {
            course: 'Data Structures',
            code: 'CSE2001',
            assessments: [
                { name: 'CAT-1', score: 28, maxScore: 30, weightage: 15 },
                { name: 'CAT-2', score: 27, maxScore: 30, weightage: 15 },
                { name: 'Assignment-1', score: 18, maxScore: 20, weightage: 10 },
                { name: 'Assignment-2', score: 19, maxScore: 20, weightage: 10 },
                { name: 'Quiz', score: 9, maxScore: 10, weightage: 5 },
                { name: 'Final Exam', score: 42, maxScore: 50, weightage: 45 }
            ]
        },
        {
            course: 'Algorithms',
            code: 'CSE2002',
            assessments: [
                { name: 'CAT-1', score: 29, maxScore: 30, weightage: 15 },
                { name: 'CAT-2', score: 28, maxScore: 30, weightage: 15 },
                { name: 'Assignment-1', score: 20, maxScore: 20, weightage: 10 },
                { name: 'Assignment-2', score: 19, maxScore: 20, weightage: 10 },
                { name: 'Quiz', score: 10, maxScore: 10, weightage: 5 },
                { name: 'Final Exam', score: 45, maxScore: 50, weightage: 45 }
            ]
        },
        {
            course: 'Database Management Systems',
            code: 'CSE2003',
            assessments: [
                { name: 'CAT-1', score: 27, maxScore: 30, weightage: 15 },
                { name: 'CAT-2', score: 26, maxScore: 30, weightage: 15 },
                { name: 'Assignment-1', score: 19, maxScore: 20, weightage: 10 },
                { name: 'Lab Work', score: 18, maxScore: 20, weightage: 10 },
                { name: 'Quiz', score: 9, maxScore: 10, weightage: 5 },
                { name: 'Final Exam', score: 40, maxScore: 50, weightage: 45 }
            ]
        },
        {
            course: 'Operating Systems',
            code: 'CSE2004',
            assessments: [
                { name: 'CAT-1', score: 25, maxScore: 30, weightage: 15 },
                { name: 'CAT-2', score: 24, maxScore: 30, weightage: 15 },
                { name: 'Assignment-1', score: 17, maxScore: 20, weightage: 10 },
                { name: 'Assignment-2', score: 18, maxScore: 20, weightage: 10 },
                { name: 'Quiz', score: 8, maxScore: 10, weightage: 5 },
                { name: 'Final Exam', score: 38, maxScore: 50, weightage: 45 }
            ]
        },
        {
            course: 'Computer Networks',
            code: 'CSE2005',
            assessments: [
                { name: 'CAT-1', score: 28, maxScore: 30, weightage: 15 },
                { name: 'CAT-2', score: 27, maxScore: 30, weightage: 15 },
                { name: 'Assignment-1', score: 19, maxScore: 20, weightage: 10 },
                { name: 'Lab Work', score: 19, maxScore: 20, weightage: 10 },
                { name: 'Quiz', score: 10, maxScore: 10, weightage: 5 },
                { name: 'Final Exam', score: 43, maxScore: 50, weightage: 45 }
            ]
        }
    ],
    
    timetable: [
        {
            day: 'Monday',
            slots: [
                { time: '08:00-09:00', subject: 'Data Structures', room: 'SJT 101', faculty: 'Dr. Smith' },
                { time: '09:00-10:00', subject: 'Algorithms', room: 'SJT 102', faculty: 'Dr. Johnson' },
                { time: '10:00-11:00', subject: 'Break', room: '-', faculty: '-' },
                { time: '11:00-12:00', subject: 'DBMS Lab', room: 'Lab 201', faculty: 'Prof. Williams' },
                { time: '12:00-01:00', subject: 'DBMS Lab', room: 'Lab 201', faculty: 'Prof. Williams' }
            ]
        },
        {
            day: 'Tuesday',
            slots: [
                { time: '08:00-09:00', subject: 'Operating Systems', room: 'SJT 103', faculty: 'Dr. Brown' },
                { time: '09:00-10:00', subject: 'Computer Networks', room: 'SJT 104', faculty: 'Prof. Davis' },
                { time: '10:00-11:00', subject: 'Break', room: '-', faculty: '-' },
                { time: '11:00-12:00', subject: 'Data Structures', room: 'SJT 101', faculty: 'Dr. Smith' }
            ]
        },
        {
            day: 'Wednesday',
            slots: [
                { time: '09:00-10:00', subject: 'Data Structures', room: 'SJT 101', faculty: 'Dr. Smith' },
                { time: '10:00-11:00', subject: 'Break', room: '-', faculty: '-' },
                { time: '11:00-12:00', subject: 'Algorithms Lab', room: 'Lab 202', faculty: 'Dr. Johnson' },
                { time: '12:00-01:00', subject: 'Algorithms Lab', room: 'Lab 202', faculty: 'Dr. Johnson' }
            ]
        },
        {
            day: 'Thursday',
            slots: [
                { time: '08:00-09:00', subject: 'DBMS', room: 'SJT 105', faculty: 'Prof. Williams' },
                { time: '09:00-10:00', subject: 'Operating Systems', room: 'SJT 103', faculty: 'Dr. Brown' },
                { time: '10:00-11:00', subject: 'Break', room: '-', faculty: '-' },
                { time: '11:00-12:00', subject: 'Computer Networks', room: 'SJT 104', faculty: 'Prof. Davis' }
            ]
        },
        {
            day: 'Friday',
            slots: [
                { time: '09:00-10:00', subject: 'Computer Networks Lab', room: 'Lab 203', faculty: 'Prof. Davis' },
                { time: '10:00-11:00', subject: 'Computer Networks Lab', room: 'Lab 203', faculty: 'Prof. Davis' },
                { time: '11:00-12:00', subject: 'Data Structures', room: 'SJT 101', faculty: 'Dr. Smith' }
            ]
        }
    ],
    
    exams: [
        { course: 'Data Structures', code: 'CSE2001', type: 'CAT-2', date: '2025-11-28', time: '09:00 AM', venue: 'SJT 301', duration: '2 hours' },
        { course: 'Algorithms', code: 'CSE2002', type: 'CAT-2', date: '2025-11-30', time: '02:00 PM', venue: 'SJT 302', duration: '2 hours' },
        { course: 'DBMS', code: 'CSE2003', type: 'CAT-2', date: '2025-12-02', time: '09:00 AM', venue: 'SJT 303', duration: '2 hours' },
        { course: 'Operating Systems', code: 'CSE2004', type: 'CAT-2', date: '2025-12-04', time: '02:00 PM', venue: 'SJT 304', duration: '2 hours' },
        { course: 'Computer Networks', code: 'CSE2005', type: 'CAT-2', date: '2025-12-06', time: '09:00 AM', venue: 'SJT 305', duration: '2 hours' }
    ],
    
    leaves: [
        { type: 'Medical', from: '2025-11-10', to: '2025-11-12', status: 'Approved', reason: 'Fever and viral infection' },
        { type: 'Personal', from: '2025-10-15', to: '2025-10-15', status: 'Approved', reason: 'Family function' },
        { type: 'Emergency', from: '2025-09-20', to: '2025-09-21', status: 'Approved', reason: 'Medical emergency at home' }
    ],
    
    messages: [
        { 
            from: 'Dr. Smith', 
            subject: 'Assignment Submission Reminder', 
            date: '2025-11-20', 
            preview: 'Please submit your Data Structures assignment by Friday...',
            read: false 
        },
        { 
            from: 'Exam Cell', 
            subject: 'CAT-2 Schedule Published', 
            date: '2025-11-18', 
            preview: 'CAT-2 examinations will commence from November 28th. Please check...',
            read: false 
        },
        { 
            from: 'Library', 
            subject: 'Book Return Reminder', 
            date: '2025-11-15', 
            preview: 'This is a reminder to return your borrowed books by the due date...',
            read: true 
        },
        { 
            from: 'Prof. Williams', 
            subject: 'DBMS Lab Session Rescheduled', 
            date: '2025-11-12', 
            preview: 'The DBMS lab session scheduled for Monday has been moved to...',
            read: true 
        },
        { 
            from: 'Hostel Warden', 
            subject: 'Hostel Maintenance Notice', 
            date: '2025-11-10', 
            preview: 'Regular maintenance will be conducted in A Block this weekend...',
            read: true 
        }
    ],
    
    hostel: {
        block: 'A Block',
        room: '305',
        bed: 'B2',
        allotmentDate: '15-07-2023',
        warden: 'Dr. Sharma',
        contactNumber: '+91 98765 00001'
    },
    
    payments: [
        { type: 'Tuition Fee', amount: 75000, date: '2025-07-15', status: 'Paid', transactionId: 'TXN001234567' },
        { type: 'Hostel Fee', amount: 25000, date: '2025-07-15', status: 'Paid', transactionId: 'TXN001234568' },
        { type: 'Exam Fee', amount: 2000, date: '2025-10-01', status: 'Paid', transactionId: 'TXN001234569' },
        { type: 'Library Fee', amount: 500, date: '2025-07-15', status: 'Paid', transactionId: 'TXN001234570' },
        { type: 'Sports Fee', amount: 1500, date: '2025-07-15', status: 'Paid', transactionId: 'TXN001234571' }
    ],
    
    curriculum: [
        { 
            semester: 1, 
            courses: [
                'Programming in C',
                'Mathematics-I (Calculus)',
                'Physics for Engineers',
                'Chemistry for Engineers',
                'English Communication'
            ]
        },
        { 
            semester: 2, 
            courses: [
                'Data Structures & Algorithms',
                'Mathematics-II (Linear Algebra)',
                'Digital Logic Design',
                'Environmental Science',
                'Professional Ethics'
            ]
        },
        { 
            semester: 3, 
            courses: [
                'Object Oriented Programming with Java',
                'Computer Organization & Architecture',
                'Discrete Mathematics',
                'Probability & Statistics',
                'Technical Writing'
            ]
        },
        { 
            semester: 4, 
            courses: [
                'Algorithm Analysis & Design',
                'Operating Systems',
                'Theory of Computation',
                'Database Management Systems',
                'Software Engineering'
            ]
        },
        { 
            semester: 5, 
            courses: [
                'Computer Networks',
                'Web Technologies',
                'Machine Learning',
                'Compiler Design',
                'Information Security'
            ]
        }
    ]
};

// Data Service Functions
const dataService = {
    // Get student profile
    getProfile() {
        return {
            id: studentData.id,
            name: studentData.name,
            program: studentData.program,
            email: studentData.email,
            phone: studentData.phone,
            dob: studentData.dob
        };
    },
    
    // Get attendance data
    getAttendance() {
        return studentData.attendance;
    },
    
    // Get current semester grades
    getGrades() {
        return studentData.grades;
    },
    
    // Get complete grade history
    getGradeHistory() {
        return studentData.gradeHistory;
    },
    
    // Get detailed marks
    getMarks() {
        return studentData.marks;
    },
    
    // Get timetable
    getTimetable() {
        return studentData.timetable;
    },
    
    // Get exam schedule
    getExams() {
        return studentData.exams;
    },
    
    // Get leave history
    getLeaves() {
        return studentData.leaves;
    },
    
    // Get messages
    getMessages() {
        return studentData.messages;
    },
    
    // Get hostel details
    getHostel() {
        return studentData.hostel;
    },
    
    // Get payment history
    getPayments() {
        return studentData.payments;
    },
    
    // Get curriculum
    getCurriculum() {
        return studentData.curriculum;
    },
    
    // Calculate GPA
    calculateGPA() {
        const gradePoints = {
            'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0
        };
        
        let totalPoints = 0;
        let totalCredits = 0;
        
        studentData.grades.forEach(grade => {
            totalPoints += gradePoints[grade.grade] * grade.credits;
            totalCredits += grade.credits;
        });
        
        return (totalPoints / totalCredits).toFixed(2);
    },
    
    // Group grades by semester
    groupBySemester() {
        const grouped = {};
        
        studentData.gradeHistory.forEach(grade => {
            if (!grouped[grade.semester]) {
                grouped[grade.semester] = [];
            }
            grouped[grade.semester].push(grade);
        });
        
        return grouped;
    },
    
    // Get total credits
    getTotalCredits() {
        return studentData.grades.reduce((sum, grade) => sum + grade.credits, 0);
    },
    
    // Add leave application
    addLeave(leave) {
        studentData.leaves.unshift({
            ...leave,
            status: 'Pending'
        });
    }
};