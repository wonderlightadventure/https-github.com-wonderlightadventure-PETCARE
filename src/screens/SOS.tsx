import React from 'react';
import { MOCK_CLINICS, EMERGENCY_TIPS } from '../data/mockData';
import { ShieldAlert, Phone, MapPin, ChevronRight, Info, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SOS: React.FC = () => {
  const navigate = useNavigate();
  const emergencyClinics = MOCK_CLINICS.filter(c => c.specialization.includes('Emergency') || c.hours === '24/7');

  const handleShareLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        
        if (navigator.share) {
          navigator.share({
            title: 'My Emergency Location',
            text: 'I need help! Here is my current location.',
            url: mapsUrl,
          }).catch(console.error);
        } else {
          alert(`Location captured! Sharing link: ${mapsUrl}`);
        }
      }, (error) => {
        alert('Unable to get location. Please enable location services.');
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-rose-500 overflow-hidden">
      <header className="px-6 py-8 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <ShieldAlert size={32} />
          <h1 className="text-2xl font-bold">Emergency SOS</h1>
        </div>
        <button onClick={() => navigate(-1)} className="p-2 bg-white/20 rounded-full">
          <X size={24} />
        </button>
      </header>

      <div className="flex-1 bg-white rounded-t-[40px] p-8 overflow-y-auto">
        <section className="mb-8">
          <h3 className="text-rose-500 font-bold uppercase text-xs tracking-widest mb-4">Nearest Emergency Vets</h3>
          <div className="space-y-4">
            {emergencyClinics.map((clinic) => (
              <div key={clinic.id} className="card border-rose-100 bg-rose-50/30 flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden">
                    <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{clinic.name}</h4>
                    <p className="text-[10px] text-rose-600 font-bold flex items-center gap-1">
                      <MapPin size={10} /> {clinic.distance} away
                    </p>
                  </div>
                </div>
                <a href={`tel:${clinic.contact}`} className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20">
                  <Phone size={20} />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-4">Live Location</h3>
          <button 
            onClick={handleShareLocation}
            className="w-full btn-primary bg-slate-900 shadow-slate-900/20"
          >
            <MapPin size={20} />
            Share Live Location with Contact
          </button>
        </section>

        <section>
          <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-4">First Aid Tips</h3>
          <div className="space-y-4">
            {Object.entries(EMERGENCY_TIPS).map(([species, tips]) => (
              <div key={species} className="space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {species}
                </h4>
                {tips.map((tip, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h5 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                      <Info size={14} className="text-primary" />
                      {tip.title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{tip.tip}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SOS;
