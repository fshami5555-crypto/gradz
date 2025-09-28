import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SiteConfigProvider } from './contexts/SiteConfigContext';
import { ContentProvider } from './contexts/ContentContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import StudentLayout from './components/layout/StudentLayout';
import TutorLayout from './components/layout/TutorLayout';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import BuyCoinsPage from './pages/BuyCoinsPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import BecomeTutorPage from './pages/BecomeTutorPage';
import CreateTutorPasswordPage from './pages/CreateTutorPasswordPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

// Student Pages
import StudentDashboardPage from './pages/StudentDashboardPage';
import CoursesPage from './pages/CoursesPage';
import ChatPage from './pages/ChatPage';
import CommunityChatPage from './pages/CommunityChatPage';

// Tutor Pages
import TutorProfilePage from './pages/TutorProfilePage';
import TutorCoursesPage from './pages/TutorCoursesPage';
import TutorMessagesPage from './pages/TutorMessagesPage';

// Admin Pages
import AdminDashboardPage from './pages/AdminDashboardPage';
import { UserRole } from './types';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; role: UserRole }> = ({ children, role }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>; // Or a spinner
    }
    if (!user || user.role !== role) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

// Admin Protected Route
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
      return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
    }
    if (!user || user.role !== 'admin') {
        return <Navigate to="/admin" replace />;
    }
    return <>{children}</>;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:postId" element={<BlogPostPage />} />
          <Route path="buy-coins" element={<BuyCoinsPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="become-tutor" element={<BecomeTutorPage />} />
          <Route path="create-tutor-password" element={<CreateTutorPasswordPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsOfServicePage />} />
        </Route>

        {/* Student Routes */}
        <Route path="/dashboard" element={<ProtectedRoute role="student"><StudentLayout><StudentDashboardPage /></StudentLayout></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute role="student"><StudentLayout><CoursesPage /></StudentLayout></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute role="student"><StudentLayout><ChatPage /></StudentLayout></ProtectedRoute>} />
        <Route path="/community-chat" element={<ProtectedRoute role="student"><StudentLayout><CommunityChatPage /></StudentLayout></ProtectedRoute>} />
        
        {/* Tutor Routes */}
        <Route path="/tutor/profile" element={<ProtectedRoute role="tutor"><TutorLayout><TutorProfilePage /></TutorLayout></ProtectedRoute>} />
        <Route path="/tutor/courses" element={<ProtectedRoute role="tutor"><TutorLayout><TutorCoursesPage /></TutorLayout></ProtectedRoute>} />
        <Route path="/tutor/messages" element={<ProtectedRoute role="tutor"><TutorLayout><TutorMessagesPage /></TutorLayout></ProtectedRoute>} />
        <Route path="/tutor/community-chat" element={<ProtectedRoute role="tutor"><TutorLayout><CommunityChatPage /></TutorLayout></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboardPage /></AdminProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}


function App() {
  return (
    <LanguageProvider>
      <SiteConfigProvider>
        <ContentProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ContentProvider>
      </SiteConfigProvider>
    </LanguageProvider>
  );
}

export default App;