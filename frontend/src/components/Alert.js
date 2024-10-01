import React from 'react';

const Alert = ({ children, variant = 'default' }) => {
  const baseClasses = 'p-4 rounded-md mb-4';
  const variantClasses = {
    default: 'bg-blue-100 text-blue-700',
    destructive: 'bg-red-100 text-red-700',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => (
  <h5 className="font-bold mb-1">{children}</h5>
);

export const AlertDescription = ({ children }) => (
  <p>{children}</p>
);

export default Alert;