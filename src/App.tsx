import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CitizenPortal from "./pages/CitizenPortal";
import WorkerPortal from "./pages/WorkerPortal";
import PickupScheduling from "./pages/PickupScheduling";
import Challenges from "./pages/Challenges";
import Learning from "./pages/Learning";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('greenwarrior_auth') !== null;
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Public Route Component - redirects to home if already authenticated
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('greenwarrior_auth') !== null;
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated) {
    // Redirect to the page they were trying to access or home page
    return <Navigate to={from} replace />;
  }

  return children;
};

const App = () => {
  // Check if user is authenticated on initial load
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // This ensures the authentication check happens once on component mount
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes - accessible without authentication */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            
            {/* Protected routes - require authentication */}
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/citizen-portal" element={
              <ProtectedRoute>
                <CitizenPortal />
              </ProtectedRoute>
            } />
            <Route path="/worker-portal" element={
              <ProtectedRoute>
                <WorkerPortal />
              </ProtectedRoute>
            } />
            <Route path="/pickup-scheduling" element={
              <ProtectedRoute>
                <PickupScheduling />
              </ProtectedRoute>
            } />
            <Route path="/challenges" element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
            } />
            <Route path="/learning" element={
              <ProtectedRoute>
                <Learning />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
