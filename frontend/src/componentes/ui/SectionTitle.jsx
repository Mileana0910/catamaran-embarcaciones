// SectionTitle.jsx
export default function SectionTitle({ children, className = "" }) {
  return (
    <div className="text-center mb-8">
      <h2 className={`text-3xl font-bold ${className}`}>{children}</h2>
    </div>
  );
}
