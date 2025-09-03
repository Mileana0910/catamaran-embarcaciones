export function Alert({ children, variant = "default", className = "", ...props }) {
  const variants = {
    default: "bg-blue-50 text-blue-800 border-blue-200",
    destructive: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <div
      className={`p-4 rounded-md border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = "", ...props }) {
  return (
    <div className={`text-sm ${className}`} {...props}>
      {children}
    </div>
  );
}