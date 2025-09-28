import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const PublicHeader: React.FC = () => {
    const { user } = useAuth();
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 left-0 right-0 z-20 p-4 transition-all duration-300 bg-slate-50/80 backdrop-blur-xl">
            <div className="container mx-auto flex justify-between items-center bg-white/50 backdrop-blur-xl rounded-full py-2 px-6 shadow-md border border-white/50">
                <Link to="/" aria-label="Gradz Home">
                    <Logo />
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/blog" className="text-base font-medium text-slate-700 hover:text-brand-orange transition-colors">{t('publicHeader.blog')}</Link>
                    <Link to="/buy-coins" className="text-base font-medium text-slate-700 hover:text-brand-orange transition-colors">{t('publicHeader.pricing')}</Link>
                </nav>
                <div className="flex items-center gap-4">
                  <Link to="/become-tutor" className="px-5 py-2 text-base font-semibold text-white bg-brand-orange rounded-full shadow-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 animate-pulse-slow">
                    {t('publicHeader.becomeTutor')}
                  </Link>
                  <LanguageSwitcher />
                  {user && user.role === 'student' ? (
                      <Link
                          to="/dashboard"
                          className="px-6 py-2 text-base font-semibold text-white bg-brand-turquoise rounded-full shadow-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300"
                      >
                          {t('publicHeader.goToDashboard')}
                      </Link>
                  ) : (
                      <Link
                          to="/login"
                          className="px-6 py-2 text-base font-semibold text-white bg-brand-blue rounded-full shadow-lg hover:bg-brand-orange transform hover:scale-105 transition-all duration-300"
                      >
                          {t('publicHeader.loginSignup')}
                      </Link>
                  )}
                </div>
            </div>
        </header>
    );
};

export default PublicHeader;
