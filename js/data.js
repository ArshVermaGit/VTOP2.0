class DataService {
    constructor() {
        this.demoStudent = {
            student_id: "21BCE001",
            name: "Student 21BCE001",
            email: "21bce001@university.edu",
            program: "B.Tech",
            branch: "Computer Science and Engineering",
            semester: 5,
            registration_number: "21BCE001",
            profile_image: null
        };

        this.attendanceData = [
            { course_code: "CSE2001", course_name: "Data Structures", total_classes: 45, attended_classes: 42, percentage: 93.33 },
            { course_code: "CSE2002", course_name: "Algorithms", total_classes: 40, attended_classes: 38, percentage: 95.0 },
            { course_code: "CSE2003", course_name: "Database Systems", total_classes: 42, attended_classes: 40, percentage: 95.24 },
            { course_code: "CSE2004", course_name: "Operating Systems", total_classes: 38, attended_classes: 35, percentage: 92.11 },
            { course_code: "CSE2005", course_name: "Computer Networks", total_classes: 44, attended_classes: 41, percentage: 93.18 }
        ];

        this.marksData = [
            { course_code: "CSE2001", course_name: "Data Structures", cat1: 48, cat2: 45, assignment: 18, fat: 88, total: 199 },
            { course_code: "CSE2002", course_name: "Algorithms", cat1: 50, cat2: 47, assignment: 20, fat: 90, total: 207 },
            { course_code: "CSE2003", course_name: "Database Systems", cat1: 45, cat2: 46, assignment: 19, fat: 85, total: 195 },
            { course_code: "CSE2004", course_name: "Operating Systems", cat1: 47, cat2: 44, assignment: 18, fat: 87, total: 196 },
            { course_code: "CSE2005", course_name: "Computer Networks", cat1: 46, cat2: 48, assignment: 19, fat: 89, total: 202 }
        ];

        this.gradesData = [
            { course_code: "CSE2001", course_name: "Data Structures", grade: "A", credits: 4, semester: 5 },
            { course_code: "CSE2002", course_name: "Algorithms", grade: "A+", credits: 4, semester: 5 },
            { course_code: "CSE2003", course_name: "Database Systems", grade: "A", credits: 3, semester: 5 },
            { course_code: "CSE2004", course_name: "Operating Systems", grade: "A", credits: 3, semester: 5 },
            { course_code: "CSE2005", course_name: "Computer Networks", grade: "A+", credits: 4, semester: 5 }
        ];

        this.timetableData = [
            { day: "Monday", slot: "09:00-10:00", course_code: "CSE2001", course_name: "Data Structures", faculty: "Dr. Sharma", venue: "AB1-101" },
            { day: "Monday", slot: "10:00-11:00", course_code: "CSE2002", course_name: "Algorithms", faculty: "Dr. Kumar", venue: "AB1-102" },
            { day: "Tuesday", slot: "09:00-10:00", course_code: "CSE2003", course_name: "Database Systems", faculty: "Dr. Patel", venue: "AB2-201" },
            { day: "Tuesday", slot: "11:00-12:00", course_code: "CSE2004", course_name: "Operating Systems", faculty: "Dr. Singh", venue: "AB2-202" },
            { day: "Wednesday", slot: "10:00-11:00", course_code: "CSE2005", course_name: "Computer Networks", faculty: "Dr. Reddy", venue: "AB1-103" }
        ];

        this.examData = [
            { course_code: "CSE2001", course_name: "Data Structures", exam_type: "FAT", date: "2025-12-15", time: "09:00 AM", venue: "Exam Hall 1" },
            { course_code: "CSE2002", course_name: "Algorithms", exam_type: "FAT", date: "2025-12-17", time: "02:00 PM", venue: "Exam Hall 2" },
            { course_code: "CSE2003", course_name: "Database Systems", exam_type: "FAT", date: "2025-12-19", time: "09:00 AM", venue: "Exam Hall 1" },
            { course_code: "CSE2004", course_name: "Operating Systems", exam_type: "FAT", date: "2025-12-21", time: "02:00 PM", venue: "Exam Hall 3" },
            { course_code: "CSE2005", course_name: "Computer Networks", exam_type: "FAT", date: "2025-12-23", time: "09:00 AM", venue: "Exam Hall 2" }
        ];

        this.paymentData = [
            { transaction_id: "TXN001234567", amount: 75000, description: "Semester Fee - Sem 5", date: "2025-08-15", status: "Completed" },
            { transaction_id: "TXN001234568", amount: 5000, description: "Hostel Fee - Sem 5", date: "2025-08-15", status: "Completed" },
            { transaction_id: "TXN001234569", amount: 2000, description: "Library Fee", date: "2025-08-20", status: "Completed" }
        ];

        this.messagesData = [
            { course_code: "CSE2001", course_name: "Data Structures", message: "Assignment 2 submission deadline extended to Nov 30", faculty: "Dr. Sharma", date: "2025-11-20" },
            { course_code: "CSE2002", course_name: "Algorithms", message: "CAT-2 will be conducted on Dec 5", faculty: "Dr. Kumar", date: "2025-11-21" },
            { course_code: "CSE2003", course_name: "Database Systems", message: "Project demo scheduled for next week", faculty: "Dr. Patel", date: "2025-11-22" }
        ];

        this.hostelData = {
            block: "Block A",
            room_number: "A-305",
            bed_number: "2",
            allotment_date: "2025-08-01"
        };

        this.leaveRequests = [];
        this.init();
    }

    init() {
        if (!localStorage.getItem('vtop_demo_initialized')) {
            localStorage.setItem('vtop_demo_initialized', 'true');
            localStorage.setItem('vtop_leave_requests', JSON.stringify(this.leaveRequests));
        } else {
            this.leaveRequests = JSON.parse(localStorage.getItem('vtop_leave_requests') || '[]');
        }
    }

    verifyLogin(studentId, password) {
        const validCredentials = [
            { id: "21BCE001", password: "demo123" },
            { id: "21BCE002", password: "demo123" },
            { id: "21BCE003", password: "demo123" }
        ];

        const isValid = validCredentials.some(cred => 
            cred.id === studentId && cred.password === password
        );

        if (isValid) {
            localStorage.setItem('vtop_token', 'demo_token_' + studentId);
            localStorage.setItem('vtop_student', JSON.stringify({
                ...this.demoStudent,
                student_id: studentId,
                name: `Student ${studentId}`,
                email: `${studentId.toLowerCase()}@university.edu`,
                registration_number: studentId
            }));
            return true;
        }
        return false;
    }

    getProfile() {
        const student = localStorage.getItem('vtop_student');
        return student ? JSON.parse(student) : this.demoStudent;
    }

    getAttendance() {
        return this.attendanceData;
    }

    getMarks() {
        return this.marksData;
    }

    getGrades() {
        return this.gradesData;
    }

    getTimetable() {
        return this.timetableData;
    }

    getExams() {
        return this.examData;
    }

    getPayments() {
        return this.paymentData;
    }

    getMessages() {
        return this.messagesData;
    }

    getHostel() {
        return this.hostelData;
    }

    getLeaveRequests() {
        return this.leaveRequests;
    }

    submitLeaveRequest(leaveData) {
        const newLeave = {
            ...leaveData,
            status: "Pending",
            created_at: new Date().toISOString()
        };
        this.leaveRequests.unshift(newLeave);
        localStorage.setItem('vtop_leave_requests', JSON.stringify(this.leaveRequests));
    }

    getCurriculum() {
        return [
            {
                semester: 1,
                courses: [
                    { code: "CSE1001", name: "Programming in C", credits: 4 },
                    { code: "MAT1001", name: "Calculus", credits: 4 },
                    { code: "PHY1001", name: "Physics", credits: 3 },
                ]
            },
            {
                semester: 2,
                courses: [
                    { code: "CSE1002", name: "Object Oriented Programming", credits: 4 },
                    { code: "MAT1002", name: "Linear Algebra", credits: 4 },
                    { code: "CHE1001", name: "Chemistry", credits: 3 },
                ]
            }
        ];
    }

    calculateGPA() {
        const gradePoints = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0 };
        let totalPoints = 0;
        let totalCredits = 0;
        
        this.gradesData.forEach(g => {
            totalPoints += gradePoints[g.grade] * g.credits;
            totalCredits += g.credits;
        });
        
        return (totalPoints / totalCredits).toFixed(2);
    }

    groupBySemester() {
        const grouped = {};
        this.gradesData.forEach(grade => {
            if (!grouped[grade.semester]) grouped[grade.semester] = [];
            grouped[grade.semester].push(grade);
        });
        return grouped;
    }

    groupTimetableByDay() {
        const grouped = {};
        this.timetableData.forEach(item => {
            if (!grouped[item.day]) grouped[item.day] = [];
            grouped[item.day].push(item);
        });
        return grouped;
    }
}

export const dataService = new DataService();