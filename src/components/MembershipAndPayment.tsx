import React, { useState } from 'react';
import { 
  Check, X, CreditCard, Shield, Calendar, Sparkles, AlertCircle, ShoppingBag, Landmark, Award
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
  const [selectedPlanName, setSelectedPlanName] = useState<'Silver' | 'Gold' | 'Platinum' | null>(null);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<string>('');
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
      subtitle: "Basic profile setup and general browsing",
      features: [
        { text: "Create profile with Gotra details", included: true },
        { text: "Browse Jodhpur/Jaipur Mali profiles", included: true },
        { text: "Send 5 basic connection interests / week", included: true },
        { text: "Upload 2 photographs", included: true },
        { text: "View official phone numbers", included: false },
        { text: "Direct WhatsApp support connectivity", included: false },
        { text: "Gotra verification assistance", included: false },
        { text: "Profile boost in local district searches", included: false }
      ],
      color: "border-gray-200 bg-white"
    },
    {
      name: "Silver Plan",
      price: "₹1,800",
      validity: "3 Months Validity",
      subtitle: "For serious families searching locally",
      features: [
        { text: "Create profile with Gotra details", included: true },
        { text: "Browse Jodhpur/Jaipur Mali profiles", included: true },
        { text: "Send 25 interest connections", included: true },
        { text: "Upload 5 photographs", included: true },
        { text: "View 15 official phone numbers", included: true },
        { text: "Direct WhatsApp support connectivity", included: true },
        { text: "Gotra verification assistance", included: false },
        { text: "Profile boost in local district searches", included: false }
      ],
      color: "border-[#D4AF37]/50 bg-[#F8F4EC]/30"
    },
    {
      name: "Gold Plan",
      price: "₹3,100",
      validity: "6 Months Validity",
      subtitle: "Most Popular plan for complete Rajput-Mali matches",
      features: [
        { text: "Create profile with Gotra details", included: true },
        { text: "Browse Jodhpur/Jaipur Mali profiles", included: true },
        { text: "Send unlimited connection interests", included: true },
        { text: "Upload 10 photographs", included: true },
        { text: "View 50 official phone numbers", included: true },
        { text: "Direct WhatsApp support connectivity", included: true },
        { text: "Gotra verification assistance (4-Sides check)", included: true },
        { text: "Profile boost (Rank 3x higher)", included: true }
      ],
      color: "border-[#D4AF37] bg-white ring-2 ring-[#D4AF37] relative"
    },
    {
      name: "Platinum Plan",
      price: "₹5,500",
      validity: "12 Months Validity",
      subtitle: "Full personal matchmaking with dedicated manager",
      features: [
        { text: "Create profile with Gotra details", included: true },
        { text: "Browse Jodhpur/Jaipur Mali profiles", included: true },
        { text: "Send unlimited connection interests", included: true },
        { text: "Upload unlimited photographs", included: true },
        { text: "View unlimited official parents numbers", included: true },
        { text: "Direct WhatsApp support connectivity", included: true },
        { text: "Gotra verification assistance (Full lineage check)", included: true },
        { text: "Personal relationship manager appointed", included: true }
      ],
      color: "border-[#7A1F2B] bg-[#7A1F2B]/5"
    }
  ];

  const handleInitiatePayment = (planName: any, price: string) => {
    if (planName === "Free Plan") return;
    setSelectedPlanName(planName);
    setSelectedPlanPrice(price);
    setPaymentStep('CHECKOUT');
  };

  const processMockPayment = (shouldSucceed: boolean) => {
    setPayProcessing(true);
    
    setTimeout(() => {
      setPayProcessing(false);
      const generatedId = "TXN_MALI_" + Math.floor(1000000000 + Math.random() * 9000000000);
      
      const newPay: PaymentDetails = {
        planName: `${selectedPlanName} Plan`,
        price: selectedPlanPrice,
        date: new Date().toISOString().split('T')[0],
        paymentId: generatedId,
        status: shouldSucceed ? 'Success' : 'Failed'
      };

      setPaymentHistory(prev => [newPay, ...prev]);

      if (shouldSucceed) {
        onUpgradeStatus(selectedPlanName!);
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
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#B8860B] border-b border-[#D4AF37] pb-1">Unleash Ultimate Alliances</span>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-[#7A1F2B]">Premium Membership Plans</h1>
            <p className="font-serif italic text-gray-600 text-sm md:text-base">
              Upgrade your matching path. Directly talk to families, verify complex Gotras, and settle beautiful relationships safely.
            </p>
            <div className="pt-3">
              <span className="inline-flex items-center gap-1.5 bg-[#7A1F2B]/10 text-[#7A1F2B] px-4 py-1.5 rounded-full text-xs font-semibold">
                Your Current Plan Status: <strong className="uppercase font-mono">{currentMembershipStatus} Membership</strong>
              </span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl border p-6 flex flex-col justify-between shadow-royal hover:shadow-xl transition-all duration-300 ${p.color}`}
              >
                {/* Popular Badge */}
                {p.name === "Gold Plan" && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#7A1F2B] font-bold text-[9px] font-cinzel rounded-full uppercase py-1 px-3.5 tracking-wider border border-white">
                    ★ Best Family Choice
                  </span>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-cinzel text-lg font-bold text-[#7A1F2B]">{p.name}</h3>
                    <p className="text-[10px] text-gray-500">{p.subtitle}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-baseline gap-1">
                    <span className="font-serif text-3xl font-extrabold text-gray-900">{p.price}</span>
                    <span className="text-xs text-gray-500 font-serif">/ {p.validity}</span>
                  </div>

                  <ul className="space-y-2.5 pt-4">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs">
                        {feat.included ? (
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-red-300 shrink-0 mt-0.5" />
                        )}
                        <span className={feat.included ? 'text-gray-700' : 'text-gray-400 line-through'}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  {p.name === "Free Plan" ? (
                    <button 
                      disabled 
                      className="w-full bg-[#F8F4EC] text-[#7A1F2B] py-2.5 rounded font-cinzel text-xs font-semibold uppercase tracking-wider cursor-default opacity-65 text-center block"
                    >
                      Active Plan
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleInitiatePayment(p.name as any, p.price)}
                      className="w-full bg-[#7A1F2B] text-white hover:bg-[#922a38] py-2.5 rounded font-cinzel text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer text-center block shadow border border-[#D4AF37]"
                    >
                      Choose Package
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* Detailed Features Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-royal overflow-hidden">
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
                    <th className="p-4 text-[#B8860B]">Silver</th>
                    <th className="p-4 text-[#7A1F2B] font-bold">Gold Plan</th>
                    <th className="p-4 text-[#7A1F2B]">Platinum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-serif text-gray-700">
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold font-sans">Aadhaar Profile Badge</td>
                    <td className="p-4 text-emerald-600">✓ Yes</td>
                    <td className="p-4 text-emerald-600">✓ Yes</td>
                    <td className="p-4 text-emerald-600">✓ Yes</td>
                    <td className="p-4 text-emerald-600">✓ Yes</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold font-sans">Contact Parent Number Limit</td>
                    <td className="p-4 text-gray-400">Blocked</td>
                    <td className="p-4 text-gray-800 font-medium font-sans">15 Numbers</td>
                    <td className="p-4 text-emerald-600 font-bold font-sans">50 Numbers</td>
                    <td className="p-4 text-emerald-600 font-semibold font-sans">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold font-sans">Gotra Verification (4 sides)</td>
                    <td className="p-4 text-red-500">✗ No</td>
                    <td className="p-4 text-red-500">✗ No</td>
                    <td className="p-4 text-emerald-600">✓ Self Service</td>
                    <td className="p-4 text-emerald-600 font-bold">✓ Managed Call Support</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold font-sans">Local Jodhpur office VIP Room access</td>
                    <td className="p-4 text-red-500">✗ No</td>
                    <td className="p-4 text-red-500">✗ No</td>
                    <td className="p-4 text-red-500">✗ No</td>
                    <td className="p-4 text-emerald-600">✓ Multi Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment History Section */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B] border-b border-gray-100 pb-2">Your Household Payment History</h3>
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-royal overflow-hidden">
              <div className="grid grid-cols-1 divide-y divide-gray-100 text-xs">
                {paymentHistory.map((hist, index) => (
                  <div key={index} className="p-4 sm:flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-gray-800">{hist.planName}</span>
                        <span className={`p-1 px-2.5 rounded-full text-[9px] uppercase tracking-wider font-mono font-bold ${
                          hist.status === 'Success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {hist.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-mono">Invoice reference: {hist.paymentId} | Paid on {hist.date}</p>
                    </div>

                    <div className="mt-2 sm:mt-0 text-right">
                      <span className="font-serif font-bold text-[#7A1F2B] text-sm block">{hist.price}</span>
                      <span className="text-[9px] text-amber-600 italic">Mali Bandhan Shagun Gateway</span>
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
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#D4AF37]/30 shadow-royal overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#7A1F2B] p-6 text-white text-center">
            <span className="font-cinzel text-[10px] uppercase text-[#D4AF37] tracking-widest">Shagun Payment gateway</span>
            <h3 className="font-cinzel text-lg font-bold">VIP Premium Upgrade</h3>
            <p className="text-xs text-[#F8F4EC]/60 font-serif italic">Secure 256-bit Royal Rajput-Mali Encryption</p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            
            <div className="p-4 bg-[#F8F4EC] rounded-xl flex items-center justify-between border border-[#D4AF37]/20 text-xs text-gray-700">
              <div>
                <strong>Upgrade Target:</strong>
                <p className="font-cinzel text-sm font-bold text-[#7A1F2B]">{selectedPlanName} Premium Package</p>
              </div>
              <div className="text-right">
                <strong>Price Due:</strong>
                <p className="font-serif text-base font-black text-[#7A1F2B]">{selectedPlanPrice}</p>
              </div>
            </div>

            {/* Credit Card layout */}
            <div className="bg-gradient-to-r from-gray-900 to-amber-950 p-5 rounded-2xl text-white shadow-lg space-y-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-xl"></div>
              <div className="flex justify-between items-center">
                <span className="font-cinzel text-xs text-[#D4AF37] tracking-widest font-extrabold uppercase">MALI RAJ-BANDHAN CARD</span>
                <Landmark className="h-6 w-6 text-[#D4AF37]" />
              </div>
              
              <div className="space-y-4">
                <div className="font-mono text-lg tracking-widest">{cardNumber}</div>
                
                <div className="flex justify-between text-xs">
                  <div>
                    <span className="text-[9px] text-gray-400 block uppercase">CARD HOLDER</span>
                    <span className="font-serif font-semibold">{cardHolder}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block uppercase">EXPIRY DATE</span>
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
              <span>This is a simulated secure payment gateway. Choose one outcome trigger to experience the UX Flow:</span>
              <div className="flex gap-2 justify-center">
                <button 
                  onClick={() => processMockPayment(true)}
                  disabled={payProcessing}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-4 rounded transition-all cursor-pointer"
                >
                  {payProcessing ? "Processing..." : "Trigger SUCCESS"}
                </button>
                <button 
                  onClick={() => processMockPayment(false)}
                  disabled={payProcessing}
                  className="bg-[#7A1F2B] hover:bg-[#922a38] text-white font-bold py-1.5 px-4 rounded transition-all cursor-pointer"
                >
                  {payProcessing ? "Processing..." : "Trigger FAILURE"}
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
        <div className="max-w-md mx-auto text-center p-8 bg-white border border-emerald-200 rounded-3xl shadow-royal space-y-6">
          <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <Award className="h-8 w-8 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="font-cinzel text-[10px] uppercase font-bold text-emerald-700 tracking-widest">Shagun complete!</span>
            <h3 className="font-cinzel text-xl font-bold text-[#7A1F2B]">Upgrade Approved!</h3>
            <p className="text-xs text-gray-500 font-serif">
              Excellent! Your account status is now successfully elevated to <strong>{selectedPlanName} Premium Member</strong>. The verified database is fully unlocked with immediate telephone details access.
            </p>
          </div>

          <button 
            onClick={() => setPaymentStep('PLANS')}
            className="bg-[#7A1F2B] text-white hover:bg-[#922a38] transition-all font-cinzel text-xs font-bold uppercase tracking-wider w-full py-3 rounded-lg shadow-royal border border-white"
          >
            Go to My VIP Account
          </button>
        </div>
      )}

      {/* Payment Failed View */}
      {paymentStep === 'FAILED' && (
        <div className="max-w-md mx-auto text-center p-8 bg-white border border-red-200 rounded-3xl shadow-rose-100 shadow-xl space-y-6">
          <div className="w-16 h-16 bg-red-50 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto text-red-600">
            <AlertCircle className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="font-cinzel text-[10px] uppercase font-bold text-red-700 tracking-widest">payment declined</span>
            <h3 className="font-cinzel text-xl font-bold text-[#7A1F2B]">Transaction Unsuccessful</h3>
            <p className="text-xs text-gray-500 font-serif">
              Unfortunately, the payment transaction was declined by the bank secure server. This could be due to invalid input credentials or network timeouts.
            </p>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setPaymentStep('CHECKOUT')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-cinzel text-xs font-bold uppercase tracking-wider flex-1 py-2.5 rounded-lg transition-all"
            >
              Retry Payment
            </button>
            <button 
              onClick={() => setPaymentStep('PLANS')}
              className="border border-gray-300 text-gray-700 font-cinzel text-xs font-bold uppercase tracking-wider flex-1 py-2.5 rounded-lg transition-all"
            >
              Pick Other Plan
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
