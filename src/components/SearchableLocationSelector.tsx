import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, MapPin, ChevronDown, Check, Sparkles, Navigation } from 'lucide-react';
import { locationDb, DistrictRecord, TehsilRecord } from '../locationDb';

interface SearchableLocationSelectorProps {
  district: string;
  onDistrictChange: (district: string) => void;
  tehsil: string;
  onTehsilChange: (tehsil: string) => void;
  village: string;
  onVillageChange: (village: string) => void;
  inlineLayout?: boolean; // toggle clean inline card style vs wizard block
}

export default function SearchableLocationSelector({
  district,
  onDistrictChange,
  tehsil,
  onTehsilChange,
  village,
  onVillageChange,
  inlineLayout = false
}: SearchableLocationSelectorProps) {
  // District Dropdown State
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState("");
  const districts = useMemo(() => locationDb.getDistricts(), []);
  
  // Tehsil Dropdown State
  const [isTehsilOpen, setIsTehsilOpen] = useState(false);
  const [tehsilSearch, setTehsilSearch] = useState("");
  
  // Loaded correspond tehsils table query
  const tehsils = useMemo(() => {
    if (!district) return [];
    return locationDb.getTehsilsByDistrictName(district);
  }, [district]);

  const districtRef = useRef<HTMLDivElement>(null);
  const tehsilRef = useRef<HTMLDivElement>(null);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
        setIsDistrictOpen(false);
      }
      if (tehsilRef.current && !tehsilRef.current.contains(event.target as Node)) {
        setIsTehsilOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter districts based on search
  const filteredDistricts = useMemo(() => {
    if (!districtSearch.trim()) return districts;
    const query = districtSearch.toLowerCase();
    return districts.filter(d => d.name.toLowerCase().includes(query));
  }, [districtSearch, districts]);

  // Filter tehsils based on search
  const filteredTehsils = useMemo(() => {
    if (!tehsilSearch.trim()) return tehsils;
    const query = tehsilSearch.toLowerCase();
    return tehsils.filter(t => t.name.toLowerCase().includes(query));
  }, [tehsilSearch, tehsils]);

  // When district changes, clear or reset tehsil and native village
  const handleDistrictSelect = (selectedName: string) => {
    onDistrictChange(selectedName);
    onTehsilChange(""); // Reset tehsil hierarchy
    onVillageChange(""); // Reset village hierarchy
    setDistrictSearch("");
    setIsDistrictOpen(false);
  };

  const handleTehsilSelect = (selectedName: string) => {
    onTehsilChange(selectedName);
    setTehsilSearch("");
    setIsTehsilOpen(false);
  };

  // Add custom Tehsil if not found in table query
  const handleAddCustomTehsil = () => {
    if (!tehsilSearch.trim() || !district) return;
    const added = locationDb.insertTehsil(district, tehsilSearch.trim());
    handleTehsilSelect(added.name);
  };

  return (
    <div className={`space-y-4 ${inlineLayout ? 'bg-[#F8F4EC]/40 p-4 rounded-2xl border border-amber-900/10' : ''}`}>
      
      {/* 1. DISTRICT SELECTION WITH ADVANCED SEARCH */}
      <div className="space-y-1 relative" ref={districtRef}>
        <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-[#7A1F2B]" /> Native District (सभी 50 ज़िले)
        </label>
        
        <button
          type="button"
          onClick={() => setIsDistrictOpen(!isDistrictOpen)}
          className="w-full text-left text-xs p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7A1F2B] flex justify-between items-center transition-all duration-200"
        >
          <span className={district ? "text-gray-800 font-semibold" : "text-gray-400"}>
            {district ? `${district}, Rajasthan` : "Select Rajasthan District (searchable)..."}
          </span>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDistrictOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {isDistrictOpen && (
          <div className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-royal max-h-60 overflow-hidden flex flex-col animate-fade-in">
            {/* Search Input Bar */}
            <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-[#F8F4EC]/30">
              <Search className="h-4 w-4 text-[#7A1F2B]" />
              <input
                type="text"
                placeholder="Search districts (e.g. Jaipur, Phalodi, Pali)..."
                value={districtSearch}
                onChange={(e) => setDistrictSearch(e.target.value)}
                className="w-full text-xs bg-transparent border-none outline-none py-1 text-gray-800"
                autoFocus
              />
            </div>
            
            <div className="overflow-y-auto flex-1 py-1 divide-y divide-gray-50 max-h-48">
              {filteredDistricts.length === 0 ? (
                <div className="text-center py-4 text-xs text-gray-400 font-serif italic">
                  No districts found for "{districtSearch}"
                </div>
              ) : (
                filteredDistricts.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleDistrictSelect(d.name)}
                    className="w-full text-left text-xs px-4 py-2 flex items-center justify-between hover:bg-[#7A1F2B]/5 text-gray-700 transition-colors"
                  >
                    <span>{d.name}</span>
                    {district === d.name && <Check className="h-3.5 w-3.5 text-[#7A1F2B] stroke-[3px]" />}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. TEHSIL SELECTION (LOADED AUTOMATICALLY BASED ON DISTRICT) */}
      <div className="space-y-1 relative" ref={tehsilRef}>
        <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
          <Navigation className="h-3.5 w-3.5 text-[#7A1F2B]" /> Taluka / Tehsil (तहसील)
        </label>

        <button
          type="button"
          disabled={!district}
          onClick={() => setIsTehsilOpen(!isTehsilOpen)}
          className={`w-full text-left text-xs p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7A1F2B] flex justify-between items-center transition-all duration-200 ${
            !district ? 'opacity-60 cursor-not-allowed bg-gray-50' : ''
          }`}
        >
          <span className={tehsil ? "text-gray-800 font-semibold" : "text-gray-400"}>
            {!district 
              ? "Please select a district first..." 
              : tehsil 
                ? tehsil 
                : "Select Tehsil (automatically queried)..."
            }
          </span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>

        {isTehsilOpen && district && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-royal max-h-60 overflow-hidden flex flex-col animate-fade-in">
            {/* Search Input Bar */}
            <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-[#F8F4EC]/30">
              <Search className="h-4 w-4 text-[#7A1F2B]" />
              <input
                type="text"
                placeholder={`Search tehsils in ${district}...`}
                value={tehsilSearch}
                onChange={(e) => setTehsilSearch(e.target.value)}
                className="w-full text-xs bg-transparent border-none outline-none py-1 text-gray-800"
                autoFocus
              />
            </div>

            <div className="overflow-y-auto flex-1 py-1 divide-y divide-gray-50 max-h-48">
              {filteredTehsils.length === 0 ? (
                <div className="p-3 text-center">
                  <p className="text-[11px] text-gray-400 italic mb-2">
                    Tehsil "{tehsilSearch}" not in {district} table.
                  </p>
                  {tehsilSearch.trim() && (
                    <button
                      type="button"
                      onClick={handleAddCustomTehsil}
                      className="inline-flex items-center gap-1 bg-[#7A1F2B] hover:bg-[#922a38] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg shadow"
                    >
                      <Sparkles className="h-3 w-3 text-[#D4AF37]" /> Add "{tehsilSearch}" to DB
                    </button>
                  )}
                </div>
              ) : (
                filteredTehsils.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTehsilSelect(t.name)}
                    className="w-full text-left text-xs px-4 py-2 flex items-center justify-between hover:bg-[#7A1F2B]/5 text-gray-700 transition-colors"
                  >
                    <span>{t.name}</span>
                    {tehsil === t.name && <Check className="h-3.5 w-3.5 text-[#7A1F2B] stroke-[3px]" />}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. NATIVE VILLAGE SELECTION */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-700 block text-left">
          Native Village Name (मूल गाँव / ढाणी)
        </label>
        <input
          type="text"
          disabled={!tehsil}
          value={village}
          onChange={(e) => onVillageChange(e.target.value)}
          placeholder={!tehsil ? "Please select a tehsil first..." : "e.g. Bilara, Salawas, Mandore"}
          className={`w-full text-xs p-3 border border-gray-300 rounded-xl bg-white focus:outline-[#7A1F2B] ${
            !tehsil ? 'opacity-60 cursor-not-allowed bg-gray-50' : ''
          }`}
        />
      </div>

    </div>
  );
}
