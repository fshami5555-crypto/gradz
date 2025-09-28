export default {
    publicHeader: {
        blog: 'Blog',
        pricing: 'Pricing',
        goToDashboard: 'Go to Dashboard',
        loginSignup: 'Login / Sign Up',
        becomeTutor: 'Become a Tutor'
    },
    login: {
        invalidCredentials: 'Invalid email or password.',
        loginFailed: 'Login failed. Please try again.',
        welcomeBack: 'Welcome Back!',
        emailPlaceholder: 'Email Address',
        passwordPlaceholder: 'Password',
        loginButton: 'Login',
        newUserPrompt: "Don't have an account?",
        createAccountLink: 'Create one now',
        loginLink: 'Login here'
    },
    signup: {
        userExistsError: 'A user with this email already exists.',
        signupFailed: 'Signup failed. Please try again.',
        title: 'Create Your Account',
        fullNamePlaceholder: 'Full Name',
        selectUniversityPlaceholder: 'Select your university',
        selectMajorPlaceholder: 'Select your major',
        signupButton: 'Sign Up',
        alreadyHaveAccountPrompt: 'Already have an account?'
    },
    adminLogin: {
        invalidCredentials: 'Invalid admin credentials.',
        loginFailed: 'Login failed. Please try again.',
        title: 'Admin Access Portal',
        signIn: 'Sign In to Admin Panel',
        emailPlaceholder: 'Admin Email',
        accessDashboardButton: 'Access Dashboard',
        notAdminPrompt: 'Not an administrator?',
        returnHomeLink: 'Return to home page'
    },
    sidebar: {
        dashboard: 'Dashboard',
        courses: 'Courses',
        subscriptions: 'Subscriptions',
        blog: 'Blog',
        aiStudyBuddy: 'AI Study Buddy',
        logout: 'Logout'
    },
    header: {
        semesterPlan: 'Semester Plan',
        singleCoursePlan: 'Single Course Plan',
        welcome: 'Welcome'
    },
    dashboard: {
        title: 'Your Dashboard',
        welcome: 'Good to see you again',
        subtitle: 'Here’s what’s happening with your courses today.',
        myCourses: 'My Courses',
        aiTool: {
            title: 'Gradz AI Study Buddy',
            subtitle: 'Your personal AI-powered assistant for any academic question.',
            noMessages: 'Ask me anything about your studies!',
            thinking: 'Thinking...',
            placeholder: 'Explain the theory of relativity...',
            sending: 'Sending...',
            send: 'Send'
        }
    },
    courses: {
        instructor: 'Instructor',
        credits: 'credits',
        enroll: 'Enroll',
        title: 'Explore Courses',
        subtitle: 'Find the right courses to expand your knowledge.',
        filterByMajor: 'Filter by major',
        allMajors: 'All Majors',
        noCoursesFound: 'No courses found for the selected major.'
    },
    subscriptions: {
        currency: 'JOD',
        perSemester: 'per semester',
        perCourse: 'per course',
        currentPlan: 'Current Plan',
        subscribeNow: 'Subscribe Now',
        successMessage: 'Successfully subscribed to the {{planName}} plan!',
        errorMessage: 'Subscription failed. Please try again.',
        title: 'Choose Your Plan',
        subtitle: 'Unlock your full potential with a Gradz subscription.',
        processing: 'Processing your subscription...',
        plan: {
            single: 'Single Course',
            semester: 'Full Semester'
        }
    },

    blog: {
        by: 'By',
        on: 'on',
        readMore: 'Read More',
        title: 'Our Blog',
        subtitle: 'Insights and stories from the world of academia.',
        postNotFound: 'Blog Post Not Found',
        backToBlog: 'Back to Blog',
        backToAllPosts: 'Back to All Posts'
    },
    share: {
        share: 'Share'
    },
    home: {
        hero: {
            title: 'Your University Journey, Supercharged.',
            subtitle: 'Gradz is your all-in-one platform for academic success, powered by AI.',
            cta: 'Get Started for Free'
        },
        features: {
            title: 'Why Students Choose Gradz',
            subtitle: "Gradz provides powerful, integrated tools to streamline your studies and boost your performance.",
            card1: {
                title: "AI Study Buddy",
                description: "Get instant answers and explanations for complex topics with your personal AI assistant, available 24/7."
            },
            card2: {
                title: "Comprehensive Courses",
                description: "Access a wide catalog of courses for your major, designed by top instructors to align with your curriculum."
            },
            card3: {
                title: "Student Community",
                description: "Connect with peers, share notes, and collaborate on projects."
            }
        },
        universities: {
            title: 'Trusted by students across Jordanian universities'
        },
        whatsapp: {
            tooltip: 'Chat with us on WhatsApp'
        }
    },
    footer: {
        tagline: 'Supercharging your university journey.',
        links: {
            title: 'Links',
            about: 'About Us',
            blog: 'Blog',
            careers: 'Become a Tutor'
        },
        legal: {
            title: 'Legal',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service'
        },
        contact: {
            title: 'Contact',
            whatsapp: 'WhatsApp'
        },
        copyright: 'All Rights Reserved'
    },
    tutor: {
        title: 'Become a Gradz Tutor',
        subtitle: 'Share your knowledge and earn by helping fellow students succeed. We welcome applications from passionate students who excel in their subjects.',
        note: 'Note: Current university students are encouraged to apply to teach subjects they have mastered.',
        form: {
            name: { label: 'Full Name', placeholder: 'e.g., Jane Doe' },
            email: { label: 'Email Address', placeholder: 'you@example.com' },
            university: { label: 'Your University' },
            major: { label: 'Your Major', placeholder: 'e.g., Mechanical Engineering'},
            year: { label: 'Year of Study', placeholder: 'Select your year', first: 'First Year', second: 'Second Year', third: 'Third Year', fourth: 'Fourth Year', fifth: 'Fifth Year+', graduate: 'Graduate' },
            subjects: { label: 'Subjects You Can Teach', placeholder: 'e.g., Calculus I, Physics II, Organic Chemistry' },
            motivation: { label: 'Why do you want to be a tutor?', placeholder: 'Briefly describe your motivation and any relevant experience.' },
            submit: 'Submit Application'
        },
        success: {
            title: 'Application Submitted!',
            message: "Thank you for your interest. We've received your application and will be in touch soon."
        }
    },
    admin: {
        title: 'Admin Dashboard',
        tabs: {
            dashboard: 'Dashboard',
            students: 'Students',
            courses: 'Courses',
            content: 'Content',
            siteImages: 'Site Images',
            tutorApplications: 'Tutor Applications'
        },
        students: {
            title: 'Student Management',
            table: {
                name: 'Name',
                email: 'Email',
                university: 'University',
                major: 'Major',
                subscription: 'Subscription',
                none: 'None'
            }
        },
        tutorApps: {
            title: 'Tutor Application Management',
            view: 'View Details',
            table: {
                name: 'Applicant Name',
                university: 'University',
                subjects: 'Subjects of Expertise',
                submittedAt: 'Submitted On',
                actions: 'Actions',
                email: 'Email',
                major: 'Major & Year',
            },
            modal: {
                title: 'Tutor Application Details',
                motivation: 'Motivation & Experience'
            }
        },
        content: {
            blog: {
                title: 'Blog Management',
                placeholder: 'Blog management UI will be here.'
            },
            plans: {
                title: 'Subscription Plan Management',
                placeholder: 'Plan management UI will be here.'
            }
        },
        images: {
            title: 'Site Image Management',
            mainLogoUrl: 'Main Logo URL',
            heroCarouselTitle: "Homepage Hero Carousel",
            heroImage1: "Hero Image 1 URL",
            heroImage2: "Hero Image 2 URL",
            heroImage3: "Hero Image 3 URL",
            universityLogos: 'University Logos'
        },
        actions: {
            close: 'Close',
            edit: 'Edit',
            delete: 'Delete',
            cancel: 'Cancel',
            addCourse: 'Add Course',
            saveChanges: 'Save Changes',
            saved: 'Changes saved!',
            savePlanChanges: 'Save Plan Changes',
            savePost: 'Save Post'
        }
    }
};