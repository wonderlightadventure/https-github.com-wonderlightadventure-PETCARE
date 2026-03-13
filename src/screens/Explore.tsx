import React, { useState } from 'react';
import { MOCK_CLINICS, MOCK_ADOPTION_PETS } from '../data/mockData';
import { Search, MapPin, Star, Filter, Heart, Info, X, Calendar, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Explore: React.FC = () => {
  const { pets, addAppointment } = useApp();
  const [activeTab, setActiveTab] = useState<'Vets' | 'Services' | 'Lost'>('Vets');
  const [selectedClinic, setSelectedClinic] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    petId: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClinic) return;
    
    await addAppointment({
      petId: bookingData.petId || (pets[0]?.id || ''),
      clinicName: selectedClinic.name,
      date: bookingData.date,
      time: bookingData.time,
      notes: bookingData.notes,
      status: 'Upcoming'
    });
    
    setIsBooking(false);
    setSelectedClinic(null);
  };

  return (
    <div className="scroll-container">
      {/* Tabs */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex mb-6">
        {['Vets', 'Services', 'Lost'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder={`Search ${activeTab.toLowerCase()}...`}
          className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary/20"
        />
        <button 
          onClick={() => alert('Filter options: Distance, Rating, Specialization, Open Now')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'Vets' && MOCK_CLINICS.map((clinic) => (
          <motion.div
            layoutId={clinic.id}
            key={clinic.id}
            onClick={() => setSelectedClinic(clinic)}
            className="card flex gap-4 cursor-pointer"
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
              <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h3 className="font-bold text-slate-900">{clinic.name}</h3>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  <MapPin size={10} /> {clinic.distance} • {clinic.specialization}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold">{clinic.rating}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClinic(clinic);
                  }}
                  className="text-primary text-xs font-bold"
                >
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {activeTab === 'Services' && (
          <div className="space-y-4">
            {[
              { title: 'Paws & Bubbles Grooming', provider: 'Grooming', rating: 4.9, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400' },
              { title: 'Happy Tails Walkers', provider: 'Walking', rating: 4.8, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400' },
            ].map((service, i) => (
              <div key={i} className="card flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-slate-900">{service.title}</h3>
                    <p className="text-[10px] text-slate-500">{service.provider}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{service.rating}</span>
                    </div>
                    <button onClick={() => alert('Service details coming soon!')} className="text-primary text-xs font-bold">Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Lost' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <MapPin size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium mb-4">No lost pets reported nearby</p>
            <button 
              onClick={() => {
                const name = prompt('Pet Name:');
                if (name) alert(`Lost pet report for ${name} has been broadcasted to nearby users.`);
              }}
              className="btn-primary"
            >
              Report a Lost Pet
            </button>
            
            <div className="mt-12 w-full">
              <h4 className="font-bold text-slate-900 mb-4">Recent Reports</h4>
              <div className="card bg-rose-50 border-rose-100 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200" alt="Lost Pet" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h5 className="font-bold text-rose-900">Cooper (Lost)</h5>
                    <span className="text-[8px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full">URGENT</span>
                  </div>
                  <p className="text-[10px] text-rose-600">Last seen: Central Park, 2h ago</p>
                </div>
                <button className="p-2 bg-white rounded-full text-rose-500 shadow-sm">
                  <Phone size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clinic Detail & Booking Modal */}
      <AnimatePresence>
        {selectedClinic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] flex items-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-white rounded-t-[40px] p-0 max-h-[90vh] overflow-y-auto"
            >
              {!isBooking ? (
                <>
                  <div className="relative h-56">
                    <img src={selectedClinic.image} alt={selectedClinic.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <button onClick={() => setSelectedClinic(null)} className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                      <X size={24} />
                    </button>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">{selectedClinic.name}</h2>
                        <p className="text-slate-500 flex items-center gap-1 text-sm">
                          <MapPin size={14} /> {selectedClinic.distance} away
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-3 py-1.5 rounded-xl">
                        <Star size={16} fill="currentColor" />
                        <span className="font-bold">{selectedClinic.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Hours</p>
                        <p className="font-bold text-sm text-slate-900">{selectedClinic.hours}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Contact</p>
                        <p className="font-bold text-sm text-slate-900">{selectedClinic.contact}</p>
                      </div>
                    </div>

                    <h3 className="font-bold mb-3">Services</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedClinic.specialization.split(', ').map((s: string) => (
                        <span key={s} className="bg-primary-light text-primary px-3 py-1.5 rounded-xl text-xs font-bold">{s}</span>
                      ))}
                    </div>

                    <button onClick={() => setIsBooking(true)} className="w-full btn-primary">
                      Book Appointment
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Book Appointment</h2>
                    <button onClick={() => setIsBooking(false)} className="p-2 bg-slate-100 rounded-full">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleBook} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Select Pet</label>
                      <select 
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"
                        value={bookingData.petId}
                        onChange={e => setBookingData({ ...bookingData, petId: e.target.value })}
                      >
                        {pets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        {pets.length === 0 && <option value="">No pets added</option>}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Date</label>
                        <input 
                          type="date" 
                          required
                          className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"
                          value={bookingData.date}
                          onChange={e => setBookingData({ ...bookingData, date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Time Slot</label>
                        <input 
                          type="time" 
                          required
                          className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"
                          value={bookingData.time}
                          onChange={e => setBookingData({ ...bookingData, time: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Notes for Vet</label>
                      <textarea 
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm h-24 resize-none"
                        placeholder="Describe any symptoms or concerns..."
                        value={bookingData.notes}
                        onChange={e => setBookingData({ ...bookingData, notes: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="w-full btn-primary">
                      Confirm Booking
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Explore;
