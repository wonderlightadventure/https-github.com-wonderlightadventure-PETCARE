import React, { useState } from 'react';
import { MOCK_ADOPTION_PETS } from '../data/mockData';
import { Heart, Filter, Search, MapPin, Info, ChevronRight, X, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Adoption: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [filter, setFilter] = useState('All');
  const [isApplying, setIsApplying] = useState(false);

  const categories = ['All', 'Dogs', 'Cats', 'Birds', 'Small Pets'];
  
  const filteredPets = filter === 'All' 
    ? MOCK_ADOPTION_PETS 
    : MOCK_ADOPTION_PETS.filter(p => p.species === filter.slice(0, -1));

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setSelectedPet(null);
      alert('Application submitted! The shelter will contact you soon.');
    }, 1500);
  };

  return (
    <div className="scroll-container">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 rounded-full">
          <ChevronRight className="rotate-180" size={20} />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Find a Friend</h1>
      </div>

      {/* Featured Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-secondary" />
          <h3 className="font-bold text-slate-900">Featured Pets</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
          {MOCK_ADOPTION_PETS.map((pet) => (
            <div 
              key={pet.id} 
              onClick={() => setSelectedPet(pet)}
              className="w-64 shrink-0 card p-0 overflow-hidden relative group"
            >
              <img src={pet.image} alt={pet.name} className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-3 right-3">
                <button className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-rose-500">
                  <Heart size={16} />
                </button>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-slate-900">{pet.name}</h4>
                <p className="text-[10px] text-slate-500">{pet.breed} • {pet.age}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-500 border border-slate-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pet Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPets.map((pet) => (
          <motion.div
            layoutId={pet.id}
            key={pet.id}
            onClick={() => setSelectedPet(pet)}
            className="card flex gap-4 p-3"
          >
            <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0">
              <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 text-lg">{pet.name}</h3>
                  <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">{pet.age}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{pet.breed}</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <MapPin size={10} /> {pet.location}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${pet.id}${i}`} alt="user" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
                    +5
                  </div>
                </div>
                <button className="text-primary text-xs font-bold">View Profile</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pet Detail Modal */}
      <AnimatePresence>
        {selectedPet && (
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
              className="w-full bg-white rounded-t-[40px] p-0 max-h-[95vh] overflow-y-auto"
            >
              <div className="relative h-80">
                <img src={selectedPet.image} alt={selectedPet.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button 
                  onClick={() => setSelectedPet(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="px-8 pb-12 -mt-12 relative z-10">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-4xl font-bold text-slate-900">{selectedPet.name}</h2>
                    <p className="text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={16} /> {selectedPet.location}
                    </p>
                  </div>
                  <button className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shadow-sm">
                    <Heart size={28} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Age</p>
                    <p className="font-bold text-slate-900">{selectedPet.age}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Sex</p>
                    <p className="font-bold text-slate-900">Female</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Weight</p>
                    <p className="font-bold text-slate-900">8.5 kg</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-3">About {selectedPet.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedPet.description}
                  </p>
                </div>

                <div className="card bg-primary-light border-none flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary">
                    <Info size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">Shelter Info</h4>
                    <p className="text-primary/70 text-xs">{selectedPet.shelter}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsApplying(true)}
                  className="w-full btn-primary h-16 text-lg"
                >
                  {isApplying ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <CheckCircle2 size={24} />
                      Adopt {selectedPet.name}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {isApplying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full bg-white rounded-[40px] p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-2">Adoption Request</h2>
              <p className="text-slate-500 text-sm mb-6">Tell the shelter why you're a good fit for {selectedPet?.name}.</p>
              
              <form onSubmit={handleApply} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Experience with Pets</label>
                  <select className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm">
                    <option>First-time owner</option>
                    <option>Experienced owner</option>
                    <option>Professional handler</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Home Environment</label>
                  <select className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm">
                    <option>Apartment</option>
                    <option>House with yard</option>
                    <option>Farm/Rural</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Message</label>
                  <textarea 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm h-24 resize-none"
                    placeholder="Tell us about your home..."
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setIsApplying(false)} className="flex-1 py-4 font-bold text-slate-400">Cancel</button>
                  <button type="submit" className="flex-[2] btn-primary">Submit Application</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Adoption;
