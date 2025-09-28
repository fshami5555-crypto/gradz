import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_COURSES } from '../constants';
import { getAIResponse } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

const AITool: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [chatHistory, setChatHistory] = useState<{ user: string; bot: string; }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;
        
        const userMessage = prompt;
        setPrompt('');
        setIsLoading(true);

        const newHistory = [...chatHistory, { user: userMessage, bot: '...' }];
        setChatHistory(newHistory);

        const response = await getAIResponse(chatHistory, userMessage);
        
        newHistory[newHistory.length - 1].bot = response;
        setChatHistory([...newHistory]);
        setIsLoading(false);
    };

    return (
        <div id="ai-tool" className="bg-white rounded-lg shadow-md mt-8">
            <div className="p-6 border-b">
                <h3 className="text-2xl font-semibold text-brand-blue flex items-center">
                    <SparklesIcon />
                    <span className="ms-2">{t('dashboard.aiTool.title')}</span>
                </h3>
                <p className="text-slate-500 mt-1">{t('dashboard.aiTool.subtitle')}</p>
            </div>
            <div className="p-6 h-96 overflow-y-auto bg-slate-50">
                {chatHistory.length === 0 && (
                    <div className="text-center text-slate-400 h-full flex items-center justify-center">
                        <p>{t('dashboard.aiTool.noMessages')}</p>
                    </div>
                )}
                <div className="space-y-4">
                    {chatHistory.map((chat, index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-end">
                                <p className="bg-brand-turquoise text-white p-3 rounded-lg max-w-lg">{chat.user}</p>
                            </div>
                             <div className="flex justify-start">
                                <p className="bg-white border p-3 rounded-lg max-w-lg text-slate-700 whitespace-pre-wrap">{chat.bot}</p>
                            </div>
                        </React.Fragment>
                    ))}
                    {isLoading && chatHistory[chatHistory.length - 1]?.bot === '...' && (
                         <div className="flex justify-start">
                            <p className="bg-white border p-3 rounded-lg max-w-lg text-slate-700">
                                <span className="animate-pulse">{t('dashboard.aiTool.thinking')}</span>
                            </p>
                        </div>
                    )}
                </div>
                 <div ref={chatEndRef} />
            </div>
            <div className="p-6 border-t">
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t('dashboard.aiTool.placeholder')}
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading} className="bg-brand-orange text-white px-6 py-2 rounded-lg hover:bg-opacity-90 disabled:bg-opacity-50 transition">
                        {isLoading ? t('dashboard.aiTool.sending') : t('dashboard.aiTool.send')}
                    </button>
                </form>
            </div>
        </div>
    );
};

const StudentDashboardPage: React.FC = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const myCourses = MOCK_COURSES.filter(c => c.department === user?.major).slice(0, 3);

    return (
        <div>
            <div className="p-8 bg-brand-blue rounded-lg text-white shadow-lg">
                <h2 className="text-4xl font-bold">{t('dashboard.title')}</h2>
                <p className="mt-2 text-slate-300">{t('dashboard.welcome')}, {user?.name}. {t('dashboard.subtitle')}</p>
            </div>

            <div className="mt-8">
                 <h3 className="text-2xl font-semibold text-slate-800 mb-4">{t('dashboard.myCourses')}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myCourses.map(course => (
                        <div key={course.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                            <h4 className="font-bold text-lg text-brand-turquoise">{course.title}</h4>
                            <p className="text-slate-500 text-sm">{course.instructor}</p>
                            <p className="mt-2 text-slate-600 text-sm">{course.description}</p>
                        </div>
                    ))}
                 </div>
            </div>
            
            <AITool />
        </div>
    );
};

const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6.343 17.657l-2.828 2.828m17.657-17.657l-2.828 2.828m0 0l-2.828 2.828m2.828-2.828l2.828 2.828M3 21v-4M5 21H1M17.657 6.343l2.828-2.828m0 0l2.828 2.828m-2.828-2.828l-2.828 2.828M21 3v4M19 3h2M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;

export default StudentDashboardPage;