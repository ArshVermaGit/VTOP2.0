import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({
    where: { username: 'admin' }
  })
  console.log('User found:', user ? 'YES' : 'NO')
  process.exit(0)
}

main()
