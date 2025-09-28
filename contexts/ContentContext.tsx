import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { SubscriptionPlan, BlogPost, ContentContextType, TutorApplication } from '../types';

const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
        id: 'single',
        name: { en: 'Single Course', ar: 'مساق واحد' },
        price: '10.00',
        features: {
            en: ['Access to one course of your choice', 'AI Study Buddy for that course', 'Downloadable resources', 'Email support'],
            ar: ['الوصول إلى مساق واحد من اختيارك', 'مساعد الدراسة الذكي للمساق', 'مصادر قابلة للتنزيل', 'دعم عبر البريد الإلكتروني']
        }
    },
    {
        id: 'semester',
        name: { en: 'Full Semester', ar: 'فصل دراسي كامل' },
        price: '20.00',
        features: {
            en: ['Access to up to 3 courses', 'Unlimited AI Study Buddy usage', 'Priority email & chat support', 'Early access to new features'],
            ar: ['الوصول إلى 3 مساقات', 'استخدام غير محدود لمساعد الدراسة الذكي', 'دعم ذو أولوية عبر البريد والدردشة', 'وصول مبكر للميزات الجديدة']
        }
    }
];

const MOCK_BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'Mastering Final Exams: A Survival Guide',
        author: 'Dr. Jane Doe',
        createdAt: '2024-05-15',
        imageUrl: 'https://i.imgur.com/8aP2a7A.jpeg',
        content: `Finals week is often the most stressful time for any university student. But with the right strategy, you can navigate it successfully. Here are some key tips:\n\n1. **Start Early**: Don't wait until the last minute. Begin reviewing your notes a few weeks in advance. Spaced repetition is far more effective than cramming.\n\n2. **Organize Your Study Material**: Go through your notes, slides, and textbooks. Create concise summaries or flashcards for each topic. This helps in quick revisions.\n\n3. **Practice Past Papers**: This is one of the most effective ways to prepare. It helps you understand the exam pattern, question types, and manage your time effectively.\n\n4. **Stay Healthy**: Don't neglect your health. Get enough sleep (at least 7-8 hours), eat nutritious meals, and stay hydrated. A healthy body supports a sharp mind.\n\n5. **Take Breaks**: Studying for long hours without breaks can be counterproductive. Use techniques like the Pomodoro Technique (25 minutes of study followed by a 5-minute break) to stay focused and avoid burnout.\n\nRemember, the goal is to study smart, not just hard. Good luck!`
    },
    {
        id: '2',
        title: 'The Power of AI in Modern Education',
        author: 'Alex Johnson',
        createdAt: '2024-05-20',
        imageUrl: 'https://i.imgur.com/sS4bfL2.jpeg',
        content: 'Artificial Intelligence is no longer a concept from science fiction; it\'s a transformative force in our daily lives, and education is no exception. AI-powered tools, like the Gradz Study Buddy, are revolutionizing how students learn.\n\nPersonalized learning paths can be created based on a student\'s performance, helping them focus on areas where they need the most improvement. Instant feedback on assignments and practice questions allows for a more dynamic and effective learning process. AI can also automate tedious tasks, freeing up educators to focus on more meaningful interactions with students.\n\nFurthermore, AI tutors can provide 24/7 support, answering questions and explaining complex topics whenever a student needs help. This accessibility is a game-changer for learners with diverse schedules and needs. As technology continues to evolve, the integration of AI in education promises a more engaging, efficient, and personalized learning experience for everyone.'
    },
];

const MOCK_TUTOR_APPLICATIONS: TutorApplication[] = [
    {
        id: 'app_1',
        name: 'John Smith',
        email: 'john.s@email.com',
        university: 'University of Jordan',
        major: 'Computer Science',
        year: 'Third Year',
        subjects: 'Data Structures, Algorithms, Web Development',
        motivation: 'I have a passion for teaching and want to help fellow students excel in complex CS topics.',
        submittedAt: '2024-05-28'
    }
];


const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>(MOCK_SUBSCRIPTION_PLANS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS);
  const [tutorApplications, setTutorApplications] = useState<TutorApplication[]>(MOCK_TUTOR_APPLICATIONS);

  const safelyParseJSON = (item: string | null, defaultValue: any) => {
    try {
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  useEffect(() => {
    setSubscriptionPlans(safelyParseJSON(sessionStorage.getItem('gradzPlans'), MOCK_SUBSCRIPTION_PLANS));
    setBlogPosts(safelyParseJSON(sessionStorage.getItem('gradzPosts'), MOCK_BLOG_POSTS));
    setTutorApplications(safelyParseJSON(sessionStorage.getItem('gradzTutorApps'), MOCK_TUTOR_APPLICATIONS));
  }, []);

  const updateItemInStorage = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };
  
  const updateSubscriptionPlans = (plans: SubscriptionPlan[]) => {
    setSubscriptionPlans(plans);
    updateItemInStorage('gradzPlans', plans);
  };
  
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt'>) => {
    const newPost: BlogPost = {
        ...post,
        id: `post_${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
    };
    const updatedPosts = [...blogPosts, newPost];
    setBlogPosts(updatedPosts);
    updateItemInStorage('gradzPosts', updatedPosts);
  };
  
  const updateBlogPost = (postToUpdate: BlogPost) => {
    const updatedPosts = blogPosts.map(p => p.id === postToUpdate.id ? postToUpdate : p);
    setBlogPosts(updatedPosts);
    updateItemInStorage('gradzPosts', updatedPosts);
  };

  const deleteBlogPost = (postId: string) => {
    const updatedPosts = blogPosts.filter(p => p.id !== postId);
    setBlogPosts(updatedPosts);
    updateItemInStorage('gradzPosts', updatedPosts);
  };
  
  const addTutorApplication = async (application: Omit<TutorApplication, 'id' | 'submittedAt'>): Promise<void> => {
    const newApplication: TutorApplication = {
        ...application,
        id: `app_${Date.now()}`,
        submittedAt: new Date().toISOString().split('T')[0],
    };
    const updatedApplications = [...tutorApplications, newApplication];
    setTutorApplications(updatedApplications);
    updateItemInStorage('gradzTutorApps', updatedApplications);
  };

  return (
    <ContentContext.Provider value={{ 
        subscriptionPlans, 
        updateSubscriptionPlans,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        tutorApplications,
        addTutorApplication
    }}>
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