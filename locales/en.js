export default {
    login: {
        welcomeBack: 'Welcome Back!',
        invalidCredentials: 'Invalid email or password.',
        loginFailed: 'Login failed. Please try again.',
        emailPlaceholder: 'Email Address',
        passwordPlaceholder: 'Password',
        loginButton: 'Login',
        newUserPrompt: "Don't have an account?",
        createAccountLink: 'Create one',
        loginLink: 'Login here'
    },
    signup: {
        title: 'Create Your Account',
        userExistsError: 'An account with this email already exists.',
        signupFailed: 'Signup failed. Please try again.',
        fullNamePlaceholder: 'Full Name',
        selectUniversityPlaceholder: 'Select your university',
        selectMajorPlaceholder: 'Select your major',
        signupButton: 'Sign Up',
        alreadyHaveAccountPrompt: 'Already have an account?',
    },
    adminLogin: {
        title: 'Admin Access Portal',
        signIn: 'Sign In to Admin Panel',
        invalidCredentials: 'Invalid admin credentials.',
        loginFailed: 'Admin login failed.',
        emailPlaceholder: 'Admin Email',
        accessDashboardButton: 'Access Dashboard',
        notAdminPrompt: "Not an admin?",
        returnHomeLink: 'Return to home'
    },
    home: {
        features: {
            title: 'Your All-in-One University Companion',
            subtitle: 'Gradz is designed to help you excel in your studies, connect with tutors, and stay organized.',
            card1: { title: 'AI Study Buddy', description: 'Ask questions, get explanations, and practice concepts with our intelligent AI assistant.' },
            card2: { title: 'Expert Tutors', description: 'Access recorded sessions from top tutors in your specific university courses.' },
            card3: { title: 'Community Chat', description: 'Connect with peers from your major and university to collaborate and learn together.' },
        },
        stats: {
            students: 'Registered Students',
            tutors: 'Expert Tutors',
            courses: 'Courses Available',
            visitors: 'Happy Visitors',
        },
        faq: {
            title: 'Frequently Asked Questions',
            subtitle: "Have questions? We have answers. If you can't find what you are looking for, feel free to contact us."
        },
        hero: {
            title: 'Unlock Your Academic Potential',
            subtitle: 'Your personal AI-powered study partner for Jordanian university students.',
            cta: 'Get Started Now'
        },
        universities: {
            title: 'Trusted by students across Jordan'
        },
        whatsapp: {
            tooltip: 'Contact us on WhatsApp'
        }
    },
    publicHeader: {
        blog: 'Blog',
        pricing: 'Pricing',
        becomeTutor: 'Become a Tutor',
        goToDashboard: 'Dashboard',
        loginSignup: 'Login / Sign Up'
    },
    footer: {
        tagline: 'The smart way to study.',
        links: { title: 'Quick Links', subscriptions: 'Subscriptions', blog: 'Blog', careers: 'Become a Tutor' },
        legal: { title: 'Legal', privacy: 'Privacy Policy', terms: 'Terms of Service' },
        contact: { title: 'Contact Us', whatsapp: 'WhatsApp Us' },
        copyright: 'All rights reserved'
    },
    publicFooter: {
        adminAccess: 'Admin Access',
    },
    sidebar: {
        dashboard: 'Dashboard',
        myCourses: 'My Courses',
        chat: 'Chat with AI',
        communityChat: 'Community Chat',
        logout: 'Logout'
    },
    dashboard: {
        title: 'Dashboard',
        welcome: 'Welcome back',
        subtitle: "Here's what's new for you.",
        myCourses: 'My Courses',
        aiTool: {
            title: 'Gradz AI Study Buddy',
            subtitle: 'Ask me anything about your courses!',
            noMessages: 'Start a conversation by typing below.',
            thinking: 'Thinking...',
            placeholder: 'e.g., "Explain classical mechanics"',
            sending: 'Sending...',
            send: 'Send'
        }
    },
    courses: {
        title: 'Browse Courses',
        subtitle: 'Find and enroll in courses tailored for your major.',
        searchPlaceholder: 'Search by course title or instructor...',
        noCoursesFound: 'No courses match your criteria.',
        enrollButton: 'Enroll Now',
        allMajors: 'All Majors',
    },
    chat: {
        title: 'Chat with Gradz AI',
        subtitle: 'Your personal AI assistant is ready to help you with your studies.'
    },
    communityChat: {
        title: '{{university}} Community',
        placeholder: 'Type a message...',
        sendImage: 'Send Image',
        sendFile: 'Send File',
        noMessages: 'No messages yet. Be the first to start a conversation!',
    },
    subscriptions: {
        title: 'Choose Your Plan',
        subtitle: 'Unlock premium features and get unlimited access to our resources.',
        currency: 'JOD',
        perSemester: 'Per Semester',
        perCourse: 'Per Course',
        currentPlan: 'Current Plan',
        subscribeNow: 'Subscribe Now',
        successMessage: 'Successfully subscribed to the {{planName}} plan!',
        errorMessage: 'Subscription failed. Please try again.',
        processing: 'Processing...'
    },
    blog: {
        title: 'Gradz Blog',
        subtitle: 'Tips, tricks, and stories to help you on your academic journey.',
        by: 'By',
        on: 'on',
        readMore: 'Read More',
        postNotFound: 'Post Not Found',
        backToBlog: 'Back to Blog',
        backToAllPosts: 'Back to All Posts'
    },
    share: {
        share: 'Share'
    },
    buyCoins: {
        title: 'Buy Z-Coins',
        subtitle: 'Top up your wallet to access premium features and content.',
        free: 'Free',
        price: 'Price',
        currency: 'JOD',
        redeem: {
            title: 'Have a Redeem Code?',
            placeholder: 'Enter your code here',
            redeeming: 'Redeeming...',
            redeemButton: 'Redeem'
        },
        successMessage: 'Success! {{amount}} Yellow Z-Coins have been added to your wallet.',
        errors: {
            Codeinvalid: 'The code you entered is invalid or has expired.'
        }
    },
    tutor: {
        becomeTutor: {
            title: 'Become a Gradz Tutor',
            subtitle: 'Share your knowledge, help students, and earn on your own schedule.',
            form: {
                name: 'Full Name',
                email: 'Email Address',
                university: 'Your University',
                major: 'Your Major / Field of Expertise',
                subjects: 'Subjects You Can Teach (e.g., Calculus I, Organic Chemistry)',
                message: 'Why do you want to be a tutor?',
                submit: 'Apply Now'
            }
        },
        createPassword: {
            title: 'Set Your Password',
            subtitle: 'Your application is approved! Just one more step to create your tutor account.',
            tokenError: 'Invalid or expired application link.',
            error: 'Passwords do not match.',
            success: 'Success! Your account is created. Redirecting you to your profile...',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            submit: 'Create Account'
        },
        sidebar: {
            profile: 'My Profile',
            courses: 'My Courses',
            messages: 'Messages'
        },
        profile: {
            title: 'My Tutor Profile',
            subtitle: 'Keep your information up to date for students.'
        },
        courses: {
            title: 'My Courses',
            subtitle: 'Manage your courses and video lessons.'
        },
        messages: {
            title: 'My Messages',
            subtitle: 'Communicate with your students.'
        }
    },
    privacyPolicy: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated: July 28, 2024',
        introduction: {
            title: '1. Introduction',
            content: 'Welcome to Gradz. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.'
        },
        informationWeCollect: {
            title: '2. Information We Collect',
            content: 'We may collect information about you in a variety of ways. The information we may collect on the Site includes:',
            points: {
                personal: 'Personal Data: Personally identifiable information, such as your name, email address, university, and major that you voluntarily give to us when you register with the Site.',
                usage: 'Usage Data: Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.'
            }
        },
        howWeUseInformation: {
            title: '3. How We Use Your Information',
            content: 'Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:',
            points: {
                provide: 'Create and manage your account.',
                improve: 'Improve our services and your experience.',
                communicate: 'Communicate with you about your account or our services.'
            }
        },
        dataSharing: {
            title: '4. Data Sharing',
            content: 'We do not share your personal information with third parties except as described in this Privacy Policy. We may share your information with vendors, consultants, and other third-party service providers who need access to such information to carry out work on our behalf.'
        },
        yourRights: {
            title: '5. Your Rights',
            content: 'You have the right to access, correct, or delete your personal information. You can review and change your personal information by logging into the Site and visiting your account profile page.'
        },
        contactUs: {
            title: '6. Contact Us',
            content: 'If you have questions or comments about this Privacy Policy, please contact us at: info@gradz.site'
        }
    },
    termsOfService: {
        title: 'Terms of Service',
        lastUpdated: 'Last updated: July 28, 2024',
        agreement: {
            title: '1. Agreement to Terms',
            content: 'By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the services.'
        },
        useOfService: {
            title: '2. Use of the Service',
            content: 'You may use the service only for lawful purposes and in accordance with these Terms.',
            points: {
                eligibility: 'You must be at least 18 years old to use the service.',
                account: 'You are responsible for safeguarding your account and for any activities or actions under your account.',
                prohibited: 'You agree not to use the service in any way that violates any applicable local or international law or regulation.'
            }
        },
        intellectualProperty: {
            title: '3. Intellectual Property',
            content: 'The service and its original content, features, and functionality are and will remain the exclusive property of Gradz and its licensors.'
        },
        termination: {
            title: '4. Termination',
            content: 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.'
        },
        disclaimer: {
            title: '5. Disclaimer of Warranties',
            content: 'The service is provided on an "AS IS" and "AS AVAILABLE" basis. Gradz makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.'
        },
        governingLaw: {
            title: '6. Governing Law',
            content: 'These Terms shall be governed and construed in accordance with the laws of the Hashemite Kingdom of Jordan, without regard to its conflict of law provisions.'
        },
        contactUs: {
            title: '7. Contact Us',
            content: 'If you have any questions about these Terms, please contact us at: info@gradz.site'
        }
    },
    admin: {
        community: {
            title: 'Community Management',
            bannerUrl: 'Banner URL',
            users: 'Users',
            messages: 'Messages',
            saveBanners: 'Save Banners'
        }
    }
};