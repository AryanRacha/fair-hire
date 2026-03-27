import { useParams } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Building2, UploadCloud, Loader2, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"
import { api } from "../../lib/api"

export default function Apply() {
  const { id } = useParams()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [job, setJob] = useState<any>(null)
  const [jobLoading, setJobLoading] = useState(true)

  useEffect(() => {
    const fetchJobInfo = async () => {
      if (!id) return
      try {
        const data = await api.getFormById(id)
        setJob(data)
      } catch (err) {
        setError("This job link is invalid, incorrectly copied, or the position has been closed.")
        console.error("Failed to load job info", err)
      } finally {
        setJobLoading(false)
      }
    }
    fetchJobInfo()
  }, [id])

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !file) {
      setError("Please provide all required fields including a resume.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("resume", file)

      await api.submitCandidate(id, formData)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Failed to submit application")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-50 overflow-hidden py-12">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="z-10 flex flex-col items-center gap-6 w-full max-w-lg px-4">
        <div className="flex items-center gap-2 font-bold text-3xl text-slate-900 mb-2">
          <div className="bg-slate-900 p-2 rounded-xl shadow-sm">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span>Fair Hire</span>
        </div>

        <Card className="w-full shadow-xl shadow-slate-200/50 border-slate-200/60 bg-white/80 backdrop-blur-md">
          {success ? (
            <CardContent className="py-16 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 border border-green-200 shadow-sm">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-slate-900 tracking-tight">Application Submitted!</h3>
              <p className="text-slate-500 font-medium mb-2 leading-relaxed text-lg">Thank you for applying. We will review your application and get back to you soon.</p>
            </CardContent>
          ) : jobLoading ? (
            <CardContent className="py-20 flex justify-center items-center flex-col gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
              <p className="text-slate-500 font-semibold text-lg tracking-wide">Validating application portal...</p>
            </CardContent>
          ) : !job ? (
            <CardContent className="py-20 text-center">
              <p className="text-xl text-red-600 font-bold max-w-sm mx-auto leading-relaxed">
                This job link is invalid, incorrectly copied, or the position has been closed.
              </p>
            </CardContent>
          ) : (
            <>
              <CardHeader className="space-y-1 text-center pb-6 border-b border-slate-100 mb-6 bg-slate-50/50">
                <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Apply for Position</CardTitle>
                <CardDescription className="text-slate-500 font-medium text-base mt-2">Submit your application for <span className="text-slate-900 font-bold">{job.title}</span> at <span className="text-slate-900 font-bold">{job.createdBy?.companyName || "Our Company"}</span></CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-md mb-6 text-sm font-semibold shadow-sm">
                    {error}
                  </div>
                )}
                <form onSubmit={handleApply} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700 font-semibold">Full Name</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required className="bg-white border-slate-200 focus-visible:ring-slate-400 h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" required className="bg-white border-slate-200 focus-visible:ring-slate-400 h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">Resume / CV</Label>
                    <div className={`border-2 border-dashed ${file ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-white hover:bg-slate-50'} rounded-lg p-8 transition-colors text-center cursor-pointer`} onClick={() => document.getElementById('resume')?.click()}>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className={`${file ? 'bg-green-100' : 'bg-slate-100'} p-3 rounded-full`}>
                          {file ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <UploadCloud className="w-6 h-6 text-slate-500" />}
                        </div>
                        <div>
                          {file ? <span className="font-bold text-green-700">{file.name}</span> : <><span className="font-semibold text-slate-900 hover:underline">Click to upload</span> or drag and drop</>}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">PDF, DOCX up to 10MB</p>
                      </div>
                      <input type="file" className="hidden" id="resume" required accept=".pdf,.doc,.docx" onChange={e => {
                        if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
                      }} />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" disabled={loading} className="w-full h-12 text-base font-medium shadow-sm transition-all hover:shadow-md bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-70">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto inline" /> : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
