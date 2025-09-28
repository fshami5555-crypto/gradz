import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const SubscriptionBadge: React.FC<{ planId: 'single' | 'semester' }> = ({ planId }) => {
    const { t } = useLanguage();
    const isSemester = planId === 'semester';
    const bgColor = isSemester ? 'bg-brand-orange' : 'bg-brand-turquoise';
    const text = isSemester ? t('header.semesterPlan') : t('header.singleCoursePlan');
    
    return (
        <span className={`px-2 py-1 text-xs font-semibold text-white ${bgColor} rounded-full`}>
            {text}
        </span>
    );
};


const Header: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-slate-200">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-700">{t('header.welcome')}, {user?.name}!</h1>
      </div>
      <div className="flex items-center gap-4">
         {user?.subscription && <SubscriptionBadge planId={user.subscription.planId} />}
         <LanguageSwitcher />
        <div className="relative">
          <button className="flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-brand-turquoise transition">
             <div className="h-10 w-10 rounded-full bg-brand-turquoise flex items-center justify-center text-white font-bold text-lg">
              {user?.name.charAt(0)}
            </div>
            <span className={`hidden md:inline font-medium text-slate-700 ${language === 'ar' ? 'me-2' : 'ms-2'}`}>{user?.name}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;