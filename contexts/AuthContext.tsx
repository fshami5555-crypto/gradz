import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

// This list simulates a secure user database with passwords.
// It's kept internal to the AuthContext and not exported.
const MOCK_STUDENT_DB: (User & {password: string})[] = [
    { id: 'stu_1', email: 'student@gradz.com', password: 'password123', name: 'Alex Johnson', university: 'Princess Sumaya University for Technology (PSUT)', major: 'Computer Science', role: 'student', subscription: { planId: 'semester', endDate: '2024-09-01' } },
    { id: 'stu_2', email: 'jane.doe@gradz.com', password: 'password123', name: 'Jane Doe', university: 'University of Jordan', major: 'Biology', role: 'student' },
    { id: 'stu_3', email: 'peter.jones@gradz.com', password: 'password123', name: 'Peter Jones', university: 'Jordan University of Science and Technology (JUST)', major: 'Physics', role: 'student', subscription: { planId: 'single', endDate: '2024-07-15' } },
    { id: 'stu_4', email: 'susan.lee@gradz.com', password: 'password123', name: 'Susan Lee', university: 'Yarmouk University', major: 'English Language and Literature', role: 'student' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = sessionStorage.getItem('gradzUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from session storage", error);
            sessionStorage.removeItem('gradzUser');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string): Promise<User | null> => {
        const foundUser = MOCK_STUDENT_DB.find(u => u.email === email && u.password === password);
        if (foundUser) {
            const { password: _, ...userToStore } = foundUser;
            setUser(userToStore);
            sessionStorage.setItem('gradzUser', JSON.stringify(userToStore));
            return userToStore;
        }
        return null;
    };

    const adminLogin = async (email: string, password: string): Promise<User | null> => {
        if (email === 'admin@gradz.com' && password === 'Gradz123') {
            const adminUser: User = {
                id: 'admin_1',
                email: 'admin@gradz.com',
                name: 'Admin',
                university: 'N/A',
                major: 'Administration',
                role: 'admin'
            };
            setUser(adminUser);
            sessionStorage.setItem('gradzUser', JSON.stringify(adminUser));
            return adminUser;
        }
        return null;
    };

    const signup = async (name: string, email: string, university: string, major: string, password: string): Promise<User | null> => {
        if (MOCK_STUDENT_DB.some(u => u.email === email)) {
            throw new Error("User already exists");
        }
        const newUser: User & {password: string} = {
            id: `stu_${Date.now()}`,
            name,
            email,
            university,
            major,
            password,
            role: 'student'
        };
        MOCK_STUDENT_DB.push(newUser);
        const { password: _, ...userToStore } = newUser;
        setUser(userToStore);
        sessionStorage.setItem('gradzUser', JSON.stringify(userToStore));
        return userToStore;
    };
    
    const subscribe = async (planId: 'single' | 'semester'): Promise<void> => {
        if (!user) throw new Error("No user logged in");
        
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + (planId === 'semester' ? 4 : 1));

        const updatedUser: User = {
            ...user,
            subscription: {
                planId,
                endDate: endDate.toISOString().split('T')[0],
            },
        };
        
        setUser(updatedUser);
        sessionStorage.setItem('gradzUser', JSON.stringify(updatedUser));

        // Also update the mock DB
        const userIndex = MOCK_STUDENT_DB.findIndex(u => u.id === user.id);
        if(userIndex !== -1) {
            const dbUser = MOCK_STUDENT_DB[userIndex];
            MOCK_STUDENT_DB[userIndex] = { ...dbUser, ...updatedUser };
        }
    };


    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('gradzUser');
    };
    
    return (
        <AuthContext.Provider value={{ user, loading, login, adminLogin, logout, signup, subscribe }}>
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
