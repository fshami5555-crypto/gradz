// Fix: Define LabeledContent here as it was not exported from LanguageContext.
export interface LabeledContent {
  en: string;
  ar: string;
}

export interface Subscription {
  planId: 'single' | 'semester';
  endDate: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  university: string;
  major: string;
  role: 'student' | 'admin';
  subscription?: Subscription;
}

export interface Course {
  id: string;
  title: string;
  department: string;
  instructor: string;
  credits: number;
  description: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<User | null>;
    adminLogin: (email: string, password: string) => Promise<User | null>;
    logout: () => void;
    signup: (name: string, email: string, university: string, major: string, password: string) => Promise<User | null>;
    subscribe: (planId: 'single' | 'semester') => Promise<void>;
}

export interface SubscriptionPlan {
    id: 'single' | 'semester';
    name: LabeledContent;
    price: string;
    features: {
        en: string[];
        ar: string[];
    };
}

export interface BlogPost {
    id: string;
    title: string;
    author: string;
    createdAt: string;
    content: string;
    imageUrl: string;
}

export interface TutorApplication {
    id: string;
    name: string;
    email: string;
    university: string;
    major: string;
    year: string;
    subjects: string;
    motivation: string;
    submittedAt: string;
}


export interface ContentContextType {
  subscriptionPlans: SubscriptionPlan[];
  updateSubscriptionPlans: (plans: SubscriptionPlan[]) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (postId: string) => void;
  tutorApplications: TutorApplication[];
  addTutorApplication: (application: Omit<TutorApplication, 'id' | 'submittedAt'>) => Promise<void>;
}