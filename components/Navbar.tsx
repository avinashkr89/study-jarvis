import React from 'react';
import { Page, User } from '../types';
import UserIcon from './icons/UserIcon';
import CoinIcon from './icons/CoinIcon';
import LogoutIcon from './icons/LogoutIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface NavbarProps {
  user: User | null;
  credits: number;
  navigate: (page: Page) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, credits, navigate, onLogout, theme, toggleTheme }) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => navigate(user ? 'dashboard' : 'landing')} className="text-2xl font-bold text-slate-800 dark:text-white">
              Study<span className="text-blue-600 dark:text-blue-400">JARVIS</span>
            </button>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                 <button onClick={() => navigate('generator')} className="text-slate-500 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Generator</button>
                 <button onClick={() => navigate('pricing')} className="text-slate-500 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pricing</button>
                 <button onClick={() => navigate('contact')} className="text-slate-500 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                {theme === 'light' ? <MoonIcon className="w-5 h-5 text-slate-600" /> : <SunIcon className="w-5 h-5 text-slate-400" />}
             </button>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                  <CoinIcon className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                  <span className="text-slate-800 dark:text-white font-semibold text-sm">{credits}</span>
                </div>
                {user.role === 'admin' && (
                    <button onClick={() => navigate('admin')} className="text-slate-500 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white text-sm font-medium">Admin</button>
                )}
                <div className="flex items-center gap-2">
                    <UserIcon className="w-6 h-6 text-slate-500 dark:text-gray-400" />
                    <span className="text-slate-800 dark:text-white font-medium hidden sm:block">{user.name}</span>
                </div>
                <button onClick={onLogout} title="Logout" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                  <LogoutIcon className="w-5 h-5 text-slate-500 dark:text-gray-400" />
                </button>
              </div>
            ) : (
              <button onClick={() => navigate('auth')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-all glow-effect">
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;