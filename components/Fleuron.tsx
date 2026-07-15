export default function Fleuron() {
  return (
    <svg
      width="120"
      height="24"
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto text-bronze"
      aria-hidden="true"
    >
      <line x1="0" y1="12" x2="42" y2="12" stroke="currentColor" strokeWidth="1" />
      <line x1="78" y1="12" x2="120" y2="12" stroke="currentColor" strokeWidth="1" />
      <path
        d="M60 4c4 0 7 3.5 7 8s-3 8-7 8-7-3.5-7-8 3-8 7-8Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="60" cy="12" r="2" fill="currentColor" />
      <path d="M46 12h8M66 12h8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
