// Enhanced Data Service with additional features
class DataService {
    constructor() {
        this.demoStudent = {
            student_id: "21BCE001",
            name: "Alex Johnson",
            email: "21bce001@university.edu",
            program: "B.Tech",
            branch: "Computer Science and Engineering",
            semester: 5,
            registration_number: "21BCE001",
            profile_image: null,
            phone: "+91 98765 43210",
            date_of_birth: "2003-05-15",
            address: "University Hostel, Campus Area",
            blood_group: "O+"
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
            { course_code: "CSE2005", course_name: "Computer Networks", grade: "A+", credits: 4, semester: 5 },
            // Previous semesters data for history
            { course_code: "CSE1001", course_name: "Programming in C", grade: "A", credits: 4, semester: 1 },
            { course_code: "MAT1001", course_name: "Calculus", grade: "B+", credits: 4, semester: 1 },
            { course_code: "PHY1001", course_name: "Physics", grade: "A", credits: 3, semester: 1 },
            { course_code: "CSE1002", course_name: "Object Oriented Programming", grade: "A+", credits: 4, semester: 2 },
            { course_code: "MAT1002", course_name: "Linear Algebra", grade: "A", credits: 4, semester: 2 }
        ];

        this.timetableData = [
            { day: "Monday", slot: "09:00-10:00", course_code: "CSE2001", course_name: "Data Structures", faculty: "Dr. Sharma", venue: "AB1-101" },
            { day: "Monday", slot: "10:00-11:00", course_code: "CSE2002", course_name: "Algorithms", faculty: "Dr. Kumar", venue: "AB1-102" },
            { day: "Tuesday", slot: "09:00-10:00", course_code: "CSE2003", course_name: "Database Systems", faculty: "Dr. Patel", venue: "AB2-201" },
            { day: "Tuesday", slot: "11:00-12:00", course_code: "CSE2004", course_name: "Operating Systems", faculty: "Dr. Singh", venue: "AB2-202" },
            { day: "Wednesday", slot: "10:00-11:00", course_code: "CSE2005", course_name: "Computer Networks", faculty: "Dr. Reddy", venue: "AB1-103" },
            { day: "Thursday", slot: "14:00-15:00", course_code: "CSE2001", course_name: "Data Structures Lab", faculty: "Dr. Sharma", venue: "Lab-301" },
            { day: "Friday", slot: "15:00-16:00", course_code: "CSE2003", course_name: "Database Lab", faculty: "Dr. Patel", venue: "Lab-302" }
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
            { transaction_id: "TXN001234569", amount: 2000, description: "Library Fee", date: "2025-08-20", status: "Completed" },
            { transaction_id: "TXN001234570", amount: 1500, description: "Exam Fee", date: "2025-11-10", status: "Completed" }
        ];

        this.messagesData = [
            { course_code: "CSE2001", course_name: "Data Structures", message: "Assignment 2 submission deadline extended to Nov 30. Please ensure you follow all guidelines mentioned in the assignment document.", faculty: "Dr. Sharma", date: "2025-11-20", priority: "high" },
            { course_code: "CSE2002", course_name: "Algorithms", message: "CAT-2 will be conducted on Dec 5. Syllabus: Chapters 4-6 from the textbook. Duration: 2 hours.", faculty: "Dr. Kumar", date: "2025-11-21", priority: "medium" },
            { course_code: "CSE2003", course_name: "Database Systems", message: "Project demo scheduled for next week. Please prepare a 10-minute presentation about your implementation.", faculty: "Dr. Patel", date: "2025-11-22", priority: "medium" },
            { course_code: "CSE2004", course_name: "Operating Systems", message: "Extra class scheduled on Saturday for doubt clearing session. Attendance is optional but recommended.", faculty: "Dr. Singh", date: "2025-11-18", priority: "low" }
        ];

        this.hostelData = {
            block: "Block A",
            room_number: "A-305",
            bed_number: "2",
            allotment_date: "2025-08-01",
            floor: "3rd Floor",
            wing: "North Wing",
            roommate: "21BCE002 - Raj Sharma"
        };

        this.leaveRequests = [];
        this.init();
    }

    init() {
        // Initialize demo data
        if (!localStorage.getItem('vtop_demo_initialized')) {
            localStorage.setItem('vtop_demo_initialized', 'true');
            
            // Add some sample leave requests
            const sampleLeaves = [
                {
                    leave_type: "Medical Leave",
                    from_date: "2025-11-15",
                    to_date: "2025-11-17",
                    reason: "Fever and doctor's appointment",
                    status: "Approved",
                    created_at: "2025-11-14T10:30:00Z"
                },
                {
                    leave_type: "Personal Leave",
                    from_date: "2025-10-20",
                    to_date: "2025-10-21",
                    reason: "Family function",
                    status: "Approved",
                    created_at: "2025-10-18T14:20:00Z"
                }
            ];
            
            localStorage.setItem('vtop_leave_requests', JSON.stringify(sampleLeaves));
            this.leaveRequests = sampleLeaves;
        } else {
            const stored = localStorage.getItem('vtop_leave_requests');
            this.leaveRequests = stored ? JSON.parse(stored) : [];
        }
    }

