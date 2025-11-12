
import React from 'react';

const MnemonicIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12 22a10 10 0 1 0-10-10" />
    <path d="M12 12a5 5 0 1 0-5-5" />
    <path d="M12 13a1 1 0 1 0-1-1" />
  </svg>
);

export default MnemonicIcon;
