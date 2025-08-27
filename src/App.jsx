import React from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';
import { Zap } from 'lucide-react';

import LoginPage from '@/pages/auth/LoginPage.jsx';
import SignupPage from '@/pages/auth/SignupPage.jsx';
import DashboardPage from '@/pages/dashboard/DashboardPage.jsx';
import PatientDataFormPage from '@/pages/patient/PatientDataFormPage.jsx';
import ReportsPage from '@/pages/reports/ReportsPage.jsx';
import QuantumPracticesPage from '@/pages/practices/QuantumPracticesPage.jsx';
import QuantumAnalysisPage from '@/pages/quantum/QuantumAnalysisPage.jsx';
import ResultsPage from '@/pages/results/ResultsPage.jsx';
import ManageTechniquesPage from '@/pages/techniques/ManageTechniquesPage.jsx';
import TechniqueEvaluationPage from '@/pages/techniques/TechniqueEvaluationPage.jsx';

import AppLayout from '@/components/layout/AppLayout.jsx'; 
import AnimatedPage from '@/components/layout/AnimatedPage.jsx';

const ProtectedRoute = () => {
  const { session } = useAuth();
  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

const App = () => {
  const location = useLocation();
  const { session, loading, signOut } = useAuth();
  const isAuthenticated = !!session;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white quantum-background-pattern">
        <div className="flex flex-col items-center">
          <Zap className="h-16 w-16 text-purple-400 animate-pulse mb-4" />
          <p className="text-lg text-slate-300">Carregando o universo quântico...</p>
        </div>
      </div>
    );
  }

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen text-gray-100 ${isAuthRoute ? '' : 'bg-slate-900 quantum-subtle-pattern'}`}
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<AnimatedPage pageKey="login"><LoginPage /></AnimatedPage>} />
          <Route path="/signup" element={<AnimatedPage pageKey="signup"><SignupPage /></AnimatedPage>} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout onLogout={signOut} userSession={session} />}>
              <Route path="/" element={<AnimatedPage pageKey="dashboard"><DashboardPage userSession={session} /></AnimatedPage>} />
              <Route path="/collect-data" element={<AnimatedPage pageKey="collect-data"><PatientDataFormPage userSession={session} /></AnimatedPage>} />
              <Route path="/edit-patient/:patientId" element={<AnimatedPage pageKey="edit-patient"><PatientDataFormPage userSession={session} /></AnimatedPage>} />
              <Route path="/reports" element={<AnimatedPage pageKey="reports"><ReportsPage userSession={session} /></AnimatedPage>} />
              <Route path="/practices" element={<AnimatedPage pageKey="practices"><QuantumPracticesPage userSession={session}/></AnimatedPage>} />
              <Route path="/quantum-analysis/:patientId" element={<AnimatedPage pageKey="quantum-analysis"><QuantumAnalysisPage userSession={session} /></AnimatedPage>} />
              <Route path="/results/:patientId" element={<AnimatedPage pageKey="results"><ResultsPage userSession={session} /></AnimatedPage>} />
              <Route path="/manage-techniques" element={<AnimatedPage pageKey="manage-techniques"><ManageTechniquesPage userSession={session} /></AnimatedPage>} />
              <Route path="/evaluate-technique/:patientId/:techniqueId" element={<AnimatedPage pageKey="evaluate-technique"><TechniqueEvaluationPage userSession={session} /></AnimatedPage>} />
              <Route path="/evaluate-technique/:patientId" element={<AnimatedPage pageKey="evaluate-technique-select"><TechniqueEvaluationPage userSession={session} /></AnimatedPage>} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
};

export default App;