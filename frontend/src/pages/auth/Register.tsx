import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useNavigate, Link } from "react-router-dom"
import { Building2 } from "lucide-react"

export default function Register() {
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: implement actual auth
    navigate("/dashboard")
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="z-10 flex flex-col items-center gap-6 w-full max-w-md px-4">
        <div className="flex items-center gap-2 font-bold text-3xl text-slate-900 mb-2">
          <div className="bg-slate-900 p-2 rounded-xl shadow-sm">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span>Fair Hire</span>
        </div>

        <Card className="w-full shadow-xl shadow-slate-200/50 border-slate-200/60 bg-white/80 backdrop-blur-md">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Create an account</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Enter your details to register your company</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-700">Company Name</Label>
                <Input id="company" placeholder="Acme Inc." required className="bg-white border-slate-200 focus-visible:ring-slate-400 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Work Email</Label>
                <Input id="email" type="email" placeholder="name@company.com" required className="bg-white border-slate-200 focus-visible:ring-slate-400 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input id="password" type="password" required className="bg-white border-slate-200 focus-visible:ring-slate-400 h-11" />
              </div>
              <Button type="submit" className="w-full h-11 mt-2 text-base font-medium shadow-sm transition-all hover:shadow-md bg-slate-900 hover:bg-slate-800 text-white">
                Sign Up
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-slate-900 hover:underline hover:text-slate-800 transition-colors">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
