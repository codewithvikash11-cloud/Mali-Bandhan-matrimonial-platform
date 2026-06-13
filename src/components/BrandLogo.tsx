import React from 'react';

interface BrandLogoProps {
  variant: 'main' | 'mobile' | 'favicon' | 'app-icon';
  className?: string;
}

export default function BrandLogo({ variant, className = '' }: BrandLogoProps) {
  // Common beautiful SVG elements to represent Rajasthan heritage
  // Royal Toran Arch, Gathbandhan, and Marigold floral motifs
  
  if (variant === 'favicon') {
    return (
      <svg
        id="mali-favicon"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        {/* Favicon - high-visibility crest with Royal Gold and Maroon */}
        <circle cx="32" cy="32" r="30" fill="#7A1F2B" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="32" cy="32" r="26" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" />
        
        {/* Heritage Toran arch motif inside favicon */}
        <path
          d="M18 24 C24 16, 40 16, 46 24 C40 28, 24 28, 18 24 Z"
          fill="#D4AF37"
          opacity="0.9"
        />
        {/* Sacred Kalash/Dipak silhouette */}
        <path
          d="M32 20 C29 20, 27 24, 27 28 C27 33, 37 33, 37 28 C37 24, 35 20, 32 20 Z"
          fill="#F8F4EC"
        />
        <circle cx="32" cy="27" r="1.5" fill="#7A1F2B" />
        <path d="M32 17 L30 20 L34 20 Z" fill="#D4AF37" /> {/* Shubh Flame */}
      </svg>
    );
  }

  if (variant === 'mobile') {
    return (
      <div id="mali-logo-mobile" className={`flex items-center gap-2 ${className}`}>
        {/* Mini version */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 shrink-0"
        >
          <rect x="5" y="5" width="90" height="90" rx="18" fill="#7A1F2B" stroke="#D4AF37" strokeWidth="2.5" />
          <path
            d="M20 40 C35 22, 65 22, 80 40 L80 75 C80 80, 75 80, 50 80 C25 80, 20 80, 20 75 Z"
            fill="#7A1F2B"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />
          {/* Shubh Gathbandhan knots */}
          <circle cx="42" cy="52" r="8" fill="#D4AF37" />
          <circle cx="58" cy="52" r="8" fill="#D4AF37" />
          <path d="M42 52 Q50 62 58 52" stroke="#7A1F2B" strokeWidth="2" fill="none" />
          {/* Royal Lotus crown petals */}
          <path d="M50 24 L45 32 L55 32 Z" fill="#D4AF37" />
          <path d="M43 28 L39 34 L47 34 Z" fill="#D4AF37" opacity="0.8" />
          <path d="M57 28 L61 34 L53 34 Z" fill="#D4AF37" opacity="0.8" />
        </svg>
        <div className="flex flex-col">
          <span className="font-cinzel text-xs font-black tracking-wider text-[#7A1F2B]">MALI BANDHAN</span>
          <span className="text-[7.5px] font-semibold text-amber-700 tracking-tight">विश्वासनीय विवाह पोर्टल</span>
        </div>
      </div>
    );
  }

  if (variant === 'app-icon') {
    return (
      <div id="mali-app-icon" className={`flex flex-col items-center justify-center p-6 bg-[#7A1F2B] rounded-3xl border-2 border-[#D4AF37] shadow-xl w-40 h-40 relative overflow-hidden ${className}`}>
        {/* Subtle royal pattern layout */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1.5px,transparent_1.5px)] [background-size:12px_12px]" />
        
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 relative z-10"
        >
          {/* Heritage Shield border */}
          <path
            d="M60 10 L100 25 L100 70 C100 95, 60 112, 60 112 C60 112, 20 95, 20 70 L20 25 Z"
            fill="#7A1F2B"
            stroke="#D4AF37"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Inner royal boundary */}
          <path
            d="M60 18 L90 29 L90 66 C90 86, 60 101, 60 101 C60 101, 30 86, 30 66 L30 29 Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          {/* Center Royal Wedding Kalash with Gathbandhan Inflections */}
          <path
            d="M50 55 C47 55, 45 59, 45 64 C45 74, 75 74, 75 64 C75 59, 73 55, 70 55 Z"
            fill="#D4AF37"
          />
          {/* Kalash Base */}
          <path d="M48 74 H72 L69 77 H51 Z" fill="#D4AF37" />
          {/* Coconut Top with Mango Leaves */}
          <path d="M60 38 L50 50 H70 Z" fill="#F8F4EC" />
          <path d="M60 35 L51 44 L69 44 Z" fill="#D4AF37" />
          <path d="M41 50 Q51 52 60 48" stroke="#D4AF37" strokeWidth="2" fill="none" />
          <path d="M79 50 Q69 52 60 48" stroke="#D4AF37" strokeWidth="2" fill="none" />
          {/* Shubh Swastik on Kalash */}
          <path d="M57 60 H63 M60 57 V63 M57 57 V60 M63 60 V63 M63 57 H60 M57 63 H60" stroke="#7A1F2B" strokeWidth="1" />
        </svg>
        <span className="font-cinzel text-[9px] text-[#D4AF37] font-black tracking-widest mt-2 uppercase z-10">Mali Bandhan</span>
      </div>
    );
  }

  // DEFAULT Variant 'main': Features Toran arches, Gathbandhan union patterns and full elegant typography with professional localized Tagline.
  return (
    <div id="mali-logo-main" className={`flex items-center gap-3.5 ${className}`}>
      <svg
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14 shrink-0 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
      >
        {/* Outer Shield-Star representing Jodhpur Mehrangarh royal geometry */}
        <path
          d="M70 2 L85 24 L109 17 L102 41 L125 48 L109 68 L125 88 L102 95 L109 119 L85 112 L70 134 L55 112 L31 119 L38 95 L15 88 L31 68 L15 48 L38 41 L31 17 L55 24 Z"
          fill="#7A1F2B"
          stroke="#D4AF37"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Inner solid circular background */}
        <circle cx="70" cy="68" r="41" fill="#7A1F2B" stroke="#D4AF37" strokeWidth="1" />
        <circle cx="70" cy="68" r="37" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />

        {/* Traditional Heritage Arch / Jodhpur Chhatri top */}
        <path
          d="M44 65 C44 48, 96 48, 96 65"
          stroke="#D4AF37"
          strokeWidth="2"
          fill="none"
        />
        {/* Floral Marigold wedding link node (Community connection symbol) */}
        <circle cx="56" cy="74" r="9" fill="#D4AF37" />
        <circle cx="84" cy="74" r="9" fill="#D4AF37" />
        
        {/* Love heart & alliance knot representing marriage gathbandhan */}
        <path 
          d="M51 74 C51 70, 61 70, 70 76 C79 70, 89 70, 89 74 C89 82, 70 87, 70 87 C70 87, 51 82, 51 74 Z" 
          fill="#F8F4EC" 
          opacity="0.95"
        />
        {/* Delicate Golden Flame / Jyoti of Mahatma Phule */}
        <path d="M70 41 L66 50 H74 Z" fill="#D4AF37" />
        <circle cx="70" cy="51" r="1.5" fill="#F8F4EC" />
      </svg>

      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1">
          <span className="font-cinzel text-lg font-black tracking-wider text-[#7A1F2B]">राजस्थान</span>
          <span className="font-sans font-bold text-xs bg-[#7A1F2B] text-[#D4AF37] px-1.5 py-0.5 rounded shadow">माली बंधन</span>
        </div>
        <h2 className="font-cinzel text-xs font-black tracking-widest text-[#7A1F2B] uppercase">RAJASTHAN MALI BANDHAN</h2>
        <p className="text-[9px] font-bold text-amber-800 tracking-tighter mt-0.5 font-serif italic">
          Rajasthan Mali Samaj Ka Vishwasniya Vivah Portal
        </p>
      </div>
    </div>
  );
}
