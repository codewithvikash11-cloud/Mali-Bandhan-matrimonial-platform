import React, { useState } from 'react';
import { 
  Sparkles, User, Award, ShieldCheck, Search, Copy, Check, RotateCcw, MessageSquare, Send, CheckCircle, Landmark, MapPin, Briefcase 
} from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  age: number;
  dob: string;
  gotra: string;
  district: string;
  education: string;
  occupation: string;
  income: string;
  photo: string;
  verified: boolean;
  premium: boolean;
}

interface MaliAssistantProps {
  onSearchApply: (filters: { gotra: string; district: string; occupation: string }) => void;
  profiles: Profile[];
  onViewProfileDetail: (profile: Profile) => void;
  onNavigateToView: (view: any) => void;
}

export default function MaliAssistant({ onSearchApply, profiles, onViewProfileDetail, onNavigateToView }: MaliAssistantProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'bio' | 'plans' | 'verify' | 'search'>('chat');
  
  // Custom Chat Input
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string; items?: any }>>([
    { 
      sender: 'assistant', 
      text: 'Namaste! I am your Rajasthan Mali Bandhan Heritage Advisor. How can I assist your family today with building relationships in our Samaj?', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  // Bio creator state
  const [bioGender, setBioGender] = useState<'groom' | 'bride'>('groom');
  const [bioGotra, setBioGotra] = useState('Gehlot');
  const [bioProfession, setBioProfession] = useState('Software Engineer (MNC)');
  const [bioVibe, setBioVibe] = useState('Traditional & Career-Oriented');
  const [generatedBio, setGeneratedBio] = useState('');
  const [copied, setCopied] = useState(false);

  // Search assistance state
  const [searchGotra, setSearchGotra] = useState('All');
  const [searchDistrict, setSearchDistrict] = useState('All');
  const [foundMatches, setFoundMatches] = useState<Profile[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: userText, time: now }]);
    setInputVal('');

    setTimeout(() => {
      let responseText = "Dhanyawad (Thank you) for contacting Samaj office help desk. Our senior matrimonial counselors in Jodhpur are available at +91 291 294 6242 for immediate guidance.";
      const textLow = userText.toLowerCase();

      if (textLow.includes('gotra') || textLow.includes('clan') || textLow.includes('gothra')) {
        responseText = "Mali Samaj traditionally avoids 4 Gotras (Self, Father's mother, Mother's father, and Mother's mother's father) to maintain proud lineages. I recommend using our specialized search engine where our algorithm filters the selected gotras automatically.";
      } else if (textLow.includes('membership') || textLow.includes('price') || textLow.includes('fees') || textLow.includes('gold') || textLow.includes('silver') || textLow.includes('premium')) {
        responseText = "Upgrading unlocks verified parent contact numbers and featured search ribbons. Our plan details are instantly available in the specialized 'Plans' tab above. We offer Silver Plan (₹299/mo) and Gold Plan (₹699/3mo) with the optional Profile Verification add-on.";
      } else if (textLow.includes('verify') || textLow.includes('aadhaar') || textLow.includes('badge') || textLow.includes('trust')) {
        responseText = "Trust is paramount. A 'Samaj Verified Badge' is awarded after Aadhaar authentication and facial verification matching. Check out the 'Verification Manual' tab above for step-by-step guidance.";
      } else if (textLow.includes('write') || textLow.includes('bio') || textLow.includes('create') || textLow.includes('description') || textLow.includes('about')) {
        responseText = "Writing an elder-pleasing bio is highly recommended! Please use the '📝 Bio Generator' option in the helper tabs above to craft a respectful, structured matrimonial introduction instantly.";
      } else if (textLow.includes('search') || textLow.includes('find') || textLow.includes('match') || textLow.includes('bride') || textLow.includes('groom')) {
        responseText = "I can definitely help pinpoint matches! Use the '🔍 Match Assistant' tab above to specify gotra and location, and I will pull up real verified Samaj profiles instantly.";
      }

      setMessages(prev => [...prev, { 
        sender: 'assistant', 
        text: responseText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 850);
  };

  const handleGenerateBio = () => {
    const isGroom = bioGender === 'groom';
    const gotraText = bioGotra;
    const profText = bioProfession;
    
    let paragraph = "";
    if (bioVibe === 'Traditional & Career-Oriented') {
      paragraph = `Namaste. With the divine blessings of our family deities and social reformer ancestors Mahatma Jyotiba Phule and Savitribai Phule, I have created this profile for my ${isGroom ? 'son' : 'daughter'}. ${isGroom ? 'He' : 'She'} is a highly qualified ${profText} belonging to the respectful ${gotraText} gotra. Raised with strong traditional Rajasthani family values, ${isGroom ? 'he' : 'she'} balances modern career achievements with cultural humility. We seek an educated, compassionate partner from the Mali Samaj who values family bonds, respects elders, and is supportive of a progressive yet rooted life forward.`;
    } else if (bioVibe === 'Modern Startup Focus') {
      paragraph = `Greetings. This profile is created for a highly ambitious, tech-savvy ${isGroom ? 'groom' : 'bride'} currently practicing as a ${profText} based in Rajasthan. Belongs to the ${gotraText} gotra. ${isGroom ? 'He' : 'She'} is deeply dedicated to professional excellence, value creation, and social harmony. Coming from a well-settled family with a balanced outlook, ${isGroom ? 'he' : 'she'} is seeking an independent, career-oriented partner from the Samaj who possesses a broad perspective on life and marriage.`;
    } else {
      paragraph = `Pranam. We are seeking a suitable alliance for our beloved ${isGroom ? 'son' : 'daughter'} who is a dedicated ${profText}, proud of our ${gotraText} parentage. Our family places utmost importance on high moral character, respect for elders, and simple community living. ${isGroom ? 'He' : 'She'} is a warm-hearted, cooperative individual who believes in mutual care and simplicity. We are looking for a simple, educated family for an auspicious and lifelong matrimonial relationship.`;
    }

    setGeneratedBio(paragraph);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeMatchSearch = () => {
    let filtered = profiles;
    if (searchGotra !== 'All') {
      filtered = filtered.filter(p => p.gotra === searchGotra);
    }
    if (searchDistrict !== 'All') {
      filtered = filtered.filter(p => p.district === searchDistrict);
    }
    setFoundMatches(filtered);
    setHasSearched(true);
  };

  return (
    <div id="mali-ai-advisor-container" className="bg-white rounded-2xl border border-[#D4AF37]/35 shadow-royal overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[550px]">
      
      {/* Left Column: Selector Menu list for Samaj helper */}
      <div className="lg:col-span-3 bg-[#7A1F2B]/5 border-r border-[#D4AF37]/20 p-4 space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-[#7A1F2B] font-bold block">Exclusive Helper Tool</span>
            <h4 className="font-cinzel text-xs font-bold text-[#7A1F2B] flex items-center gap-1.5 pb-2 border-b border-[#D4AF37]/25">
              <Sparkles className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]" /> Samaj Advisor UI
            </h4>
          </div>
          
          <nav className="flex flex-col gap-1 text-xs">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 font-medium transition-all ${
                activeTab === 'chat' 
                  ? 'bg-[#7A1F2B] text-white shadow-md' 
                  : 'hover:bg-[#7A1F2B]/10 text-gray-750'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Heritage Help Desk Chat</span>
            </button>

            <button 
              onClick={() => {
                setActiveTab('bio');
                if(!generatedBio) handleGenerateBio();
              }}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 font-medium transition-all ${
                activeTab === 'bio' 
                  ? 'bg-[#7A1F2B] text-white shadow-md' 
                  : 'hover:bg-[#7A1F2B]/10 text-gray-750'
              }`}
            >
              <User className="h-4 w-4" />
              <span>📝 Maharaja Bio Creator</span>
            </button>

            <button 
              onClick={() => setActiveTab('plans')}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 font-medium transition-all ${
                activeTab === 'plans' 
                  ? 'bg-[#7A1F2B] text-white shadow-md' 
                  : 'hover:bg-[#7A1F2B]/10 text-gray-750'
              }`}
            >
              <Award className="h-4 w-4" />
              <span>💎 Membership Manual</span>
            </button>

            <button 
              onClick={() => setActiveTab('verify')}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 font-medium transition-all ${
                activeTab === 'verify' 
                  ? 'bg-[#7A1F2B] text-white shadow-md' 
                  : 'hover:bg-[#7A1F2B]/10 text-gray-750'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>🛡️ Verification Manual</span>
            </button>

            <button 
              onClick={() => {
                setActiveTab('search');
                executeMatchSearch();
              }}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 font-medium transition-all ${
                activeTab === 'search' 
                  ? 'bg-[#7A1F2B] text-white shadow-md' 
                  : 'hover:bg-[#7A1F2B]/10 text-gray-750'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>🔍 Match Search Advisor</span>
            </button>
          </nav>
        </div>

        {/* Quick Quote footer inside assistant panel */}
        <div className="p-3 bg-[#7A1F2B]/10 border border-dashed border-[#7A1F2B]/20 rounded-xl space-y-1">
          <Landmark className="h-4 w-4 text-[#7A1F2B] mx-auto" />
          <p className="text-[9px] text-gray-500 font-serif text-center italic">
            "Blessed by Jyotiba-Savitribai ideals of Samaj Unity and high literacy."
          </p>
        </div>

      </div>

      {/* Right Column: Work panels for selected helpers */}
      <div className="lg:col-span-9 flex flex-col bg-white">
        
        {/* Active tab content block */}
        <div className="flex-1 p-5 md:p-8">
          
          {/* TAB 1: Heritage Chat */}
          {activeTab === 'chat' && (
            <div className="space-y-4 flex flex-col h-[400px]">
              
              <div className="border-b border-[#D4AF37]/25 pb-3">
                <h5 className="font-cinzel text-sm font-bold text-[#7A1F2B]">Sahayata Dedicated Matrimonial Chat</h5>
                <p className="text-[10px] text-gray-500">Instant robotic assistant backed by Jodhpur head office protocols.</p>
              </div>

              {/* Chat screen */}
              <div className="flex-1 overflow-y-auto space-y-3 bg-[#F8F4EC]/35 p-4 rounded-xl border border-gray-100 max-h-[280px]">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-xl max-w-[85%] text-xs space-y-1.5 ${
                      m.sender === 'user'
                        ? 'bg-[#7A1F2B] text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-150'
                    }`}>
                      <p className="leading-relaxed">{m.text}</p>
                      <span className={`text-[8px] font-mono block text-right ${m.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                        {m.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive prompt buttons directly built under chat */}
              <div className="flex flex-wrap gap-1.5">
                <button 
                  onClick={() => {
                    setInputVal("Help me write an elegant profile bio please.");
                  }}
                  className="bg-[#F8F4EC] hover:bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#7A1F2B] px-2.5 py-1.5 rounded-full text-[10px] font-medium"
                >
                  📝 Elegant Bio Help
                </button>
                <button 
                  onClick={() => {
                    setInputVal("How can I get the Samaj Verified Badge with Aadhaar?");
                  }}
                  className="bg-[#F8F4EC] hover:bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#7A1F2B] px-2.5 py-1.5 rounded-full text-[10px] font-medium"
                >
                  🛡️ Verify My Aadhaar
                </button>
                <button 
                  onClick={() => {
                    setInputVal("Explain differences between Silver and Gold plans.");
                  }}
                  className="bg-[#F8F4EC] hover:bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#7A1F2B] px-2.5 py-1.5 rounded-full text-[10px] font-medium"
                >
                  💎 Compare Silver vs Gold
                </button>
              </div>

              {/* Message inputs */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                  type="text" 
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask any question regarding gotra filters, subscription or verification..."
                  className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2.5 bg-white focus:outline-[#7A1F2B]"
                />
                <button 
                  type="submit"
                  className="bg-[#7A1F2B] text-white hover:bg-[#922a38] px-4 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

            </div>
          )}

          {/* TAB 2: Maharaja Bio Generator */}
          {activeTab === 'bio' && (
            <div className="space-y-4">
              
              <div className="border-b border-[#D4AF37]/25 pb-3">
                <h5 className="font-cinzel text-sm font-bold text-[#7A1F2B]">📝 Maharaja Bio Generator</h5>
                <p className="text-[10px] text-gray-500">Generate respectful matrimonial bios focused on family pride, education, and elder-approved etiquette.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Inputs for Generator */}
                <div className="space-y-3 bg-[#F8F4EC]/35 p-4 rounded-xl border border-[#D4AF37]/20">
                  <div className="space-y-1">
                    <label className="font-bold text-[#7A1F2B] block">Candidate Gender</label>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <button 
                        onClick={() => setBioGender('groom')}
                        className={`py-1.5 border rounded uppercase font-bold text-[10px] ${
                          bioGender === 'groom' 
                            ? 'bg-[#7A1F2B] text-white border-transparent' 
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}
                      >
                        Groom (वर)
                      </button>
                      <button 
                        onClick={() => setBioGender('bride')}
                        className={`py-1.5 border rounded uppercase font-bold text-[10px] ${
                          bioGender === 'bride' 
                            ? 'bg-[#7A1F2B] text-white border-transparent' 
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}
                      >
                        Bride (वधु)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#7A1F2B] block">Candidate Gotra</label>
                    <select 
                      value={bioGotra} 
                      onChange={(e) => setBioGotra(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded bg-white"
                    >
                      <option value="Gehlot">Gehlot (गहलोत)</option>
                      <option value="Saini">Saini (सैनी)</option>
                      <option value="Kachhawaha">Kachhawaha (कछवाहा)</option>
                      <option value="Solanki">Solanki (सोलंकी)</option>
                      <option value="Tak">Tak (टांक)</option>
                      <option value="Tanwar">Tanwar (तंवर)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#7A1F2B] block">Education / Profession Phrase</label>
                    <select 
                      value={bioProfession} 
                      onChange={(e) => setBioProfession(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded bg-white"
                    >
                      <option value="Software Engineer (MNC)">Software Engineer (MNC)</option>
                      <option value="Government Secondary Teacher">Government Secondary Teacher</option>
                      <option value="Chartered Accountant (CA)">Chartered Accountant (CA)</option>
                      <option value="Doctor / MD Surgeon">Doctor / MD Surgeon</option>
                      <option value="Civil Services Officer (RAS)">Civil Services Officer (RAS)</option>
                      <option value="Family Business Director">Family Business Director</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#7A1F2B] block">Aesthetic Tone Vibe</label>
                    <select 
                      value={bioVibe} 
                      onChange={(e) => setBioVibe(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded bg-white"
                    >
                      <option value="Traditional & Career-Oriented">Traditional & Career-Oriented</option>
                      <option value="Modern Startup Focus">Modern Startup Focus</option>
                      <option value="Simple & Family-First Values">Simple & Family-First Values</option>
                    </select>
                  </div>

                  <button 
                    onClick={handleGenerateBio}
                    className="w-full bg-[#7A1F2B] text-white hover:bg-[#922a38] py-2.5 rounded font-cinzel font-bold text-[10px] tracking-wider transition-colors cursor-pointer"
                  >
                    Generate Maharaja Bio ✦
                  </button>
                </div>

                {/* Outputs Generated text */}
                <div className="space-y-3 flex flex-col justify-between">
                  <div className="space-y-2 flex-1">
                    <label className="font-bold text-gray-500 block uppercase text-[10px]">Your Personalized Bio Output</label>
                    <div className="p-4 bg-[#F8F4EC]/65 border border-dashed border-[#D4AF37] rounded-xl text-xs text-gray-800 leading-relaxed min-h-[180px] font-serif italic">
                      {generatedBio || "Generated paragraphs will appear here. Press generate button to create."}
                    </div>
                  </div>

                  {generatedBio && (
                    <div className="flex gap-2">
                      <button 
                        onClick={copyToClipboard}
                        className="flex-1 bg-[#D4AF37] hover:bg-amber-600 text-[#7A1F2B] font-bold py-2 rounded text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {copied ? <Check className="h-4.5 w-4.5" /> : <Copy className="h-4 w-4" />}
                        <span>{copied ? "COPIED TO CLIPBOARD" : "COPY BIO TEXT"}</span>
                      </button>
                      <button 
                        onClick={() => {
                          setBioGotra('Gehlot');
                          setBioProfession('Software Engineer (MNC)');
                          setBioVibe('Traditional & Career-Oriented');
                          handleGenerateBio();
                        }}
                        className="p-2 border border-gray-300 bg-white rounded text-gray-650 hover:bg-gray-50"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* TAB 3: Membership Tiers comparative matrix */}
          {activeTab === 'plans' && (
            <div className="space-y-4">
              
              <div className="border-b border-[#D4AF37]/25 pb-3">
                <h5 className="font-cinzel text-sm font-bold text-[#7A1F2B]">💎 Premium Membership Comparison Manual</h5>
                <p className="text-[10px] text-gray-500">Rajasthan Mali Bandhan operates under community-friendly subsidized pricing structures. Premium status directly supports physical offices.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Free */}
                <div className="bg-white border border-gray-150 rounded-xl p-4 text-center space-y-3 hover:border-gray-350 transition-all">
                  <span className="text-[8px] bg-gray-100 text-gray-550 font-bold px-1.5 py-0.5 rounded">BASIC</span>
                  <h6 className="font-cinzel font-bold text-[#1F1F1F] text-xs">Free Plan</h6>
                  <p className="text-xs font-mono font-bold text-gray-600">₹0 <span className="text-[10px] text-gray-300 font-normal">/ Lifetime</span></p>
                  <div className="h-px bg-gray-100"></div>
                  <ul className="text-[10px] text-gray-505 space-y-1.5 text-left font-serif">
                    <li className="flex items-center gap-1">✔️ <span>10 Profile Views / Day</span></li>
                    <li className="flex items-center gap-1">✔️ <span>3 Interests / Month</span></li>
                    <li className="flex items-center gap-1">✔️ <span>Community Access</span></li>
                    <li className="flex items-center gap-1">❌ <span className="line-through">Advanced Searches</span></li>
                  </ul>
                </div>

                {/* 2. Silver */}
                <div className="bg-white border border-[#D4AF37]/25 rounded-xl p-4 text-center space-y-3 relative hover:border-[#D4AF37] transition-all">
                  <span className="text-[8px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[8px]">POPULAR</span>
                  <h6 className="font-cinzel font-bold text-[#7A1F2B] text-xs">Silver Plan</h6>
                  <p className="text-xs font-mono font-bold text-[#7A1F2B]">₹299 <span className="text-[10px] text-gray-400 font-normal">/ Month</span></p>
                  <div className="h-px bg-gray-100"></div>
                  <ul className="text-[10px] text-gray-505 space-y-1.5 text-left font-serif">
                    <li className="flex items-center gap-1">✔️ <span>Unlimited Views & Interest</span></li>
                    <li className="flex items-center gap-1">✔️ <span>Advanced Search Filters</span></li>
                    <li className="flex items-center gap-1">✔️ <span>See Profile Visitors</span></li>
                    <li className="flex items-center gap-1">✔️ <span>Priority Search Ranking</span></li>
                  </ul>
                </div>

                {/* 3. Gold */}
                <div className="bg-gradient-to-b from-[#F8F4EC] to-white border-2 border-[#D4AF37] rounded-xl p-4 text-center space-y-3 relative shadow">
                  <span className="text-[8px] bg-[#7A1F2B] text-[#D4AF37] font-bold px-1.5 py-0.5 rounded uppercase font-mono">BEST VALUE 🔥</span>
                  <h6 className="font-cinzel font-bold text-[#7A1F2B] text-xs">Gold Plan</h6>
                  <p className="text-xs font-mono font-bold text-amber-700">₹699 <span className="text-[10px] text-gray-400 font-normal">/ 3 Months</span></p>
                  <div className="h-px bg-[#D4AF37]/20"></div>
                  <ul className="text-[10px] text-gray-505 space-y-1.5 text-left font-serif">
                    <li className="flex items-center gap-1">✔️ <span>Everything in Silver</span></li>
                    <li className="flex items-center gap-1">✔️ <span>Featured Placement</span></li>
                    <li className="flex items-center gap-1">✔️ <span>WhatsApp & Mobile Unlock</span></li>
                    <li className="flex items-center gap-1">✔️ <span>Fast Verification Queue</span></li>
                  </ul>
                </div>

              </div>

              <div className="flex justify-center pt-2">
                <button 
                  onClick={() => onNavigateToView('MEMBERSHIP')}
                  className="bg-[#7A1F2B] text-white hover:bg-[#922a38] border border-[#D4AF37] px-8 py-2 font-cinzel text-xs font-bold rounded shadow cursor-pointer uppercase tracking-wider"
                >
                  Apply & Upgrade Plan Online Now
                </button>
              </div>

            </div>
          )}

          {/* TAB 4: Verification process timeline */}
          {activeTab === 'verify' && (
            <div className="space-y-4">
              
              <div className="border-b border-[#D4AF37]/25 pb-3">
                <h5 className="font-cinzel text-sm font-bold text-[#7A1F2B]">🛡️ Identity Trust & Verification Manual</h5>
                <p className="text-[10px] text-gray-500">To maintain a completely family-safe portal, we enforce dual biometric & legal authentication checks across Rajasthan.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                
                <div className="p-5 bg-white border border-gray-150 rounded-2xl relative space-y-3">
                  <div className="w-10 h-10 bg-[#7A1F2B]/10 text-[#7A1F2B] rounded-full flex items-center justify-center font-bold font-mono">01</div>
                  <h6 className="font-cinzel font-bold text-[#7A1F2B] uppercase text-[11px] tracking-wider">Aadhaar Vault Matching</h6>
                  <p className="text-gray-600 font-serif leading-relaxed text-[11px]">
                    Candidates upload their 12-digit Aadhaar Card. The document is matched against database records under safe SHA-256 encryption. We confirm the legal full name & age instantly.
                  </p>
                </div>

                <div className="p-5 bg-white border border-gray-150 rounded-2xl relative space-y-3">
                  <div className="w-10 h-10 bg-[#7A1F2B]/10 text-[#7A1F2B] rounded-full flex items-center justify-center font-bold font-mono">02</div>
                  <h6 className="font-cinzel font-bold text-[#7A1F2B] uppercase text-[11px] tracking-wider">Live Selfie matching</h6>
                  <p className="text-gray-600 font-serif leading-relaxed text-[11px]">
                    Candidates capture a live photo through their camera. Our facial recognition software compares facial nodes against the uploaded Aadhaar photograph to confirm the profile is authentic and original.
                  </p>
                </div>

                <div className="p-5 bg-white border border-gray-150 rounded-2xl relative space-y-3">
                  <div className="w-10 h-10 bg-[#7A1F2B]/10 text-[#7A1F2B] rounded-full flex items-center justify-center font-bold font-mono">03</div>
                  <h6 className="font-cinzel font-bold text-[#7A1F2B] uppercase text-[11px] tracking-wider">Samaj Elder Endorsement</h6>
                  <p className="text-gray-600 font-serif leading-relaxed text-[11px]">
                    The local office committee in Jaipur/Jodhpur reviews family history and verifies gotra authenticity manually to confirm there are no falsified credentials under traditional protocols.
                  </p>
                </div>

              </div>

              {/* Status callout */}
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-800 text-xs">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-emerald-900">Why Get Verified?</strong>
                  <span className="text-gray-600">Verified profiles receive 4x more interest requests from proud Mali families and enjoy topmost rankings on searches.</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: Match search assistant */}
          {activeTab === 'search' && (
            <div className="space-y-4">
              
              <div className="border-b border-[#D4AF37]/25 pb-3">
                <h5 className="font-cinzel text-sm font-bold text-[#7A1F2B]">🔍 Interactive Match Search Advisor</h5>
                <p className="text-[10px] text-gray-500">Apply instant gotra and district filters to explore active matches directly inside the help desk.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Search controls */}
                <div className="space-y-3 bg-[#F8F4EC]/35 p-4 rounded-xl border border-[#D4AF37]/25">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-bold text-[#7A1F2B]">Filter Gotra</label>
                      <select 
                        value={searchGotra}
                        onChange={(e) => setSearchGotra(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-xs"
                      >
                        <option value="All">All Gotras</option>
                        <option value="Gehlot">Gehlot</option>
                        <option value="Saini">Saini</option>
                        <option value="Solanki">Solanki</option>
                        <option value="Tak">Tak</option>
                        <option value="Kachhawaha">Kachhawaha</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[#7A1F2B]">District Location</label>
                      <select 
                        value={searchDistrict}
                        onChange={(e) => setSearchDistrict(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-xs"
                      >
                        <option value="All">All Districts</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Jodhpur">Jodhpur</option>
                        <option value="Udaipur">Udaipur</option>
                        <option value="Pali">Pali</option>
                        <option value="Ajmer">Ajmer</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={executeMatchSearch}
                    className="w-full bg-[#7A1F2B] text-white hover:bg-[#922a38] py-2 border border-[#D4AF37] rounded font-cinzel font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Execute Advisor Search ➔
                  </button>
                </div>

                {/* Search output results */}
                <div className="space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500 block uppercase text-[10px]">Instant Verified matches ({foundMatches.length})</label>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                      {hasSearched && foundMatches.length === 0 ? (
                        <p className="text-xs text-gray-500 italic p-4 text-center">No exact matches found matching current filters inside assistant.</p>
                      ) : foundMatches.slice(0, 3).map((match) => (
                        <div key={match.id} className="p-2 border border-gray-150 rounded-lg flex items-center justify-between text-xs hover:border-[#D4AF37] transition-all bg-white gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <img src={match.photo} alt={match.name} className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]" referrerPolicy="no-referrer" />
                            <div className="min-w-0">
                              <span className="font-bold text-gray-800 block truncate">{match.name}</span>
                              <span className="text-[9px] text-gray-400 block font-mono">{match.gotra} Gotra • {match.district}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => onViewProfileDetail(match)}
                            className="bg-[#7A1F2B]/10 hover:bg-[#7A1F2B] hover:text-white text-[#7A1F2B] font-bold py-1 px-2.5 rounded text-[10px] shrink-0"
                          >
                            Open Details
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      onSearchApply({ 
                        gotra: searchGotra, 
                        district: searchDistrict, 
                        occupation: 'All' 
                      });
                    }}
                    className="w-full border border-dashed border-[#D4AF37] text-[#7A1F2B] font-bold py-1.5 rounded text-[10px] uppercase text-center"
                  >
                    Apply To Main Search Tab & Browse Results
                  </button>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
