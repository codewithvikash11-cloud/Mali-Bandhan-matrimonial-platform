import React, { useState, useEffect } from 'react';
import { Phone, Check, AlertCircle } from 'lucide-react';

interface SmartPhoneInputProps {
  value: string;
  onChange: (formattedVal: string) => void;
  label?: string;
  placeholder?: string;
}

export default function SmartPhoneInput({
  value,
  onChange,
  label = "Contact Mobile Number (Parents/Groom/Bride)",
  placeholder = "Enter 10-digit mobile number"
}: SmartPhoneInputProps) {
  
  // Format the visual layout
  const [phoneDigits, setPhoneDigits] = useState(() => {
    // Strip everything except numbers from incoming value
    const digitsOnly = value.replace(/\D/g, '');
    // If it starts with 91 and has 12 chars, extract last 10
    if (digitsOnly.startsWith('91') && digitsOnly.length > 10) {
      return digitsOnly.slice(2);
    }
    return digitsOnly.slice(-10); // max 10
  });

  // Watch for external value change
  useEffect(() => {
    const digitsOnly = value.replace(/\D/g, '');
    let displayDigits = digitsOnly;
    if (digitsOnly.startsWith('91') && digitsOnly.length > 10) {
      displayDigits = digitsOnly.slice(2);
    }
    if (displayDigits.slice(-10) !== phoneDigits) {
      setPhoneDigits(displayDigits.slice(-10));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    // Strip non-numbers
    const filteredDigits = inputVal.replace(/\D/g, '').slice(0, 10);
    setPhoneDigits(filteredDigits);
    
    // Trigger external change using international standard format +91 XXXXXXXXXX
    if (filteredDigits) {
      onChange(`+91 ${filteredDigits}`);
    } else {
      onChange('');
    }
  };

  const isComplete = phoneDigits.length === 10;
  const isValidSainiPrefix = isComplete && /^[6-9]/.test(phoneDigits); // Starts with standard Indian carrier prefixes 6-9

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1.5 justify-between">
        <span className="flex items-center gap-1.5">
          <Phone className="h-4 w-4 text-[#7A1F2B]" />
          {label} *
        </span>
        {isComplete && (
          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
            isValidSainiPrefix 
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
              : 'bg-amber-100 text-amber-800 border border-amber-200'
          }`}>
            {isValidSainiPrefix ? "✓ Valid Active Line" : "Check Carrier Prefix"}
          </span>
        )}
      </label>

      <div className="flex rounded-xl overflow-hidden border border-gray-300 focus-within:border-[#7A1F2B] focus-within:ring-1 focus-within:ring-[#7A1F2B] transition-all bg-white shadow-sm">
        {/* India Flag & Code Prefix Indicator */}
        <div className="bg-[#F8F4EC]/60 px-3.5 border-r border-gray-200 flex items-center gap-2 select-none">
          {/* Saffron, White, Green flag mock with div block */}
          <div className="w-4 h-3 flex flex-col border border-gray-300 rounded-[1px] overflow-hidden shrink-0">
            <div className="h-1 bg-[#FF9933]"></div>
            <div className="h-1 bg-white flex items-center justify-center">
              <div className="w-0.5 h-0.5 bg-[#000080] rounded-full"></div>
            </div>
            <div className="h-1 bg-[#138808]"></div>
          </div>
          <span className="text-xs font-bold text-gray-600 font-sans">+91</span>
        </div>

        {/* Input area */}
        <input
          type="tel"
          value={phoneDigits}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={10}
          className="w-full text-xs p-3.5 focus:outline-none bg-transparent font-sans font-semibold text-slate-800 tracking-wider"
        />

        {/* Success / Info Badge */}
        {phoneDigits.length > 0 && (
          <div className="px-3 flex items-center bg-transparent select-none shrink-0">
            {isComplete ? (
              <Check className="h-4 w-4 text-emerald-600 stroke-[3px]" />
            ) : (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200/50 rounded px-1.5 py-0.5 font-sans">
                {phoneDigits.length}/10
              </span>
            )}
          </div>
        )}
      </div>

      {phoneDigits.length > 0 && !isComplete && (
        <div className="text-[10px] text-amber-600 font-medium flex items-center gap-1 mt-0.5">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>Please enter a full 10-digit mobile number for WhatsApp verification logs.</span>
        </div>
      )}
    </div>
  );
}
