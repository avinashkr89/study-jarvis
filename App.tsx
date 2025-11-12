
import React, { useState, useEffect } from 'react';
import { Page, User, PaymentRequest } from './types.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';

import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import LandingPage from './pages/LandingPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import GeneratorPage from './pages/GeneratorPage.tsx';
import PricingPage from './pages/PricingPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import AuthPage from './pages/AuthPage.tsx';
import AdminPage from './pages/AdminPage.tsx';

function App() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('user', null);
  const [allUsers, setAllUsers] = useLocalStorage<User[]>('all_users', []);
  const [allPayments, setAllPayments] = useLocalStorage<PaymentRequest[]>('all_payments', []);
  
  const [page, setPage] = useState<Page>(currentUser ? 'dashboard' : 'landing');
  
  useEffect(() => {
    const handleNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<Page>;
      navigate(customEvent.detail);
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);
  
  const credits = allUsers.find(u => u.email === currentUser?.email)?.credits ?? 0;

  useEffect(() => {
    if (!currentUser) {
      setPage('landing');
    }
  }, [currentUser]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const navigate = (newPage: Page) => {
    if (newPage === 'auth' || newPage === 'landing' || newPage === 'contact') {
        setPage(newPage);
    } else if (currentUser) {
        if (newPage === 'admin' && currentUser.role !== 'admin') {
            setPage('dashboard'); 
        } else {
            setPage(newPage);
        }
    } else {
        setPage('auth');
    }
  };

  const handleLogin = (loggedInUser: User) => {
    setCurrentUser(loggedInUser);
    
    const userExists = allUsers.some(u => u.email === loggedInUser.email);
    if (!userExists) {
        setAllUsers(prev => [...prev, { ...loggedInUser, credits: 25, password: 'mock_password' }]);
    }
    
    setPage('dashboard');
  };
  
  const handleSetCredits = (updater: (current: number) => number) => {
      if (!currentUser) return;
      setAllUsers(prevUsers => prevUsers.map(u => 
        u.email === currentUser.email 
        ? { ...u, credits: updater(u.credits) }
        : u
      ));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('landing');
  };

  const renderPage = () => {
    const commonProps = { navigate };
    switch (page) {
      case 'landing': return <LandingPage {...commonProps} />;
      case 'dashboard': return <DashboardPage user={currentUser} credits={credits} {...commonProps} />;
      case 'generator': return <GeneratorPage credits={credits} setCredits={handleSetCredits} />;
      case 'pricing': return <PricingPage />;
      case 'contact': return <ContactPage />;
      case 'auth': return <AuthPage allUsers={allUsers} setAllUsers={setAllUsers} onLogin={handleLogin} />;
      case 'admin': return <AdminPage allUsers={allUsers} setAllUsers={setAllUsers} allPayments={allPayments} setAllPayments={setAllPayments} />;
      default: return <LandingPage {...commonProps} />;
    }
  };

  return (
    <div className={theme}>
      <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white min-h-screen flex flex-col font-sans light-gradient-bg dark-gradient-bg transition-colors duration-300">
        <Navbar user={currentUser} navigate={navigate} onLogout={handleLogout} credits={credits} theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;