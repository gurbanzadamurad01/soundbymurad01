import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Search, Shuffle } from 'lucide-react';
import SongRow from '../components/SongRow';
import Equalizer from '../components/Equalizer';
import { site } from '../data/site';
import { categories, coverUrl, type Category } from '../data/songs';
import { useSongs } from '../songs';
import { usePlayer } from '../player';

type Sort = 'default' | 'plays' | 'az';

const PAGE = 18;

export default function Home() {
  const { current, play } = usePlayer();
  const songs = useSongs();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [sort, setSort] = useState<Sort>('default');
  const [showAll, setShowAll] = useState(false);

  const totalPlays = songs.reduce((n, s) => n + s.plays, 0);
  const since = songs.reduce((y, s) => Math.min(y, Number(s.released.slice(0, 4))), Infinity);
  const featured = useMemo(() => [...songs].sort((a, b) => b.plays - a.plays)[0], [songs]);
  const featuredActive = current?.id === featured.id;
  const countFor = (c: Category | 'All') => (c === 'All' ? songs.length : songs.filter((s) => s.category === c).length);

  const list = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    const filtered = songs.filter(
      (s) =>
        (category === 'All' || s.category === category) &&
        (!q || s.title.toLocaleLowerCase().includes(q) || s.genre.toLowerCase().includes(q)),
    );
    if (sort === 'plays') return [...filtered].sort((a, b) => b.plays - a.plays);
    if (sort === 'az') return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    return filtered;
  }, [songs, query, category, sort]);

  const visible = showAll || query ? list : list.slice(0, PAGE);

  const shuffle = () => play(songs[Math.floor(Math.random() * songs.length)]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="grid items-center gap-10 pb-12 pt-12 sm:pt-16 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-fadeup">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-400">
            <Equalizer active={!!current} className="h-3" />
            {site.brand}
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
            Murad
            <br />
            <span className="bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent">Gurbanzada</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-zinc-400">{site.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={shuffle}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:brightness-110"
            >
              <Shuffle className="h-4 w-4" /> Shuffle play
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/5"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <dl className="mt-10 flex gap-10">
            {[
              [songs.length, 'Songs'],
              [totalPlays.toLocaleString(), 'Plays'],
              [since, 'Active since'],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl font-bold">{n}</dt>
                <dd className="text-xs uppercase tracking-widest text-zinc-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Featured */}
        <div className="animate-fadeup [animation-delay:120ms]">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-accent/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800 p-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <img src={coverUrl(featured, 'lg')} alt={featured.title} className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                  Most played
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-xl font-bold">{featured.title}</p>
                  <p className="text-sm text-zinc-400">
                    {featured.genre} · {featured.plays} plays
                  </p>
                </div>
                <button
                  onClick={() => play(featured)}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-ink-950 transition hover:scale-105"
                  aria-label={`Play ${featured.title}`}
                >
                  {featuredActive ? <Equalizer /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Songs */}
      <section id="songs" className="pb-16">
        <div className="flex flex-col gap-4 border-t border-white/5 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Songs</h2>
            <p className="mt-1 text-sm text-zinc-500">
              {list.length} of {songs.length} tracks
            </p>
          </div>
          <div className="flex gap-2">
            <label className="relative flex-1 md:w-64 md:flex-none">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search songs"
                className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2 pl-9 pr-4 text-sm outline-none placeholder:text-zinc-500 focus:border-accent/60"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-white/10 bg-ink-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-accent/60"
              aria-label="Sort songs"
            >
              <option value="default">Latest</option>
              <option value="plays">Most played</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {(['All', ...categories] as const).map((g) => (
            <button
              key={g}
              onClick={() => {
                setCategory(g);
                setShowAll(false);
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                category === g
                  ? 'bg-white text-ink-950'
                  : 'border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white'
              }`}
            >
              {g} <span className="opacity-50">{countFor(g)}</span>
            </button>
          ))}
        </div>

        {list.length ? (
          <div className="mt-6 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((s, i) => (
              <SongRow key={s.id} song={s} index={i} />
            ))}
          </div>
        ) : null}
        {visible.length < list.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/5"
            >
              Show all {list.length} songs
            </button>
          </div>
        )}
        {!list.length && (
          <p className="mt-10 text-center text-sm text-zinc-500">No songs match “{query}”.</p>
        )}
      </section>
    </div>
  );
}
