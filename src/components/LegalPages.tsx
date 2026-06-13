import React, { useState } from 'react';
import { ShieldAlert, FileText, Scale, Users, FileCheck } from 'lucide-react';

export default function LegalPages() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund' | 'guidelines'>('privacy');

  return (
    <div id="legal-pages-views" className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#D4AF37]/20 pb-5 text-center max-w-3xl mx-auto space-y-2">
        <span className="font-cinzel text-xs uppercase tracking-widest text-[#B8860B]">Trust & Compliances</span>
        <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-[#7A1F2B]">Legal Terms & Guidelines</h1>
        <p className="text-xs text-gray-500 font-serif">
          Ensuring dignity, authenticity, and legal accountability across the Rajasthan Mali Samaj brides and grooms network.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold font-cinzel uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'privacy' 
              ? 'border-[#7A1F2B] text-[#7A1F2B]' 
              : 'border-transparent text-gray-500 hover:text-[#7A1F2B]'
          }`}
        >
          <Scale className="h-3.5 w-3.5" /> Privacy Policy
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold font-cinzel uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'terms' 
              ? 'border-[#7A1F2B] text-[#7A1F2B]' 
              : 'border-transparent text-gray-500 hover:text-[#7A1F2B]'
          }`}
        >
          <FileText className="h-3.5 w-3.5" /> Terms & Conditions
        </button>

        <button
          onClick={() => setActiveTab('refund')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold font-cinzel uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'refund' 
              ? 'border-[#7A1F2B] text-[#7A1F2B]' 
              : 'border-transparent text-gray-500 hover:text-[#7A1F2B]'
          }`}
        >
          <ShieldAlert className="h-3.5 w-3.5" /> Refund Policy
        </button>

        <button
          onClick={() => setActiveTab('guidelines')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold font-cinzel uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'guidelines' 
              ? 'border-[#7A1F2B] text-[#7A1F2B]' 
              : 'border-transparent text-gray-500 hover:text-[#7A1F2B]'
          }`}
        >
          <Users className="h-3.5 w-3.5" /> Community Guidelines
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-royal space-y-6 max-w-4xl mx-auto text-xs md:text-sm text-gray-600 leading-relaxed">
        
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <FileCheck className="h-5 w-5 text-[#7A1F2B]" />
              <h2 className="font-cinzel text-lg font-bold text-[#7A1F2B]">Privacy & Data Protection Policy</h2>
            </div>
            
            <p className="font-semibold text-gray-800">Effective Date: June 13, 2026</p>
            <p>
              Rajasthan Mali Bandhan values the safety, security, and private lives of families in our beloved Mali Samaj. This policy covers how we handle personal identifiers, photos, family gotras, and government IDs uploaded directly to our database systems.
            </p>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">1. Information We Collect</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Basic Profile Identifiers</strong>: Full names, birth coordinates, email accounts, and mobile communication logs.</li>
                <li><strong>Socio-Cultural Details</strong>: Gotras (paternal and maternal), native district, tehsil, and native village of your elders.</li>
                <li><strong>Documents for Safety Verification</strong>: Government Issued Identification Cards (Aadhaar/PAN) and direct facial selfie captures.</li>
                <li><strong>Professional Credentials</strong>: Income status, occupation details, and educational diplomas/degrees.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">2. Photographic Guidelines & Protection</h3>
              <p>
                To prevent misuse, all photos uploaded under 'Gallery' are copyrighted automatically under native watermarks. Users can choose to lock their profile photo so it's only shown to verified premium members who have completed a mutual gotra verification check.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">3. Information Storage</h3>
              <p>
                All data resides on secure Cloud Run services behind an encrypted database layer. Government IDs are permanently deleted as soon as they are cross-matched with self-captured validation camera shots.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <FileCheck className="h-5 w-5 text-[#7A1F2B]" />
              <h2 className="font-cinzel text-lg font-bold text-[#7A1F2B]">Terms & Conditions of Service</h2>
            </div>

            <p className="font-semibold text-gray-800">Last Revised: June 2026</p>
            <p>
              Welcome to Rajasthan Mali Bandhan. By creating an account or managing a profile on behalf of your son, daughter, or ward, you agree to these mutual terms of trust.
            </p>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">1. Eligibility Criteria</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Brides must be at least 18 years of age.</li>
                <li>Grooms must be at least 21 years of age.</li>
                <li>The registrant must legally belong to the Rajasthan Mali (Saini, Gehlot, Kachhawaha, Bhagirath, etc.) Samaj.</li>
                <li>Must provide correct, legal family specifications.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">2. Account Management & Guardianship</h3>
              <p>
                If the profile is managed by a father, mother, or guardian, the registered guardian is solely responsible for verifying the partner's family roots before finalizing negotiations. Rajasthan Mali Bandhan acts as an informational design desk and does not verify offline dowry negotiations or private disputes.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">3. Disallowed Actions</h3>
              <p>
                You may not register multiple fake accounts, post abusive comments on partner preference grids, or upload pictures showing irrelevant context. Any offensive activity triggers immediate permanent ban without notice.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'refund' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <FileCheck className="h-5 w-5 text-[#7A1F2B]" />
              <h2 className="font-cinzel text-lg font-bold text-[#7A1F2B]">Refund & Subscription Policy</h2>
            </div>

            <p className="font-semibold text-gray-800">Policy Context</p>
            <p>
              Because our matrimonial services immediately unlock direct premium access to contact information, parent numbers, and gotra charts upon upgrade, we maintain the following billing guidelines:
            </p>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">1. Non-Refundable Nature</h3>
              <p>
                Payments made for Silver, Gold, or Platinum premium packages are strictly non-refundable. Subscriptions cannot be transferred or deferred to another family member.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">2. Match Settlement Success Exceptions</h3>
              <p>
                If your son or daughter gets happily married through our portal within 15 days of upgrading to a 12-month tier, we proudly offer a 30% cash-back award as a shagun blessing for the new couple! Kindly present your marriage invitation card at our Jodhpur Samaj office.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">3. Billing Support</h3>
              <p>
                For double transactions or failed gateway attempts, the bank normally refunds the amount within 5 working days. For immediate confirmation, contact support at <strong>finance@rajasthanmalibandhan.com</strong>.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'guidelines' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <FileCheck className="h-5 w-5 text-[#7A1F2B]" />
              <h2 className="font-cinzel text-lg font-bold text-[#7A1F2B]">Community Marriage Guidelines</h2>
            </div>

            <p>
              Our platform thrives on public modesty, cultural dignity, and absolute transparency. These guidelines provide families with traditional moral compliance frameworks while searching for match pairs.
            </p>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">1. Respectful Communications</h3>
              <p>
                When calling parent contacts, introduce your family, gotra lineage, and ancestral village first. Always speak gently, respecting the privacy of the bride's parents. Do not make multiple aggressive phone calls.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">2. Absolute Dowry Prohibition</h3>
              <p>
                Rajasthan Mali Bandhan strictly condemns the practice of dowry in any format. We encourage simple, elegant weddings focused on mutual respect and young couples' career success.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase">3. Complete Profile Verification Encouragement</h3>
              <p>
                Parents are urged to seek third-party character references through native village networks. Do not finalize negotiations without double-checking the authenticity of listed occupations.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
