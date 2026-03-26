import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, CheckCircle2, Copy } from "lucide-react"
import { useState } from "react"

export default function CreateJob() {
  const navigate = useNavigate()
  const [createdLink, setCreatedLink] = useState("")

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock API creation
    setCreatedLink(`${window.location.origin}/apply/mock-job-id-123`)
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
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-semibold text-slate-800">Job Title</Label>
                <Input id="title" placeholder="e.g. Senior Product Designer" required className="h-12 border-slate-200 focus-visible:ring-slate-400 bg-white" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-semibold text-slate-800">Department</Label>
                  <Input id="department" placeholder="e.g. Engineering" className="h-11 border-slate-200 bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-semibold text-slate-800">Location</Label>
                  <Input id="location" placeholder="e.g. Remote, NY" className="h-11 border-slate-200 bg-white" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-semibold text-slate-800">Job Description</Label>
                <textarea 
                  id="description" 
                  rows={6} 
                  required
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 transition-shadow"
                  placeholder="Describe the responsibilities and requirements..."
                />
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3 mt-8">
                <Button type="button" variant="outline" className="h-11 px-6 font-semibold border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50" onClick={() => navigate("/dashboard")}>Cancel</Button>
                <Button type="submit" className="h-11 px-8 font-semibold bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg transition-all">Create Job</Button>
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
