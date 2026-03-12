import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PawPrint, Search, Users, User, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BottomTab: React.FC = () => {
  const tabs = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: PawPrint, label: 'Pets', path: '/pets' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              isActive ? "text-primary scale-110" : "text-slate-400"
            )
          }
        >
          {({ isActive }) => (
            <>
              <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export const Header: React.FC<{ title: string; showBack?: boolean; onBack?: () => void }> = ({ title, showBack, onBack }) => {
  return (
    <header className="px-4 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full">
            <PlusCircle className="rotate-45" size={24} />
          </button>
        )}
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
      </div>
      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
        PC
      </div>
    </header>
  );
};

export default BottomTab;
