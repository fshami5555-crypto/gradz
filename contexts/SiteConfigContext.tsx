import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface UniversityLogo {
  name: string;
  logo: string;
}

interface SiteConfig {
  logoUrl: string;
  homepageHeroUrls: [string, string, string];
  universityLogos: UniversityLogo[];
}

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => void;
}

const DEFAULT_CONFIG: SiteConfig = {
  logoUrl: 'https://i.imgur.com/xT6T2fF.png',
  homepageHeroUrls: [
    'https://i.imgur.com/8aP2a7A.jpeg', // A student studying at a desk
    'https://i.imgur.com/sS4bfL2.jpeg', // Modern classroom/tech setting
    'https://i.imgur.com/r4L9s7O.png', // Group of students collaborating
  ],
  universityLogos: [
    { name: 'University of Jordan', logo: 'https://i.imgur.com/2s422fS.png' },
    { name: 'Jordan University of Science and Technology', logo: 'https://i.imgur.com/4a2oG0a.png' },
    { name: 'Hashemite University', logo: 'https://i.imgur.com/2U5t41q.png' },
    { name: 'Yarmouk University', logo: 'https://i.imgur.com/TBD3m20.png' },
    { name: 'Princess Sumaya University for Technology', logo: 'https://i.imgur.com/nQCw25r.png' },
    { name: 'Al-Balqa\' Applied University', logo: 'https://i.imgur.com/L12sE4V.png' },
  ],
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    try {
      const storedConfig = sessionStorage.getItem('gradzSiteConfig');
      if (storedConfig) {
        setConfig(JSON.parse(storedConfig));
      }
    } catch (error) {
      console.error("Failed to parse site config from session storage", error);
      sessionStorage.removeItem('gradzSiteConfig');
    }
  }, []);

  const updateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    sessionStorage.setItem('gradzSiteConfig', JSON.stringify(newConfig));
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = (): SiteConfigContextType => {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};