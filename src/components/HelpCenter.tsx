import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, MapPin, Send, HelpCircle as HelpIcon, CheckCircle, ShieldCheck } from 'lucide-react';
import { FAQS } from '../mockData';

export default function HelpCenter() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Custom Support Ticket Form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Gotra Matching Assistance');
  const [message, setMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Live Chat Simulator State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Namaste! Welcome to Rajasthan Mali Bandhan Support. How can we assist your family today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setName('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    // Simulated reply based on keywords
    setTimeout(() => {
      let botReply = "Thank you for writing. Our family desk representative in Jodhpur is reviewing your issue and will call you directly within 2 hours.";
      const lowMsg = userMsg.toLowerCase();
      if (lowMsg.includes('gotra') || lowMsg.includes('goatra') || lowMsg.includes('gotar')) {
        botReply = "Gotra matching is vital. Rajasthan Mali Bandhan checks 4 gotras (Self, Mother, Paternal Grandmother, Maternal Grandmother). Please list your gotras in the Edit Profile screen.";
      } else if (lowMsg.includes('membership') || lowMsg.includes('pay') || lowMsg.includes('money') || lowMsg.includes('gold')) {
        botReply = "Premium status unlocks verified mobile numbers and parent contacts immediately. You can view prices in our Membership section.";
      } else if (lowMsg.includes('photo') || lowMsg.includes('selfie') || lowMsg.includes('verify')) {
        botReply = "To get the verified shield, upload your Aadhaar Card and a clear face selfie. Our team matches them 100% within 1 hour.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 1000);
  };

  return (
    <div id="help-center-views" className="space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-cinzel text-xs uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37] pb-1">Family Support Desk</span>
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-[#7A1F2B]">How Can We Help You?</h1>
        <p className="font-serif italic text-gray-600 text-sm md:text-base">
          Dedicated assistance to help parents, boys, and girls navigate partnerships with absolute security and dignity.
        </p>
      </div>

      {/* Grid of Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-royal text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-[#F8F4EC] text-[#7A1F2B] rounded-full flex items-center justify-center">
            <Phone className="h-5 w-5" />
          </div>
          <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase tracking-wide">Helpline Number</h3>
          <p className="text-xs text-gray-600 font-mono">+91 291 294 6242</p>
          <span className="text-[10px] text-amber-600 block">Mon - Sat: 9:00 AM - 7:00 PM</span>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-royal text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-[#F8F4EC] text-[#7A1F2B] rounded-full flex items-center justify-center">
            <Mail className="h-5 w-5" />
          </div>
          <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase tracking-wide">Email Support</h3>
          <p className="text-xs text-gray-600 font-mono">support@rajasthanmalibandhan.com</p>
          <span className="text-[10px] text-amber-600 block">Typical response within 3 hours</span>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-royal text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-[#F8F4EC] text-[#7A1F2B] rounded-full flex items-center justify-center">
            <MapPin className="h-5 w-5" />
          </div>
          <h3 className="font-cinzel text-xs font-bold text-[#7A1F2B] uppercase tracking-wide">Main Samaj Office</h3>
          <p className="text-xs text-gray-600">High Court Road, opposite Phule Bhawan, Jodhpur, Rajasthan - 342001</p>
          <span className="text-[10px] text-amber-600 block">Visit for physical verification registration</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Accordion FAQs */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-cinzel text-lg font-bold text-[#7A1F2B] flex items-center gap-2">
            <HelpIcon className="h-5 w-5 text-[#D4AF37]" /> Frequently Asked Questions (FAQs)
          </h3>
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-royal transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center bg-gradient-to-r from-white to-[#F8F4EC]/20 hover:from-[#F8F4EC]/30"
                >
                  <span className="font-serif text-sm font-semibold text-[#1F1F1F] pr-4">{faq.question}</span>
                  <span className="text-amber-600 font-bold text-lg select-none">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <div className="p-5 border-t border-gray-100 bg-[#F8F4EC]/10 text-xs md:text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Trusted Security Banner */}
          <div className="bg-gradient-to-r from-[#7A1F2B] to-[#B8860B] text-white p-6 rounded-2xl flex items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-[#D4AF37] shrink-0" />
            <div className="space-y-1">
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider">100% Verified profiles policy</h4>
              <p className="text-xs text-white/90">
                To protect our girls and boys, we require double-step verification for all active accounts. Unverified accounts cannot send interest connections to premium members.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Support & Chat */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Support Ticket */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-royal space-y-4">
            <h3 className="font-cinzel text-base font-bold text-[#7A1F2B]">Submit Support Ticket</h3>
            
            {ticketSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl text-center space-y-2 text-emerald-800">
                <CheckCircle className="mx-auto h-8 w-8 text-emerald-500" />
                <p className="font-serif text-sm">Your ticket has been logged successfully!</p>
                <p className="text-xs text-gray-500">Representative Ticket ID: <strong>#MALI-TK-8422</strong>. We will get back to your mobile shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Your Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Ramesh Saini" 
                    className="w-full text-xs p-2.5 border border-gray-300 rounded bg-[#F8F4EC]/20 focus:outline-[#7A1F2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Mobile Number (Registered)</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="e.g. +91 94140 XXXXX" 
                    className="w-full text-xs p-2.5 border border-gray-300 rounded bg-[#F8F4EC]/20 focus:outline-[#7A1F2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Query Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded bg-white focus:outline-[#7A1F2B]"
                  >
                    <option>Gotra Matching Assistance</option>
                    <option>Premium Membership & Billing</option>
                    <option>Photo / Document Upload Help</option>
                    <option>Report Spam or Fake Profile</option>
                    <option>Other Complaints</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Message / Issue Details</label>
                  <textarea 
                    rows={3}
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Describe your query in detail..."
                    className="w-full text-xs p-2.5 border border-gray-300 rounded bg-[#F8F4EC]/20 focus:outline-[#7A1F2B] resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#7A1F2B] text-white hover:bg-[#922a38] text-xs font-semibold py-2.5 rounded transition-all cursor-pointer"
                >
                  Submit Family Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Interactive Simulated Live Chat */}
          <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20 flex flex-col h-80">
            
            {/* Chat header */}
            <div className="bg-[#7A1F2B] p-4 flex items-center gap-3 border-b border-amber-500/20">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
              <div>
                <h4 className="font-cinzel text-xs font-bold text-white tracking-widest">Sahayata AI Assistant</h4>
                <p className="text-[9px] text-[#D4AF37]">Rajasthan Mali Bandhan Instant Desk</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-[#B8860B] text-white rounded-br-none' 
                        : 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat inputs */}
            <form onSubmit={handleSendMessage} className="p-2 border-t border-gray-800 bg-gray-950 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about Gotra, Verification, upgrade..."
                className="flex-1 bg-gray-900 border border-gray-750 rounded px-3 py-2 text-xs focus:outline-[#D4AF37] text-white"
              />
              <button 
                type="submit" 
                className="bg-[#7A1F2B] hover:bg-[#922a38] transition-colors p-2 rounded text-white cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}
