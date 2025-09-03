export default function Button({ children, variant = "primary", size = "md", ...props }) {
  const base = "font-semibold rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)]",
    secondary: "bg-[var(--color-secondary)] text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-blue-100",
    outline: "border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-blue-50",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700"
  };
  
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}