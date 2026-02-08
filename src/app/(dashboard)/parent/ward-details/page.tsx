import { getParentDashboardData } from "@/lib/actions"
import { WardAuditHeader } from "@/sections/parent/WardAuditHeader"
import { IdentityCard } from "@/sections/parent/IdentityCard"
import { WardAnalytics } from "@/sections/parent/WardAnalytics"
import { ParentDashboardData } from "@/types"

export default async function WardDetailsPage() {
  const data = await getParentDashboardData() as ParentDashboardData | null
  if (!data) return <div className="p-10 text-white font-black uppercase text-xs" > Unauthorized. </div>

  const { profile } = data
  const student = profile.student

  if (!student) return (
    <div className="p-10 text-white font-black uppercase text-xs tracking-widest text-center border border-dashed border-white/10 rounded-3xl" >
      Ward profile data extraction failed.
    </div>
  )

  return (
    <div className="space-y-8 pb-10" >
      <WardAuditHeader student={student} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" >
        <div className="space-y-6" >
          <IdentityCard student={student} />
        </div>

        <div className="lg:col-span-3" >
          <WardAnalytics student={student} />
        </div>
      </div>
    </div>
  )
}
