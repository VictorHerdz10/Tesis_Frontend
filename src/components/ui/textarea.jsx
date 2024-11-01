import React from 'react';

const Textarea = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="border border-gray-300 rounded-md px-3 py-2 w-full resize-y"
    />
  );
};

export default Textarea;