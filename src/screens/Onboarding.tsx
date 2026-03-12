import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Camera } from 'lucide-react';

const Onboarding: React.FC = () => {
  const { login, setUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: formData.name || 'Pet Owner',
      location: formData.location || 'New York, NY',
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    });
    login();
  };

  return (
    <div className="flex-1 flex flex-col bg-primary relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full pointer-events-none" />
      <div className="absolute top-40 -left-20 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-white relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
        >
          <div className="text-primary text-4xl font-black italic">P</div>
        </motion.div>
        <h1 className="text-4xl font-bold mb-2">PawCare</h1>
        <p className="text-white/80 text-center mb-12">Your Pet's Health, Our Priority.</p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full bg-white rounded-[40px] p-8 text-slate-900 shadow-2xl"
        >
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-sm font-bold border-b-2 transition-all ${!isSignUp ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-sm font-bold border-b-2 transition-all ${isSignUp ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20"
                  required
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20"
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />

            <button type="submit" className="w-full btn-primary mt-4">
              {isSignUp ? <UserPlus size={20} /> : <LogIn size={20} />}
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
