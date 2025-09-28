import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { SiteConfig, CommunityBanner } from '../types';

interface SiteConfigContextType {
    config: SiteConfig;
    setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
}

const MOCK_BANNERS: CommunityBanner[] = [
    { university: "University of Jordan", bannerUrl: "https://i.imgur.com/vjP1IZJ.jpeg" },
    { university: "Princess Sumaya University for Technology (PSUT)", bannerUrl: "https://i.imgur.com/O6t3A6g.jpeg" },
    { university: "Jordan University of Science and Technology (JUST)", bannerUrl: "https://i.imgur.com/5O4xYqH.jpeg" },
];

const MOCK_CONFIG: SiteConfig = {
    logoUrl: 'https://i.imgur.com/JzWd4zG.png', // A simple graduation cap logo
    homepageHeroUrls: [
        'https://i.imgur.com/k2psb5V.jpeg', // University campus
        'https://i.imgur.com/8aP2a7A.jpeg', // Students studying in a library
        'https://i.imgur.com/h52tA3s.jpeg', // Graduation ceremony
    ],
    universityLogos: [
        { name: 'University of Jordan', logo: 'https://i.imgur.com/3h02a5Y.png' },
        { name: 'JUST', logo: 'https://i.imgur.com/k9b3XmS.png' },
        { name: 'Yarmouk University', logo: 'https://i.imgur.com/rX8f8d5.png' },
        { name: 'Hashemite University', logo: 'https://i.imgur.com/sY7v7eW.png' },
        { name: 'PSUT', logo: 'https://i.imgur.com/tN8oA3f.png' },
        { name: 'German Jordanian University', logo: 'https://i.imgur.com/JjFq2Kk.png' },
    ],
    blueZCoinUrl: 'https://i.imgur.com/X1Q2X4d.png', // Blue coin icon
    yellowZCoinUrl: 'https://i.imgur.com/S5t8d2p.png', // Yellow coin icon
    siteStats: {
        students: 1250,
        tutors: 75,
        courses: 200,
        visitors: 5400
    },
    faq: [
        {
            id: 'faq1',
            question: { en: 'What is Gradz?', ar: 'ما هي منصة Gradz؟' },
            answer: { en: 'Gradz is an integrated learning platform for university students in Jordan, offering courses, a personal workspace, and AI-powered study tools to enhance the academic journey.', ar: 'Gradz هي منصة تعليمية متكاملة لطلاب الجامعات في الأردن، تقدم مساقات دراسية، ومساحة عمل شخصية، وأدوات دراسة مدعومة بالذكاء الاصطناعي لتعزيز الرحلة الأكاديمية.' }
        },
        {
            id: 'faq2',
            question: { en: 'How does the AI Study Buddy work?', ar: 'كيف يعمل المساعد الدراسي الذكي؟' },
            answer: { en: 'Our AI Study Buddy uses advanced language models to understand your questions and provide clear, concise explanations and examples for a wide range of academic subjects, 24/7.', ar: 'يستخدم مساعدنا الدراسي الذكي نماذج لغوية متقدمة لفهم أسئلتك وتقديم شروحات وأمثلة واضحة وموجزة لمجموعة واسعة من المواد الأكاديمية، على مدار الساعة.' }
        },
        {
            id: 'faq3',
            question: { en: 'Is there a free trial?', ar: 'هل هناك نسخة تجريبية مجانية؟' },
            answer: { en: 'Yes! When you sign up, you get a welcome bonus of Z-Coins to try out some of our premium features and get a feel for the platform.', ar: 'نعم! عند التسجيل، تحصل على مكافأة ترحيبية من عملات Z-Coins لتجربة بعض ميزاتنا المتميزة والتعرف على المنصة.' }
        }
    ],
    communityBanners: MOCK_BANNERS,
};


const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<SiteConfig>(() => {
         try {
            const storedConfig = sessionStorage.getItem('gradzConfig');
            return storedConfig ? JSON.parse(storedConfig) : MOCK_CONFIG;
        } catch (error) {
            return MOCK_CONFIG;
        }
    });

    useEffect(() => {
        sessionStorage.setItem('gradzConfig', JSON.stringify(config));
    }, [config]);
    

    return (
        <SiteConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </SiteConfigContext.Provider>
    );
};

export const useSiteConfig = (): SiteConfigContextType => {
    const context = useContext(SiteConfigContext);
    if (context === undefined) {
        throw new Error('useSiteConfig must be used within a SiteConfigProvider');
    }
    return context;
};