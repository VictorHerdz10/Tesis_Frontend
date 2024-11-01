import React, { useState } from 'react';

const Select = ({ value, onChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen ? "true" : "false"}
        aria-labelledby={`select-${value}`}
        onClick={toggleSelect}
        className="w-full pl-3 pr-10 py-2 text-left bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <span className="flex items-center">
          <span id={`select-${value}`} className="block truncate">
            {value}
          </span>
          <svg
            className="h-5 w-5 text-gray-400 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby={`select-${value}`}
          aria-activedescendant={`select-item-${value}`}
          className="origin-top-right absolute left-0 mt-2 w-full rounded-md shadow-lg overflow-hidden bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onClick: () => {
                onChange(child.props.value);
                toggleSelect();
              },
            })
          )}
        </ul>
      )}
    </div>
  );
};

const SelectItem = ({ value, children }) => {
  return (
    <li
      role="option"
      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
    >
      {children}
    </li>
  );
};

const SelectValue = ({ children }) => {
  return <span>{children}</span>;
};

const SelectTrigger = ({ children }) => {
  return children;
};

const SelectContent = ({ children }) => {
  return <div>{children}</div>;
};

export { Select, SelectItem, SelectValue, SelectTrigger, SelectContent };