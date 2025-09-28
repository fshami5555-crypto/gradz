import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { CommunityChatMessage } from '../types';

const ChatMessage: React.FC<{ msg: CommunityChatMessage, currentUserId: string }> = ({ msg, currentUserId }) => {
    const isCurrentUser = msg.userId === currentUserId;
    const alignment = isCurrentUser ? 'justify-end' : 'justify-start';
    const bubbleColor = isCurrentUser ? 'bg-brand-turquoise text-white' : 'bg-slate-200 text-slate-800';
    const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`flex items-end gap-2 ${alignment}`}>
            {!isCurrentUser && (
                 <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center text-sm font-bold flex-shrink-0" title={msg.userName}>
                    {msg.userName.charAt(0)}
                </div>
            )}
            <div className={`p-3 rounded-lg max-w-lg ${bubbleColor}`}>
                {!isCurrentUser && <p className="text-xs font-bold mb-1 opacity-70">{msg.userName} ({msg.userRole})</p>}
                {msg.content.text && <p className="whitespace-pre-wrap break-words">{msg.content.text}</p>}
                {msg.content.imageUrl && <img src={msg.content.imageUrl} alt="shared content" className="rounded-md max-w-xs mt-2" />}
                {msg.content.fileUrl && (
                    <a href={msg.content.fileUrl} download={msg.content.fileName} className="flex items-center gap-2 mt-2 bg-white/20 p-2 rounded-md hover:bg-white/40">
                        <FileIcon />
                        <span className="truncate max-w-xs">{msg.content.fileName}</span>
                    </a>
                )}
                 <p className={`text-xs mt-1 opacity-60 ${isCurrentUser ? 'text-right' : 'text-left'}`}>{time}</p>
            </div>
             {isCurrentUser && (
                <div className="h-8 w-8 rounded-full bg-brand-turquoise flex items-center justify-center text-white text-sm font-bold flex-shrink-0" title={msg.userName}>
                    {msg.userName.charAt(0)}
                </div>
             )}
        </div>
    );
};

const CommunityChatPage: React.FC = () => {
    const { user } = useAuth();
    const { config } = useSiteConfig();
    const { communityMessages, addCommunityMessage } = useContent();
    const { t } = useLanguage();
    const chatEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const [message, setMessage] = useState('');

    const userUniversity = user?.university || '';
    
    const bannerUrl = useMemo(() => {
        return config.communityBanners.find(b => b.university === userUniversity)?.bannerUrl || '';
    }, [config.communityBanners, userUniversity]);
    
    const messagesForCommunity = useMemo(() => {
        return communityMessages
            .filter(m => m.university === userUniversity)
            .sort((a, b) => a.timestamp - b.timestamp);
    }, [communityMessages, userUniversity]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesForCommunity]);

    const handleSendMessage = () => {
        if (!message.trim() || !user) return;
        const newMessage: CommunityChatMessage = {
            id: `msg_${Date.now()}`,
            university: user.university,
            userId: user.id,
            userName: user.name,
            userRole: user.role,
            timestamp: Date.now(),
            content: { text: message }
        };
        addCommunityMessage(newMessage);
        setMessage('');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'image' | 'file') => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const fileUrl = event.target?.result as string;
            const newMessage: CommunityChatMessage = {
                id: `msg_${Date.now()}`,
                university: user.university,
                userId: user.id,
                userName: user.name,
                userRole: user.role,
                timestamp: Date.now(),
                content: {
                    ...(fileType === 'image' ? { imageUrl: fileUrl } : { fileUrl, fileName: file.name })
                }
            };
            addCommunityMessage(newMessage);
        };
        reader.readAsDataURL(file);
        e.target.value = ''; // Reset file input
    };

    return (
        <div className="flex flex-col h-[calc(100vh-112px)] bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48 bg-slate-200 flex-shrink-0">
                {bannerUrl && <img src={bannerUrl} alt={`${userUniversity} Banner`} className="w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white text-center p-4">
                        {t('communityChat.title', { university: userUniversity })}
                    </h2>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4">
                {messagesForCommunity.length === 0 ? (
                    <p className="text-center text-slate-400 h-full flex items-center justify-center">{t('communityChat.noMessages')}</p>
                ) : (
                    messagesForCommunity.map(msg => (
                        <ChatMessage key={msg.id} msg={msg} currentUserId={user?.id || ''} />
                    ))
                )}
                 <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-2">
                    <input type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} placeholder={t('communityChat.placeholder')} className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-turquoise" />
                    
                    <input type="file" ref={imageInputRef} onChange={e => handleFileUpload(e, 'image')} accept="image/*" className="hidden" />
                    <button onClick={() => imageInputRef.current?.click()} title={t('communityChat.sendImage')} className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"><ImageIcon/></button>
                    
                    <input type="file" ref={fileInputRef} onChange={e => handleFileUpload(e, 'file')} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} title={t('communityChat.sendFile')} className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"><PaperclipIcon/></button>

                    <button onClick={handleSendMessage} disabled={!message.trim()} className="bg-brand-orange text-white px-4 h-10 w-10 flex items-center justify-center rounded-full font-semibold hover:bg-opacity-90 disabled:bg-opacity-50 flex-shrink-0"><SendIcon/></button>
                </div>
            </div>
        </div>
    );
};

// SVG Icons
const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const PaperclipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;


export default CommunityChatPage;
