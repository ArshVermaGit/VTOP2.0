
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Verifying data for 24BCG10026...")

  const user = await prisma.user.findUnique({
    where: { username: '24BCG10026' },
    include: { profile: true }
  })

  if (!user || !user.profile) {
    console.error("User or Profile not found!")
    return
  }

  const studentId = user.profile.id
  console.log(`Student ID: ${studentId}`)

  const admission = await prisma.hostelAdmission.findFirst({
    where: { studentId }
  })
  console.log("Hostel Admission:", admission)

  const payments = await prisma.payment.findMany({
    where: { studentId }
  })
  console.log("Payments:", payments)

  const survey = await prisma.feedbackSurvey.findFirst()
  console.log("Surveys:", survey)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
