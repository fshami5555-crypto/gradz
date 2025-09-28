import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../ui/Logo';
import { useLanguage } from '../../contexts/LanguageContext';

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    const baseLinkClasses = "flex items-center px-6 py-3 text-slate-200 hover:bg-brand-blue-light hover:text-white transition-colors";
    const activeNavLinkClasses = "bg-brand-blue-light text-white border-r-4 border-brand-turquoise";
    const activeNavLinkClassesRTL = "bg-brand-blue-light text-white border-l-4 border-r-0 border-brand-turquoise";

    const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => {
        let classes = `${baseLinkClasses} ${language === 'ar' ? 'flex-row-reverse' : ''}`;
        if (isActive) {
            classes += ` ${language === 'ar' ? activeNavLinkClassesRTL : activeNavLinkClasses}`;
        }
        return classes;
    };

    return (
        <div className="hidden md:flex flex-col w-64 bg-brand-blue">
            <div className="flex items-center justify-center h-20 border-b border-brand-blue-light">
                <Logo isLight={true}/>
            </div>
            <nav className="flex-1 mt-5">
                <NavLink to="/dashboard" className={getNavLinkClasses}>
                    <HomeIcon /> <span className="mx-4">{t('sidebar.dashboard')}</span>
                </NavLink>
                <NavLink to="/courses" className={getNavLinkClasses}>
                    <BookOpenIcon /> <span className="mx-4">{t('sidebar.courses')}</span>
                </NavLink>
                <NavLink to="/subscriptions" className={getNavLinkClasses}>
                    <CreditCardIcon /> <span className="mx-4">{t('sidebar.subscriptions')}</span>
                </NavLink>
                 <NavLink to="/blog" className={getNavLinkClasses}>
                    <NewspaperIcon /> <span className="mx-4">{t('sidebar.blog')}</span>
                </NavLink>
                 <NavLink to="/dashboard#ai-tool" className={getNavLinkClasses}>
                    <SparklesIcon /> <span className="mx-4">{t('sidebar.aiStudyBuddy')}</span>
                </NavLink>
            </nav>
            <div className="px-6 py-4 border-t border-brand-blue-light">
                <button onClick={handleLogout} className={`flex items-center w-full px-4 py-2 text-slate-200 hover:bg-brand-orange rounded-md transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                   <LogoutIcon /> <span className="mx-4">{t('sidebar.logout')}</span>
                </button>
            </div>
        </div>
    );
};

// SVG Icons
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6.343 17.657l-2.828 2.828m17.657-17.657l-2.828 2.828m0 0l-2.828 2.828m2.828-2.828l2.828 2.828M3 21v-4M5 21H1M17.657 6.343l2.828-2.828m0 0l2.828 2.828m-2.828-2.828l-2.828 2.828M21 3v4M19 3h2M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const NewspaperIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6M7 8h6" /></svg>;


export default Sidebar;