import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, User, BookOpen } from "lucide-react"
import { getTimetable } from "@/lib/actions"

export default async function TimetablePage() {
  const timetableItems = await getTimetable()
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  return (
    <div className="space-y-6">
       <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Time Table</h1>
           <p className="text-gray-400 mt-1">Your weekly academic schedule and class venues</p>
        </div>

        <Tabs defaultValue="Monday" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1 w-full justify-start overflow-x-auto">
                {days.map(day => (
                    <TabsTrigger key={day} value={day} className="data-[state=active]:bg-blue-600 data-[state=active]:text-white min-w-[100px]">
                        {day}
                    </TabsTrigger>
                ))}
            </TabsList>

            {days.map(day => (
                <TabsContent key={day} value={day} className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {timetableItems.filter(item => item.day === day).length > 0 ? (
                        timetableItems.filter(item => item.day === day).map((item, i) => (
                            <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors group">
                                <CardContent className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
                                    <div className="flex items-center gap-6">
                                        <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-blue-500/10 flex flex-col items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                                            <span className="text-lg font-bold text-blue-400">{item.startTime}</span>
                                            <span className="text-xs text-gray-500 uppercase">{item.endTime}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">{item.slot}</Badge>
                                                <h3 className="text-xl font-bold text-white">{item.course.title}</h3>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                                    <BookOpen className="w-4 h-4 text-purple-400" />
                                                    {item.course.code}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                                    <MapPin className="w-4 h-4 text-rose-400" />
                                                    {item.venue}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="bg-blue-600/10 text-blue-400 border-blue-500/20 px-4 py-1 h-fit">
                                        {item.course.type.toUpperCase()}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-dashed border-white/10 rounded-2xl text-gray-500">
                            <Clock className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-lg font-medium">No classes scheduled for {day}</p>
                            <p className="text-sm">Enjoy your day off!</p>
                        </div>
                    )}
                </TabsContent>
            ))}
        </Tabs>
    </div>
  )
}
