export const dynamic = 'force-dynamic'
import { Sidebar } from "@/components/layout/Sidebar";
import { PageTransition } from "@/components/animations/PageTransition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
         {/* Background Ambient Mesh - Light Mode */}
         <div className="fixed inset-0 pointer-events-none z-0">
             <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[150px]" />
             <div className="absolute bottom-[-20%] left-[-20%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[150px]" />
         </div>
         
        <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
            <PageTransition>
                {children}
            </PageTransition>
        </div>
      </main>
    </div>
  )
}

