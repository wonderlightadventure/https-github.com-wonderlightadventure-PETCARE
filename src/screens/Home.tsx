import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Calendar, Bell, ShieldAlert, Stethoscope, Heart, Users, MapPin, Phone, ShoppingBag, Scissors, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { user, appointments, pets } = useApp();

  const quickActions = [
    { icon: Stethoscope, label: 'Book Vet', color: 'bg-teal-100 text-teal-600', path: '/explore' },
    { icon: Heart, label: 'Adopt', color: 'bg-amber-100 text-amber-600', path: '/adoption' },
    { icon: Users, label: 'Community', color: 'bg-indigo-100 text-indigo-600', path: '/community' },
    { icon: ShoppingBag, label: 'Shop', color: 'bg-blue-100 text-blue-600', path: '/marketplace' },
    { icon: Scissors, label: 'Services', color: 'bg-emerald-100 text-emerald-600', path: '/services' },
    { icon: MapPin, label: 'Lost & Found', color: 'bg-rose-100 text-rose-600', path: '/explore' },
  ];

  const upcomingApp = appointments.find(a => a.status === 'Upcoming');

  return (
    <div className="scroll-container">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-slate-400 text-sm font-medium">Welcome back,</h2>
          <h1 className="text-2xl font-bold text-slate-900">{user?.name || 'Pet Owner'} 👋</h1>
        </div>
        <div className="relative">
          <Link to="/notifications" className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-600 relative">
            <Bell size={24} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </Link>
        </div>
      </div>

      {/* SOS Button */}
      <Link to="/sos" className="card bg-rose-50 border-rose-100 flex items-center gap-4 mb-8 p-6">
        <div className="sos-btn shrink-0">
          <ShieldAlert size={32} />
        </div>
        <div>
          <h3 className="font-bold text-rose-900 text-lg">Emergency SOS</h3>
          <p className="text-rose-600 text-sm">Find nearest emergency vet clinics instantly</p>
        </div>
      </Link>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {quickActions.map((action, i) => (
          <Link key={i} to={action.path} className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shadow-sm transition-transform active:scale-90`}>
              <action.icon size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-600 text-center">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Upcoming Appointment */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Upcoming Appointment</h3>
          <Link to="/pets" className="text-primary text-xs font-bold">View All</Link>
        </div>
        <div className="bg-[#48d877] rounded-3xl p-4">
          {upcomingApp ? (
            <div className="card bg-[#3ec27e] text-emerald-950 border-none p-6 shadow-lg shadow-[#3ec27e]/20">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950/10 flex items-center justify-center backdrop-blur-sm">
                    <Calendar size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight">{upcomingApp.clinicName}</h4>
                    <p className="text-emerald-950/80 text-sm mt-1">{upcomingApp.date} • {upcomingApp.time}</p>
                  </div>
                </div>
                <span className="bg-emerald-950/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-950/10">Confirmed</span>
              </div>
              <div className="h-px bg-emerald-950/10 w-full mb-6" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-950/10 overflow-hidden border-2 border-emerald-950/20">
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100" alt="Pet" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <p className="text-sm font-medium">For {pets.find(p => p.id === upcomingApp.petId)?.name || 'your pet'}</p>
                </div>
                <Link to="/pets" className="text-emerald-950/80 hover:text-emerald-950 transition-colors">
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="card border-dashed border-emerald-950/20 bg-[#3ec27e] flex flex-col items-center justify-center py-10 text-emerald-950">
              <div className="w-16 h-16 rounded-full bg-emerald-950/10 flex items-center justify-center mb-4">
                <Calendar size={32} className="opacity-80" />
              </div>
              <p className="text-sm font-bold text-emerald-950">No upcoming appointments</p>
              <p className="text-xs text-emerald-950/80 mt-1 mb-6">Keep your pet healthy with regular checkups</p>
              <Link to="/explore" className="bg-emerald-950 text-white font-bold rounded-full py-2 px-6 text-xs h-auto w-auto shadow-md">Book Now</Link>
            </div>
          )}
        </div>
      </section>

      {/* Health Alerts */}
      <section className="mb-8">
        <h3 className="font-bold text-slate-900 mb-4">Health Alerts</h3>
        <div className="space-y-4">
          <div className="card flex items-center gap-4 border-l-4 border-l-amber-500">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Bell size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">Vaccination Due</h4>
              <p className="text-xs text-slate-500">Rabies shot for Bella is due in 3 days.</p>
            </div>
            <button 
              onClick={() => alert('Vaccination details: Rabies shot scheduled for March 15th at Happy Paws Vet.')}
              className="text-primary text-xs font-bold"
            >
              Details
            </button>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Recommended for You</h3>
          <Link to="/marketplace" className="text-primary text-xs font-bold">See All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
          {[
            { name: 'Premium Puppy Food', price: '$45.99', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=200' },
            { name: 'Orthopedic Dog Bed', price: '$89.00', image: 'https://images.unsplash.com/photo-1591768793355-74d7c836038c?auto=format&fit=crop&q=80&w=200' },
          ].map((item, i) => (
            <Link key={i} to="/marketplace" className="w-40 shrink-0 card p-0 overflow-hidden border-none shadow-sm">
              <img src={item.image} alt={item.name} className="w-full h-24 object-cover" referrerPolicy="no-referrer" />
              <div className="p-2">
                <h4 className="text-[10px] font-bold text-slate-900 truncate">{item.name}</h4>
                <p className="text-[10px] text-primary font-bold">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Nearby Services */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Nearby Services</h3>
          <Link to="/services" className="text-primary text-xs font-bold">See All</Link>
        </div>
        <div className="space-y-3">
          <Link to="/services" className="card flex items-center gap-4 p-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Scissors size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">Paws & Bubbles Grooming</h4>
              <p className="text-[10px] text-slate-500">1.2 km away • 4.9 rating</p>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
