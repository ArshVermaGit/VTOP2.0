import { getLibraryStatus } from "@/lib/actions"
import { LibraryHeader } from "@/sections/student/library/LibraryHeader"
import { CirculationManager } from "@/sections/student/library/CirculationManager"
import { LibraryDues } from "@/sections/student/library/LibraryDues"
import { DigitalCommons } from "@/sections/student/library/DigitalCommons"
import { LibraryTools } from "@/sections/student/library/LibraryTools"
import { LibraryStatus } from "@/types/library"

export default async function LibraryPage() {
  const data = await getLibraryStatus() as LibraryStatus | null
  
  if (!data) return <div className="p-10 text-white font-black uppercase text-xs">Unauthorized or Library Profile not found.</div>

  const { issuedBooks, reservations, dues, eResources } = data

  return (
    <div className="space-y-6">
      <LibraryHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CIRCULATION & DUES */}
        <div className="lg:col-span-2 space-y-6">
          <CirculationManager 
            issuedBooks={issuedBooks} 
            reservations={reservations} 
          />
          <LibraryDues dues={dues} />
        </div>

        {/* SIDEBAR: E-RESOURCES & TOOLS */}
        <div className="space-y-6">
          <DigitalCommons resources={eResources} />
          <LibraryTools />
        </div>
      </div>
    </div>
  )
}
