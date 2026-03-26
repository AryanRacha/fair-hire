import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ArrowLeft, Download, Star, Filter, Share2 } from "lucide-react"

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock data representing the ML ranked candidates
  const candidates = [
    { id: "c1", name: "Alice Zhang", matchScore: 94, rank: 1, appliedAt: "2 days ago", tags: ["Python", "Machine Learning", "FastAPI"] },
    { id: "c2", name: "Bob Smith", matchScore: 88, rank: 2, appliedAt: "1 day ago", tags: ["Data Science", "SQL"] },
    { id: "c3", name: "Charlie Davis", matchScore: 72, rank: 3, appliedAt: "4 days ago", tags: ["Python", "Pandas"] },
    { id: "c4", name: "Diana Prince", matchScore: 45, rank: 4, appliedAt: "5 hours ago", tags: ["Java", "Spring"] } // Likely filtered out or low score
  ]

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Button variant="ghost" className="mb-3 -ml-4 text-slate-500 hover:text-slate-900 font-medium" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Senior Frontend Engineer</h1>
          <p className="text-slate-500 mt-1.5 font-medium">Job ID: <span className="text-slate-800 font-semibold">{id}</span> • Created on 2026-03-20</p>
        </div>
        <div className="flex gap-3 mt-2 md:mt-0">
          <Button variant="outline" className="border-slate-300 shadow-sm h-11"><Share2 className="w-4 h-4 mr-2" /> Share Link</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Candidate List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ranked Candidates</h2>
            <Button variant="outline" size="sm" className="h-9 font-semibold text-slate-600 border-slate-200"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          </div>

          <div className="space-y-5">
            {candidates.map((candidate) => (
              <Card key={candidate.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-slate-200/60 group">
                <div className="flex flex-col md:flex-row">
                  <div className={`w-full h-1.5 md:w-2 md:h-auto ${candidate.matchScore > 80 ? 'bg-green-500' : candidate.matchScore > 60 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                  <div className="p-6 flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="font-bold text-xl text-slate-900 leading-none">{candidate.name}</span>
                        {candidate.rank === 1 && <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 font-bold uppercase tracking-wider border border-yellow-200"><Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" /> Top Match</span>}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {candidate.tags.map(tag => (
                          <span key={tag} className="bg-slate-100 text-slate-600 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-200/50">{tag}</span>
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-slate-400 mt-3 pt-3 border-t border-slate-50 uppercase tracking-widest">Applied {candidate.appliedAt}</p>
                    </div>

                    <div className="flex items-center gap-6 mt-2 md:mt-0 md:pl-6 md:border-l border-slate-100">
                      <div className="text-center w-20">
                        <div className="text-4xl font-black tracking-tighter" style={{ color: candidate.matchScore > 80 ? '#22c55e' : candidate.matchScore > 60 ? '#eab308' : '#f87171' }}>
                          {candidate.matchScore}<span className="text-lg text-slate-400 font-bold">%</span>
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">AI Match</div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button variant="secondary" className="h-10 px-4 font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"><Download className="w-4 h-4 mr-2" /> Resume</Button>
                      </div>
                    </div>

                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar - ML Insights */}
        <div>
          <Card className="sticky top-6 bg-slate-900 text-white border-0 shadow-2xl rounded-xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <CardHeader className="pt-8 pb-4">
              <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-wide">
                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                ML Service Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-7 pb-8">
              <div className="px-4 py-3 bg-white/10 rounded-lg">
                <div className="text-xs text-slate-300 font-bold uppercase tracking-widest mb-1.5">Total Candidates</div>
                <div className="text-4xl font-black">12</div>
              </div>
              
              <div className="space-y-3 px-2">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest border-b border-slate-700 pb-2">Rule-based Filtering</div>
                <div className="flex items-center justify-between text-sm pt-1">
                  <span className="font-medium text-slate-300">Passed Pre-screen</span>
                  <span className="font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded text-xs">8</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-300">Rejected (Exp/Skills)</span>
                  <span className="font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded text-xs">4</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-700/50 px-2">
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Ranking uses <span className="text-slate-300 font-bold">XGBoost biased-mitigation mode</span>. Scores represent compatibility with job description semantics and historical success metrics, ignoring age and gender markers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
