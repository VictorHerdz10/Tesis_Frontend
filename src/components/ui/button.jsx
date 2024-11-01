import React from 'react';

const Button = ({ children, onClick, variant }) => {
  const className = variant === 'outline' ? 'bg-white border border-blue-500 text-blue-500 hover:bg-blue-100' : 'bg-blue-500 text-white hover:bg-blue-600';
  
  return (
    <button onClick={onClick} className={`${className} px-4 py-2 rounded-md transition-colors duration-300 ease-in-out`}>
      {children}
    </button>
  );
};

export default Button;