
import React from 'react';

const SummaryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v8" />
    <path d="M6 22V12" />
    <path d="M4 12H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3" />
    <path d="M18 16h-5" />
    <path d="M18 20h-5" />
    <path d="M18 12h-5" />
  </svg>
);

export default SummaryIcon;
