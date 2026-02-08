"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getStudentProfile } from "./student"

export async function getCourseRegistrations() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  const profile = await getStudentProfile()
  if (!profile) return []

  return await prisma.courseRegistration.findMany({
    where: { studentId: profile.id },
    include: { course: { include: { faculty: { include: { user: true } } } } },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getCourses() {
  return await prisma.course.findMany({
    include: { faculty: { include: { user: true } } }
  })
}

export async function getCourseMaterials(courseId: string) {
  return await prisma.courseMaterial.findMany({
    where: { courseId }
  })
}

export async function registerCourse(courseId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  const profile = await getStudentProfile()
  if (!profile) throw new Error("Profile not found")

  return await prisma.courseRegistration.create({
    data: {
      studentId: profile.id,
      courseId,
      status: "REGISTERED",
      sem: "Winter 2024-25"
    }
  })
}

export async function dropCourse(registrationId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")

  return await prisma.courseRegistration.delete({
    where: { id: registrationId }
  })
}

export async function getAcademicEvents() {
  return await prisma.academicEvent.findMany({
    orderBy: { date: 'asc' }
  })
}

export async function getSemesterMilestones() {
  return await prisma.semesterMilestone.findMany({
    orderBy: { date: 'asc' }
  })
}
