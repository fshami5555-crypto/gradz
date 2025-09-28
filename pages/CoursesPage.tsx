import React, { useState } from 'react';
import { MOCK_COURSES, MAJORS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { Course } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:scale-105 transition-transform">
            <div>
                <span className="text-xs font-semibold uppercase text-brand-orange">{course.department}</span>
                <h3 className="text-xl font-bold text-brand-blue mt-1">{course.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{t('courses.instructor')}: {course.instructor}</p>
                <p className="text-slate-600 mt-3">{course.description}</p>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">{course.credits} {t('courses.credits')}</span>
                <button className="bg-brand-turquoise text-white text-sm px-4 py-2 rounded-full hover:bg-opacity-80">{t('courses.enroll')}</button>
            </div>
        </div>
    );
};

const CoursesPage: React.FC = () => {
    const { user } = useAuth();
    const { t, language } = useLanguage();
    const [selectedMajor, setSelectedMajor] = useState(user?.major || 'All');

    const filteredCourses = selectedMajor === 'All' 
        ? MOCK_COURSES 
        : MOCK_COURSES.filter(course => course.department === selectedMajor);

    return (
        <div>
            <div className="p-8 bg-white rounded-lg shadow">
                <h2 className="text-4xl font-bold text-brand-blue">{t('courses.title')}</h2>
                <p className="mt-2 text-slate-600">{t('courses.subtitle')}</p>
            </div>

            <div className="mt-8">
                <div className="mb-6">
                    <label htmlFor="major-filter" className="block text-sm font-medium text-slate-700 mb-1">{t('courses.filterByMajor')}:</label>
                    <select
                        id="major-filter"
                        value={selectedMajor}
                        onChange={e => setSelectedMajor(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-turquoise bg-white"
                    >
                        <option value="All">{t('courses.allMajors')}</option>
                        {MAJORS.map(major => (
                            <option key={major.en} value={major.en}>{major[language]}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
                {filteredCourses.length === 0 && (
                     <div className="text-center text-slate-500 bg-white p-8 rounded-lg shadow">
                        <p>{t('courses.noCoursesFound')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;