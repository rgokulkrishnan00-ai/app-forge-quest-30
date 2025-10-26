import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import WorkerRegister from "./pages/WorkerRegister";
import EmployerRegister from "./pages/EmployerRegister";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/welcome" element={<PublicRoute><Welcome /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/register/worker" element={<PublicRoute><WorkerRegister /></PublicRoute>} />
            <Route path="/register/employer" element={<PublicRoute><EmployerRegister /></PublicRoute>} />
            
            {/* Protected routes with Layout */}
            <Route path="/" element={<ProtectedRoute><Layout><Index /></Layout></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><Layout><Search /></Layout></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Layout><Messages /></Layout></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><Layout><Applications /></Layout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
            <Route path="/profile/edit" element={<ProtectedRoute><Layout><ProfileEdit /></Layout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