    verifyLogin(studentId, password) {
        const validCredentials = [
            { id: "21BCE001", password: "demo123", name: "Alex Johnson" },
            { id: "21BCE002", password: "demo123", name: "Raj Sharma" },
            { id: "21BCE003", password: "demo123", name: "Priya Patel" },
            { id: "21BCE004", password: "demo123", name: "Amit Kumar" },
            { id: "21BCE005", password: "demo123", name: "Sneha Reddy" }
        ];

        const isValid = validCredentials.some(cred => 
            cred.id === studentId && cred.password === password
        );

        if (isValid) {
            const student = validCredentials.find(cred => cred.id === studentId);
            localStorage.setItem('vtop_token', 'demo_token_' + studentId);
            localStorage.setItem('vtop_student', JSON.stringify({
                ...this.demoStudent,
                student_id: studentId,
                name: student.name,
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
        // Return only current semester grades by default
        return this.gradesData.filter(grade => grade.semester === 5);
    }

    getAllGrades() {
        // Return all grades for history
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
            created_at: new Date().toISOString(),
            request_id: 'REQ_' + Date.now()
        };
        this.leaveRequests.unshift(newLeave);
        localStorage.setItem('vtop_leave_requests', JSON.stringify(this.leaveRequests));
        return newLeave;
    }

    getCurriculum() {
        return [
            {
                semester: 1,
                courses: [
                    { code: "CSE1001", name: "Programming in C", credits: 4 },
                    { code: "MAT1001", name: "Calculus", credits: 4 },
                    { code: "PHY1001", name: "Physics", credits: 3 },
                    { code: "ENG1001", name: "Technical English", credits: 2 },
                    { code: "CHE1001", name: "Chemistry", credits: 3 }
                ]
            },
            {
                semester: 2,
                courses: [
                    { code: "CSE1002", name: "Object Oriented Programming", credits: 4 },
                    { code: "MAT1002", name: "Linear Algebra", credits: 4 },
                    { code: "CSE1003", name: "Digital Logic Design", credits: 3 },
                    { code: "ENG1002", name: "Communication Skills", credits: 2 },
                    { code: "PHY1002", name: "Engineering Physics", credits: 3 }
                ]
            },
            {
                semester: 3,
                courses: [
                    { code: "CSE2001", name: "Data Structures", credits: 4 },
                    { code: "CSE2002", name: "Algorithms", credits: 4 },
                    { code: "MAT2001", name: "Discrete Mathematics", credits: 4 },
                    { code: "CSE2003", name: "Computer Organization", credits: 3 }
                ]
            },
            {
                semester: 4,
                courses: [
                    { code: "CSE2004", name: "Operating Systems", credits: 3 },
                    { code: "CSE2005", name: "Database Systems", credits: 3 },
                    { code: "CSE2006", name: "Software Engineering", credits: 3 },
                    { code: "MAT2002", name: "Probability & Statistics", credits: 4 }
                ]
            },
            {
                semester: 5,
                courses: [
                    { code: "CSE2007", name: "Computer Networks", credits: 4 },
                    { code: "CSE2008", name: "Web Technologies", credits: 3 },
                    { code: "CSE2009", name: "Theory of Computation", credits: 3 },
                    { code: "CSE2010", name: "Artificial Intelligence", credits: 4 }
                ]
            }
        ];
    }

    calculateGPA() {
        const gradePoints = { 
            'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0 
        };
        let totalPoints = 0;
        let totalCredits = 0;
        
        this.getGrades().forEach(g => {
            totalPoints += gradePoints[g.grade] * g.credits;
            totalCredits += g.credits;
        });
        
        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    }

    getOverallAttendance() {
        const attendance = this.getAttendance();
        if (attendance.length === 0) return 0;
        
        const totalPercentage = attendance.reduce((sum, course) => sum + course.percentage, 0);
        return (totalPercentage / attendance.length).toFixed(1);
    }

    getUpcomingClasses() {
        const today = new Date().getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayName = days[today];
        
        return this.timetableData
            .filter(slot => slot.day === todayName)
            .sort((a, b) => a.slot.localeCompare(b.slot));
    }

    groupBySemester() {
        const grouped = {};
        this.getAllGrades().forEach(grade => {
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

    // New method: Get recent activity
    getRecentActivity() {
        const activities = [];
        
        // Add recent messages
        this.messagesData.slice(0, 3).forEach(msg => {
            activities.push({
                type: 'message',
                course: msg.course_name,
                content: msg.message,
                time: msg.date,
                icon: 'message-square'
            });
        });
        
        // Add upcoming deadlines
        activities.push({
            type: 'deadline',
            course: 'Data Structures',
            content: 'Assignment 2 due tomorrow',
            time: '2025-11-30',
            icon: 'calendar'
        });
        
        return activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    }

    // New method: Update profile
    updateProfile(updatedFields) {
        const currentProfile = this.getProfile();
        const updatedProfile = { ...currentProfile, ...updatedFields };
        localStorage.setItem('vtop_student', JSON.stringify(updatedProfile));
        return updatedProfile;
    }
}

// Initialize global data service instance
const dataService = new DataService();