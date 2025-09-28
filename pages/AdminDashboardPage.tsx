import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import { User, BlogPost, CoinPackage, RedeemCode, FAQItem } from '../types';

type Tab = 'students' | 'tutors' | 'images' | 'content' | 'codes' | 'community';

const AdminDashboardPage: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<Tab>('students');
    const { user, logout } = useAuth();

    const tabs: { id: Tab; label: string }[] = [
        { id: 'students', label: 'Students' },
        { id: 'tutors', label: 'Tutors' },
        { id: 'images', label: 'Site Images' },
        { id: 'content', label: 'Content' },
        { id: 'codes', label: 'Redeem Codes' },
        { id: 'community', label: 'Community' },
    ];

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                 <h1 className="text-xl font-bold text-brand-blue">Gradz Admin</h1>
                 <div>
                    <span className="me-4 text-slate-600">Welcome, {user?.name}</span>
                    <button onClick={logout} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Logout</button>
                 </div>
            </header>
            <div className="p-8">
                 <div className="mb-8 border-b border-slate-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {tabs.map(tab => (
                             <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${
                                    activeTab === tab.id
                                        ? 'border-brand-turquoise text-brand-turquoise'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === 'students' && <StudentsTab />}
                    {activeTab === 'tutors' && <TutorsTab />}
                    {activeTab === 'images' && <SiteImagesTab />}
                    {activeTab === 'content' && <ContentTab />}
                    {activeTab === 'codes' && <RedeemCodesTab />}
                    {activeTab === 'community' && <CommunityTab />}
                </div>
            </div>
        </div>
    );
};

// Tabs Implementation (simplified in one file for clarity)

