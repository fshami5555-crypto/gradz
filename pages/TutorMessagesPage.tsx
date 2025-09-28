import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';

const TutorMessagesPage: React.FC = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const { messages } = useContent();

    const myMessages = messages.filter(msg => msg.toTutorId === user?.id);
    
    return (
        <div>
            <div className="p-8 bg-white rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-bold text-brand-blue">{t('tutor.messages.title')}</h2>
                <p className="mt-1 text-slate-500">{t('tutor.messages.subtitle')}</p>
            </div>
             <div className="space-y-4">
                {myMessages.length === 0 ? (
                    <div className="p-8 bg-white rounded-lg shadow-md text-center text-slate-500">
                        You have no messages.
                    </div>
                ) : (
                    myMessages.map(msg => (
                        <div key={msg.id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-slate-800">{msg.subject}</p>
                                <span className="text-xs text-slate-400">{new Date(msg.timestamp).toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-slate-500">From: {msg.fromStudentName}</p>
                            <p className="mt-4 text-slate-700">{msg.body}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TutorMessagesPage;