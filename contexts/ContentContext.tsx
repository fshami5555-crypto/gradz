import React, { createContext, useState, useContext, ReactNode } from 'react';
import { BlogPost, CoinPackage, RedeemCode, SubscriptionPlan, TutorCourse, VideoLesson, Message, CommunityChatMessage } from '../types';

// MOCK DATA
const MOCK_BLOG_POSTS: BlogPost[] = [
    { id: '1', title: '5 Study Tips for Final Exams', content: 'Here are some tips to help you ace your finals. Tip 1: ...', author: 'Dr. Jane Doe', createdAt: 'July 15, 2024', imageUrl: 'https://i.imgur.com/8aP2a7A.jpeg' },
    { id: '2', title: 'Choosing the Right Major', content: 'Deciding on a major is a big step. This guide can help you make an informed decision that aligns with your passions and career goals.', author: 'Admin', createdAt: 'July 10, 2024', imageUrl: 'https://i.imgur.com/k2psb5V.jpeg' },
    { id: '3', title: 'A Guide to Effective Note-Taking', content: 'Learn different methods of note-taking, such as the Cornell Method, to improve retention and understanding of lecture materials.', author: 'Dr. Expert', createdAt: 'July 5, 2024', imageUrl: 'https://i.imgur.com/h52tA3s.jpeg' },
];

const MOCK_COIN_PACKAGES: CoinPackage[] = [
    { id: 'pkg1', name: { en: 'Starter Pack', ar: 'الحزمة الأولية' }, amount: 50, bonus: 5, price: 10 },
    { id: 'pkg2', name: { en: 'Scholar Pack', ar: 'حزمة الباحث' }, amount: 100, bonus: 15, price: 18 },
    { id: 'pkg3', name: { en: 'Genius Pack', ar: 'حزمة العبقري' }, amount: 200, bonus: 40, price: 35 },
];

const MOCK_REDEEM_CODES: RedeemCode[] = [
    { code: 'YELLOW115', packageId: 'pkg2', used: false },
    { code: 'WELCOME50', packageId: 'pkg1', used: true },
];

const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    { id: 'single', name: { en: 'Single Course', ar: 'مساق واحد' }, price: 25, features: { en: ['Access to one full course', 'AI study assistant', 'Direct messaging with tutor'], ar: ['الوصول إلى مساق واحد كامل', 'مساعد دراسي بالذكاء الاصطناعي', 'مراسلة مباشرة مع المدرس'] } },
    { id: 'semester', name: { en: 'Full Semester', ar: 'فصل دراسي كامل' }, price: 80, features: { en: ['Unlimited access to all courses', 'Priority AI support', 'Group study sessions', 'Downloadable resources'], ar: ['وصول غير محدود لجميع المساقات', 'دعم ذكاء اصطناعي بأولوية', 'جلسات دراسة جماعية', 'موارد قابلة للتنزيل'] } }
];

const MOCK_TUTOR_COURSES: TutorCourse[] = [
    { id: 'tc_1', tutorId: 'tutor_1', title: 'Advanced Web Development', university: 'Princess Sumaya University for Technology (PSUT)', major: 'Computer Science', lessons: [{id: 'l1', title: 'React Hooks Deep Dive', description: 'An in-depth look at React Hooks.', videoUrl: 'https://www.youtube.com/watch?v=some_video_id'}] }
];

const MOCK_MESSAGES: Message[] = [
    { id: 'msg_1', fromStudentId: 'stu_1', fromStudentName: 'Alex Johnson', toTutorId: 'tutor_1', subject: 'Question about React Hooks', body: 'Hi Dr. Expert, I had a question about the useEffect hook from the last lesson. Could you explain the dependency array in more detail?', timestamp: Date.now() }
];

