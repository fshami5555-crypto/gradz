import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import en from '../locales/en.js';
import ar from '../locales/ar.js';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    t: (key: string, replacements?: { [key: string]: string }) => string;
    switchLanguage: (lang: Language) => void;
}

const translations: { [key in Language]: any } = { en, ar };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const storedLang = localStorage.getItem('gradzLanguage');
        return (storedLang === 'ar' || storedLang === 'en') ? storedLang : 'en';
    });

    useEffect(() => {
        localStorage.setItem('gradzLanguage', language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const switchLanguage = (lang: Language) => {
        setLanguage(lang);
    };

    const t = (key: string, replacements?: { [key: string]: string }): string => {
        const keys = key.split('.');
        let result = translations[language];
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) {
                return key; // Return the key itself if not found
            }
        }

        let strResult = String(result);

        if (replacements) {
            Object.keys(replacements).forEach(placeholder => {
                strResult = strResult.replace(`{{${placeholder}}}`, replacements[placeholder]);
            });
        }
        
        return strResult;
    };

    return (
        <LanguageContext.Provider value={{ language, t, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
