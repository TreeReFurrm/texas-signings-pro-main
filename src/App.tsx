import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DocumentAssistant } from "@/components/DocumentAssistant";
import Index from "./pages/Index";
import Book from "./pages/Book";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import SessionLogger from "./pages/admin/SessionLogger";
import Expenses from "./pages/admin/Expenses";
import JobBoard from "./pages/notary/JobBoard";
import MyJobs from "./pages/notary/MyJobs";
import NotaryProfile from "./pages/notary/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DocumentAssistant />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/book" element={<Book />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Notary Routes (Protected) */}
            <Route path="/notary/jobs" element={
              <ProtectedRoute>
                <JobBoard />
              </ProtectedRoute>
            } />
            <Route path="/notary/my-jobs" element={
              <ProtectedRoute>
                <MyJobs />
              </ProtectedRoute>
            } />
            <Route path="/notary/profile" element={
              <ProtectedRoute>
                <NotaryProfile />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes (Protected + Admin Only) */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/appointments" element={
              <ProtectedRoute requireAdmin>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/clients" element={
              <ProtectedRoute requireAdmin>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/expenses" element={
              <ProtectedRoute requireAdmin>
                <Expenses />
              </ProtectedRoute>
            } />
            <Route path="/admin/session-logger" element={
              <ProtectedRoute requireAdmin>
                <SessionLogger />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
