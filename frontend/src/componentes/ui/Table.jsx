export function Table({ children, className = "" }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-slate-50">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className = "" }) {
  return <tr className={`border-b border-slate-200 ${className}`}>{children}</tr>;
}

export function TableHead({ children, className = "" }) {
  return (
    <th className={`px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
}

export function TableCell({ children, className = "" }) {
  return <td className={`px-4 py-3 text-sm text-slate-900 ${className}`}>{children}</td>;
}