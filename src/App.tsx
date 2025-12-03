import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Layouts
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";

// Auth Pages
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Onboarding from "@/pages/Onboarding";

// App Pages
import Dashboard from "@/pages/app/Dashboard";
import Projects from "@/pages/app/Projects";
import ProjectDetail from "@/pages/app/ProjectDetail";
import Analytics from "@/pages/app/Analytics";
import Help from "@/pages/app/Help";

// Settings Pages
import SettingsLayout from "@/pages/app/settings/SettingsLayout";
import Profile from "@/pages/app/settings/Profile";
import Team from "@/pages/app/settings/Team";
import Company from "@/pages/app/settings/Company";
import Billing from "@/pages/app/settings/Billing";
import Security from "@/pages/app/settings/Security";
import Api from "@/pages/app/settings/Api";
import Integrations from "@/pages/app/settings/Integrations";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Onboarding */}
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Protected App Routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="help" element={<Help />} />
        <Route path="settings" element={<SettingsLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="team" element={<Team />} />
          <Route path="company" element={<Company />} />
          <Route path="billing" element={<Billing />} />
          <Route path="security" element={<Security />} />
          <Route path="api" element={<Api />} />
          <Route path="integrations" element={<Integrations />} />
        </Route>
      </Route>

      {/* Redirect root to app */}
      <Route path="/" element={<Navigate to="/app" replace />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
