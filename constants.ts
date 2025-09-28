import { Course, User } from './types';

export const JORDANIAN_UNIVERSITIES = [
  { en: "University of Jordan", ar: "الجامعة الأردنية" },
  { en: "Jordan University of Science and Technology (JUST)", ar: "جامعة العلوم والتكنولوجيا الأردنية" },
  { en: "Yarmouk University", ar: "جامعة اليرموك" },
  { en: "Hashemite University", ar: "الجامعة الهاشمية" },
  { en: "Al-Balqa' Applied University", ar: "جامعة البلقاء التطبيقية" },
  { en: "Princess Sumaya University for Technology (PSUT)", ar: "جامعة الأميرة سمية للتكنولوجيا" },
  { en: "German Jordanian University", ar: "الجامعة الألمانية الأردنية" },
  { en: "Mutah University", ar: "جامعة مؤتة" },
  { en: "Al-Hussein Bin Talal University", ar: "جامعة الحسين بن طلال" },
  { en: "Tafila Technical University", ar: "جامعة الطفيلة التقنية" },
  { en: "Philadelphia University", ar: "جامعة فيلادلفيا" },
  { en: "Applied Science Private University", ar: "جامعة العلوم التطبيقية الخاصة" },
  { en: "Petra University", ar: "جامعة البترا" },
  { en: "Zarqa University", ar: "جامعة الزرقاء" },
  { en: "Middle East University (MEU)", ar: "جامعة الشرق الأوسط" },
  { en: "American University of Madaba (AUM)", ar: "الجامعة الأمريكية في مادبا" },
  { en: "Other", ar: "أخرى" },
];

export const MAJORS = [
  // Engineering & Technology
  { en: 'Computer Science', ar: 'علم الحاسوب' },
  { en: 'Software Engineering', ar: 'هندسة البرمجيات' },
  { en: 'Cybersecurity', ar: 'الأمن السيبراني' },
  { en: 'Data Science and Artificial Intelligence', ar: 'علم البيانات والذكاء الاصطناعي' },
  { en: 'Civil Engineering', ar: 'الهندسة المدنية' },
  { en: 'Mechanical Engineering', ar: 'الهندسة الميكانيكية' },
  { en: 'Electrical Engineering', ar: 'الهندسة الكهربائية' },
  { en: 'Chemical Engineering', ar: 'الهندسة الكيميائية' },
  { en: 'Architectural Engineering', ar: 'الهندسة المعمارية' },
  { en: 'Industrial Engineering', ar: 'الهندسة الصناعية' },
  // Health Sciences
  { en: 'Medicine', ar: 'الطب' },
  { en: 'Dentistry', ar: 'طب الأسنان' },
  { en: 'Pharmacy', ar: 'الصيدلة' },
  { en: 'Nursing', ar: 'التمريض' },
  { en: 'Physical Therapy', ar: 'العلاج الطبيعي' },
  { en: 'Medical Laboratory Sciences', ar: 'التحاليل الطبية' },
  // Business & Administration
  { en: 'Business Administration', ar: 'إدارة الأعمال' },
  { en: 'Marketing', ar: 'التسويق' },
  { en: 'Finance', ar: 'التمويل' },
  { en: 'Accounting', ar: 'المحاسبة' },
  { en: 'Economics', ar: 'الاقتصاد' },
  { en: 'Hospitality and Tourism Management', ar: 'إدارة الفنادق والسياحة' },
  // Arts & Humanities
  { en: 'English Language and Literature', ar: 'اللغة الإنجليزية وآدابها' },
  { en: 'Arabic Language and Literature', ar: 'اللغة العربية وآدابها' },
  { en: 'Translation', ar: 'الترجمة' },
  { en: 'History', ar: 'التاريخ' },
  { en: 'Archaeology', ar: 'علم الآثار' },
  { en: 'Graphic Design', ar: 'التصميم الجرافيكي' },
  { en: 'Visual Arts', ar: 'الفنون البصرية' },
  // Sciences
  { en: 'Physics', ar: 'الفيزياء' },
  { en: 'Biology', ar: 'الأحياء' },
  { en: 'Chemistry', ar: 'الكيمياء' },
  { en: 'Mathematics', ar: 'الرياضيات' },
  { en: 'Geology', ar: 'الجيولوجيا' },
  // Law & Social Sciences
  { en: 'Law', ar: 'القانون' },
  { en: 'Political Science', ar: 'العلوم السياسية' },
  { en: 'Sociology', ar: 'علم الاجتماع' },
  { en: 'Psychology', ar: 'علم النفس' },
  // Other
  { en: 'General Studies', ar: 'دراسات عامة' },
  { en: 'Administration', ar: 'الإدارة' }
];


export const MOCK_STUDENTS: User[] = [
  { id: 'stu_1', email: 'student@gradz.com', name: 'Alex Johnson', university: 'Princess Sumaya University for Technology (PSUT)', major: 'Computer Science', role: 'student' },
  { id: 'stu_2', email: 'jane.doe@gradz.com', name: 'Jane Doe', university: 'University of Jordan', major: 'Biology', role: 'student' },
  { id: 'stu_3', email: 'peter.jones@gradz.com', name: 'Peter Jones', university: 'Jordan University of Science and Technology (JUST)', major: 'Physics', role: 'student' },
  { id: 'stu_4', email: 'susan.lee@gradz.com', name: 'Susan Lee', university: 'Yarmouk University', major: 'English Language and Literature', role: 'student' },
];

export const MOCK_COURSES: Course[] = [
  { id: 'CS101', title: 'Intro to Computer Science', department: 'Computer Science', instructor: 'Dr. Alan Turing', credits: 3, description: 'Fundamental concepts of programming and computer science.' },
  { id: 'PHY205', title: 'Classical Mechanics', department: 'Physics', instructor: 'Dr. Isaac Newton', credits: 4, description: 'An introduction to the principles of mechanics.' },
  { id: 'ENG101', title: 'English Composition I', department: 'English Language and Literature', instructor: 'Prof. Jane Austen', credits: 3, description: 'Develops skills in writing, reading, and critical thinking.' },
  { id: 'BIO110', title: 'Principles of Biology', department: 'Biology', instructor: 'Dr. Charles Darwin', credits: 4, description: 'Exploring the fundamental principles of living organisms.' },
  { id: 'CS340', title: 'Artificial Intelligence', department: 'Data Science and Artificial Intelligence', instructor: 'Dr. Ada Lovelace', credits: 3, description: 'An introduction to the theory and application of AI.' },
  { id: 'MTH250', title: 'Linear Algebra', department: 'Mathematics', instructor: 'Dr. Euclid', credits: 3, description: 'Covers vector spaces, linear transformations, and matrices.' },
];