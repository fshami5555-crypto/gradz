import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useLanguage } from '../../contexts/LanguageContext';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode, label: string }> = ({ href, children, label }) => (
  <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-turquoise transition-colors">
    {children}
  </a>
);


const PublicFooter: React.FC = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-blue text-slate-300">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <Logo isLight={true} />
                        <p className="mt-4 text-sm text-slate-400">
                            {t('footer.tagline')}
                        </p>
                         <div className="mt-6 flex space-x-5">
                            <SocialIcon href="#" label="Facebook">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                             <SocialIcon href="#" label="Instagram">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.316 1.363.364 2.427.048 1.067.06 1.407.06 4.155 0 2.748-.012 3.088-.06 4.155-.048 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.316-2.427.364-1.067.048-1.407.06-4.155.06-2.748 0-3.088-.012-4.155-.06-1.064-.048-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.316-1.363-.364-2.427C2.013 15.315 2 14.975 2 12.227c0-2.748.012-3.088.06-4.155.048-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.316 2.427-.364C8.93 2.013 9.27 2 12.015 2h.3zm-1.04 2.28a.95.95 0 100 1.9.95.95 0 000-1.9zm-3.597 1.252a.95.95 0 100 1.9.95.95 0 000-1.9zm7.193 1.252a.95.95 0 100 1.9.95.95 0 000-1.9zm-3.6 3.6a3.937 3.937 0 100 7.874 3.937 3.937 0 000-7.874zM12 15.11a3.11 3.11 0 110-6.22 3.11 3.11 0 010 6.22z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#" label="Twitter">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </SocialIcon>
                             <SocialIcon href="#" label="LinkedIn">
                               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">{t('footer.links.title')}</h4>
                        <ul className="space-y-2">
                             <li><Link to="/subscriptions" className="hover:text-white transition-colors">{t('publicHeader.pricing')}</Link></li>
                            <li><Link to="/blog" className="hover:text-white transition-colors">{t('footer.links.blog')}</Link></li>
                            <li><Link to="/become-tutor" className="font-semibold text-brand-turquoise hover:text-white transition-colors">{t('footer.links.careers')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">{t('footer.legal.title')}</h4>
                        <ul className="space-y-2">
                            <li><Link to="/privacy" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">{t('footer.legal.terms')}</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white mb-4">{t('footer.contact.title')}</h4>
                        <ul className="space-y-2">
                           <li><a href="mailto:info@gradz.site" className="hover:text-white transition-colors">info@gradz.site</a></li>
                           <li><a href="https://wa.me/9627XXXXXXXX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t('footer.contact.whatsapp')}</a></li>
                           <li><Link to="/admin" className="text-sm text-slate-400 hover:text-white transition-colors">{t('publicFooter.adminAccess')}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-brand-blue-light pt-8 text-center text-sm text-slate-400">
                    &copy; {currentYear} Gradz. {t('footer.copyright')}.
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;