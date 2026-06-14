import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface SmartDatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (dateStr: string) => void;
  label?: string;
  minAge?: number;
  maxAge?: number;
}

export default function SmartDatePicker({
  value,
  onChange,
  label = "Date of Birth (जन्म तिथि)",
  minAge = 18,
  maxAge = 70
}: SmartDatePickerProps) {
  // Parse current value
  const parsedDate = useMemo(() => {
    if (!value) return { day: "", month: "", year: "" };
    const parts = value.split("-");
    if (parts.length !== 3) return { day: "", month: "", year: "" };
    return {
      year: parts[0],
      month: String(parseInt(parts[1], 10)), // 1-indexed string
      day: String(parseInt(parts[2], 10))
    };
  }, [value]);

  const currentYear = new Date().getFullYear();
  const maxYear = currentYear - minAge;
  const minYear = currentYear - maxAge;

  // Lists for drop downs
  const years = useMemo(() => {
    const arr = [];
    for (let y = maxYear; y >= minYear; y--) {
      arr.push(String(y));
    }
    return arr;
  }, [minYear, maxYear]);

  const months = [
    { value: "1", label: "January (जनवरी)" },
    { value: "2", label: "February (फरवरी)" },
    { value: "3", label: "March (मार्च)" },
    { value: "4", label: "April (अप्रैल)" },
    { value: "5", label: "May (मई)" },
    { value: "6", label: "June (जून)" },
    { value: "7", label: "July (जुलाई)" },
    { value: "8", label: "August (अगस्त)" },
    { value: "9", label: "September (सितंबर)" },
    { value: "10", label: "October (अक्टूबर)" },
    { value: "11", label: "November (नवंबर)" },
    { value: "12", label: "December (दिसंबर)" }
  ];

  // Days count based on selected Month and Year
  const days = useMemo(() => {
    const selectedMonth = parseInt(parsedDate.month, 10) || 1;
    const selectedYear = parseInt(parsedDate.year, 10) || 2000;
    
    // Get last day of the month
    const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
    const arr = [];
    for (let d = 1; d <= lastDay; d++) {
      arr.push(String(d));
    }
    return arr;
  }, [parsedDate.month, parsedDate.year]);

  const handleSelect = (type: 'day' | 'month' | 'year', val: string) => {
    const nextDate = { ...parsedDate, [type]: val };
    
    // If we have all three, trigger change
    if (nextDate.day && nextDate.month && nextDate.year) {
      // Pad single digits for YYYY-MM-DD
      const y = nextDate.year;
      const m = nextDate.month.padStart(2, '0');
      const d = nextDate.day.padStart(2, '0');
      onChange(`${y}-${m}-${d}`);
    } else {
      // Partial update, wait until complete
      const dummyDate = `${nextDate.year || '2000'}-${(nextDate.month || '01').padStart(2, '0')}-${(nextDate.day || '01').padStart(2, '0')}`;
      onChange(dummyDate);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1.5">
        <Calendar className="h-4 w-4 text-[#7A1F2B]" />
        {label}
      </label>
      
      <div className="grid grid-cols-3 gap-2">
        
        {/* Day selection */}
        <div className="relative">
          <select
            value={parsedDate.day}
            onChange={(e) => handleSelect('day', e.target.value)}
            className="w-full text-xs p-3.5 pr-8 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7A1F2B] appearance-none cursor-pointer font-sans text-slate-800 font-semibold"
          >
            <option value="">Day</option>
            {days.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Month selection */}
        <div className="relative">
          <select
            value={parsedDate.month}
            onChange={(e) => handleSelect('month', e.target.value)}
            className="w-full text-xs p-3.5 pr-8 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7A1F2B] appearance-none cursor-pointer font-sans text-slate-800 font-semibold"
          >
            <option value="">Month</option>
            {months.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Year selection */}
        <div className="relative">
          <select
            value={parsedDate.year}
            onChange={(e) => handleSelect('year', e.target.value)}
            className="w-full text-xs p-3.5 pr-8 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7A1F2B] appearance-none cursor-pointer font-sans text-slate-800 font-semibold"
          >
            <option value="">Year</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

      </div>
      
      {value && parsedDate.year && (
        <div className="text-[10px] text-gray-500 font-medium flex justify-between items-center mt-0.5 bg-amber-50/50 p-1.5 rounded-lg border border-amber-500/10">
          <span>Date format locked: {value}</span>
          <span className="text-[#7A1F2B] font-bold">
            Age: {new Date().getFullYear() - parseInt(parsedDate.year, 10)} Years
          </span>
        </div>
      )}
    </div>
  );
}
