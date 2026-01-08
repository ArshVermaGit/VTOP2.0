const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const faculty = await prisma.facultyProfile.findMany({ include: { user: true } })
  const parents = await prisma.parentProfile.findMany({ include: { user: true } })
  const students = await prisma.studentProfile.findMany({ include: { user: true } })
  console.log('FACULTY:', JSON.stringify(faculty, null, 2))
  console.log('PARENTS:', JSON.stringify(parents, null, 2))
  console.log('STUDENTS:', JSON.stringify(students, null, 2))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
