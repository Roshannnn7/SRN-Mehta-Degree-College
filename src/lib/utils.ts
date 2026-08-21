import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });
}

export function formatShortDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function categoryLabel(category: string): string {
  return category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^[+]?[\d\s-]{10,15}$/.test(phone);
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export const SITE_CONFIG = {
  name: 'S.R.N. Mehta Degree College',
  shortName: 'SRN Mehta',
  tagline: 'We Teach Them, They Serve The Nation',
  trust: 'Sri Praful Mehta & Family Trust',
  address: 'Sy. No. 79/1, Azadpur, Sedam Road, Kalaburagi - 585 106',
  phone: '+91 99028 72644',
  established: 2023,
  affiliation: 'Gulbarga University',
  program: 'BCA — Bachelor of Computer Applications',
  duration: '3 Years (6 Semesters)',
  state: 'Karnataka',
  city: 'Kalaburagi',
  coordinates: { lat: 17.3197, lng: 76.8488 },
  instagram: 'https://www.instagram.com/srn_mehta_degree_college/',
  youtube: 'https://www.youtube.com/c/SRNMehtaSchoolKalaburagi',
} as const;

export const TOP_PERFORMERS = [
  { name: 'Prahlad Singh', cgpa: '8.98', rank: 'First Class Exemplary' },
  { name: 'Bhagesh Biradar', cgpa: '8.48', rank: 'First Class Exemplary' },
  { name: 'Guruprasad', cgpa: '8.42', rank: 'First Class Exemplary' },
  { name: 'Sneha Jadhav', cgpa: '8.29', rank: 'First Class' },
  { name: 'Mallinath Dodhmani', cgpa: '8.25', rank: 'First Class' },
  { name: 'Vaishnavi Jadhav', cgpa: '8.22', rank: 'First Class' },
  { name: 'Vinaykumar Dolle', cgpa: '8.14', rank: 'First Class' },
  { name: 'Bhagyashree Lokhande', cgpa: '8.10', rank: 'First Class' },
] as const;

export const ACADEMIC_STATS = {
  passResult: '100% Pass Result',
  passResultDescription: 'All 17 students who appeared for the examination successfully passed, achieving a remarkable 100% pass result.',
  exemplaryCount: 8,
  distinctionCount: 3,
  firstClassCount: 6,
  appearedCount: 17,
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'BCA Program', href: '/bca' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Campus', href: '/campus' },
  {
    label: 'Life',
    href: '#',
    children: [
      { label: 'Events', href: '/events' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Field Trips', href: '/field-trips' },
    ],
  },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Contact', href: '/contact' },
] as const;

export const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Admissions', href: '/admin/admissions', icon: 'GraduationCap' },
  { label: 'Enquiries', href: '/admin/enquiries', icon: 'MessageSquare' },
  { label: 'Events', href: '/admin/events', icon: 'Calendar' },
  { label: 'Gallery', href: '/admin/gallery', icon: 'Image' },
  { label: 'Field Trips', href: '/admin/field-trips', icon: 'MapPin' },
  { label: 'Announcements', href: '/admin/announcements', icon: 'Megaphone' },
  { label: 'Faculty', href: '/admin/faculty', icon: 'Users' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: 'Quote' },
  { label: 'FAQ', href: '/admin/faq', icon: 'HelpCircle' },
  { label: 'BCA Content', href: '/admin/bca-content', icon: 'BookOpen' },
  { label: 'Homepage', href: '/admin/homepage', icon: 'Home' },
  { label: 'College Info', href: '/admin/college-info', icon: 'Building2' },
  { label: 'Media', href: '/admin/media', icon: 'FolderOpen' },
  { label: 'SEO', href: '/admin/seo', icon: 'Search' },
  { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
] as const;

export interface CurriculumSubject {
  code: string;
  name: string;
  category: string;
  type: 'Theory' | 'Practical' | 'Skill' | 'Project' | 'Elective';
  examMarks: number;
  iaMarks: number;
  totalMarks: number;
  note?: string;
}

export interface CurriculumSemester {
  number: number;
  title: string;
  academicYear: string;
  totalMarks: number;
  subjects: CurriculumSubject[];
}

export const BCA_CURRICULUM: CurriculumSemester[] = [
  {
    number: 1,
    title: 'Semester I — Foundations & Problem Solving',
    academicYear: '2024-25 & Onwards',
    totalMarks: 750,
    subjects: [
      { code: 'Language-1T', name: 'Kannada / MIL-1', category: 'language', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100, note: 'Optional: Kannada or Hindi' },
      { code: 'Language-2T', name: 'English-1', category: 'language', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'Comp-1T', name: 'Environmental Studies', category: 'compulsory', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-1AT', name: 'Fundamentals of Computers', category: 'systems', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-2AT', name: 'Discrete Mathematical Structures', category: 'mathematics', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-3AT', name: 'Problem Solving Using C', category: 'programming', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-1AP', name: 'Practical-I: Fundamentals of Computers Lab', category: 'systems', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-2AP', name: 'Practical-II: Discrete Mathematical Structures Lab', category: 'mathematics', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-3AP', name: 'Practical-III: Problem Solving Using C Lab', category: 'programming', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
    ],
  },
  {
    number: 2,
    title: 'Semester II — Data Structures & OOP',
    academicYear: '2024-25 & Onwards',
    totalMarks: 750,
    subjects: [
      { code: 'Language-1T', name: 'Kannada / MIL-1', category: 'language', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100, note: 'Optional: Kannada or Hindi' },
      { code: 'Language-2T', name: 'English-1', category: 'language', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'Comp-2T', name: 'Indian Constitution', category: 'compulsory', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-1BT', name: 'Operating System', category: 'systems', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-2BT', name: 'Data Structures Using C', category: 'programming', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-3BT', name: 'Object Oriented Programming with C++', category: 'programming', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-1BP', name: 'Practical-IV: Operating System Lab', category: 'systems', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-2BP', name: 'Practical-V: Data Structures Using C Lab', category: 'programming', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-3BP', name: 'Practical-VI: Object Oriented Programming with C++ Lab', category: 'programming', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
    ],
  },
  {
    number: 3,
    title: 'Semester III — Java, DBMS & Networks',
    academicYear: '2025-26 & Onwards',
    totalMarks: 700,
    subjects: [
      { code: 'Language-1T', name: 'Kannada / MIL-1', category: 'language', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100, note: 'Optional: Kannada or Hindi' },
      { code: 'Language-2T', name: 'English-1', category: 'language', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-1CT', name: 'Java Programming', category: 'programming', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-2CT', name: 'Computer Networks', category: 'systems', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-3CT', name: 'Database Management System', category: 'database', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSE-1T', name: 'Elective-I: IoT / Cyber Security', category: 'elective', type: 'Elective', examMarks: 40, iaMarks: 10, totalMarks: 50, note: 'Choice: a) Internet of Things or b) Cyber Security' },
      { code: 'DSC-1CP', name: 'Practical-VII: Java Programming Lab', category: 'programming', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-2CP', name: 'Practical-VIII: Computer Networks Lab', category: 'systems', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-3CP', name: 'Practical-IX: Database Management System Lab', category: 'database', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
    ],
  },
  {
    number: 4,
    title: 'Semester IV — Python, VB.NET & Software Engineering',
    academicYear: '2025-26 & Onwards',
    totalMarks: 700,
    subjects: [
      { code: 'Language-1T', name: 'Kannada / MIL-1', category: 'language', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100, note: 'Optional: Kannada or Hindi' },
      { code: 'Language-2T', name: 'English-1', category: 'language', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'Skill-1T', name: 'R Programming', category: 'skill', type: 'Skill', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-1DT', name: 'VB.NET', category: 'programming', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-2DT', name: 'Python Programming', category: 'programming', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-3DT', name: 'Software Engineering', category: 'systems', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSE-2T', name: 'Elective-II: Big Data Analytics / Cloud Computing', category: 'elective', type: 'Elective', examMarks: 40, iaMarks: 10, totalMarks: 50, note: 'Choice: a) Big Data Analytics or b) Cloud Computing' },
      { code: 'DSC-1DP', name: 'Practical-X: VB.NET Lab', category: 'programming', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-2DP', name: 'Practical-XI: Python Programming Lab', category: 'programming', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
    ],
  },
  {
    number: 5,
    title: 'Semester V — Algorithms, Graphics & Web Technologies',
    academicYear: '2026-27 & Onwards',
    totalMarks: 500,
    subjects: [
      { code: 'Skill-2T', name: 'Research Methodology', category: 'skill', type: 'Skill', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-1ET', name: 'Design and Analysis of Algorithms', category: 'programming', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-2ET', name: 'Computer Graphics', category: 'systems', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-3ET', name: 'Web Technologies', category: 'web', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-1EP', name: 'Practical-XII: Design and Analysis of Algorithms Lab', category: 'programming', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-2EP', name: 'Practical-XIII: Computer Graphics Lab', category: 'systems', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-3EP', name: 'Practical-XIV: Web Technologies Lab', category: 'web', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
    ],
  },
  {
    number: 6,
    title: 'Semester VI — AI, Data Science, Image Processing & Major Project',
    academicYear: '2026-27 & Onwards',
    totalMarks: 550,
    subjects: [
      { code: 'DSC-1FT', name: 'Digital Image Processing', category: 'ai_ml', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-2FT', name: 'Data Science', category: 'data_science', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-3FT', name: 'Artificial Intelligence', category: 'ai_ml', type: 'Theory', examMarks: 80, iaMarks: 20, totalMarks: 100 },
      { code: 'DSC-1FP', name: 'Practical-XV: Digital Image Processing Lab', category: 'ai_ml', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'DSC-2FP', name: 'Practical-XVI: Data Science Lab', category: 'data_science', type: 'Practical', examMarks: 40, iaMarks: 10, totalMarks: 50 },
      { code: 'Skill-3 MP', name: 'Major Project Report (MPR)', category: 'project', type: 'Project', examMarks: 120, iaMarks: 30, totalMarks: 150, note: 'Project Evaluation: 90 | Viva-Voce: 30 | IA: 30' },
    ],
  },
];

export const CAREER_PATHS = [
  {
    title: 'Software Developer',
    description: 'Design, develop and maintain software applications across platforms.',
    skills: ['Java', 'Python', 'C++', 'Problem Solving', 'System Design'],
    relatedSubjects: ['Java Programming', 'Data Structures', 'Software Engineering', 'OOP'],
    higherStudies: ['MCA', 'M.Tech (CS)', 'MBA (IT)'],
  },
  {
    title: 'Web Developer',
    description: 'Build modern websites and web applications using current technologies.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'PHP', 'MySQL'],
    relatedSubjects: ['Web Technologies', 'PHP/MySQL', 'DBMS', 'Software Engineering'],
    higherStudies: ['MCA', 'Full-Stack Bootcamp', 'UI/UX Certification'],
  },
  {
    title: 'Data Analyst',
    description: 'Analyze data to extract insights and support business decisions.',
    skills: ['Python', 'R', 'SQL', 'Statistics', 'Visualization'],
    relatedSubjects: ['Data Science', 'R Programming', 'DBMS', 'Mathematics'],
    higherStudies: ['M.Sc (Data Science)', 'MBA (Analytics)', 'PG Diploma'],
  },
  {
    title: 'Database Administrator',
    description: 'Manage, optimize and secure organizational databases.',
    skills: ['SQL', 'MySQL', 'Database Design', 'Backup & Recovery', 'Performance Tuning'],
    relatedSubjects: ['DBMS', 'PHP/MySQL', 'Operating Systems', 'Computer Networks'],
    higherStudies: ['MCA', 'Oracle Certification', 'AWS Database Specialty'],
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect systems and networks from digital threats and vulnerabilities.',
    skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Risk Assessment'],
    relatedSubjects: ['Cyber Security', 'Computer Networks', 'Operating Systems'],
    higherStudies: ['M.Tech (Cybersecurity)', 'CEH Certification', 'CISSP'],
  },
  {
    title: 'Cloud Engineer',
    description: 'Design and manage cloud infrastructure and services.',
    skills: ['AWS/Azure', 'DevOps', 'Networking', 'Containerization', 'Automation'],
    relatedSubjects: ['Cloud Computing', 'Computer Networks', 'Operating Systems'],
    higherStudies: ['AWS Certification', 'Azure Certification', 'MCA'],
  },
  {
    title: 'AI/ML Engineer',
    description: 'Build intelligent systems that learn from data and make predictions.',
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'Mathematics', 'Data Processing'],
    relatedSubjects: ['Artificial Intelligence', 'Data Science', 'Python', 'Mathematics'],
    higherStudies: ['M.Tech (AI/ML)', 'M.Sc (AI)', 'Research Programs'],
  },
  {
    title: 'Software Tester / QA',
    description: 'Ensure software quality through systematic testing and validation.',
    skills: ['Testing Methodologies', 'Automation', 'Bug Tracking', 'Documentation'],
    relatedSubjects: ['Software Engineering', 'Java', 'Web Technologies'],
    higherStudies: ['ISTQB Certification', 'MCA', 'Selenium Certification'],
  },
];

export const FACILITIES = [
  { name: 'Smart Classrooms', description: 'Interactive digital learning with Smart TVs and modern teaching aids', icon: 'Monitor' },
  { name: 'Computer Laboratory', description: 'Well-equipped lab with high-performance systems and latest software', icon: 'Cpu' },
  { name: 'Digital Library', description: 'Extensive collection of books, journals and digital resources', icon: 'Library' },
  { name: 'High-Speed Internet', description: 'Campus-wide connectivity for seamless learning and research', icon: 'Wifi' },
  { name: 'Auditorium', description: 'Modern auditorium for seminars, workshops and cultural events', icon: 'Theater' },
  { name: 'Playground', description: 'Spacious grounds for sports, fitness and outdoor activities', icon: 'Trees' },
  { name: 'Cafeteria', description: 'Hygienic cafeteria serving nutritious meals for students and staff', icon: 'Coffee' },
  { name: 'GPS Transport', description: 'GPS-enabled buses ensuring safe and timely student transportation', icon: 'Bus' },
  { name: 'CCTV Security', description: '24/7 surveillance across campus for student safety and security', icon: 'Shield' },
  { name: 'Placement Cell', description: 'Dedicated placement and career guidance for industry readiness', icon: 'Briefcase' },
  { name: 'ICT-Enabled Teaching', description: 'Technology-integrated pedagogy for effective learning outcomes', icon: 'Laptop' },
  { name: 'Industry Visits', description: 'Regular field trips and industry exposure for practical understanding', icon: 'Building2' },
];
