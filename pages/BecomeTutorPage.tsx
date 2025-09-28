import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { JORDANIAN_UNIVERSITIES, MAJORS } from '../constants';
import { TutorApplication } from '../types';

const BecomeTutorPage: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const application: TutorApplication = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            university: formData.get('university') as string,
            major: formData.get('major') as string,
            subjects: formData.get('subjects') as string,
        };
        // In a real app, you might validate or save this temporarily.
        // Here, we navigate directly to the password creation step.
        navigate('/create-tutor-password', { state: { application } });
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-brand-blue">{t('tutor.becomeTutor.title')}</h2>
                <p className="mt-2 text-slate-600 max-w-2xl mx-auto">{t('tutor.becomeTutor.subtitle')}</p>
            </div>

            <div className="mt-10 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField name="name" label={t('tutor.becomeTutor.form.name')} type="text" />
                    <InputField name="email" label={t('tutor.becomeTutor.form.email')} type="email" />
                    <SelectField name="university" label={t('tutor.becomeTutor.form.university')} options={JORDANIAN_UNIVERSITIES.map(u => u[language])} />
                    <SelectField name="major" label={t('tutor.becomeTutor.form.major')} options={MAJORS.map(m => m[language])} />
                    <InputField name="subjects" label={t('tutor.becomeTutor.form.subjects')} type="text" />
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700">{t('tutor.becomeTutor.form.message')}</label>
                        <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-turquoise focus:border-brand-turquoise sm:text-sm"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-brand-orange text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange">
                        {t('tutor.becomeTutor.form.submit')}
                    </button>
                </form>
            </div>
        </div>
    );
};

const InputField: React.FC<{ name: string, label: string, type: string }> = ({ name, label, type }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
        <input type={type} name={name} id={name} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-turquoise focus:border-brand-turquoise sm:text-sm" />
    </div>
);

const SelectField: React.FC<{ name: string, label: string, options: string[] }> = ({ name, label, options }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
        <select id={name} name={name} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-brand-turquoise focus:border-brand-turquoise sm:text-sm rounded-md bg-white">
            <option value="">{`-- ${label} --`}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);


export default BecomeTutorPage;