import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BookOpen, Briefcase, IndianRupee, Building2, Search, Check, ChevronDown, 
  Sparkles, Info, AlertCircle, Wrench, GraduationCap, Coins 
} from 'lucide-react';

// Data definitions as requested
export const EDUCATION_OPTIONS = [
  "No Formal Education",
  "Primary School",
  "5th Pass",
  "8th Pass",
  "10th Pass",
  "12th Pass",
  "ITI",
  "Polytechnic",
  "Diploma",
  "BA",
  "BCom",
  "BSc",
  "BCA",
  "BTech",
  "MA",
  "MCom",
  "MSc",
  "MCA",
  "MBA",
  "PhD",
  "Other"
];

export const OCCUPATION_OPTIONS = [
  "Farmer",
  "Agriculture Business",
  "Vegetable Business",
  "Fruit Business",
  "Flower Farming",
  "Nursery Business",
  "Shop Owner",
  "Kirana Store",
  "Dairy Farming",
  "Contractor",
  "Building Construction",
  "Raj Mistri",
  "Carpenter",
  "Khati Work",
  "Furniture Business",
  "Electrician",
  "Plumber",
  "Welder",
  "Painter",
  "Driver",
  "Mechanic",
  "Security Guard",
  "Private Employee",
  "Government Employee",
  "Teacher",
  "Professor",
  "Doctor",
  "Nurse",
  "Engineer",
  "Software Developer",
  "Business Owner",
  "Hotel Owner",
  "PG Owner",
  "Hostel Owner",
  "Restaurant Owner",
  "Property Dealer",
  "Self Employed",
  "Student",
  "Homemaker",
  "Retired",
  "Other"
];

export const WORK_TYPE_OPTIONS = [
  "Government",
  "Private",
  "Business",
  "Self Employed",
  "Agriculture",
  "Skilled Trade",
  "Student"
];

export const INCOME_OPTIONS = [
  "No Income",
  "Below ₹1 Lakh",
  "₹1-3 Lakh",
  "₹3-5 Lakh",
  "₹5-8 Lakh",
  "₹8-12 Lakh",
  "₹12-20 Lakh",
  "₹20-50 Lakh",
  "₹50 Lakh+",
  "Prefer Not To Say"
];

export const CUSTOM_OCCUPATION_EXAMPLES = [
  "Khati Work",
  "Furniture Manufacturing",
  "Tent Business",
  "Catering Service",
  "Granite Work",
  "Marble Work",
  "Mobile Shop",
  "E-Mitra",
  "CSC Center",
  "Dairy Business",
  "Transport Business",
  "Hardware Shop",
  "Building Material Supplier"
];

interface CareerSectionProps {
  education: string;
  onEducationChange: (val: string) => void;
  college: string;
  onCollegeChange: (val: string) => void;
  occupation: string;
  onOccupationChange: (val: string) => void;
  company: string;
  onCompanyChange: (val: string) => void;
  income: string;
  onIncomeChange: (val: string) => void;
  workType?: string;
  onWorkTypeChange?: (val: string) => void;
  validationError?: string;
}

