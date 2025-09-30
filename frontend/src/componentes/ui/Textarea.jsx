export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${className}`}
      {...props}
    />
  );
}