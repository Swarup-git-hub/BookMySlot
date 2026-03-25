// import React from "react";
// import Student from "./pages/Student/StudentDashboard";

// export default function App(){
//   return <Student />;
// }



import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSlots from "./pages/student/StudentSlots";
import StudentRequests from "./pages/student/StudentRequests";
import GuideDashboard from "./pages/guide/GuideDashboard";
import GuideRequests from "./pages/guide/GuideRequests";
import GuideTeams from "./pages/guide/GuideTeams";
import GuideExport from "./pages/guide/GuideExport";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTeams from "./pages/admin/AdminTeams";
import AdminSessions from "./pages/admin/AdminSessions";
import AdminBookings from "./pages/admin/AdminBookings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, role }: { children: React.ReactNode; role: string }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to={`/${user.role}`} />;
  return <>{children}</>;
}

function RootRedirect() {
  const { user } = useAuth();
  if (user) return <Navigate to={`/${user.role}`} />;
  return <Navigate to="/login" />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/slots" element={<ProtectedRoute role="student"><StudentSlots /></ProtectedRoute>} />
            <Route path="/student/requests" element={<ProtectedRoute role="student"><StudentRequests /></ProtectedRoute>} />

            <Route path="/guide" element={<ProtectedRoute role="guide"><GuideDashboard /></ProtectedRoute>} />
            <Route path="/guide/requests" element={<ProtectedRoute role="guide"><GuideRequests /></ProtectedRoute>} />
            <Route path="/guide/teams" element={<ProtectedRoute role="guide"><GuideTeams /></ProtectedRoute>} />
            <Route path="/guide/export" element={<ProtectedRoute role="guide"><GuideExport /></ProtectedRoute>} />

            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/teams" element={<ProtectedRoute role="admin"><AdminTeams /></ProtectedRoute>} />
            <Route path="/admin/sessions" element={<ProtectedRoute role="admin"><AdminSessions /></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute role="admin"><AdminBookings /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App