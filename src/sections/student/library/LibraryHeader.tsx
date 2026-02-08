"use client"

import { Library, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function LibraryHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
           <Library className="w-8 h-8 text-blue-600" /> University Library
        </h1>
        <p className="text-slate-500 mt-1">Central Catalog, E-Resources & Circulation Services</p>
      </div>
      <div className="flex items-center gap-3">
         <Link href="/student/services/library/search">
             <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-widest px-6 h-10 shadow-lg">
                <Search className="w-4 h-4 mr-2" /> Search Catalog
             </Button>
         </Link>
         <Badge className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-1 uppercase font-black text-[9px]">24/7 Access Active</Badge>
      </div>
    </div>
  )
}

