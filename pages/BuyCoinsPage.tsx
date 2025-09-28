import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { CoinPackage } from '../types';

const CoinCard: React.FC<{ pkg: CoinPackage }> = ({ pkg }) => {
    const { language, t } = useLanguage();
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-brand-turquoise text-center">
            <h3 className="text-2xl font-bold text-brand-blue">{pkg.name[language]}</h3>
            <p className="text-5xl font-extrabold text-slate-800 mt-4">{pkg.amount + pkg.bonus}</p>
            <p className="text-brand-orange font-semibold mt-1">
                ({pkg.amount} + {pkg.bonus} {t('buyCoins.free')})
            </p>
            <p className="mt-4 text-slate-500">{t('buyCoins.price')}: 
                <span className="font-bold text-lg text-brand-turquoise ms-2">
                    {pkg.price} {t('buyCoins.currency')}
                </span>
            </p>
        </div>
    );
};

const BuyCoinsPage: React.FC = () => {
    const { coinPackages } = useContent();
    const { user, redeemCode } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRedeem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;

        if (!user) {
            navigate('/login');
            return;
        }

        setIsLoading(true);
        setMessage(null);
        
        const result = await redeemCode(code);
        
        if (result.success) {
            setMessage({ type: 'success', text: t('buyCoins.successMessage', { amount: result.value.toString() }) });
            setCode('');
        } else {
            setMessage({ type: 'error', text: t(`buyCoins.errors.${result.message.replace(/\s+/g, '').replace(/\./g, '')}`, { default: result.message }) });
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-brand-blue">{t('buyCoins.title')}</h2>
                <p className="mt-2 text-slate-600 max-w-2xl mx-auto">{t('buyCoins.subtitle')}</p>
            </div>

            <div className="mt-10 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-center text-brand-blue mb-4">{t('buyCoins.redeem.title')}</h3>
                <form onSubmit={handleRedeem} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={t('buyCoins.redeem.placeholder')}
                        className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading} className="bg-brand-orange text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 disabled:bg-opacity-50 transition">
                        {isLoading ? t('buyCoins.redeem.redeeming') : t('buyCoins.redeem.redeemButton')}
                    </button>
                </form>
                {message && (
                    <div className={`mt-4 p-3 text-center rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                )}
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {coinPackages.map(pkg => (
                    <CoinCard key={pkg.id} pkg={pkg} />
                ))}
            </div>
        </div>
    );
};

export default BuyCoinsPage;
