import mongoose, { Schema } from 'mongoose';

const MediaItemSchema = new Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: String,
  width: Number,
  height: Number,
  type: { type: String, enum: ['image', 'video'], default: 'image' },
}, { _id: false });

// === ADMIN ===
const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  role: { type: String, enum: ['super_admin', 'admin'], default: 'admin' },
  lastLogin: Date,
  mustChangePassword: { type: Boolean, default: true },
}, { timestamps: true });

// === SITE SETTINGS ===
const SiteSettingsSchema = new Schema({
  collegeName: { type: String, default: 'S.R.N. Mehta Degree College' },
  tagline: { type: String, default: 'We Teach Them, They Serve The Nation' },
  address: { type: String, default: 'Sy No 79/1, Azadpur, University Road, Kalaburagi - 585 106' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  timings: { type: String, default: '9:00 AM - 4:00 PM' },
  mapCoordinates: {
    lat: { type: Number, default: 17.3297 },
    lng: { type: Number, default: 76.8343 },
  },
  socialLinks: {
    instagram: String,
    facebook: String,
    youtube: String,
    linkedin: String,
  },
  admissionStatus: { type: String, enum: ['open', 'closed', 'coming_soon'], default: 'closed' },
  admissionConfig: {
    academicYear: { type: String, default: '2026-27' },
    startDate: String,
    lastDate: String,
    eligibility: { type: String, default: '10+2 / PUC in any stream' },
    instructions: String,
    requiredDocuments: [String],
    contactPerson: String,
    contactPhone: String,
    contactEmail: String,
    applicationLink: String,
  },
  heroContent: {
    headingLine1: { type: String, default: 'BUILD WHAT' },
    headingLine2: { type: String, default: 'COMES NEXT.' },
    subheading: { type: String, default: 'Three years of BCA. A lifetime of building.' },
    ctaPrimary: {
      text: { type: String, default: 'Explore BCA' },
      link: { type: String, default: '/bca' },
    },
    ctaSecondary: {
      text: { type: String, default: 'Apply Now' },
      link: { type: String, default: '/admissions' },
    },
  },
  principalMessage: {
    name: { type: String, default: '' },
    designation: { type: String, default: 'Principal' },
    message: { type: String, default: '' },
    photoUrl: String,
    photoPublicId: String,
  },
  logoUrl: String,
  logoPublicId: String,
  footerText: { type: String, default: '© S.R.N. Mehta Degree College. All rights reserved.' },
}, { timestamps: true });

// === EVENT ===
const EventSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  date: { type: Date, required: true },
  time: String,
  location: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: MediaItemSchema,
  gallery: [MediaItemSchema],
  registrationLink: String,
  category: {
    type: String,
    enum: ['seminar', 'workshop', 'industry_visit', 'cultural', 'nss', 'sports', 'competition', 'guest_lecture', 'presentation', 'awareness', 'other'],
    default: 'other',
  },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, { timestamps: true });
EventSchema.index({ date: -1 });
EventSchema.index({ status: 1, date: -1 });

// === GALLERY ALBUM ===
const GalleryAlbumSchema = new Schema({
  title: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['campus', 'students', 'events', 'field_trips', 'industry_visits', 'workshops', 'nss', 'labs', 'cultural', 'sports'],
    default: 'campus',
  },
  images: [MediaItemSchema],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, { timestamps: true });
GalleryAlbumSchema.index({ status: 1, order: 1 });

// === ANNOUNCEMENT ===
const AnnouncementSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  type: {
    type: String,
    enum: ['admission', 'exam', 'holiday', 'event', 'workshop', 'result', 'general'],
    default: 'general',
  },
  priority: { type: String, enum: ['normal', 'high', 'urgent'], default: 'normal' },
  publishDate: { type: Date, default: Date.now },
  expiryDate: Date,
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, { timestamps: true });
AnnouncementSchema.index({ status: 1, publishDate: -1 });

