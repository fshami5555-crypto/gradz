import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
    const { config } = useSiteConfig();
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex + 1) % config.homepageHeroUrls.length),
            5000 // 5 seconds
        );
        return () => {
            resetTimeout();
        };
    }, [currentIndex, config.homepageHeroUrls.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    const features = [
        { title: t('home.features.card1.title'), description: t('home.features.card1.description'), icon: '🤖' },
        { title: t('home.features.card2.title'), description: t('home.features.card2.description'), icon: '📚' },
        { title: t('home.features.card3.title'), description: t('home.features.card3.description'), icon: '💬' },
    ];

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="relative flex items-center justify-center h-screen text-center text-white px-4 bg-brand-blue">
                 {/* Carousel Background Images */}
                <div className="absolute inset-0 overflow-hidden">
                    {config.homepageHeroUrls.map((url, index) => (
                        <div
                            key={index}
                            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                            style={{
                                backgroundImage: `url(${url})`,
                                opacity: index === currentIndex ? 1 : 0,
                            }}
                        />
                    ))}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                        {t('home.hero.title')}
                    </h1>
                    <p className="mt-4 text-xl text-slate-200 max-w-3xl mx-auto">
                         {t('home.hero.subtitle')}
                    </p>
                    <Link
                        to="/login"
                        className="mt-10 inline-block px-12 py-4 text-lg font-bold text-white bg-brand-orange rounded-full shadow-2xl hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300"
                    >
                        {t('home.hero.cta')}
                    </Link>
                </div>

                 {/* Carousel Dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {config.homepageHeroUrls.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-3'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold text-brand-blue">{t('home.features.title')}</h2>
                        <p className="mt-4 text-lg text-slate-600">{t('home.features.subtitle')}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {features.map((feature, index) => (
                            <div key={index} className="p-8 bg-slate-50 rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100">
                                <div className="text-6xl mb-5 inline-block bg-brand-turquoise/10 p-4 rounded-full">{feature.icon}</div>
                                <h3 className="text-2xl font-semibold text-brand-blue mb-2">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* University Logos Section */}
            <section className="py-20 px-4 bg-slate-100/70">
                <div className="container mx-auto text-center">
                    <h3 className="text-2xl font-semibold text-slate-700 mb-10">{t('home.universities.title')}</h3>
                    <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-10">
                        {config.universityLogos.map(uni => (
                            <img key={uni.name} src={uni.logo} alt={uni.name} className="h-14 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                        ))}
                    </div>
                </div>
            </section>

             {/* Floating WhatsApp Button */}
            <a 
                href="https://wa.me/9627XXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                title={t('home.whatsapp.tooltip')}
                className="fixed bottom-6 right-6 z-50 h-16 w-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transform hover:scale-110 transition-all duration-300"
            >
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.919 6.18l-1.313 4.793 4.905-1.294zM10.511 12.09c-.272-.136-.935-.463-1.08-.513-.145-.05-.247-.078-.349.078-.102.157-.384.464-.47.547-.086.082-.172.093-.315.043-.143-.05-.609-.225-1.16-1.161-.43-.756-.695-1.13-.803-1.328-.107-.196-.011-.304.074-.403.078-.09.173-.216.26-.307.086-.09.115-.157.172-.265.058-.108.028-.201-.015-.285-.043-.084-.349-.84-.475-.963-.126-.12-.254-.126-.354-.126-.091 0-.196.008-.282.028-.088.02-.216.043-.306.463-.09.42-.354 1.02-.354 1.522s.361 1.769.411 1.891c.05.122.704 2.214 3.482 3.529.47.188.843.299 1.127.387.418.127.689.102.943-.057.291-.184 1.25-1.157 1.413-1.366.163-.208.163-.385.116-.463-.047-.078-.173-.136-.354-.244z"/></svg>
            </a>
        </div>
    );
};

export default HomePage;