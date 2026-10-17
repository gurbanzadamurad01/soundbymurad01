import { ExternalLink, SkipBack, SkipForward, X } from 'lucide-react';
import { embedUrl, sunoUrl } from '../data/songs';
import { usePlayer } from '../player';

export default function PlayerBar() {
  const { current, next, prev, close } = usePlayer();
  if (!current) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-4 sm:pb-4">
      <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-ink-800/95 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:gap-3">
        <iframe
          key={current.id}
          src={embedUrl(current)}
          title={`${current.title} on Suno`}
          allow="autoplay; clipboard-write"
          className="h-[104px] min-w-0 flex-1 rounded-xl border-0 bg-ink-900"
        />

        <div className="flex shrink-0 flex-col items-center gap-1 pr-1 sm:flex-row sm:pr-2">
          <button onClick={prev} className="rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white" aria-label="Previous song">
            <SkipBack className="h-4 w-4 fill-current" />
          </button>
          <button onClick={next} className="rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white" aria-label="Next song">
            <SkipForward className="h-4 w-4 fill-current" />
          </button>
          <a
            href={sunoUrl(current)}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white sm:block"
            aria-label="Open on Suno"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <button onClick={close} className="rounded-full p-2 text-zinc-500 hover:bg-white/5 hover:text-white" aria-label="Close player">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
