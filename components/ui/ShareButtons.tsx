import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ShareButtons: React.FC<{ title: string; url: string }> = ({ title, url }) => {
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();

    const platforms = [
        { name: 'Twitter', icon: <TwitterIcon />, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
        { name: 'Facebook', icon: <FacebookIcon />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
        { name: 'LinkedIn', icon: <LinkedInIcon />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600 me-2">{t('share.share')}:</span>
            {platforms.map(p => (
                 <a 
                    key={p.name} 
                    href={p.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title={`Share on ${p.name}`}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-brand-blue transition-colors"
                >
                    {p.icon}
                </a>
            ))}
            <button
                onClick={handleCopy}
                title="Copy link"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-brand-blue transition-colors"
            >
                {copied ? <CheckIcon /> : <LinkIcon />}
            </button>
        </div>
    );
};

// SVG Icons
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.353.23-2.064.077.621 1.954 2.422 3.376 4.559 3.416-1.771 1.39-4.012 2.16-6.444 2.16-.42 0-.834-.025-1.242-.074 2.278 1.463 5.004 2.317 7.91 2.317 9.492 0 14.686-7.864 14.494-14.774.996-.718 1.854-1.622 2.544-2.646z"/></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-4.481 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

export default ShareButtons;