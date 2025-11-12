
import React, { useState } from 'react';
import { Page } from '../types.ts';

interface LandingPageProps {
  navigate: (page: Page) => void;
}

const testimonials = [
    { name: 'Rohan S.', role: 'JEE Aspirant', text: 'StudyJARVIS saved me hours of note-taking. The AI-generated summaries and PYQs are spot on for my exam prep!', stars: 5 },
    { name: 'Priya K.', role: 'NEET Aspirant', text: 'The flashcards and quizzes are a game-changer for revision. I can test myself on any topic, anytime. Highly recommended!', stars: 5 },
    { name: 'Amit V.', role: 'UPSC Aspirant', text: 'An incredible tool for breaking down complex topics. The Hinglish explanations make tough concepts so much easier to understand.', stars: 5 },
];

const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  const [topic, setTopic] = useState('');
  const exams = ["JEE", "NEET", "UPSC", "SSC", "Banking", "CUET", "Class 12"];

  return (
    <div className="text-center fade-in py-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            Your Smartest <span className="text-blue-600 dark:text-blue-400">Study Partner</span>.
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-10">
            Get summaries, quizzes, flashcards, and PYQs instantly — AI powered and tailored for your exam.
        </p>
        
        <div className="max-w-2xl mx-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row gap-2">
                 <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter Topic (e.g., Electrostatics)" 
                    className="flex-grow bg-slate-100 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700 rounded-lg py-3 px-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                 <select className="bg-slate-100 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700 rounded-lg py-3 px-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {exams.map(e => <option key={e}>{e}</option>)}
                 </select>
                <button 
                    onClick={() => navigate('generator')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 glow-effect"
                >
                    Start Learning Now
                </button>
            </div>
        </div>
        
        <div className="mt-24 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-12">Trusted by Students</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-300 text-xl mr-4">{t.name.charAt(0)}</div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-white">{t.name}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                            </div>
                        </div>
                        <div className="flex mb-3">
                            {[...Array(t.stars)].map((_, s_idx) => <span key={s_idx} className="text-yellow-400">★</span>)}
                        </div>
                        <p className="text-slate-600 dark:text-gray-400 text-[15px]">"{t.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default LandingPage;