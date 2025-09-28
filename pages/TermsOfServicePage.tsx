import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const TermsOfServicePage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 prose prose-lg max-w-4xl mx-auto">
                <h1>{t('termsOfService.title')}</h1>
                <p><em>{t('termsOfService.lastUpdated')}</em></p>

                <h2>{t('termsOfService.agreement.title')}</h2>
                <p>{t('termsOfService.agreement.content')}</p>

                <h2>{t('termsOfService.useOfService.title')}</h2>
                <p>{t('termsOfService.useOfService.content')}</p>
                 <ul>
                    <li>{t('termsOfService.useOfService.points.eligibility')}</li>
                    <li>{t('termsOfService.useOfService.points.account')}</li>
                    <li>{t('termsOfService.useOfService.points.prohibited')}</li>
                </ul>

                <h2>{t('termsOfService.intellectualProperty.title')}</h2>
                <p>{t('termsOfService.intellectualProperty.content')}</p>

                <h2>{t('termsOfService.termination.title')}</h2>
                <p>{t('termsOfService.termination.content')}</p>

                <h2>{t('termsOfService.disclaimer.title')}</h2>
                <p>{t('termsOfService.disclaimer.content')}</p>

                <h2>{t('termsOfService.governingLaw.title')}</h2>
                <p>{t('termsOfService.governingLaw.content')}</p>

                 <h2>{t('termsOfService.contactUs.title')}</h2>
                <p>{t('termsOfService.contactUs.content')}</p>
            </div>
        </div>
    );
};

export default TermsOfServicePage;
