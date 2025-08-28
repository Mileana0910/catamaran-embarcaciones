export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}
