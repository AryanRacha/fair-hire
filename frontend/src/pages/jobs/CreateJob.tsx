import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, CheckCircle2, Copy, Loader2 } from "lucide-react"
import { useState } from "react"
import { api } from "../../lib/api"

export default function CreateJob() {
  const navigate = useNavigate()
  const [createdLink, setCreatedLink] = useState("")

  const [title, setTitle] = useState("")
  const [skills, setSkills] = useState("")
  const [yearOfExperience, setYearOfExperience] = useState("")
  const [education, setEducation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const skillsArray = skills.split(",").map(s => s.trim()).filter(Boolean)
      const educationArray = education.split(",").map(e => e.trim()).filter(Boolean)
      const expNumber = parseInt(yearOfExperience) || 0

      const data = await api.createForm({ 
        title, 
        skills: skillsArray, 
        year_of_experience: expNumber, 
        education: educationArray 
      })
      setCreatedLink(`${window.location.origin}/apply/${data._id || data.id}`)
    } catch (err: any) {
      setError(err.message || "Failed to create job")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button variant="ghost" className="mb-6 -ml-4 text-slate-500 font-medium hover:text-slate-900" onClick={() => navigate("/dashboard")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Button>

      <Card className="shadow-xl shadow-slate-200/40 border-slate-200/60 rounded-xl overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Create New Job Posting</CardTitle>
          <CardDescription className="text-slate-500 font-medium">Fill out the details to generate a unique candidate application link.</CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          {!createdLink ? (
            <form onSubmit={handleCreate} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm font-medium">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-semibold text-slate-800">Job Title</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior Software Engineer" required className="h-12 border-slate-200 focus-visible:ring-slate-400 bg-white" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-base font-semibold text-slate-800">Required Skills</Label>
                <textarea 
                  id="skills" 
                  value={skills}
                  onChange={e => setSkills(e.target.value)}
                  rows={3} 
                  required
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 transition-shadow"
                  placeholder="e.g. Python, React, MongoDB (comma-separated)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-semibold text-slate-800">Minimum Years of Experience</Label>
                  <Input id="experience" type="number" min="0" value={yearOfExperience} onChange={e => setYearOfExperience(e.target.value)} placeholder="e.g. 3" required className="h-11 border-slate-200 bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education" className="text-sm font-semibold text-slate-800">Required Education</Label>
                  <Input id="education" value={education} onChange={e => setEducation(e.target.value)} placeholder="e.g. Bachelors, Masters" required className="h-11 border-slate-200 bg-white" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3 mt-8">
                <Button type="button" variant="outline" disabled={loading} className="h-11 px-6 font-semibold border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50" onClick={() => navigate("/dashboard")}>Cancel</Button>
                <Button type="submit" disabled={loading} className="h-11 px-8 font-semibold bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg transition-all disabled:opacity-70">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto mr-2 inline" /> : null}
                  Create Job
                </Button>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-slate-900 tracking-tight">Job Created Successfully!</h3>
              <p className="text-slate-500 font-medium mb-10 max-w-md leading-relaxed">Your job is now active. Share the specific link below with candidates so they can begin their application.</p>
              
              <div className="w-full max-w-lg bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center gap-3 shadow-sm">
                <Input readOnly value={createdLink} className="bg-white border-slate-200 font-medium text-slate-700 h-11 focus-visible:ring-0 focus-visible:border-slate-300" />
                <Button variant="secondary" className="h-11 px-6 font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700" onClick={() => navigator.clipboard.writeText(createdLink)}>
                  <Copy className="w-4 h-4 mr-2" /> Copy Link
                </Button>
              </div>

              <Button className="mt-12 h-11 px-8 font-semibold" onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
