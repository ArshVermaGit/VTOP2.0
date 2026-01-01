import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, Video, Download, ExternalLink, Archive, GraduationCap, Link2 } from "lucide-react"
import { getCourseRegistrations, getCourseMaterials } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export default async function StudentMaterialsPage() {
  const registrations = await getCourseRegistrations()

  // For each registration, we could fetch materials. 
  // Let's optimize by assuming we'll fetch them in the component or pre-fetch them.
  const coursesWithMaterials = await Promise.all(
    registrations.map(async (reg) => {
      const materials = await getCourseMaterials(reg.courseId)
      return { ...reg.course, materials }
    })
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <Archive className="w-8 h-8 text-orange-400" /> Learning Resources
          </h1>
          <p className="text-gray-400 mt-1">Syllabus, notes, and professional course materials</p>
        </div>
        <Badge className="bg-orange-600/20 text-orange-400 border border-orange-500/30 px-4 py-1">4 COURSES ACTIVE</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {coursesWithMaterials.map((course) => (
          <Card key={course.id} className="bg-white/5 border-white/10 overflow-hidden shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-black/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/40">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-blue-400 font-bold tracking-widest text-[10px] uppercase">{course.code}</CardDescription>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                <Download className="w-4 h-4 mr-2" /> Download All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {/* Syllabus Section (Special) */}
                  <div className="p-6 border-b md:border-b-0 md:border-r border-white/5 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded bg-purple-600/20 text-purple-400">
                             <FileText className="w-4 h-4" />
                          </div>
                          <h4 className="text-white font-bold text-sm">Course Syllabus</h4>
                      </div>
                      <p className="text-xs text-gray-400 mb-6">Complete curriculum breakdown and assessment plan for Winter 2024-25.</p>
                      <Button className="w-full bg-purple-600/10 text-purple-400 border border-purple-500/30 hover:bg-purple-600 hover:text-white transition-all">
                        <Link2 className="w-4 h-4 mr-2" /> View Syllabus
                      </Button>
                  </div>

                  {/* Materials List */}
                  {course.materials.map((material) => (
                    <div key={material.id} className="p-6 border-b md:border-b-0 md:border-r last:border-r-0 border-white/5 hover:bg-white/[0.02] transition-colors group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded ${material.type === 'VIDEO' ? 'bg-red-600/20 text-red-400' : material.type === 'NOTES' ? 'bg-blue-600/20 text-blue-400' : 'bg-emerald-600/20 text-emerald-400'}`}>
                                {material.type === 'VIDEO' ? <Video className="w-4 h-4" /> : material.type === 'NOTES' ? <FileText className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                            </div>
                            <h4 className="text-white font-bold text-sm truncate">{material.title}</h4>
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{material.type}</span>
                            <Button size="icon" variant="ghost" className="text-gray-400 group-hover:text-blue-400">
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
