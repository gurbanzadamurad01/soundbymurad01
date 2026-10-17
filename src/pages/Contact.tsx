import { useState, type FormEvent } from 'react';
import { Check, Copy, Instagram, Mail, Music2, Send, Youtube, type LucideIcon } from 'lucide-react';
import { site } from '../data/site';

const topics = ['Collaboration', 'Feature / vocals', 'Booking', 'Feedback', 'Just saying hi'];

const socialMeta: Record<string, { label: string; icon: LucideIcon }> = {
  instagram: { label: 'Instagram', icon: Instagram },
  youtube: { label: 'YouTube', icon: Youtube },
  tiktok: { label: 'TikTok', icon: Music2 },
  spotify: { label: 'Spotify', icon: Music2 },
};

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const links = [
    ...(site.sunoProfile ? [{ key: 'suno', label: 'Suno', icon: Music2, href: site.sunoProfile }] : []),
    ...Object.entries(site.socials)
      .filter(([, href]) => href)
      .map(([key, href]) => ({ key, href, ...socialMeta[key] })),
  ];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `[${site.brand}] ${topic} — ${name}`;
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ''}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the address is visible anyway */
    }
  };

  const field =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition placeholder:text-zinc-500 focus:border-accent/60 focus:bg-white/[0.05]';

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        {/* Intro */}
        <div className="animate-fadeup">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Let’s make
            <br />
            something loud.
          </h1>
          <p className="mt-5 max-w-md text-zinc-400">
            Want to collaborate, feature on a track or just tell me what you think of a song? Send me a message, I read
            everything.
          </p>

          <div className="mt-10 space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-800/60 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500">Email</p>
                <a href={`mailto:${site.email}`} className="block truncate font-medium hover:text-accent-soft">
                  {site.email}
                </a>
              </div>
              <button
                onClick={copyEmail}
                className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Copy email"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {links.map(({ key, label, icon: Icon, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-800/60 p-4 transition hover:border-white/20"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-zinc-300">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="animate-fadeup [animation-delay:120ms]">
          <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-2xl shadow-black/40 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">Your name</span>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className={field} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">Your email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={field}
                />
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className="mb-2 text-xs font-medium text-zinc-400">What’s it about?</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                      topic === t
                        ? 'bg-accent text-white'
                        : 'border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-xs font-medium text-zinc-400">Message</span>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your idea…"
                className={`${field} resize-none`}
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:brightness-110"
            >
              <Send className="h-4 w-4" /> Send message
            </button>
            <p className="mt-3 text-center text-xs text-zinc-500">
              {sent ? 'Your email app should open with the message ready — just hit send.' : 'Opens your email app with the message filled in.'}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
