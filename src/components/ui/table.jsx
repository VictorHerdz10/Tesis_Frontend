import React from 'react';

const Table = ({ children }) => {
  return (
    <table className="border-collapse border border-slate-400">
      {children}
    </table>
  );
};

const TableHead = ({ children }) => {
  return (
    <thead className="bg-slate-200">
      {children}
    </thead>
  );
};

const TableBody = ({ children }) => {
  return (
    <tbody>
      {children}
    </tbody>
  );
};

const TableRow = ({ children }) => {
  return (
    <tr>
      {children}
    </tr>
  );
};

const TableCell = ({ children }) => {
  return (
    <td className="border border-slate-300 p-2">{children}</td>
  );
};

const TableHeader = ({ children }) => {
  return (
    <th className="border border-slate-300 p-2 font-bold">{children}</th>
  );
};

export { Table, TableHead, TableBody, TableRow, TableCell, TableHeader };