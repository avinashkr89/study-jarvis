import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12">
      <div className="container mx-auto py-8 px-4 text-slate-600 dark:text-gray-400">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Study<span className="text-blue-600 dark:text-blue-400">JARVIS</span></h3>
            <p className="text-sm mt-1">Your Smartest Study Partner, by Avinash.</p>
             <p className="text-sm mt-4 font-semibold text-slate-500 dark:text-slate-400">Trusted by 50,000+ students.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm hover:text-blue-500">About</a>
            <a href="#" className="text-sm hover:text-blue-500">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-blue-500">Help Center</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6 text-center text-sm">
           <p>&copy; {new Date().getFullYear()} StudyJARVIS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;