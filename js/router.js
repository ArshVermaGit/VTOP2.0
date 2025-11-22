import { dataService } from './data.js';

export const router = {
    login: () => `
        <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
            <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
                <div class="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div class="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
            </div>

            <div class="glass-effect w-full max-w-md p-8 relative z-10 border-white/10 rounded-lg" data-testid="login-card">
                <div class="text-center mb-8">
                    <h1 class="text-5xl font-bold mb-2 gradient-text" data-testid="vtop-title">VTOP 2.0</h1>
                    <p class="text-gray-400 text-sm" data-testid="login-subtitle">Student Portal</p>
                </div>

                <form id="login-form" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium mb-2 text-gray-300" for="student-id">Student ID</label>
                        <input
                            id="student-id"
                            data-testid="student-id-input"
                            type="text"
                            placeholder="Enter your Student ID"
                            class="bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 rounded-lg p-3 w-full"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2 text-gray-300" for="password">Password</label>
                        <input
                            id="password"
                            data-testid="password-input"
                            type="password"
                            placeholder="Enter your password"
                            class="bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 rounded-lg p-3 w-full"
                            required
                        />
                    </div>

                    <button
                        data-testid="login-button"
                        type="submit"
                        class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-6 text-base rounded-lg"
                    >
                        Sign In
                    </button>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-xs text-gray-500" data-testid="demo-credentials">
                        Demo: 21BCE001 / demo123
                    </p>
                </div>
            </div>
        </div>
    `,

    dashboard: () => {
        const student = dataService.getProfile();
        const quickLinks = [
            { name: "Profile", icon: "user", path: "/profile", color: "from-cyan-500 to-blue-500" },
            { name: "Attendance", icon: "calendar", path: "/attendance", color: "from-blue-500 to-purple-500" },
            { name: "Marks", icon: "bar-chart", path: "/marks", color: "from-purple-500 to-pink-500" },
            { name: "Grades", icon: "award", path: "/grades", color: "from-pink-500 to-red-500" },
            { name: "Time Table", icon: "clock", path: "/timetable", color: "from-red-500 to-orange-500" },
            { name: "Exam Schedule", icon: "book-open", path: "/exams", color: "from-orange-500 to-yellow-500" },
            { name: "Payments", icon: "credit-card", path: "/payments", color: "from-yellow-500 to-green-500" },
            { name: "Messages", icon: "message-square", path: "/messages", color: "from-green-500 to-teal-500" },
            { name: "Leave Request", icon: "file-text", path: "/leave", color: "from-teal-500 to-cyan-500" },
            { name: "Hostel", icon: "home", path: "/hostel", color: "from-cyan-500 to-blue-500" }
        ];

        return `
            <div class="animate-fade-in" data-testid="dashboard-container">
                <div class="mb-8">
                    <h1 class="text-4xl font-bold mb-2" data-testid="welcome-message">
                        Welcome back, ${student?.name || "Student"}
                    </h1>
                    <p class="text-gray-400" data-testid="student-id-display">${student?.student_id} | ${student?.branch}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    ${quickLinks.map(link => `
                        <a href="${link.path}" data-link data-testid="quick-link-${link.name.toLowerCase().replace(/ /g, '-')}" 
                           class="glass-effect p-6 cursor-pointer hover:scale-105 transition-all duration-300 border-white/10 rounded-lg group block">
                            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <i data-lucide="${link.icon}" class="w-7 h-7 text-white"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                ${link.name}
                            </h3>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    },

    profile: () => {
        const profile = dataService.getProfile();
        return `
            <div class="animate-fade-in" data-testid="profile-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="profile-title">Student Profile</h1>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="glass-effect p-8 border-white/10 rounded-lg lg:col-span-1">
                        <div class="flex flex-col items-center">
                            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                                <i data-lucide="user" class="w-16 h-16 text-white"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-white mb-2" data-testid="profile-name">${profile.name}</h2>
                            <p class="text-gray-400" data-testid="profile-student-id">${profile.student_id}</p>
                        </div>
                    </div>

                    <div class="glass-effect p-8 border-white/10 rounded-lg lg:col-span-2">
                        <h3 class="text-2xl font-semibold mb-6 text-white">Personal Information</h3>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4">
                                <i data-lucide="mail" class="w-5 h-5 text-cyan-400"></i>
                                <div>
                                    <p class="text-sm text-gray-400">Email</p>
                                    <p class="text-white" data-testid="profile-email">${profile.email}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <i data-lucide="hash" class="w-5 h-5 text-cyan-400"></i>
                                <div>
                                    <p class="text-sm text-gray-400">Registration Number</p>
                                    <p class="text-white" data-testid="profile-reg-number">${profile.registration_number}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <i data-lucide="book-open" class="w-5 h-5 text-cyan-400"></i>
                                <div>
                                    <p class="text-sm text-gray-400">Program</p>
                                    <p class="text-white" data-testid="profile-program">${profile.program}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <i data-lucide="book-open" class="w-5 h-5 text-cyan-400"></i>
                                <div>
                                    <p class="text-sm text-gray-400">Branch</p>
                                    <p class="text-white" data-testid="profile-branch">${profile.branch}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <i data-lucide="calendar" class="w-5 h-5 text-cyan-400"></i>
                                <div>
                                    <p class="text-sm text-gray-400">Current Semester</p>
                                    <p class="text-white" data-testid="profile-semester">${profile.semester}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    attendance: () => {
        const attendance = dataService.getAttendance();
        
        const getColorClass = (percentage) => {
            if (percentage >= 85) return "text-green-400";
            if (percentage >= 75) return "text-yellow-400";
            return "text-red-400";
        };

        return `
            <div class="animate-fade-in" data-testid="attendance-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="attendance-title">Class Attendance</h1>

                <div class="grid grid-cols-1 gap-6">
                    ${attendance.map((record, index) => `
                        <div class="glass-effect p-6 border-white/10 rounded-lg" data-testid="attendance-card-${index}">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="text-xl font-semibold text-white" data-testid="course-name-${index}">${record.course_name}</h3>
                                    <p class="text-gray-400" data-testid="course-code-${index}">${record.course_code}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-3xl font-bold ${getColorClass(record.percentage)}" data-testid="attendance-percentage-${index}">
                                        ${record.percentage.toFixed(1)}%
                                    </p>
                                    <p class="text-sm text-gray-400" data-testid="attendance-ratio-${index}">
                                        ${record.attended_classes}/${record.total_classes}
                                    </p>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style="width: ${record.percentage}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    marks: () => {
        const marks = dataService.getMarks();
        return `
            <div class="animate-fade-in" data-testid="marks-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="marks-title">Internal Marks</h1>

                <div class="grid grid-cols-1 gap-6">
                    ${marks.map((record, index) => `
                        <div class="glass-effect p-6 border-white/10 rounded-lg" data-testid="marks-card-${index}">
                            <h3 class="text-xl font-semibold text-white mb-4" data-testid="marks-course-name-${index}">${record.course_name}</h3>
                            <p class="text-gray-400 mb-4" data-testid="marks-course-code-${index}">${record.course_code}</p>
                            
                            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div class="bg-white/5 p-4 rounded-lg">
                                    <p class="text-sm text-gray-400">CAT-1</p>
                                    <p class="text-2xl font-bold text-cyan-400" data-testid="cat1-${index}">${record.cat1}/50</p>
                                </div>
                                <div class="bg-white/5 p-4 rounded-lg">
                                    <p class="text-sm text-gray-400">CAT-2</p>
                                    <p class="text-2xl font-bold text-cyan-400" data-testid="cat2-${index}">${record.cat2}/50</p>
                                </div>
                                <div class="bg-white/5 p-4 rounded-lg">
                                    <p class="text-sm text-gray-400">Assignment</p>
                                    <p class="text-2xl font-bold text-cyan-400" data-testid="assignment-${index}">${record.assignment}/20</p>
                                </div>
                                <div class="bg-white/5 p-4 rounded-lg">
                                    <p class="text-sm text-gray-400">FAT</p>
                                    <p class="text-2xl font-bold text-cyan-400" data-testid="fat-${index}">${record.fat}/100</p>
                                </div>
                                <div class="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-lg">
                                    <p class="text-sm text-white">Total</p>
                                    <p class="text-2xl font-bold text-white" data-testid="total-${index}">${record.total}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    grades: () => {
        const grades = dataService.getGrades();
        const gpa = dataService.calculateGPA();
        
        return `
            <div class="animate-fade-in" data-testid="grades-container">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-4xl font-bold gradient-text" data-testid="grades-title">Grades</h1>
                    <div class="glass-effect px-6 py-4 border-white/10 rounded-lg">
                        <p class="text-sm text-gray-400">Current GPA</p>
                        <p class="text-3xl font-bold text-cyan-400" data-testid="current-gpa">${gpa}</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                    ${grades.map((record, index) => `
                        <div class="glass-effect p-6 border-white/10 rounded-lg" data-testid="grade-card-${index}">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h3 class="text-xl font-semibold text-white" data-testid="grade-course-name-${index}">${record.course_name}</h3>
                                    <p class="text-gray-400" data-testid="grade-course-code-${index}">${record.course_code}</p>
                                    <p class="text-sm text-gray-500 mt-1" data-testid="grade-semester-${index}">Semester ${record.semester}</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" data-testid="grade-value-${index}">
                                        ${record.grade}
                                    </div>
                                    <p class="text-sm text-gray-400 mt-1" data-testid="grade-credits-${index}">${record.credits} Credits</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    'grade-history': () => {
        const groupedGrades = dataService.groupBySemester();
        
        return `
            <div class="animate-fade-in" data-testid="grade-history-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="grade-history-title">Grade History</h1>

                <div class="space-y-6">
                    ${Object.keys(groupedGrades).map((semester, index) => `
                        <div class="glass-effect p-6 border-white/10 rounded-lg" data-testid="semester-history-card-${index}">
                            <h2 class="text-2xl font-semibold text-white mb-4" data-testid="semester-history-title-${index}">Semester ${semester}</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${groupedGrades[semester].map((grade, idx) => `
                                    <div class="bg-white/5 p-4 rounded-lg" data-testid="grade-history-${index}-${idx}">
                                        <h3 class="text-lg font-semibold text-white" data-testid="grade-history-course-${index}-${idx}">${grade.course_name}</h3>
                                        <p class="text-gray-400" data-testid="grade-history-code-${index}-${idx}">${grade.course_code}</p>
                                        <div class="flex justify-between items-center mt-2">
                                            <span class="text-2xl font-bold text-cyan-400" data-testid="grade-history-grade-${index}-${idx}">${grade.grade}</span>
                                            <span class="text-gray-400" data-testid="grade-history-credits-${index}-${idx}">${grade.credits} Credits</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    timetable: () => {
        const groupedTimetable = dataService.groupTimetableByDay();
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        return `
            <div class="animate-fade-in" data-testid="timetable-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="timetable-title">Time Table</h1>

                <div class="space-y-6">
                    ${days.map((day, dayIndex) => `
                        <div class="glass-effect p-6 border-white/10 rounded-lg" data-testid="day-card-${day.toLowerCase()}">
                            <h2 class="text-2xl font-semibold text-white mb-4" data-testid="day-title-${day.toLowerCase()}">${day}</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${(groupedTimetable[day] || []).map((slot, index) => `
                                    <div class="bg-white/5 p-4 rounded-lg" data-testid="slot-${day.toLowerCase()}-${index}">
                                        <div class="flex items-center space-x-2 mb-2">
                                            <i data-lucide="clock" class="w-4 h-4 text-cyan-400"></i>
                                            <span class="text-cyan-400" data-testid="slot-time-${day.toLowerCase()}-${index}">${slot.slot}</span>
                                        </div>
                                        <h3 class="text-lg font-semibold text-white" data-testid="slot-course-${day.toLowerCase()}-${index}">${slot.course_name}</h3>
                                        <p class="text-gray-400 text-sm" data-testid="slot-code-${day.toLowerCase()}-${index}">${slot.course_code}</p>
                                        <div class="flex items-center space-x-4 mt-2 text-sm">
                                            <div class="flex items-center space-x-1">
                                                <i data-lucide="user" class="w-4 h-4 text-gray-400"></i>
                                                <span class="text-gray-400" data-testid="slot-faculty-${day.toLowerCase()}-${index}">${slot.faculty}</span>
                                            </div>
                                            <div class="flex items-center space-x-1">
                                                <i data-lucide="map-pin" class="w-4 h-4 text-gray-400"></i>
                                                <span class="text-gray-400" data-testid="slot-venue-${day.toLowerCase()}-${index}">${slot.venue}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    curriculum: () => {
        const semesters = dataService.getCurriculum();
        
        return `
            <div class="animate-fade-in" data-testid="curriculum-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="curriculum-title">My Curriculum</h1>

                <div class="space-y-6">
                    ${semesters.map((sem, index) => `
                        <div class="glass-effect p-6 border-white/10 rounded-lg" data-testid="semester-card-${index}">
                            <h2 class="text-2xl font-semibold text-white mb-4" data-testid="semester-title-${index}">Semester ${sem.semester}</h2>
                            <div class="grid grid-cols-1 gap-4">
                                ${sem.courses.map((course, idx) => `
                                    <div class="bg-white/5 p-4 rounded-lg flex items-center space-x-4" data-testid="course-${index}-${idx}">
                                        <i data-lucide="book-open" class="w-5 h-5 text-cyan-400"></i>
                                        <div class="flex-1">
                                            <h3 class="text-lg font-semibold text-white" data-testid="course-name-${index}-${idx}">${course.name}</h3>
                                            <p class="text-gray-400" data-testid="course-code-${index}-${idx}">${course.code}</p>
                                        </div>
                                        <span class="text-cyan-400 font-semibold" data-testid="course-credits-${index}-${idx}">${course.credits} Credits</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    exams: () => {
        const exams = dataService.getExams();
        
        return `
            <div class="animate-fade-in" data-testid="exams-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="exams-title">Exam Schedule</h1>

                <div class="grid grid-cols-1 gap-6">
                    ${exams.map((exam, index) => `
                        <div class="glass-effect p-6 border-white/10 rounded-lg" data-testid="exam-card-${index}">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h3 class="text-xl font-semibold text-white mb-2" data-testid="exam-course-name-${index}">${exam.course_name}</h3>
                                    <div class="space-y-2">
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="calendar" class="w-4 h-4 text-gray-400"></i>
                                            <span class="text-gray-400 text-sm" data-testid="exam-date-${index}">${exam.date}</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="clock" class="w-4 h-4 text-gray-400"></i>
                                            <span class="text-gray-400 text-sm" data-testid="exam-time-${index}">${exam.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-3xl font-bold text-cyan-400 mb-2" data-testid="exam-type-${index}">${exam.exam_type}</p>
                                    <div class="flex items-center space-x-1 text-green-400">
                                        <i data-lucide="map-pin" class="w-4 h-4"></i>
                                        <span class="text-sm" data-testid="exam-venue-${index}">${exam.venue}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    payments: () => {
        const payments = dataService.getPayments();
        
        return `
            <div class="animate-fade-in" data-testid="payments-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="payments-title">Payment History</h1>

                <div class="grid grid-cols-1 gap-6">
                    ${payments.map((payment, index) => `
                        <div class="glass-effect p-6 border-white/10 rounded-lg" data-testid="payment-card-${index}">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h3 class="text-xl font-semibold text-white mb-2" data-testid="payment-description-${index}">${payment.description}</h3>
                                    <div class="space-y-2">
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="credit-card" class="w-4 h-4 text-gray-400"></i>
                                            <span class="text-gray-400 text-sm" data-testid="payment-transaction-id-${index}">${payment.transaction_id}</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="calendar" class="w-4 h-4 text-gray-400"></i>
                                            <span class="text-gray-400 text-sm" data-testid="payment-date-${index}">${payment.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-3xl font-bold text-cyan-400 mb-2" data-testid="payment-amount-${index}">₹${payment.amount.toLocaleString()}</p>
                                    <div class="flex items-center space-x-1 text-green-400">
                                        <i data-lucide="check-circle" class="w-4 h-4"></i>
                                        <span class="text-sm" data-testid="payment-status-${index}">${payment.status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    messages: () => {
        const messages = dataService.getMessages();
        
        return `
            <div class="animate-fade-in" data-testid="messages-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="messages-title">Class Messages</h1>

                <div class="grid grid-cols-1 gap-6">
                    ${messages.map((message, index) => `
                        <div class="glass-effect p-6 border-white/10 rounded-lg" data-testid="message-card-${index}">
                            <div class="flex items-start space-x-4">
                                <div class="bg-gradient-to-br from-cyan-500 to-blue-500 p-3 rounded-lg">
                                    <i data-lucide="message-square" class="w-6 h-6 text-white"></i>
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold text-white mb-1" data-testid="message-course-name-${index}">${message.course_name}</h3>
                                    <p class="text-gray-400 text-sm mb-3" data-testid="message-course-code-${index}">${message.course_code}</p>
                                    <p class="text-gray-300 mb-3" data-testid="message-content-${index}">${message.message}</p>
                                    <div class="flex items-center space-x-4 text-sm text-gray-400">
                                        <div class="flex items-center space-x-1">
                                            <i data-lucide="user" class="w-4 h-4"></i>
                                            <span data-testid="message-faculty-${index}">${message.faculty}</span>
                                        </div>
                                        <div class="flex items-center space-x-1">
                                            <i data-lucide="calendar" class="w-4 h-4"></i>
                                            <span data-testid="message-date-${index}">${message.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    leave: () => {
        const leaves = dataService.getLeaveRequests();
        
        const getStatusColor = (status) => {
            if (status === "Approved") return "text-green-400";
            if (status === "Rejected") return "text-red-400";
            return "text-yellow-400";
        };

        return `
            <div class="animate-fade-in" data-testid="leave-request-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="leave-request-title">Leave Request</h1>

                <div class="glass-effect p-6 border-white/10 rounded-lg mb-8" data-testid="leave-form-card">
                    <h2 class="text-2xl font-semibold mb-6 text-white">Submit New Leave Request</h2>
                    <form id="leave-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-2 text-gray-300" for="leave-type">Leave Type</label>
                            <input
                                id="leave-type"
                                name="leave_type"
                                data-testid="leave-type-input"
                                value="Sick Leave"
                                class="bg-white/5 border border-white/10 text-white rounded-lg p-3 w-full"
                            />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-300" for="from-date">From Date</label>
                                <input
                                    id="from-date"
                                    name="from_date"
                                    data-testid="from-date-input"
                                    type="date"
                                    class="bg-white/5 border border-white/10 text-white rounded-lg p-3 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-300" for="to-date">To Date</label>
                                <input
                                    id="to-date"
                                    name="to_date"
                                    data-testid="to-date-input"
                                    type="date"
                                    class="bg-white/5 border border-white/10 text-white rounded-lg p-3 w-full"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2 text-gray-300" for="reason">Reason</label>
                            <textarea
                                id="reason"
                                name="reason"
                                data-testid="reason-textarea"
                                class="bg-white/5 border border-white/10 text-white rounded-lg p-3 w-full textarea"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button
                            data-testid="submit-leave-button"
                            type="submit"
                            class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg"
                        >
                            Submit Request
                        </button>
                    </form>
                </div>

                <h2 class="text-2xl font-semibold mb-4 text-white">Previous Requests</h2>
                <div class="grid grid-cols-1 gap-6">
                    ${leaves.map((leave, index) => `
                        <div class="glass-effect p-6 border-white/10 rounded-lg" data-testid="leave-history-card-${index}">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="text-lg font-semibold text-white" data-testid="leave-type-${index}">${leave.leave_type}</h3>
                                    <p class="text-gray-400" data-testid="leave-dates-${index}">${leave.from_date} to ${leave.to_date}</p>
                                    <p class="text-gray-300 mt-2" data-testid="leave-reason-${index}">${leave.reason}</p>
                                </div>
                                <span class="font-semibold ${getStatusColor(leave.status)}" data-testid="leave-status-${index}">
                                    ${leave.status}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    hostel: () => {
        const hostel = dataService.getHostel();
        
        return `
            <div class="animate-fade-in" data-testid="hostel-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="hostel-title">Hostel Room Allotment</h1>

                <div class="glass-effect p-8 border-white/10 rounded-lg">
                    <div class="flex items-start space-x-6">
                        <div class="bg-gradient-to-br from-cyan-500 to-blue-500 p-6 rounded-2xl">
                            <i data-lucide="home" class="w-12 h-12 text-white"></i>
                        </div>
                        <div class="flex-1">
                            <h2 class="text-3xl font-bold text-white mb-6">Your Room Details</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="bg-white/5 p-4 rounded-lg">
                                    <p class="text-sm text-gray-400 mb-1">Block</p>
                                    <p class="text-2xl font-semibold text-cyan-400" data-testid="hostel-block">${hostel.block}</p>
                                </div>
                                <div class="bg-white/5 p-4 rounded-lg">
                                    <p class="text-sm text-gray-400 mb-1">Room Number</p>
                                    <p class="text-2xl font-semibold text-cyan-400" data-testid="hostel-room">${hostel.room_number}</p>
                                </div>
                                <div class="bg-white/5 p-4 rounded-lg">
                                    <p class="text-sm text-gray-400 mb-1">Bed Number</p>
                                    <p class="text-2xl font-semibold text-cyan-400" data-testid="hostel-bed">${hostel.bed_number}</p>
                                </div>
                                <div class="bg-white/5 p-4 rounded-lg">
                                    <p class="text-sm text-gray-400 mb-1">Allotment Date</p>
                                    <div class="flex items-center space-x-2">
                                        <i data-lucide="calendar" class="w-5 h-5 text-cyan-400"></i>
                                        <p class="text-xl font-semibold text-white" data-testid="hostel-date">${hostel.allotment_date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    'change-password': () => {
        return `
            <div class="animate-fade-in" data-testid="change-password-container">
                <h1 class="text-4xl font-bold mb-8 gradient-text" data-testid="change-password-title">Change Password</h1>

                <div class="glass-effect p-8 border-white/10 rounded-lg max-w-xl">
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-2xl">
                            <i data-lucide="lock" class="w-8 h-8 text-white"></i>
                        </div>
                        <div>
                            <h2 class="text-2xl font-semibold text-white">Update Your Password</h2>
                            <p class="text-gray-400 text-sm">Keep your account secure</p>
                        </div>
                    </div>

                    <form id="change-password-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-2 text-gray-300" for="old-password">Current Password</label>
                            <input
                                id="old-password"
                                data-testid="old-password-input"
                                type="password"
                                class="bg-white/5 border border-white/10 text-white rounded-lg p-3 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2 text-gray-300" for="new-password">New Password</label>
                            <input
                                id="new-password"
                                data-testid="new-password-input"
                                type="password"
                                class="bg-white/5 border border-white/10 text-white rounded-lg p-3 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2 text-gray-300" for="confirm-password">Confirm New Password</label>
                            <input
                                id="confirm-password"
                                data-testid="confirm-password-input"
                                type="password"
                                class="bg-white/5 border border-white/10 text-white rounded-lg p-3 w-full"
                                required
                            />
                        </div>
                        <button
                            data-testid="change-password-button"
                            type="submit"
                            class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 rounded-lg"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        `;
    },

    '404': () => `
        <div class="min-h-screen flex items-center justify-center bg-black">
            <div class="text-center">
                <h1 class="text-6xl font-bold gradient-text mb-4">404</h1>
                <p class="text-gray-400 text-xl mb-8">Page not found</p>
                <a href="/dashboard" data-link class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg">
                    Go to Dashboard
                </a>
            </div>
        </div>
    `
};