import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const TutorSidebar: React.FC = () => {
    const { logout } = useAuth();
    const { t, language } = useLanguage();

    const navItems = [
        { path: '/tutor/profile', label: t('tutor.sidebar.profile'), icon: <UserCircleIcon /> },
        { path: '/tutor/courses', label: t('tutor.sidebar.courses'), icon: <BookOpenIcon /> },
        { path: '/tutor/messages', label: t('tutor.sidebar.messages'), icon: <EnvelopeIcon /> },
        { path: '/tutor/community-chat', label: t('sidebar.communityChat'), icon: <UserGroupIcon /> },
    ];

    const activeLinkClass = "bg-brand-turquoise/10 text-brand-turquoise border-brand-turquoise";
    const inactiveLinkClass = "text-slate-500 border-transparent hover:bg-slate-200/50 hover:text-slate-700";
    const linkBorderClass = language === 'ar' ? 'border-r-4' : 'border-l-4';

    return (
        <aside className="w-64 bg-white flex flex-col border-e border-slate-200">
            <div className="h-16 flex items-center px-6">
                <Link to="/tutor/profile">
                    <Logo />
                </Link>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/tutor/profile'} // Use `end` for profile link to not match sub-routes
                        className={({ isActive }) => 
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${linkBorderClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="px-4 py-4 border-t border-slate-200">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                >
                    <ArrowLeftOnRectangleIcon />
                    <span>{t('sidebar.logout')}</span>
                </button>
            </div>
        </aside>
    );
};

// SVG Icons
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16.5c2.572 0 4.98.654 7.024 1.768l-1.42 1.42a11.91 11.91 0 00-11.209 0l-1.42-1.42z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const EnvelopeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.284-2.72a3 3 0 00-4.682-2.72m7.284 5.441v-4.642a3.375 3.375 0 013.375-3.375h1.5a1.125 1.125 0 011.125 1.125v1.513m-13.5 0V9.25c0-.621.504-1.125 1.125-1.125h1.5c1.866 0 3.375 1.509 3.375 3.375v4.642m-1.125.479v-.513m0 .513a9.094 9.094 0 01-3.741-.479m0 0a3 3 0 01-4.682-2.72M12 18.72v-4.642a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 00-1.125 1.125v1.513M12 18.72a9.094 9.094 0 003.741-.479m-3.741 0a9.094 9.094 0 01-3.741-.479" /></svg>;
const ArrowLeftOnRectangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>;

export default TutorSidebar;
