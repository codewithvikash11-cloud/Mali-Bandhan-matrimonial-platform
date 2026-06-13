export interface Profile {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  age: number;
  dob: string;
  mobile: string;
  email: string;
  gotra: string;
  district: string;
  tehsil: string;
  village: string;
  education: string;
  college: string;
  occupation: string;
  company: string;
  income: string;
  fatherName: string;
  motherName: string;
  familyType: 'Joint' | 'Nuclear';
  brothers: string;
  sisters: string;
  maritalStatus: 'Never Married' | 'Divorced' | 'Widowed' | 'Awaiting Divorce';
  divorceStatus?: string;
  childrenDetails?: string;
  preferredAge: string;
  preferredDistrict: string;
  preferredEducation: string;
  preferredProfession: string;
  photo: string;
  gallery: string[];
  selfie?: string;
  govId?: string;
  verified: boolean;
  premium: boolean;
  isShortlisted: boolean;
  interestStatus: 'none' | 'sent' | 'received' | 'accepted' | 'rejected';
}

export interface SuccessStory {
  id: string;
  coupleName: string;
  gotras: string;
  location: string;
  weddingDate: string;
  story: string;
  photo: string;
}

export type ScreenState = 
  | 'AUTH_LOGIN'
  | 'AUTH_REGISTER'
  | 'AUTH_FORGOT'
  | 'AUTH_OTP'
  | 'AUTH_SUCCESS_MSG'
  | 'WIZARD'
  | 'DASHBOARD'
  | 'BROWSE'
  | 'DETAIL'
  | 'SEARCH'
  | 'INTERESTS'
  | 'SHORTLIST'
  | 'MEMBERSHIP'
  | 'PAYMENT_CHECKOUT'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_HISTORY'
  | 'NOTIFICATIONS'
  | 'SETTINGS'
  | 'SUCCESS_STORIES'
  | 'HERITAGE'
  | 'HELP'
  | 'LEGAL'
  | 'ASSISTANT';

export interface NotificationItem {
  id: string;
  type: 'interest' | 'view' | 'membership' | 'verification' | 'system';
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

export interface PaymentDetails {
  id?: string;
  planName: string;
  price: string;
  date: string;
  paymentId: string;
  status: 'Success' | 'Failed' | 'Pending';
}
