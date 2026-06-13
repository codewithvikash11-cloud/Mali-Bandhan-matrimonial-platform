import React, { useState } from 'react';
import { 
  User, MapPin, Briefcase, Users, Heart, Sparkles, Image, CheckCircle, Eye, Star, ShieldCheck, ChevronRight, ChevronLeft, Upload, FileText
} from 'lucide-react';
import SearchableGotraDropdown from './SearchableGotraDropdown';
import SearchableLocationSelector from './SearchableLocationSelector';
import CareerSection from './CareerSection';

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

  const stepsList = [
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
    }
    if (step < 10) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
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
      education: education,
      college: college,
      occupation: occupation,
      company: company,
      income: income,
      workType: workType,
      fatherName: fatherName,
      motherName: motherName,
      familyType: familyType,
      brothers: brothers,
      sisters: sisters,
      maritalStatus: maritalStatus,
      divorceStatus: divorceStatus,
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
      profileCompletion: 100,
      lastActive: "Active now",
      isOnline: true
    };

    onComplete(completeProfileData);
  };

  return (
    <div id="registration-wizard" className="bg-white rounded-3xl border border-[#D4AF37]/30 shadow-royal overflow-hidden">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#7A1F2B] top to-[#B8860B] p-6 text-white text-center relative">
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
      </div>

      {/* Step Contents */}
      <div className="p-6 md:p-8 min-h-[420px]">
        
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Step 1: Bride / Groom Basic Information</h3>
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
                <label className="text-xs font-semibold text-gray-700 block">Date of Birth</label>
                <input 
                  type="date" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Contact Mobile Number (Parents/Groom)</label>
                <input 
                  type="tel" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]" 
                  placeholder="e.g. +91 94140 XXXXX"
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
                <label className="text-xs font-semibold text-gray-700 block">Father's Full Name (with Occupation)</label>
                <input 
                  type="text" 
                  value={fatherName} 
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="e.g. Mr. Rameshwar Saini (Agriculturist/Retired)"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Mother's Full Name (with Occupation)</label>
                <input 
                  type="text" 
                  value={motherName} 
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder="e.g. Mrs. Kamala Devi (Home Maker)"
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

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 block">Sisters Status details</label>
                <input 
                  type="text" 
                  value={sisters} 
                  onChange={(e) => setSisters(e.target.value)}
                  placeholder="e.g. 2 sisters (both married), 1 younger"
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Marriage status details */}
        {step === 5 && (
          <div className="space-y-6">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Step 5: Marital Status & Prior Marriage Profile</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 block">Marital Status</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        setMaritalStatus(status);
                        if (status === 'Never Married') { setDivorceStatus(''); setChildrenDetails(''); }
                      }}
                      className={`p-3 rounded text-xs font-bold border transition-all text-center ${maritalStatus === status ? 'bg-[#7A1F2B] border-[#D4AF37] text-white shadow' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {maritalStatus !== 'Never Married' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#F8F4EC]/40 rounded-xl border border-[#D4AF37]/20">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#7A1F2B] block">Divorce details / Widow Reason (Confidential)</label>
                    <input 
                      type="text" 
                      value={divorceStatus} 
                      onChange={(e) => setDivorceStatus(e.target.value)}
                      placeholder="e.g. Legally Divorced, documents ready"
                      className="w-full text-xs p-3 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#7A1F2B] block">Children details (If Any)</label>
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

                {/* Simulated Custom Photo Drag/Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-[#D4AF37] transition-all flex flex-col justify-center items-center bg-[#F8F4EC]/20">
                  <Upload className="h-6 w-6 text-amber-600 mb-2" />
                  <span className="text-xs font-bold text-gray-700">Drag & Drop Your Offline Gallery Images</span>
                  <p className="text-[10px] text-gray-400 mt-1">PNG, JPG format up to 5MB. Photo is protected with secure digital signature watermarks.</p>
                </div>

              </div>

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
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Step 9: Review Your Mali Raj-Bandhan profile details</h3>
            
            <div className="bg-[#F8F4EC]/40 p-5 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-600">
              
              <div className="flex flex-col items-center text-center space-y-2">
                <img src={mainPhoto} alt="Draft display visual" className="w-24 h-24 rounded-2xl object-cover border-2 border-[#D4AF37]" referrerPolicy="no-referrer" />
                <span className="font-bold text-gray-800">{fullName}</span>
                <span className="bg-[#7A1F2B] text-white text-[9px] px-2.5 py-0.5 rounded-full font-cinzel">{gender} | {gotra} Gotra</span>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="grid grid-cols-2 gap-y-1.5 border-b border-gray-100 pb-2">
                  <div><strong>DOB:</strong> {dob}</div>
                  <div><strong>District:</strong> {district}, {tehsil}</div>
                  <div><strong>Education:</strong> {education}</div>
                  <div><strong>Occupation:</strong> {occupation} at {company}</div>
                  <div><strong>Income level:</strong> {income}</div>
                  <div><strong>Marital Status:</strong> {maritalStatus}</div>
                </div>
                <div className="grid grid-cols-1 gap-y-1 bg-amber-50/40 p-2.5 rounded border border-[#D4AF37]/20">
                  <div className="text-[10px] uppercase font-bold text-[#7A1F2B]">Partner Preference Preview:</div>
                  <div className="text-[10px]"><strong>Age/Region:</strong> {preferredAge} yrs in {preferredDistrict}</div>
                  <div className="text-[10px]"><strong>Education/Job:</strong> {preferredEducation} / {preferredProfession}</div>
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

            <button 
              onClick={handleFinalSubmit}
              className="bg-gradient-to-r from-[#7A1F2B] to-[#B8860B] text-white hover:to-[#922a38] text-xs font-bold uppercase tracking-widest py-3 px-8 rounded-lg shadow-royal border border-[#D4AF37] transition-all cursor-pointer"
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
