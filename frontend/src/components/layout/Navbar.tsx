import { Button } from "../ui/button"
import { Building2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Navbar() {
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <nav className="border-b bg-white">
      <div className="flex justify-between h-16 items-center px-4 container mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Building2 className="w-6 h-6 text-primary" />
          <span>Fair Hire</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-sm font-medium text-muted-foreground">Recruiter Portal</span>
          <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
        </div>
      </div>
    </nav>
  )
}
