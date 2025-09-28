import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import { useAuth } from '../contexts/AuthContext';
import { JORDANIAN_UNIVERSITIES, MAJORS } from '../constants';
import { TutorCourse, VideoLesson } from '../types';

const TutorCoursesPage: React.FC = () => {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const { tutorCourses, createTutorCourse, addVideoToCourse } = useContent();
    const myCourses = tutorCourses.filter(c => c.tutorId === user?.id);

    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<TutorCourse | null>(null);

    const handleOpenVideoModal = (course: TutorCourse) => {
        setSelectedCourse(course);
        setIsVideoModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center p-8 bg-white rounded-lg shadow-md mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-brand-blue">{t('tutor.courses.title')}</h2>
                    <p className="mt-1 text-slate-500">{t('tutor.courses.subtitle')}</p>
                </div>
                <button onClick={() => setIsCourseModalOpen(true)} className="px-6 py-3 bg-brand-orange text-white rounded-lg font-semibold hover:bg-opacity-90 transition">
                    Create New Course
                </button>
            </div>
            
            <div className="space-y-6">
                {myCourses.length === 0 && <p className="text-center text-slate-500 p-8 bg-white rounded-lg">You haven't created any courses yet.</p>}
                {myCourses.map(course => (
                    <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                             <div>
                                <h3 className="text-xl font-bold text-brand-turquoise">{course.title}</h3>
                                <p className="text-sm text-slate-500">{course.university} - {course.major}</p>
                            </div>
                            <button onClick={() => handleOpenVideoModal(course)} className="text-sm px-4 py-2 bg-brand-turquoise/20 text-brand-turquoise rounded-md hover:bg-brand-turquoise/30">
                                Add Video
                            </button>
                        </div>
                        <div className="mt-4 border-t pt-4">
                             <h4 className="font-semibold mb-2">Lessons:</h4>
                            <ul className="list-disc ps-5 space-y-1 text-slate-600">
                                {course.lessons.map(lesson => <li key={lesson.id}>{lesson.title}</li>)}
                                {course.lessons.length === 0 && <li className="list-none text-slate-400">No lessons added yet.</li>}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {isCourseModalOpen && <CreateCourseModal onClose={() => setIsCourseModalOpen(false)} onCreate={createTutorCourse} />}
            {isVideoModalOpen && selectedCourse && <AddVideoModal course={selectedCourse} onClose={() => setIsVideoModalOpen(false)} onAdd={addVideoToCourse} />}
        </div>
    );
};

const CreateCourseModal: React.FC<{ onClose: () => void, onCreate: (course: any) => void }> = ({ onClose, onCreate }) => {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onCreate({
            tutorId: user?.id,
            title: formData.get('title'),
            university: formData.get('university'),
            major: formData.get('major'),
        });
        onClose();
    };
    return (
       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">Create New Course</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" required placeholder="Course Title" className="w-full p-2 border rounded" />
                    <select name="university" required className="w-full p-2 border rounded bg-white">
                        <option value="" disabled>Select University</option>
                        {JORDANIAN_UNIVERSITIES.map(u => <option key={u.en} value={u[language]}>{u[language]}</option>)}
                    </select>
                    <select name="major" required className="w-full p-2 border rounded bg-white">
                        <option value="" disabled>Select Major</option>
                        {MAJORS.map(m => <option key={m.en} value={m[language]}>{m[language]}</option>)}
                    </select>
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-brand-orange text-white rounded">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AddVideoModal: React.FC<{ course: TutorCourse, onClose: () => void, onAdd: (courseId: string, lesson: any) => void }> = ({ course, onClose, onAdd }) => {
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onAdd(course.id, {
            title: formData.get('title'),
            description: formData.get('description'),
            videoUrl: formData.get('videoUrl'),
        });
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">Add Video to "{course.title}"</h3>
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" required placeholder="Video Title" className="w-full p-2 border rounded" />
                    <textarea name="description" required placeholder="Video Description" className="w-full p-2 border rounded" />
                    <input name="videoUrl" required placeholder="Video URL (e.g., YouTube)" className="w-full p-2 border rounded" />
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-brand-orange text-white rounded">Add Video</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default TutorCoursesPage;
