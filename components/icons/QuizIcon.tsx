
import React from 'react';

const QuizIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M19.07 4.93a10 10 0 0 0-14.14 0" />
    <path d="M12 20v-3" />
    <path d="M4.93 19.07a10 10 0 0 0 14.14 0" />
    <path d="M20 12h-3" />
    <path d="M7 12H4" />
  </svg>
);

export default QuizIcon;
