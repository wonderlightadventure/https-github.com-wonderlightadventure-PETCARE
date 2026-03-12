import React, { createContext, useContext, useState, useEffect } from 'react';

export type Pet = {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Bird' | 'Other';
  breed: string;
  age: string;
  weight: string;
  photo: string;
  vaccinations: { date: string; type: string; status: 'Done' | 'Pending' }[];
  medicalRecords: { date: string; title: string; notes: string }[];
};

export type Appointment = {
  id: string;
  petId: string;
  clinicName: string;
  date: string;
  time: string;
  notes: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
};

export type UserProfile = {
  name: string;
  location: string;
  photo: string;
};

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  pets: Pet[];
  addPet: (pet: Pet) => void;
  appointments: Appointment[];
  addAppointment: (app: Appointment) => void;
  cancelAppointment: (id: string) => void;
  addVaccination: (petId: string, vaccination: Pet['vaccinations'][0]) => void;
  addMedicalRecord: (petId: string, record: Pet['medicalRecords'][0]) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('pawcare_user');
    const savedPets = localStorage.getItem('pawcare_pets');
    const savedApps = localStorage.getItem('pawcare_apps');
    const savedLogin = localStorage.getItem('pawcare_login');

    if (savedUser) setUserState(JSON.parse(savedUser));
    if (savedPets) setPets(JSON.parse(savedPets));
    if (savedApps) setAppointments(JSON.parse(savedApps));
    if (savedLogin === 'true') setIsLoggedIn(true);
  }, []);

  const setUser = (u: UserProfile) => {
    setUserState(u);
    localStorage.setItem('pawcare_user', JSON.stringify(u));
  };

  const addPet = (p: Pet) => {
    const newPets = [...pets, p];
    setPets(newPets);
    localStorage.setItem('pawcare_pets', JSON.stringify(newPets));
  };

  const addAppointment = (a: Appointment) => {
    const newApps = [...appointments, a];
    setAppointments(newApps);
    localStorage.setItem('pawcare_apps', JSON.stringify(newApps));
  };

  const cancelAppointment = (id: string) => {
    const newApps = appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' as const } : a);
    setAppointments(newApps);
    localStorage.setItem('pawcare_apps', JSON.stringify(newApps));
  };

  const addVaccination = (petId: string, vax: Pet['vaccinations'][0]) => {
    const newPets = pets.map(p => p.id === petId ? { ...p, vaccinations: [...p.vaccinations, vax] } : p);
    setPets(newPets);
    localStorage.setItem('pawcare_pets', JSON.stringify(newPets));
  };

  const addMedicalRecord = (petId: string, record: Pet['medicalRecords'][0]) => {
    const newPets = pets.map(p => p.id === petId ? { ...p, medicalRecords: [...p.medicalRecords, record] } : p);
    setPets(newPets);
    localStorage.setItem('pawcare_pets', JSON.stringify(newPets));
  };

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('pawcare_login', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('pawcare_login');
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, pets, addPet, appointments, addAppointment, cancelAppointment, addVaccination, addMedicalRecord, isLoggedIn, login, logout, toast, showToast 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
