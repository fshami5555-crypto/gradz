import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLanguage } from '../../contexts/LanguageContext';

const StudentLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  return (
    <div className={`flex h-screen bg-slate-100 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
      <Sidebar />
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

export default StudentLayout;