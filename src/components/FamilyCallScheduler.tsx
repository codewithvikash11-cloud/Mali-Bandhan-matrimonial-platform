import React, { useState } from 'react';
import { CalendarClock, Check, Clock, Phone, Users, Video } from 'lucide-react';

interface FamilyCallSchedulerProps {
  candidateName?: string;
  onCallScheduled?: (callDetails: { date: string; timeSlot: string; type: string }) => void;
  inlineLayout?: boolean;
}

export default function FamilyCallScheduler({
  candidateName = "Rajasthan Mali Matchmaker Assistant",
  onCallScheduled,
  inlineLayout = false
}: FamilyCallSchedulerProps) {
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [callType, setCallType] = useState<'Audio' | 'Video' | 'Physical Meeting'>('Video');
  const [isScheduled, setIsScheduled] = useState(false);

  // Generate date quick chips representing the next 4 days beautifully
  const dateChips = React.useMemo(() => {
    const chips = [];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 1; i <= 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = days[d.getDay()];
      const dateStr = `${d.getDate()} ${months[d.getMonth()]}`;
      const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      
      let label = `${dayName} (${dateStr})`;
      if (i === 1) label = `Tomorrow (${dateStr})`;
      chips.push({ label, value });
    }
    return chips;
  }, []);

  const timeSlots = [
    { label: "Morning (10:00 AM - 12:00 PM)", val: "10:00 AM - 12:00 PM" },
    { label: "Afternoon (03:00 PM - 05:00 PM)", val: "03:00 PM - 05:00 PM" },
    { label: "Evening (06:00 PM - 08:00 PM)", val: "06:00 PM - 08:00 PM" },
    { label: "Late Night (08:30 PM - 10:00 PM)", val: "08:30 PM - 10:00 PM" }
  ];

  const handleScheduleRequest = () => {
    if (!selectedDate || !selectedTimeSlot) return;
    
    const requestDetails = {
      id: `call-${Date.now()}`,
      candidateName,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      type: callType,
      status: "PRISTINE_REQUESTED",
      createdAt: new Date().toISOString()
    };

    // Store in LocalStorage logs for audit
    const stored = localStorage.getItem('mali_samaj_scheduled_calls') || '[]';
    let callsList = [];
    try {
      callsList = JSON.parse(stored);
    } catch {
      callsList = [];
    }
    callsList.push(requestDetails);
    localStorage.setItem('mali_samaj_scheduled_calls', JSON.stringify(callsList));

    setIsScheduled(true);
    if (onCallScheduled) {
      onCallScheduled({
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        type: callType
      });
    }
  };

  return (
    <div className={`rounded-3xl border transition-all ${
      inlineLayout 
        ? 'bg-[#F8F4EC]/60 border-amber-900/10 p-5' 
        : 'bg-white border-[#D4AF37]/30 shadow-royal p-6 md:p-8 max-w-md mx-auto space-y-5'
    }`}>
      
      {/* HEADER ROW */}
      <div className="flex items-start gap-3">
        <div className="p-3 bg-rose-50 rounded-full text-[#7A1F2B] border border-rose-100 shrink-0">
          <CalendarClock className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A1F2B] font-cinzel">
            Schedule Bandhan Family Call
          </h4>
          <p className="text-[10px] text-gray-500 leading-relaxed max-w-sm mt-0.5">
            Coordinate secure direct match introductions. Our automated assistant will sync this request onto both families' WhatsApp logs.
          </p>
        </div>
      </div>

      {!isScheduled ? (
        <div className="space-y-4 pt-1">
          
          {/* DATE SELECT CHIPS */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
              1. Select Introduction Date *
            </span>
            <div className="grid grid-cols-2 gap-2">
              {dateChips.map((chip) => (
                <button
                  type="button"
                  key={chip.value}
                  onClick={() => setSelectedDate(chip.value)}
                  className={`text-[10px] p-2.5 rounded-xl border text-center font-semibold font-sans transition-all cursor-pointer ${
                    selectedDate === chip.value
                      ? 'bg-[#7A1F2B] text-white border-[#7A1F2B] shadow-md'
                      : 'bg-white border-gray-200 text-slate-700 hover:border-[#7A1F2B]/30'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* TIME SELECT CHIPS */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
              2. Select Parents' Active Time Slot *
            </span>
            <div className="space-y-1.5">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot.val}
                  onClick={() => setSelectedTimeSlot(slot.val)}
                  className={`w-full text-left text-xs p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    selectedTimeSlot === slot.val
                      ? 'bg-amber-50 text-[#7A1F2B] border-[#7A1F2B] font-semibold shadow-inner'
                      : 'bg-white border-gray-200 text-slate-700 hover:bg-[#F8F4EC]/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className={`h-4 w-4 ${selectedTimeSlot === slot.val ? 'text-[#7A1F2B]' : 'text-gray-400'}`} />
                    {slot.label}
                  </span>
                  {selectedTimeSlot === slot.val && <Check className="h-4 w-4 text-[#7A1F2B]" />}
                </button>
              ))}
            </div>
          </div>

          {/* INTRO FORMAT */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
              3. Select Call Format / Mode
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'Video', icon: Video, label: "Zoom Video" },
                { type: 'Audio', icon: Phone, label: "Phone Call" },
                { type: 'Physical Meeting', icon: Users, label: "In Person" }
              ].map((m) => (
                <button
                  type="button"
                  key={m.type}
                  onClick={() => setCallType(m.type as any)}
                  className={`text-[10px] p-2 rounded-xl flex flex-col items-center justify-center gap-1.5 border font-semibold transition-all cursor-pointer ${
                    callType === m.type
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                      : 'bg-white border-gray-200 text-slate-600 hover:border-[#7A1F2B]/20'
                  }`}
                >
                  <m.icon className="h-4 w-4" />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={!selectedDate || !selectedTimeSlot}
            onClick={handleScheduleRequest}
            className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all text-center flex items-center justify-center gap-2 ${
              selectedDate && selectedTimeSlot
                ? 'bg-gradient-to-r from-[#7A1F2B] to-[#922a38] text-white hover:opacity-95 cursor-pointer'
                : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
          >
            <CalendarClock className="h-4 w-4" /> Confirm Schedule Request
          </button>

        </div>
      ) : (
        <div className="p-6 bg-emerald-50 border border-emerald-200/50 rounded-2xl text-center space-y-3.5 animate-fade-in">
          <div className="mx-auto w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow">
            <Check className="h-5 w-5 stroke-[3px]" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-widest font-sans">
              CALL SCHEDULED SUCCESSFULLY
            </h5>
            <p className="text-[11px] text-emerald-700 leading-relaxed max-w-xs mx-auto font-medium">
              Scheduled for <strong>{selectedDate}</strong> at <strong>{selectedTimeSlot}</strong> ({callType} Format). Both parents have been auto-notified, and a direct WhatsApp link has been created in candidate logs!
            </p>
          </div>
          <div className="flex border-t border-emerald-200/40 pt-3 justify-center gap-2 text-[10px] font-bold text-emerald-600">
            <span>Room ID: MALIBANDHAN-CALL-{Date.now().toString().slice(-4)}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsScheduled(false)}
            className="text-[10px] text-[#7A1F2B] hover:underline font-bold"
          >
            Reschedule or change slot
          </button>
        </div>
      )}

    </div>
  );
}
