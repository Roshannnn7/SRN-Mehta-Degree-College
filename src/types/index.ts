// ============================================
// S.R.N. MEHTA DEGREE COLLEGE — TYPE DEFINITIONS
// ============================================

// === BASE TYPES ===
export type Status = 'draft' | 'published' | 'archived';
export type AdmissionStatus = 'open' | 'closed' | 'coming_soon';
export type MessageStatus = 'new' | 'read' | 'replied' | 'archived';
export type MediaType = 'image' | 'video';

export interface BaseDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// === SITE SETTINGS ===
export interface SiteSettings {
  collegeName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  timings: string;
  mapCoordinates: { lat: number; lng: number };
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
  };
  admissionStatus: AdmissionStatus;
  admissionConfig: {
    academicYear: string;
    startDate?: string;
    lastDate?: string;
    eligibility: string;
    instructions: string;
    requiredDocuments: string[];
    contactPerson: string;
    contactPhone: string;
    contactEmail: string;
    applicationLink?: string;
  };
  heroContent: {
    headingLine1: string;
    headingLine2: string;
    subheading: string;
    ctaPrimary: { text: string; link: string };
    ctaSecondary: { text: string; link: string };
  };
  principalMessage: {
    name: string;
    designation: string;
    message: string;
    photoUrl?: string;
    photoPublicId?: string;
  };
  logoUrl?: string;
  logoPublicId?: string;
  footerText: string;
}

// === EVENT ===
export interface Event extends BaseDocument {
  title: string;
  slug: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  coverImage?: MediaItem;
  gallery: MediaItem[];
  registrationLink?: string;
  category: EventCategory;
  featured: boolean;
  status: Status;
}

export type EventCategory =
  | 'seminar'
  | 'workshop'
  | 'industry_visit'
  | 'cultural'
  | 'nss'
  | 'sports'
  | 'competition'
  | 'guest_lecture'
  | 'presentation'
  | 'awareness'
  | 'other';

// === GALLERY ===
export interface GalleryAlbum extends BaseDocument {
  title: string;
  category: GalleryCategory;
  images: MediaItem[];
  featured: boolean;
  order: number;
  status: Status;
}

export type GalleryCategory =
  | 'campus'
  | 'students'
  | 'events'
  | 'field_trips'
  | 'industry_visits'
  | 'workshops'
  | 'nss'
  | 'labs'
  | 'cultural'
  | 'sports';

// === MEDIA ===
export interface MediaItem {
  url: string;
  publicId: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  type: MediaType;
}

// === ANNOUNCEMENT ===
export interface Announcement extends BaseDocument {
  title: string;
  content: string;
  type: AnnouncementType;
  priority: 'normal' | 'high' | 'urgent';
  publishDate: string;
  expiryDate?: string;
  status: Status;
}

export type AnnouncementType =
  | 'admission'
  | 'exam'
  | 'holiday'
  | 'event'
  | 'workshop'
  | 'result'
  | 'general';

// === ADMISSION ENQUIRY ===
export interface AdmissionEnquiry extends BaseDocument {
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  dob: string;
  board: string;
  stream: string;
  percentage: string;
  city: string;
  contactPreference: 'phone' | 'email' | 'whatsapp';
  message?: string;
  documents: MediaItem[];
  status: MessageStatus;
  adminNotes?: string;
}

// === CONTACT MESSAGE ===
export interface ContactMessage extends BaseDocument {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: MessageStatus;
  adminNotes?: string;
}

// === FIELD TRIP ===
export interface FieldTrip extends BaseDocument {
  title: string;
  date: string;
  location: string;
  purpose: string;
  description: string;
  photos: MediaItem[];
  faculty: string[];
  outcomes: string;
  status: Status;
}

// === FACULTY ===
export interface FacultyMember extends BaseDocument {
  name: string;
  designation: string;
  department: string;
  qualification: string;
  bio: string;
  photoUrl?: string;
  photoPublicId?: string;
  subjects: string[];
  linkedin?: string;
  order: number;
  status: Status;
}

// === TESTIMONIAL ===
export interface Testimonial extends BaseDocument {
  studentName: string;
  batch: string;
  course: string;
  quote: string;
  photoUrl?: string;
  photoPublicId?: string;
  currentRole?: string;
  status: Status;
}

// === FAQ ===
export interface FAQ extends BaseDocument {
  question: string;
  answer: string;
  order: number;
  status: Status;
}

// === BCA CONTENT ===
export interface BCAContent {
  overview: string;
  duration: string;
  eligibility: string;
  affiliation: string;
  approval: string;
  learningApproach: string;
  curriculum: Semester[];
  careerPaths: CareerPath[];
  higherEducation: string[];
}

export interface Semester {
  number: number;
  title: string;
  subjects: Subject[];
}

export interface Subject {
  name: string;
  category: SubjectCategory;
  description?: string;
}

export type SubjectCategory =
  | 'programming'
  | 'database'
  | 'systems'
  | 'web'
  | 'ai_ml'
  | 'cybersecurity'
  | 'cloud'
  | 'data_science'
  | 'mathematics'
  | 'language'
  | 'project'
  | 'elective';

export interface CareerPath {
  title: string;
  description: string;
  skills: string[];
  relatedSubjects: string[];
  higherStudies: string[];
}

// === PAGE SEO ===
export interface PageSEO extends BaseDocument {
  slug: string;
  title: string;
  metaDescription: string;
  ogImage?: string;
  keywords: string[];
  canonicalUrl?: string;
}

// === ADMIN ===
export interface Admin extends BaseDocument {
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
  lastLogin?: string;
  mustChangePassword: boolean;
}

// === DASHBOARD STATS ===
export interface DashboardStats {
  admissionStatus: AdmissionStatus;
  newEnquiries: number;
  upcomingEvents: number;
  unreadMessages: number;
  galleryItems: number;
  publishedAnnouncements: number;
  totalFaculty: number;
}

// === API RESPONSE ===
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// === NAV ITEM ===
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
