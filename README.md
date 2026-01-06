# VTOP 2.0

A modern, premium university portal application built with Next.js 16, featuring role-based dashboards for Students, Faculty, Parents, and Administrators.

## Features

- **Student Portal**: Academics, Attendance, Grades, Exam Schedules, Research, Finance, Hostel & more
- **Faculty Portal**: Dashboard, Schedule, Attendance Marking, Marks Entry, Proctee Management
- **Parent Portal**: Ward Monitoring, Performance Tracking, Fee Payments, Schedule View
- **Admin Portal**: System Health, User Management, Database Monitoring

## Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: NextAuth.js with credentials provider

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Setup database**:

   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

3. **Run development server**:

   ```bash
   npm run dev
   ```

4. **Production build**:
   ```bash
   npm run build
   npm start
   ```

## Demo Credentials

| Role    | Username | Password    |
| ------- | -------- | ----------- |
| Student | student1 | password    |
| Faculty | faculty1 | password123 |
| Parent  | parent1  | password    |
| Admin   | admin    | password    |

## Deployment

This application is ready for deployment on Vercel or any Node.js hosting platform.

```bash
npm run build
```

## License

MIT © 2026
