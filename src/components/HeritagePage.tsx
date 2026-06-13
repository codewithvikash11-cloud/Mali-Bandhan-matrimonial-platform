import React from 'react';
import { BookOpen, Award, Compass, Heart } from 'lucide-react';

export default function HeritagePage() {
  const socialReformers = [
    {
      name: "Mahatma Jyotiba Phule",
      title: "Pioneer of Social Justice & Equality",
      lifespan: "11 April 1827 – 28 November 1890",
      quote: "Without education, wisdom was lost; without wisdom, morals were lost; without morals, development was lost; without development, wealth was lost; all this ruined because of lack of education.",
      image: "https://images.unsplash.com/photo-1590086782957-93c060218022?auto=format&fit=crop&q=80&w=400&h=400", // Representative placeholder
      desc: "An extraordinary Indian social reformer, writer, and philosopher from the Mali community. He was at the forefront of eradicating untouchability, the caste system, and spent his life championing the empowerment of marginalized sections and farmers.",
      eduContribution: [
        "Opened the first indigenous school for girls in India at Bhida Wada in Pune, 1848.",
        "Set up a network of free local libraries and adult schools for community boys and girls.",
        "Authored educational manifestos like 'Shetkarayacha Asud' and 'Gulamgiri' to spread literacy as a weapon against exploitation."
      ],
      socialContribution: [
        "Founded the revolutionary Satyashodhak Samaj (Society of the Seekers of Truth) in 1873 to seek equal human rights.",
        "Pioneered widow remarriage and founded maternity safety homes for distressed under-privileged women.",
        "Fought against untouchability, throwing open his own private well to thirsty people of all backgrounds, irrespective of caste."
      ],
      achievements: [
        "Founded Satyashodhak Samaj (Society of Seekers of Truth) in 1873 to seek equal rights for lower classes.",
        "Opened the first indigenous school for girls in India in Pune (Bhida Wada) in 1848.",
        "Pioneered widow remarriage and social welfare centers for infants and distressed women.",
        "Bestowed with the honorary title of 'Mahatma' in 1888 by activist Vithalrao Krishnaji Vandekar."
      ],
      timeline: [
        { year: "1827", event: "Born in Pune into a Mali (gardener) family" },
        { year: "1840", event: "Married Savitribai Phule, initiating her into education" },
        { year: "1848", event: "Established the first school for girls in Pune" },
        { year: "1873", event: "Formed Satyashodhak Samaj to stand for social justice" },
        { year: "1890", event: "Left behind a profound social and educational legacy of empowerment" }
      ]
    },
    {
      name: "Savitribai Phule",
      title: "Mother of Indian Feminism",
      lifespan: "3 January 1831 – 10 March 1897",
      quote: "We shall overcome and success will be ours in the future. The future belongs to us.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=400", // Representative placeholder
      desc: "India's first female teacher, a visionary poet, and champion of human rights. Along with her husband Jyotirao Phule, she fought tirelessly against gender and caste discrimination, educating thousands of young women at a time when women education was strictly forbidden.",
      eduContribution: [
        "First female teacher in India, starting the historical Bhida Wada school with her husband in 1848.",
        "Opened 18 schools for girls of lower classes and provided standard meals to increase enrollment.",
        "Set up the first native girls' school and stood brave against public mud-throwing and hostility."
      ],
      socialContribution: [
        "Established 'Balhatya Pratibandhak Griha' in her own home to shield and protect pregnant widows and orphans.",
        "Formed the Mahila Seva Mandal in 1852 to empower widows and counter dowry and child marriage.",
        "Sacrificed her life while selflessly physically caretaking for bubonic plague patients in 1897."
      ],
      achievements: [
        "First women teacher in India who braved physical and verbal assaults to educate girls.",
        "Established 18 schools for girls across Maharashtra and provided free standard meals.",
        "Opened 'Balhatya Pratibandhak Griha' for pregnant rape victims and infant shelter.",
        "Published pioneering Marathi poetry books: 'Kavya Phule' (1854) and 'Bavan Kashi Subodh Ratnakar' (1892)."
      ],
      timeline: [
        { year: "1831", event: "Born in Naigaon into a farming family" },
        { year: "1848", event: "Began teaching at the Bhida Wada school in Pune" },
        { year: "1852", event: "Set up the Mahila Seva Mandal to advocate for widows' human rights" },
        { year: "1897", event: "Passed away while selflessly nursing patients during the Bubonic Plague" }
      ]
    }
  ];

  return (
    <div id="heritage-page" className="space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-cinzel text-xs uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37] pb-1">Mali Samaj Pride</span>
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-[#7A1F2B]">Community Heritage & Icons</h1>
        <p className="font-serif italic text-gray-600 text-sm md:text-base">
          Rooted in values of progress, education, and equality. We draw constant inspiration from the historic reformers who paved the path of enlightenment.
        </p>
      </div>

      {/* Quote Banner */}
      <div className="bg-gradient-to-r from-[#7A1F2B] via-[#922a38] to-[#7A1F2B] rounded-2xl p-8 text-white relative overflow-hidden shadow-royal border border-[#D4AF37]/30">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <Heart className="mx-auto text-[#D4AF37] h-8 w-8 animate-pulse" />
          <p className="font-serif text-lg md:text-xl italic leading-relaxed">
            "Education is the most powerful tool for elevating our samaj. An educated family builds a progressive society."
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-48 mx-auto my-2"></div>
          <span className="font-cinzel text-[#D4AF37] text-xs uppercase tracking-widest font-semibold block">Jyotiba & Savitribai Phule Philosophy</span>
        </div>
      </div>

      {/* Hero Reformer Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {socialReformers.map((reformer, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-royal overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col">
            
            {/* Top Identity Block */}
            <div className="p-6 md:p-8 bg-gradient-to-b from-[#F8F4EC]/50 to-white border-b border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md bg-amber-50 flex items-center justify-center">
                  <span className="font-cinzel text-3xl font-bold text-[#7A1F2B]">{reformer.name[0]}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-white p-1.5 rounded-full shadow-md">
                  <Award className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-xs font-semibold text-[#B8860B] uppercase tracking-wider">{reformer.lifespan}</span>
                <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#7A1F2B]">{reformer.name}</h3>
                <p className="font-serif italic text-gray-500 text-xs md:text-sm">{reformer.title}</p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
              
              {/* Quote from reformer */}
              <div className="bg-[#F8F4EC]/40 border-l-4 border-[#7A1F2B] p-4 rounded-r-xl italic font-serif text-sm text-[#1F1F1F]">
                "{reformer.quote}"
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {reformer.desc}
              </p>

              {/* Educational & Social Reform Contributions Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#F8F4EC]/30 p-4 rounded-xl border border-dashed border-[#D4AF37]/25 space-y-2">
                  <h4 className="font-cinzel text-[11px] tracking-wider text-[#7A1F2B] font-bold uppercase flex items-center gap-1.5 border-b border-[#D4AF37]/20 pb-1">
                    <BookOpen className="h-3.5 w-3.5 text-[#7A1F2B]" /> Educational Contribution
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {reformer.eduContribution.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#D4AF37] font-bold select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#F8F4EC]/30 p-4 rounded-xl border border-dashed border-[#D4AF37]/25 space-y-2">
                  <h4 className="font-cinzel text-[11px] tracking-wider text-[#B8860B] font-bold uppercase flex items-center gap-1.5 border-b border-[#D4AF37]/20 pb-1">
                    <Award className="h-3.5 w-3.5 text-[#B8860B]" /> Social Reform Contribution
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {reformer.socialContribution.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#7A1F2B] font-bold select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Core Achievements Summary */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-100">
                <h4 className="font-cinzel text-xs tracking-wider text-[#7A1F2B] font-bold uppercase flex items-center gap-2">
                  ✦ Major Milestones & General Achievements
                </h4>
                <ul className="space-y-2 text-xs text-gray-600">
                  {reformer.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold select-none mt-0.5">✦</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline */}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <h4 className="font-cinzel text-xs tracking-wider text-[#7A1F2B] font-bold uppercase flex items-center gap-2 mb-4">
                  <Compass className="h-4 w-4 text-[#D4AF37]" /> Historical Timeline
                </h4>
                <div className="relative border-l border-[#D4AF37]/30 pl-4 space-y-4">
                  {reformer.timeline.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#7A1F2B] border border-[#D4AF37]"></div>
                      <div className="text-xs">
                        <span className="font-mono font-bold text-[#B8860B] block">{item.year}</span>
                        <span className="text-gray-600">{item.event}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Pride Message Box */}
      <div className="bg-amber-50/50 rounded-2xl border border-[#D4AF37]/30 p-6 md:p-8 space-y-4 text-center">
        <h3 className="font-cinzel text-lg font-bold text-[#7A1F2B]">Our Obligation as the Next Generation</h3>
        <p className="text-xs md:text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Through <strong>Rajasthan Mali Bandhan</strong>, we don't just help families find marriage ties; we strive to uphold the ideals of high education, equality, and robust professional success set by our great ancestors. While filling out your preferences, we encourage supporting daughters' education and encouraging professional independent careers for young brides in the Mali community.
        </p>
      </div>
    </div>
  );
}
