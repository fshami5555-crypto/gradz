import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const TutorProfilePage: React.FC = () => {
    const { user, updateUserProfile } = useAuth();
    const { t } = useLanguage();
    
    const [bio, setBio] = useState(user?.bio || '');
    const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || '');
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            await updateUserProfile({ bio, profileImageUrl });
            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div>
            <div className="p-8 bg-white rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-bold text-brand-blue">{t('tutor.profile.title')}</h2>
                <p className="mt-1 text-slate-500">{t('tutor.profile.subtitle')}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
                 <div className="flex items-center gap-6">
                    <img 
                        src={profileImageUrl || 'https://i.imgur.com/8b23vQW.png'} 
                        alt={user?.name}
                        className="h-24 w-24 rounded-full object-cover border-4 border-brand-turquoise"
                    />
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800">{user?.name}</h3>
                        <p className="text-slate-500">{user?.email}</p>
                    </div>
                </div>

                <div className="mt-8">
                    {message && <p className="text-green-600 bg-green-100 p-2 rounded-md mb-4">{message}</p>}
                    {!isEditing ? (
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Biography</h4>
                            <p className="text-slate-600 whitespace-pre-wrap">{bio || 'No biography set.'}</p>
                            <button onClick={() => setIsEditing(true)} className="mt-4 px-6 py-2 bg-brand-turquoise text-white rounded-lg">
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="profileImageUrl" className="block text-sm font-medium text-slate-700">Profile Image URL</label>
                                    <input type="text" id="profileImageUrl" value={profileImageUrl} onChange={e => setProfileImageUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                                </div>
                                 <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-slate-700">Biography</label>
                                    <textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} rows={5} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm"></textarea>
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="px-6 py-2 bg-brand-orange text-white rounded-lg">Save Changes</button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg">Cancel</button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorProfilePage;