import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, TutorApplication, Subscription } from '../types';
import { MOCK_STUDENTS } from '../constants';

interface AuthContextType {
    user: User | null;
    users: User[]; // Expose all users for admin panel
    loading: boolean;
    login: (email: string, pass: string) => Promise<User | null>;
    adminLogin: (email: string, pass: string) => Promise<User | null>;
    logout: () => void;
    signup: (name: string, email: string, university: string, major: string, pass: string) => Promise<User>;
    redeemCode: (code: string) => Promise<{ success: boolean; message: string; value: number }>;
    createTutorAccount: (application: TutorApplication, password: string) => Promise<User>;
    updateUserProfile: (updatedProfile: Partial<User>) => Promise<void>;
    subscribe: (planId: 'single' | 'semester') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_ADMIN: User = { id: 'admin_1', email: 'admin@gradz.com', name: 'Admin User', university: 'Gradz', major: 'Administration', role: 'admin', wallet: { blue: 999, yellow: 999 } };
const MOCK_TUTORS: User[] = [
    { id: 'tutor_1', email: 'tutor@gradz.com', name: 'Dr. Expert', university: 'Gradz', major: 'Computer Science', role: 'tutor', wallet: { blue: 100, yellow: 100 }, bio: '10 years of experience in CS.', profileImageUrl: 'https://i.imgur.com/8b23vQW.png' },
];

// Combine all users into one list for easier management
const ALL_USERS: User[] = [...MOCK_STUDENTS, ...MOCK_TUTORS, MOCK_ADMIN];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(ALL_USERS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = sessionStorage.getItem('gradzUser');
            if (storedUser) setUser(JSON.parse(storedUser));
        } catch (error) { console.error("Failed to parse user from session storage", error); }
        finally { setLoading(false); }
    }, []);
    
    const updateUserInStorage = (userToStore: User | null) => {
        if (userToStore) {
            sessionStorage.setItem('gradzUser', JSON.stringify(userToStore));
            // Update the master list as well
            setUsers(prevUsers => {
                const index = prevUsers.findIndex(u => u.id === userToStore.id);
                if (index > -1) {
                    const newUsers = [...prevUsers];
                    newUsers[index] = userToStore;
                    return newUsers;
                }
                // If user is new (e.g. signup), add them to the list
                return [...prevUsers, userToStore];
            });
        } else {
            sessionStorage.removeItem('gradzUser');
        }
    };

    const login = async (email: string, pass: string): Promise<User | null> => {
        // Mock login: any known non-admin email with 'password' or 'tutorpass' works
        const foundUser = users.find(u => u.email === email && u.role !== 'admin');
        const validPasswords = ['password', 'tutorpass'];
        if (foundUser && validPasswords.includes(pass)) {
            setUser(foundUser);
            updateUserInStorage(foundUser);
            return foundUser;
        }
        return null;
    };

    const adminLogin = async (email: string, pass: string): Promise<User | null> => {
        if (email === 'admin@gradz.com' && pass === 'Gradz123') {
            setUser(MOCK_ADMIN);
            updateUserInStorage(MOCK_ADMIN);
            return MOCK_ADMIN;
        }
        return null;
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('gradzUser');
        // Set the hash to the root route ('/') for the HashRouter.
        // This correctly navigates to the homepage within the iframe environment
        // of AI Studio, avoiding the "refused to connect" error that
        // window.location.href = '/' would cause.
        window.location.hash = '#/';
    };

    const signup = async (name: string, email: string, university: string, major: string, pass: string): Promise<User> => {
        if (users.some(u => u.email === email)) {
            throw new Error("User already exists");
        }
        const newUser: User = {
            id: `stu_${Date.now()}`,
            name,
            email,
            university,
            major,
            role: 'student',
            wallet: { blue: 10, yellow: 0 }, // Welcome bonus
        };
        setUsers(prev => [...prev, newUser]);
        setUser(newUser);
        updateUserInStorage(newUser);
        return newUser;
    };

    const redeemCode = async (code: string): Promise<{ success: boolean; message: string; value: number }> => {
        if (!user) throw new Error("User not logged in");
        
        // This is a simple mock logic from the content context
        if (code === 'YELLOW115') {
            const updatedUser = { ...user, wallet: { ...user.wallet, yellow: user.wallet.yellow + 115 } };
            setUser(updatedUser);
            updateUserInStorage(updatedUser);
            // In a real app, you would also mark the code as used in the backend/context
            return { success: true, message: 'Success!', value: 115 };
        }
        return { success: false, message: 'Code.invalid', value: 0 };
    };

    const createTutorAccount = async (application: TutorApplication, password: string): Promise<User> => {
        if (users.some(u => u.email === application.email)) {
            throw new Error("A user with this email already exists.");
        }
        const newTutor: User = {
            id: `tutor_${Date.now()}`,
            email: application.email,
            name: application.name,
            university: application.university,
            major: application.major,
            role: 'tutor',
            wallet: { blue: 0, yellow: 0 },
            bio: '',
            profileImageUrl: '',
        };
        setUsers(prev => [...prev, newTutor]);
        setUser(newTutor);
        updateUserInStorage(newTutor);
        return newTutor;
    };

    const updateUserProfile = async (updatedProfile: Partial<User>): Promise<void> => {
        if (!user) throw new Error("No user is logged in.");
        
        const updatedUser = { ...user, ...updatedProfile };
        setUser(updatedUser);
        updateUserInStorage(updatedUser);
    };

    const subscribe = async (planId: 'single' | 'semester'): Promise<void> => {
        if (!user) throw new Error("No user is logged in.");

        const newSubscription: Subscription = {
            planId,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Expires in 30 days (mock)
        };

        const updatedUser = { ...user, subscription: newSubscription };
        setUser(updatedUser);
        updateUserInStorage(updatedUser);
    };

    const authContextValue: AuthContextType = {
        user,
        users,
        loading,
        login,
        adminLogin,
        logout,
        signup,
        redeemCode,
        createTutorAccount,
        updateUserProfile,
        subscribe,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};