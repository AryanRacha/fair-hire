import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { useNavigate } from "react-router-dom"
import { Users, ExternalLink, CalendarDays } from "lucide-react"

export default function Dashboard() {
  const navigate = useNavigate()

  // Mock data for UI development
  const jobs = [
    { id: "1", title: "Senior Frontend Engineer", candidatesCount: 12, createdAt: "2026-03-20", status: "Active" },
    { id: "2", title: "Machine Learning Researcher", candidatesCount: 5, createdAt: "2026-03-22", status: "Active" },
    { id: "3", title: "Product Manager", candidatesCount: 28, createdAt: "2026-03-15", status: "Closed" },
  ]

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Jobs</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your job postings and review AI-scored candidates.</p>
        </div>
        <Button onClick={() => navigate("/jobs/new")} className="bg-slate-900 text-white hover:bg-slate-800 shadow-sm h-11">
          Create New Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-slate-500 border-2 border-dashed border-slate-200 p-12 rounded-xl text-center bg-white shadow-sm">
          <p className="text-lg font-bold text-slate-900 mb-2">No jobs created yet</p>
          <p className="mb-6 font-medium">Start by creating your first job posting to generate an application link.</p>
          <Button onClick={() => navigate("/jobs/new")} variant="outline" className="border-slate-300">Create your first job</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow border-slate-200/60 bg-white flex flex-col cursor-pointer overflow-hidden rounded-xl" onClick={() => navigate(`/jobs/${job.id}`)}>
              <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-bold px-2.5 py-1.5 rounded-full uppercase tracking-wider ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {job.status}
                  </span>
                </div>
                <CardTitle className="text-xl mt-3 font-bold text-slate-900 leading-tight">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 mt-2 font-medium">
                  <CalendarDays className="w-4 h-4 text-slate-400" />
                  Opened {job.createdAt}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-4 flex-grow bg-white">
                <div className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100/80">
                  <div className="bg-white p-1.5 rounded-md shadow-sm">
                    <Users className="text-slate-700 w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 leading-none">{job.candidatesCount}</span>
                    <span className="text-xs text-slate-500 font-semibold uppercase mt-1 tracking-wider">Candidates</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-4 bg-white">
                <Button variant="ghost" className="w-full font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 justify-between group h-10 border border-transparent hover:border-slate-200">
                  View full details
                  <ExternalLink className="w-4 h-4 ml-2 opacity-40 group-hover:opacity-100 transition-opacity text-slate-500 group-hover:text-slate-900" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
