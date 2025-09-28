import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
    const { language, switchLanguage } = useLanguage();

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        switchLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            aria-label="Switch language"
        >
            {language === 'en' ? 'العربية' : 'English'}
        </button>
    );
};

export default LanguageSwitcher;
