import React, { useState } from 'react';

const DialogTrigger = ({ children }) => {
  return children;
};

const DialogContent = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {children}
    </div>
  );
};

const DialogHeader = ({ children }) => {
  return (
    <div className="mb-4">{children}</div>
  );
};

const DialogTitle = ({ children }) => {
  return (
    <h3 className="text-lg font-semibold">{children}</h3>
  );
};

const Dialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <DialogTrigger onClick={toggleDialog}>{children[0]}</DialogTrigger>
      {isOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{children[1].props.children}</DialogTitle>
          </DialogHeader>
          {children[2]}
        </DialogContent>
      )}
    </>
  );
};

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };