import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useNavigate, Link } from "react-router-dom"
import { Building2, Loader2 } from "lucide-react"
import { useState } from "react"
import { api } from "../../lib/api"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await api.login({ email, password })
      localStorage.setItem("token", res.token)
      navigate("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to login")
    } finally {
      setLoading(false)
    }
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
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4 border border-red-200">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" required className="bg-white border-slate-200 focus-visible:ring-slate-400 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-white border-slate-200 focus-visible:ring-slate-400 h-11" />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-11 mt-2 text-base font-medium shadow-sm transition-all hover:shadow-md bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-70">
                {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-slate-900 hover:underline hover:text-slate-800 transition-colors">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
