import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MAJORS, JORDANIAN_UNIVERSITIES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const LoginForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const user = await login(email, password);
            if (user) {
                navigate('/dashboard');
            } else {
                setError(t('login.invalidCredentials'));
            }
        } catch (err) {
            setError(t('login.loginFailed'));
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-brand-blue mb-4">{t('login.welcomeBack')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input
                    type="email"
                    placeholder={t('login.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
                    aria-label="Email"
                />
                <input
                    type="password"
                    placeholder={t('login.passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
                    aria-label="Password"
                />
                <button type="submit" className="w-full bg-brand-orange text-white py-2 rounded-md hover:bg-opacity-90 transition-colors">{t('login.loginButton')}</button>
            </form>
            <p className="mt-4 text-center text-sm">
                {t('login.newUserPrompt')} <button onClick={onSwitch} className="text-brand-turquoise font-semibold hover:underline">{t('login.createAccountLink')}</button>
            </p>
        </div>
    );
};

const SignupForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            // Find the english name for the university and major to store in the DB
            const universityEn = JORDANIAN_UNIVERSITIES.find(u => u[language] === university)?.en || university;
            const majorEn = MAJORS.find(m => m[language] === major)?.en || major;

            await signup(name, email, universityEn, majorEn, password);
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = (err instanceof Error && err.message === "User already exists")
                ? t('signup.userExistsError')
                : t('signup.signupFailed');
            setError(errorMessage);
        }
    };
    
    return (
         <div>
            <h2 className="text-2xl font-bold text-brand-blue mb-4">{t('signup.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                 <input type="text" placeholder={t('signup.fullNamePlaceholder')} value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise" aria-label="Full Name" />
                <input type="email" placeholder={t('login.emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise" aria-label="Email" />
                <select value={university} onChange={(e) => setUniversity(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise bg-white" aria-label="Select your university">
                    <option value="" disabled>{t('signup.selectUniversityPlaceholder')}</option>
                    {JORDANIAN_UNIVERSITIES.map(u => <option key={u.en} value={u[language]}>{u[language]}</option>)}
                </select>
                <select value={major} onChange={(e) => setMajor(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise bg-white" aria-label="Select your major">
                    <option value="" disabled>{t('signup.selectMajorPlaceholder')}</option>
                    {MAJORS.map(m => <option key={m.en} value={m[language]}>{m[language]}</option>)}
                </select>
                <input type="password" placeholder={t('login.passwordPlaceholder')} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise" aria-label="Password" />
                <button type="submit" className="w-full bg-brand-orange text-white py-2 rounded-md hover:bg-opacity-90 transition-colors">{t('signup.signupButton')}</button>
            </form>
             <p className="mt-4 text-center text-sm">
                {t('signup.alreadyHaveAccountPrompt')} <button onClick={onSwitch} className="text-brand-turquoise font-semibold hover:underline">{t('login.loginLink')}</button>
            </p>
        </div>
    );
};


const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="container mx-auto flex flex-col items-center justify-center py-16 px-4">
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
               {isLogin ? <LoginForm onSwitch={() => setIsLogin(false)} /> : <SignupForm onSwitch={() => setIsLogin(true)} />}
            </div>
        </div>
    );
};

export default LoginPage;