// === ADMISSION ENQUIRY ===
const AdmissionEnquirySchema = new Schema({
  studentName: { type: String, required: true, trim: true },
  parentName: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  dob: { type: String, required: true },
  board: { type: String, required: true },
  stream: { type: String, required: true },
  percentage: { type: String, required: true },
  city: { type: String, required: true },
  contactPreference: { type: String, enum: ['phone', 'email', 'whatsapp'], default: 'phone' },
  message: String,
  documents: [MediaItemSchema],
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  adminNotes: String,
}, { timestamps: true });
AdmissionEnquirySchema.index({ status: 1, createdAt: -1 });

// === CONTACT MESSAGE ===
const ContactMessageSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  phone: String,
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  adminNotes: String,
}, { timestamps: true });
ContactMessageSchema.index({ status: 1, createdAt: -1 });

// === FIELD TRIP ===
const FieldTripSchema = new Schema({
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  purpose: { type: String, required: true },
  description: { type: String, required: true },
  photos: [MediaItemSchema],
  faculty: [String],
  outcomes: String,
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, { timestamps: true });
FieldTripSchema.index({ date: -1 });

// === FACULTY ===
const FacultySchema = new Schema({
  name: { type: String, required: true, trim: true },
  designation: { type: String, required: true },
  department: { type: String, default: 'Computer Applications' },
  qualification: String,
  bio: String,
  photoUrl: String,
  photoPublicId: String,
  subjects: [String],
  linkedin: String,
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, { timestamps: true });
FacultySchema.index({ status: 1, order: 1 });

// === TESTIMONIAL ===
const TestimonialSchema = new Schema({
  studentName: { type: String, required: true, trim: true },
  batch: String,
  course: { type: String, default: 'BCA' },
  quote: { type: String, required: true },
  photoUrl: String,
  photoPublicId: String,
  currentRole: String,
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, { timestamps: true });

// === FAQ ===
const FAQSchema = new Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
}, { timestamps: true });
FAQSchema.index({ status: 1, order: 1 });

// === BCA CONTENT ===
const BCAContentSchema = new Schema({
  overview: String,
  duration: { type: String, default: '3 Years (6 Semesters)' },
  eligibility: { type: String, default: '10+2 / PUC passed in any stream' },
  affiliation: { type: String, default: 'Gulbarga University' },
  approval: { type: String, default: 'AICTE' },
  learningApproach: String,
  curriculum: [{
    number: Number,
    title: String,
    subjects: [{
      name: String,
      category: String,
      description: String,
    }],
  }],
  careerPaths: [{
    title: String,
    description: String,
    skills: [String],
    relatedSubjects: [String],
    higherStudies: [String],
  }],
  higherEducation: [String],
}, { timestamps: true });

// === PAGE SEO ===
const PageSEOSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  metaDescription: String,
  ogImage: String,
  keywords: [String],
  canonicalUrl: String,
}, { timestamps: true });

// === MEDIA ASSET ===
const MediaAssetSchema = new Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  size: String,
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  publicId: String,
  format: String,
}, { timestamps: true });
MediaAssetSchema.index({ createdAt: -1 });

// === EXPORT MODELS ===
export const AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
export const SiteSettingsModel = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);
export const EventModel = mongoose.models.Event || mongoose.model('Event', EventSchema);
export const GalleryAlbumModel = mongoose.models.GalleryAlbum || mongoose.model('GalleryAlbum', GalleryAlbumSchema);
export const AnnouncementModel = mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);
export const AdmissionEnquiryModel = mongoose.models.AdmissionEnquiry || mongoose.model('AdmissionEnquiry', AdmissionEnquirySchema);
export const ContactMessageModel = mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);
export const FieldTripModel = mongoose.models.FieldTrip || mongoose.model('FieldTrip', FieldTripSchema);
export const FacultyModel = mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema);
export const TestimonialModel = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export const FAQModel = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
export const BCAContentModel = mongoose.models.BCAContent || mongoose.model('BCAContent', BCAContentSchema);
export const PageSEOModel = mongoose.models.PageSEO || mongoose.model('PageSEO', PageSEOSchema);
export const MediaAssetModel = mongoose.models.MediaAsset || mongoose.model('MediaAsset', MediaAssetSchema);

