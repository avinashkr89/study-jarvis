import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inline-flex h-full w-full rounded-full bg-blue-400/70 opacity-75 animate-ping"></div>
        <div className="relative inline-flex rounded-full h-16 w-16 bg-blue-500/80"></div>
      </div>
      <p className="mt-6 text-slate-300 dark:text-slate-600 text-lg font-medium tracking-wide">
        {message}
      </p>
      <p className="mt-2 text-slate-400 dark:text-slate-500 text-sm">This may take a few moments...</p>
    </div>
  );
};

export default Loader;