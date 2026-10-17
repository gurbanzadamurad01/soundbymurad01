import { Play } from 'lucide-react';
import { coverUrl, formatDuration, isNew, type Song } from '../data/songs';
import { usePlayer } from '../player';
import Equalizer from './Equalizer';

export default function SongRow({ song, index }: { song: Song; index: number }) {
  const { current, play } = usePlayer();
  const isCurrent = current?.id === song.id;

  return (
    <button
      onClick={() => play(song)}
      className={`group flex w-full animate-fadeup items-center gap-4 rounded-2xl p-3 text-left transition ${
        isCurrent ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'
      }`}
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
      aria-label={`Play ${song.title}`}
    >
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink-700 ring-1 ring-white/10">
        <img
          src={coverUrl(song)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute inset-0 grid place-items-center bg-black/50 transition ${
            isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {isCurrent ? <Equalizer /> : <Play className="h-6 w-6 fill-white text-white" />}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-2">
          <span className={`truncate text-[15px] font-medium ${isCurrent ? 'text-accent-soft' : 'text-zinc-100'}`}>
            {song.title}
          </span>
          {isNew(song) && (
            <span className="shrink-0 self-center rounded-full bg-accent px-1.5 text-[9px] font-bold uppercase leading-[15px] tracking-wide text-white">
              New
            </span>
          )}
          {song.explicit && (
            <span className="shrink-0 self-center rounded-[3px] bg-zinc-500 px-1 text-[9px] font-bold leading-[14px] text-ink-950" title="Explicit">
              E
            </span>
          )}
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-accent">{song.model}</span>
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-[13px] text-zinc-400">
          <Play className="h-3 w-3 shrink-0 fill-zinc-400" />
          <span>{song.plays}</span>
          {song.genre && (
            <>
              <span className="text-zinc-600">·</span>
              <span className="truncate">{song.genre}</span>
            </>
          )}
          <span className="ml-auto shrink-0 pl-2 text-xs tabular-nums text-zinc-500">{formatDuration(song.duration)}</span>
        </span>
      </span>
    </button>
  );
}
