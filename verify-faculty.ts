
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Verifying Faculty Data...")

  const user = await prisma.user.findUnique({
    where: { username: 'faculty1' },
    include: { facultyProfile: true }
  })

  console.log("Faculty User:", user)
  if (user) {
    console.log("Role:", user.role)
    console.log("Profile Linked:", user.facultyProfile ? "YES" : "NO")
  } else {
    console.error("User 'faculty1' NOT FOUND")
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
