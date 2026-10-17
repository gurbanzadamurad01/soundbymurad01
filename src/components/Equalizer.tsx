export default function Equalizer({ active = true, className = '' }: { active?: boolean; className?: string }) {
  return (
    <span className={`flex h-4 items-end gap-[3px] ${className}`} aria-hidden>
      {[0, 0.2, 0.4, 0.1].map((d, i) => (
        <span
          key={i}
          className={`h-full w-[3px] origin-bottom rounded-full bg-accent ${active ? 'animate-bar' : 'scale-y-[0.35]'}`}
          style={{ animationDelay: `${d}s` }}
        />
      ))}
    </span>
  );
}
