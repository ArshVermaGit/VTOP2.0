"use client"

import { useState } from "react"
import { searchBooks, reserveBook } from "@/lib/actions"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Book, 
  Search, 
  Loader2, 
  BookmarkPlus, 
  Info,
  ChevronLeft,
  Filter,
  Layers,
  MapPin
} from "lucide-react"
import Link from "next/link"

export default function LibrarySearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!query) return
    setLoading(true)
    try {
      const books = await searchBooks(query)
      setResults(books)
      setHasSearched(true)
    } finally {
      setLoading(false)
    }
  }

  const handleReserve = async (bookId: string) => {
    try {
      await reserveBook(bookId)
      alert("Book reserved successfully!")
    } catch (error) {
      alert("Failed to reserve book.")
    }
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center justify-between">
          <Link href="/student/services/library">
              <Button variant="ghost" className="text-gray-400 hover:text-white uppercase font-black text-[10px] tracking-widest gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back to Library
              </Button>
          </Link>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-gray-500 font-black uppercase text-[9px] gap-2">
                 <Filter className="w-3 h-3" /> Filters
             </Button>
             <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-gray-500 font-black uppercase text-[9px] gap-2">
                 <Layers className="w-3 h-3" /> History
             </Button>
          </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6 text-center">
          <div className="space-y-2">
              <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase flex items-center justify-center gap-4">
                  <span className="text-indigo-500">Global</span> Catalog Search
              </h1>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">Explore 500,000+ volumes and digital subscriptions</p>
          </div>

          <div className="flex items-center gap-2 bg-[#0A0A0B]/80 p-2 rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)] backdrop-blur-2xl">
             <Search className="w-5 h-5 text-gray-600 ml-4" />
             <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by Title, Author, ISBN or Category..." 
                className="bg-transparent border-none text-white placeholder:text-gray-700 focus-visible:ring-0 h-14 text-sm font-medium"
             />
             <Button onClick={handleSearch} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] tracking-widest px-10 rounded-xl h-14 transition-all shadow-xl shadow-indigo-600/20">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search catalog"}
             </Button>
          </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
           <div className="flex flex-col items-center justify-center p-20 gap-4">
               <Loader2 className="w-12 h-12 text-indigo-500/20 animate-spin" />
               <p className="text-[10px] text-gray-600 uppercase font-black animate-pulse">Querying Central Repository...</p>
           </div>
        ) : hasSearched && results.length === 0 ? (
            <div className="text-center p-20 border border-dashed border-white/5 rounded-3xl">
                <p className="text-gray-700 uppercase font-black text-[11px] italic">No matches found for your criteria</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((book) => (
                    <Card key={book.id} className="bg-[#0f1115]/50 border-white/10 group hover:border-indigo-500/30 transition-all hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.2)] overflow-hidden">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex gap-4">
                                <div className="w-16 h-24 rounded-lg bg-black/40 border border-white/5 flex flex-col items-center justify-center text-gray-700 group-hover:text-indigo-500 group-hover:border-indigo-500/20 transition-all overflow-hidden shrink-0">
                                    <Book className="w-8 h-8 opacity-40" />
                                    <div className="w-full bg-white/5 mt-2 py-0.5 text-[6px] font-black italic uppercase text-center">Edition 2024</div>
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                     <Badge className={`text-[7px] uppercase font-black h-4 px-2 italic ${book.availableCopies > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                                        {book.availableCopies > 0 ? `${book.availableCopies} Copies Available` : 'Out of Stock'}
                                    </Badge>
                                    <h3 className="text-white font-black text-sm uppercase italic tracking-tighter truncate group-hover:text-indigo-400 transition-colors">{book.title}</h3>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase truncate tracking-widest">By {book.author}</p>
                                    <div className="flex items-center gap-1.5 pt-1">
                                        <MapPin className="w-3 h-3 text-indigo-500/50" />
                                        <p className="text-[8px] text-gray-600 font-black uppercase tracking-tight">{book.location}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                                 <Button 
                                    onClick={() => handleReserve(book.id)} 
                                    disabled={book.availableCopies === 0} 
                                    className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white flex-1 h-9 font-black uppercase text-[9px] rounded-lg tracking-widest shadow-lg shadow-indigo-600/5 transition-all"
                                 >
                                     <BookmarkPlus className="w-3.5 h-3.5 mr-2" /> Reserve
                                 </Button>
                                 <Button variant="ghost" className="bg-white/5 hover:bg-white text-gray-600 hover:text-black h-9 px-4 rounded-lg transition-all">
                                     <Info className="w-4 h-4" />
                                 </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  )
}
