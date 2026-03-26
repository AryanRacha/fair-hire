import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Dashboard from "./pages/dashboard/Dashboard"
import CreateJob from "./pages/jobs/CreateJob"
import JobDetails from "./pages/jobs/JobDetails"
import Apply from "./pages/candidate/Apply"
import { Navbar } from "./components/layout/Navbar"

const AuthLayout = () => (
  <div className="min-h-screen bg-neutral-50 flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background font-sans antialiased text-foreground">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apply/:id" element={<Apply />} />
          
          <Route element={<AuthLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs/new" element={<CreateJob />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
