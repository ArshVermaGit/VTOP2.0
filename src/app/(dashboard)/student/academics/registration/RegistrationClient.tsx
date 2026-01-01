"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle2, XCircle, Search, Clock, MapPin, User, ChevronRight, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { registerCourse, dropCourse } from "@/lib/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function RegistrationClient({ allCourses, initialRegistrations }: { allCourses: any[], initialRegistrations: any[] }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null)

  const registeredIds = new Set(initialRegistrations.map(r => r.courseId))
  const registrationMap = initialRegistrations.reduce((acc, r) => ({ ...acc, [r.courseId]: r.id }), {})

  const filteredCourses = allCourses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRegister = async (courseId: string) => {
    setIsSubmitting(courseId)
    try {
      await registerCourse(courseId)
      toast.success("Course registered successfully!")
      router.refresh()
    } catch (error) {
      toast.error("Failed to register course.")
    } finally {
      setIsSubmitting(null)
    }
  }

  const handleDrop = async (registrationId: string) => {
    setIsSubmitting(registrationId)
    try {
      await dropCourse(registrationId)
      toast.success("Course dropped successfully.")
      router.refresh()
    } catch (error) {
      toast.error("Failed to drop course.")
    } finally {
      setIsSubmitting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input 
          placeholder="Search courses by name or code..." 
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCourses.map((course) => {
          const isRegistered = registeredIds.has(course.id)
          const registrationId = registrationMap[course.id]

          return (
            <Card key={course.id} className={`bg-white/5 border-white/10 overflow-hidden transition-all hover:bg-white/[0.07] ${isRegistered ? 'border-emerald-500/30' : ''}`}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                  <div className={`p-4 rounded-xl shrink-0 h-fit ${isRegistered ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-600/10 text-blue-400 border border-blue-500/20'}`}>
                    <BookOpen className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold text-white tracking-tight">{course.title}</h3>
                      <Badge variant="outline" className="text-[10px] text-gray-500 border-white/10 font-bold uppercase tracking-widest">{course.code}</Badge>
                      <Badge className={course.category === 'Program Core' ? 'bg-purple-600/20 text-purple-400 border-purple-500/20' : 'bg-blue-600/20 text-blue-400 border-blue-500/20'}>
                        {course.category}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-orange-400" /> {course.faculty?.user.name || "TBA"}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-400" /> {course.slot || "N/A"}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-rose-400" /> {course.venue || "N/A"}</span>
                      <span className="font-bold text-gray-300">{course.credits} CREDITS</span>
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-px h-px md:h-12 bg-white/5" />

                  <div className="shrink-0 w-full md:w-32">
                    {isRegistered ? (
                      <Button 
                        variant="ghost" 
                        className="w-full text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-bold"
                        onClick={() => handleDrop(registrationId)}
                        disabled={isSubmitting !== null}
                      >
                        {isSubmitting === registrationId ? "Processing..." : <span className="flex items-center gap-2"><XCircle className="w-4 h-4" /> DROP</span>}
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-900/40"
                        onClick={() => handleRegister(course.id)}
                        disabled={isSubmitting !== null}
                      >
                        {isSubmitting === course.id ? "Registering..." : <span className="flex items-center gap-2">REGISTER <ChevronRight className="w-4 h-4" /></span>}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-3xl">
           <AlertTriangle className="w-12 h-12 text-yellow-500/30 mx-auto mb-4" />
           <p className="text-gray-500 font-medium">No courses matching your search criteria were found.</p>
        </div>
      )}
    </div>
  )
}
