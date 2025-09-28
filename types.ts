export type UserRole = 'student' | 'tutor' | 'admin';

export interface Wallet {
    blue: number;
    yellow: number;
}

export interface Subscription {
    planId: 'single' | 'semester';
    expires: string; // ISO date string
}

export interface User {
    id: string;
    email: string;
    name: string;
    university: string;
    major: string;
    role: UserRole;
    wallet: Wallet;
    subscription?: Subscription;
    // Tutor-specific fields
    bio?: string;
    profileImageUrl?: string;
}

export interface Course {
    id: string;
    title: string;
    department: string;
    instructor: string;
    credits: number;
    description: string;
}

export interface TutorApplication {
    name: string;
    email: string;
    university: string;
    major: string;
    subjects: string;
}

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string; // e.g., "July 15, 2024"
    imageUrl: string;
}

export interface TranslatedString {
    en: string;
    ar: string;
}

export interface CoinPackage {
    id: string;
    name: TranslatedString;
    amount: number;
    bonus: number;
    price: number; // in JOD
}

export interface RedeemCode {
    code: string;
    packageId: string;
    used: boolean;
}

export interface SubscriptionPlan {
    id: 'single' | 'semester';
    name: TranslatedString;
    price: number; // in JOD
    features: {
        en: string[];
        ar: string[];
    };
}

export interface FAQItem {
    id: string;
    question: TranslatedString;
    answer: TranslatedString;
}

export interface CommunityChatMessage {
    id: string;
    university: string; // University's English name
    userId: string;
    userName: string;
    userRole: UserRole;
    timestamp: number;
    content: {
        text?: string;
        imageUrl?: string;
        fileUrl?: string; // data URL for mock
        fileName?: string;
    };
}

export interface CommunityBanner {
    university: string; // University's English name
    bannerUrl: string;
}

export interface SiteConfig {
    logoUrl: string;
    homepageHeroUrls: [string, string, string];
    universityLogos: { name: string; logo: string }[];
    blueZCoinUrl: string;
    yellowZCoinUrl: string;
    siteStats: {
        students: number;
        tutors: number;
        courses: number;
        visitors: number;
    };
    faq: FAQItem[];
    communityBanners: CommunityBanner[];
}

export interface VideoLesson {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
}

export interface TutorCourse {
    id: string;
    tutorId: string;
    title: string;
    university: string;
    major: string;
    lessons: VideoLesson[];
}

export interface Message {
    id: string;
    fromStudentId: string;
    fromStudentName: string;
    toTutorId: string;
    subject: string;
    body: string;
    timestamp: number;
}