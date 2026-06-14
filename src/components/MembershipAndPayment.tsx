import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, X, CreditCard, Shield, Calendar, Sparkles, AlertCircle, ShoppingBag, Landmark, Award, ShieldCheck, Heart, ArrowUpRight
} from 'lucide-react';
import { PaymentDetails } from '../types';
import { MOCK_PAYMENT_HISTORY } from '../mockData';

interface MembershipProps {
  currentMembershipStatus: 'Free' | 'Silver' | 'Gold' | 'Platinum';
  onUpgradeStatus: (newPlan: 'Silver' | 'Gold' | 'Platinum') => void;
  onSetScreenState: (state: any) => void;
}

export default function MembershipAndPayment({ 
  currentMembershipStatus, 
  onUpgradeStatus, 
  onSetScreenState 
}: MembershipProps) {
  const [selectedPlanName, setSelectedPlanName] = useState<'Silver' | 'Gold' | 'Profile Verification' | null>(null);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<string>('');
  const [isVerificationAddOnSelected, setIsVerificationAddOnSelected] = useState<boolean>(false);
  const [verificationPurchased, setVerificationPurchased] = useState<boolean>(false);
  
  const [paymentStep, setPaymentStep] = useState<'PLANS' | 'CHECKOUT' | 'SUCCESS' | 'FAILED'>('PLANS');
  const [paymentHistory, setPaymentHistory] = useState<PaymentDetails[]>(MOCK_PAYMENT_HISTORY);
  
  // Card forms fields
  const [cardNumber, setCardNumber] = useState('4111 8421 9024 1224');
  const [cardHolder, setCardHolder] = useState('Girdhar Lal Saini');
  const [cardExpiry, setCardExpiry] = useState('12/29');
  const [cardCvv, setCardCvv] = useState('241');
  const [payProcessing, setPayProcessing] = useState(false);

  const plans = [
    {
      name: "Free Plan",
      price: "₹0",
      validity: "Life Validity",
      subtitle: "Basic exploration for Rajasthan Saini families",
      badge: "Standard Member",
      features: [
        { text: "Registration", included: true },
        { text: "Profile Creation", included: true },
        { text: "Basic Search", included: true },
        { text: "10 Profile Views Per Day", included: true },
        { text: "3 Interests Per Month", included: true },
        { text: "Community Access", included: true },
        { text: "Advanced Search Filters", included: false },
        { text: "WhatsApp & Mobile Number Unlock", included: false }
      ],
      color: "border-gray-200 bg-white"
    },
    {
      name: "Silver Plan",
      price: "₹299",
      validity: "Month",
      badge: "Silver Member",
      subtitle: "Full search access designed for serious matches",
      features: [
        { text: "Unlimited Profile Views", included: true },
        { text: "Unlimited Interests", included: true },
        { text: "Advanced Search Filters", included: true },
        { text: "See Profile Visitors", included: true },
        { text: "Priority Search Ranking", included: true },
        { text: "Highlighted Profile Badge", included: true },
        { text: "Saved Searches", included: true },
        { text: "Compatibility Reports", included: true },
        { text: "Faster Profile Visibility", included: true }
      ],
      color: "border-gray-300 bg-white ring-1 ring-slate-100 relative"
    },
    {
      name: "Gold Plan",
      price: "₹699",
      validity: "3 Months",
      altValidityLabel: "Only ₹233 / Month",
      savingsLabel: "Save ₹198",
      badge: "Gold Premium Member",
      subtitle: "Most Popular plan across Rajasthan state with ultimate outreach",
      features: [
        { text: "Everything in Silver", included: true },
        { text: "Featured Profile Placement", included: true },
        { text: "Top Search Visibility", included: true },
        { text: "Premium Gold Badge", included: true },
        { text: "WhatsApp Unlock After Interest Acceptance", included: true },
        { text: "Mobile Number Unlock After Interest Acceptance", included: true },
        { text: "Fast Verification Queue", included: true },
        { text: "Higher Match Recommendations", included: true },
        { text: "Priority Customer Support", included: true },
        { text: "Premium Dashboard Insights", included: true }
      ],
      color: "border-[#7A1F2B] bg-gradient-to-b from-amber-50/20 to-white ring-2 ring-[#7A1F2B]/60 relative"
    }
  ];

  const handleInitiatePayment = (planName: 'Silver' | 'Gold' | 'Profile Verification', price: string) => {
    setSelectedPlanName(planName);
    setSelectedPlanPrice(price);
    setIsVerificationAddOnSelected(false); // Reset add-on
    setPaymentStep('CHECKOUT');
  };

  const processMockPayment = (shouldSucceed: boolean) => {
    setPayProcessing(true);
    
    setTimeout(() => {
      setPayProcessing(false);
      const generatedId = "TXN_MALI_" + Math.floor(1000000000 + Math.random() * 9000000000);
      
      // Calculate final actual price including add-ons
      let rawBasePrice = parseInt(selectedPlanPrice.replace(/\D/g, ''), 10) || 0;
      let finalPriceNumeric = rawBasePrice;
      if (selectedPlanName !== 'Profile Verification' && isVerificationAddOnSelected) {
        finalPriceNumeric += 49;
      }
      const finalPriceString = `₹${finalPriceNumeric}`;

      const newPay: PaymentDetails = {
        planName: selectedPlanName === 'Profile Verification' 
          ? "Profile Verification Badge (Standalone)" 
          : `${selectedPlanName} Plan${isVerificationAddOnSelected ? ' + Verification Addon' : ''}`,
        price: finalPriceString,
        date: new Date().toISOString().split('T')[0],
        paymentId: generatedId,
        status: shouldSucceed ? 'Success' : 'Failed'
      };

      setPaymentHistory(prev => [newPay, ...prev]);

      if (shouldSucceed) {
        if (selectedPlanName === 'Profile Verification') {
          setVerificationPurchased(true);
        } else {
          onUpgradeStatus(selectedPlanName!);
          if (isVerificationAddOnSelected) {
            setVerificationPurchased(true);
          }
        }
        setPaymentStep('SUCCESS');
      } else {
        setPaymentStep('FAILED');
      }
    }, 1500);
  };

  return (
    <div id="membership-payment-views" className="space-y-12">
      
      {/* Dynamic Render Section based on Payment Step */}
      {paymentStep === 'PLANS' && (
        <div className="space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#B8860B] border-b border-[#D4AF37] pb-1"> Rajasthan Mali Samaj Alliances </span>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-[#7A1F2B] tracking-tight">Affordable Membership Plans</h1>
            <p className="font-serif italic text-gray-600 text-sm md:text-base">
              Upgrade to discover perfect relationships. Settle life-long relationships safely with tailored parental options.
            </p>
            <div className="pt-3">
              <span className="inline-flex items-center gap-2 bg-[#7A1F2B]/5 text-[#7A1F2B] px-4 py-2 rounded-2xl text-xs font-semibold border border-[#7A1F2B]/10">
                <span>Account Status:</span>
                <strong className="uppercase font-mono bg-[#7A1F2B] text-white px-2.5 py-0.5 rounded-full text-[10px] tracking-wider font-bold">
                  {currentMembershipStatus} Member
                </strong>
                {verificationPurchased && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    <ShieldCheck className="h-4 w-4" /> Dual-Verified Status Active
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className={`rounded-3xl border p-6 md:p-8 flex flex-col justify-between shadow-royal hover:shadow-2xl transition-all duration-300 ${p.color} ${p.name === 'Gold Plan' ? 'border-2 md:transform md:scale-105 md:-translate-y-2' : ''}`}
                id={`plan-card-${p.name.toLowerCase().replace(/ /g, '-')}`}
              >
                
                {/* Popular Badge for Gold Plan */}
                {p.name === "Gold Plan" && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#7A1F2B] text-white font-bold text-[10px] uppercase py-1 px-4 rounded-full tracking-widest shadow border-2 border-amber-300 font-sans flex items-center gap-1 animate-pulse">
                    ★ Best Value 🔥
                  </span>
                )}

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-cinzel text-xl font-black text-[#7A1F2B]">{p.name}</h3>
                      <span className="text-[10px] font-bold text-amber-800 bg-[#F8F4EC] border border-amber-200/50 rounded-full px-2.5 py-0.5">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-sans leading-relaxed">{p.subtitle}</p>
                  </div>

                  {/* Pricing labels with discount highlights */}
                  <div className="pt-2 border-t border-gray-100 space-y-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-4xl font-extrabold text-slate-900">{p.price}</span>
                      <span className="text-xs text-gray-500 font-serif">/ {p.validity}</span>
                    </div>
                    
                    {p.name === "Gold Plan" && p.altValidityLabel && (
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/50">
                          {p.altValidityLabel}
                        </span>
                        <span className="text-xs font-extrabold text-amber-800 bg-yellow-100/80 px-2 py-1 rounded-lg shadow-sm">
                          {p.savingsLabel}
                        </span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 pt-3">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs">
                        {feat.included ? (
                          <Check className="h-4.5 w-4.5 text-emerald-600 stroke-[2.5px] shrink-0 mt-0.5 bg-emerald-50 rounded p-0.5" />
                        ) : (
                          <X className="h-4.5 w-4.5 text-red-300 stroke-[2.5px] shrink-0 mt-0.5" />
                        )}
                        <span className={feat.included ? 'text-gray-700 font-medium' : 'text-gray-400 line-through'}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  {p.name === "Free Plan" ? (
                    <button 
                      disabled 
                      className="w-full bg-gray-100 text-gray-500 py-3.5 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider cursor-default opacity-80 text-center block"
                    >
                      Included By Default
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleInitiatePayment(p.name as any, p.price)}
                      className="w-full bg-[#7A1F2B] hover:bg-[#922a38] text-white py-3.5 rounded-xl font-cinzel text-xs font-bold uppercase tracking-widest transition-all cursor-pointer text-center block shadow-royal border border-white hover:scale-[1.01]"
                    >
                      Choose {p.name}
                    </button>
                  )}
                </div>

              </motion.div>
            ))}
          </div>

          {/* ================================================ */}
          {/* PROFILE VERIFICATION OPTIONAL ADD-ON */}
          {/* ================================================ */}
          <div className="bg-gradient-to-r from-[#F8F4EC] to-white border-2 border-[#D4AF37]/45 rounded-3xl p-6 md:p-8 shadow-royal animate-fade-in flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-100 text-amber-900 rounded-full border border-amber-200">
                  <ShieldCheck className="h-5 w-5 stroke-[2.5px]" />
                </span>
                <span className="text-amber-800 text-[10px] uppercase font-bold tracking-widest bg-amber-50 rounded-full px-3 py-1 border border-amber-200">
                  Highly Recommended Add-On
                </span>
              </div>
              
              <div>
                <h3 className="font-cinzel text-lg md:text-xl font-extrabold text-[#7A1F2B]">
                  PROFILE VERIFICATION (मजबूत विश्वास)
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-1">
                  Enhance response metrics by completing physical/governmental Aadhaar checks on Rajasthan Saini Jodhpur DB logs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="h-4 w-4 bg-emerald-100 text-emerald-700 rounded-full p-0.5" />
                  <span className="font-semibold">Verified Profile Badge</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="h-4 w-4 bg-emerald-100 text-emerald-700 rounded-full p-0.5" />
                  <span className="font-semibold">Increased Trust Score</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="h-4 w-4 bg-emerald-100 text-emerald-700 rounded-full p-0.5" />
                  <span className="font-semibold">Better Match Visibility</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end justify-center gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-amber-950/10 pt-4 lg:pt-0 lg:pl-8">
              <div className="text-center lg:text-right">
                <span className="text-[10px] text-gray-500 block font-bold uppercase tracking-wider">Upgrade Fee</span>
                <span className="font-serif text-3xl font-black text-[#7A1F2B]">₹49</span>
                <span className="text-xs font-bold font-sans text-gray-700 block">One-Time Fee</span>
              </div>
              
              {verificationPurchased ? (
                <div className="text-xs text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl flex items-center gap-1.5 font-bold">
                  <Check className="h-4.5 w-4.5" /> Active in Jodhpur DB
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleInitiatePayment('Profile Verification', '₹49')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-cinzel text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow border border-[#D4AF37] cursor-pointer flex items-center gap-1.5 group"
                >
                  Get Verified Now <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Detailed Features Comparison Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-royal overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[#F8F4EC] to-white border-b border-gray-100">
              <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#D4AF37]" /> Core Premium Feature Comparison Table
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-auto text-xs md:text-sm">
                <thead>
                  <tr className="bg-gray-50 font-cinzel text-[10px] text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <th className="p-4">Key Features</th>
                    <th className="p-4">Free Plan</th>
                    <th className="p-4 text-[#B8860B]">Silver Plan (₹299)</th>
                    <th className="p-4 text-[#7A1F2B] font-bold">Gold Plan (₹699)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans text-gray-700">
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold">Profile Views</td>
                    <td className="p-4 text-slate-500 font-medium">10 Views per Day</td>
                    <td className="p-4 text-emerald-600 font-bold">✓ Unlimited</td>
                    <td className="p-4 text-emerald-600 font-extrabold">✓ Unlimited</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold">Interests Connections</td>
                    <td className="p-4 text-slate-500 font-medium">3 Interests / Mo</td>
                    <td className="p-4 text-emerald-600 font-bold">✓ Unlimited</td>
                    <td className="p-4 text-emerald-600 font-extrabold">✓ Unlimited</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold">Advanced Filters & Visitors</td>
                    <td className="p-4 text-red-500">✗ Blocked</td>
                    <td className="p-4 text-emerald-600 font-semibold">✓ Included</td>
                    <td className="p-4 text-emerald-600 font-bold font-sans">✓ Included</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold">Search Ranking Position</td>
                    <td className="p-4 text-slate-400 font-medium">Standard</td>
                    <td className="p-4 text-amber-700 font-semibold">Priority Visibility</td>
                    <td className="p-4 text-emerald-700 font-extrabold bg-[#7A1F2B]/5">★ Top Featured Placement</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold">WhatsApp & Mobile Unlock</td>
                    <td className="p-4 text-red-500">✗ No</td>
                    <td className="p-4 text-slate-500">Pending check</td>
                    <td className="p-4 text-emerald-600 font-bold">✓ Dual Unlock on Accept</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold">Compatibility Analytics</td>
                    <td className="p-4 text-red-500">✗ No</td>
                    <td className="p-4 text-emerald-600">✓ Enabled</td>
                    <td className="p-4 text-emerald-600 font-extrabold">✓ Premium Gold Dashboard Insights</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment History Section */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Your Household Payment History</h3>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-royal overflow-hidden">
              <div className="grid grid-cols-1 divide-y divide-gray-100 text-xs">
                {paymentHistory.map((hist, index) => (
                  <div key={index} className="p-4 sm:flex items-center justify-between gap-4 py-5 hover:bg-slate-50/40">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-extrabold text-[#7A1F2B] text-xs">{hist.planName}</span>
                        <span className={`p-1 px-2.5 rounded-full text-[9px] uppercase tracking-wider font-mono font-bold ${
                          hist.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700'
                        }`}>
                          {hist.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-mono">Invoice Ref: {hist.paymentId} | Date: {hist.date}</p>
                    </div>

                    <div className="mt-2 sm:mt-0 text-right">
                      <span className="font-serif font-black text-gray-800 text-sm block">{hist.price}</span>
                      <span className="text-[9px] text-amber-600 italic font-sans font-medium">Mali Bandhan Shagun Gateway</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Checkout Screen */}
      {paymentStep === 'CHECKOUT' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#D4AF37]/35 shadow-royal overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-[#7A1F2B] p-6 text-white text-center relative">
            <span className="font-cinzel text-[10px] uppercase text-[#D4AF37] tracking-widest font-bold">Secure Shagun Payment Gateway</span>
            <h3 className="font-cinzel text-xl font-bold">Mali Samaj Shagun Payment</h3>
            <p className="text-[11px] text-[#F8F4EC]/70 font-serif italic">Secure 256-bit encrypted authentication</p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            
            <div className="p-4 bg-[#F8F4EC]/60 rounded-2xl flex items-center justify-between border border-amber-900/10 text-xs text-gray-700">
              <div className="space-y-1">
                <span className="text-[10px] text-[#7A1F2B] font-bold uppercase tracking-wider">Plan Target</span>
                <p className="font-cinzel text-sm font-extrabold text-[#7A1F2B]">{selectedPlanName}</p>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Base Price</span>
                <p className="font-serif text-base font-black text-slate-800">{selectedPlanPrice}</p>
              </div>
            </div>

            {/* Verification Addon Interactive Box in Checkout (Only available if buying Silver/Gold subscription) */}
            {selectedPlanName !== 'Profile Verification' && (
              <div className="p-4 rounded-2xl border border-yellow-200 bg-yellow-50/50 flex items-start gap-4 transition-all">
                <input
                  type="checkbox"
                  id="chk-verification-checkout"
                  checked={isVerificationAddOnSelected}
                  onChange={(e) => setIsVerificationAddOnSelected(e.target.checked)}
                  className="h-4.5 w-4.5 rounded text-[#7A1F2B] focus:ring-[#7A1F2B] border-gray-300 mt-1 cursor-pointer"
                />
                <label htmlFor="chk-verification-checkout" className="cursor-pointer space-y-1 flex-1 select-none">
                  <div className="flex items-center gap-2 justify-between">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck className="h-4.5 w-4.5 text-amber-600 stroke-[2.5]" /> Add Profile Verification Add-On
                    </span>
                    <span className="text-xs font-black text-[#7A1F2B]">
                      +₹49 Only
                    </span>
                  </div>
                  <p className="text-[10px] text-amber-800 leading-relaxed font-sans font-medium">
                    Boost visibility by 400% and activate the trustworthy Samaj Verification Stamp instantly upon approval.
                  </p>
                </label>
              </div>
            )}

            {/* Dynamic Price Calculation display */}
            <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-600 uppercase">Grand Total:</span>
              <span className="font-serif text-xl font-extrabold text-[#7A1F2B]">
                {(() => {
                  let base = parseInt(selectedPlanPrice.replace(/\D/g, ''), 10) || 0;
                  if (selectedPlanName !== 'Profile Verification' && isVerificationAddOnSelected) {
                    base += 49;
                  }
                  return `₹${base}`;
                })()}
              </span>
            </div>

            {/* Credit Card layout */}
            <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-5 rounded-2xl text-white shadow-lg space-y-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-xl"></div>
              <div className="flex justify-between items-center">
                <span className="font-cinzel text-xs text-amber-400 tracking-widest font-extrabold uppercase">MALI RAJ-BANDHAN CHIP CARD</span>
                <Landmark className="h-6 w-6 text-amber-400" />
              </div>
              
              <div className="space-y-4">
                <div className="font-mono text-base tracking-widest">{cardNumber}</div>
                
                <div className="flex justify-between text-xs">
                  <div>
                    <span className="text-[9px] text-[#D4AF37] block uppercase font-bold tracking-wider">CARD HOLDER</span>
                    <span className="font-serif font-semibold">{cardHolder}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#D4AF37] block uppercase font-bold tracking-wider">EXPIRY DATE</span>
                    <span className="font-sans font-bold">{cardExpiry}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Name on Credit/Debit Card</label>
                <input 
                  type="text" 
                  value={cardHolder} 
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Simulated Card Number</label>
                <input 
                  type="text" 
                  value={cardNumber} 
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Expiry Month/Yr</label>
                <input 
                  type="text" 
                  value={cardExpiry} 
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700">CVV Pin</label>
                <input 
                  type="password" 
                  value={cardCvv} 
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded bg-[#F8F4EC]/10 focus:outline-[#7A1F2B]"
                />
              </div>

            </div>

            {/* Simulator Action Buttons */}
            <div className="p-4 bg-[#7A1F2B]/5 rounded-xl border border-[#7A1F2B]/10 space-y-2 text-center text-[11px] text-gray-600">
              <span className="font-semibold">Simulated Gateway Outcomes:</span>
              <div className="flex gap-2 justify-center pt-1">
                <button 
                  onClick={() => processMockPayment(true)}
                  disabled={payProcessing}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-4 rounded transition-all cursor-pointer text-xs"
                >
                  {payProcessing ? "Processing..." : "Trigger SUCCESS ✅"}
                </button>
                <button 
                  onClick={() => processMockPayment(false)}
                  disabled={payProcessing}
                  className="bg-[#7A1F2B] hover:bg-[#922a38] text-white font-bold py-1.5 px-4 rounded transition-all cursor-pointer text-xs"
                >
                  {payProcessing ? "Processing..." : "Trigger FAILURE ❌"}
                </button>
              </div>
            </div>

            <button 
              onClick={() => setPaymentStep('PLANS')}
              className="w-full border border-gray-300 text-gray-700 text-xs font-semibold py-2.5 rounded text-center block hover:bg-gray-50"
            >
              Cancel Payment, Return to Plans
            </button>

          </div>
        </div>
      )}

      {/* Payment Success View */}
      {paymentStep === 'SUCCESS' && (
        <div className="max-w-md mx-auto text-center p-8 bg-white border border-emerald-250 rounded-3xl shadow-royal space-y-6 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <Award className="h-8 w-8 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="font-cinzel text-[10px] uppercase font-bold text-emerald-700 tracking-widest">Shagun Approved!</span>
            <h3 className="font-cinzel text-xl font-bold text-[#7A1F2B]">Upgrade Approved!</h3>
            <p className="text-xs text-gray-500 font-serif leading-relaxed">
              Wonderful! Your account status is now elevated. Direct parent contact telephone lines, WhatsApp shortcuts, and native Rajasthan Saini profiles match lists are fully unlocked.
            </p>
          </div>

          <button 
            onClick={() => setPaymentStep('PLANS')}
            className="bg-[#7A1F2B] text-white hover:bg-[#922a38] transition-all font-cinzel text-xs font-bold uppercase tracking-wider w-full py-3 rounded-xl shadow-royal border border-white"
          >
            Go to My VIP Account
          </button>
        </div>
      )}

      {/* Payment Failed View */}
      {paymentStep === 'FAILED' && (
        <div className="max-w-md mx-auto text-center p-8 bg-white border border-red-200 rounded-3xl shadow-rose-100 shadow-xl space-y-6 animate-fade-in">
          <div className="w-16 h-16 bg-red-50 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto text-red-600">
            <AlertCircle className="h-8 w-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="font-cinzel text-[10px] uppercase font-bold text-red-700 tracking-widest">transaction declined</span>
            <h3 className="font-cinzel text-xl font-bold text-[#7A1F2B]">Transaction Unsuccessful</h3>
            <p className="text-xs text-gray-500 font-serif leading-relaxed">
              Unfortunately, the transaction was declined by the bank secure server. Please verify your simulated CVV details or retry connection.
            </p>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setPaymentStep('CHECKOUT')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-cinzel text-xs font-bold uppercase tracking-wider flex-1 py-2.5 rounded-xl transition-all"
            >
              Retry Payment
            </button>
            <button 
              onClick={() => setPaymentStep('PLANS')}
              className="border border-gray-300 text-gray-700 font-cinzel text-xs font-bold uppercase tracking-wider flex-1 py-2.5 rounded-xl transition-all"
            >
              Pick Other Plan
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
