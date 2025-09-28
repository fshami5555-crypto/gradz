import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const ChatPage: React.FC = () => {
    const { user } = useAuth();
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
        
        const latestHistory = [...chatHistory, { user: userMessage, bot: response }];
        setChatHistory(latestHistory);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-112px)]">
             <div className="p-8 bg-white rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-bold text-brand-blue">{t('chat.title')}</h2>
                <p className="mt-1 text-slate-500">{t('chat.subtitle')}</p>
            </div>
            
            <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
                <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4">
                    {chatHistory.length === 0 && (
                        <div className="text-center text-slate-400 h-full flex items-center justify-center">
                            <p>{t('dashboard.aiTool.noMessages')}</p>
                        </div>
                    )}
                    {chatHistory.map((chat, index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-end items-start gap-2">
                                <p className="bg-brand-turquoise text-white p-3 rounded-lg max-w-xl">{chat.user}</p>
                                <div className="h-8 w-8 rounded-full bg-brand-turquoise flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {user?.name?.charAt(0)}
                                </div>
                            </div>
                             <div className="flex justify-start items-start gap-2">
                                <div className="h-8 w-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    AI
                                </div>
                                <p className="bg-slate-200 p-3 rounded-lg max-w-xl text-slate-700 whitespace-pre-wrap">{chat.bot}</p>
                            </div>
                        </React.Fragment>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start items-start gap-2">
                             <div className="h-8 w-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    AI
                                </div>
                            <p className="bg-slate-200 p-3 rounded-lg max-w-xl text-slate-700">
                                <span className="animate-pulse">{t('dashboard.aiTool.thinking')}</span>
                            </p>
                        </div>
                    )}
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
                        <button type="submit" disabled={isLoading || !prompt.trim()} className="bg-brand-orange text-white px-6 py-2 rounded-lg hover:bg-opacity-90 disabled:bg-opacity-50 transition">
                            {isLoading ? t('dashboard.aiTool.sending') : t('dashboard.aiTool.send')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
