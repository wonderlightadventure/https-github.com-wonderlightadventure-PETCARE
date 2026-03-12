import React, { useState } from 'react';
import { Scissors, Footprints, GraduationCap, Calendar, Star, MapPin, ChevronRight, X, Clock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_SERVICES = [
  {
    id: '1',
    title: 'Professional Grooming',
    provider: 'Paws & Bubbles',
    rating: 4.9,
    price: 'From $35',
    distance: '1.2 km',
    icon: Scissors,
    color: 'bg-blue-100 text-blue-600',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    title: 'Dog Walking',
    provider: 'Happy Tails Walkers',
    rating: 4.8,
    price: '$20/hr',
    distance: '0.8 km',
    icon: Footprints,
    color: 'bg-emerald-100 text-emerald-600',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '3',
    title: 'Behavioral Training',
    provider: 'Elite Pet Academy',
    rating: 5.0,
    price: 'From $50',
    distance: '2.5 km',
    icon: GraduationCap,
    color: 'bg-amber-100 text-amber-600',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=400'
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);

  return (
    <div className="scroll-container">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Pet Services</h1>

      {/* Service Categories Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { icon: Scissors, label: 'Grooming', color: 'bg-blue-50 text-blue-600' },
          { icon: Footprints, label: 'Walking', color: 'bg-emerald-50 text-emerald-600' },
          { icon: GraduationCap, label: 'Training', color: 'bg-amber-50 text-amber-600' },
          { icon: Clock, label: 'Boarding', color: 'bg-indigo-50 text-indigo-600' },
        ].map((cat, i) => (
          <button key={i} className="card flex flex-col items-center gap-3 p-6 hover:border-primary transition-colors">
            <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center`}>
              <cat.icon size={24} />
            </div>
            <span className="font-bold text-slate-700 text-sm">{cat.label}</span>
          </button>
        ))}
      </div>

      <h3 className="font-bold text-slate-900 mb-4">Top Rated Near You</h3>
      <div className="space-y-4">
        {MOCK_SERVICES.map((service) => (
          <div 
            key={service.id} 
            onClick={() => setSelectedService(service)}
            className="card flex gap-4 p-3 group cursor-pointer"
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h4 className="font-bold text-slate-900">{service.title}</h4>
                <p className="text-[10px] text-slate-500">{service.provider}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold">{service.rating}</span>
                </div>
                <span className="text-primary font-bold text-xs">{service.price}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <MapPin size={10} /> {service.distance} away
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[70] flex items-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-white rounded-t-[40px] p-0 max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64">
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedService.title}</h2>
                    <p className="text-slate-500 flex items-center gap-1 text-sm mt-1">
                      <MapPin size={14} /> {selectedService.provider} • {selectedService.distance}
                    </p>
                  </div>
                  <div className="bg-primary-light text-primary px-4 py-2 rounded-2xl font-bold">
                    {selectedService.price}
                  </div>
                </div>

                <div className="flex gap-4 mb-8">
                  <div className="flex-1 bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                    <Star className="text-amber-500" size={20} />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Rating</p>
                      <p className="font-bold text-slate-900">{selectedService.rating}/5.0</p>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                    <ShieldCheck className="text-emerald-500" size={20} />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Verified</p>
                      <p className="font-bold text-slate-900">Pro Provider</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold mb-3">Service Description</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  We provide top-tier care for your beloved pets. Our experienced team ensures a safe, comfortable, and enjoyable experience for every animal.
                </p>

                <button 
                  onClick={() => {
                    alert('Booking request sent!');
                    setSelectedService(null);
                  }}
                  className="w-full btn-primary h-16 text-lg"
                >
                  <Calendar size={24} />
                  Book Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
