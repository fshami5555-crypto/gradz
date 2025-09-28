import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSiteConfig } from '../../contexts/SiteConfigContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Header: React.FC = () => {
    const { user } = useAuth();
    const { config } = useSiteConfig();

    return (
        <header className="flex items-center justify-end h-16 bg-white shadow-sm px-6 gap-4">
            <div className="flex items-center gap-4">
                 {/* Blue Coins */}
                <div className="flex items-center gap-2 bg-blue-100/50 border border-blue-200 px-3 py-1 rounded-full">
                    <img src={config.blueZCoinUrl} alt="Blue Z-Coin" className="h-6 w-6" />
                    <span className="font-bold text-blue-600">{user?.wallet.blue || 0}</span>
                </div>
                 {/* Yellow Coins */}
                 <div className="flex items-center gap-2 bg-yellow-100/50 border border-yellow-200 px-3 py-1 rounded-full">
                    <img src={config.yellowZCoinUrl} alt="Yellow Z-Coin" className="h-6 w-6" />
                    <span className="font-bold text-yellow-600">{user?.wallet.yellow || 0}</span>
                     <Link to="/buy-coins" className="ms-1 h-5 w-5 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors" title="Buy More Coins">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    </Link>
                </div>
            </div>
             <LanguageSwitcher />
            <div className="flex items-center gap-2">
                 <div className="text-right">
                    <p className="font-semibold text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.major}</p>
                </div>
               <div className="h-10 w-10 rounded-full bg-brand-turquoise flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0)}
                </div>
            </div>
        </header>
    );
};

export default Header;
