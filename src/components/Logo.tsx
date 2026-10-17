export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent shadow-lg shadow-accent/30">
        <span className="flex h-4 items-center gap-[3px]">
          {[6, 12, 16, 9].map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-white" style={{ height: h }} />
          ))}
        </span>
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        soundby<span className="text-accent">murad</span>
      </span>
    </span>
  );
}
