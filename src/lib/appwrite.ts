import { Client, Account, Databases, Storage, ID } from 'appwrite';
import { Profile } from '../types';

const client = new Client();

const endpoint = (import.meta as any).env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = (import.meta as any).env.VITE_APPWRITE_PROJECT_ID || '';
export const DATABASE_ID = (import.meta as any).env.VITE_APPWRITE_DATABASE_ID || 'mali_matrimony_db';
export const PROFILES_COLLECTION_ID = 'profiles';

if (!projectId) {
  console.warn(
    'Warning: VITE_APPWRITE_PROJECT_ID is not configured in environment variables. ' +
    'Please add it to your secrets or environment configuration to enable real-time Appwrite authentication.'
  );
}

client
  .setEndpoint(endpoint)
  .setProject(projectId || 'placeholder_project_id'); // Fallback to avoid SDK crash on empty string

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Check if Appwrite is fully configured
export const isAppwriteReady = () => {
  return typeof projectId === 'string' && projectId.trim() !== '' && projectId !== 'placeholder_project_id';
};

/**
 * Sanitizes local Profile objects to clean database records mapping Appwrite configurations.
 */
export function sanitizeProfileForAppwrite(profile: Profile): any {
  const sanitized: any = { ...profile };
  
  // Appwrite doesn't like properties with undefined values; replace with null or empty arrays/defaults
  Object.keys(sanitized).forEach((key) => {
    if (sanitized[key] === undefined) {
      delete sanitized[key];
    }
  });

  // Ensure arrays are verified list of strings
  if (!Array.isArray(sanitized.gallery)) sanitized.gallery = [];
  if (!Array.isArray(sanitized.hobbies)) sanitized.hobbies = [];
  if (!Array.isArray(sanitized.interests)) sanitized.interests = [];

  // Remove local app-specific state flags that are not stored in database collection
  delete sanitized.isShortlisted;

  return sanitized;
}

/**
 * Re-hydrates an Appwrite document to conform fully to local Profile structure.
 */
export function rehydrateProfileFromAppwrite(doc: any): Profile {
  return {
    id: doc.$id,
    name: doc.name || '',
    gender: doc.gender || 'Male',
    age: Number(doc.age) || 24,
    dob: doc.dob || '',
    mobile: doc.mobile || '',
    email: doc.email || '',
    gotra: doc.gotra || '',
    ownGotra: doc.ownGotra || doc.gotra || '',
    motherGotra: doc.motherGotra || '',
    dadiGotra: doc.dadiGotra || '',
    naniGotra: doc.naniGotra || '',
    district: doc.district || '',
    tehsil: doc.tehsil || '',
    village: doc.village || '',
    education: doc.education || '',
    college: doc.college || '',
    occupation: doc.occupation || '',
    company: doc.company || '',
    income: doc.income || '',
    fatherName: doc.fatherName || '',
    motherName: doc.motherName || '',
    familyType: doc.familyType || 'Joint',
    brothers: doc.brothers || '',
    sisters: doc.sisters || '',
    maritalStatus: doc.maritalStatus || 'Never Married',
    divorceStatus: doc.divorceStatus || '',
    divorceYear: doc.divorceYear || '',
    childrenDetails: doc.childrenDetails || '',
    preferredAge: doc.preferredAge || '',
    preferredDistrict: doc.preferredDistrict || '',
    preferredEducation: doc.preferredEducation || '',
    preferredProfession: doc.preferredProfession || '',
    photo: doc.photo || '',
    gallery: doc.gallery || [],
    selfie: doc.selfie || '',
    govId: doc.govId || '',
    verified: !!doc.verified,
    premium: !!doc.premium,
    isShortlisted: false, // UI client only
    interestStatus: doc.interestStatus || 'none',
    managedBy: doc.managedBy || 'Self',
    profileCompletion: Number(doc.profileCompletion) || 0,
    profileStrengthScore: Number(doc.profileStrengthScore) || 50,
    lastActive: doc.lastActive || 'Active recently',
    isOnline: !!doc.isOnline,
    isBlocked: !!doc.isBlocked,
    isReported: !!doc.isReported,
    photoPrivacyMode: doc.photoPrivacyMode || 'Visible',
    familyContactTiming: doc.familyContactTiming || '',
    agricultureLandDetails: doc.agricultureLandDetails || '',
    hasAgricultureLand: !!doc.hasAgricultureLand,
    familyBusinessInfo: doc.familyBusinessInfo || '',
    currentCity: doc.currentCity || '',
    fatherOccupation: doc.fatherOccupation || '',
    motherOccupation: doc.motherOccupation || '',
    familyStatus: doc.familyStatus || 'Middle Class',
    ownHouse: doc.ownHouse || 'Yes',
    occupationCategory: doc.occupationCategory || '',
    workType: doc.workType || 'None',
    smokingStatus: doc.smokingStatus || 'No',
    drinkingStatus: doc.drinkingStatus || 'No',
    tobaccoStatus: doc.tobaccoStatus || 'No',
    dietPreference: doc.dietPreference || 'Vegetarian',
    fitnessLevel: doc.fitnessLevel || 'Normal',
    nature: doc.nature || '',
    hobbies: doc.hobbies || [],
    interests: doc.interests || [],
    familyContactPerson: doc.familyContactPerson || '',
    familyWhatsApp: doc.familyWhatsApp || '',
    bestTimeToContact: doc.bestTimeToContact || '',
  };
}

/**
 * Fetch a single candidate profile profile document by ID.
 */
export async function fetchUserProfile(userId: string): Promise<Profile | null> {
  if (!isAppwriteReady()) return null;
  try {
    const doc = await databases.getDocument(DATABASE_ID, PROFILES_COLLECTION_ID, userId);
    return rehydrateProfileFromAppwrite(doc);
  } catch (err: any) {
    if (err.code === 404) {
      return null;
    }
    console.error('Appwrite fetchUserProfile error:', err);
    throw err;
  }
}

/**
 * Saves or updates a user candidate profile.
 */
export async function saveUserProfile(userId: string, profile: Profile): Promise<Profile> {
  if (!isAppwriteReady()) {
    return profile;
  }
  
  const payload = sanitizeProfileForAppwrite(profile);
  // Ensure the ID maps correctly
  delete payload.$id;
  delete payload.$collectionId;
  delete payload.$databaseId;
  delete payload.$createdAt;
  delete payload.$updatedAt;
  delete payload.$permissions;

  try {
    // Check if document already exists
    const exists = await fetchUserProfile(userId);
    if (exists) {
      const updated = await databases.updateDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        userId,
        payload
      );
      return rehydrateProfileFromAppwrite(updated);
    } else {
      const created = await databases.createDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        userId,
        payload
      );
      return rehydrateProfileFromAppwrite(created);
    }
  } catch (err: any) {
    console.error('Appwrite saveUserProfile failed:', err);
    throw err;
  }
}

/**
 * Load all verified and non-blocked Samaj candidates from Appwrite
 */
export async function loadAllProfiles(): Promise<Profile[]> {
  if (!isAppwriteReady()) return [];
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PROFILES_COLLECTION_ID
    );
    return response.documents.map(rehydrateProfileFromAppwrite);
  } catch (err: any) {
    console.warn('Appwrite loadAllProfiles failed (this is normal if first run with unseeded collections):', err.message);
    return [];
  }
}

export default client;
