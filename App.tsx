import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Context Providers
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SiteConfigProvider } from './contexts/SiteConfigContext';
import { ContentProvider } from './contexts/ContentContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import StudentLayout from './components/layout/StudentLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import CoursesPage from './pages/CoursesPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import BecomeTutorPage from './pages/BecomeTutorPage';

const ProtectedRoute: React.FC<{ role: 'student' | 'admin' }> = ({ role }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>; // Or a spinner component
    }

    if (!user || user.role !== role) {
        return <Navigate to={role === 'admin' ? '/admin' : '/login'} replace />;
    }

    if (role === 'student') {
        return (
            <StudentLayout>
                <Outlet />
            </StudentLayout>
        );
    }
    
    // For admin, layout is part of the page component for now
    return <Outlet />;
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <LanguageProvider>
        <SiteConfigProvider>
          <ContentProvider>
            <AuthProvider>
              <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:postId" element={<BlogPostPage />} />
                  <Route path="/subscriptions" element={<SubscriptionsPage />} />
                  <Route path="/become-tutor" element={<BecomeTutorPage />} />
                  <Route path="/admin" element={<AdminLoginPage />} />
                </Route>

                {/* Student Protected Routes */}
                <Route element={<ProtectedRoute role="student" />}>
                  <Route path="/dashboard" element={<StudentDashboardPage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                   {/* These routes are accessible within student layout */}
                   <Route path="/subscriptions" element={<SubscriptionsPage />} />
                   <Route path="/blog" element={<BlogPage />} />
                   <Route path="/blog/:postId" element={<BlogPostPage />} />
                </Route>

                {/* Admin Protected Routes */}
                <Route element={<ProtectedRoute role="admin" />}>
                   <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                </Route>
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </AuthProvider>
          </ContentProvider>
        </SiteConfigProvider>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;