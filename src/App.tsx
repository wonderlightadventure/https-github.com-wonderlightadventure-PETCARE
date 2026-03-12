import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import BottomTab from './components/Navigation';

// Screens
import Home from './screens/Home';
import Pets from './screens/Pets';
import Explore from './screens/Explore';
import Community from './screens/Community';
import Profile from './screens/Profile';
import Adoption from './screens/Adoption';
import Marketplace from './screens/Marketplace';
import Services from './screens/Services';
import Notifications from './screens/Notifications';
import SOS from './screens/SOS';
import Onboarding from './screens/Onboarding';

const AppContent: React.FC = () => {
  const { isLoggedIn } = useApp();

  if (!isLoggedIn) {
    return <Onboarding />;
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/services" element={<Services />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomTab />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
