import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { TutorApplication } from '../types';

const CreateTutorPasswordPage: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { createTutorAccount } = useAuth();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [application, setApplication] = useState<TutorApplication | null>(null);

    useEffect(() => {
        if (state?.application) {
            setApplication(state.application);
        } else {
            setError(t('tutor.createPassword.tokenError'));
        }
    }, [state, t]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!application) return;
        setError('');
        if (password !== confirmPassword) {
            setError(t('tutor.createPassword.error'));
            return;
        }

        try {
            await createTutorAccount(application, password);
            setSuccess(true);
            setTimeout(() => {
                navigate('/tutor/profile');
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };
    
    return (
        <div className="container mx-auto flex flex-col items-center justify-center py-16 px-4">
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-brand-blue mb-2">{t('tutor.createPassword.title')}</h2>
                <p className="text-slate-500 mb-6">{t('tutor.createPassword.subtitle')}</p>
                
                {success ? (
                     <p className="text-green-600 bg-green-100 p-4 rounded-md">{t('tutor.createPassword.success')}</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <p className="text-red-500 text-sm bg-red-100 p-2 rounded">{error}</p>}
                        <input
                            type="password"
                            placeholder={t('tutor.createPassword.password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={!application}
                            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
                        />
                        <input
                            type="password"
                            placeholder={t('tutor.createPassword.confirmPassword')}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={!application}
                            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
                        />
                        <button 
                            type="submit" 
                            disabled={!application}
                            className="w-full bg-brand-orange text-white py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-slate-400">
                            {t('tutor.createPassword.submit')}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateTutorPasswordPage;