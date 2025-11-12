import React from 'react';

const KeyTermsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w.org/2000/svg"
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
    <path d="m13.5 6.5-4 11" />
    <path d="m18.5 9-4 11" />
    <path d="m6 15-1-1" />
    <path d="m5 10 1 1" />
    <path d="m19 12-6-6" />
  </svg>
);

export default KeyTermsIcon;
