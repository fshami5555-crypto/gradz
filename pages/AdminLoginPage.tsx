import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import { useLanguage } from '../contexts/LanguageContext';

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { adminLogin } = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const user = await adminLogin(email, password);
            if (user) {
                navigate('/admin/dashboard');
            } else {
                setError(t('adminLogin.invalidCredentials'));
            }
        } catch (err) {
            setError(t('adminLogin.loginFailed'));
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-blue text-white p-4">
             <div className="text-center mb-8">
                <Link to="/" aria-label="Back to Home">
                  <Logo isLight={true}/>
                </Link>
                <h1 className="text-3xl font-bold mt-4">{t('adminLogin.title')}</h1>
             </div>
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl text-slate-800">
                 <h2 className="text-2xl font-bold text-brand-blue mb-6 text-center">{t('adminLogin.signIn')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 text-sm bg-red-100 p-2 rounded">{error}</p>}
                    <input
                        type="email"
                        placeholder={t('adminLogin.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                    <input
                        type="password"
                        placeholder={t('login.passwordPlaceholder')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                    <button type="submit" className="w-full bg-brand-blue text-white py-2 rounded-md hover:bg-brand-blue-light transition-colors">{t('adminLogin.accessDashboardButton')}</button>
                </form>
            </div>
             <p className="mt-6 text-sm text-slate-300">
                {t('adminLogin.notAdminPrompt')} <Link to="/" className="text-brand-turquoise font-semibold hover:underline">{t('adminLogin.returnHomeLink')}</Link>
            </p>
        </div>
    );
};

export default AdminLoginPage;