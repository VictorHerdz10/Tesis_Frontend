import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return (
    <div className="mb-4">{children}</div>
  );
};

const CardContent = ({ children }) => {
  return (
    <div>{children}</div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h2 className="text-xl font-bold mb-2">{children}</h2>
  );
};

export { Card, CardHeader, CardContent, CardTitle };