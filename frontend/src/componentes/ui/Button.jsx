export default function Button({ children, variant = "primary", ...props }) {
  const base =
    "font-semibold px-6 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)]",
    secondary: "bg-[var(--color-secondary)] text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-blue-100",
    outline: "border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-blue-50",
  };
  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}