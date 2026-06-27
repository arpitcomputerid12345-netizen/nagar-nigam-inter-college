export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Academic' | 'Admission' | 'Event' | 'General';
  isUrgent: boolean;
  author: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
}

export interface AdmissionApplication {
  id: string;
  fullName: string;
  fatherName: string;
  classApplied: string;
  gender: string;
  dob: string;
  phone: string;
  email?: string;
  previousSchool: string;
  marksPercentage: number;
  address: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submissionDate: string;
  remarks?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: 'Syllabus' | 'Date Sheet' | 'Admission' | 'Other';
  fileUrl: string;
  dateAdded: string;
  size: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  dateAdded: string;
}

export interface Topper {
  id: string;
  name: string;
  className: string;
  percentage: number;
  year: number;
  image: string;
  stream?: string;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  subjects: string[];
  phone: string;
  email: string;
  image: string;
  department: 'Primary' | 'Secondary' | 'Senior Secondary' | 'Admin';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Campus' | 'Sports' | 'Celebrations';
  imageUrl: string;
  type: 'image' | 'video';
  videoUrl?: string;
}

export interface DashboardStats {
  visitorCount: number;
  totalAdmissions: number;
  activeNotices: number;
  totalStudents: number;
}
