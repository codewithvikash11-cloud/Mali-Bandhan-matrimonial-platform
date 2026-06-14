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
  const flatFilteredList: Array<{ record: GotraRecord; isOther: boolean }> = [];
  popularGotras.forEach(r => flatFilteredList.push({ record: r, isOther: false }));
  recentlyUsedGotras.forEach(r => flatFilteredList.push({ record: r, isOther: false }));
  customGotras.forEach(r => flatFilteredList.push({ record: r, isOther: false }));
  regularGotras.forEach(r => flatFilteredList.push({ record: r, isOther: false }));

  // Select a gotra Handler
  const handleSelect = (gotraName: string) => {
    onChange(gotraName);
    gotraDb.markRecentlyUsed(gotraName);
    setIsOpen(false);
    setSearch("");
    setActiveIndex(-1);
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
          handleSelect(item.record.name);
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

      {/* Main popover panel list of gotras */}
      {isOpen && (
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
              <div className="text-center p-4 text-gray-500 italic font-sans leading-relaxed">
                No matching gotra found. Please contact support.
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
