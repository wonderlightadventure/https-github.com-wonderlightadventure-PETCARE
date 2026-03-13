import React, { useState } from 'react';
import { useApp, Pet } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, Activity, ChevronRight, Camera, X, Check } from 'lucide-react';

const Pets: React.FC = () => {
  const { pets, addPet, addVaccination, addMedicalRecord } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [newPet, setNewPet] = useState({
    name: '',
    species: 'Dog' as const,
    breed: '',
    age: '',
    weight: '',
  });

  const handleAddPet = async (e: React.FormEvent) => {
    e.preventDefault();
    const petData = {
      ...newPet,
      photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400',
      vaccinations: [],
      medicalRecords: [],
    };
    await addPet(petData);
    setIsAdding(false);
    setNewPet({ name: '', species: 'Dog', breed: '', age: '', weight: '' });
  };

  return (
    <div className="scroll-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Pets</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 cursor-pointer"
        >
          <Plus size={24} />
        </button>
      </div>

      {pets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Plus size={40} className="opacity-20" />
          </div>
          <p className="font-medium">No pets added yet</p>
          <button onClick={() => setIsAdding(true)} className="text-primary font-bold mt-2 cursor-pointer">Add your first pet</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 p-4 rounded-3xl" style={{ backgroundColor: '#c0ecdc' }}>
          {pets.map((pet) => (
            <motion.div
              layoutId={pet.id}
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              className="card flex items-center gap-4 p-3 cursor-pointer"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-lg">{pet.name}</h3>
                <p className="text-slate-500 text-sm">{pet.breed} • {pet.age}</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-primary-light text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">Healthy</span>
                  <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Vax Due</span>
                </div>
              </div>
              <ChevronRight className="text-slate-300" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Pet Modal */}
      <AnimatePresence>
        {isAdding && (
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
              className="w-full bg-white rounded-t-[40px] p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Pet</h2>
                <button onClick={() => setIsAdding(false)} className="p-2 bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddPet} className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-3xl bg-slate-100 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                    <Camera size={32} />
                    <span className="text-[10px] font-bold mt-1">Add Photo</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Pet Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"
                    placeholder="e.g. Buddy"
                    value={newPet.name}
                    onChange={e => setNewPet({ ...newPet, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Species</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"
                      placeholder="e.g. Dog, Cat"
                      value={newPet.species}
                      onChange={e => setNewPet({ ...newPet, species: e.target.value as any })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Age</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"
                      placeholder="e.g. 2 years"
                      value={newPet.age}
                      onChange={e => setNewPet({ ...newPet, age: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Breed</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"
                      placeholder="e.g. Golden Retriever"
                      value={newPet.breed}
                      onChange={e => setNewPet({ ...newPet, breed: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Weight (Optional)</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"
                      placeholder="e.g. 12kg"
                      value={newPet.weight}
                      onChange={e => setNewPet({ ...newPet, weight: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary mt-6">
                  Save Pet Profile
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pet Detail Modal (Health Card) */}
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
              <div className="relative h-64">
                <img src={selectedPet.photo} alt={selectedPet.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button 
                  onClick={() => setSelectedPet(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="px-8 pb-12 -mt-10 relative z-10">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-50 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900">{selectedPet.name}</h2>
                      <p className="text-slate-500">{selectedPet.breed} • {selectedPet.age}</p>
                    </div>
                    <div className="bg-primary-light text-primary px-4 py-2 rounded-2xl font-bold text-sm">
                      {selectedPet.weight || '12kg'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <Activity className="text-primary mb-2" size={20} />
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Health Status</p>
                      <p className="font-bold text-slate-900">Excellent</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <FileText className="text-amber-500 mb-2" size={20} />
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Next Vax</p>
                      <p className="font-bold text-slate-900">Oct 24</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <section>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">Vaccination History</h3>
                      <button 
                        onClick={() => {
                          const type = prompt('Vaccination Type (e.g. Rabies, Parvovirus):');
                          if (type) {
                            addVaccination(selectedPet.id, {
                              type,
                              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                              status: 'Done'
                            });
                            // Update local selected pet to show changes immediately
                            setSelectedPet({
                              ...selectedPet,
                              vaccinations: [...(selectedPet.vaccinations || []), {
                                type,
                                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                status: 'Done'
                              }]
                            });
                          }
                        }}
                        className="text-primary text-sm font-bold"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-3">
                      {selectedPet.vaccinations && selectedPet.vaccinations.length > 0 ? (
                        selectedPet.vaccinations.map((vax, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                              <Check size={20} />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-sm">{vax.type}</p>
                              <p className="text-xs text-slate-500">Administered on {vax.date}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl opacity-50">
                          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                            <Check size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm">No vaccinations recorded</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  <section>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">Medical Records</h3>
                      <button 
                        onClick={() => {
                          const title = prompt('Record Title (e.g. Annual Checkup):');
                          if (title) {
                            const notes = prompt('Notes (optional):') || '';
                            addMedicalRecord(selectedPet.id, {
                              title,
                              notes,
                              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            });
                            // Update local selected pet
                            setSelectedPet({
                              ...selectedPet,
                              medicalRecords: [...(selectedPet.medicalRecords || []), {
                                title,
                                notes,
                                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              }]
                            });
                          }
                        }}
                        className="text-primary text-sm font-bold"
                      >
                        + Upload
                      </button>
                    </div>
                    <div className="space-y-3">
                      {selectedPet.medicalRecords && selectedPet.medicalRecords.length > 0 ? (
                        selectedPet.medicalRecords.map((record, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                              <FileText size={20} />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-sm">{record.title}</p>
                              <p className="text-xs text-slate-500">{record.date} • {record.notes || 'No notes'}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="card border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center py-8 text-slate-400">
                          <FileText size={32} className="mb-2 opacity-20" />
                          <p className="text-sm font-medium">No records uploaded</p>
                        </div>
                      )}
                    </div>
                  </section>

                  <button 
                    onClick={() => alert('Generating PDF health card...')}
                    className="w-full btn-secondary"
                  >
                    <FileText size={20} />
                    Share Digital Health Card (PDF)
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pets;
