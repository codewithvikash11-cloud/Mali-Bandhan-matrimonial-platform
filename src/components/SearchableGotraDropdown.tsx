import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Check, ChevronDown, Sparkles } from 'lucide-react';
import { gotraDb, GotraRecord } from '../gotraDb';

interface SearchableGotraDropdownProps {
  label: string;
  value: string;
  onChange: (gotraName: string) => void;
  idSuffix?: string;
}

export default function SearchableGotraDropdown({ label, value, onChange, idSuffix = "" }: SearchableGotraDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [gotras, setGotras] = useState<GotraRecord[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customGotraName, setCustomGotraName] = useState("");
  const [customGotraHindi, setCustomGotraHindi] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load gotras dynamically from simulated localStorage database table
  const loadGotras = () => {
    setGotras(gotraDb.getAll());
  };

  useEffect(() => {
    loadGotras();
  }, [isOpen]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter gotras dynamically based on search string
  const filteredGotras = React.useMemo(() => {
    if (!search.trim()) return gotras;
    const query = search.toLowerCase();
    return gotras.filter(g => 
      g.name.toLowerCase().includes(query) || 
      (g.hindiName && g.hindiName.toLowerCase().includes(query))
    );
  }, [search, gotras]);

  // Groupings for elegant UI display
  const popularGotras = filteredGotras.filter(g => g.isPopular && !g.isCustom);
  const recentlyUsedGotras = filteredGotras.filter(g => g.isRecentlyUsed && !g.isPopular);
  const customGotras = filteredGotras.filter(g => g.isCustom);
  const regularGotras = filteredGotras.filter(g => !g.isPopular && !g.isRecentlyUsed && !g.isCustom);

  // Flat list helper for keyboard navigation index mapping
  const flatFilteredList: Array<{ record: GotraRecord | 'OTHER'; isOther: boolean }> = [];
  popularGotras.forEach(r => flatFilteredList.push({ record: r, isOther: false }));
  recentlyUsedGotras.forEach(r => flatFilteredList.push({ record: r, isOther: false }));
  customGotras.forEach(r => flatFilteredList.push({ record: r, isOther: false }));
  regularGotras.forEach(r => flatFilteredList.push({ record: r, isOther: false }));
  flatFilteredList.push({ record: 'OTHER', isOther: true }); // Add "Other / My Gotra Not Listed"

  // Select a gotra Handler
  const handleSelect = (gotraName: string) => {
    onChange(gotraName);
    gotraDb.markRecentlyUsed(gotraName);
    setIsOpen(false);
    setSearch("");
    setActiveIndex(-1);
    setIsAddingCustom(false);
  };

  // Keyboard navigation controller
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(prev => (prev + 1 >= flatFilteredList.length ? 0 : prev + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 < 0 ? flatFilteredList.length - 1 : prev - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < flatFilteredList.length) {
          const item = flatFilteredList[activeIndex];
          if (item.isOther) {
            setIsAddingCustom(true);
          } else {
            handleSelect((item.record as GotraRecord).name);
          }
        }
        break;
      case "Escape":
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      default:
        break;
    }
  };

  // Save new custom gotra to the database
  const handleAddCustomGotraSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGotraName.trim()) return;

    // Save custom gotra dynamically to localStorage DB table
    const saved = gotraDb.insert(customGotraName.trim(), customGotraHindi.trim() || undefined);
    handleSelect(saved.name);
    
    // Clear inputs
    setCustomGotraName("");
    setCustomGotraHindi("");
    setIsAddingCustom(false);
  };

  return (
    <div id={`gotra-dropdown-container-${idSuffix}`} className="space-y-1 relative w-full text-xs" ref={dropdownRef}>
      <label className="text-xs font-semibold text-gray-700 block text-left">
        {label}
      </label>

      {/* Dropdown trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 50);
          }
        }}
        onKeyDown={handleKeyDown}
        className="w-full p-3 border border-gray-300 rounded bg-white text-left flex items-center justify-between hover:border-[#7A1F2B] transition-colors focus:outline-[#7A1F2B]"
      >
        <span className={value ? "text-gray-900 font-medium" : "text-gray-400"}>
          {value || "Select Gotra..."}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {/* Nested custom gotra builder block if chosen other */}
      {isAddingCustom && (
        <div className="mt-2 p-3 bg-[#F8F4EC] border border-[#D4AF37]/45 rounded-xl space-y-2 text-xs">
          <p className="font-bold text-[#7A1F2B] flex items-center gap-1">
            <Plus className="h-3.5 w-3.5" /> Direct Custom Gotra Registrary
          </p>
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 block">English Gotra Name</span>
            <input 
              type="text" 
              value={customGotraName}
              onChange={(e) => setCustomGotraName(e.target.value)}
              placeholder="e.g. Goyal, Parihar, Borana"
              className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B] text-xs"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 block">Hindi Gotra Name (Optional)</span>
            <input 
              type="text" 
              value={customGotraHindi}
              onChange={(e) => setCustomGotraHindi(e.target.value)}
              placeholder="e.g. गोयल, परिहार, बोराणा"
              className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B] text-xs"
            />
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <button 
              type="button" 
              onClick={() => setIsAddingCustom(false)}
              className="px-2.5 py-1.5 text-gray-600 font-medium hover:bg-gray-100 rounded text-[11px]"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleAddCustomGotraSubmit}
              disabled={!customGotraName.trim()}
              className="px-3 py-1.5 bg-[#7A1F2B] text-white font-bold rounded text-[11px] hover:bg-[#922a38] transition-colors disabled:opacity-55 cursor-pointer"
            >
              Save to Database
            </button>
          </div>
        </div>
      )}

      {/* Main popover panel list of gotras */}
      {isOpen && !isAddingCustom && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-hidden flex flex-col">
          {/* Search bar inside header popover */}
          <div className="p-2 border-b border-gray-100 flex items-center gap-1.5 bg-[#F8F4EC]/30">
            <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <input 
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to filter gotras..."
              className="w-full text-xs bg-transparent focus:outline-none focus:ring-0 p-1"
            />
          </div>

          {/* List area */}
          <div className="flex-1 overflow-y-auto p-1.5 space-y-2 max-h-56">
            
            {/* 1. Popular gotras block */}
            {popularGotras.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] text-amber-700 font-bold tracking-wider px-2 block uppercase flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-[#D4AF37] fill-[#D4AF37]" /> Popular Gotras
                </span>
                {popularGotras.map((g, idx) => {
                  const flatIdx = flatFilteredList.findIndex(item => !item.isOther && (item.record as GotraRecord).id === g.id);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleSelect(g.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        flatIdx === activeIndex ? 'bg-[#7A1F2B]/10 font-medium text-[#7A1F2B]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{g.name} <span className="text-gray-400 text-[10px]">({g.hindiName || g.name})</span></span>
                      {value === g.name && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. Recently used gotras block */}
            {recentlyUsedGotras.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 font-bold tracking-wider px-2 block uppercase">
                  Recently Used
                </span>
                {recentlyUsedGotras.map((g, idx) => {
                  const flatIdx = flatFilteredList.findIndex(item => !item.isOther && (item.record as GotraRecord).id === g.id);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleSelect(g.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        flatIdx === activeIndex ? 'bg-[#7A1F2B]/10 font-medium text-[#7A1F2B]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{g.name} <span className="text-gray-400 text-[10px]">({g.hindiName || g.name})</span></span>
                      {value === g.name && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. Custom gotras block */}
            {customGotras.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] text-indigo-700 font-bold tracking-wider px-2 block uppercase bg-indigo-50 py-0.5 rounded">
                  🛡️ Dynamic Registered Gotras
                </span>
                {customGotras.map((g, idx) => {
                  const flatIdx = flatFilteredList.findIndex(item => !item.isOther && (item.record as GotraRecord).id === g.id);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleSelect(g.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        flatIdx === activeIndex ? 'bg-[#7A1F2B]/10 font-medium text-[#7A1F2B]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{g.name} <span className="text-gray-400 text-[10px]">({g.hindiName || g.name})</span></span>
                      {value === g.name && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4. All other gotras list */}
            {regularGotras.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold tracking-wider px-2 block uppercase">
                  Other Gotras in Samaj
                </span>
                {regularGotras.map((g, idx) => {
                  const flatIdx = flatFilteredList.findIndex(item => !item.isOther && (item.record as GotraRecord).id === g.id);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleSelect(g.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        flatIdx === activeIndex ? 'bg-[#7A1F2B]/10 font-medium text-[#7A1F2B]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{g.name} <span className="text-gray-400 text-[10px]">({g.hindiName || g.name})</span></span>
                      {value === g.name && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Final dynamic list fallbacks */}
            {filteredGotras.length === 0 && (
              <div className="text-center p-3 text-gray-500 italic">
                No standard gotra matches "{search}"
              </div>
            )}

            {/* Separator */}
            <div className="h-px bg-gray-150 my-1"></div>

            {/* Add Custom Trigger inside checklist */}
            {(() => {
              const otherFlatIdx = flatFilteredList.findIndex(item => item.isOther);
              return (
                <button
                  type="button"
                  onClick={() => setIsAddingCustom(true)}
                  className={`w-full text-left px-3 py-2 text-xs text-[#7A1F2B] font-bold flex items-center gap-2 rounded-lg ${
                    otherFlatIdx === activeIndex ? 'bg-[#7A1F2B]/10' : 'hover:bg-[#F8F4EC]'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span>Other / My Gotra Not Listed...</span>
                </button>
              );
            })()}

          </div>
        </div>
      )}
    </div>
  );
}
