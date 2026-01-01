import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Award, Users, BookOpen, Send, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getResearchProfile } from "@/lib/actions"

export default async function ResearchPage() {
  const research = await getResearchProfile()

  if (!research) return <div className="p-12 text-center text-gray-500">Research profile not found.</div>

  const stats = [
    { label: "Publications", value: research.publications.toString(), icon: FileText, color: "text-blue-400" },
    { label: "Citations", value: research.citations.toString(), icon: Award, color: "text-purple-400" },
    { label: "h-index", value: research.hIndex.toString(), icon: Users, color: "text-rose-400" },
    { label: "i10-index", value: "2", icon: BookOpen, color: "text-emerald-400" },
  ]

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
               <h1 className="text-3xl font-bold text-white tracking-tight">Research Portal</h1>
               <p className="text-gray-400 mt-1">Manage your publications, citations and research projects</p>
           </div>
           <Button className="bg-blue-600 hover:bg-blue-700">
               <Plus className="w-4 h-4 mr-2" /> Add Publication
           </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">{stat.label}</CardTitle>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Tabs defaultValue="publications" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1">
                <TabsTrigger value="publications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Publications</TabsTrigger>
                <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Projects</TabsTrigger>
                <TabsTrigger value="thesis" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white">Thesis Status</TabsTrigger>
            </TabsList>

            <TabsContent value="publications" className="mt-6 space-y-4">
                 <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Publications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-black/20 border border-white/5 hover:border-blue-500/30 transition-colors group">
                             <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors cursor-pointer">Deep Learning Approaches for Medical Imaging: A Survey</h4>
                             <p className="text-sm text-gray-500 mt-1">Journal of Medical Systems • 2024</p>
                             <div className="flex gap-2 mt-3">
                                 <Badge variant="outline" className="text-[10px] border-white/10">Scopus</Badge>
                                 <Badge variant="outline" className="text-[10px] border-white/10">Q1 Journal</Badge>
                             </div>
                        </div>
                    </CardContent>
                 </Card>
            </TabsContent>

            <TabsContent value="thesis" className="mt-6">
                 <Card className="bg-white/5 border-white/10">
                     <CardHeader>
                         <CardTitle className="text-white">Ph.D / Masters Thesis Progress</CardTitle>
                         <CardDescription>Current status: <span className="text-rose-400 font-bold">{research.thesisStatus || "In Program"}</span></CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                         <div className="space-y-2">
                             <div className="flex justify-between text-sm">
                                 <span className="text-gray-400">Literature Review</span>
                                 <span className="text-blue-400">100%</span>
                             </div>
                             <Progress value={100} className="h-2 bg-black/40" />
                         </div>
                         <div className="space-y-2">
                             <div className="flex justify-between text-sm">
                                 <span className="text-gray-400">Data Collection & Analysis</span>
                                 <span className="text-blue-400">75%</span>
                             </div>
                             <Progress value={75} className="h-2 bg-black/40" />
                         </div>
                         <div className="space-y-2">
                             <div className="flex justify-between text-sm">
                                 <span className="text-gray-400">Thesis Writing</span>
                                 <span className="text-blue-400">45%</span>
                             </div>
                             <Progress value={45} className="h-2 bg-black/40" />
                         </div>
                     </CardContent>
                 </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}