const MOCK_COMMUNITY_MESSAGES: CommunityChatMessage[] = [
    { id: 'ccm_1', university: 'Princess Sumaya University for Technology (PSUT)', userId: 'stu_1', userName: 'Alex Johnson', userRole: 'student', timestamp: Date.now() - 200000, content: { text: 'Hey everyone! Has anyone started the assignment for CS340?' } },
    { id: 'ccm_2', university: 'Princess Sumaya University for Technology (PSUT)', userId: 'tutor_1', userName: 'Dr. Expert', userRole: 'tutor', timestamp: Date.now() - 100000, content: { text: 'Hi Alex, make sure to check the lecture notes from last week. The key concepts are covered there.' } },
    { id: 'ccm_3', university: 'University of Jordan', userId: 'stu_2', userName: 'Jane Doe', userRole: 'student', timestamp: Date.now() - 50000, content: { text: 'Hello! Does anyone have notes for BIO110?' } },
];


interface ContentContextType {
    blogPosts: BlogPost[];
    coinPackages: CoinPackage[];
    redeemCodes: RedeemCode[];
    subscriptionPlans: SubscriptionPlan[];
    tutorCourses: TutorCourse[];
    messages: Message[];
    communityMessages: CommunityChatMessage[];
    deleteBlogPost: (id: string) => void;
    updateCoinPackage: (pkg: CoinPackage) => void;
    generateRedeemCode: (packageId: string) => void;
    createTutorCourse: (courseData: Omit<TutorCourse, 'id' | 'lessons'>) => void;
    addVideoToCourse: (courseId: string, lessonData: Omit<VideoLesson, 'id'>) => void;
    addCommunityMessage: (message: CommunityChatMessage) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS);
    const [coinPackages, setCoinPackages] = useState<CoinPackage[]>(MOCK_COIN_PACKAGES);
    const [redeemCodes, setRedeemCodes] = useState<RedeemCode[]>(MOCK_REDEEM_CODES);
    const [subscriptionPlans] = useState<SubscriptionPlan[]>(MOCK_SUBSCRIPTION_PLANS);
    const [tutorCourses, setTutorCourses] = useState<TutorCourse[]>(MOCK_TUTOR_COURSES);
    const [messages] = useState<Message[]>(MOCK_MESSAGES);
    const [communityMessages, setCommunityMessages] = useState<CommunityChatMessage[]>(MOCK_COMMUNITY_MESSAGES);

    const deleteBlogPost = (id: string) => {
        setBlogPosts(prev => prev.filter(p => p.id !== id));
    };

    const updateCoinPackage = (pkg: CoinPackage) => {
        setCoinPackages(prev => prev.map(p => p.id === pkg.id ? pkg : p));
    };

    const generateRedeemCode = (packageId: string) => {
        const code = `CODE${Date.now().toString().slice(-6)}`;
        const newCode: RedeemCode = { code, packageId, used: false };
        setRedeemCodes(prev => [newCode, ...prev]);
    };
    
    const createTutorCourse = (courseData: Omit<TutorCourse, 'id' | 'lessons'>) => {
        const newCourse: TutorCourse = {
            id: `tc_${Date.now()}`,
            ...courseData,
            lessons: [],
        };
        setTutorCourses(prev => [...prev, newCourse]);
    };

    const addVideoToCourse = (courseId: string, lessonData: Omit<VideoLesson, 'id'>) => {
        const newLesson: VideoLesson = {
            id: `l_${Date.now()}`,
            ...lessonData,
        };
        setTutorCourses(prev => prev.map(course => 
            course.id === courseId 
                ? { ...course, lessons: [...course.lessons, newLesson] }
                : course
        ));
    };

    const addCommunityMessage = (message: CommunityChatMessage) => {
        setCommunityMessages(prev => [...prev, message]);
    };

    const value = {
        blogPosts,
        coinPackages,
        redeemCodes,
        subscriptionPlans,
        tutorCourses,
        messages,
        communityMessages,
        deleteBlogPost,
        updateCoinPackage,
        generateRedeemCode,
        createTutorCourse,
        addVideoToCourse,
        addCommunityMessage,
    };

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = (): ContentContextType => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};