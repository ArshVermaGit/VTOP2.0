import { getStudentProfile } from "@/lib/actions"
import { PreferencesForm } from "@/components/settings/PreferencesForm"
import { redirect } from "next/navigation"

export default async function PreferencesPage() {
  const profile = await getStudentProfile()
  
  if (!profile) {
    redirect("/")
  }

  return (
    <PreferencesForm 
      email={profile.user.email || "N/A"} 
      mobile={profile.mobile || "N/A"} 
    />
  )
}