export default function CareerSection({
  education,
  onEducationChange,
  college,
  onCollegeChange,
  occupation,
  onOccupationChange,
  company,
  onCompanyChange,
  income,
  onIncomeChange,
  workType = "Self Employed",
  onWorkTypeChange,
  validationError
}: CareerSectionProps) {
  
  // Search state for Education
  const [isEduOpen, setIsEduOpen] = useState(false);
  const [eduSearch, setEduSearch] = useState("");
  const eduRef = useRef<HTMLDivElement>(null);

  // Search state for Occupation
  const [isOccOpen, setIsOccOpen] = useState(false);
  const [occSearch, setOccSearch] = useState("");
  const occRef = useRef<HTMLDivElement>(null);

  // Search state for Work Type
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);

  // Search state for Income
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const incomeRef = useRef<HTMLDivElement>(null);

  // Custom occupation input state (if selected "Other" or custom name is typed)
  const isOtherOccupation = useMemo(() => {
    // If the selected occupation isn't in main options or is specifically "Other"
    return occupation === "Other" || (!OCCUPATION_OPTIONS.includes(occupation) && occupation.trim() !== "");
  }, [occupation]);

  const [customOccVal, setCustomOccVal] = useState(
    OCCUPATION_OPTIONS.includes(occupation) ? "" : occupation
  );

  // Keep custom input value synced if changed
  useEffect(() => {
    if (!OCCUPATION_OPTIONS.includes(occupation)) {
      setCustomOccVal(occupation);
    }
  }, [occupation]);

  // Handle click outside for dropdown closings
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (eduRef.current && !eduRef.current.contains(event.target as Node)) {
        setIsEduOpen(false);
      }
      if (occRef.current && !occRef.current.contains(event.target as Node)) {
        setIsOccOpen(false);
      }
      if (workRef.current && !workRef.current.contains(event.target as Node)) {
        setIsWorkOpen(false);
      }
      if (incomeRef.current && !incomeRef.current.contains(event.target as Node)) {
        setIsIncomeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered lists
  const filteredEdu = useMemo(() => {
    if (!eduSearch.trim()) return EDUCATION_OPTIONS;
    return EDUCATION_OPTIONS.filter(e => e.toLowerCase().includes(eduSearch.toLowerCase()));
  }, [eduSearch]);

  const filteredOcc = useMemo(() => {
    if (!occSearch.trim()) return OCCUPATION_OPTIONS;
    return OCCUPATION_OPTIONS.filter(o => o.toLowerCase().includes(occSearch.toLowerCase()));
  }, [occSearch]);

  const selectEducation = (val: string) => {
    onEducationChange(val);
    setEduSearch("");
    setIsEduOpen(false);
  };

  const selectOccupation = (val: string) => {
    onOccupationChange(val);
    if (val === "Other") {
      setCustomOccVal("");
    }
    setOccSearch("");
    setIsOccOpen(false);
  };

  const handleCustomOccChange = (val: string) => {
    setCustomOccVal(val);
    onOccupationChange(val);
  };

  return (
    <div className="bg-[#F8F4EC]/40 p-6 md:p-8 rounded-3xl border border-amber-900/10 space-y-6">
      
      {validationError && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-r-xl flex items-start gap-2 animate-fade-in text-xs">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Information Required:</span> {validationError}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. HIGHEST EDUCATION - SEARCHABLE DROP-DOWN */}
        <div className="space-y-1.5 relative animate-fade-in" ref={eduRef}>
          <label className="text-xs font-bold text-[#7A1F2B] flex items-center gap-1.5 uppercase tracking-wider">
            <GraduationCap className="h-4 w-4 text-[#7A1F2B]" /> Educational Qualification (शैक्षणिक योग्यता) *
          </label>
          <button
            type="button"
            onClick={() => setIsEduOpen(!isEduOpen)}
            className="w-full text-left text-xs p-3.5 border border-amber-900/20 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7A1F2B] flex justify-between items-center transition-all cursor-pointer shadow-sm hover:border-[#7A1F2B]/40"
          >
            <span className={education ? "text-slate-800 font-semibold" : "text-gray-400"}>
              {education || "Select Highest Education..."}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {isEduOpen && (
            <div className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-64 overflow-hidden flex flex-col animate-fade-in">
              <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-[#F8F4EC]/30">
                <Search className="h-4 w-4 text-[#7A1F2B]" />
                <input
                  type="text"
                  placeholder="Search education (e.g. ITI, BTech, MA)..."
                  value={eduSearch}
                  onChange={(e) => setEduSearch(e.target.value)}
                  className="w-full text-xs bg-transparent border-none outline-none py-1.5 text-gray-800"
                  autoFocus
                />
              </div>
              <div className="overflow-y-auto flex-1 divide-y divide-gray-50 py-1 max-h-48">
                {filteredEdu.length === 0 ? (
                  <button
                    type="button"
                    onClick={() => selectEducation(eduSearch)}
                    className="w-full text-left text-xs px-4 py-2.5 text-gray-600 hover:bg-[#7A1F2B]/5 flex items-center gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" /> Select custom: "{eduSearch}"
                  </button>
                ) : (
                  filteredEdu.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectEducation(option)}
                      className="w-full text-left text-xs px-4 py-2.5 hover:bg-[#7A1F2B]/5 text-gray-700 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="font-sans font-medium">{option}</span>
                      {education === option && <Check className="h-3.5 w-3.5 text-[#7A1F2B] stroke-[3px]" />}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* COLLEGE / SCHOOL / INSTITUTE */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#7A1F2B] block uppercase tracking-wider">
            College / School Name (विद्यालय / कॉलेज का नाम)
          </label>
          <input
            type="text"
            value={college}
            onChange={(e) => onCollegeChange(e.target.value)}
            placeholder="e.g. Govt Senior Secondary School, JNVU Jodhpur"
            className="w-full text-xs p-3.5 border border-amber-900/20 rounded-xl bg-white focus:outline-[#7A1F2B] shadow-sm font-sans"
          />
        </div>

        {/* 2. OCCUPATION CATEGORY - SEARCHABLE DROP-DOWN */}
        <div className="space-y-1.5 relative" ref={occRef}>
          <label className="text-xs font-bold text-[#7A1F2B] flex items-center gap-1.5 uppercase tracking-wider">
            <Briefcase className="h-4 w-4 text-[#7A1F2B]" /> Occupation / Profession Sector (कार्यक्षेत्र) *
          </label>
          <button
            type="button"
            onClick={() => setIsOccOpen(!isOccOpen)}
            className="w-full text-left text-xs p-3.5 border border-amber-900/20 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7A1F2B] flex justify-between items-center transition-all cursor-pointer shadow-sm hover:border-[#7A1F2B]/40"
          >
            <span className="text-slate-800 font-semibold truncate">
              {OCCUPATION_OPTIONS.includes(occupation) 
                ? occupation 
                : occupation 
                  ? `${occupation} (Custom)` 
                  : "Select Occupation Category..."
              }
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {isOccOpen && (
            <div className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-64 overflow-hidden flex flex-col animate-fade-in">
              <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-[#F8F4EC]/30">
                <Search className="h-4 w-4 text-[#7A1F2B]" />
                <input
                  type="text"
                  placeholder="Search occupation (e.g. Farmer, Contractor, Teacher)..."
                  value={occSearch}
                  onChange={(e) => setOccSearch(e.target.value)}
                  className="w-full text-xs bg-transparent border-none outline-none py-1.5 text-gray-800"
                  autoFocus
                />
              </div>
              <div className="overflow-y-auto flex-1 divide-y divide-gray-50 py-1 max-h-48">
                {filteredOcc.length === 0 ? (
                  <button
                    type="button"
                    onClick={() => selectOccupation(occSearch)}
                    className="w-full text-left text-xs px-4 py-2.5 text-gray-600 hover:bg-[#7A1F2B]/5 flex items-center gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" /> Select custom: "{occSearch}"
                  </button>
                ) : (
                  filteredOcc.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectOccupation(option)}
                      className="w-full text-left text-xs px-4 py-2.5 hover:bg-[#7A1F2B]/5 text-gray-700 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="font-sans font-medium">{option}</span>
                      {occupation === option && <Check className="h-3.5 w-3.5 text-[#7A1F2B] stroke-[3px]" />}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3. WORK TYPE - SIMPLE SELECT */}
        <div className="space-y-1.5 relative" ref={workRef}>
          <label className="text-xs font-bold text-[#7A1F2B] flex items-center gap-1.5 uppercase tracking-wider">
            <Building2 className="h-4 w-4 text-[#7A1F2B]" /> Employment Sector / Work Type (कार्य का प्रकार) *
          </label>
          <button
            type="button"
            onClick={() => setIsWorkOpen(!isWorkOpen)}
            className="w-full text-left text-xs p-3.5 border border-amber-900/20 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7A1F2B] flex justify-between items-center transition-all cursor-pointer shadow-sm hover:border-[#7A1F2B]/40"
          >
            <span className="text-slate-800 font-semibold">
              {workType || "Select Work Type..."}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {isWorkOpen && (
            <div className="absolute z-25 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-56 overflow-y-auto py-1 animate-fade-in divide-y divide-gray-50">
              {WORK_TYPE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (onWorkTypeChange) onWorkTypeChange(option);
                    setIsWorkOpen(false);
                  }}
                  className="w-full text-left text-xs px-4 py-2.5 hover:bg-[#7A1F2B]/5 text-gray-700 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="font-sans font-medium">{option}</span>
                  {workType === option && <Check className="h-3.5 w-3.5 text-[#7A1F2B] stroke-[3px]" />}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 4. OTHER / CUSTOM OCCUPATION SPECIFICATION & EXAMPLES */}
      {isOtherOccupation && (
        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-500/10 space-y-3.5 animate-slide-in">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#7A1F2B] block tracking-wide uppercase">
              Enter Your Occupation (कृपया अपना व्यवसाय / कार्य विस्तार दर्ज करें) *
            </label>
            <input
              type="text"
              required
              value={customOccVal}
              onChange={(e) => handleCustomOccChange(e.target.value)}
              placeholder="e.g. Furniture Manufacturing, Catering Service, E-Mitra center"
              className="w-full text-xs p-3 border border-amber-900/30 rounded-xl bg-white focus:outline-[#7A1F2B] font-sans font-medium shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <Wrench className="h-3.5 w-3.5 text-[#D4AF37]" /> Click to select sample common occupations in Mali Samaj:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CUSTOM_OCCUPATION_EXAMPLES.map((example) => (
                <button
                  type="button"
                  key={example}
                  onClick={() => handleCustomOccChange(example)}
                  className={`text-[10px] px-2.5 py-1.5 rounded-lg border font-sans font-semibold transition-all ${
                    customOccVal.toLowerCase() === example.toLowerCase()
                      ? 'bg-[#7A1F2B]/10 border-[#7A1F2B] text-[#7A1F2B]'
                      : 'bg-white border-gray-200 hover:border-amber-500/30 hover:bg-amber-50/20 text-slate-600'
                  }`}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* EMPLOYER / BUSINESS NAME */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#7A1F2B] block uppercase tracking-wider">
            Employer Company / Business Name (कंपनी या दुकान का नाम)
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => onCompanyChange(e.target.value)}
            placeholder="e.g. Saini General Store, Balaji Granite, Self-Employed"
            className="w-full text-xs p-3.5 border border-amber-900/20 rounded-xl bg-white focus:outline-[#7A1F2B] shadow-sm font-sans"
          />
        </div>

        {/* 5. INCOME RANGE - SEARCHABLE DROP-DOWN */}
        <div className="space-y-1.5 relative animate-fade-in" ref={incomeRef}>
          <label className="text-xs font-bold text-[#7A1F2B] flex items-center gap-1.5 uppercase tracking-wider">
            <Coins className="h-4 w-4 text-[#7A1F2B]" /> Annual Personal / Family Income (वार्षिक आय) *
          </label>
          <button
            type="button"
            onClick={() => setIsIncomeOpen(!isIncomeOpen)}
            className="w-full text-left text-xs p-3.5 border border-amber-900/20 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7A1F2B] flex justify-between items-center transition-all cursor-pointer shadow-sm hover:border-[#7A1F2B]/40"
          >
            <span className={income ? "text-slate-800 font-semibold" : "text-gray-400"}>
              {income || "Select Annual Income range..."}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {isIncomeOpen && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-56 overflow-y-auto py-1 animate-fade-in divide-y divide-gray-50">
              {INCOME_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onIncomeChange(option);
                    setIsIncomeOpen(false);
                  }}
                  className="w-full text-left text-xs px-4 py-2.5 hover:bg-[#7A1F2B]/5 text-gray-700 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="font-sans font-medium">{option}</span>
                  {income === option && <Check className="h-3.5 w-3.5 text-[#7A1F2B] stroke-[3px]" />}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
