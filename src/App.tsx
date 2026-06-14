import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { 
  Users, Search, Bookmark, Award, Bell, Settings, Heart, HelpCircle, Scale, Sparkles, 
  MapPin, Landmark, ShieldCheck, Mail, Lock, Phone, User, Check, AlertCircle, Eye, 
  ChevronRight, ArrowRight, UserCheck, Star, Send, Filter, LogOut, CheckCircle, Flame, ChevronDown, Clock
} from 'lucide-react';
import { Profile, ScreenState, NotificationItem, SuccessStory } from './types';
import { INITIAL_PROFILES, SUCCESS_STORIES, INITIAL_NOTIFICATIONS } from './mockData';
import { isAppwriteReady, loadAllProfiles, fetchUserProfile, saveUserProfile } from './lib/appwrite';

// Component Imports
import HeritagePage from './components/HeritagePage';
import SuccessStories from './components/SuccessStories';
import HelpCenter from './components/HelpCenter';
import LegalPages from './components/LegalPages';
import Wizard from './components/Wizard';
import MembershipAndPayment from './components/MembershipAndPayment';
import MaliAssistant from './components/MaliAssistant';
import { locationDb } from './locationDb';
import { EDUCATION_OPTIONS, OCCUPATION_OPTIONS, INCOME_OPTIONS } from './components/CareerSection';

