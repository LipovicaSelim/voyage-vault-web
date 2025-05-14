export default function Button({ children, onClick, className, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-red-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
