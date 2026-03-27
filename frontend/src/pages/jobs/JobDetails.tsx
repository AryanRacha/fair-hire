import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ArrowLeft, Download, Star, Share2, Loader2, Trash2, Edit, Check, X } from "lucide-react"
import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState<any>(null)
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: "",
    skills: "",
    yearOfExperience: 0,
    education: ""
  })

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to permanently delete this job posting? All candidate data will be lost.")) return;
    try {
      if (id) await api.deleteForm(id);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.message || "Failed to delete job");
    }
  }

  const handleEditClick = () => {
    setEditData({
      title: job.title || "",
      skills: job.requirements?.skills?.join(", ") || "",
      yearOfExperience: job.requirements?.experience || 0,
      education: job.requirements?.education?.join(", ") || ""
    })
    setIsEditing(true)
  }

  const handleUpdate = async () => {
    try {
      const skillsArray = typeof editData.skills === "string" ? editData.skills.split(",").map(s => s.trim()).filter(Boolean) : editData.skills;
      const eduArray = typeof editData.education === "string" ? editData.education.split(",").map(e => e.trim()).filter(Boolean) : editData.education;

      const updated = await api.updateForm(id!, {
        title: editData.title,
        skills: skillsArray,
        year_of_experience: Number(editData.yearOfExperience),
        education: eduArray
      });
      setJob(updated);
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || "Failed to update job");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return
        const [jobData, candidatesData] = await Promise.all([
          api.getFormById(id),
          api.getCandidates(id)
        ])
        setJob(jobData)
        setCandidates(candidatesData)
      } catch (err: any) {
        setError(err.message || "Failed to fetch job details")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader2 className="w-10 h-10 animate-spin text-slate-500" />
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="bg-red-50 text-red-600 border border-red-200 p-6 rounded-xl inline-block font-medium">
          {error || "Job not found"}
        </div>
        <div className="mt-4">
          <Button onClick={() => navigate("/dashboard")} variant="outline">Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex-1 max-w-2xl">
          <Button variant="ghost" className="mb-3 -ml-4 text-slate-500 hover:text-slate-900 font-medium" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
          {!isEditing ? (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">{job.title}</h1>
              <p className="text-slate-500 mt-1.5 font-medium">{job.createdBy?.companyName || "Your Company"} • Created on {new Date(job.createdAt).toLocaleDateString()}</p>
            </>
          ) : (
            <div className="space-y-4 bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Job Title</Label>
                <Input value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Required Skills (comma separated)</Label>
                <Input value={editData.skills} onChange={e => setEditData({ ...editData, skills: e.target.value })} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">Min Experience (Years)</Label>
                  <Input type="number" value={editData.yearOfExperience} onChange={e => setEditData({ ...editData, yearOfExperience: Number(e.target.value) })} className="bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">Education</Label>
                  <Input value={editData.education} onChange={e => setEditData({ ...editData, education: e.target.value })} className="bg-slate-50 border-slate-200" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleUpdate} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"><Check className="w-4 h-4 mr-2" /> Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="border-slate-300 text-slate-600"><X className="w-4 h-4 mr-2" /> Cancel</Button>
              </div>
            </div>
          )}
        </div>
        {!isEditing && (
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0 justify-end">
            <Button variant="outline" className="border-slate-300 shadow-sm h-11" onClick={handleEditClick}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Button>
            <Button variant="outline" className="border-red-200 text-red-600 shadow-sm h-11 hover:bg-red-50 hover:text-red-700 hover:border-red-300" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
            <Button
              variant="outline"
              className="border-slate-300 shadow-sm h-11"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/apply/${id}`);
                alert("Application link copied to clipboard!");
              }}
            >
              <Share2 className="w-4 h-4 mr-2" /> Share Link
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Candidate List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ranked Candidates</h2>
          </div>

          <div className="space-y-5">
            {candidates.length === 0 ? (
              <div className="text-center py-12 text-slate-500 border border-slate-200 rounded-xl bg-slate-50/50">
                <p className="font-medium text-lg">No candidates have applied yet.</p>
              </div>
            ) : (
              candidates.map((candidate, index) => (
                <Card key={candidate._id || index} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-slate-200/60 group">
                  <div className="flex flex-col md:flex-row">
                    <div className={`w-full h-1.5 md:w-2 md:h-auto ${candidate.matchScore > 80 ? 'bg-green-500' : candidate.matchScore > 60 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                    <div className="p-6 flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-bold text-xl text-slate-900 leading-none">{candidate.name}</span>
                          {index === 0 && candidate.matchScore > 80 && <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 font-bold uppercase tracking-wider border border-yellow-200"><Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" /> Top Match</span>}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="bg-slate-100 text-slate-600 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-200/50">{candidate.email}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-400 mt-3 pt-3 border-t border-slate-50 uppercase tracking-widest">Applied {new Date(candidate.createdAt).toLocaleDateString()}</p>
                      </div>

                      {candidate.fitBreakdown && (
                        <div className="flex-1 w-full max-w-[280px] px-4 py-3 bg-slate-50 rounded-lg border border-slate-100 hidden md:block">
                          <div className="text-[10px] items-center flex justify-between font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1">
                            Rule Breakdown
                            <span className="text-indigo-500 font-black">{Math.round(candidate.fitScore) || 0}% FIT</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px]">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500 font-semibold tracking-wide">Skills</span>
                              <span className={`font-bold ${candidate.fitBreakdown.skills > 50 ? 'text-green-600' : 'text-red-500'}`}>{Math.round(candidate.fitBreakdown.skills) || 0}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500 font-semibold tracking-wide">Exp</span>
                              <span className={`font-bold ${candidate.fitBreakdown.experience > 50 ? 'text-green-600' : 'text-red-500'}`}>{Math.round(candidate.fitBreakdown.experience) || 0}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500 font-semibold tracking-wide">Edu</span>
                              <span className={`font-bold ${candidate.fitBreakdown.education > 50 ? 'text-green-600' : 'text-red-500'}`}>{Math.round(candidate.fitBreakdown.education) || 0}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500 font-semibold tracking-wide">Semantics</span>
                              <span className={`font-bold ${candidate.fitBreakdown.semantic > 50 ? 'text-green-600' : 'text-red-500'}`}>{Math.round(candidate.fitBreakdown.semantic) || 0}%</span>
                            </div>
                          </div>
                          {candidate.resumeQuality?.grammar_issues?.length > 0 && (
                            <div className="mt-2 text-[10px] text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-100 italic">
                              ⚠️ Quality Warning: {candidate.resumeQuality.grammar_issues.length} Issues Detected
                            </div>
                          )}
                          {candidate.limeData && candidate.limeData.length > 0 && (
                            <div className="mt-1.5 text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-1 rounded border border-indigo-100 flex items-center justify-between shadow-sm">
                              <span>🧠 Top AI Driver:</span>
                              <span>{candidate.limeData[0][0]}</span>
                            </div>
                          )}
                          {candidate.resumeQuality?.flesch_reading_ease && (
                            <div className="mt-1.5 text-[9px] text-slate-400 font-bold flex items-center justify-between px-1 uppercase tracking-widest">
                              <span>Parse Readability</span>
                              <span>{Math.round(candidate.resumeQuality.flesch_reading_ease)}/100</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-6 mt-2 md:mt-0 md:pl-6 md:border-l border-slate-100 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-center w-24">
                          <div className="text-4xl font-black tracking-tighter" style={{ color: candidate.matchScore > 80 ? '#22c55e' : candidate.matchScore > 60 ? '#eab308' : '#f87171' }}>
                            {Math.round(candidate.matchScore)}<span className="text-lg text-slate-400 font-bold">%</span>
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">XGBOOST RANK</div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            variant="secondary"
                            className="h-10 px-4 font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm"
                            onClick={() => window.open(candidate.resumeUrl, "_blank")}
                          >
                            <Download className="w-4 h-4 mr-2" /> Resume
                          </Button>
                        </div>
                      </div>

                    </div>
                  </div>
                </Card>
              ))
            )}
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
            <CardContent className="space-y-6 pb-8">
              <div className="flex items-center justify-between px-2">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Total Candidates</div>
                <div className="text-3xl font-black text-white">{candidates.length}</div>
              </div>

              {job.requirements && (
                <div className="px-4 py-3 bg-white/5 rounded-lg border border-slate-700/50 shadow-inner">
                  <div className="text-xs text-slate-300 font-bold uppercase tracking-widest mb-1.5">Required Profile</div>
                  <div className="text-xs font-medium text-slate-300">
                    {job.requirements.experience} years exp • {job.requirements.education?.length || 0} Degrees • {job.requirements.skills?.length || 0} Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {job.requirements.skills?.slice(0, 5).map((s: string) => <span key={s} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-medium">{s}</span>)}
                    {(job.requirements.skills?.length || 0) > 5 && <span className="text-[9px] text-slate-500 px-1 py-0.5 font-bold">+{job.requirements.skills.length - 5} more</span>}
                  </div>
                </div>
              )}

              <div className="space-y-3 px-2 pt-2">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest border-b border-slate-700 pb-2">XGBoost Funnel</div>
                <div className="flex items-center justify-between text-sm pt-1">
                  <span className="font-medium text-slate-300">Shortlisted (&#62;60%)</span>
                  <span className="font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded text-xs">{candidates.filter((c: any) => c.matchScore >= 60).length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-300">Rejected (&#60;60%)</span>
                  <span className="font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded text-xs">{candidates.filter((c: any) => c.matchScore < 60).length}</span>
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
