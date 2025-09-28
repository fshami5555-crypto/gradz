import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { SubscriptionPlan } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const PlanCard: React.FC<{
    plan: SubscriptionPlan;
    isCurrent: boolean;
    onSubscribe: (planId: 'single' | 'semester') => void;
}> = ({ plan, isCurrent, onSubscribe }) => {
    const { language, t } = useLanguage();
    
    const isSemester = plan.id === 'semester';
    const cardClasses = isSemester 
        ? 'bg-brand-blue text-white border-brand-orange'
        : 'bg-white text-brand-blue border-slate-200';
    const buttonClasses = isSemester
        ? 'bg-brand-orange text-white'
        : 'bg-brand-turquoise text-white';
    
    return (
        <div className={`rounded-xl shadow-lg p-8 border-t-4 transition-all transform hover:-translate-y-2 ${cardClasses}`}>
            <h3 className="text-2xl font-bold">{plan.name[language]}</h3>
            <p className={`text-5xl font-extrabold mt-4 ${isSemester ? 'text-brand-orange' : 'text-brand-turquoise'}`}>
                {plan.price} <span className="text-lg font-medium opacity-80">{t('subscriptions.currency')}</span>
            </p>
            <p className="mt-2 text-sm opacity-70">{isSemester ? t('subscriptions.perSemester') : t('subscriptions.perCourse')}</p>
            <ul className="mt-8 space-y-3 text-start">
                {plan.features[language].map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <CheckIcon />
                        <span className="ms-3">{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => onSubscribe(plan.id)}
                disabled={isCurrent}
                className={`w-full py-3 mt-10 text-lg font-semibold rounded-lg transition-colors ${buttonClasses} disabled:bg-slate-400 disabled:cursor-not-allowed`}
            >
                {isCurrent ? t('subscriptions.currentPlan') : t('subscriptions.subscribeNow')}
            </button>
        </div>
    );
};

const SubscriptionsPage: React.FC = () => {
    const { user, subscribe } = useAuth();
    const { subscriptionPlans } = useContent();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    const handleSubscribe = async (planId: 'single' | 'semester') => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsLoading(true);
        setMessage('');
        try {
            await subscribe(planId);
            const planName = subscriptionPlans.find(p => p.id === planId)?.name[language];
            setMessage(t('subscriptions.successMessage', { planName }));
        } catch (error) {
            setMessage(t('subscriptions.errorMessage'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-brand-blue">{t('subscriptions.title')}</h2>
                <p className="mt-2 text-slate-600 max-w-2xl mx-auto">{t('subscriptions.subtitle')}</p>
            </div>

            {message && (
                 <div className="mt-6 p-4 text-center text-green-800 bg-green-100 rounded-lg">
                    {message}
                </div>
            )}
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {subscriptionPlans.map(plan => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        isCurrent={user?.subscription?.planId === plan.id}
                        onSubscribe={handleSubscribe}
                    />
                ))}
            </div>
             {isLoading && <div className="text-center mt-4">{t('subscriptions.processing')}</div>}
        </div>
    );
};

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

export default SubscriptionsPage;