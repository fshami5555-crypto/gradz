import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import { MOCK_STUDENTS } from '../constants';
import { User, BlogPost, SubscriptionPlan, TutorApplication } from '../types';
import Logo from '../components/ui/Logo';


const AdminDashboardPage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('students');

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    const tabs = [
        { id: 'students', label: t('admin.tabs.students'), icon: <UsersIcon /> },
        { id: 'tutorApplications', label: t('admin.tabs.tutorApplications'), icon: <BriefcaseIcon /> },
        { id: 'content', label: t('admin.tabs.content'), icon: <PencilIcon /> },
        { id: 'siteImages', label: t('admin.tabs.siteImages'), icon: <PhotographIcon /> },
    ];

    return (
        <div className="flex h-screen bg-slate-100 font-sans">
            <div className={`flex flex-col w-64 bg-brand-blue text-slate-300 ${language === 'ar' ? 'border-l' : 'border-r'} border-brand-blue-light`}>
                <div className="flex items-center justify-center h-20 border-b border-brand-blue-light">
                    <Logo isLight={true}/>
                </div>
                <nav className="flex-1 mt-5">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center w-full px-6 py-3 transition-colors hover:bg-brand-blue-light hover:text-white ${activeTab === tab.id ? 'bg-brand-blue-light text-white' : ''} ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                            {tab.icon}
                            <span className="mx-4 font-medium">{tab.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-brand-blue-light">
                    <button onClick={handleLogout} className={`flex items-center w-full px-4 py-2 text-slate-200 hover:bg-red-600 rounded-md transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <LogoutIcon /> <span className="mx-4">{t('sidebar.logout')}</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-slate-200">
                    <h1 className="text-2xl font-semibold text-gray-800">{t('admin.title')}</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-600">{t('header.welcome')}, {user?.name}</span>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-8">
                   {activeTab === 'students' && <StudentsTab />}
                   {activeTab === 'tutorApplications' && <TutorApplicationsTab />}
                   {activeTab === 'content' && <ContentTab />}
                   {activeTab === 'siteImages' && <SiteImagesTab />}
                </main>
            </div>
        </div>
    );
};


const StudentsTab = () => {
    const { t } = useLanguage();
    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">{t('admin.students.title')}</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-slate-600">
                                <th className="text-left p-3 font-semibold">{t('admin.students.table.name')}</th>
                                <th className="text-left p-3 font-semibold">{t('admin.students.table.email')}</th>
                                <th className="text-left p-3 font-semibold">{t('admin.students.table.university')}</th>
                                <th className="text-left p-3 font-semibold">{t('admin.students.table.major')}</th>
                                <th className="text-left p-3 font-semibold">{t('admin.students.table.subscription')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_STUDENTS.map((student: User) => (
                                <tr key={student.id} className="border-b hover:bg-slate-50">
                                    <td className="p-3">{student.name}</td>
                                    <td className="p-3">{student.email}</td>
                                    <td className="p-3">{student.university}</td>
                                    <td className="p-3">{student.major}</td>
                                    <td className="p-3">
                                        {student.subscription ? (
                                             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${student.subscription.planId === 'semester' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {t(`subscriptions.plan.${student.subscription.planId}`)}
                                            </span>
                                        ) : (
                                            <span className="text-slate-400">{t('admin.students.table.none')}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const TutorApplicationsTab = () => {
    const { t } = useLanguage();
    const { tutorApplications } = useContent();
    const [selectedApp, setSelectedApp] = useState<TutorApplication | null>(null);

    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">{t('admin.tutorApps.title')}</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-slate-600">
                                <th className="text-left p-3 font-semibold">{t('admin.tutorApps.table.name')}</th>
                                <th className="text-left p-3 font-semibold">{t('admin.tutorApps.table.university')}</th>
                                <th className="text-left p-3 font-semibold">{t('admin.tutorApps.table.subjects')}</th>
                                <th className="text-left p-3 font-semibold">{t('admin.tutorApps.table.submittedAt')}</th>
                                <th className="text-left p-3 font-semibold">{t('admin.tutorApps.table.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutorApplications.map((app) => (
                                <tr key={app.id} className="border-b hover:bg-slate-50">
                                    <td className="p-3">{app.name}</td>
                                    <td className="p-3">{app.university}</td>
                                    <td className="p-3 truncate max-w-xs">{app.subjects}</td>
                                    <td className="p-3">{app.submittedAt}</td>
                                    <td className="p-3">
                                        <button onClick={() => setSelectedApp(app)} className="text-brand-turquoise hover:underline">{t('admin.tutorApps.view')}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedApp && <ViewApplicationModal application={selectedApp} onClose={() => setSelectedApp(null)} />}
        </div>
    );
};

const ViewApplicationModal: React.FC<{ application: TutorApplication, onClose: () => void }> = ({ application, onClose }) => {
    const { t } = useLanguage();
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-brand-blue">{t('admin.tutorApps.modal.title')}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-800">&times;</button>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    <div><strong>{t('admin.tutorApps.table.name')}:</strong> {application.name}</div>
                    <div><strong>{t('admin.tutorApps.table.email')}:</strong> <a href={`mailto:${application.email}`} className="text-brand-turquoise">{application.email}</a></div>
                    <div><strong>{t('admin.tutorApps.table.university')}:</strong> {application.university}</div>
                    <div><strong>{t('admin.tutorApps.table.major')}:</strong> {application.major} ({application.year})</div>
                    <div><strong>{t('admin.tutorApps.table.subjects')}:</strong> {application.subjects}</div>
                    <div className="whitespace-pre-wrap"><strong>{t('admin.tutorApps.modal.motivation')}:</strong> {application.motivation}</div>
                    <div><strong>{t('admin.tutorApps.table.submittedAt')}:</strong> {application.submittedAt}</div>
                </div>
                <div className="p-4 bg-slate-50 border-t flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700">{t('admin.actions.close')}</button>
                </div>
            </div>
        </div>
    );
};

const ContentTab = () => {
    const { t } = useLanguage();
    const { blogPosts, deleteBlogPost, subscriptionPlans, updateSubscriptionPlans } = useContent();
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [tempPlans, setTempPlans] = useState<SubscriptionPlan[]>(JSON.parse(JSON.stringify(subscriptionPlans)));

    const handleOpenBlogModal = (post: BlogPost | null = null) => {
        setEditingPost(post);
        setIsBlogModalOpen(true);
    };

    const handleDeletePost = (postId: string) => {
        if (window.confirm(t('admin.actions.confirmDelete'))) {
            deleteBlogPost(postId);
        }
    };

    const handlePlanChange = (planId: 'single' | 'semester', field: keyof SubscriptionPlan, value: any, lang?: 'en' | 'ar', index?: number) => {
        setTempPlans(prevPlans => prevPlans.map(plan => {
            if (plan.id === planId) {
                const newPlan = { ...plan };
                if (field === 'name' && lang) {
                    newPlan.name = { ...newPlan.name, [lang]: value };
                } else if (field === 'features' && lang && index !== undefined) {
                    const newFeatures = [...newPlan.features[lang]];
                    newFeatures[index] = value;
                    newPlan.features = { ...newPlan.features, [lang]: newFeatures };
                } else {
                    (newPlan as any)[field] = value;
                }
                return newPlan;
            }
            return plan;
        }));
    };

    const handleSavePlans = () => {
        updateSubscriptionPlans(tempPlans);
        alert(t('admin.content.plans.updatedAlert'));
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">{t('admin.tabs.content')}</h2>
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-slate-700">{t('admin.content.blog.title')}</h3>
                        <button onClick={() => handleOpenBlogModal()} className="px-4 py-2 bg-brand-turquoise text-white rounded-md hover:bg-opacity-90">{t('admin.content.blog.addNew')}</button>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-slate-600">
                                <th className="text-left p-3 font-semibold">{t('admin.content.blog.table.title')}</th>
                                <th className="text-left p-3 font-semibold">{t('admin.content.blog.table.author')}</th>
                                <th className="text-left p-3 font-semibold">{t('admin.content.blog.table.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogPosts.map(post => (
                                <tr key={post.id} className="border-b hover:bg-slate-50">
                                    <td className="p-3">{post.title}</td>
                                    <td className="p-3">{post.author}</td>
                                    <td className="p-3 space-x-2">
                                        <button onClick={() => handleOpenBlogModal(post)} className="text-blue-500 hover:underline">{t('admin.actions.edit')}</button>
                                        <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:underline">{t('admin.actions.delete')}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-slate-700 mb-4">{t('admin.content.plans.title')}</h3>
                    <div className="space-y-6">
                        {tempPlans.map(plan => (
                            <div key={plan.id} className="p-4 border rounded-md">
                                <h4 className="font-bold text-lg text-brand-blue">{t(`subscriptions.plan.${plan.id}`)}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                    <div>
                                        <label className="text-sm font-medium">{t('admin.content.plans.price')} (JD)</label>
                                        <input type="text" value={plan.price} onChange={e => handlePlanChange(plan.id, 'price', e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">{t('admin.content.plans.plan')} (EN)</label>
                                        <input type="text" value={plan.name.en} onChange={e => handlePlanChange(plan.id, 'name', e.target.value, 'en')} className="w-full mt-1 p-2 border rounded-md" />
                                    </div>
                                     <div>
                                        <label className="text-sm font-medium">{t('admin.content.plans.plan')} (AR)</label>
                                        <input type="text" value={plan.name.ar} onChange={e => handlePlanChange(plan.id, 'name', e.target.value, 'ar')} className="w-full mt-1 p-2 border rounded-md" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                     <div>
                                        <label className="text-sm font-medium">Features (EN)</label>
                                        {plan.features.en.map((feat, i) => <input key={i} type="text" value={feat} onChange={e => handlePlanChange(plan.id, 'features', e.target.value, 'en', i)} className="w-full mt-1 p-2 border rounded-md"/>)}
                                    </div>
                                     <div>
                                        <label className="text-sm font-medium">Features (AR)</label>
                                        {plan.features.ar.map((feat, i) => <input key={i} type="text" value={feat} onChange={e => handlePlanChange(plan.id, 'features', e.target.value, 'ar', i)} className="w-full mt-1 p-2 border rounded-md"/>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-right mt-6">
                        <button onClick={handleSavePlans} className="px-6 py-2 bg-brand-orange text-white rounded-md hover:bg-opacity-90">{t('admin.actions.savePlanChanges')}</button>
                    </div>
                </div>
            </div>
            {isBlogModalOpen && <BlogEditModal post={editingPost} onClose={() => setIsBlogModalOpen(false)} />}
        </div>
    )
}

const BlogEditModal: React.FC<{ post: BlogPost | null; onClose: () => void; }> = ({ post, onClose }) => {
    const { t } = useLanguage();
    const { addBlogPost, updateBlogPost } = useContent();
    const [formData, setFormData] = useState({
        title: post?.title || '',
        author: post?.author || '',
        imageUrl: post?.imageUrl || '',
        content: post?.content || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (post) {
            updateBlogPost({ ...post, ...formData });
        } else {
            addBlogPost(formData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b">
                    <h3 className="text-xl font-bold text-brand-blue">{post ? t('admin.content.blog.editPost') : t('admin.content.blog.addPost')}</h3>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium">{t('admin.content.blog.table.title')}</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">{t('admin.content.blog.table.author')}</label>
                        <input type="text" name="author" value={formData.author} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t('admin.content.blog.imageUrl')}</label>
                        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t('admin.content.blog.content')}</label>
                        <textarea name="content" value={formData.content} onChange={handleChange} required rows={10} className="w-full mt-1 p-2 border rounded-md"/>
                    </div>
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700">{t('admin.actions.cancel')}</button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-brand-orange text-white rounded-md hover:bg-opacity-90">{t('admin.actions.savePost')}</button>
                </div>
            </div>
        </div>
    );
};


const SiteImagesTab = () => {
    const { t } = useLanguage();
    const { config, updateConfig } = useSiteConfig();
    const [tempConfig, setTempConfig] = useState(config);

    const handleSave = () => {
        updateConfig(tempConfig);
        alert(t('admin.actions.saved'));
    };

    // Fix: Spreading a tuple `[string, string, string]` creates a `string[]`.
    // The resulting array must be cast back to a tuple to satisfy the type of `homepageHeroUrls`.
    const handleHeroUrlChange = (index: number, value: string) => {
        const newUrls = [...tempConfig.homepageHeroUrls] as [string, string, string];
        newUrls[index] = value;
        setTempConfig({ ...tempConfig, homepageHeroUrls: newUrls });
    };
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">{t('admin.images.title')}</h2>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.images.mainLogoUrl')}</label>
                    <input type="text" value={tempConfig.logoUrl} onChange={e => setTempConfig({...tempConfig, logoUrl: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                     <h4 className="text-lg font-semibold text-slate-800 mb-2">{t('admin.images.heroCarouselTitle')}</h4>
                     <div className="space-y-2">
                        {tempConfig.homepageHeroUrls.map((url, index) => (
                             <div key={index}>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t(`admin.images.heroImage${index + 1}`)}</label>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={e => handleHeroUrlChange(index, e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                />
                            </div>
                        ))}
                     </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-2">{t('admin.images.universityLogos')}</h4>
                    <div className="space-y-2">
                        {tempConfig.universityLogos.map((uni, index) => (
                            <div key={index} className="flex items-center gap-4">
                               <span className="w-1/3 text-slate-600">{uni.name}</span>
                               <input type="text" value={uni.logo} onChange={e => {
                                   const newLogos = [...tempConfig.universityLogos];
                                   newLogos[index].logo = e.target.value;
                                   setTempConfig({...tempConfig, universityLogos: newLogos});
                               }} className="flex-1 px-3 py-2 border border-slate-300 rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-4 text-right">
                    <button onClick={handleSave} className="bg-brand-orange text-white px-6 py-2 rounded-md hover:bg-opacity-90">{t('admin.actions.saveChanges')}</button>
                </div>
            </div>
        </div>
    )
}

// Icons
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-11a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const PencilIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const PhotographIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


export default AdminDashboardPage;