// src/componentes/ui/Select.jsx
export default function Select({ children, className = "", ...props }) {
  return (
    <select
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}