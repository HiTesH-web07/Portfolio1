'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X, MessageCircle, Download } from 'lucide-react';
import { nav, profile } from '@/data/content';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.dataset.theme === 'dark'), []);
  const flip = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    setDark(!dark);
  };
  return (
    <button onClick={flip} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    nav.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${scrolled ? 'border-b border-line/70 bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'}`}>
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5 font-display font-semibold" aria-label={`${profile.name}, back to top`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-sm text-[#F1EBDD] transition-transform duration-500 group-hover:-rotate-6">HA</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className={`relative rounded-full px-3.5 py-2 text-[15px] transition-colors ${active === n.id ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a href={profile.resume} download aria-label="Download resume (PDF)" title="Download resume" className="hidden h-11 items-center gap-1.5 rounded-full px-3 text-[15px] text-muted transition-colors hover:bg-ink/5 hover:text-ink md:inline-flex"><Download size={17} /><span className="hidden xl:inline">Resume</span></a>
          <motion.a whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} href="#ask" className="btn-primary hidden !min-h-[40px] !px-4 sm:inline-flex"><MessageCircle size={16} />Ask Hitesh</motion.a>
          <button className="grid h-11 w-11 place-items-center rounded-full lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={20} /></button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex flex-col bg-bg lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} role="dialog" aria-modal="true" aria-label="Menu">
            <div className="wrap flex h-16 items-center justify-between">
              <span className="font-display font-semibold">{profile.name}</span>
              <button className="grid h-11 w-11 place-items-center rounded-full" aria-label="Close menu" onClick={() => setOpen(false)}><X size={22} /></button>
            </div>
            <ul className="wrap mt-6 grid gap-1">
              {[...nav, { id: 'ask', label: 'Ask Hitesh' }].map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-display text-3xl font-medium">{n.label}</a>
                </motion.li>
              ))}
            </ul>
            <div className="wrap mt-8"><a href={profile.resume} download className="btn-primary w-full"><Download size={17} />Download resume</a></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