const Table: React.FC<{ headers: string[], children: React.ReactNode }> = ({ headers, children }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-slate-50">
                <tr>{headers.map(h => <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-200">{children}</tbody>
        </table>
    </div>
);

const StudentsTab: React.FC = () => {
    const { users } = useAuth();
    const students = users.filter(u => u.role === 'student');
    return <Table headers={['Name', 'Email', 'University', 'Blue Coins', 'Yellow Coins']}>
        {students.map(s => <tr key={s.id}>
            <td className="px-6 py-4 whitespace-nowrap">{s.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{s.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{s.university}</td>
            <td className="px-6 py-4 whitespace-nowrap">{s.wallet.blue}</td>
            <td className="px-6 py-4 whitespace-nowrap">{s.wallet.yellow}</td>
        </tr>)}
    </Table>;
};

const TutorsTab: React.FC = () => {
    const { users } = useAuth();
    const tutors = users.filter(u => u.role === 'tutor');
    return <Table headers={['Name', 'Email', 'Major/Expertise']}>
        {tutors.map(t => <tr key={t.id}>
            <td className="px-6 py-4 whitespace-nowrap">{t.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{t.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{t.major}</td>
        </tr>)}
    </Table>;
};

const SiteImagesTab: React.FC = () => {
    const { config, setConfig } = useSiteConfig();
    const [localConfig, setLocalConfig] = useState(config);
    const [message, setMessage] = useState('');
    
    const handleSave = () => {
        const cleanedConfig = {
            ...localConfig,
            universityLogos: localConfig.universityLogos.filter(logo => logo.name.trim() !== '' && logo.logo.trim() !== '')
        };
        setConfig(cleanedConfig);
        setLocalConfig(cleanedConfig); 
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleHeroUrlChange = (index: number, value: string) => {
        const newUrls = [...localConfig.homepageHeroUrls] as [string, string, string];
        newUrls[index] = value;
        setLocalConfig(prev => ({ ...prev, homepageHeroUrls: newUrls }));
    };

    const handleUniversityLogoChange = (index: number, field: 'name' | 'logo', value: string) => {
        const newLogos = [...localConfig.universityLogos];
        newLogos[index] = { ...newLogos[index], [field]: value };
        setLocalConfig(prev => ({ ...prev, universityLogos: newLogos }));
    };

    const handleAddUniversityLogo = () => {
        setLocalConfig(prev => ({
            ...prev,
            universityLogos: [...prev.universityLogos, { name: '', logo: '' }]
        }));
    };

    const handleRemoveUniversityLogo = (index: number) => {
        const newLogos = localConfig.universityLogos.filter((_, i) => i !== index);
        setLocalConfig(prev => ({ ...prev, universityLogos: newLogos }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <div>
                <h3 className="text-lg font-medium mb-2">Main Logo URL</h3>
                <input 
                    value={localConfig.logoUrl} 
                    onChange={e => setLocalConfig(prev => ({ ...prev, logoUrl: e.target.value }))} 
                    className="w-full p-2 border rounded" 
                    placeholder="Site Logo URL" 
                />
            </div>
            
            <div>
                <h3 className="text-lg font-medium mb-2">Homepage Carousel URLs</h3>
                <div className="space-y-2">
                    <input value={localConfig.homepageHeroUrls[0]} onChange={e => handleHeroUrlChange(0, e.target.value)} className="w-full p-2 border rounded" placeholder="Hero Image URL 1" />
                    <input value={localConfig.homepageHeroUrls[1]} onChange={e => handleHeroUrlChange(1, e.target.value)} className="w-full p-2 border rounded" placeholder="Hero Image URL 2" />
                    <input value={localConfig.homepageHeroUrls[2]} onChange={e => handleHeroUrlChange(2, e.target.value)} className="w-full p-2 border rounded" placeholder="Hero Image URL 3" />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium mb-2">Coin Image URLs</h3>
                <div className="space-y-2">
                    <input value={localConfig.blueZCoinUrl} onChange={e => setLocalConfig(prev => ({...prev, blueZCoinUrl: e.target.value}))} className="w-full p-2 border rounded" placeholder="Blue Z-Coin Image URL" />
                    <input value={localConfig.yellowZCoinUrl} onChange={e => setLocalConfig(prev => ({...prev, yellowZCoinUrl: e.target.value}))} className="w-full p-2 border rounded" placeholder="Yellow Z-Coin Image URL" />
                </div>
            </div>
            
            <div>
                <h3 className="text-lg font-medium mb-2">University Logos</h3>
                <div className="space-y-2 border p-4 rounded-md bg-slate-50">
                    {localConfig.universityLogos.map((uni, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input 
                                value={uni.name} 
                                onChange={e => handleUniversityLogoChange(index, 'name', e.target.value)} 
                                className="w-1/3 p-2 border rounded" 
                                placeholder="University Name" 
                            />
                            <input 
                                value={uni.logo} 
                                onChange={e => handleUniversityLogoChange(index, 'logo', e.target.value)} 
                                className="flex-1 p-2 border rounded" 
                                placeholder="Logo URL" 
                            />
                            <button onClick={() => handleRemoveUniversityLogo(index)} className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm">
                                Remove
                            </button>
                        </div>
                    ))}
                     <button onClick={handleAddUniversityLogo} className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded text-sm font-medium">
                        Add University Logo
                    </button>
                </div>
            </div>

            <div className="border-t pt-4 flex items-center gap-4">
                <button onClick={handleSave} className="px-6 py-2 bg-brand-orange text-white rounded-md font-semibold hover:bg-opacity-90 transition">
                    Save All Image Settings
                </button>
                {message && <div className="text-green-600">{message}</div>}
            </div>
        </div>
    );
};

const ContentTab: React.FC = () => {
    const { blogPosts, coinPackages, updateCoinPackage, deleteBlogPost } = useContent();
    const { config, setConfig } = useSiteConfig();
    
    const [stats, setStats] = useState(config.siteStats);
    const [faqs, setFaqs] = useState<FAQItem[]>(config.faq || []);
    const [message, setMessage] = useState('');
    const [faqMessage, setFaqMessage] = useState('');

    const handleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStats(prev => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    };

    const handleSaveStats = () => {
        setConfig(prev => ({ ...prev, siteStats: stats }));
        setMessage('Statistics saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleFaqChange = (index: number, field: 'question' | 'answer', lang: 'en' | 'ar', value: string) => {
        const newFaqs = [...faqs];
        newFaqs[index] = {
            ...newFaqs[index],
            [field]: {
                ...newFaqs[index][field],
                [lang]: value
            }
        };
        setFaqs(newFaqs);
    };

    const handleAddFaq = () => {
        setFaqs([...faqs, { id: `faq_${Date.now()}`, question: { en: '', ar: '' }, answer: { en: '', ar: '' } }]);
    };

    const handleRemoveFaq = (index: number) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };
    
    const handleSaveFaqs = () => {
        const cleanedFaqs = faqs.filter(faq => 
            (faq.question.en.trim() !== '' || faq.question.ar.trim() !== '') &&
            (faq.answer.en.trim() !== '' || faq.answer.ar.trim() !== '')
        );
        setConfig(prev => ({ ...prev, faq: cleanedFaqs }));
        setFaqs(cleanedFaqs);
        setFaqMessage('FAQ saved successfully!');
        setTimeout(() => setFaqMessage(''), 3000);
    };

    return <div className="space-y-8">
        <div>
            <h3 className="text-lg font-medium mb-2">Blog Posts</h3>
            <Table headers={['Title', 'Author', 'Actions']}>
                {blogPosts.map(p => <tr key={p.id}>
                    <td className="px-6 py-4">{p.title}</td>
                    <td className="px-6 py-4">{p.author}</td>
                    <td className="px-6 py-4"><button onClick={() => deleteBlogPost(p.id)} className="text-red-500">Delete</button></td>
                </tr>)}
            </Table>
        </div>
         <div>
            <h3 className="text-lg font-medium mb-2">Coin Packages</h3>
             <div className="space-y-2">
                {coinPackages.map(p => <div key={p.id} className="flex gap-2 items-center">
                    <input value={p.name.en} onChange={e => updateCoinPackage({...p, name: {...p.name, en: e.target.value}})} className="p-2 border rounded w-1/3" />
                    <input value={p.amount} type="number" onChange={e => updateCoinPackage({...p, amount: +e.target.value})} className="p-2 border rounded w-1/6" />
                    <input value={p.bonus} type="number" onChange={e => updateCoinPackage({...p, bonus: +e.target.value})} className="p-2 border rounded w-1/6" />
                    <input value={p.price} type="number" onChange={e => updateCoinPackage({...p, price: +e.target.value})} className="p-2 border rounded w-1/6" />
                </div>)}
             </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">FAQ Management</h3>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={faq.id} className="p-4 border rounded-md bg-slate-50 space-y-2">
                         <div className="flex justify-end">
                            <button onClick={() => handleRemoveFaq(index)} className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-xs">
                                Remove
                            </button>
                        </div>
                        <label className="block text-sm font-medium text-slate-700">Question (EN)</label>
                        <input 
                            value={faq.question.en} 
                            onChange={e => handleFaqChange(index, 'question', 'en', e.target.value)} 
                            className="w-full p-2 border rounded" 
                        />
                        <label className="block text-sm font-medium text-slate-700">Question (AR)</label>
                        <input 
                            value={faq.question.ar} 
                            onChange={e => handleFaqChange(index, 'question', 'ar', e.target.value)} 
                            className="w-full p-2 border rounded" 
                            dir="rtl"
                        />
                        <label className="block text-sm font-medium text-slate-700">Answer (EN)</label>
                        <textarea 
                            value={faq.answer.en} 
                            onChange={e => handleFaqChange(index, 'answer', 'en', e.target.value)} 
                            rows={3}
                            className="w-full p-2 border rounded" 
                        />
                        <label className="block text-sm font-medium text-slate-700">Answer (AR)</label>
                         <textarea 
                            value={faq.answer.ar} 
                            onChange={e => handleFaqChange(index, 'answer', 'ar', e.target.value)} 
                            rows={3}
                            className="w-full p-2 border rounded"
                            dir="rtl" 
                        />
                    </div>
                ))}
                <button onClick={handleAddFaq} className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded text-sm font-medium">
                    Add FAQ Item
                </button>
            </div>
             <div className="border-t mt-6 pt-4 flex items-center gap-4">
                <button onClick={handleSaveFaqs} className="px-6 py-2 bg-brand-orange text-white rounded-md font-semibold hover:bg-opacity-90 transition">
                    Save FAQs
                </button>
                {faqMessage && <div className="text-green-600">{faqMessage}</div>}
            </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Site Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="students" className="block text-sm font-medium text-slate-700">Registered Students</label>
                    <input type="number" name="students" id="students" value={stats.students} onChange={handleStatChange} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div>
                    <label htmlFor="tutors" className="block text-sm font-medium text-slate-700">Tutors</label>
                    <input type="number" name="tutors" id="tutors" value={stats.tutors} onChange={handleStatChange} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div>
                    <label htmlFor="courses" className="block text-sm font-medium text-slate-700">Courses</label>
                    <input type="number" name="courses" id="courses" value={stats.courses} onChange={handleStatChange} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div>
                    <label htmlFor="visitors" className="block text-sm font-medium text-slate-700">Visitors</label>
                    <input type="number" name="visitors" id="visitors" value={stats.visitors} onChange={handleStatChange} className="mt-1 w-full p-2 border rounded" />
                </div>
            </div>
             <div className="border-t mt-6 pt-4 flex items-center gap-4">
                <button onClick={handleSaveStats} className="px-6 py-2 bg-brand-orange text-white rounded-md font-semibold hover:bg-opacity-90 transition">
                    Save Statistics
                </button>
                {message && <div className="text-green-600">{message}</div>}
            </div>
        </div>
    </div>
};

const RedeemCodesTab: React.FC = () => {
    const { coinPackages, redeemCodes, generateRedeemCode } = useContent();
    const [selectedPackage, setSelectedPackage] = useState(coinPackages[0]?.id || '');

    const handleGenerate = () => {
        if (selectedPackage) generateRedeemCode(selectedPackage);
    };

    return <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Generate Redeem Codes</h3>
        <div className="flex gap-4 mb-6">
            <select value={selectedPackage} onChange={e => setSelectedPackage(e.target.value)} className="p-2 border rounded bg-white w-1/2">
                {coinPackages.map(p => <option key={p.id} value={p.id}>{p.name.en} ({p.amount + p.bonus} coins)</option>)}
            </select>
            <button onClick={handleGenerate} className="px-4 py-2 bg-brand-orange text-white rounded">Generate Code</button>
        </div>
        <Table headers={['Code', 'Package', 'Status']}>
            {redeemCodes.map(c => <tr key={c.code}>
                <td className="px-6 py-4 font-mono">{c.code}</td>
                <td className="px-6 py-4">{coinPackages.find(p => p.id === c.packageId)?.name.en}</td>
                <td className="px-6 py-4">{c.used ? 'Used' : 'Unused'}</td>
            </tr>)}
        </Table>
    </div>
};

const CommunityTab: React.FC = () => {
    const { config, setConfig } = useSiteConfig();
    const { users } = useAuth();
    const { communityMessages } = useContent();
    const [banners, setBanners] = useState(config.communityBanners || []);
    const [message, setMessage] = useState('');
    const { t } = useLanguage();

    const handleBannerChange = (index: number, value: string) => {
        const newBanners = [...banners];
        newBanners[index].bannerUrl = value;
        setBanners(newBanners);
    };

    const handleSave = () => {
        setConfig(prev => ({ ...prev, communityBanners: banners }));
        setMessage('Banners saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const getStatsForUniversity = (uniName: string) => {
        const usersInCommunity = users.filter(u => u.university === uniName && u.role !== 'admin').length;
        const messagesInCommunity = communityMessages.filter(m => m.university === uniName).length;
        return { usersInCommunity, messagesInCommunity };
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h3 className="text-lg font-medium mb-2">{t('admin.community.title', {defaultValue: 'Community Management'})}</h3>
            <div className="space-y-4">
                {banners.map((banner, index) => {
                    const stats = getStatsForUniversity(banner.university);
                    return (
                        <div key={banner.university} className="p-4 border rounded-md bg-slate-50 space-y-2">
                            <h4 className="font-semibold text-brand-blue">{banner.university}</h4>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="flex-1 w-full">
                                    <label className="block text-sm font-medium text-slate-700">{t('admin.community.bannerUrl', {defaultValue: 'Banner URL'})}</label>
                                    <input 
                                        value={banner.bannerUrl} 
                                        onChange={e => handleBannerChange(index, e.target.value)} 
                                        className="w-full p-2 border rounded" 
                                    />
                                </div>
                                <div className="text-sm text-slate-600 bg-white p-2 rounded border w-full md:w-auto">
                                    <p><strong>{stats.usersInCommunity}</strong> {t('admin.community.users', {defaultValue: 'Users'})}</p>
                                    <p><strong>{stats.messagesInCommunity}</strong> {t('admin.community.messages', {defaultValue: 'Messages'})}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="border-t pt-4 flex items-center gap-4">
                <button onClick={handleSave} className="px-6 py-2 bg-brand-orange text-white rounded-md font-semibold hover:bg-opacity-90 transition">
                    {t('admin.community.saveBanners', {defaultValue: 'Save Banners'})}
                </button>
                {message && <div className="text-green-600">{message}</div>}
            </div>
        </div>
    );
};


export default AdminDashboardPage;