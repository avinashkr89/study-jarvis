
import React from 'react';
import { User, Page } from '../types.ts';
import CoinIcon from '../components/icons/CoinIcon.tsx';

interface DashboardPageProps {
  user: User | null;
  credits: number;
  navigate: (page: Page) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, credits, navigate }) => {
    
    if (!user) {
        return null; 
    }
    
    return (
        <div className="w-full max-w-4xl mx-auto p-4 fade-in">
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-2">Welcome, {user.name.split(' ')[0]}!</h1>
            <p className="text-slate-500 dark:text-gray-400 mb-8">This is your personal dashboard. Ready to start learning?</p>
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* Credits Card */}
                <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl flex flex-col justify-between shadow-lg border border-slate-200 dark:border-slate-800">
                    <div>
                        <p className="text-slate-500 dark:text-gray-400 text-sm font-medium">YOUR CREDITS</p>
                        <div className="flex items-center gap-4 my-2">
                            <CoinIcon className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
                            <p className="text-6xl font-extrabold text-slate-800 dark:text-white">{credits}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('pricing')}
                        className="w-full mt-4 bg-blue-500/80 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Buy More Credits
                    </button>
                </div>
                
                {/* Generator Card */}
                <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl flex flex-col justify-between shadow-lg border border-slate-200 dark:border-slate-800">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Create a New Study Pack</h2>
                        <p className="text-slate-500 dark:text-gray-400 mb-6">Use the AI Topic Tutor to generate a comprehensive study pack from any topic.</p>
                    </div>
                     <button 
                        onClick={() => navigate('generator')}
                        className="w-full mt-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Go to Generator
                    </button>
                </div>
            </div>

            <div className="mt-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Recent Activity</h2>
                <p className="text-slate-500 dark:text-gray-400 text-center py-8">
                    Your recently generated study packs will appear here.
                </p>
            </div>
        </div>
    );
};

export default DashboardPage;