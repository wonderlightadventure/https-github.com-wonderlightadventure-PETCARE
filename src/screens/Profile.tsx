import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Settings, CreditCard, Bell, Shield, LogOut, ChevronRight, HelpCircle, X, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const Profile: React.FC = () => {
  const { user, logout, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    location: 'New York, NY' // We can add location to user profile later if needed
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setIsSaving(true);
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name: editForm.name
      });
      showToast('Profile updated successfully!', 'success');
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      showToast(error.message || 'Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const menuItems = [
    { icon: User, label: 'Edit Profile', color: 'text-blue-500', action: () => setIsEditing(true) },
    { icon: CreditCard, label: 'Payment Methods', color: 'text-emerald-500' },
    { icon: Bell, label: 'Notifications', color: 'text-amber-500' },
    { icon: Shield, label: 'Privacy & Security', color: 'text-indigo-500' },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-slate-500' },
  ];

  return (
    <div className="scroll-container">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-[32px] bg-primary-light p-1 mb-4">
          <img 
            src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'} 
            alt="Profile" 
            className="w-full h-full object-cover rounded-[28px]" 
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{user?.name || 'Pet Owner'}</h2>
        <p className="text-slate-500 text-sm">{user?.email || 'No email provided'}</p>
      </div>

      <div className="space-y-3">
        {menuItems.map((item, i) => (
          <button 
            key={i} 
            onClick={item.action || (() => alert(`${item.label} feature coming soon!`))}
            className="card flex items-center justify-between p-4 w-full"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${item.color}`}>
                <item.icon size={20} />
              </div>
              <span className="font-bold text-slate-700">{item.label}</span>
            </div>
            <ChevronRight className="text-slate-300" size={20} />
          </button>
        ))}

        <button 
          onClick={logout}
          className="card flex items-center gap-4 p-4 w-full mt-6 border-rose-100 bg-rose-50 text-rose-600"
        >
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <LogOut size={20} />
          </div>
          <span className="font-bold">Sign Out</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
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
              className="w-full bg-white rounded-t-[40px] p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <button onClick={() => setIsEditing(false)} className="p-2 bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-[32px] bg-slate-100 overflow-hidden">
                      <img src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <button type="button" className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-white">
                      <Camera size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>

                <button type="submit" disabled={isSaving} className="w-full btn-primary mt-6">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 text-center">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">PawCare v1.0.0</p>
      </div>
    </div>
  );
};

export default Profile;
