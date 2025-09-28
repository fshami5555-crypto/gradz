import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import { JORDANIAN_UNIVERSITIES } from '../constants';

const BecomeTutorPage: React.FC = () => {
    const { t, language } = useLanguage();
    const { addTutorApplication } = useContent();
    const [submitted, setSubmitted] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        university: '',
        major: '',
        year: '',
        subjects: '',
        motivation: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const universityEn = JORDANIAN_UNIVERSITIES.find(u => u[language] === formData.university)?.en || formData.university;
            await addTutorApplication({...formData, university: universityEn});
            setSubmitted(true);
        } catch (error) {
            console.error("Failed to submit application", error);
            alert("Submission failed. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-brand-blue">{t('tutor.title')}</h2>
                <p className="mt-2 text-slate-600 max-w-2xl mx-auto">{t('tutor.subtitle')}</p>
                 <p className="mt-4 text-sm text-slate-500 max-w-2xl mx-auto">{t('tutor.note')}</p>
            </div>

            <div className="mt-10 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                {submitted ? (
                    <div className="text-center py-8">
                        <h3 className="text-2xl font-semibold text-brand-turquoise">{t('tutor.success.title')}</h3>
                        <p className="mt-2 text-slate-600">{t('tutor.success.message')}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">{t('tutor.form.name.label')}</label>
                            <input type="text" id="name" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise" placeholder={t('tutor.form.name.placeholder')} value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">{t('tutor.form.email.label')}</label>
                            <input type="email" id="email" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise" placeholder={t('tutor.form.email.placeholder')} value={formData.email} onChange={handleChange} />
                        </div>
                         <div>
                            <label htmlFor="university" className="block text-sm font-medium text-slate-700">{t('tutor.form.university.label')}</label>
                             <select id="university" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise bg-white" value={formData.university} onChange={handleChange}>
                                <option value="" disabled>{t('signup.selectUniversityPlaceholder')}</option>
                                {JORDANIAN_UNIVERSITIES.map(u => <option key={u.en} value={u[language]}>{u[language]}</option>)}
                            </select>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="major" className="block text-sm font-medium text-slate-700">{t('tutor.form.major.label')}</label>
                                <input type="text" id="major" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise" placeholder={t('tutor.form.major.placeholder')} value={formData.major} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-slate-700">{t('tutor.form.year.label')}</label>
                                 <select id="year" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise bg-white" value={formData.year} onChange={handleChange}>
                                    <option value="" disabled>{t('tutor.form.year.placeholder')}</option>
                                    <option value="First Year">{t('tutor.form.year.first')}</option>
                                    <option value="Second Year">{t('tutor.form.year.second')}</option>
                                    <option value="Third Year">{t('tutor.form.year.third')}</option>
                                    <option value="Fourth Year">{t('tutor.form.year.fourth')}</option>
                                    <option value="Fifth Year+">{t('tutor.form.year.fifth')}</option>
                                     <option value="Graduate">{t('tutor.form.year.graduate')}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subjects" className="block text-sm font-medium text-slate-700">{t('tutor.form.subjects.label')}</label>
                            <input type="text" id="subjects" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise" placeholder={t('tutor.form.subjects.placeholder')} value={formData.subjects} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="motivation" className="block text-sm font-medium text-slate-700">{t('tutor.form.motivation.label')}</label>
                            <textarea id="motivation" rows={4} required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise" placeholder={t('tutor.form.motivation.placeholder')} value={formData.motivation} onChange={handleChange} />
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-brand-orange text-white py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold">{t('tutor.form.submit')}</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BecomeTutorPage;