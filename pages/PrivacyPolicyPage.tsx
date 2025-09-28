import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPolicyPage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 prose prose-lg max-w-4xl mx-auto">
                <h1>{t('privacyPolicy.title')}</h1>
                <p><em>{t('privacyPolicy.lastUpdated')}</em></p>
                
                <h2>{t('privacyPolicy.introduction.title')}</h2>
                <p>{t('privacyPolicy.introduction.content')}</p>

                <h2>{t('privacyPolicy.informationWeCollect.title')}</h2>
                <p>{t('privacyPolicy.informationWeCollect.content')}</p>
                <ul>
                    <li><strong>{t('privacyPolicy.informationWeCollect.points.personal').split(':')[0]}:</strong> {t('privacyPolicy.informationWeCollect.points.personal').split(':')[1]}</li>
                    <li><strong>{t('privacyPolicy.informationWeCollect.points.usage').split(':')[0]}:</strong> {t('privacyPolicy.informationWeCollect.points.usage').split(':')[1]}</li>
                </ul>

                <h2>{t('privacyPolicy.howWeUseInformation.title')}</h2>
                <p>{t('privacyPolicy.howWeUseInformation.content')}</p>
                <ul>
                    <li>{t('privacyPolicy.howWeUseInformation.points.provide')}</li>
                    <li>{t('privacyPolicy.howWeUseInformation.points.improve')}</li>
                    <li>{t('privacyPolicy.howWeUseInformation.points.communicate')}</li>
                </ul>

                <h2>{t('privacyPolicy.dataSharing.title')}</h2>
                <p>{t('privacyPolicy.dataSharing.content')}</p>

                <h2>{t('privacyPolicy.yourRights.title')}</h2>
                <p>{t('privacyPolicy.yourRights.content')}</p>

                <h2>{t('privacyPolicy.contactUs.title')}</h2>
                <p>{t('privacyPolicy.contactUs.content')}</p>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
