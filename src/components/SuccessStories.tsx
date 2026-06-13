import React, { useState } from 'react';
import { Heart, Landmark, Upload, Calendar, Send, Star } from 'lucide-react';
import { SuccessStory } from '../types';

interface SuccessStoriesProps {
  stories: SuccessStory[];
  onAddStory: (story: Omit<SuccessStory, 'id'>) => void;
}

export default function SuccessStories({ stories, onAddStory }: SuccessStoriesProps) {
  const [showForm, setShowForm] = useState(false);
  const [coupleName, setCoupleName] = useState('');
  const [gotras, setGotras] = useState('');
  const [location, setLocation] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [story, setStory] = useState('');
  const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600&h=400');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleName || !gotras || !location || !weddingDate || !story) return;

    onAddStory({
      coupleName,
      gotras,
      location,
      weddingDate,
      story,
      photo
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowForm(false);
      // Reset
      setCoupleName('');
      setGotras('');
      setLocation('');
      setWeddingDate('');
      setStory('');
    }, 2000);
  };

  return (
    <div id="success-stories-views" className="space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4AF37]/20 pb-6">
        <div className="space-y-2">
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#B8860B] block">Blessed Unions</span>
          <h1 className="font-cinzel text-3xl font-bold text-[#7A1F2B]">Shubh Bandhan Stories</h1>
          <p className="font-serif italic text-[#1F1F1F]/70 text-sm max-w-xl">
            Celebrating the sacred bonds formed through our platform. Heartfelt tales from Mali Samaj families across Rajasthan.
          </p>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#7A1F2B] text-white hover:bg-[#922a38] font-cinzel text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-lg shadow-royal border border-[#D4AF37] transition-all cursor-pointer flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <Heart className="h-4 w-4 text-[#D4AF37]" /> Click to Share Your Story
        </button>
      </div>

      {/* Share story Form Collapsible */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#D4AF37]/30 shadow-royal space-y-6">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-[#D4AF37]" />
            <h3 className="font-cinzel text-lg font-bold text-[#7A1F2B]">Submit Your Marriage Success Story</h3>
          </div>

          {successMsg ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800 font-serif">
              🎉 Thank you! Your beautiful Rajasthan Mali Bandhan success story has been submitted for verification. It will be live instantly!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Couple Names (e.g. Manish & Kiran)</label>
                <input 
                  type="text" 
                  value={coupleName} 
                  onChange={(e) => setCoupleName(e.target.value)}
                  placeholder="e.g. Vikram Saini & Divya Gehlot" 
                  required
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/20 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Gotra Union (e.g. Kachhawaha & Solanki Union)</label>
                <input 
                  type="text" 
                  value={gotras} 
                  onChange={(e) => setGotras(e.target.value)}
                  placeholder="e.g. Saini & Tak Gotra union" 
                  required
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/20 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Wedding Location (Rajasthan District)</label>
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Jodhpur" 
                  required
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/20 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">Wedding Date</label>
                <input 
                  type="date" 
                  value={weddingDate} 
                  onChange={(e) => setWeddingDate(e.target.value)}
                  required
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/20 focus:outline-[#7A1F2B]"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 block">Your Beautiful Story (Explain how your families connected, gotra checks, or meetings)</label>
                <textarea 
                  rows={4}
                  value={story} 
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Share details of your beautiful bond..." 
                  required
                  className="w-full text-xs p-3 border border-gray-300 rounded bg-[#F8F4EC]/20 focus:outline-[#7A1F2B] resize-none"
                ></textarea>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 block">Happy Wedding Photo (Select beautiful preset portrait)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=600&h=400",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600&h=400",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600&h=400",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600&h=400"
                  ].map((url, i) => (
                    <div 
                      key={i} 
                      onClick={() => setPhoto(url)}
                      className={`border-2 rounded-lg overflow-hidden cursor-pointer h-16 relative ${photo === url ? 'border-[#7A1F2B] outline-1 outline-[#D4AF37]' : 'border-transparent'}`}
                    >
                      <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      {photo === url && (
                        <div className="absolute inset-0 bg-[#7A1F2B]/20 flex items-center justify-center">
                          <Heart className="h-4 w-4 text-white fill-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-xs border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-[#7A1F2B] text-white hover:bg-[#922a38] text-xs font-semibold px-6 py-2 rounded flex items-center gap-2 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" /> Submit Story
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Grid Layout of Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((storyItem) => (
          <div key={storyItem.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-royal hover:shadow-xl transition-all duration-300 flex flex-col group">
            
            {/* Story Image container */}
            <div className="h-56 relative overflow-hidden bg-gray-50">
              <img 
                src={storyItem.photo} 
                alt={storyItem.coupleName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="bg-[#D4AF37] text-[#7A1F2B] font-bold text-[10px] px-2.5 py-1 rounded-full font-cinzel tracking-wider flex items-center gap-1">
                  <Heart className="h-3 w-3 fill-current" /> ROYAL MARRIAGE
                </span>
                <span className="text-xs font-mono flex items-center gap-1 drop-shadow">
                  <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" /> {storyItem.weddingDate}
                </span>
              </div>
            </div>

            {/* Story Content wrapper */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-amber-600 text-xs font-mono font-semibold">
                  <Landmark className="h-3.5 w-3.5" />
                  <span>{storyItem.location}, Rajasthan</span>
                </div>
                
                <h3 className="font-cinzel text-lg font-bold text-[#7A1F2B] tracking-tight">{storyItem.coupleName}</h3>
                <p className="text-xs font-serif italic text-gray-500 font-medium">{storyItem.gotras}</p>
                
                <p className="text-xs text-gray-600 leading-relaxed pt-2">
                  "{storyItem.story}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                <span>Verified Match Matchmaker</span>
                <span className="text-[#7A1F2B] font-semibold">★ ★ ★ ★ ★</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Community Callout */}
      <div className="bg-gradient-to-b from-[#F8F4EC] to-white rounded-2xl border border-[#D4AF37]/30 p-8 text-center space-y-3">
        <h4 className="font-cinzel text-base font-bold text-[#7A1F2B]">Are you a parent with happy news?</h4>
        <p className="text-xs text-gray-600 max-w-2xl mx-auto">
          We reward parents who share their happy wedding stories with complimentary sweets and dynamic silver gift tokens for the coordinates of their future children. Empower the Mali Samaj with family transparency!
        </p>
      </div>

    </div>
  );
}
