import React from 'react';
import { Bell, Calendar, Heart, ShieldAlert, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'vax',
    title: 'Vaccination Reminder',
    message: 'Rabies shot for Bella is due in 3 days.',
    time: '2h ago',
    icon: Bell,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    id: '2',
    type: 'app',
    title: 'Appointment Confirmed',
    message: 'Your appointment at Happy Paws Vet is confirmed for tomorrow at 10:00 AM.',
    time: '5h ago',
    icon: Calendar,
    color: 'bg-teal-100 text-teal-600'
  },
  {
    id: '3',
    type: 'like',
    title: 'New Like',
    message: 'Someone liked your post in the community!',
    time: '1d ago',
    icon: Heart,
    color: 'bg-rose-100 text-rose-600'
  }
];

const Notifications: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="scroll-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <button className="text-primary text-xs font-bold">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map((notif) => (
          <div key={notif.id} className="card flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className={`w-10 h-10 rounded-xl ${notif.color} flex items-center justify-center shrink-0`}>
              <notif.icon size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                <span className="text-[10px] text-slate-400">{notif.time}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>

      {MOCK_NOTIFICATIONS.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Bell size={48} className="mb-4 opacity-20" />
          <p className="font-medium">No new notifications</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
