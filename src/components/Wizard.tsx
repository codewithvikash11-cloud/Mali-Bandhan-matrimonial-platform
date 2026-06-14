import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, MapPin, Briefcase, Users, Heart, Sparkles, Image, CheckCircle, Eye, Star, ShieldCheck, ChevronRight, ChevronLeft, Upload, FileText,
  Clock, Percent, EyeOff, Lock, Trash2, Trees, Store, MessageSquare, Check, Search, ChevronDown
} from 'lucide-react';
import SearchableGotraDropdown from './SearchableGotraDropdown';
import SearchableLocationSelector from './SearchableLocationSelector';
import CareerSection from './CareerSection';
import SmartDatePicker from './SmartDatePicker';
import SmartPhoneInput from './SmartPhoneInput';
import ImageDropzone from './ImageDropzone';
import FamilyCallScheduler from './FamilyCallScheduler';

interface WizardProps {
  onComplete: (completedProfileData: any) => void;
  initialData?: any;
}

export default function Wizard({ onComplete, initialData }: WizardProps) {
  const [step, setStep] = useState(1);

  // Step 1: Basic Info
  const [fullName, setFullName] = useState(initialData?.name || 'Kuldeep Saini');
  const [gender, setGender] = useState<'Male' | 'Female'>(initialData?.gender || 'Male');
  const [dob, setDob] = useState(initialData?.dob || '1998-05-20');
  const [mobile, setMobile] = useState(initialData?.mobile || '+91 94142 68241');
  const [email, setEmail] = useState(initialData?.email || 'kuldeep.saini88@gmail.com');
  const [managedBy, setManagedBy] = useState<'Self' | 'Father' | 'Mother' | 'Brother' | 'Sister' | 'Relative'>(initialData?.managedBy || 'Father');

  // Step 2: Community
  const [gotra, setGotra] = useState('Gehlot');
  const [motherGotra, setMotherGotra] = useState('Sankhla');
  const [dadiGotra, setDadiGotra] = useState('Tak');
  const [naniGotra, setNaniGotra] = useState('Deora');
  const [district, setDistrict] = useState('Jodhpur');
  const [tehsil, setTehsil] = useState('Luni');
  const [village, setVillage] = useState('Salawas');

  // Step 3: Education & Professional
  const [education, setEducation] = useState('BTech');
  const [college, setCollege] = useState('MNIT Jaipur');
  const [occupation, setOccupation] = useState('Software Developer');
  const [company, setCompany] = useState('Saini Software Solutions');
  const [income, setIncome] = useState('₹5-8 Lakh');
  const [workType, setWorkType] = useState('Private');
  const [eduError, setEduError] = useState('');

  // Step 4: Family Details
  const [fatherName, setFatherName] = useState('Mr. Devaram Gehlot');
  const [motherName, setMotherName] = useState('Mrs. Rukma Devi');
  const [familyType, setFamilyType] = useState<'Joint' | 'Nuclear'>('Joint');
  const [brothers, setBrothers] = useState('1 elder (helping in business)');
  const [sisters, setSisters] = useState('1 younger (married)');
  
  // Traditional Rajasthan Mali Samaj requested custom attributes
  const [familyContactTiming, setFamilyContactTiming] = useState('6:00 PM to 9:00 PM');
  const [agricultureLandDetails, setAgricultureLandDetails] = useState('6 Bigha irrigated land near Luni (Luni canal side)');
  const [familyBusinessInfo, setFamilyBusinessInfo] = useState('Mali Florists Shop & Seed Center, Luni Agency');
  const [photoPrivacyMode, setPhotoPrivacyMode] = useState<'Visible' | 'Blur' | 'Verified Only' | 'Accepted Interest Only'>('Visible');

  // New States requested
  const [currentCity, setCurrentCity] = useState(initialData?.currentCity || 'Jodhpur');
  const [fatherOccupation, setFatherOccupation] = useState(initialData?.fatherOccupation || 'Retired Principal');
  const [motherOccupation, setMotherOccupation] = useState(initialData?.motherOccupation || 'Homemaker');
  const [familyStatus, setFamilyStatus] = useState<'Middle Class' | 'Upper Middle' | 'Royal/Rich' | 'Conservative High Traditional'>(initialData?.familyStatus || 'Middle Class');
  const [hasAgricultureLand, setHasAgricultureLand] = useState<boolean>(initialData?.hasAgricultureLand ?? true);
  const [ownHouse, setOwnHouse] = useState<'Yes' | 'No' | 'Rented'>(initialData?.ownHouse || 'Yes');
  const [divorceYear, setDivorceYear] = useState(initialData?.divorceYear || '');
  const [occupationCategory, setOccupationCategory] = useState(initialData?.occupationCategory || 'IT & Software');
  
  // Lifestyle States
  const [smokingStatus, setSmokingStatus] = useState<'No' | 'Yes' | 'Occasionally'>('No');
  const [drinkingStatus, setDrinkingStatus] = useState<'No' | 'Yes' | 'Occasionally'>('No');
  const [tobaccoStatus, setTobaccoStatus] = useState<'No' | 'Yes' | 'Occasionally'>('No');
  const [dietPreference, setDietPreference] = useState<'Vegetarian' | 'Non-Vegetarian' | 'Eggetarian' | 'Vegan'>('Vegetarian');
  const [fitnessLevel, setFitnessLevel] = useState<'Normal' | 'Athletic' | 'Gym Goer' | 'Yoga Practitioner' | 'Active'>('Normal');

  // Personality States
  const [nature, setNature] = useState('Calm, Kind, & Family Oriented');
  const [hobbiesString, setHobbiesString] = useState('Gardening, Cooking, Indian Classical Music');
  const [interestsString, setInterestsString] = useState('Traditional Culture, Social Upliftment, Organic Farming');

  // Profile Management and contacts
  const [familyContactPerson, setFamilyContactPerson] = useState('Mr. Devaram Gehlot (Father)');
  const [familyWhatsApp, setFamilyWhatsApp] = useState('+91 94142 68241');

  // Step 5: Marriage Details
  const [maritalStatus, setMaritalStatus] = useState<'Never Married' | 'Divorced' | 'Widowed' | 'Awaiting Divorce'>('Never Married');
  const [divorceStatus, setDivorceStatus] = useState('');
  const [childrenDetails, setChildrenDetails] = useState('');

  // Step 6: Partner Preference
  const [preferredAge, setPreferredAge] = useState('23 - 26');
  const [preferredDistrict, setPreferredDistrict] = useState('Jodhpur, Pali, Jaipur');
  const [preferredEducation, setPreferredEducation] = useState('Graduate or above');
  const [preferredProfession, setPreferredProfession] = useState('Corporate Job or Govt School Teacher');

  // Step 7: Photo
  const [mainPhoto, setMainPhoto] = useState('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400');
  const [gallery, setGallery] = useState<string[]>([
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400'
  ]);

  // Step 8: Verification
  const [selfie, setSelfie] = useState('');
  const [govId, setGovId] = useState('');
  const [isSelfieCaptured, setIsSelfieCaptured] = useState(false);
  const [isIdUploaded, setIsIdUploaded] = useState(false);

  // Auto Save & Restore Draft States
  const [draftRestoredAlert, setDraftRestoredAlert] = useState(false);

  // Quick Profile Mode (2-Min Registration Module)
  const [quickProfileMode, setQuickProfileMode] = useState(false);

  // Searchable Family social status dropdown configuration
  const [isFamilyStatusOpen, setIsFamilyStatusOpen] = useState(false);
  const [familyStatusSearch, setFamilyStatusSearch] = useState("");
  const familyStatusRef = React.useRef<HTMLDivElement>(null);

  // Click outside listener for the family status search select box
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (familyStatusRef.current && !familyStatusRef.current.contains(event.target as Node)) {
        setIsFamilyStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate dynamic Profile Completion Percentage based on inputs configured
  const getCompletionPercentage = () => {
    let score = 0;
    let total = 0;

    const check = (val: any) => {
      total += 1;
      if (val && String(val).trim() !== '' && val !== 'placeholder' && !String(val).includes('placeholder') && !String(val).includes('default')) {
        score += 1;
      }
    };

    check(fullName);
    check(dob);
    check(mobile);
    check(email);
    check(gotra);
    check(motherGotra);
    check(dadiGotra);
    check(naniGotra);
    check(district);
    check(tehsil);
    check(village);
    check(currentCity);
    check(education);
    check(college);
    check(occupation);
    check(company);
    check(income);
    check(fatherName);
    check(motherName);
    check(fatherOccupation);
    check(motherOccupation);
    check(familyStatus);
    check(ownHouse);
    check(brothers);
    check(sisters);
    check(preferredAge);
    check(preferredDistrict);
    check(preferredEducation);
    check(preferredProfession);
    check(familyContactTiming);
    check(agricultureLandDetails);
    check(familyBusinessInfo);
    check(smokingStatus);
    check(drinkingStatus);
    check(tobaccoStatus);
    check(dietPreference);
    check(fitnessLevel);
    check(nature);
    check(hobbiesString);
    check(interestsString);
    check(familyContactPerson);
    check(familyWhatsApp);
    
    // Check files/verification
    total += 2;
    if (isSelfieCaptured) score += 1;
    if (isIdUploaded) score += 1;

    return Math.round((score / total) * 100);
  };

  // 1. Load draft profile on initialization
  useEffect(() => {
    const savedDraftString = localStorage.getItem('mali_samaj_draft');
    if (savedDraftString) {
      try {
        const d = JSON.parse(savedDraftString);
        if (d.fullName) setFullName(d.fullName);
        if (d.gender) setGender(d.gender);
        if (d.dob) setDob(d.dob);
        if (d.mobile) setMobile(d.mobile);
        if (d.email) setEmail(d.email);
        if (d.managedBy) setManagedBy(d.managedBy);
        if (d.gotra) setGotra(d.gotra);
        if (d.motherGotra) setMotherGotra(d.motherGotra);
        if (d.dadiGotra) setDadiGotra(d.dadiGotra);
        if (d.naniGotra) setNaniGotra(d.naniGotra);
        if (d.district) setDistrict(d.district);
        if (d.tehsil) setTehsil(d.tehsil);
        if (d.village) setVillage(d.village);
        if (d.education) setEducation(d.education);
        if (d.college) setCollege(d.college);
        if (d.occupation) setOccupation(d.occupation);
        if (d.company) setCompany(d.company);
        if (d.income) setIncome(d.income);
        if (d.workType) setWorkType(d.workType);
        if (d.fatherName) setFatherName(d.fatherName);
        if (d.motherName) setMotherName(d.motherName);
        if (d.familyType) setFamilyType(d.familyType);
        if (d.brothers) setBrothers(d.brothers);
        if (d.sisters) setSisters(d.sisters);
        if (d.maritalStatus) setMaritalStatus(d.maritalStatus);
        if (d.divorceStatus) setDivorceStatus(d.divorceStatus);
        if (d.childrenDetails) setChildrenDetails(d.childrenDetails);
        if (d.preferredAge) setPreferredAge(d.preferredAge);
        if (d.preferredDistrict) setPreferredDistrict(d.preferredDistrict);
        if (d.preferredEducation) setPreferredEducation(d.preferredEducation);
        if (d.preferredProfession) setPreferredProfession(d.preferredProfession);
        if (d.mainPhoto) setMainPhoto(d.mainPhoto);
        if (d.familyContactTiming) setFamilyContactTiming(d.familyContactTiming);
        if (d.agricultureLandDetails) setAgricultureLandDetails(d.agricultureLandDetails);
        if (d.familyBusinessInfo) setFamilyBusinessInfo(d.familyBusinessInfo);
        if (d.photoPrivacyMode) setPhotoPrivacyMode(d.photoPrivacyMode);
        if (d.currentCity) setCurrentCity(d.currentCity);
        if (d.fatherOccupation) setFatherOccupation(d.fatherOccupation);
        if (d.motherOccupation) setMotherOccupation(d.motherOccupation);
        if (d.familyStatus) setFamilyStatus(d.familyStatus);
        if (d.hasAgricultureLand !== undefined) setHasAgricultureLand(d.hasAgricultureLand);
        if (d.ownHouse) setOwnHouse(d.ownHouse);
        if (d.occupationCategory) setOccupationCategory(d.occupationCategory);
        if (d.divorceYear) setDivorceYear(d.divorceYear);
        if (d.smokingStatus) setSmokingStatus(d.smokingStatus);
        if (d.drinkingStatus) setDrinkingStatus(d.drinkingStatus);
        if (d.tobaccoStatus) setTobaccoStatus(d.tobaccoStatus);
        if (d.dietPreference) setDietPreference(d.dietPreference);
        if (d.fitnessLevel) setFitnessLevel(d.fitnessLevel);
        if (d.nature) setNature(d.nature);
        if (d.hobbiesString) setHobbiesString(d.hobbiesString);
        if (d.interestsString) setInterestsString(d.interestsString);
        if (d.familyContactPerson) setFamilyContactPerson(d.familyContactPerson);
        if (d.familyWhatsApp) setFamilyWhatsApp(d.familyWhatsApp);
        if (d.step) setStep(d.step);
        
        setDraftRestoredAlert(true);
      } catch (e) {
        console.error("Failed to recover draft", e);
      }
    }
  }, []);

  // 2. Automatically save inputs whenever fields shift
  useEffect(() => {
    const draftPayload = {
      fullName, gender, dob, mobile, email, managedBy,
      gotra, motherGotra, dadiGotra, naniGotra,
      district, tehsil, village, currentCity,
      education, college, occupation, company, income, workType, occupationCategory,
      fatherName, motherName, familyType, brothers, sisters, fatherOccupation, motherOccupation, familyStatus, hasAgricultureLand, ownHouse,
      maritalStatus, divorceStatus, divorceYear, childrenDetails,
      preferredAge, preferredDistrict, preferredEducation, preferredProfession,
      mainPhoto, step,
      familyContactTiming, agricultureLandDetails, familyBusinessInfo, photoPrivacyMode,
      smokingStatus, drinkingStatus, tobaccoStatus, dietPreference, fitnessLevel,
      nature, hobbiesString, interestsString, familyContactPerson, familyWhatsApp
    };
    if (fullName && fullName !== 'Kuldeep Saini') {
      localStorage.setItem('mali_samaj_draft', JSON.stringify(draftPayload));
    }
  }, [
    fullName, gender, dob, mobile, email, managedBy,
    gotra, motherGotra, dadiGotra, naniGotra,
    district, tehsil, village, currentCity,
    education, college, occupation, company, income, workType, occupationCategory,
    fatherName, motherName, familyType, brothers, sisters, fatherOccupation, motherOccupation, familyStatus, hasAgricultureLand, ownHouse,
    maritalStatus, divorceStatus, divorceYear, childrenDetails,
    preferredAge, preferredDistrict, preferredEducation, preferredProfession,
    mainPhoto, step,
    familyContactTiming, agricultureLandDetails, familyBusinessInfo, photoPrivacyMode,
    smokingStatus, drinkingStatus, tobaccoStatus, dietPreference, fitnessLevel,
    nature, hobbiesString, interestsString, familyContactPerson, familyWhatsApp
  ]);

  const handleClearDraft = () => {
    localStorage.removeItem('mali_samaj_draft');
    setFullName('');
    setGender('Male');
    setDob('');
    setMobile('');
    setEmail('');
    setManagedBy('Self');
    setGotra('');
    setMotherGotra('');
    setDadiGotra('');
    setNaniGotra('');
    setDistrict('');
    setTehsil('');
    setVillage('');
    setEducation('');
    setCollege('');
    setOccupation('');
    setCompany('');
    setIncome('');
    setWorkType('Private');
    setFatherName('');
    setMotherName('');
    setFamilyType('Joint');
    setBrothers('');
    setSisters('');
    setMaritalStatus('Never Married');
    setDivorceStatus('');
    setChildrenDetails('');
    setPreferredAge('');
    setPreferredDistrict('');
    setPreferredEducation('');
    setPreferredProfession('');
    setMainPhoto('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400');
    setFamilyContactTiming('');
    setAgricultureLandDetails('');
    setFamilyBusinessInfo('');
    setPhotoPrivacyMode('Visible');
    setStep(1);
    setDraftRestoredAlert(false);
  };

  const handleAutofillSample = (selectedGender: 'Male' | 'Female') => {
    if (selectedGender === 'Male') {
      setFullName('Kuldeep Saini');
      setGender('Male');
      setDob('1998-05-20');
      setMobile('+91 94142 68241');
      setEmail('kuldeep.saini88@gmail.com');
      setManagedBy('Father');
      setGotra('Gehlot');
      setMotherGotra('Sankhla');
      setDadiGotra('Tak');
      setNaniGotra('Deora');
      setDistrict('Jodhpur');
      setTehsil('Luni');
      setVillage('Salawas');
      setCurrentCity('Jodhpur');
      setEducation('BTech');
      setCollege('MNIT Jaipur');
      setOccupation('Software Developer');
      setCompany('Saini Software Solutions');
      setIncome('₹5-8 Lakh');
      setWorkType('Private');
      setFatherName('Mr. Devaram Gehlot');
      setMotherName('Mrs. Rukma Devi');
      setFatherOccupation('Retired Principal');
      setMotherOccupation('Homemaker');
      setFamilyType('Joint');
      setBrothers('1 elder (helping in business)');
      setSisters('1 younger (married)');
      setAgricultureLandDetails('6 Bigha irrigated land near Luni (Luni canal side)');
      setOwnHouse('Yes');
      setOccupationCategory('IT & Software');
      setDietPreference('Vegetarian');
      setHobbiesString('Gardening, Cooking, Indian Classical Music');
      setInterestsString('Traditional Culture, Social Upliftment, Organic Farming');
      setFamilyContactPerson('Mr. Devaram Gehlot (Father)');
      setFamilyWhatsApp('+91 94142 68241');
      setMaritalStatus('Never Married');
      setPreferredAge('23 - 26');
      setPreferredDistrict('Jodhpur, Pali, Jaipur');
      setPreferredEducation('Graduate or above');
      setPreferredProfession('Corporate Job or Govt School Teacher');
      setMainPhoto('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400');
    } else {
      setFullName('Priyanka Saini');
      setGender('Female');
      setDob('2000-08-12');
      setMobile('+91 98290 12345');
      setEmail('priyanka.saini@gmail.com');
      setManagedBy('Self');
      setGotra('Kachhawaha');
      setMotherGotra('Bhati');
      setDadiGotra('Goyal');
      setNaniGotra('Rathore');
      setDistrict('Jaipur');
      setTehsil('Sanganer');
      setVillage('Sanganer Hub');
      setCurrentCity('Jaipur');
      setEducation('MBBS');
      setCollege('SMS Medical College');
      setOccupation('Doctor (Resident)');
      setCompany('Fortis Hospital');
      setIncome('₹10-15 Lakh');
      setWorkType('Private');
      setFatherName('Mr. Girdhari Lal Kachhawaha');
      setMotherName('Mrs. Sita Devi');
      setFatherOccupation('Business Owner');
      setMotherOccupation('Homemaker');
      setFamilyType('Nuclear');
      setBrothers('None');
      setSisters('None');
      setAgricultureLandDetails('No agricultural land');
      setOwnHouse('Yes');
      setOccupationCategory('Medical & Healthcare');
      setDietPreference('Vegetarian');
      setHobbiesString('Reading Wellness Books, Rajasthani Folk Dance');
      setInterestsString('Social Work, Painting, Health Awareness Camps');
      setFamilyContactPerson('Mr. Girdhari Lal (Father)');
      setFamilyWhatsApp('+91 98290 12345');
      setMaritalStatus('Never Married');
      setPreferredAge('25 - 29');
      setPreferredDistrict('Jaipur, Ajmer, Jodhpur');
      setPreferredEducation('Post Graduate or doctor specialty');
      setPreferredProfession('Doctor or UPSC officer');
      setMainPhoto('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400');
    }
  };

  const stepsList = quickProfileMode
    ? [
        { num: 1, label: "Basic Info", icon: User },
        { num: 2, label: "Community & Gotra", icon: MapPin },
        { num: 3, label: "Career & Sector", icon: Briefcase },
        { num: 10, label: "Complete", icon: CheckCircle }
      ]
    : [
        { num: 1, label: "Basic Info", icon: User },
        { num: 2, label: "Community", icon: MapPin },
        { num: 3, label: "Education", icon: Briefcase },
        { num: 4, label: "Family", icon: Users },
        { num: 5, label: "Marriage", icon: Heart },
        { num: 6, label: "Preference", icon: Sparkles },
        { num: 7, label: "Photos", icon: Image },
        { num: 8, label: "Verification", icon: ShieldCheck },
        { num: 9, label: "Review", icon: Eye },
        { num: 10, label: "Complete", icon: CheckCircle }
      ];

  const handleNext = () => {
    if (step === 3) {
      if (!education || education.trim() === '') {
        setEduError('Educational qualification is required. Please select or enter your highest education.');
        return;
      }
      if (!occupation || occupation.trim() === '') {
        setEduError('Occupation/Profession is required. Please select your occupation category or type custom.');
        return;
      }
      if (!income || income.trim() === '') {
        setEduError('Annual Personal/Family Income is required. Please select your income.');
        return;
      }
      setEduError('');
      
      if (quickProfileMode) {
        setStep(10);
        return;
      }
    }
    if (step < 10) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 10 && quickProfileMode) {
      setStep(3);
      return;
    }
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateAge = (birthDateString: string): number => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age || 28;
  };

  const handleFinalSubmit = () => {
    const completeProfileData = {
      id: "registered-user",
      name: fullName,
      gender: gender,
      age: calculateAge(dob),
      dob: dob,
      mobile: mobile,
      email: email,
      gotra: gotra,
      ownGotra: gotra,
      motherGotra: motherGotra,
      dadiGotra: dadiGotra,
      naniGotra: naniGotra,
      district: district,
      tehsil: tehsil,
      village: village,
      currentCity: currentCity,
      education: education,
      college: college,
      occupation: occupation,
      company: company,
      income: income,
      workType: workType,
      occupationCategory: occupationCategory,
      fatherName: fatherName,
      motherName: motherName,
      familyType: familyType,
      brothers: brothers,
      sisters: sisters,
      fatherOccupation: fatherOccupation,
      motherOccupation: motherOccupation,
      familyStatus: familyStatus,
      hasAgricultureLand: hasAgricultureLand,
      ownHouse: ownHouse,
      maritalStatus: maritalStatus,
      divorceStatus: divorceStatus,
      divorceYear: divorceYear,
      childrenDetails: childrenDetails,
      preferredAge: preferredAge,
      preferredDistrict: preferredDistrict,
      preferredEducation: preferredEducation,
      preferredProfession: preferredProfession,
      photo: mainPhoto,
      gallery: gallery,
      verified: isSelfieCaptured && isIdUploaded,
      premium: false,
      isShortlisted: false,
      interestStatus: 'none' as const,
      // Additional requested attributes
      managedBy: managedBy,
      isCommunityVerified: true,
      profileCompletion: getCompletionPercentage(),
      profileStrengthScore: 88,
      lastActive: "Active now",
      isOnline: true,
      familyContactTiming: familyContactTiming,
      agricultureLandDetails: agricultureLandDetails,
      familyBusinessInfo: familyBusinessInfo,
      photoPrivacyMode: photoPrivacyMode,
      smokingStatus: smokingStatus,
      drinkingStatus: drinkingStatus,
      tobaccoStatus: tobaccoStatus,
      dietPreference: dietPreference,
      fitnessLevel: fitnessLevel,
      nature: nature,
      hobbies: hobbiesString.split(',').map(s => s.trim()).filter(Boolean),
      interests: interestsString.split(',').map(s => s.trim()).filter(Boolean),
      familyContactPerson: familyContactPerson,
      familyWhatsApp: familyWhatsApp,
      isVerified: true
    };

    onComplete(completeProfileData);
  };

  return (
    <div id="registration-wizard" className="bg-white rounded-3xl border border-[#D4AF37]/30 shadow-royal overflow-hidden">
      
      {/* Draft Auto-Saved alert */}
      {draftRestoredAlert && (
        <div className="bg-amber-50 border-b border-amber-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex gap-2 items-start">
            <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-800">Draft Profile Auto-Restored (ड्राफ्ट लोड हुआ)</p>
              <p className="text-[10px] text-amber-600">We restored your offline-first unsaved progress securely so you can resume where you left off.</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setDraftRestoredAlert(false)}
              className="text-[10px] font-bold uppercase tracking-wider bg-amber-200/50 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded transition-all cursor-pointer"
            >
              Continue drafting
            </button>
            <button
              onClick={handleClearDraft}
              className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" /> Discard & Reset
            </button>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#7A1F2B] to-[#B8860B] p-6 text-white text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.2),transparent)]"></div>
        <span className="font-cinzel text-xs uppercase tracking-widest text-[#D4AF37]">Samaj Sambandh Sutra</span>
        <h2 className="font-cinzel text-xl md:text-2xl font-bold">10-Step Royal Profile Builder</h2>
        <p className="text-xs text-[#F8F4EC]/80 font-serif italic mt-1">
          Complete your profile with authentic details to build trust among respected Mali Samaj families.
        </p>
      </div>

      {/* Progress indicators wrapper */}
      <div className="px-6 pt-6 pb-2 border-b border-gray-100 overflow-x-auto">
        <div className="flex gap-4 md:justify-between min-w-[800px] pb-3">
          {stepsList.map((item) => {
            const Icon = item.icon;
            const isActive = step === item.num;
            const isCompleted = step > item.num;
            return (
              <div 
                key={item.num} 
                onClick={() => { if (item.num < step || step === 10) setStep(item.num); }}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${step === 10 ? 'pointer-events-none' : ''}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition-all ${
                    isActive 
                      ? 'bg-[#7A1F2B] border-[#D4AF37] text-white scale-110 shadow-gold' 
                      : isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'bg-[#F8F4EC] border-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? "✓" : item.num}
                </div>
                <span className={`text-[10px] font-semibold tracking-tight ${isActive ? 'text-[#7A1F2B] font-bold' : isCompleted ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* State Bar */}
        <div className="w-full bg-[#F8F4EC] h-1.5 rounded-full overflow-hidden mt-2">
          <div 
            className="bg-gradient-to-r from-[#7A1F2B] to-[#D4AF37] h-1.5 transition-all duration-300" 
            style={{ width: `${(step / 10) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mt-3 text-xs">
          <span className="text-gray-500 font-medium">Steps Built: <strong className="text-[#7A1F2B]">{step}/10</strong></span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium text-[11px]">Real Match Weight Score:</span>
            <span className="bg-amber-100 text-[#7A1F2B] font-bold px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 border border-amber-200 shadow-sm">
              <Percent className="h-3 w-3 text-[#D4AF37] stroke-[3px]" /> {getCompletionPercentage()}% Profile Built
            </span>
          </div>
        </div>
      </div>

      {/* Step Contents */}
      <div className="p-6 md:p-8 min-h-[420px] space-y-6">
        
        {/* ⚡ Dynamic Fast-Track Quick Profile Mode Toggle & Profile Strength Advisor */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50/60 rounded-2xl border border-amber-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${quickProfileMode ? 'bg-[#7A1F2B]' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${quickProfileMode ? 'bg-[#7A1F2B]' : 'bg-emerald-500'}`}></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-sans">
                {quickProfileMode ? "⚡ Quick Register Mode Active" : "🌟 Full Trust Royal Profile"}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 max-w-xl font-sans leading-normal">
              {quickProfileMode 
                ? "Bypassed standard multi-step screens. You only need to verify Name, Gender, DOB, Own Gotra, Native District, and Occupation for instant activation!"
                : "Enter authentic inputs to earn our highest Golden Saini Trust badge and receive direct marriage proposals faster."
              }
            </p>
            
            {/* Automated Progress Guide */}
            {!quickProfileMode && getCompletionPercentage() < 80 && (
              <div className="text-[10px] text-[#7A1F2B] font-bold flex flex-wrap items-center gap-1.5 pt-1 font-sans">
                <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[9px]">DIRECTIONS</span>
                <span>Complete 3 more fields below to hit 80% strength! Next suggested:</span>
                <div className="inline-flex gap-1.5">
                  {[
                    { label: "Own Gotra", step: 2, val: gotra },
                    { label: "Native Village", step: 2, val: village },
                    { label: "Highest Education", step: 3, val: education },
                    { label: "Father Name", step: 4, val: fatherName },
                    { label: "Profile Photo", step: 7, val: mainPhoto === 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400' ? '' : 'ok' }
                  ]
                    .filter(item => !item.val)
                    .slice(0, 2)
                    .map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setStep(item.step)}
                        className="text-[9px] bg-white hover:bg-[#7A1F2B] hover:text-white border border-[#7A1F2B]/30 px-2 py-0.5 rounded transition-all cursor-pointer font-bold text-[#7A1F2B]"
                      >
                        ✎ Add {item.label}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={quickProfileMode}
                onChange={(e) => {
                  setQuickProfileMode(e.target.checked);
                  if (e.target.checked && step > 3 && step !== 10) {
                    setStep(3);
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#7A1F2B]"></div>
              <span className="ml-2 text-[11px] font-bold text-[#7A1F2B] select-none uppercase tracking-wider font-sans">2-Min Quick Register</span>
            </label>
          </div>
        </div>
        
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Step 1: Bride / Groom Basic Information</h3>
            
            <div className="bg-[#F8F4EC]/40 p-3.5 rounded-2xl border border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in shadow-sm">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 flex items-center justify-center sm:justify-start gap-1">
                  <Sparkles className="h-3 w-3 text-[#D4AF37] fill-[#D4AF37]" /> Smart Suggestions Desk
                </span>
                <p className="text-[11px] text-gray-500 font-sans">Reduce manual typing! Touch a capsule below to pre-populate authentic Rajasthani Samaj profile templates instantly.</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleAutofillSample('Male')}
                  className="bg-[#7A1F2B]/10 hover:bg-[#7A1F2B] hover:text-white border border-[#7A1F2B]/20 text-[#7A1F2B] font-bold text-[10px] py-1.5 px-3 rounded-full transition-all cursor-pointer shadow-sm uppercase font-sans tracking-wide"
                >
                  👨 Fill Jodhpur Groom (BTech)
                </button>
                <button
                  type="button"
                  onClick={() => handleAutofillSample('Female')}
                  className="bg-amber-500/10 hover:bg-amber-500 hover:text-white border border-amber-500/20 text-[#7A1F2B] font-bold text-[10px] py-1.5 px-3 rounded-full transition-all cursor-pointer shadow-sm uppercase font-sans tracking-wide"
                >
                  👩 Fill Jaipur Bride (Doctor)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Full Name of Bride / Groom</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]" 
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Gender</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setGender('Male')}
                    className={`py-2 px-4 rounded text-xs font-bold border transition-all ${gender === 'Male' ? 'bg-[#7A1F2B] border-[#D4AF37] text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    Male (Groom)
                  </button>
                  <button 
                    onClick={() => setGender('Female')}
                    className={`py-2 px-4 rounded text-xs font-bold border transition-all ${gender === 'Female' ? 'bg-[#7A1F2B] border-[#D4AF37] text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    Female (Bride)
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <SmartDatePicker 
                  value={dob} 
                  onChange={setDob} 
                  minAge={18}
                />
              </div>

              <div className="space-y-1">
                <SmartPhoneInput 
                  value={mobile} 
                  onChange={setMobile} 
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Email Address (For Secure Notifications)</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]" 
                  placeholder="e.g. ward.mali@gmail.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Profile Managed By</label>
                <select 
                  value={managedBy}
                  onChange={(e) => setManagedBy(e.target.value as any)}
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B]"
                >
                  <option value="Self">Self (Bride/Groom themselves)</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Relative">Relative / Guardian</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Current City of Residence (वर्तमान निवासी शहर)</label>
                <input 
                  type="text" 
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]" 
                  placeholder="e.g. Jodhpur, Pali, Jaipur, Mumbai"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Community details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-amber-50/50 p-4 rounded-xl border border-[#D4AF37]/25 flex items-start gap-2.5 text-[11px] text-[#7A1F2B]">
              <Sparkles className="h-4 w-4 shrink-0 mt-0.5 text-[#D4AF37]" />
              <div>
                <strong className="block font-cinzel">Traditional Rajasthan Mali Samaj Gotra Avoidance System</strong>
                To respect the community marriage laws, please record four distinct gotra lines (Own, Mother, Dadi, Nani). Our automated compatibly system uses these during active searches.
              </div>
            </div>

            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Step 2: Mali Samaj Clan & Location Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <SearchableGotraDropdown 
                label="1. Own Gotra (Paternal side)" 
                value={gotra} 
                onChange={setGotra} 
                idSuffix="own"
              />

              <SearchableGotraDropdown 
                label="2. Mother's Gotra" 
                value={motherGotra} 
                onChange={setMotherGotra} 
                idSuffix="mother"
              />

              <SearchableGotraDropdown 
                label="3. Grandmother's (Dadi) Gotra" 
                value={dadiGotra} 
                onChange={setDadiGotra} 
                idSuffix="dadi"
              />

              <SearchableGotraDropdown 
                label="4. Maternal Grandmother's (Nani) Gotra" 
                value={naniGotra} 
                onChange={setNaniGotra} 
                idSuffix="nani"
              />

              <div className="col-span-1 md:col-span-2 mt-4">
                <SearchableLocationSelector
                  district={district}
                  onDistrictChange={setDistrict}
                  tehsil={tehsil}
                  onTehsilChange={setTehsil}
                  village={village}
                  onVillageChange={setVillage}
                  inlineLayout={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Education & Career */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[#7A1F2B]" /> Step 3: Education, Occupation & Annual Income
            </h3>
            
            <CareerSection
              education={education}
              onEducationChange={(val) => {
                setEducation(val);
                if (eduError) setEduError('');
              }}
              college={college}
              onCollegeChange={setCollege}
              occupation={occupation}
              onOccupationChange={(val) => {
                setOccupation(val);
                if (eduError) setEduError('');
              }}
              company={company}
              onCompanyChange={setCompany}
              income={income}
              onIncomeChange={(val) => {
                setIncome(val);
                if (eduError) setEduError('');
              }}
              workType={workType}
              onWorkTypeChange={setWorkType}
              validationError={eduError || undefined}
            />
          </div>
        )}

        {/* Step 4: Family details */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Step 4: Parents & Family Setup details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Father's Full Name (पिता का नाम)</label>
                <input 
                  type="text" 
                  value={fatherName} 
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="e.g. Mr. Rameshwar Saini"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Father's Occupation (पिता का व्यवसाय/संस्था)</label>
                <input 
                  type="text" 
                  value={fatherOccupation} 
                  onChange={(e) => setFatherOccupation(e.target.value)}
                  placeholder="e.g. Retired Tehsildar, Organic Farmer"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Mother's Full Name (माता का नाम)</label>
                <input 
                  type="text" 
                  value={motherName} 
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder="e.g. Mrs. Kamala Devi"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Mother's Occupation (माता का व्यवसाय)</label>
                <input 
                  type="text" 
                  value={motherOccupation} 
                  onChange={(e) => setMotherOccupation(e.target.value)}
                  placeholder="e.g. Home Maker, School Teacher"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Family Type Setup</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setFamilyType('Joint')}
                    className={`py-2 px-4 rounded text-xs font-bold border transition-all ${familyType === 'Joint' ? 'bg-[#7A1F2B] border-[#D4AF37] text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    Joint Family (संयुक्त)
                  </button>
                  <button 
                    onClick={() => setFamilyType('Nuclear')}
                    className={`py-2 px-4 rounded text-xs font-bold border transition-all ${familyType === 'Nuclear' ? 'bg-[#7A1F2B] border-[#D4AF37] text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    Nuclear Family (एकल)
                  </button>
                </div>
              </div>

              <div className="space-y-1 relative" ref={familyStatusRef}>
                <label className="text-xs font-semibold text-gray-700 block">Family Social Class Status *</label>
                <button
                  type="button"
                  onClick={() => setIsFamilyStatusOpen(!isFamilyStatusOpen)}
                  className="w-full text-left text-xs p-3.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7A1F2B] flex justify-between items-center transition-all cursor-pointer shadow-sm hover:border-[#7A1F2B]/40"
                >
                  <span className="font-semibold text-slate-800">
                    {
                      (() => {
                        const options = [
                          { value: "Middle Class", label: "Middle Class (मध्यम वर्ग)" },
                          { value: "Upper Middle", label: "Upper Middle Class (उच्च मध्यम वर्ग)" },
                          { value: "Royal/Rich", label: "Royal / Rich (अभिजात वर्ग)" },
                          { value: "Conservative High Traditional", label: "Conservative Traditional (सनातनी संस्कारी)" }
                        ];
                        return options.find(o => o.value === familyStatus)?.label || "Select Social Status...";
                      })()
                    }
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isFamilyStatusOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {isFamilyStatusOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-royal max-h-56 overflow-hidden flex flex-col animate-fade-in">
                    <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-[#F8F4EC]/30">
                      <Search className="h-4 w-4 text-[#7A1F2B]" />
                      <input
                        type="text"
                        placeholder="Type to search (e.g. Middle, Royal)..."
                        value={familyStatusSearch}
                        onChange={(e) => setFamilyStatusSearch(e.target.value)}
                        className="w-full text-xs bg-transparent border-none outline-none py-1 text-gray-800"
                        autoFocus
                      />
                    </div>
                    <div className="overflow-y-auto max-h-40 py-1 divide-y divide-gray-50">
                      {
                        (() => {
                          const options = [
                            { value: "Middle Class", label: "Middle Class (मध्यम वर्ग)" },
                            { value: "Upper Middle", label: "Upper Middle Class (उच्च मध्यम वर्ग)" },
                            { value: "Royal/Rich", label: "Royal / Rich (अभिजात वर्ग)" },
                            { value: "Conservative High Traditional", label: "Conservative Traditional (सनातनी संस्कारी)" }
                          ];
                          const filtered = options.filter(o => 
                            o.label.toLowerCase().includes(familyStatusSearch.toLowerCase())
                          );
                          if (filtered.length === 0) {
                            return <div className="p-3 text-center text-[10px] text-gray-400">No matching statuses found.</div>;
                          }
                          return filtered.map((o) => (
                            <button
                              key={o.value}
                              type="button"
                              onClick={() => {
                                setFamilyStatus(o.value as any);
                                setIsFamilyStatusOpen(false);
                                setFamilyStatusSearch("");
                              }}
                              className="w-full text-left text-xs px-4 py-2.5 hover:bg-[#7A1F2B]/5 text-gray-700 flex items-center justify-between cursor-pointer"
                            >
                              <span className="font-sans font-medium">{o.label}</span>
                              {familyStatus === o.value && <Check className="h-3.5 w-3.5 text-[#7A1F2B] stroke-[3px]" />}
                            </button>
                          ));
                        })()
                      }
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Own Family House (स्वयं का मकान)</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Yes', 'No', 'Rented'] as const).map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setOwnHouse(h)}
                      className={`py-2 px-2 rounded text-[11px] font-bold border transition-all ${ownHouse === h ? 'bg-[#7A1F2B] border-[#D4AF37] text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {h === 'Yes' ? 'Yes (स्वयं का)' : h === 'No' ? 'No' : 'Rented (किराए का)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Brothers Status details</label>
                <input 
                  type="text" 
                  value={brothers} 
                  onChange={(e) => setBrothers(e.target.value)}
                  placeholder="e.g. 1 younger, none"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Sisters Status details</label>
                <input 
                  type="text" 
                  value={sisters} 
                  onChange={(e) => setSisters(e.target.value)}
                  placeholder="e.g. 2 sisters (both married), 1 younger"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              {/* Traditional Samaj requested fields */}
              <div className="space-y-1 md:col-span-2 border-t border-dashed border-[#D4AF37]/30 pt-4">
                <span className="text-[10px] font-bold text-[#7A1F2B] uppercase tracking-wider block mb-3">Traditional Heritage & Contact Assets</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-707 block mb-1">Do you own Agriculture Land? (क्या कृषि भूमि है?)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setHasAgricultureLand(true);
                        }}
                        className={`p-2 rounded text-xs font-semibold border transition-all ${hasAgricultureLand ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800' : 'border-gray-200 text-gray-500'}`}
                      >
                        Yes (हाँ)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setHasAgricultureLand(false);
                          setAgricultureLandDetails('No agriculture land');
                        }}
                        className={`p-2 rounded text-xs font-semibold border transition-all ${!hasAgricultureLand ? 'bg-gray-100 border-gray-400 text-gray-700' : 'border-gray-200 text-gray-500'}`}
                      >
                        No (नही)
                      </button>
                    </div>
                  </div>

                  {hasAgricultureLand && (
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-705 block flex items-center gap-1">
                        <Trees className="h-4 w-4 text-emerald-600 shrink-0" />
                        Agriculture Land Details (कृषि भूमि का विवरण)
                      </label>
                      <input 
                        type="text" 
                        value={agricultureLandDetails} 
                        onChange={(e) => setAgricultureLandDetails(e.target.value)}
                        placeholder="e.g. 6 Bigha irrigated land near Jodhpur canal"
                        className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-705 block flex items-center gap-1">
                      <Store className="h-4 w-4 text-amber-600 shrink-0" />
                      Family Business / Nursery Info (पारिवारिक व्यवसाय)
                    </label>
                    <input 
                      type="text" 
                      value={familyBusinessInfo} 
                      onChange={(e) => setFamilyBusinessInfo(e.target.value)}
                      placeholder="e.g. Saini Flower Nursery & Seed Shop, Jodhpur"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-705 block flex items-center gap-1">
                      <Clock className="h-4 w-4 text-sky-600 shrink-0" />
                      Family Contact Timing (बातचीत का सही समय)
                    </label>
                    <input 
                      type="text" 
                      value={familyContactTiming} 
                      onChange={(e) => setFamilyContactTiming(e.target.value)}
                      placeholder="e.g. 6:00 PM to 9:00 PM (After farm/business hours)"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-705 block flex items-center gap-1">
                      <User className="h-4 w-4 text-[#7A1F2B] shrink-0" />
                      Family Contact Person (परिवार में मुख्य संपर्क व्यक्ति)
                    </label>
                    <input 
                      type="text" 
                      value={familyContactPerson} 
                      onChange={(e) => setFamilyContactPerson(e.target.value)}
                      placeholder="e.g. Mr. Devaram Gehlot (Father)"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-705 block flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-[#25D366] shrink-0" />
                      Family WhatsApp Number (परिवार का व्हाट्सएप्प नंबर)
                    </label>
                    <input 
                      type="text" 
                      value={familyWhatsApp} 
                      onChange={(e) => setFamilyWhatsApp(e.target.value)}
                      placeholder="e.g. +91 94142 68241"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Marriage status, Lifestyle & Personality details */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Step 5: Marital Status, Lifestyle & Personality Traits</h3>
            <div className="space-y-6">
              
              {/* Marital status section */}
              <div className="space-y-2 pb-4 border-b border-gray-100">
                <span className="text-[10px] font-bold text-[#7A1F2B] uppercase tracking-wider block">Marital Status (वैवाहिक स्थिति)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        setMaritalStatus(status);
                        if (status === 'Never Married') { 
                          setDivorceStatus(''); 
                          setChildrenDetails(''); 
                          setDivorceYear('');
                        }
                      }}
                      className={`p-3 rounded text-xs font-bold border transition-all text-center ${maritalStatus === status ? 'bg-[#7A1F2B] border-[#D4AF37] text-white shadow' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {status === 'Never Married' ? 'Never Married (अविवाहित)' : status === 'Divorced' ? 'Divorced (तलाकशुदा)' : status === 'Widowed' ? 'Widow/Widower (विधुर/विधवा)' : 'Awaiting Divorce'}
                    </button>
                  ))}
                </div>
              </div>

              {maritalStatus !== 'Never Married' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-[#F8F4EC]/40 rounded-xl border border-[#D4AF37]/20">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#7A1F2B] block">Divorce Details / Event Reason</label>
                    <input 
                      type="text" 
                      value={divorceStatus} 
                      onChange={(e) => setDivorceStatus(e.target.value)}
                      placeholder="e.g. Legally Divorced, documents ready"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#7A1F2B] block">Divorce / Event Year (किस वर्ष हुआ)</label>
                    <input 
                      type="text" 
                      value={divorceYear} 
                      onChange={(e) => setDivorceYear(e.target.value)}
                      placeholder="e.g. 2023"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#7A1F2B] block">Children details (बच्चों की जानकारी)</label>
                    <input 
                      type="text" 
                      value={childrenDetails} 
                      onChange={(e) => setChildrenDetails(e.target.value)}
                      placeholder="e.g. None, 1 daughter (stays with mother)"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B]"
                    />
                  </div>
                </div>
              )}

              {/* Lifestyle Attributes */}
              <div className="space-y-4 pt-2 pb-4 border-b border-gray-100">
                <span className="text-[10px] font-bold text-[#7A1F2B] uppercase tracking-wider block">Lifestyle & Preferences (जीवनशैली विवरण)</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 block">Diet Preference (खान-पान)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Vegetarian', 'Non-Vegetarian'] as const).map((diet) => (
                        <button
                          key={diet}
                          type="button"
                          onClick={() => setDietPreference(diet as any)}
                          className={`p-2 rounded text-xs font-semibold border transition-all text-center ${dietPreference === diet ? 'bg-[#7A1F2B] text-white border-[#D4AF37]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                          {diet === 'Vegetarian' ? 'Vegetarian (शाकाहारी)' : 'Non-Veg (मांसाहारी)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 block">Smoking Status (धूम्रपान स्थिति)</label>
                    <select
                      value={smokingStatus}
                      onChange={(e) => setSmokingStatus(e.target.value as any)}
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B]"
                    >
                      <option value="No">No (कभी नहीं)</option>
                      <option value="Yes">Yes (हाँ)</option>
                      <option value="Occasionally">Occasionally (कभी-कभी)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 block">Drinking Status (मदिरापान स्थिति)</label>
                    <select
                      value={drinkingStatus}
                      onChange={(e) => setDrinkingStatus(e.target.value as any)}
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B]"
                    >
                      <option value="No">No (कभी नहीं)</option>
                      <option value="Yes">Yes (हाँ)</option>
                      <option value="Occasionally">Occasionally (कभी-कभी)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 block">Tobacco / Gutkha Status</label>
                    <select
                      value={tobaccoStatus}
                      onChange={(e) => setTobaccoStatus(e.target.value as any)}
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B]"
                    >
                      <option value="No">No (कभी नहीं)</option>
                      <option value="Yes">Yes (हाँ)</option>
                      <option value="Occasionally">Occasionally (कभी-कभी)</option>
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-700 block">Fitness Level (शारीरिक स्वास्थ्य स्तर)</label>
                    <div className="flex flex-wrap gap-2">
                      {(['Normal', 'Athletic', 'Gym Goer', 'Yoga Practitioner', 'Active'] as const).map((fit) => (
                        <button
                          key={fit}
                          type="button"
                          onClick={() => setFitnessLevel(fit)}
                          className={`py-1.5 px-3 rounded-full text-xs font-bold border transition-all ${fitnessLevel === fit ? 'bg-[#7A1F2B] border-[#D4AF37] text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                          {fit}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personality */}
              <div className="space-y-4 pt-2">
                <span className="text-[10px] font-bold text-[#7A1F2B] uppercase tracking-wider block">Personality Traits & Hobbies (व्यक्तित्व और रुचियां)</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 block">Personal Nature Description (स्वभाव विवरण)</label>
                    <input 
                      type="text"
                      value={nature}
                      onChange={(e) => setNature(e.target.value)}
                      placeholder="e.g. Calm, Kind-hearted, Respects Elders & Community values"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 block">Hobbies (शौक - comma separated)</label>
                    <input 
                      type="text"
                      value={hobbiesString}
                      onChange={(e) => setHobbiesString(e.target.value)}
                      placeholder="e.g. Cooking, Gardening, Classical Music"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-700 block">Key Interests (रुचियां - comma separated)</label>
                    <input 
                      type="text"
                      value={interestsString}
                      onChange={(e) => setInterestsString(e.target.value)}
                      placeholder="e.g. Traditional Cultures, Social Service, Organic Agriculture, Tech"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Step 6: Partner Pref */}
        {step === 6 && (
          <div className="space-y-6">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Step 6: Partner Preferences (वर-वधू अपेक्षा)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Preferred Age Range</label>
                <input 
                  type="text" 
                  value={preferredAge} 
                  onChange={(e) => setPreferredAge(e.target.value)}
                  placeholder="e.g. 24 - 28 years"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Preferred Districts or Regions</label>
                <input 
                  type="text" 
                  value={preferredDistrict} 
                  onChange={(e) => setPreferredDistrict(e.target.value)}
                  placeholder="e.g. Jodhpur, Pali, Bikaner"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Preferred Minimum Education level</label>
                <input 
                  type="text" 
                  value={preferredEducation} 
                  onChange={(e) => setPreferredEducation(e.target.value)}
                  placeholder="e.g. B.Tech, Graduate, MBBS"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Preferred Profession / Occupation Scope</label>
                <input 
                  type="text" 
                  value={preferredProfession} 
                  onChange={(e) => setPreferredProfession(e.target.value)}
                  placeholder="e.g. Government Job, Engineer, Doctor"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Photo upload presets */}
        {step === 7 && (
          <div className="space-y-6">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Step 7: Upload Display & Gallery Photos</h3>
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Main Profile Photo Selector */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-gray-700 block">Main Profile Avatar Display</span>
                  <div className="flex items-center gap-4">
                    <img 
                      src={mainPhoto} 
                      alt="Primary Display Profile" 
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-[#D4AF37] shadow"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 space-y-2">
                      <p className="text-[11px] text-gray-500">Pick a handsome/beautiful face preset for your test simulation:</p>
                      <div className="flex gap-2">
                        {[
                          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200", // male
                          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200", // female
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"  // male 2
                        ].map((url, i) => (
                          <button 
                            key={i}
                            onClick={() => setMainPhoto(url)}
                            className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${mainPhoto === url ? 'border-[#7A1F2B] scale-105' : 'border-transparent'}`}
                          >
                            <img src={url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* React-Dropzone custom drag and drop, crop, compress block */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-gray-700 block">Or upload and crop a custom picture</span>
                  <ImageDropzone 
                    gender={gender} 
                    currentImage={mainPhoto} 
                    onImageSelected={setMainPhoto} 
                  />
                </div>

              </div>

              {/* Female Photo Privacy System (सुरक्षित फोटो प्रणाली) */}
              {gender === 'Female' && (
                <div className="p-5 bg-rose-50/60 border border-rose-200/80 rounded-2xl space-y-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-rose-100 text-[#7A1F2B] rounded-full">
                      <EyeOff className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#7A1F2B] uppercase font-cinzel tracking-wider">Female Photo Privacy Guard</h4>
                      <p className="text-[10px] text-gray-500">Safeguarding matrimonial privacy within Mali Samaj traditions</p>
                    </div>
                  </div>
                  <p className="text-xs text-rose-800 leading-relaxed font-serif italic">
                    By activating Photo Privacy Guard, your uploaded display photos and offline galleries will appear blurred or locked to general seekers based on your chosen settings.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700 p-2 bg-white rounded border border-rose-100">
                      <input
                        type="radio"
                        name="photoPrivacyMode"
                        value="Visible"
                        checked={photoPrivacyMode === 'Visible'}
                        onChange={() => setPhotoPrivacyMode('Visible')}
                        className="text-[#7A1F2B] focus:ring-[#7A1F2B] h-4 w-4"
                      />
                      <span>Visible to All (सभी को दिखे)</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700 p-2 bg-white rounded border border-rose-100">
                      <input
                        type="radio"
                        name="photoPrivacyMode"
                        value="Blur"
                        checked={photoPrivacyMode === 'Blur'}
                        onChange={() => setPhotoPrivacyMode('Blur')}
                        className="text-[#7A1F2B] focus:ring-[#7A1F2B] h-4 w-4"
                      />
                      <span className="flex items-center gap-1 text-[#7A1F2B]">
                        <Lock className="h-3 w-3" /> Blur & Lock (ब्लर और लॉक)
                      </span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700 p-2 bg-white rounded border border-rose-100">
                      <input
                        type="radio"
                        name="photoPrivacyMode"
                        value="Verified Only"
                        checked={photoPrivacyMode === 'Verified Only'}
                        onChange={() => setPhotoPrivacyMode('Verified Only')}
                        className="text-[#7A1F2B] focus:ring-[#7A1F2B] h-4 w-4"
                      />
                      <span className="flex items-center gap-1 text-emerald-700">
                        <ShieldCheck className="h-3.5 w-3.5" /> Verified Only (सिर्फ सत्यापित सदस्य)
                      </span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700 p-2 bg-white rounded border border-rose-100">
                      <input
                        type="radio"
                        name="photoPrivacyMode"
                        value="Accepted Interest Only"
                        checked={photoPrivacyMode === 'Accepted Interest Only'}
                        onChange={() => setPhotoPrivacyMode('Accepted Interest Only')}
                        className="text-[#7A1F2B] focus:ring-[#7A1F2B] h-4 w-4"
                      />
                      <span className="flex items-center gap-1 text-amber-700">
                        <Heart className="h-3 w-3 fill-current" /> Accepted Interests Only (स्वीकृत संबंध)
                      </span>
                    </label>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Step 8: ID Verification inputs */}
        {step === 8 && (
          <div className="space-y-6">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Step 8: Identity Verification (Aadhaar & Live Camera Match)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Selfie capture */}
              <div className="border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm bg-[#F8F4EC]/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-50 text-pink-700 rounded-full">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">Live Captures Match check</h4>
                    <p className="text-[10px] text-gray-400">Takes 1 second via webcam</p>
                  </div>
                </div>
                
                {isSelfieCaptured ? (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center space-y-1">
                    <CheckCircle className="mx-auto h-6 w-6 text-emerald-600 animate-bounce" />
                    <span className="text-xs font-bold">Live Selfie Synced!</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setSelfie('selfie_taken_placeholder'); setIsSelfieCaptured(true); }}
                    className="w-full bg-[#7A1F2B] text-white py-2 px-4 rounded text-xs font-bold hover:bg-[#922a38] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Take Micro Selfie Match Check
                  </button>
                )}
              </div>

              {/* ID Upload */}
              <div className="border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm bg-[#F8F4EC]/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-full">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">Government Issued ID</h4>
                    <p className="text-[10px] text-gray-400">Aadhaar card or voter ID card</p>
                  </div>
                </div>

                {isIdUploaded ? (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center space-y-1">
                    <CheckCircle className="mx-auto h-6 w-6 text-emerald-600" />
                    <span className="text-xs font-bold">Government Document Authenticated!</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setGovId('gov_id_placeholder'); setIsIdUploaded(true); }}
                    className="w-full bg-[#7A1F2B] text-white py-2 px-4 rounded text-xs font-bold hover:bg-[#922a38] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Simulate Upload Aadhaar/PAN Card
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Step 9: Review Profile */}
        {step === 9 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-cinzel text-base font-bold text-[#7A1F2B]">Step 9: Royal Display Preview (प्रोफाइल पूर्वावलोकन)</h3>
                <p className="text-[10px] text-gray-500">This is exactly how other respected Mali Samaj members will see your profile live.</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" /> Premium Ready
              </span>
            </div>

            {/* High-fidelity Profile Card Mockup */}
            <div className="border border-[#D4AF37] rounded-3xl bg-white shadow-xl overflow-hidden max-w-3xl mx-auto">
              
              {/* Outer Header */}
              <div className="bg-gradient-to-r from-[#7A1F2B] via-[#8B2635] to-[#B8860B] px-5 py-4 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#D4AF37] text-gray-900 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                      {managedBy ? `Managed by ${managedBy}` : "Self"}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] text-emerald-200 font-mono tracking-wider font-bold">Active Now (ऑनलाइन)</span>
                  </div>
                  <h4 className="font-cinzel text-lg font-bold mt-1 tracking-wider text-[#F8F4EC]">{fullName || "Unnamed Candidate"}</h4>
                </div>
                <div className="text-right text-xs bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="block text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Native Ancestral Village</span>
                  <p className="font-bold">{village || "Salawas"}, {tehsil || "Luni"}</p>
                </div>
              </div>

              {/* Main Profile Breakdown */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8F4EC]/15">
                
                {/* Left Side: Photo with digital watermark and lock indicators */}
                <div className="md:col-span-4 flex flex-col items-center space-y-3">
                  <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-royal group bg-gray-100">
                    <img 
                      src={mainPhoto} 
                      alt="Candidate face" 
                      className={`w-full h-full object-cover transition-all duration-300 ${photoPrivacyMode === 'Blur' ? 'blur-md bg-gray-500/80 scale-105 select-none' : ''}`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                      <span className="text-gray-900 text-[8px] font-bold uppercase rotate-45 select-none">MALI RAJ-BANDHAN</span>
                    </div>

                    {/* Security Frame & Privacy Lock Simulator Overlay */}
                    {photoPrivacyMode === 'Blur' && (
                      <div className="absolute inset-0 bg-[#7A1F2B]/40 flex flex-col items-center justify-center p-3 text-center text-white backdrop-blur-xs">
                        <Lock className="h-6 w-6 text-[#D4AF37] mb-1 animate-bounce" />
                        <span className="text-[9px] font-bold tracking-widest uppercase text-[#D4AF37]">Locked Photo</span>
                        <p className="text-[8px] text-[#F8F4EC] mt-0.5">Unlock model active. Watermarked under privacy guard.</p>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-center text-gray-400 leading-tight">
                    {photoPrivacyMode === 'Blur' 
                      ? "🔒 Female privacy guard active: other accounts see this blurred lock screen." 
                      : "✓ Your photo is fully visible to active verified candidates."
                    }
                  </span>
                </div>

                {/* Right Side: Key Traditional Parameters */}
                <div className="md:col-span-8 space-y-4">
                  
                  {/* Personal stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] text-gray-600 border-b border-gray-100 pb-3">
                    <div>
                      <span className="text-gray-405 block text-[9px] uppercase font-bold text-amber-800">Age / Gender</span>
                      <strong className="text-gray-800">{gender} | {dob ? calculateAge(dob) : "28"} yrs</strong>
                    </div>
                    <div>
                      <span className="text-gray-405 block text-[9px] uppercase font-bold text-amber-800">Gotra (गोत्र)</span>
                      <strong className="text-[#7A1F2B] font-bold">{gotra || "Gehlot"}</strong>
                    </div>
                    <div>
                      <span className="text-gray-405 block text-[9px] uppercase font-bold text-amber-800">Marital Status</span>
                      <strong className="text-gray-800">{maritalStatus}</strong>
                    </div>
                  </div>

                  {/* Four Gotras details card */}
                  <div className="p-3 bg-amber-50/40 border border-[#D4AF37]/20 rounded-xl space-y-1.5">
                    <span className="text-[9px] font-bold text-[#7A1F2B] uppercase tracking-wider block">Ancestral Four Gotras Chart (चार गोत्र)</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div><strong>Paternal (पिता):</strong> {gotra}</div>
                      <div><strong>Maternal (माता):</strong> {motherGotra || "Not specified"}</div>
                      <div><strong>Paternal Dadi (दादी):</strong> {dadiGotra || "Not specified"}</div>
                      <div><strong>Maternal Nani (नानी):</strong> {naniGotra || "Not specified"}</div>
                    </div>
                  </div>

                  {/* Career parameters block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                      <span className="text-[9px] uppercase block font-bold text-gray-400">Education Background</span>
                      <strong className="text-gray-800 text-[11px] block mt-0.5">{education || "Not specified"}</strong>
                      <span className="text-[10px] text-gray-500">{college || ""}</span>
                    </div>
                    <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                      <span className="text-[9px] uppercase block font-bold text-gray-400">Occupation & Income</span>
                      <strong className="text-gray-800 text-[11px] block mt-0.5">{occupation || "Farmer / Businessman"}</strong>
                      <span className="text-[10px] text-emerald-700 font-semibold">{income || "₹5-8 Lakh"}</span>
                    </div>
                  </div>

                  {/* Lifestyle & Personality indicators */}
                  <div className="p-3 bg-[#F8F4EC]/60 border border-[#D4AF37]/20 rounded-xl space-y-1.5 text-[11px] text-gray-700">
                    <span className="text-[9px] uppercase font-bold text-[#7A1F2B] tracking-wider block">Lifestyle & Personality Traits</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>🍃 <strong>Diet Preference:</strong> {dietPreference || "Vegetarian"}</div>
                      <div>💪 <strong>Fitness:</strong> {fitnessLevel || "Normal"}</div>
                      <div>🌸 <strong>Nature:</strong> {nature || "Calm & Traditional Values"}</div>
                      <div>🎨 <strong>Hobbies:</strong> {hobbiesString || "Gardening, Devotional Music"}</div>
                      {interestsString && <div className="sm:col-span-2">🌟 <strong>Interests:</strong> {interestsString}</div>}
                    </div>
                  </div>

                  {/* Traditional values panel */}
                  <div className="bg-[#7A1F2B]/5 p-3.5 rounded-xl border border-[#7A1F2B]/10 space-y-2 text-[11px]">
                    <span className="text-[9px] uppercase font-bold text-[#7A1F2B] tracking-wider block">Samaj Assets & Contact preferences</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 text-gray-700">
                      <div>💼 <strong>Family Business:</strong> {familyBusinessInfo || "Nursery Garden Setup"}</div>
                      <div>🚜 <strong>Agricultural Land:</strong> {agricultureLandDetails || "None / Business"}</div>
                      {familyContactPerson && <div>👤 <strong>Contact Person:</strong> {familyContactPerson}</div>}
                      {familyWhatsApp && <div>💬 <strong>WhatsApp Code:</strong> <span className="text-emerald-700 font-bold">{familyWhatsApp}</span></div>}
                      <div className="sm:col-span-2 text-[#7A1F2B] font-medium mt-1">
                        📞 <strong>Ideal Dial Timing:</strong> {familyContactTiming || "6:00 PM to 9:00 PM"}
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* Step 10: Complete Profile Success */}
        {step === 10 && (
          <div className="space-y-6 text-center max-w-xl mx-auto py-8">
            <div className="w-16 h-16 bg-[#F8F4EC] border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#7A1F2B]">
              <Star className="h-8 w-8 animate-spin" />
            </div>
            
            <div className="space-y-2">
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-600 block">Bandhan Sahayata Certificate</span>
              <h3 className="font-cinzel text-2xl font-bold text-[#7A1F2B]">Sutra Bind-Lock Complete!</h3>
              <p className="font-serif italic text-gray-500 text-xs">
                Congratulations, respected elder! The profile of <strong>{fullName}</strong> ({gotra} Gotra) has been completely structured and registered in the offline-first secure simulated Mali registry database.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-left">
              <ShieldCheck className="h-10 w-10 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-emerald-800">Aadhaar verified badge active!</h4>
                <p className="text-[11px] text-emerald-700">Because you uploaded simulated verification documents, your bio now features the certified royal badge, increasing matches by 400%.</p>
              </div>
            </div>

            {/* Simulated instant family introduce scheduler slot */}
            <div className="border-t border-dashed border-gray-200 pt-6 text-left">
              <FamilyCallScheduler 
                candidateName={`${fullName} (${gotra} Gotra)`} 
                inlineLayout={true} 
              />
            </div>

            <button 
              onClick={handleFinalSubmit}
              className="bg-gradient-to-r from-[#7A1F2B] to-[#B8860B] text-white hover:to-[#922a38] text-xs font-bold uppercase tracking-widest py-3 px-8 rounded-lg shadow-royal border border-[#D4AF37] transition-all cursor-pointer w-full text-center block"
            >
              Enter Maharaja Dashboard Now
            </button>
          </div>
        )}

      </div>

      {/* Button Controls */}
      {step < 10 && (
        <div className="p-6 bg-[#F8F4EC] border-t border-[#D4AF37]/30 flex justify-between">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
              step === 1 ? 'text-gray-300 pointer-events-none border border-transparent' : 'border border-[#D4AF37] text-[#7A1F2B] bg-white hover:bg-[#7A1F2B]/5 shadow-sm'
            }`}
          >
            <ChevronLeft className="h-4 w-4" /> Back / Previous
          </button>

          <button 
            onClick={handleNext}
            className="bg-[#7A1F2B] hover:bg-[#601923] text-white flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md border-b-4 border-[#5A1720] shadow-md transition-all cursor-pointer"
          >
            Next step <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
}
