import { useParams } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Building2, UploadCloud } from "lucide-react"

export default function Apply() {
  const { id } = useParams()

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: implement actual upload and application submission
    alert("Application submitted successfully!")
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
          <CardHeader className="space-y-1 text-center pb-6 border-b border-slate-100 mb-6">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Apply for Position</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Submit your application for job ID: <span className="text-slate-900 font-bold">{id}</span></CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleApply} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 font-semibold">Full Name</Label>
                <Input id="name" placeholder="John Doe" required className="bg-white border-slate-200 focus-visible:ring-slate-400 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" required className="bg-white border-slate-200 focus-visible:ring-slate-400 h-11" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Resume / CV</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 hover:bg-slate-50 transition-colors text-center cursor-pointer bg-white" onClick={() => document.getElementById('resume')?.click()}>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="bg-slate-100 p-3 rounded-full">
                      <UploadCloud className="w-6 h-6 text-slate-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 hover:underline">Click to upload</span> or drag and drop
                    </div>
                    <p className="text-xs text-slate-500 mt-1">PDF, DOCX up to 10MB</p>
                  </div>
                  <input type="file" className="hidden" id="resume" required accept=".pdf,.doc,.docx" />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full h-12 text-base font-medium shadow-sm transition-all hover:shadow-md bg-slate-900 hover:bg-slate-800 text-white">
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
