import React, { useState, useMemo } from 'react';
import { MOCK_COURSES } from '../constants';
import { MAJORS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Course } from '../types';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-brand-turquoise">
            <h3 className="font-bold text-xl text-brand-blue">{course.title}</h3>
            <p className="text-slate-500 text-sm mt-1">{course.instructor}</p>
            <p className="text-sm text-slate-400">{course.department} - {course.credits} Credits</p>
            <p className="mt-3 text-slate-600 text-sm">{course.description}</p>
            <button className="mt-4 w-full bg-brand-orange text-white py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm font-semibold">
                {t('courses.enrollButton', { defaultValue: 'Enroll Now' })}
            </button>
        </div>
    );
};

const CoursesPage: React.FC = () => {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMajor, setSelectedMajor] = useState(user?.major || 'All');
    
    const majorsList = ['All', ...MAJORS.map(m => m.en)];

    const filteredCourses = useMemo(() => {
        return MOCK_COURSES.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMajor = selectedMajor === 'All' || course.department === selectedMajor;
            return matchesSearch && matchesMajor;
        });
    }, [searchTerm, selectedMajor]);

    return (
        <div>
            <div className="p-8 bg-white rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-bold text-brand-blue">{t('courses.title')}</h2>
                <p className="mt-1 text-slate-500">{t('courses.subtitle')}</p>
            </div>

            <div className="mb-8 p-4 bg-white rounded-lg shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="text"
                    placeholder={t('courses.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow w-full md:w-auto px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
                <select
                    value={selectedMajor}
                    onChange={(e) => setSelectedMajor(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white"
                >
                    {majorsList.map(major => {
                        const majorObject = MAJORS.find(m => m.en === major);
                        const label = major === 'All' ? t('courses.allMajors', {defaultValue: 'All Majors'}) : (majorObject ? majorObject[language] : major);
                        return <option key={major} value={major}>{label}</option>;
                    })}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map(course => <CourseCard key={course.id} course={course} />)
                ) : (
                    <p className="text-center text-slate-500 col-span-full py-10">
                        {t('courses.noCoursesFound')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;