export default function App() {
  const { 
    user, 
    login: apiLogin, 
    register: apiRegister, 
    logout: apiLogout, 
    sendPasswordReset, 
    isLoading: isAuthLoading,
    error: authError,
    clearError
  } = useAuth();

  // Navigation State
  const [activeView, setActiveView] = useState<ScreenState>('AUTH_LOGIN');
  
  // Simulated State Database
  const [profiles, setProfiles] = useState<Profile[]>(INITIAL_PROFILES);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>(SUCCESS_STORIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  
  // Active Authenticated User Profile (Initially Null for login screens)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  // Load ALL candidate profiles from Appwrite if ready, or stay with memory list
  useEffect(() => {
    const fetchAllAppwriteProfiles = async () => {
      if (isAppwriteReady()) {
        try {
          const dbProfiles = await loadAllProfiles();
          if (dbProfiles && dbProfiles.length > 0) {
            setProfiles(dbProfiles);
          }
        } catch (err) {
          console.error("Failed to load profiles from Appwrite databases:", err);
        }
      }
    };
    fetchAllAppwriteProfiles();
  }, [user]);

  // Sync session state to matrimonial candidate profile (Appwrite or Local Fallback)
  useEffect(() => {
    const syncProfile = async () => {
      if (user) {
        if (isAppwriteReady()) {
          try {
            let dbProfile = await fetchUserProfile(user.id);
            if (dbProfile) {
              // Real-time online activity heartbeat update
              dbProfile.isOnline = true;
              dbProfile.lastActive = new Date().toISOString();
              try {
                dbProfile = await saveUserProfile(user.id, dbProfile);
              } catch (saveErr) {
                console.error("Failed to update user's online state:", saveErr);
              }

              setCurrentUser(dbProfile);
              // Ensure registered user is in local memory profiles array
              setProfiles(prev => {
                if (!prev.some(p => p.id === dbProfile.id)) {
                  return [dbProfile, ...prev];
                }
                return prev.map(p => p.id === dbProfile.id ? dbProfile : p);
              });
              if (activeView.startsWith('AUTH_')) {
                setActiveView('DASHBOARD');
              }
            } else {
              // Valid login session but no candidate profile document created yet -> launch Setup Wizard
              if (activeView.startsWith('AUTH_')) {
                setActiveView('WIZARD');
              }
            }
          } catch (err) {
            console.error("Error fetching user profile from Appwrite:", err);
          }
        } else {
          // Offline/Mock Fallback Mode execution
          const emailMatch = user.email ? user.email.toLowerCase() : '';
          const matched = profiles.find(
            (p) => (p.email && p.email.toLowerCase() === emailMatch) || p.id === user.id
          );
          if (matched) {
            setCurrentUser(matched);
            if (activeView.startsWith('AUTH_')) {
              setActiveView('DASHBOARD');
            }
          } else {
            if (activeView.startsWith('AUTH_')) {
              setActiveView('WIZARD');
            }
          }
        }
      } else {
        // Reset if logged out and not on a public view
        if (!activeView.startsWith('AUTH_') && activeView !== 'WIZARD' && activeView !== 'HELP' && activeView !== 'LEGAL') {
          setCurrentUser(null);
          setActiveView('AUTH_LOGIN');
        }
      }
    };

    syncProfile();
  }, [user]);
  
  // Membership Level state
  const [membershipStatus, setMembershipStatus] = useState<'Free' | 'Silver' | 'Gold'>('Free');
  
  // Browsing/Detail and Search State
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Authentication Input States
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authMobile, setAuthMobile] = useState('');
  const [authDob, setAuthDob] = useState('1998-05-15');
  const [authGender, setAuthGender] = useState<'Male' | 'Female'>('Male');
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSentPhone, setOtpSentPhone] = useState('');
  
  // Notification dropdown toggle
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  // Configurable search rules and sorting criteria
  const [sortBy, setSortBy] = useState<string>('recently_active');
  const [forceOppositeGender, setForceOppositeGender] = useState<boolean>(true);

  // Advanced Search Filter Criteria
  const [filterAgeMin, setFilterAgeMin] = useState<number>(21);
  const [filterAgeMax, setFilterAgeMax] = useState<number>(35);
  const [filterDistrict, setFilterDistrict] = useState<string>('All');
  const [filterGotra, setFilterGotra] = useState<string>('All');
  const [filterOccupation, setFilterOccupation] = useState<string>('All');
  const [filterIncome, setFilterIncome] = useState<string>('All');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState<boolean>(false);
  const [filterTehsil, setFilterTehsil] = useState<string>('All');
  const [filterVillage, setFilterVillage] = useState<string>('All');
  const [filterEducation, setFilterEducation] = useState<string>('All');
  const [filterMaritalStatus, setFilterMaritalStatus] = useState<string>('All');
  const [filterPremiumOnly, setFilterPremiumOnly] = useState<boolean>(false);
  const [visibleProfilesCount, setVisibleProfilesCount] = useState<number>(8);

  // Search filter location dropdown systems
  const [isFilterDistrictOpen, setIsFilterDistrictOpen] = useState(false);
  const [filterDistrictSearch, setFilterDistrictSearch] = useState("");
  const [isFilterTehsilOpen, setIsFilterTehsilOpen] = useState(false);
  const [filterTehsilSearch, setFilterTehsilSearch] = useState("");

  // Search filter career dropdown systems
  const [isFilterEduOpen, setIsFilterEduOpen] = useState(false);
  const [filterEduSearch, setFilterEduSearch] = useState("");
  const [isFilterOccOpen, setIsFilterOccOpen] = useState(false);
  const [filterOccSearch, setFilterOccSearch] = useState("");
  const [isFilterIncomeOpen, setIsFilterIncomeOpen] = useState(false);

  // Quick Global Search Box
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Search History mechanism
  interface SavedQuery {
    id: string;
    timestamp: string;
    description: string;
    filters: {
      ageMin: number;
      ageMax: number;
      district: string;
      gotra: string;
      occupation: string;
      income: string;
      verifiedOnly: boolean;
      tehsil: string;
      village: string;
      education: string;
      maritalStatus: string;
      premiumOnly: boolean;
    }
  }

  const [searchHistory, setSearchHistory] = useState<SavedQuery[]>(() => {
    try {
      const saved = localStorage.getItem('MaliSamaj_searchHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleExecuteSearch = (customFilters?: SavedQuery['filters']) => {
    const filtersToUse = customFilters || {
      ageMin: filterAgeMin,
      ageMax: filterAgeMax,
      district: filterDistrict,
      gotra: filterGotra,
      occupation: filterOccupation,
      income: filterIncome,
      verifiedOnly: filterVerifiedOnly,
      tehsil: filterTehsil,
      village: filterVillage,
      education: filterEducation,
      maritalStatus: filterMaritalStatus,
      premiumOnly: filterPremiumOnly,
    };

    if (customFilters) {
      setFilterAgeMin(customFilters.ageMin);
      setFilterAgeMax(customFilters.ageMax);
      setFilterDistrict(customFilters.district);
      setFilterGotra(customFilters.gotra);
      setFilterOccupation(customFilters.occupation);
      setFilterIncome(customFilters.income);
      setFilterVerifiedOnly(customFilters.verifiedOnly);
      setFilterTehsil(customFilters.tehsil);
      setFilterVillage(customFilters.village);
      setFilterEducation(customFilters.education);
      setFilterMaritalStatus(customFilters.maritalStatus);
      setFilterPremiumOnly(customFilters.premiumOnly);
    } else {
      const descParts = [];
      if (filterGotra !== 'All') descParts.push(`Gotra: ${filterGotra}`);
      if (filterDistrict !== 'All') descParts.push(`Dist: ${filterDistrict}`);
      if (filterTehsil !== 'All') descParts.push(`Tehsil: ${filterTehsil}`);
      if (filterVillage !== 'All' && filterVillage !== '') descParts.push(`Village: ${filterVillage}`);
      descParts.push(`Age: ${filterAgeMin}-${filterAgeMax}`);
      if (filterVerifiedOnly) descParts.push(`Verified Only`);
      if (filterPremiumOnly) descParts.push(`Premium Only`);
      
      const description = descParts.join(' | ') || "Generic Board View";
      
      const newQuery: SavedQuery = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description,
        filters: {
          ageMin: filterAgeMin,
          ageMax: filterAgeMax,
          district: filterDistrict,
          gotra: filterGotra,
          occupation: filterOccupation,
          income: filterIncome,
          verifiedOnly: filterVerifiedOnly,
          tehsil: filterTehsil,
          village: filterVillage,
          education: filterEducation,
          maritalStatus: filterMaritalStatus,
          premiumOnly: filterPremiumOnly,
        }
      };

      setSearchHistory(prev => {
        const updated = [newQuery, ...prev.filter(q => q.description !== description)].slice(0, 8);
        localStorage.setItem('MaliSamaj_searchHistory', JSON.stringify(updated));
        return updated;
      });
    }

    setIsSearchLoading(true);
    setTimeout(() => {
      setIsSearchLoading(false);
      setActiveView('BROWSE');
    }, 600);
  };

  // Settings screen editable states
  const [settingsPassword, setSettingsPassword] = useState('•••••••••');
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [interestSms, setInterestSms] = useState(true);
  
  // Profile Detail reporting fields
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Compute Unread Notifications
  const unreadCount = useMemo(() => {
    return notifications.filter(n => n.unread).length;
  }, [notifications]);

  // Handle addition of a success story from SuccessStories child component
  const handleAddNewStory = (newStoryData: Omit<SuccessStory, 'id'>) => {
    const freshStory: SuccessStory = {
      id: `story-${Date.now()}`,
      ...newStoryData
    };
    setSuccessStories(prev => [freshStory, ...prev]);
  };

  // Dynamic toast system for elegant UI reports
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search History State persistence - stores last 6 search filters
  const [quickSearchHistory, setQuickSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mali_search_history');
      return saved ? JSON.parse(saved) : ["Jodhpur", "Gehlot", "BTech", "Nursery", "Jaipur"];
    } catch (e) {
      return ["Jodhpur", "Gehlot", "BTech", "Nursery", "Jaipur"];
    }
  });

  const [unlockedPhotos, setUnlockedPhotos] = useState<Record<string, boolean>>({});

  const handleApplySearchTerm = (term: string) => {
    setSearchQuery(term);
    setQuickSearchHistory(prev => {
      const filtered = prev.filter(t => t !== term);
      const updated = [term, ...filtered].slice(0, 6);
      localStorage.setItem('mali_search_history', JSON.stringify(updated));
      return updated;
    });
    showToast(`Quick search history filter applied: "${term}"`);
  };

  const handleSaveSearchTerm = (term: string) => {
    if (!term || term.trim() === '') return;
    const cleanTerm = term.trim();
    setQuickSearchHistory(prev => {
      const filtered = prev.filter(t => t.toLowerCase() !== cleanTerm.toLowerCase());
      const updated = [cleanTerm, ...filtered].slice(0, 6);
      localStorage.setItem('mali_search_history', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setQuickSearchHistory([]);
    localStorage.removeItem('mali_search_history');
    showToast("Your traditional search history stack has been cleared.");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 4500);
  };

  const handleBlockProfile = (id: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isBlocked: true };
      }
      return p;
    }));
    showToast("Profile blocked successfully. It has been removed from all candidate lists.");
    setActiveView('BROWSE');
  };

  const handleReportProfile = (id: string, reason: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isReported: true };
      }
      return p;
    }));
    showToast(`Profile successfully flagged. Our community moderators will review it within 24 hours.`);
    setShowReportModal(false);
  };

  // Profile selection wrapper for detailed screen
  const viewProfileDetails = (id: string) => {
    setSelectedProfileId(id);
    setActiveView('DETAIL');
  };

  // Shortlist action handler
  const toggleShortlist = (id: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        const nextShortlistState = !p.isShortlisted;
        if (nextShortlistState) {
          // Push notifications about bookmark
          const newNotif: NotificationItem = {
            id: `notif-${Date.now()}`,
            type: 'view',
            title: 'Added to Shortlist!',
            description: `You shortlisted the profile of ${p.name}.`,
            time: 'Just now',
            unread: true
          };
          setNotifications(old => [newNotif, ...old]);
        }
        return { ...p, isShortlisted: nextShortlistState };
      }
      return p;
    }));
  };

  // Interest System action handler
  const sendInterestConnection = (id: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        // Send connection
        const newNotif: NotificationItem = {
          id: `notif-${Date.now()}`,
          type: 'interest',
          title: 'Interest Dispatched!',
          description: `Your alliance proposal has been securely messaged to the parents of ${p.name}.`,
          time: 'Just now',
          unread: true
        };
        setNotifications(old => [newNotif, ...old]);
        return { ...p, interestStatus: 'sent' };
      }
      return p;
    }));
  };

  // Accept / Reject Interests from other users
  const handleInterestDecision = (id: string, decision: 'accepted' | 'rejected') => {
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, interestStatus: decision };
      }
      return p;
    }));
    
    const targetProf = profiles.find(p => p.id === id);
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'interest',
      title: decision === 'accepted' ? 'Connection Settle Complete!' : 'Interest Declined',
      description: decision === 'accepted' 
        ? `You happily accepted the alliance interest of ${targetProf?.name}. Telephone details are now unlocked!` 
        : `Decline record saved for ${targetProf?.name}.`,
      time: 'Just now',
      unread: true
    };
    setNotifications(old => [newNotif, ...old]);
  };

  // Authenticated Profile Creation Wizard Callback
  const handleWizardCompletion = async (newCreatedProfile: Profile) => {
    let finalProfile = { ...newCreatedProfile };
    if (user) {
      finalProfile.id = user.id;
      finalProfile.email = user.email || finalProfile.email;
    }

    if (isAppwriteReady() && user) {
      try {
        const saved = await saveUserProfile(user.id, finalProfile);
        finalProfile = saved;
        showToast("Profile wizard data successfully synchronized with Appwrite database!");
      } catch (err) {
        console.error("Failed to save wizard profile to Appwrite databases:", err);
        showToast("Local profile updated successfully. Safe database retry scheduled.");
      }
    } else {
      showToast("Profile drafted successfully inside local storage memory.");
    }

    setCurrentUser(finalProfile);
    setProfiles(prev => {
      if (prev.some(p => p.id === finalProfile.id)) {
        return prev.map(p => p.id === finalProfile.id ? finalProfile : p);
      }
      return [finalProfile, ...prev];
    });
    setActiveView('DASHBOARD');
  };

  // Filter profiles based on inputs + search matching
  const filteredProfiles = useMemo(() => {
    const list = profiles.filter(p => {
      // Never show blocked profiles
      if (p.isBlocked) return false;

      // Never show current user in matching candidates
      if (currentUser && p.id === currentUser.id) return false;
      
      // Ensure searching opposite genders primarily (configurable by future Admin)
      if (forceOppositeGender && currentUser && p.gender === currentUser.gender) return false;

      // Profile visibility rules (Public, Verified Only)
      if (p.photoPrivacyMode === 'Verified Only' && (!currentUser || !currentUser.verified)) {
        return false;
      }

      // Filter by verification status
      if (filterVerifiedOnly && !p.verified) return false;

      // Filter by Premium Badge
      if (filterPremiumOnly && !p.premium) return false;

      // Filter by age range
      if (p.age < filterAgeMin || p.age > filterAgeMax) return false;

      // Filter by District
      if (filterDistrict !== 'All' && p.district !== filterDistrict) return false;

      // Filter by Tehsil
      if (filterTehsil !== 'All' && p.tehsil && !p.tehsil.toLowerCase().includes(filterTehsil.toLowerCase())) return false;

      // Filter by Village
      if (filterVillage !== 'All' && p.village && !p.village.toLowerCase().includes(filterVillage.toLowerCase())) return false;

      // Filter by Gotra
      if (filterGotra !== 'All' && p.gotra !== filterGotra) return false;

      // Filter by Education
      if (filterEducation !== 'All' && p.education && !p.education.toLowerCase().includes(filterEducation.toLowerCase())) return false;

      // Filter by Occupation text
      if (filterOccupation !== 'All' && !p.occupation.toLowerCase().includes(filterOccupation.toLowerCase())) return false;

      // Filter by Income with smart numeric range matching
      if (filterIncome !== 'All') {
        const extractNum = (str: string) => {
          const match = str.replace(/,/g, '').match(/([0-9.]+)/);
          return match ? parseFloat(match[1]) : 0;
        };
        const pVal = extractNum(p.income || '');
        let isMatch = false;
        if (filterIncome === "No Income") {
          isMatch = pVal === 0 || (p.income && p.income.toLowerCase().includes("no income"));
        } else if (filterIncome === "Below ₹1 Lakh") {
          isMatch = pVal > 0 && pVal < 1;
        } else if (filterIncome === "₹1-3 Lakh") {
          isMatch = pVal >= 1 && pVal <= 3;
        } else if (filterIncome === "₹3-5 Lakh") {
          isMatch = pVal >= 3 && pVal <= 5;
        } else if (filterIncome === "₹5-8 Lakh") {
          isMatch = pVal >= 5 && pVal <= 8;
        } else if (filterIncome === "₹8-12 Lakh") {
          isMatch = pVal >= 8 && pVal <= 12;
        } else if (filterIncome === "₹12-20 Lakh") {
          isMatch = pVal >= 12 && pVal <= 20;
        } else if (filterIncome === "₹20-50 Lakh") {
          isMatch = pVal >= 20 && pVal <= 50;
        } else if (filterIncome === "₹50 Lakh+") {
          isMatch = pVal >= 50;
        } else if (filterIncome === "Prefer Not To Say") {
          isMatch = true;
        } else {
          isMatch = p.income ? p.income.toLowerCase().includes(filterIncome.toLowerCase()) : false;
        }
        if (!isMatch) return false;
      }

      // Filter by Marital Status
      if (filterMaritalStatus !== 'All' && p.maritalStatus !== filterMaritalStatus) return false;

      // Global Search input keyword queries
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesGotra = p.gotra.toLowerCase().includes(query);
        const matchesDistrict = p.district.toLowerCase().includes(query);
        const matchesEdu = p.education.toLowerCase().includes(query);
        const matchesOcc = p.occupation.toLowerCase().includes(query);
        return matchesName || matchesGotra || matchesDistrict || matchesEdu || matchesOcc;
      }

      return true;
    });

    // Real candidate sorting engine
    return [...list].sort((a, b) => {
      switch (sortBy) {
        case 'recently_active': {
          const aTime = a.lastActive ? new Date(a.lastActive).getTime() : 0;
          const bTime = b.lastActive ? new Date(b.lastActive).getTime() : 0;
          return bTime - aTime;
        }
        case 'newest': {
          // Fallback to alphabetical or id comparison for order
          return b.id.localeCompare(a.id);
        }
        case 'verified_first': {
          if (a.verified && !b.verified) return -1;
          if (!a.verified && b.verified) return 1;
          return 0;
        }
        case 'premium_first': {
          if (a.premium && !b.premium) return -1;
          if (!a.premium && b.premium) return 1;
          return 0;
        }
        default:
          return 0;
      }
    });
  }, [
    profiles, currentUser, filterAgeMin, filterAgeMax, filterDistrict, filterGotra, 
    filterOccupation, filterVerifiedOnly, filterTehsil, filterVillage, filterEducation, 
    filterMaritalStatus, filterPremiumOnly, filterIncome, searchQuery, sortBy, forceOppositeGender
  ]);

  // Selected single profile for profile detail screen
  const currentDetailProfile = useMemo(() => {
    return profiles.find(p => p.id === selectedProfileId) || null;
  }, [profiles, selectedProfileId]);

  // Traditional Rajasthan Mali Samaj Gotra Compatibility check computation
  const compatibilityResults = useMemo(() => {
    if (!currentDetailProfile) return null;

    // Fallback comparison reference so guest layout remains 100% active and readable
    const referenceUser = currentUser || profiles.find(p => p.id === 'mali-1') || profiles[0];
    if (!referenceUser || referenceUser.id === currentDetailProfile.id) return null;

    // Grab both paternal and maternal gotras for comparative analysis
    const ownGotraVal = currentDetailProfile.ownGotra || currentDetailProfile.gotra || '';
    const motherGotraVal = currentDetailProfile.motherGotra || 'Sankhla';
    const dadiGotraVal = currentDetailProfile.dadiGotra || 'Tak';
    const naniGotraVal = currentDetailProfile.naniGotra || 'Deora';

    const viewerGotras = [
      referenceUser.ownGotra || referenceUser.gotra,
      referenceUser.motherGotra,
      referenceUser.dadiGotra,
      referenceUser.naniGotra
    ].filter(Boolean).map(g => g.trim().toLowerCase());

    const isOwnGotraMatch = viewerGotras.includes(ownGotraVal.trim().toLowerCase());
    const isMotherGotraMatch = viewerGotras.includes(motherGotraVal.trim().toLowerCase());
    const isDadiGotraMatch = viewerGotras.includes(dadiGotraVal.trim().toLowerCase());
    const isNaniGotraMatch = viewerGotras.includes(naniGotraVal.trim().toLowerCase());

    const hasGotraMatch = isOwnGotraMatch || isMotherGotraMatch || isDadiGotraMatch || isNaniGotraMatch;

    // Location compatibility score
    const uDist = referenceUser.district || 'Jodhpur';
    const cDist = currentDetailProfile.district || 'Jodhpur';
    const isSameDistrict = uDist.toLowerCase() === cDist.toLowerCase();
    const locationScore = isSameDistrict ? 100 : (referenceUser.preferredDistrict || '').toLowerCase().includes(cDist.toLowerCase()) ? 85 : 65;

    // Age matching
    const ageDiff = Math.abs(referenceUser.age - currentDetailProfile.age);
    const isGroomOlder = referenceUser.gender === 'Male' ? referenceUser.age >= currentDetailProfile.age : currentDetailProfile.age >= referenceUser.age;
    let ageScore = 95;
    if (ageDiff > 9) ageScore = 40;
    else if (ageDiff > 6) ageScore = 75;
    else if (!isGroomOlder) ageScore = 80;

    const gotraScore = hasGotraMatch ? 20 : 100;
    const overallScore = Math.round((gotraScore + locationScore + 85 + ageScore) / 4);

    return {
      isOwnGotraMatch,
      isMotherGotraMatch,
      isDadiGotraMatch,
      isNaniGotraMatch,
      hasGotraMatch,
      ownGotraVal,
      motherGotraVal,
      dadiGotraVal,
      naniGotraVal,
      locationScore,
      ageScore,
      overallScore,
      ageDiff,
      gotraScore,
      isDemoMode: !currentUser,
      referenceName: referenceUser.name
    };
  }, [currentDetailProfile, currentUser, profiles]);

  // Statistics for Dashboard widgets
  const stats = useMemo(() => {
    return {
      totalCandidates: profiles.length,
      verifiedCount: profiles.filter(p => p.verified).length,
      premiumCount: profiles.filter(p => p.premium).length,
      shortlistedCount: profiles.filter(p => p.isShortlisted).length,
      receivedCount: profiles.filter(p => p.interestStatus === 'received').length,
      sentCount: profiles.filter(p => p.interestStatus === 'sent').length,
      connectionsApproved: profiles.filter(p => p.interestStatus === 'accepted').length
    };
  }, [profiles]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#F8F4EC] flex flex-col items-center justify-center space-y-4">
        <Landmark className="h-12 w-12 text-[#7A1F2B] animate-pulse" />
        <p className="font-cinzel text-xs uppercase tracking-widest text-[#7A1F2B] font-extrabold animate-pulse">
          राजस्थान माली बंधन • Connecting Samaj...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#1F1F1F] font-sans flex flex-col justify-between selection:bg-[#7A1F2B] selection:text-white">
      
      {/* ========================================== */}
      {/* 1. AUTHENTICATED PAGES MASTER CONTAINER */}
      {/* ========================================== */}
      {currentUser || activeView === 'WIZARD' ? (
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* Authenticated Left Navigation Rail (Desktop) */}
          <aside className={`bg-white border-r border-[#D4AF37]/20 w-full md:w-72 shrink-0 flex flex-col justify-between ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
            <div className="space-y-6">
              
              {/* Brand Emblem */}
              <div className="p-6 border-b border-[#D4AF37]/15 bg-gradient-to-b from-[#F8F4EC]/40 to-white text-center">
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <Landmark className="h-6 w-6 text-[#7A1F2B]" />
                  <span className="font-cinzel text-xs uppercase tracking-widest font-extrabold text-[#7A1F2B]">राजस्थान माली बंधन</span>
                </div>
                <h1 className="font-cinzel text-sm font-semibold tracking-wide text-amber-800">RAJASTHAN MALI BANDHAN</h1>
              </div>

              {/* Compact User Status info panel */}
              {currentUser && (
                <div className="mx-4 p-4 rounded-xl bg-[#F8F4EC]/60 border border-[#D4AF37]/20 flex items-center gap-3">
                  <img 
                    src={currentUser.photo} 
                    alt={currentUser.name} 
                    className="w-11 h-11 rounded-lg object-cover border border-[#D4AF37]" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-gray-800 truncate block">{currentUser.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono block">Gotra: {currentUser.gotra}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="bg-[#D4AF37] text-[#7A1F2B] text-[8px] font-mono px-1.5 rounded uppercase font-semibold">
                        {membershipStatus} Plan
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Functional Sidebar Links Group */}
              <nav className="px-4 space-y-1 font-sans">
                {[
                  { view: 'DASHBOARD', label: 'Maharaja Dashboard', icon: Users },
                  { view: 'BROWSE', label: 'Browse Candidates', icon: Search },
                  { view: 'SEARCH', label: 'Advanced Gotra Search', icon: Filter },
                  { view: 'ASSISTANT', label: 'Samaj AI Advisor ✦', icon: Sparkles },
                  { view: 'INTERESTS', label: 'Interest System', icon: Heart },
                  { view: 'SHORTLIST', label: 'Favourite Shortlists', icon: Bookmark },
                  { view: 'MEMBERSHIP', label: 'Membership Upgrade', icon: Award },
                  { view: 'SUCCESS_STORIES', label: 'Shubh Success Stories', icon: Sparkles },
                  { view: 'HERITAGE', label: 'Phule Heritage Pride', icon: Landmark },
                  { view: 'NOTIFICATIONS', label: `Notifications Center (${unreadCount})`, icon: Bell },
                  { view: 'SETTINGS', label: 'Account Settings', icon: Settings },
                  { view: 'HELP', label: 'Family Helpline Desk', icon: HelpCircle },
                  { view: 'LEGAL', label: 'Policies & Compliances', icon: Scale }
                ].map((link) => {
                  const Icon = link.icon;
                  const isActive = activeView === link.view;
                  
                  // Disable most links during wizard except Help and Legal
                  if (!currentUser && activeView === 'WIZARD' && link.view !== 'HELP' && link.view !== 'LEGAL') {
                    return null;
                  }

                  return (
                    <button
                      key={link.view}
                      onClick={() => {
                        setActiveView(link.view as any);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold font-cinzel rounded-xl transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-[#7A1F2B] text-white shadow-royal' 
                          : 'text-[#1F1F1F]/70 hover:bg-[#F8F4EC] hover:text-[#7A1F2B]'
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-[#D4AF37]' : 'text-amber-700'}`} />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </nav>

            </div>

            {/* Logout button at absolute bottom */}
            {currentUser && (
              <div className="p-4 border-t border-[#D4AF37]/15">
                <button 
                  onClick={async () => {
                    try {
                      if (currentUser && isAppwriteReady()) {
                        try {
                          await saveUserProfile(currentUser.id, {
                            ...currentUser,
                            isOnline: false,
                            lastActive: new Date().toISOString()
                          });
                        } catch (saveErr) {
                          console.error("Failed to persist offline status on logout:", saveErr);
                        }
                      }
                      await apiLogout();
                      setCurrentUser(null);
                      setMembershipStatus('Free');
                      setActiveView('AUTH_LOGIN');
                    } catch (err) {
                      console.error('Logout error:', err);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#7A1F2B]/10 hover:bg-[#7A1F2B] hover:text-white text-[#7A1F2B] font-bold py-2.5 rounded-lg text-xs tracking-wider transition-all cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>LOGOUT SESSION</span>
                </button>
              </div>
            )}
          </aside>

          {/* Authenticated Right Content Workspace Panel */}
          <main className="flex-1 flex flex-col min-w-0">
            
            {/* Authenticated Top Navbar (Mobile Hamburger & Quick profile stats) */}
            <header className="bg-white border-b border-[#D4AF37]/20 p-4 sticky top-0 z-40 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="md:hidden p-2 text-amber-900 border border-gray-200 rounded"
                >
                  <Users className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="font-cinzel text-xs font-bold text-[#7A1F2B] hidden sm:inline">Rajasthan Mali Bandhan</span>
                </div>
              </div>

              {/* Middle Search Inbound */}
              <div className="hidden lg:flex items-center gap-2 bg-[#F8F4EC] border border-[#D4AF37]/35 rounded-lg px-3 py-1.5 w-80 text-xs">
                <Search className="h-3.5 w-3.5 text-amber-700" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeView !== 'BROWSE') setActiveView('BROWSE');
                  }}
                  placeholder="Quick search (e.g. Saini, Jaipur, CA)..." 
                  className="bg-transparent border-none outline-none w-full"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-gray-400 font-bold font-sans">×</button>
                )}
              </div>

              {/* Right Menu: Notifications & Quick Access */}
              <div className="flex items-center gap-4">
                
                {/* Simulated notifications dropdown bell */}
                <div className="relative">
                  <button 
                    onClick={() => setActiveView('NOTIFICATIONS')}
                    className="p-2 text-amber-900 relative hover:bg-gray-50 rounded-full transition-all"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 bg-[#7A1F2B] text-white text-[8px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Shagun Upgrade Quick Link */}
                <button 
                  onClick={() => setActiveView('MEMBERSHIP')}
                  className="bg-gradient-to-r from-amber-500 to-[#D4AF37] hover:from-amber-600 hover:to-[#B8860B] text-[#7A1F2B] font-bold text-[10px] md:text-xs font-cinzel rounded px-3 py-1.5 md:py-2 flex items-center gap-1.5 transition-all cursor-pointer border border-[#7A1F2B]/15"
                >
                  <Award className="h-3.5 w-3.5 animate-bounce" />
                  <span>UPGRADE MEMBER</span>
                </button>

                {/* Profile icon */}
                {currentUser && (
                  <div onClick={() => setActiveView('SETTINGS')} className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity">
                    <img src={currentUser.photo} alt="Current avatar" className="w-8 h-8 rounded-full border border-[#D4AF37] object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}

              </div>
            </header>

            {/* Main Interactive Screen Content router */}
            <div className="p-4 md:p-8 flex-1 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
              
              {isSearchLoading && (
                <div className="fixed inset-0 z-50 bg-[#7A1F2B]/45 backdrop-blur-md flex items-center justify-center animate-fade-in">
                  <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 border-2 border-[#D4AF37] shadow-royal text-center space-y-6">
                    <div className="relative w-20 h-20 mx-auto">
                      {/* Ambient Glowing Ring */}
                      <div className="absolute inset-0 rounded-full border-4 border-[#7A1F2B]/10"></div>
                      {/* Spinning Royal Ring */}
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#7A1F2B] border-r-[#D4AF37] animate-spin"></div>
                      {/* Center Star */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-[#D4AF37] fill-[#D4AF37] animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-cinzel text-base font-bold text-[#7A1F2B]">Maharaja Search Active</h3>
                      <p className="text-xs text-gray-500 font-sans leading-relaxed">
                        Scanning Rajasthan Saini Malik database registries... Checking gotra exclusions & local match weights seamlessly.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[10px] uppercase font-mono font-bold tracking-wider text-[#D4AF37]">
                      <Clock className="h-3 w-3 animate-spin text-[#D4AF37]" /> EST. WAIT TIME: 0.4 SEC
                    </div>
                  </div>
                </div>
              )}

              {/* ======================= */}
              {/* WIZARD SCREEN */}
              {/* ======================= */}
              {activeView === 'WIZARD' && (
                <Wizard onComplete={handleWizardCompletion} initialData={currentUser || undefined} />
              )}

              {/* ======================= */}
              {/* MAHARAJA DASHBOARD */}
              {/* ======================= */}
              {activeView === 'DASHBOARD' && currentUser && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Majestic Congratulations Banner */}
                  <div className="bg-gradient-to-r from-[#7A1F2B] to-[#B8860B] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-royal border border-[#D4AF37]/30">
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-xl"></div>
                    <div className="relative z-10 max-w-2xl space-y-4">
                      <span className="font-cinzel text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-[#D4AF37]" /> Welcome Matrimonial Custodian
                      </span>
                      <h2 className="font-cinzel text-2xl md:text-3xl font-extrabold tracking-wide">
                        Khamma Ghani, Padharo Mhare Des!
                      </h2>
                      <p className="font-serif italic text-xs md:text-sm text-[#F8F4EC]/90 leading-relaxed">
                        Rajasthan Mali Bandhan welcomes your family. We are currently tracking <strong>8,400+ members</strong> from respected Gehlot, Saini, Kachhawaha and Tak families of Jodhpur, Pali, Jaipur & Bikaner networks.
                      </p>

                      <div className="pt-2 flex flex-wrap gap-3">
                        <button 
                          onClick={() => setActiveView('BROWSE')}
                          className="bg-[#F8F4EC] text-[#7A1F2B] font-bold text-xs px-5 py-2.5 rounded-lg shadow font-cinzel hover:bg-[#D4AF37] transition-all cursor-pointer"
                        >
                          Explore Mali Brides & Grooms
                        </button>
                        <button 
                          onClick={() => setActiveView('ASSISTANT')}
                          className="bg-[#D4AF37] text-[#7A1F2B] font-bold text-xs px-5 py-2.5 rounded-lg shadow font-cinzel hover:bg-amber-500 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Sparkles className="h-3.5 w-3.5 fill-[#7A1F2B]" /> Talk to Samaj AI Advisor ✦
                        </button>
                        <button 
                          onClick={() => setActiveView('HERITAGE')}
                          className="border border-[#D4AF37] text-white font-bold text-xs px-5 py-2.5 rounded-lg font-cinzel hover:bg-white/10 transition-all cursor-pointer"
                        >
                          Explore Our Samaj Heritage
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Quick Stats Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-royal space-y-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Recommended Couples</span>
                      <span className="font-serif text-2xl font-black text-[#7A1F2B] block">42 Match Pairs</span>
                      <span className="text-[9px] text-emerald-600 font-medium">Based on 4-Gotras safety check</span>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-royal space-y-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Shortlisted by Me</span>
                      <span className="font-serif text-2xl font-black text-[#7A1F2B] block">{stats.shortlistedCount} Saved</span>
                      <span className="text-[9px] text-amber-600 font-medium">Quick lock connection</span>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-royal space-y-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Interests Sent</span>
                      <span className="font-serif text-2xl font-black text-[#7A1F2B] block">{stats.sentCount} Proposals</span>
                      <span className="text-[9px] text-[#D4AF37] font-semibold">Awating parents answer</span>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-royal space-y-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Verified Clans</span>
                      <span className="font-serif text-2xl font-black text-[#7A1F2B] block">100% Secured</span>
                      <span className="text-[9px] text-emerald-600 font-semibold flex items-center gap-0.5">
                        <ShieldCheck className="h-3 w-3 inline text-emerald-500" /> Aadhaar Registered
                      </span>
                    </div>
                  </div>

                  {/* Split Dashboard Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: List of 3 Popular Matches */}
                    <div className="lg:col-span-2 space-y-4">
                      
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <h3 className="font-cinzel text-sm font-bold text-[#7A1F2B]">Recommended matches for you</h3>
                        <button onClick={() => setActiveView('BROWSE')} className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1">
                          View all <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {profiles.length === 0 ? (
                          <div className="bg-white p-8 rounded-2xl border border-gray-150 text-center space-y-4">
                            <AlertCircle className="mx-auto h-8 w-8 text-[#7A1F2B]" />
                            <h4 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">Complete your profile to start receiving matches</h4>
                            <p className="text-[11px] text-gray-500 max-w-sm mx-auto">
                              No recommendations are compiled yet. Please trigger the step-by-step registration wizard to unlock matches.
                            </p>
                            <button 
                              onClick={() => setActiveView('WIZARD')}
                              className="bg-[#7A1F2B] hover:bg-[#601923] text-white border border-[#D4AF37] text-[10px] uppercase font-bold py-2 px-4 rounded"
                            >
                              Launch Profile Wizard
                            </button>
                          </div>
                        ) : (
                          profiles.slice(0, 3).map((match) => (
                            <div 
                              key={match.id} 
                              className="bg-white p-4 rounded-2xl border border-gray-100 shadow flex flex-col sm:flex-row gap-4 items-center sm:items-start hover:border-[#D4AF37]/50 transition-all duration-300"
                            >
                              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#D4AF37] relative">
                                <img src={match.photo} alt={match.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                {match.premium && (
                                  <div className="absolute top-1 left-1 bg-amber-500 text-white p-0.5 rounded text-[8px] font-bold">VIP</div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                                  <h4 className="font-cinzel text-xs font-bold text-gray-800">{match.name}</h4>
                                  {match.verified && (
                                    <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                                  )}
                                </div>
                                <p className="text-[11px] text-gray-500 font-serif">Age {match.age} yrs • Gotra: {match.gotra}</p>
                                <p className="text-[11px] text-gray-500 truncate font-mono">{match.education} • {match.district}</p>
                                <span className="text-[10px] text-[#7A1F2B] font-bold block">{match.income} Income Range</span>
                              </div>

                              <div className="shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto">
                                <button 
                                  onClick={() => viewProfileDetails(match.id)}
                                  className="flex-1 sm:flex-none text-[10px] px-3 py-1.5 bg-[#F8F4EC] hover:bg-[#D4AF37]/20 text-[#7A1F2B] font-bold font-cinzel tracking-wider rounded"
                                >
                                  View full detail
                                </button>
                                <button 
                                  onClick={() => sendInterestConnection(match.id)}
                                  disabled={match.interestStatus === 'sent'}
                                  className={`flex-1 sm:flex-none text-[10px] px-3 py-1.5 rounded font-bold font-cinzel text-center ${
                                    match.interestStatus === 'sent' 
                                      ? 'bg-gray-100 text-gray-400 border border-gray-200' 
                                      : 'bg-[#7A1F2B] hover:bg-[#922a38] text-white border border-[#D4AF37]'
                                  }`}
                                >
                                  {match.interestStatus === 'sent' ? 'PROPOSAL SENT' : 'SEND INTEREST'}
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                    </div>

                    {/* Right Column: Mini Widgets */}
                    <div className="space-y-6">
                      
                      {/* Completeness Meter */}
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-royal space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-cinzel text-xs font-bold text-gray-800 uppercase tracking-wider">Profile Strength</h4>
                          <span className="text-xs font-semibold text-[#7A1F2B]">95% Complete</span>
                        </div>
                        <div className="w-full bg-[#F8F4EC] h-2.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2.5 rounded-full w-[95%]"></div>
                        </div>
                        <p className="text-[11px] text-gray-500 italic leading-relaxed">
                          Your profile details are complete. High verify score ensures immediate approval by Rajput Mali parents.
                        </p>
                      </div>

                      {/* Phule Quote Carousel Widget */}
                      <div className="bg-gradient-to-br from-[#7A1F2B]/5 to-[#B8860B]/10 p-5 rounded-2xl border border-[#D4AF37]/20 text-center space-y-3">
                        <Award className="mx-auto h-6 w-6 text-[#7A1F2B]" />
                        <h4 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">Savitribai Phule Wisdom</h4>
                        <p className="font-serif italic text-xs text-[#1F1F1F]/80">
                          "Daughters who acquire education and live with dignity build strong ancestral dynasties of progress."
                        </p>
                        <span className="text-[9px] uppercase tracking-wider font-bold text-amber-700 block">Mali Samaj Moral Guide</span>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* ======================= */}
              {/* BROWSE CANDIDATES */}
              {/* ======================= */}
              {activeView === 'BROWSE' && (
                <div className="space-y-6 animate-fade-in text-xs md:text-sm">
                  
                  {/* Results Count Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                      <h2 className="font-cinzel text-xl font-bold text-[#7A1F2B]">Browse Mali Samaj Candidates</h2>
                      <p className="text-[11px] text-gray-500">Currently showing {filteredProfiles.length} eligible candidates matching your profile criteria</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Dropdown for Advanced Sorting */}
                      <div className="flex items-center gap-1 bg-[#F8F4EC] border border-[#D4AF37]/35 px-3 py-1.5 rounded-xl text-xs text-gray-700">
                        <span className="font-semibold text-[#7A1F2B] font-cinzel text-[10px] uppercase">Sort By:</span>
                        <select 
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="bg-transparent border-none outline-none text-xs font-bold text-[#7A1F2B] py-0.5 cursor-pointer focus:ring-0 mr-1"
                        >
                          <option value="recently_active">Recently Active (सक्रियता समय)</option>
                          <option value="newest">Newest Profiles (नए सदस्य)</option>
                          <option value="verified_first">Verified First (सत्यापित सदस्य)</option>
                          <option value="premium_first">Premium First (प्रीमियम सदस्य)</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => setActiveView('SEARCH')}
                        className="bg-[#F8F4EC] border border-[#D4AF37]/30 text-[#7A1F2B] hover:bg-[#D4AF37]/10 font-bold px-4 py-2 rounded-xl font-cinzel text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Filter className="h-3.5 w-3.5 text-[#D4AF37]" /> Adjust Match Filters
                      </button>
                    </div>
                  </div>

                  {/* SEARCH FIELD WITH HISTORY PILLS */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center gap-2 bg-[#F8F4EC] border border-[#D4AF37]/35 rounded-xl px-4 py-2.5 text-xs">
                        <Search className="h-4 w-4 text-amber-700" />
                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveSearchTerm(searchQuery);
                            }
                          }}
                          placeholder="Quick search by gotra, district, education, occupation (e.g., Gehlot, Pali, BTech, Farmer)..." 
                          className="bg-transparent border-none outline-none w-full text-xs text-gray-800 placeholder-gray-400"
                        />
                        {searchQuery && (
                          <button onClick={() => setSearchQuery('')} className="text-gray-400 font-bold font-sans text-sm pr-1">×</button>
                        )}
                      </div>
                      <button
                        onClick={() => handleSaveSearchTerm(searchQuery)}
                        className="bg-[#7A1F2B] hover:bg-[#601923] text-white font-cinzel text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
                      >
                        Search
                      </button>
                    </div>

                    {quickSearchHistory.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Recent Searches:
                        </span>
                        {quickSearchHistory.map((term, i) => (
                          <button
                            key={i}
                            onClick={() => handleApplySearchTerm(term)}
                            className="bg-[#F8F4EC] hover:bg-[#D4AF37]/10 text-[#7A1F2B] font-medium px-2.5 py-1 rounded-full border border-gray-200 hover:border-[#D4AF37]/40 transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                          >
                            {term}
                          </button>
                        ))}
                        <button
                          onClick={handleClearHistory}
                          className="text-rose-600 hover:text-rose-800 hover:underline text-[10px] font-bold uppercase pl-1 cursor-pointer"
                        >
                          Clear History
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Grid Layout of Candidates cards */}
                  {profiles.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center max-w-xl mx-auto border border-gray-150 space-y-4 shadow-royal">
                      <AlertCircle className="mx-auto h-12 w-12 text-[#7A1F2B]" />
                      <h3 className="font-cinzel text-base font-bold text-[#7A1F2B]">No verified profiles available yet. Be the first family to register.</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        There are no registered candidate profiles in the database at the moment. Please run the Profile Wizard to register your household bride or groom and start matching!
                      </p>
                      <button 
                        onClick={() => setActiveView('WIZARD')}
                        className="bg-[#7A1F2B] hover:bg-[#601923] text-white py-2.5 px-6 rounded-lg font-cinzel font-bold text-xs border border-[#D4AF37]"
                      >
                        Launch Profile Wizard
                      </button>
                    </div>
                  ) : filteredProfiles.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center max-w-xl mx-auto border border-gray-100 space-y-4">
                      <AlertCircle className="mx-auto h-12 w-12 text-[#7A1F2B]" />
                      <h3 className="font-cinzel text-base font-bold text-[#7A1F2B]">No exact matches found</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Currently, there are no profiles matching these specific filters. Try loosening your age range or resetting the district search to "All" districts to browse wider Samaj candidates.
                      </p>
                      <button 
                        onClick={() => {
                          setFilterAgeMin(21);
                          setFilterAgeMax(35);
                          setFilterDistrict('All');
                          setFilterGotra('All');
                          setFilterVerifiedOnly(false);
                        }}
                        className="bg-[#7A1F2B] text-white py-2 px-6 rounded font-cinzel font-bold text-xs"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredProfiles.slice(0, visibleProfilesCount).map((candidate) => (
                        <div 
                          key={candidate.id} 
                          className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-royal hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col justify-between group"
                        >
                          
                          {/* Image Thumbnail Container */}
                          <div className="h-64 relative bg-gray-50 overflow-hidden">
                            <img 
                              src={candidate.photo} 
                              alt={candidate.name} 
                              referrerPolicy="no-referrer"
                              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${(candidate.gender === 'Female' && candidate.photoPrivacyMode === 'Blur' && !unlockedPhotos[candidate.id]) ? 'blur-md bg-gray-600 scale-102 select-none' : ''}`}
                            />

                            {candidate.gender === 'Female' && candidate.photoPrivacyMode === 'Blur' && !unlockedPhotos[candidate.id] && (
                              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center text-white backdrop-blur-[2px]">
                                <Lock className="h-8 w-8 text-[#D4AF37] mb-1.5 animate-pulse" />
                                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest leading-loose">Privacy Blurry Active</span>
                                <span className="text-[9px] text-[#F8F4EC] mt-0.5">Mali Traditional Lock check</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setUnlockedPhotos(prev => ({ ...prev, [candidate.id]: true }));
                                    showToast(`Success: Photo unlock request sent to ${candidate.name}! Simulation granted instantly.`);
                                  }}
                                  className="mt-2 text-[8px] tracking-wider uppercase font-bold bg-[#7A1F2B] border border-[#D4AF37] text-white px-3 py-1.5 rounded-md shadow-lg cursor-pointer hover:bg-rose-950 transition-all animate-bounce"
                                >
                                  Unlock Photo
                                </button>
                              </div>
                            )}
                            
                            {/* Badges Overlay */}
                            <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                              {candidate.premium ? (
                                <span className="bg-[#D4AF37] text-[#7A1F2B] font-bold text-[9px] font-cinzel uppercase py-1 px-2.5 rounded-full shadow border border-white">
                                  ★ VIP MEMBER
                                </span>
                              ) : (
                                <span></span>
                              )}
                              
                              <button 
                                onClick={() => toggleShortlist(candidate.id)}
                                className="w-8 h-8 rounded-full bg-white text-[#7A1F2B] flex items-center justify-center shadow hover:bg-[#F8F4EC] transition-all"
                              >
                                <Bookmark className={`h-4.5 w-4.5 ${candidate.isShortlisted ? 'fill-amber-600 stroke-amber-600' : ''}`} />
                              </button>
                            </div>

                            {/* Verified Overlay Bottom Badge */}
                            {candidate.verified && (
                              <div className="absolute bottom-3 left-3 bg-blue-600 text-white font-bold text-[8px] font-sans tracking-wider uppercase py-1 px-2.5 rounded flex items-center gap-1 shadow">
                                <ShieldCheck className="h-3 w-3 fill-white text-blue-600" /> AADHAAR VERIFIED
                              </div>
                            )}

                          </div>

                          {/* Detail Content Section */}
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            
                            <div className="space-y-1.5 text-center sm:text-left">
                              {/* Online / Active status & Managed by */}
                              <div className="flex items-center justify-between gap-1 text-[10px]">
                                <div className="flex items-center gap-1.5">
                                  <span className={`h-2 w-2 rounded-full ${candidate.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></span>
                                  <span className="text-gray-400 font-mono">{candidate.lastActive || 'Active recently'}</span>
                                </div>
                                <span className="bg-amber-100/60 text-amber-950 px-1.5 py-0.5 rounded text-[9px] font-semibold font-cinzel">
                                  {candidate.managedBy ? `By ${candidate.managedBy}` : 'By Father'}
                                </span>
                              </div>

                              <div className="flex items-center justify-between gap-1 mt-1">
                                <h3 className="font-cinzel text-sm font-bold text-gray-800 tracking-tight block">
                                  {candidate.name}
                                </h3>
                                {candidate.isCommunityVerified && (
                                  <span className="text-amber-700 bg-amber-50 border border-amber-200 text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 uppercase shrink-0">
                                    ★ Verified
                                  </span>
                                )}
                              </div>

                              <p className="text-[11px] text-gray-400 font-serif italic">Gotra: <strong>{candidate.gotra}</strong></p>
                              
                              {/* Profile Completion Bar */}
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-[8px] text-gray-400 font-mono">
                                  <span>Strength: {candidate.profileCompletion || 85}%</span>
                                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded flex items-center gap-0.5">🛡️ Trust Score: {80 + (candidate.verified ? 10 : 0) + (candidate.isCommunityVerified ? 8 : 0) + (candidate.premium ? 2 : 0)}%</span>
                                </div>
                                <div className="w-full bg-gray-150 h-1 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" 
                                    style={{ width: `${candidate.profileCompletion || 85}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="h-px bg-gray-100 my-1"></div>
                              
                              <p className="text-[11px] text-gray-600 flex items-center justify-center sm:justify-start gap-1 font-mono">
                                <MapPin className="h-3.5 w-3.5 text-amber-700 shrink-0" /> Native: {candidate.village || 'Salawas'}, {candidate.tehsil || 'Luni'}, {candidate.district}
                              </p>

                              <p className="text-[11px] text-gray-600 truncate font-sans">
                                🎓 {candidate.education}
                              </p>
                              <p className="text-[11px] text-gray-500 truncate font-sans font-medium">
                                💼 {candidate.occupation}
                              </p>

                              {/* Traditional Assets badging inside the card */}
                              <div className="flex flex-wrap gap-1 pt-1 justify-center sm:justify-start">
                                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-medium px-2 py-0.5 rounded border border-emerald-100/60 flex items-center gap-0.5">
                                  🚜 {candidate.agricultureLandDetails || "Family Business"}
                                </span>
                                <span className="bg-amber-50 text-amber-950 text-[10px] font-medium px-2 py-0.5 rounded border border-[#D4AF37]/20 flex items-center gap-0.5">
                                  🏘️ {candidate.familyBusinessInfo || "Nursery Gardens"}
                                </span>
                              </div>
                            </div>

                            {/* View & Connection Controls */}
                            <div className="pt-4 border-t border-gray-50 grid grid-cols-2 gap-2 text-center font-cinzel text-[10px] font-bold tracking-wider">
                              <button 
                                onClick={() => viewProfileDetails(candidate.id)}
                                className="bg-[#F8F4EC] hover:bg-[#D4AF37]/20 text-[#7A1F2B] py-2 rounded-lg transition-colors cursor-pointer"
                              >
                                VIEW DETAILS
                              </button>
                              
                              <button 
                                onClick={() => sendInterestConnection(candidate.id)}
                                disabled={candidate.interestStatus === 'sent'}
                                className={`py-2 rounded-lg transition-all cursor-pointer ${
                                  candidate.interestStatus === 'sent'
                                    ? 'bg-gray-100 text-gray-400 pointer-events-none border border-gray-200'
                                    : 'bg-[#7A1F2B] hover:bg-[#922a38] text-white border border-[#D4AF37]'
                                }`}
                              >
                                {candidate.interestStatus === 'sent' ? 'INTEREST SENT' : 'SEND INTEREST'}
                              </button>
                            </div>

                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                  {filteredProfiles.length > visibleProfilesCount && (
                    <div className="flex justify-center pt-8">
                      <button
                        onClick={() => setVisibleProfilesCount(prev => prev + 8)}
                        className="bg-white hover:bg-[#F8F4EC] text-[#7A1F2B] border border-[#D4AF37]/45 font-cinzel font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-royal hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
                      >
                        <ChevronDown className="h-4 w-4 text-[#D4AF37] animate-bounce" /> Load More Eligible Samaj Candidates
                      </button>
                    </div>
                  )}

                </div>
              )}

              {/* ======================= */}
              {/* ADVANCED FILTER SEARCH */}
              {/* ======================= */}
              {activeView === 'SEARCH' && (
                <div className="space-y-6 animate-fade-in text-xs md:text-sm">
                  
                  {/* Header */}
                  <div className="border-b border-[#D4AF37]/20 pb-4">
                    <h2 className="font-cinzel text-xl font-bold text-[#7A1F2B]">Maharaja Gotra & District Search Engine</h2>
                    <p className="text-xs text-gray-500 font-serif italic">Use elite filters to bypass gotra restrictions (avoid paternal mother/paternal grandmother gotras as per Mali Samaj protocols)</p>
                  </div>

                  {/* Search History / Recent Queries Tracker */}
                  {searchHistory.length > 0 && (
                    <div className="bg-[#F8F4EC]/40 border border-[#D4AF37]/20 rounded-2xl p-4 space-y-2 animate-fade-in">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[#7A1F2B] uppercase tracking-wider block">
                          ⚡ Your Recent Searches & Saved Queries
                        </span>
                        <button
                          onClick={() => {
                            setSearchHistory([]);
                            localStorage.removeItem('MaliSamaj_searchHistory');
                          }}
                          className="text-[9px] font-bold text-rose-700 hover:underline hover:text-rose-900 cursor-pointer"
                        >
                          Clear History
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 max-h-36 py-1">
                        {searchHistory.map((query) => (
                          <button
                            key={query.id}
                            onClick={() => handleExecuteSearch(query.filters)}
                            className="text-left text-[11px] bg-white hover:bg-[#7A1F2B]/5 border border-gray-200 hover:border-[#7A1F2B]/40 rounded-xl px-3.5 py-2 transition-all cursor-pointer shadow-xs flex items-center gap-2 group shrink-0"
                          >
                            <span className="p-1 bg-[#F8F4EC] group-hover:bg-[#7A1F2B]/10 rounded-full text-[#7A1F2B] font-mono text-[9px] font-bold">
                              {query.timestamp}
                            </span>
                            <span className="text-gray-700 font-medium truncate max-w-[240px]">
                              {query.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-150 shadow-royal grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Range select */}
                    <div className="space-y-2">
                      <label className="font-bold text-[#7A1F2B]">Age parameters (Years)</label>
                      <div className="grid grid-cols-2 gap-2 font-mono">
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase">Min Age</label>
                          <input 
                            type="number" 
                            value={filterAgeMin} 
                            onChange={(e) => setFilterAgeMin(parseInt(e.target.value) || 21)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-[#7A1F2B]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase">Max Age</label>
                          <input 
                            type="number" 
                            value={filterAgeMax} 
                            onChange={(e) => setFilterAgeMax(parseInt(e.target.value) || 35)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-[#7A1F2B]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* District selection with advanced search dropdown */}
                    <div className="space-y-2 relative">
                      <label className="font-bold text-[#7A1F2B] block">Rajasthan Native District</label>
                      <button
                        type="button"
                        onClick={() => setIsFilterDistrictOpen(!isFilterDistrictOpen)}
                        className="w-full text-left text-xs p-3 border border-gray-300 bg-white rounded-xl focus:outline-none flex justify-between items-center cursor-pointer"
                      >
                        <span className="font-semibold text-gray-800">
                          {filterDistrict === 'All' ? "All Districts (Jaipur/Jodhpur/Pali...)" : `${filterDistrict}, Rajasthan`}
                        </span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </button>

                      {isFilterDistrictOpen && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-royal max-h-56 overflow-hidden flex flex-col animate-fade-in">
                          <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-[#F8F4EC]/30">
                            <Search className="h-4 w-4 text-[#7A1F2B]" />
                            <input
                              type="text"
                              placeholder="Search districts (e.g. Didwana, Kekri, Sikar)..."
                              value={filterDistrictSearch}
                              onChange={(e) => setFilterDistrictSearch(e.target.value)}
                              className="w-full text-[11px] bg-transparent border-none outline-none py-1 text-gray-800"
                              autoFocus
                            />
                          </div>
                          
                          <div className="overflow-y-auto flex-1 divide-y divide-gray-50 max-h-40">
                            <button
                              type="button"
                              onClick={() => {
                                setFilterDistrict('All');
                                setFilterTehsil('All');
                                setFilterVillage('All');
                                setFilterDistrictSearch('');
                                setIsFilterDistrictOpen(false);
                              }}
                              className="w-full text-left text-xs px-4 py-2 hover:bg-[#7A1F2B]/5 text-gray-700 flex justify-between items-center cursor-pointer"
                            >
                              <strong className="text-[#7A1F2B]">All Districts (सभी ज़िले)</strong>
                              {filterDistrict === 'All' && <Check className="h-3.5 w-3.5 text-[#7A1F2B]" />}
                            </button>

                            {locationDb.getDistricts()
                              .filter(d => d.name.toLowerCase().includes(filterDistrictSearch.toLowerCase()))
                              .map((d) => (
                                <button
                                  key={d.id}
                                  type="button"
                                  onClick={() => {
                                    setFilterDistrict(d.name);
                                    setFilterTehsil('All'); // Reset hierarchy
                                    setFilterVillage('All');
                                    setFilterDistrictSearch('');
                                    setIsFilterDistrictOpen(false);
                                  }}
                                  className="w-full text-left text-xs px-4 py-2 hover:bg-[#7A1F2B]/5 text-gray-700 flex justify-between items-center cursor-pointer"
                                >
                                  <span>{d.name}</span>
                                  {filterDistrict === d.name && <Check className="h-3.5 w-3.5 text-[#7A1F2B]" />}
                                </button>
                              ))
                            }
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gotra Selection */}
                    <div className="space-y-2">
                      <label className="font-bold text-[#7A1F2B] block">Candidate Gotra Clan</label>
                      <select 
                        value={filterGotra} 
                        onChange={(e) => setFilterGotra(e.target.value)}
                        className="w-full p-3 border border-gray-300 bg-white rounded-xl focus:outline-[#7A1F2B] font-mono text-xs"
                      >
                        <option value="All">All Mali Gotras (Gehlot/Saini/Kachhawaha...)</option>
                        <option value="Gehlot">Gehlot</option>
                        <option value="Saini">Saini</option>
                        <option value="Kachhawaha">Kachhawaha</option>
                        <option value="Solanki">Solanki</option>
                        <option value="Tak">Tak</option>
                        <option value="Tanwar">Tanwar</option>
                        <option value="Sankhla">Sankhla</option>
                        <option value="Panwar">Panwar</option>
                        <option value="Deora">Deora</option>
                      </select>
                    </div>

                    {/* Tehsil selection linked dynamically to District selection */}
                    <div className="space-y-2 relative">
                      <label className="font-bold text-[#7A1F2B] block">Taluka / Tehsil (तहसील)</label>
                      <button
                        type="button"
                        disabled={filterDistrict === 'All'}
                        onClick={() => setIsFilterTehsilOpen(!isFilterTehsilOpen)}
                        className={`w-full text-left text-xs p-3 border border-gray-300 bg-white rounded-xl focus:outline-none flex justify-between items-center cursor-pointer ${
                          filterDistrict === 'All' ? 'opacity-60 cursor-not-allowed bg-gray-50' : ''
                        }`}
                      >
                        <span className="font-semibold text-gray-800">
                          {filterDistrict === 'All' 
                            ? "Select district first..." 
                            : filterTehsil === 'All' 
                              ? "All Tehsils (सभी तहसीलें)" 
                              : filterTehsil
                          }
                        </span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </button>

                      {isFilterTehsilOpen && filterDistrict !== 'All' && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-royal max-h-56 overflow-hidden flex flex-col animate-fade-in">
                          <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-[#F8F4EC]/30">
                            <Search className="h-4 w-4 text-[#7A1F2B]" />
                            <input
                              type="text"
                              placeholder={`Search tehsils in ${filterDistrict}...`}
                              value={filterTehsilSearch}
                              onChange={(e) => setFilterTehsilSearch(e.target.value)}
                              className="w-full text-[11px] bg-transparent border-none outline-none py-1 text-gray-800"
                              autoFocus
                            />
                          </div>

                          <div className="overflow-y-auto flex-1 divide-y divide-gray-50 max-h-40">
                            <button
                              type="button"
                              onClick={() => {
                                setFilterTehsil('All');
                                setFilterTehsilSearch('');
                                setIsFilterTehsilOpen(false);
                              }}
                              className="w-full text-left text-xs px-4 py-2 hover:bg-[#7A1F2B]/5 text-gray-700 flex justify-between items-center cursor-pointer"
                            >
                              <strong className="text-[#7A1F2B]">All Tehsils (सभी तहसीलें)</strong>
                              {filterTehsil === 'All' && <Check className="h-3.5 w-3.5 text-[#7A1F2B]" />}
                            </button>

                            {locationDb.getTehsilsByDistrictName(filterDistrict)
                              .filter(t => t.name.toLowerCase().includes(filterTehsilSearch.toLowerCase()))
                              .map((t) => (
                                <button
                                  key={t.id}
                                  type="button"
                                  onClick={() => {
                                    setFilterTehsil(t.name);
                                    setFilterVillage('All');
                                    setFilterTehsilSearch('');
                                    setIsFilterTehsilOpen(false);
                                  }}
                                  className="w-full text-left text-xs px-4 py-2 hover:bg-[#7A1F2B]/5 text-gray-700 flex justify-between items-center cursor-pointer"
                                >
                                  <span>{t.name}</span>
                                  {filterTehsil === t.name && <Check className="h-3.5 w-3.5 text-[#7A1F2B]" />}
                                </button>
                              ))
                            }
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Village selection linked dynamically */}
                    <div className="space-y-2">
                       <label className="font-bold text-[#7A1F2B] block">Native Village (मूल गाँव)</label>
                       <input 
                         type="text" 
                         disabled={filterTehsil === 'All'}
                         value={filterVillage === 'All' ? '' : filterVillage} 
                         onChange={(e) => setFilterVillage(e.target.value || 'All')}
                         placeholder={
                           filterTehsil === 'All' 
                             ? "Please select a tehsil first..." 
                             : "Type Native Village name..."
                         }
                         className={`w-full p-3 border border-gray-300 rounded-xl focus:outline-[#7A1F2B] text-xs ${
                           filterTehsil === 'All' ? 'opacity-60 cursor-not-allowed bg-gray-50' : ''
                         }`}
                       />
                    </div>

                     {/* Education Degree Level with searchable dropdown */}
                     <div className="space-y-2 relative">
                       <label className="font-bold text-[#7A1F2B] block">Education Background / Degree</label>
                       <button
                         type="button"
                         onClick={() => {
                           setIsFilterEduOpen(!isFilterEduOpen);
                           setIsFilterOccOpen(false);
                           setIsFilterIncomeOpen(false);
                           setIsFilterDistrictOpen(false);
                         }}
                         className="w-full text-left text-xs p-3 border border-gray-300 bg-white rounded-xl focus:outline-none flex justify-between items-center cursor-pointer shadow-sm hover:border-[#7A1F2B]/40"
                       >
                         <span className="font-semibold text-gray-800">
                           {filterEducation === 'All' ? "All Education Backgrounds" : filterEducation}
                         </span>
                         <ChevronDown className="h-4 w-4 text-gray-400 font-sans" />
                       </button>

                       {isFilterEduOpen && (
                         <div className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-royal max-h-56 overflow-hidden flex flex-col animate-fade-in">
                           <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-[#F8F4EC]/30">
                             <Search className="h-4 w-4 text-[#7A1F2B]" />
                             <input
                               type="text"
                               placeholder="Search education (e.g. ITI, BTech, MA)..."
                               value={filterEduSearch}
                               onChange={(e) => setFilterEduSearch(e.target.value)}
                               className="w-full text-[11px] bg-transparent border-none outline-none py-1 text-gray-800"
                               autoFocus
                             />
                           </div>
                           
                           <div className="overflow-y-auto flex-1 divide-y divide-gray-50 max-h-40">
                             <button
                               type="button"
                               onClick={() => {
                                 setFilterEducation('All');
                                 setFilterEduSearch('');
                                 setIsFilterEduOpen(false);
                               }}
                               className="w-full text-left text-xs px-4 py-2 hover:bg-[#7A1F2B]/5 text-gray-700 flex justify-between items-center cursor-pointer font-sans"
                             >
                               <strong className="text-[#7A1F2B]">All Backgrounds (सभी)</strong>
                               {filterEducation === 'All' && <Check className="h-3.5 w-3.5 text-[#7A1F2B]" />}
                             </button>

                             {EDUCATION_OPTIONS
                               .filter(e => e.toLowerCase().includes(filterEduSearch.toLowerCase()))
                               .map((eduName) => (
                                 <button
                                   key={eduName}
                                   type="button"
                                   onClick={() => {
                                     setFilterEducation(eduName);
                                     setFilterEduSearch('');
                                     setIsFilterEduOpen(false);
                                   }}
                                   className="w-full text-left text-xs px-4 py-2 hover:bg-[#7A1F2B]/5 text-gray-700 flex justify-between items-center cursor-pointer font-sans"
                                 >
                                   <span>{eduName}</span>
                                   {filterEducation === eduName && <Check className="h-3.5 w-3.5 text-[#7A1F2B]" />}
                                 </button>
                               ))
                             }
                           </div>
                         </div>
                       )}
                     </div>

                     {/* Professional Occupation Search with searchable dropdown */}
                     <div className="space-y-2 relative">
                       <label className="font-bold text-[#7A1F2B] block">Professional / Rural Occupation Search</label>
                       <button
                         type="button"
                         onClick={() => {
                           setIsFilterOccOpen(!isFilterOccOpen);
                           setIsFilterEduOpen(false);
                           setIsFilterIncomeOpen(false);
                           setIsFilterDistrictOpen(false);
                         }}
                         className="w-full text-left text-xs p-3 border border-gray-300 bg-white rounded-xl focus:outline-none flex justify-between items-center cursor-pointer shadow-sm hover:border-[#7A1F2B]/40"
                       >
                         <span className="font-semibold text-gray-800 truncate block max-w-[90%]">
                           {filterOccupation === 'All' ? "All Occupations" : filterOccupation}
                         </span>
                         <ChevronDown className="h-4 w-4 text-gray-400" />
                       </button>

                       {isFilterOccOpen && (
                         <div className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-royal max-h-56 overflow-hidden flex flex-col animate-fade-in">
                           <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-[#F8F4EC]/30">
                             <Search className="h-4 w-4 text-[#7A1F2B]" />
                             <input
                               type="text"
                               placeholder="Search occupation (e.g. Farmer, Carpenter, Teacher)..."
                               value={filterOccSearch}
                               onChange={(e) => setFilterOccSearch(e.target.value)}
                               className="w-full text-[11px] bg-transparent border-none outline-none py-1 text-gray-800"
                               autoFocus
                             />
                           </div>
                           
                           <div className="overflow-y-auto flex-1 divide-y divide-gray-50 max-h-40">
                             <button
                               type="button"
                               onClick={() => {
                                 setFilterOccupation('All');
                                 setFilterOccSearch('');
                                 setIsFilterOccOpen(false);
                               }}
                               className="w-full text-left text-xs px-4 py-2 hover:bg-[#7A1F2B]/5 text-gray-700 flex justify-between items-center cursor-pointer font-sans"
                             >
                               <strong className="text-[#7A1F2B]">All Occupations (सभी कार्यक्षेत्र)</strong>
                               {filterOccupation === 'All' && <Check className="h-3.5 w-3.5 text-[#7A1F2B]" />}
                             </button>

                             {OCCUPATION_OPTIONS
                               .filter(o => o.toLowerCase().includes(filterOccSearch.toLowerCase()))
                               .map((occName) => (
                                 <button
                                   key={occName}
                                   type="button"
                                   onClick={() => {
                                     setFilterOccupation(occName);
                                     setFilterOccSearch('');
                                     setIsFilterOccOpen(false);
                                   }}
                                   className="w-full text-left text-xs px-4 py-2 hover:bg-[#7A1F2B]/5 text-gray-700 flex justify-between items-center cursor-pointer font-sans"
                                 >
                                   <span>{occName}</span>
                                   {filterOccupation === occName && <Check className="h-3.5 w-3.5 text-[#7A1F2B]" />}
                                 </button>
                               ))
                             }
                           </div>
                         </div>
                       )}
                     </div>

                     {/* Expected Income Range selector */}
                     <div className="space-y-2 relative">
                       <label className="font-bold text-[#7A1F2B] block">Expected Income Range</label>
                       <button
                         type="button"
                         onClick={() => {
                           setIsFilterIncomeOpen(!isFilterIncomeOpen);
                           setIsFilterEduOpen(false);
                           setIsFilterOccOpen(false);
                           setIsFilterDistrictOpen(false);
                         }}
                         className="w-full text-left text-xs p-3 border border-gray-300 bg-white rounded-xl focus:outline-none flex justify-between items-center cursor-pointer shadow-sm hover:border-[#7A1F2B]/40"
                       >
                         <span className="font-semibold text-gray-800">
                           {filterIncome === 'All' ? "All Incomes" : filterIncome}
                         </span>
                         <ChevronDown className="h-4 w-4 text-gray-400" />
                       </button>

                       {isFilterIncomeOpen && (
                         <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-royal max-h-56 overflow-y-auto py-1 animate-fade-in divide-y divide-gray-50">
                           <button
                             type="button"
                             onClick={() => {
                               setFilterIncome('All');
                               setIsFilterIncomeOpen(false);
                             }}
                             className="w-full text-left text-xs px-4 py-2 hover:bg-[#7A1F2B]/5 text-gray-700 flex justify-between items-center cursor-pointer font-sans"
                           >
                             <strong className="text-[#7A1F2B]">All Incomes (सभी आय वर्ग)</strong>
                             {filterIncome === 'All' && <Check className="h-3.5 w-3.5 text-[#7A1F2B]" />}
                           </button>

                           {INCOME_OPTIONS.map((incRange) => (
                             <button
                               key={incRange}
                               type="button"
                               onClick={() => {
                                 setFilterIncome(incRange);
                                 setIsFilterIncomeOpen(false);
                               }}
                               className="w-full text-left text-xs px-4 py-2 hover:bg-[#7A1F2B]/5 text-gray-700 flex justify-between items-center cursor-pointer font-sans"
                             >
                               <span>{incRange}</span>
                               {filterIncome === incRange && <Check className="h-3.5 w-3.5 text-[#7A1F2B]" />}
                             </button>
                           ))}
                         </div>
                       )}
                     </div>

                    {/* Marital Status Select */}
                    <div className="space-y-2">
                      <label className="font-bold text-[#7A1F2B] block">Marital Status</label>
                      <select 
                        value={filterMaritalStatus} 
                        onChange={(e) => setFilterMaritalStatus(e.target.value)}
                        className="w-full p-3 border border-gray-300 bg-white rounded focus:outline-[#7A1F2B]"
                      >
                        <option value="All">All Marital Statuses</option>
                        <option value="Never Married">Never Married (अविवाहित)</option>
                        <option value="Divorced">Divorced (तलाकशुदा)</option>
                        <option value="Widowed">Widowed (विधुर/विधवा)</option>
                        <option value="Awaiting Divorce">Awaiting Divorce</option>
                      </select>
                    </div>

                    {/* Verified Match check */}
                    <div className="space-y-4 flex items-center gap-3 bg-[#F8F4EC]/50 p-4 rounded-xl border border-dashed border-[#D4AF37]">
                      <input 
                        type="checkbox" 
                        id="verify_filter" 
                        checked={filterVerifiedOnly}
                        onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
                        className="h-4 w-4 accent-[#7A1F2B] cursor-pointer"
                      />
                      <label htmlFor="verify_filter" className="cursor-pointer">
                        <strong className="text-[#7A1F2B] block">Aadhaar Verified Profiles Only</strong>
                        <span className="text-[10px] text-gray-500 block">Restricts results to verified selfie validation accounts.</span>
                      </label>
                    </div>

                    {/* Premium Match check */}
                    <div className="space-y-4 flex items-center gap-3 bg-[#D4AF37]/10 p-4 rounded-xl border border-dashed border-[#D4AF37]">
                      <input 
                        type="checkbox" 
                        id="premium_filter" 
                        checked={filterPremiumOnly}
                        onChange={(e) => setFilterPremiumOnly(e.target.checked)}
                        className="h-4 w-4 accent-[#7A1F2B] cursor-pointer"
                      />
                      <label htmlFor="premium_filter" className="cursor-pointer">
                        <strong className="text-[#7A1F2B] block">Premium Members Only</strong>
                        <span className="text-[10px] text-gray-500 block">Restricts results to Silver or Gold subscribers.</span>
                      </label>
                    </div>

                    {/* Action buttons */}
                    <div className="md:col-span-3 flex justify-end gap-3 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => {
                          setFilterAgeMin(21);
                          setFilterAgeMax(35);
                          setFilterDistrict('All');
                          setFilterGotra('All');
                          setFilterOccupation('All');
                          setFilterTehsil('All');
                          setFilterVillage('All');
                          setFilterEducation('All');
                          setFilterIncome('All');
                          setFilterMaritalStatus('All');
                          setFilterVerifiedOnly(false);
                          setFilterPremiumOnly(false);
                        }}
                        className="px-5 py-2.5 bg-gray-100 text-gray-700 font-cinzel text-xs font-bold rounded cursor-pointer"
                      >
                        Reset parameters
                      </button>
                      <button 
                        onClick={() => handleExecuteSearch()}
                        className="bg-[#7A1F2B] text-white hover:bg-[#922a38] border border-[#D4AF37] px-8 py-2.5 font-cinzel text-xs font-bold rounded shadow flex items-center gap-2 cursor-pointer"
                      >
                        <Search className="h-4.5 w-4.5" /> Execute Maharaja query
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* ======================= */}
              {/* PROFILE DETAIL VIEW */}
              {/* ======================= */}
              {activeView === 'DETAIL' && currentDetailProfile && (
                <div className="space-y-8 animate-fade-in text-xs md:text-sm">
                  
                  {/* Back Navigation Bar */}
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setActiveView('BROWSE')}
                      className="text-[#7A1F2B] hover:underline font-cinzel font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      ← Back to browse candidates
                    </button>

                    <button 
                      onClick={() => toggleShortlist(currentDetailProfile.id)}
                      className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-gray-700"
                    >
                      <Bookmark className={`h-4 w-4 ${currentDetailProfile.isShortlisted ? 'fill-amber-600 stroke-amber-600' : ''}`} />
                      {currentDetailProfile.isShortlisted ? 'Saved' : 'Shortlist Profile'}
                    </button>
                  </div>

                  {/* Profile Detail Split cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Visual Media Gallery */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-royal">
                        <div className="h-96 rounded-2xl overflow-hidden bg-gray-50 relative">
                          <img 
                            src={currentDetailProfile.photo} 
                            alt={currentDetailProfile.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Checked badge overlays */}
                          <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                            {currentDetailProfile.verified && (
                              <span className="bg-blue-600 text-white font-bold text-[9px] px-3 py-1 rounded-full flex items-center gap-1 shadow">
                                <ShieldCheck className="h-3.5 w-3.5 fill-white text-blue-600" /> AADHAAR VERIFIED
                              </span>
                            )}
                            {currentDetailProfile.premium && (
                              <span className="bg-[#D4AF37] text-[#7A1F2B] font-bold text-[9px] px-3 py-1 rounded-full flex items-center gap-1 shadow">
                                ★ VIP MEMBER
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Interactive Gallery thumbnails preset */}
                        {currentDetailProfile.gallery.length > 0 && (
                          <div className="grid grid-cols-4 gap-3 mt-4">
                            {currentDetailProfile.gallery.map((imgUrl, itemIdx) => (
                              <div key={itemIdx} className="h-16 rounded-lg overflow-hidden border border-gray-200">
                                <img src={imgUrl} alt="Gallery thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Call Action Panel */}
                      <div className="bg-white p-6 rounded-3xl border border-[#D4AF37]/30 shadow-royal space-y-4 text-center">
                        <h4 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">Guardian Communication panel</h4>
                        
                        {membershipStatus === 'Free' ? (
                          <div className="space-y-3">
                            <p className="text-xs text-gray-500">Contact telephone number is hidden for Free plan safety reasons.</p>
                            <div className="p-4 bg-[#F8F4EC] rounded-xl border border-dashed border-[#D4AF37] flex items-center justify-center gap-1.5 font-mono text-gray-400 font-bold">
                              <Phone className="h-4 w-4" /> +91 XXXXX XX824
                            </div>
                            <button 
                              onClick={() => setActiveView('MEMBERSHIP')}
                              className="bg-gradient-to-r from-amber-500 to-[#D4AF37] text-[#7A1F2B] hover:opacity-90 font-cinzel text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-lg w-full"
                            >
                              Upgrade Plan to View Official Phone
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <p className="text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1">
                              <ShieldCheck className="h-4 w-4" /> Golden Shagun Access active! Contact number unlocked.
                            </p>
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-[#7A1F2B] font-mono font-bold text-sm tracking-widest flex items-center justify-center gap-2">
                              <Phone className="h-5 w-5 text-emerald-600" /> {currentDetailProfile.mobile}
                            </div>
                            <span className="text-[10px] text-gray-400 block font-serif">Note: Call representing yourself as a member of Rajasthan Mali Bandhan Samaj.</span>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Right Column: Full comprehensive Details sheets */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Trust & Badges status banner */}
                      <div className="bg-gradient-to-r from-emerald-50/70 to-[#F8F4EC]/60 p-4 rounded-2xl border border-emerald-500/25 flex items-center justify-between text-xs gap-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className={`h-8 w-8 ${currentDetailProfile.verified ? 'text-emerald-600' : 'text-gray-350'}`} />
                          <div>
                            <strong className="text-gray-800 block text-[11px] uppercase tracking-wider font-cinzel">Verification Authenticity</strong>
                            <p className="text-[10px] text-emerald-700 font-mono">
                              {currentDetailProfile.verified ? 'Aadhaar ID Dual-Verified' : 'Standard Registry Pending'}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`px-2 py-1 text-[9px] font-mono font-bold rounded uppercase tracking-wider ${
                            currentDetailProfile.premium 
                              ? 'bg-[#7A1F2B] text-[#D4AF37] border border-[#D4AF37]/35' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {currentDetailProfile.premium ? '💎 ROYAL PREMIA' : 'BASIC CO-FREE'}
                          </span>
                          <span className="block text-[8px] text-gray-400 mt-1">MEMBER STATUS</span>
                        </div>
                      </div>

                      {/* Personal Overview Details Card */}
                      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-royal space-y-4">
                        <div className="border-b border-gray-100 pb-3">
                          <span className="text-[#B8860B] font-mono font-bold uppercase tracking-widest text-[9px]">Genuinely Registered profile</span>
                          <h2 className="font-cinzel text-xl font-bold text-[#7A1F2B]">{currentDetailProfile.name}</h2>
                          <p className="text-xs text-gray-500 font-serif">Registered by {currentDetailProfile.managedBy || 'Parent'} • {currentDetailProfile.maritalStatus}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 font-sans text-gray-700">
                          <div><strong>Own Gotra (Paternal):</strong> {currentDetailProfile.ownGotra || currentDetailProfile.gotra}</div>
                          <div><strong>Mother's Gotra:</strong> {currentDetailProfile.motherGotra || 'Sankhla'}</div>
                          <div><strong>Dadi's Gotra:</strong> {currentDetailProfile.dadiGotra || 'Tak'}</div>
                          <div><strong>Nani's Gotra:</strong> {currentDetailProfile.naniGotra || 'Deora'}</div>
                          <div><strong>Age / Gender:</strong> {currentDetailProfile.age} Yrs • {currentDetailProfile.gender}</div>
                          <div><strong>Date of Birth:</strong> {currentDetailProfile.dob}</div>
                          <div><strong>Marital Status:</strong> {currentDetailProfile.maritalStatus}</div>
                          {currentDetailProfile.childrenDetails && (
                            <div className="col-span-2 bg-[#F8F4EC]/40 p-2 border border-dashed border-[#D4AF37]/30 rounded">
                              <strong>Children Status details:</strong> {currentDetailProfile.childrenDetails}
                            </div>
                          )}
                          <div><strong>Annual Income:</strong> {currentDetailProfile.income}</div>
                          <div><strong>Tehsil Name:</strong> {currentDetailProfile.tehsil}</div>
                          <div><strong>Village Name:</strong> {currentDetailProfile.village}</div>
                        </div>
                      </div>

                      {/* Community Compatibility Card */}
                      {compatibilityResults && (
                        <div className="bg-gradient-to-br from-amber-50 to-white p-6 md:p-8 rounded-3xl border border-[#D4AF37]/55 shadow-royal space-y-6 text-xs md:text-sm">
                          
                          {/* Card Header with Glowing Score */}
                          <div className="flex items-center justify-between border-b border-[#D4AF37]/35 pb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-[#7A1F2B]/10 text-[#7A1F2B] rounded-full">
                                <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
                              </div>
                              <div>
                                <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase tracking-wider">Traditional compatibility breakdown</h3>
                                <p className="text-[10px] text-gray-400 font-serif">
                                  {compatibilityResults.isDemoMode 
                                    ? `Demo Analysis: Comparing with ${compatibilityResults.referenceName}`
                                    : "Live Gotra, Age, and Location comparative breakdown"
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="text-center bg-white border border-[#D4AF37]/30 px-3 py-2 rounded-xl shadow-sm">
                              <span className={`text-2xl font-black font-mono tracking-tighter block ${
                                compatibilityResults.overallScore >= 80 ? 'text-emerald-600' : compatibilityResults.overallScore >= 60 ? 'text-amber-600' : 'text-rose-600'
                              }`}>
                                {compatibilityResults.overallScore}%
                              </span>
                              <span className="text-[8px] uppercase tracking-widest text-[#7A1F2B] font-black">Sutra Fit</span>
                            </div>
                          </div>

                          {/* Gotras Check Grid */}
                          <div className="space-y-3">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Ancestral Four Gotras Match (चार गोत्र जाँच)</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              {/* Own Gotra Check */}
                              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                                compatibilityResults.isOwnGotraMatch ? 'bg-red-50 border-red-200 text-red-950' : 'bg-emerald-50/50 border-emerald-100/60 text-emerald-950'
                              }`}>
                                <div>
                                  <span className="font-semibold block text-[10px] text-gray-500 uppercase">1. Own Gotra ({compatibilityResults.ownGotraVal})</span>
                                  {compatibilityResults.isOwnGotraMatch ? '✗ Collides with your ancestry' : '✓ Own Gotra Different'}
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${compatibilityResults.isOwnGotraMatch ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-emerald-100 text-emerald-800'}`}>
                                  {compatibilityResults.isOwnGotraMatch ? '⚠️ Overlap' : '✓ Safe'}
                                </span>
                              </div>

                              {/* Mother Gotra Check */}
                              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                                compatibilityResults.isMotherGotraMatch ? 'bg-red-50 border-red-200 text-red-950' : 'bg-emerald-50/50 border-emerald-100/60 text-emerald-950'
                              }`}>
                                <div>
                                  <span className="font-semibold block text-[10px] text-gray-500 uppercase">2. Mother Gotra ({compatibilityResults.motherGotraVal})</span>
                                  {compatibilityResults.isMotherGotraMatch ? '✗ Collides with your ancestry' : '✓ Mother Gotra Different'}
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${compatibilityResults.isMotherGotraMatch ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-emerald-100 text-emerald-800'}`}>
                                  {compatibilityResults.isMotherGotraMatch ? '⚠️ Overlap' : '✓ Safe'}
                                </span>
                              </div>

                              {/* Dadi Gotra Check */}
                              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                                compatibilityResults.isDadiGotraMatch ? 'bg-red-50 border-red-200 text-red-955' : 'bg-emerald-50/50 border-emerald-100/60 text-emerald-950'
                              }`}>
                                <div>
                                  <span className="font-semibold block text-[10px] text-gray-500 uppercase">3. Dadi Gotra ({compatibilityResults.dadiGotraVal})</span>
                                  {compatibilityResults.isDadiGotraMatch ? '✗ Collides with your ancestry' : '✓ Dadi Gotra Different'}
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${compatibilityResults.isDadiGotraMatch ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-emerald-100 text-emerald-800'}`}>
                                  {compatibilityResults.isDadiGotraMatch ? '⚠️ Overlap' : '✓ Safe'}
                                </span>
                              </div>

                              {/* Nani Gotra Check */}
                              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                                compatibilityResults.isNaniGotraMatch ? 'bg-red-50 border-red-200 text-red-955' : 'bg-emerald-50/50 border-emerald-100/60 text-emerald-950'
                              }`}>
                                <div>
                                  <span className="font-semibold block text-[10px] text-gray-500 uppercase">4. Nani Gotra ({compatibilityResults.naniGotraVal})</span>
                                  {compatibilityResults.isNaniGotraMatch ? '✗ Collides with your ancestry' : '✓ Nani Gotra Different'}
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${compatibilityResults.isNaniGotraMatch ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-emerald-100 text-emerald-800'}`}>
                                  {compatibilityResults.isNaniGotraMatch ? '⚠️ Overlap' : '✓ Safe'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Extra Dimension gauges: Proximity & Age indices */}
                          <div className="bg-white p-4.5 rounded-2xl border border-gray-150 space-y-3">
                            <span className="text-[9px] font-bold text-[#7A1F2B] uppercase tracking-widest block">Other Key Alignment Metrics</span>
                            
                            <div className="space-y-2.5">
                              {/* Geographic range suitability */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold text-gray-700">
                                  <span>District Proximity (निकटता)</span>
                                  <span>{compatibilityResults.locationScore}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-500" style={{ width: `${compatibilityResults.locationScore}%` }}></div>
                                </div>
                              </div>

                              {/* Age gaps */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold text-gray-700">
                                  <span>Age Gap Suitability ({compatibilityResults.ageDiff} Yrs difference)</span>
                                  <span>{compatibilityResults.ageScore}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                  <div className="h-full bg-sky-500" style={{ width: `${compatibilityResults.ageScore}%` }}></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Cultural outcome badge */}
                          {compatibilityResults.hasGotraMatch ? (
                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-250 text-amber-950 flex gap-2.5 text-[11px] leading-relaxed">
                              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="block font-semibold">Please verify with family elders before proceeding (गोत्र मिलान चेतावनी):</strong>
                                One or more of this candidate's ancestral gotras matches yours. Traditional Rajasthani Mali rules advise verification prior to alliances to preserve health & lineage laws.
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 bg-emerald-55 rounded-xl border border-emerald-200 text-emerald-950 flex gap-2.5 text-[11px] leading-relaxed">
                              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="block font-semibold">Perfect Clan Compatibility (सभी गोत्र अनुकूल):</strong>
                                No overlapping blood relation gotras detected across all lines (Own, Mother, Dadi, Nani). This alliance satisfies community health guidelines.
                              </div>
                            </div>
                          )}

                          {/* Traditional dial times recommendations */}
                          <div className="p-3 bg-[#7A1F2B]/5 rounded-xl border border-[#7A1F2B]/10 text-[#7A1F2B] font-medium text-[10px] flex items-center justify-between">
                            <span>🕒 Recommended Call Timing:</span>
                            <span className="font-bold">{currentDetailProfile.familyContactTiming || "6:00 PM to 9:00 PM (शाम 6 से 9 बजे)"}</span>
                          </div>

                        </div>
                      )}

                      {/* Education & Employment */}
                      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-royal space-y-4">
                        <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase tracking-wider border-b border-gray-100 pb-2">Technical Education & Occupation</h3>
                        <div className="space-y-2.5">
                          <div><strong>Degree:</strong> {currentDetailProfile.education}</div>
                          <div><strong>College / University:</strong> {currentDetailProfile.college}</div>
                          <div><strong>Designation:</strong> {currentDetailProfile.occupation}</div>
                          <div><strong>Company Employer:</strong> {currentDetailProfile.company}</div>
                        </div>
                      </div>

                      {/* Family Background */}
                      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-royal space-y-4">
                        <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase tracking-wider border-b border-gray-100 pb-2">Family Dynasty details (परिवार विवरण)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><strong>Father's Name:</strong> {currentDetailProfile.fatherName}</div>
                          <div><strong>Mother's Name:</strong> {currentDetailProfile.motherName}</div>
                          <div><strong>Family Type Setup:</strong> {currentDetailProfile.familyType} Family</div>
                          <div><strong>Brother Status:</strong> {currentDetailProfile.brothers}</div>
                          <div className="sm:col-span-2"><strong>Sister Status:</strong> {currentDetailProfile.sisters}</div>
                        </div>
                      </div>

                      {/* Partner Preferences */}
                      <div className="bg-white p-6 md:p-8 rounded-3xl border border-amber-500/10 shadow-royal space-y-4 bg-amber-50/5">
                        <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase tracking-wider border-b border-amber-500/10 pb-2">Bride / Groom Partner Preferences (वर-वधू अपेक्षा)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><strong>Preferred Age:</strong> {currentDetailProfile.preferredAge} Years</div>
                          <div><strong>Preferred Districts:</strong> {currentDetailProfile.preferredDistrict}</div>
                          <div><strong>Preferred Education:</strong> {currentDetailProfile.preferredEducation}</div>
                          <div className="sm:col-span-2"><strong>Profession details:</strong> {currentDetailProfile.preferredProfession}</div>
                        </div>
                      </div>

                      {/* Action system */}
                      <div className="flex flex-wrap gap-3">
                        <button 
                          onClick={() => sendInterestConnection(currentDetailProfile.id)}
                          disabled={currentDetailProfile.interestStatus === 'sent'}
                          className={`flex-1 min-w-[200px] py-3 font-cinzel font-bold text-xs rounded-xl shadow-royal transition-all cursor-pointer ${
                            currentDetailProfile.interestStatus === 'sent'
                              ? 'bg-gray-100 text-gray-400 border border-gray-200 text-center'
                              : 'bg-[#7A1F2B] hover:bg-[#922a38] text-white border border-[#D4AF37]'
                          }`}
                        >
                          {currentDetailProfile.interestStatus === 'sent' ? 'Yor Interest Proposal Dispatched' : 'SEND CONNECTION INTEREST'}
                        </button>

                        <button 
                          onClick={() => handleBlockProfile(currentDetailProfile.id)}
                          className="bg-gray-150 hover:bg-slate-200 text-slate-800 py-3 px-6 rounded-xl text-xs font-bold font-cinzel cursor-pointer"
                          title="Block this profile so it is hidden from your browse and searches"
                        >
                          Block Profile
                        </button>

                        <button 
                          onClick={() => { setShowReportModal(true); setReportSuccess(false); }}
                          className="bg-gray-100 hover:bg-red-50 text-red-700 py-3 px-6 rounded-xl text-xs font-bold font-cinzel cursor-pointer"
                        >
                          Report Profile
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* ======================= */}
              {/* INTEREST SYSTEM PAGE */}
              {/* ======================= */}
              {activeView === 'INTERESTS' && (
                <div className="space-y-8 animate-fade-in text-xs md:text-sm">
                  
                  {/* Header */}
                  <div className="border-b border-[#D4AF37]/20 pb-4">
                    <h2 className="font-cinzel text-xl font-bold text-[#7A1F2B]">Sent & Received Interest Proposals</h2>
                    <p className="text-xs text-gray-500 font-serif italic">Track connection proposals sent or received by your family elders.</p>
                  </div>

                  {/* Sent vs Received grids */}
                  {profiles.filter(p => p.interestStatus === 'sent' || p.interestStatus === 'received').length === 0 ? (
                    <div className="bg-white rounded-3xl border border-gray-150 p-16 text-center max-w-xl mx-auto space-y-4 shadow-royal">
                      <Heart className="mx-auto h-12 w-12 text-[#7A1F2B]" />
                      <h3 className="font-cinzel text-base font-bold text-[#7A1F2B]">No interests yet.</h3>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto">
                        Currently there are no sent or received connection interest proposals. Browse candidate profiles to dispatch matching connection proposals now!
                      </p>
                      <button 
                        onClick={() => setActiveView('BROWSE')}
                        className="bg-[#7A1F2B] hover:bg-[#601923] text-white py-2.5 px-6 rounded-lg font-cinzel font-bold text-xs border border-[#D4AF37]"
                      >
                        Browse Candidates
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                      {/* Sent Interests */}
                      <div className="space-y-4">
                        <h3 className="font-cinzel text-sm font-bold text-[#7A1F2B] border-b border-gray-200 pb-2 flex items-center gap-1.5">
                          <Send className="h-4 w-4 text-[#D4AF37]" /> Proposals I Sent ({profiles.filter(p => p.interestStatus === 'sent').length})
                        </h3>

                        {profiles.filter(p => p.interestStatus === 'sent').length === 0 ? (
                          <p className="text-xs text-gray-400 italic bg-white p-4 rounded-xl text-center border">No proposals dispatched yet.</p>
                        ) : (
                          <div className="space-y-3">
                            {profiles.filter(p => p.interestStatus === 'sent').map(item => (
                              <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 justify-between">
                                <div className="flex items-center gap-3">
                                  <img src={item.photo} alt={item.name} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                                  <div>
                                    <h4 className="font-cinzel text-xs font-bold text-gray-800">{item.name}</h4>
                                    <p className="text-[10px] text-gray-500 font-serif">Gotra: {item.gotra} • {item.district}</p>
                                  </div>
                                </div>
                                <span className="bg-[#F8F4EC] text-[#B8860B] text-[9px] uppercase tracking-wider font-bold py-1 px-2 rounded">
                                  Awaiting Reply
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Received Interests */}
                      <div className="space-y-4">
                        <h3 className="font-cinzel text-sm font-bold text-[#7A1F2B] border-b border-gray-200 pb-2 flex items-center gap-1.5">
                          <Heart className="h-4 w-4 text-[#D4AF37] fill-current" /> Proposals Received ({profiles.filter(p => p.interestStatus === 'received').length})
                        </h3>

                        {profiles.filter(p => p.interestStatus === 'received').length === 0 ? (
                          <p className="text-xs text-gray-400 italic bg-white p-4 rounded-xl text-center border">No matching incoming interests yet.</p>
                        ) : (
                          <div className="space-y-3">
                            {profiles.filter(p => p.interestStatus === 'received').map(item => (
                              <div key={item.id} className="bg-white p-4 rounded-xl border border-[#D4AF37]/30 shadow flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                                <div className="flex items-center gap-3">
                                  <img src={item.photo} alt={item.name} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                                  <div>
                                    <h4 className="font-cinzel text-xs font-bold text-gray-800">{item.name}</h4>
                                    <p className="text-[10px] text-gray-500 font-serif">Gotra: {item.gotra} • MD Pediatrician</p>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2 font-mono text-[9px] font-bold">
                                  <button 
                                    onClick={() => handleInterestDecision(item.id, 'accepted')}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-2.5 py-1.5 transition-colors cursor-pointer"
                                  >
                                    ACCEPT INTEREST
                                  </button>
                                  <button 
                                    onClick={() => handleInterestDecision(item.id, 'rejected')}
                                    className="bg-red-50 text-red-700 hover:bg-red-100 rounded px-2.5 py-1.5 transition-colors cursor-pointer"
                                  >
                                    DECLINE
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* ======================= */}
              {/* SHORTLIST PAGE */}
              {/* ======================= */}
              {activeView === 'SHORTLIST' && (
                <div className="space-y-8 animate-fade-in text-xs md:text-sm">
                  
                  {/* Header */}
                  <div className="border-b border-[#D4AF37]/20 pb-4">
                    <h2 className="font-cinzel text-xl font-bold text-[#7A1F2B]">My Favourite Matrimonial Shortlists</h2>
                    <p className="text-xs text-gray-500 font-serif italic">Profiles you pinned for later evaluation by elder parents.</p>
                  </div>

                  {profiles.filter(p => p.isShortlisted).length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center max-w-xl mx-auto border space-y-3">
                      <Bookmark className="mx-auto h-8 w-8 text-amber-500" />
                      <h3 className="font-cinzel text-sm font-bold text-[#7A1F2B]">Shortlist matches list is empty</h3>
                      <p className="text-xs text-gray-400">Browse candidates and tab the bookmark icon of desired girls/boys to show them here instantly.</p>
                      <button onClick={() => setActiveView('BROWSE')} className="bg-[#7A1F2B] text-white font-cinzel text-xs py-2 px-6 rounded font-semibold mt-4">
                        Browse Candidates Now
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {profiles.filter(p => p.isShortlisted).map(item => (
                        <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-gray-150 p-4 shadow-sm space-y-4">
                          <div className="flex gap-3">
                            <img src={item.photo} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-[#D4AF37]" referrerPolicy="no-referrer" />
                            <div className="min-w-0">
                              <h4 className="font-cinzel text-xs font-bold text-gray-800 truncate">{item.name}</h4>
                              <p className="text-[10px] text-gray-500">Gotra: {item.gotra} • Age: {item.age}</p>
                              <p className="text-[10px] text-gray-400 font-mono italic truncate">{item.education}</p>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-gray-100 flex gap-2">
                            <button 
                              onClick={() => viewProfileDetails(item.id)}
                              className="flex-1 bg-[#F8F4EC] text-[#7A1F2B] py-1.5 rounded text-[10px] uppercase font-cinzel font-bold text-center block"
                            >
                              Views
                            </button>
                            <button 
                              onClick={() => toggleShortlist(item.id)}
                              className="text-red-650 hover:bg-red-50 text-red-700 py-1.5 px-3 rounded text-[10px] uppercase font-sans font-semibold border border-red-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* ======================= */}
              {/* MEMBERSHIP PAGE ROUTER */}
              {/* ======================= */}
              {activeView === 'MEMBERSHIP' && (
                <MembershipAndPayment 
                  currentMembershipStatus={membershipStatus} 
                  onUpgradeStatus={(newPlan) => setMembershipStatus(newPlan)}
                  onSetScreenState={(view) => setActiveView(view)}
                />
              )}

              {/* ======================= */}
              {/* NOTIFICATION LOGS LIST */}
              {/* ======================= */}
              {activeView === 'NOTIFICATIONS' && (
                <div className="space-y-6 animate-fade-in text-xs md:text-sm">
                  
                  <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-4">
                    <div>
                      <h2 className="font-cinzel text-xl font-bold text-[#7A1F2B]">Matrimonial System Logs</h2>
                      <p className="text-xs text-gray-500">Secure real-time push logs of connections and parent views</p>
                    </div>

                    <button 
                      onClick={() => setNotifications(prev => prev.map(n => ({...n, unread: false})))}
                      className="text-[#7A1F2B] font-cinzel text-xs font-bold hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>

                   <div className="bg-white rounded-2xl border border-gray-150 divide-y divide-gray-100 shadow-royal overflow-hidden">
                    {notifications.length === 0 ? (
                      <div className="p-12 text-center space-y-3 bg-white">
                        <Bell className="mx-auto h-8 w-8 text-gray-300" />
                        <h4 className="font-cinzel text-sm font-bold text-gray-500">No notifications yet.</h4>
                        <p className="text-xs text-gray-400 max-w-sm mx-auto">
                          Any community safety logs, interest suggestions, or father-mediated messages will appear here.
                        </p>
                      </div>
                    ) : (
                      notifications.map((item) => (
                        <div key={item.id} className={`p-5 flex items-start gap-4 transition-all ${item.unread ? 'bg-amber-50/20' : ''}`}>
                          <div className="p-2.5 bg-[#F8F4EC] rounded-full text-[#7A1F2B]">
                            <Bell className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-sans font-bold text-gray-800 text-xs md:text-sm">{item.title}</h4>
                              <span className="text-[10px] text-gray-400 font-mono">{item.time}</span>
                            </div>
                            <p className="text-xs text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                </div>
              )}

              {/* ======================= */}
              {/* USER SETTINGS CARD */}
              {/* ======================= */}
              {activeView === 'SETTINGS' && (
                <div className="space-y-6 animate-fade-in text-xs md:text-sm max-w-4xl mx-auto">
                  
                  <div className="border-b border-[#D4AF37]/20 pb-4">
                    <h2 className="font-cinzel text-xl font-bold text-[#7A1F2B]">Profile Privacy & Account Settings</h2>
                    <p className="text-xs text-gray-500 font-serif">Setup secure options for photo lockdowns, mobile validation, and dynamic email alerts.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Security credentials */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-royal space-y-4 md:col-span-2">
                      <h3 className="font-cinzel text-sm font-bold text-[#7A1F2B] border-b pb-2">Change Password</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] text-gray-400 font-bold uppercase">Current Secure Password</label>
                          <input 
                            type="password" 
                            value="•••••••••" 
                            disabled
                            className="w-full p-2.5 border border-gray-200 bg-gray-50 text-gray-400 rounded focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-400 font-bold uppercase">New Secure Password</label>
                          <input 
                            type="password" 
                            value={settingsPassword} 
                            onChange={(e) => setSettingsPassword(e.target.value)}
                            className="w-full p-2.5 border border-gray-300 rounded focus:outline-[#7A1F2B]"
                          />
                        </div>

                        <button 
                          onClick={() => alert(`Simulated success: Password updated with high encryption safety!`)}
                          className="bg-[#7A1F2B] hover:bg-[#922a38] text-white px-5 py-2 rounded text-xs tracking-wider font-cinzel font-bold cursor-pointer"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Privacy checkboxes */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-royal space-y-6">
                      <h3 className="font-cinzel text-sm font-bold text-[#7A1F2B] border-b pb-2">Privacy Toggles</h3>
                      
                      <div className="space-y-4">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={profilePrivate} 
                            onChange={(e) => setProfilePrivate(e.target.checked)}
                            className="h-4 w-4 mt-0.5 accent-[#7A1F2B]"
                          />
                          <div>
                            <strong className="text-gray-800 text-[11px] block">Lock Gallery Photos</strong>
                            <p className="text-[10px] text-gray-400">Only premium parents can view photographs</p>
                          </div>
                        </label>

                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={emailAlerts} 
                            onChange={(e) => setEmailAlerts(e.target.checked)}
                            className="h-4 w-4 mt-0.5 accent-[#7A1F2B]"
                          />
                          <div>
                            <strong className="text-gray-800 text-[11px] block">Receive Email Alerts</strong>
                            <p className="text-[10px] text-gray-400">Daily summaries of suitable matching brides / grooms</p>
                          </div>
                        </label>

                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={interestSms} 
                            onChange={(e) => setInterestSms(e.target.checked)}
                            className="h-4 w-4 mt-0.5 accent-[#7A1F2B]"
                          />
                          <div>
                            <strong className="text-gray-800 text-[11px] block">Instant SMS Alerts</strong>
                            <p className="text-[10px] text-gray-400">Get text directly on phone when family shows interest</p>
                          </div>
                        </label>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* ================================== */}
              {/* SUCCESS STORIES SECTION CALLOUT */}
              {/* ================================== */}
              {activeView === 'SUCCESS_STORIES' && (
                <SuccessStories stories={successStories} onAddStory={handleAddNewStory} />
              )}

              {/* ================================== */}
              {/* HERITAGE & ICONS VIEW CALLOUT */}
              {/* ================================== */}
              {activeView === 'HERITAGE' && (
                <HeritagePage />
              )}

              {/* ================================== */}
              {/* HELPDESK OFFICE PANEL VIEW CALLOUT */}
              {/* ================================== */}
              {activeView === 'HELP' && (
                <HelpCenter />
              )}

              {/* ================================== */}
              {/* LEGAL MANDATES TABS VIEW CALLOUT */}
              {/* ================================== */}
              {activeView === 'LEGAL' && (
                <LegalPages />
              )}

              {/* ================================== */}
              {/* SAMAJ HERITAGE AI ADVISOR VIEW CALLOUT */}
              {/* ================================== */}
              {activeView === 'ASSISTANT' && (
                <MaliAssistant 
                  onSearchApply={(filters) => {
                    setFilterGotra(filters.gotra);
                    if (filters.district !== 'All') {
                      setFilterDistrict(filters.district);
                    }
                    if (filters.occupation !== 'All') {
                      setFilterOccupation(filters.occupation);
                    }
                    setActiveView('BROWSE');
                  }} 
                  profiles={profiles} 
                  onViewProfileDetail={(profile) => {
                    setSelectedProfileId(profile.id);
                    setActiveView('DETAIL');
                  }} 
                  onNavigateToView={(view) => setActiveView(view)}
                />
              )}

            </div>
          </main>

        </div>
      ) : (
        
        // ==========================================
        // 2. UNAUTHENTICATED LOGIN / REGISTER split layouts
        // ==========================================
        <div className="flex-1 flex flex-col lg:flex-row min-h-screen">
          
          {/* Left Side: Heritage background image & trust badges */}
          <div className="lg:w-[60%] bg-[#7A1F2B] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-r border-[#D4AF37]/30">
            
            {/* Background elements */}
            <div className="absolute inset-0 z-0 opacity-15">
              <img 
                src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=1200&h=1200" 
                alt="Beautiful Rajasthani heritage palace background" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Jali pattern overlay from the style rules */}
            <div className="absolute inset-0 opacity-10 pointer-events-none jali-overlay" />
            
            {/* Elegant luxury visual line accent from target style */}
            <div className="absolute top-12 left-12 w-32 h-1 bg-[#D4AF37] hidden lg:block" />
            
            <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

            {/* Top brand */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#7A1F2B] flex items-center justify-center border-2 border-[#D4AF37] shadow">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-cinzel text-sm font-bold tracking-widest text-[#D4AF37]">राजस्थान माली बंधन</h1>
                <p className="font-cinzel text-[10px] tracking-wide text-gray-200">RAJASTHAN MALI BANDHAN</p>
              </div>
            </div>

            {/* Center wedding visual and welcome text */}
            <div className="relative z-10 my-12 space-y-6 max-w-lg">
              <span className="font-cinzel text-[10px] uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37]/45 pb-1 block w-fit font-bold">
                MALI SAMAJ MATRIMONIAL PLATFORM
              </span>
              
              <h2 className="font-serif text-3xl md:text-5xl text-[#F8F4EC] leading-tight italic">
                Where Traditional Gotra Honor<br/> Meets <span className="text-[#D4AF37] not-italic font-bold uppercase block mt-1">Modern Relationships.</span>
              </h2>
              
              <p className="font-serif italic text-xs md:text-sm text-gray-200 leading-relaxed">
                "Our ancestors, Mahatma Jyotiba Phule and Savitribai Phule, taught us that an educated, righteous family forms the cornerstone of a proud Samaj. Find partner matches verified by family elders with secure 4-Gotras automated matching."
              </p>

              {/* Verified badges with beautiful gold border styles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
                <div className="p-3 bg-[#F8F4EC]/10 rounded-xl border border-[#D4AF37]/40 flex items-center gap-3 shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
                  <div>
                    <span className="font-bold text-[#D4AF37] block text-xs">Aadhaar Verified</span>
                    <span className="text-[10px] text-gray-200 block">Selfie-check matching</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F8F4EC]/10 rounded-xl border border-[#D4AF37]/40 flex items-center gap-3 shadow-sm">
                  <Flame className="h-5 w-5 text-[#D4AF37]" />
                  <div>
                    <span className="font-bold text-[#D4AF37] block text-xs">8,400+ Candidates</span>
                    <span className="text-[10px] text-gray-200 block">Jodhpur, Jaipur, Bikaner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Mockup Preview Card - Elegant, premium detail */}
            <div className="hidden xl:block absolute top-[28%] -right-12 w-64 h-80 bg-white rounded-xl shadow-[0_15px_45px_rgba(0,0,0,0.35)] p-4 border-2 border-[#D4AF37] transform rotate-3 select-none z-10">
              <div className="h-40 bg-[#F8F4EC] rounded-lg mb-4 flex items-center justify-center border border-[#D4AF37]/20 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-2 text-[9px] font-bold text-white">
                  Verified Candidate Setup
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-[#7A1F2B] p-1 bg-white flex items-center justify-center shadow">
                  <Landmark className="h-7 w-7 text-[#7A1F2B]" />
                </div>
              </div>
              <div className="space-y-1 font-sans">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs text-[#1F1F1F]">Kuldeep Gehlot</span>
                  <span className="text-[8px] bg-[#D4AF37] text-white px-1 py-0.5 rounded uppercase font-bold font-mono">Premium</span>
                </div>
                <span className="text-[10px] text-[#7A1F2B] font-bold block">Gotra: Solanki • Age: 28</span>
                <span className="text-[9px] text-gray-400 block font-mono">IIT Kharagpur / Tata Motors</span>
              </div>
            </div>

            {/* Bottom stats and copyright citation */}
            <div className="relative z-10 flex flex-wrap gap-6 items-center text-xs text-gray-300 pt-6 border-t border-white/10">
              <div>
                <strong className="text-white text-base block font-mono">1,200+</strong>
                <span>Matches Settle</span>
              </div>
              <div className="h-6 w-px bg-white/10"></div>
              <div>
                <strong className="text-white text-base block font-mono">100%</strong>
                <span>Mali Samaj exclusive</span>
              </div>
            </div>

          </div>

          {/* Right Side: Auth interaction panels (Login, Register, Forgot, OTP, Success message) */}
          <div className="lg:w-[40%] p-8 md:p-14 flex flex-col justify-center bg-white space-y-6">
            
            {/* RENDER CURRENT AUTH FLOW LAYER */}

            {/* 1. AUTH_LOGIN VIEW */}
            {activeView === 'AUTH_LOGIN' && (
              <div className="space-y-6 animate-fade-in text-xs md:text-sm">
                
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-amber-600 tracking-wider font-cinzel block">Welcome back</span>
                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#7A1F2B]">Log In to Rajasthan Mali Bandhan</h3>
                  <p className="text-[11px] text-gray-500 font-serif">Enter your household credentials to access your verification dashboard.</p>
                </div>

                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    clearError();
                    if (authEmail.trim() !== '' && authPassword.trim() !== '') {
                      try {
                        await apiLogin(authEmail, authPassword);
                      } catch (err: any) {
                        console.error('Login process error:', err);
                      }
                    } else {
                      alert('Please provide your registered household credentials, or use the Quick Access buttons above!');
                    }
                  }} 
                  className="space-y-4"
                >
                  {authError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-sans flex items-center gap-2 text-xs">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{authError}</span>
                      <button type="button" onClick={clearError} className="font-bold hover:underline cursor-pointer">Dismiss</button>
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 block">Registered Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-amber-800" />
                      <input 
                        type="email" 
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="e.g. father.gehlot@gmail.com" 
                        required
                        className="w-full pl-10 p-3 input-maharaja focus:border-[#7A1F2B] text-xs font-sans placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-bold text-gray-700">Account Password</label>
                      <button 
                        type="button"
                        onClick={() => setActiveView('AUTH_FORGOT')}
                        className="text-amber-800 hover:underline font-semibold cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-amber-800" />
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        required
                        className="w-full pl-10 p-3 input-maharaja focus:border-[#7A1F2B] text-xs font-sans placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-maharaja py-3.5 rounded-md cursor-pointer text-xs"
                  >
                    Enter Samaj Portal
                  </button>
                </form>

                <div className="text-center pt-2">
                  <span className="text-gray-500">Don't have a matrimonial account yet? </span>
                  <button 
                    onClick={() => setActiveView('AUTH_REGISTER')}
                    className="text-[#7A1F2B] font-bold hover:underline cursor-pointer"
                  >
                    Register New Bride/Groom
                  </button>
                </div>

              </div>
            )}

            {/* 2. AUTH_REGISTER VIEW */}
            {activeView === 'AUTH_REGISTER' && (
              <div className="space-y-6 animate-fade-in text-xs md:text-sm">
                
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-amber-600 tracking-wider font-cinzel block">Sutrabandh registration</span>
                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#7A1F2B]">Create Matrimonial Account</h3>
                  <p className="text-[11px] text-gray-500 font-serif">Quick setup to initiate your secure 10-step matching profile creation wizard.</p>
                </div>

                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    clearError();
                    if (authMobile.trim().length < 8) {
                      alert('For robust system verification, your mobile phone number will act as your default login password and must be at least 8 characters long!');
                      return;
                    }
                    try {
                      await apiRegister(authEmail, authMobile.trim(), authName, authMobile.trim(), authGender);
                      setOtpSentPhone(authMobile);
                      setOtpCode('');
                      setActiveView('AUTH_OTP');
                    } catch (err: any) {
                      console.error('Registration process error:', err);
                    }
                  }} 
                  className="space-y-4"
                >
                  {authError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-sans flex items-center gap-2 text-xs">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{authError}</span>
                      <button type="button" onClick={clearError} className="font-bold hover:underline cursor-pointer">Dismiss</button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Divya Saini" 
                        required
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        className="w-full p-2.5 input-maharaja text-xs font-sans placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-gray-700">Mobile Phone</label>
                      <input 
                        type="tel" 
                        placeholder="e.g. +91 94140 XXXXX" 
                        required
                        value={authMobile}
                        onChange={(e) => setAuthMobile(e.target.value)}
                        className="w-full p-2.5 input-maharaja text-xs font-sans placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 block">Account Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. parent.gehlot@gmail.com" 
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full p-2.5 input-maharaja text-xs font-sans placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="font-bold text-gray-700 block text-xs">Profile Created For</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Son', 'Daughter', 'Self'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className="py-2 border border-gray-200 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50 focus:bg-amber-50 focus:border-[#D4AF37] focus:text-[#7A1F2B] cursor-pointer"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block font-bold text-gray-700 text-xs">Marriage Gender of Bride / Groom</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setAuthGender('Male')}
                        className={`py-2 px-4 rounded text-xs font-bold border transition-all cursor-pointer ${authGender === 'Male' ? 'bg-[#7A1F2B] border-[#D4AF37] text-white' : 'border-gray-200 text-gray-600'}`}
                      >
                        Male (वर)
                      </button>
                      <button 
                        type="button"
                        onClick={() => setAuthGender('Female')}
                        className={`py-2 px-4 rounded text-xs font-bold border transition-all cursor-pointer ${authGender === 'Female' ? 'bg-[#7A1F2B] border-[#D4AF37] text-white' : 'border-gray-200 text-gray-600'}`}
                      >
                        Female (वधु)
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/50 rounded-xl border border-dashed border-[#D4AF37] text-[10px] text-gray-500 leading-relaxed font-sans">
                    By proceeding, you verify that you belong strictly to the Rajasthan Mali Samaj (Saini/Gehlot/Solanki/Tak/etc) and agree to upload true family gotras.
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-maharaja py-3.5 rounded-md cursor-pointer text-xs"
                  >
                    Send One-Time Verification OTP
                  </button>
                </form>

                <div className="text-center pt-2">
                  <span className="text-gray-500">Already registered household? </span>
                  <button 
                    onClick={() => setActiveView('AUTH_LOGIN')}
                    className="text-[#7A1F2B] font-bold hover:underline cursor-pointer"
                  >
                    Log In Directly
                  </button>
                </div>

              </div>
            )}

            {/* 3. AUTH_FORGOT VIEW */}
            {activeView === 'AUTH_FORGOT' && (
              <div className="space-y-6 animate-fade-in text-xs md:text-sm">
                
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-amber-600 tracking-wider font-cinzel block">Forgotten password retrieval</span>
                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#7A1F2B]">Retrieve Account Password</h3>
                  <p className="text-[11px] text-gray-500 font-serif">Enter your registered email below. We'll message secure verification credentials.</p>
                </div>

                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    clearError();
                    if (forgotEmail.trim() !== '') {
                      try {
                        await sendPasswordReset(forgotEmail.trim());
                        setActiveView('AUTH_SUCCESS_MSG');
                      } catch (err: any) {
                        console.error('Password reset process error:', err);
                      }
                    }
                  }} 
                  className="space-y-4"
                >
                  {authError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-sans flex items-center gap-2 text-xs">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{authError}</span>
                      <button type="button" onClick={clearError} className="font-bold hover:underline cursor-pointer">Dismiss</button>
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 block">Registered Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. father.gehlot@gmail.com" 
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full p-2.5 input-maharaja text-xs font-sans placeholder-gray-400"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-maharaja py-3.5 rounded-md cursor-pointer text-xs"
                  >
                    Send Password Retrieval Code
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setActiveView('AUTH_LOGIN')}
                    className="w-full text-center text-xs text-[#7A1F2B] font-bold font-cinzel tracking-wider block hover:underline cursor-pointer"
                  >
                    ← Cancel, back to login
                  </button>
                </form>

              </div>
            )}

            {/* 4. AUTH_OTP VERIFICATION */}
            {activeView === 'AUTH_OTP' && (
              <div className="space-y-6 animate-fade-in text-xs md:text-sm max-w-sm mx-auto w-full">
                <div className="text-center space-y-2">
                  <span className="p-2.5 bg-amber-50 text-amber-700 rounded-full inline-block">
                    <Phone className="h-6 w-6" />
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-[#7A1F2B]">SMS Verification Inbound</h3>
                  <p className="text-xs text-gray-500 font-serif">
                    We sent a simulated 4-digit code to your mobile phone: <strong>{otpSentPhone || '+91 94140 XXXXX'}</strong>
                  </p>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (otpCode === '1234') {
                      // Simulated registration data passed to Wizard
                      setActiveView('WIZARD');
                    } else {
                      alert('Please input the simulated OTP code "1234" to test verification success!');
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 text-center block">Enter 4-Digit OTP Code</label>
                    <input 
                      type="text" 
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="e.g. 1234" 
                      required
                      className="w-full text-center font-mono tracking-widest text-lg p-3 input-maharaja"
                    />
                    <span className="text-[10px] text-amber-700 italic block text-center mt-1">Hint: Type in "1234" to bypass security securely.</span>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-maharaja py-3.5 rounded-md cursor-pointer text-xs"
                  >
                    Confirm Verifications
                  </button>

                  <div className="text-center">
                    <button 
                      type="button" 
                      onClick={() => alert('Simulated SMS resent!')}
                      className="text-xs text-amber-800 font-bold hover:underline cursor-pointer"
                    >
                      Resend OTP Code
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 5. AUTH_SUCCESS_MSG MAIL VERIFIED */}
            {activeView === 'AUTH_SUCCESS_MSG' && (
              <div className="space-y-6 animate-fade-in text-xs md:text-sm text-center max-w-sm mx-auto w-full">
                <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <Check className="h-8 w-8 text-emerald-600" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-cinzel text-lg font-bold text-[#7A1F2B]">Retrieval Query Sent</h3>
                  <p className="text-xs text-gray-500 font-serif">
                    We successfully dispatched a verified retrieval link to your backup mail container account.
                  </p>
                </div>

                <button 
                  onClick={() => setActiveView('AUTH_LOGIN')}
                  className="btn-maharaja py-3.5 rounded-md cursor-pointer text-xs w-full"
                >
                  Return to portal login
                </button>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* 3. REPORT PROFILE MODAL */}
      {/* ========================================== */}
      {showReportModal && (
        <div className="fixed inset-0 bg-[#1F1F1F]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-gray-200 shadow-2xl space-y-4">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b pb-2">Report Offensive Profile</h3>
            
            {reportSuccess ? (
              <div className="p-6 bg-emerald-5 border bg-emerald-50 text-emerald-800 rounded-xl text-center space-y-2">
                <p className="text-xs font-bold">Inquiry Logged Securly!</p>
                <p className="text-[11px] text-gray-500">Mali Samaj legal representative in Jodhpur has received the telemetry complaint. Action takes 30 minutes.</p>
                <button onClick={() => setShowReportModal(false)} className="bg-[#7A1F2B] text-white text-xs px-4 py-1.5 rounded mt-3">Close</button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <p className="text-gray-500">To maintain the sanctity of families, please outline your concerns:</p>
                
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Violation Category</label>
                  <select 
                    value={reportReason} 
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded focus:outline-none"
                  >
                    <option>Fake / Misleading Gotra details</option>
                    <option>Inappropriate / Offensive photos</option>
                    <option>Dowry / Illegal monetary demands during calls</option>
                    <option>Not belonging to Rajasthan Mali Samaj</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Detailed Complaint Narrative</label>
                  <textarea 
                    rows={3} 
                    required 
                    placeholder="Provide detailed description of issues..."
                    className="w-full p-2.5 border border-gray-300 rounded focus:outline-[#7A1F2B]"
                  ></textarea>
                </div>

                <div className="flex gap-2 justify-end pt-3">
                  <button onClick={() => setShowReportModal(false)} className="px-4 py-2 bg-gray-100 rounded cursor-pointer">Cancel</button>
                  <button 
                    onClick={() => {
                      if (currentDetailProfile) {
                        handleReportProfile(currentDetailProfile.id, reportReason || "Gotra mismatch / Incorrect narrative");
                      }
                      setReportSuccess(true);
                    }} 
                    className="px-4 py-2 bg-[#7A1F2B] hover:bg-[#922a38] text-white rounded font-bold font-cinzel cursor-pointer"
                  >
                    Submit Complaint
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. FOOTER CULTURAL FOOTNOTES */}
      {/* ========================================== */}
      <footer className="bg-white border-t border-[#D4AF37]/20 pt-12 pb-24 md:pb-12 text-xs text-gray-500 select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          {/* Column 1: About */}
          <div className="space-y-4">
            <p className="font-cinzel text-xs font-bold text-[#7A1F2B] tracking-widest gap-2 flex items-center">
              <Landmark className="h-4.5 w-4.5 text-[#D4AF37]" /> राजस्थान माली बंधन
            </p>
            <p className="text-[10px] text-gray-400 font-serif leading-relaxed italic">
              "Educate, Unite, Uplift." Operating under Mahatma Jyotiba Phule guidelines, this secure digital platform empowers Mali marriages with heritage authenticity and verified direct connections.
            </p>
            <p className="text-[9px] text-[#B8860B] font-sans">
              Dedicated to families across Jodhpur, Pali, Marwar, Jaipur, Udaipur, and all corners of Rajasthan state.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3 font-sans">
            <h4 className="font-cinzel text-[10px] font-bold text-gray-800 tracking-wider">MEMBER DIRECTORY & SUPPORT</h4>
            <ul className="space-y-2 text-[10px]">
              <li>
                <button 
                  onClick={() => { setActiveView('BROWSE'); setSelectedProfileId(null); }} 
                  className="hover:text-[#7A1F2B] hover:underline cursor-pointer transition-colors block text-left"
                >
                  🔍 Browse Grooms & Brides Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('ASSISTANT'); }}
                  className="hover:text-[#7A1F2B] hover:underline cursor-pointer transition-colors block text-left"
                >
                  ✦ Samaj AI Kundli Advisor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('HELP'); }}
                  className="hover:text-[#7A1F2B] hover:underline cursor-pointer transition-colors block text-left font-bold"
                >
                  📞 Contact Official Support Line
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('SUCCESS_STORIES'); }}
                  className="hover:text-[#7A1F2B] hover:underline cursor-pointer transition-colors block text-left"
                >
                  💖 Shubh Vivah Success Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Compliance */}
          <div className="space-y-3 font-sans">
            <h4 className="font-cinzel text-[10px] font-bold text-gray-800 tracking-wider">CULTURAL TRUST & POLICY MATTERS</h4>
            <ul className="space-y-2 text-[10px]">
              <li>
                <button 
                  onClick={() => { setActiveView('LEGAL'); }}
                  className="hover:text-[#7A1F2B] hover:underline cursor-pointer transition-colors block text-left"
                >
                  🛡️ Secure Privacy & Identity Guard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('LEGAL'); }}
                  className="hover:text-[#7A1F2B] hover:underline cursor-pointer transition-colors block text-left"
                >
                  ⚖️ Terms & Community Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('LEGAL'); }}
                  className="hover:text-[#7A1F2B] hover:underline cursor-pointer transition-colors block text-left"
                >
                  💳 Shagun Fee & Refund Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('LEGAL'); }}
                  className="hover:text-[#7A1F2B] hover:underline cursor-pointer transition-colors block text-left text-amber-800 font-bold"
                >
                  🤝 Community Marriage Guidelines
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 pt-6 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[9px] text-gray-400 font-mono">
            © 2018 - 2026 Rajasthan Mali Bandhan Inc. All marriage matches aligned with local traditional values.
          </p>
          <div className="flex gap-4 text-[9px] text-gray-400 underline font-sans">
            <button onClick={() => { setActiveView('LEGAL'); }} className="hover:text-[#7A1F2B]">Privacy</button>
            <button onClick={() => { setActiveView('LEGAL'); }} className="hover:text-[#7A1F2B]">Terms</button>
            <button onClick={() => { setActiveView('LEGAL'); }} className="hover:text-[#7A1F2B]">Refunds</button>
            <span className="no-underline text-emerald-600 font-bold">● Secure SSL Gateway</span>
          </div>
        </div>
      </footer>

      {/* 6. MOBILE BOTTOM NAVIGATION SYSTEM (FOR AUTHENTICATED USERS) */}
      {currentUser && (
        <div className="md:hidden fixed bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-[#D4AF37]/45 rounded-2xl z-40 flex justify-around items-center py-2.5 px-1 shadow-[0_5px_18px_rgba(0,0,0,0.12)] border-b-2">
          
          <button 
            onClick={() => setActiveView('DASHBOARD')}
            className={`flex flex-col items-center gap-0.5 justify-center flex-1 cursor-pointer transition-colors ${activeView === 'DASHBOARD' ? 'text-[#7A1F2B]' : 'text-gray-400'}`}
          >
            <Users className="h-4.5 w-4.5" />
            <span className="text-[8px] font-bold uppercase tracking-tight">Dashboard</span>
          </button>

          <button 
            onClick={() => {
              setActiveView('BROWSE');
              setSelectedProfileId(null);
            }}
            className={`flex flex-col items-center gap-0.5 justify-center flex-1 cursor-pointer transition-colors ${activeView === 'BROWSE' || activeView === 'DETAIL' ? 'text-[#7A1F2B]' : 'text-gray-400'}`}
          >
            <Search className="h-4.5 w-4.5" />
            <span className="text-[8px] font-bold uppercase tracking-tight">Browse</span>
          </button>

          <button 
            onClick={() => setActiveView('ASSISTANT')}
            className={`flex flex-col items-center gap-0.5 justify-center flex-1 cursor-pointer transition-colors ${activeView === 'ASSISTANT' ? 'text-[#7A1F2B]' : 'text-gray-400'}`}
          >
            <div className="relative">
              <Sparkles className="h-4.5 w-4.5" />
              <div className="absolute -top-1 -right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-tight">AI Advisor</span>
          </button>

          <button 
            onClick={() => setActiveView('INTERESTS')}
            className={`flex flex-col items-center gap-0.5 justify-center flex-1 cursor-pointer transition-colors ${activeView === 'INTERESTS' ? 'text-[#7A1F2B]' : 'text-gray-400'}`}
          >
            <Heart className="h-4.5 w-4.5" />
            <span className="text-[8px] font-bold uppercase tracking-tight">Interests</span>
          </button>

          <button 
            onClick={() => setActiveView('NOTIFICATIONS')}
            className={`flex flex-col items-center gap-0.5 justify-center flex-1 cursor-pointer relative transition-colors ${activeView === 'NOTIFICATIONS' ? 'text-[#7A1F2B]' : 'text-gray-400'}`}
          >
            <div className="relative">
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-650 text-white font-mono font-bold text-[7px] h-3.5 min-w-[14px] px-1 rounded-full flex items-center justify-center border border-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <span className="text-[8px] font-bold uppercase tracking-tight">Inbox</span>
          </button>

        </div>
      )}

      {/* 5. FLOATING PREMIUM TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#7A1F2B] border-2 border-[#D4AF37] text-white p-4 rounded-xl shadow-2xl flex items-start gap-2.5 max-w-md animate-fade-in">
          <Sparkles className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-0.5">
            <p className="font-cinzel text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase">Matrimonial System Dispatch</p>
            <p className="text-[11px] text-gray-100 font-sans leading-relaxed">{toastMessage}</p>
          </div>
        </div>
      )}

    </div>
  );
}
