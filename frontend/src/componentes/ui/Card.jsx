export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow p-6 ${className}`}>
      {children}
    </div>
  );
}

// Exportaciones nombradas para los subcomponentes
export function CardHeader({ children, className = "" }) {
  return <div className={`pb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`${className}`}>{children}</div>;
}