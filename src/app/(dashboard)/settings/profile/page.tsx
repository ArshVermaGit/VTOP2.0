import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function SettingsProfileRedirect() {
  const session = await getServerSession(authOptions)
  
  if (session?.user?.role === 'FACULTY') {
    redirect("/faculty/profile")
  }
  
  redirect("/student/profile")
}
