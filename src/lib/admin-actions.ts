import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// --- ADMIN DASHBOARD ACTIONS ---

export async function getAdminDashboardData() {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as { role: string }).role !== 'ADMIN') throw new Error("Unauthorized")

  const [usersCount, studentsCount, facultyCount, parentsCount, logs] = await Promise.all([
    prisma.user.count(),
    prisma.studentProfile.count(),
    prisma.facultyProfile.count(),
    prisma.parentProfile.count(),
    prisma.securityAudit.findMany({
      take: 5,
      orderBy: { timestamp: 'desc' },
      include: { user: true }
    })
  ])

  return {
    stats: {
      users: usersCount,
      students: studentsCount,
      faculty: facultyCount,
      parents: parentsCount
    },
    logs
  }
}
