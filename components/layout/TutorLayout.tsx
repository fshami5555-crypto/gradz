
import React from 'react';
import TutorSidebar from './TutorSidebar';
import Header from './Header'; // Reusing the same header for now
import { useLanguage } from '../../contexts/LanguageContext';

const TutorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  return (
    <div className={`flex h-screen bg-slate-100 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
      <TutorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TutorLayout;
