import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 pb-[var(--safe-bottom,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:px-6">
        <span>© {new Date().getFullYear()} {site.name}. All songs by {site.name}.</span>
        <span className="font-display">{site.brand}</span>
      </div>
    </footer>
  );
}
