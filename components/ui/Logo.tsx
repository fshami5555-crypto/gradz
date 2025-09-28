import React from 'react';
import { useSiteConfig } from '../../contexts/SiteConfigContext';

const Logo: React.FC<{ className?: string, isLight?: boolean }> = ({ className = '', isLight = false }) => {
  const { config } = useSiteConfig();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-12 w-12">
        <img src={config.logoUrl} alt="Gradz Logo" className="h-full w-full object-contain" />
      </div>
      <span className={`font-bold text-4xl ${isLight ? 'text-white' : 'text-brand-blue'}`}>
        gradz
      </span>
    </div>
  );
};

export default Logo;