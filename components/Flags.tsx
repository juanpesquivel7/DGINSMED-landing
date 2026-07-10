export function ArFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden>
      <rect width="24" height="16" fill="#fff" />
      <rect width="24" height="5.33" fill="#75AADB" />
      <rect y="10.67" width="24" height="5.33" fill="#75AADB" />
      <circle cx="12" cy="8" r="1.7" fill="#F6B40E" stroke="#85340A" strokeWidth="0.3" />
    </svg>
  );
}

export function GbFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden>
      <rect width="24" height="16" fill="#00247D" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#CF142B" strokeWidth="1" />
      <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="5" />
      <path d="M12 0V16M0 8H24" stroke="#CF142B" strokeWidth="2" />
    </svg>
  );
}

export function BrFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden>
      <rect width="24" height="16" fill="#009739" />
      <polygon points="12,2 22,8 12,14 2,8" fill="#FEDD00" />
      <circle cx="12" cy="8" r="3.4" fill="#012169" />
    </svg>
  );
}
