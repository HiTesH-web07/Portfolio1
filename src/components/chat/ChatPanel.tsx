'use client';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatBox from './ChatBox';
import { useChat } from './ChatContext';
import { profile } from '@/data/content';

// Slide-in chat: opens from the header, hero or menu without leaving your place on the page.
export default function ChatPanel() {
  const { panelOpen, closePanel } = useChat();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden'; document.body.style.paddingRight = `${sbw}px`;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
      if (e.key === 'Tab' && panel.current) { // keep focus inside the panel
        const f = panel.current.querySelectorAll<HTMLElement>('button:not([disabled]), textarea, a[href]');
        if (!f.length) return; const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.body.style.paddingRight = ''; window.removeEventListener('keydown', onKey); prev?.focus({ preventScroll: true }); };
  }, [panelOpen, closePanel]);

  const openCase = (id: string) => { closePanel(); setTimeout(() => window.dispatchEvent(new CustomEvent('open-case', { detail: id })), 380); };

  return (
    <AnimatePresence>
      {panelOpen && (
        <motion.div className="fixed inset-0 z-[90]" initial="hidden" animate="show" exit="hidden">
          <motion.div aria-hidden onClick={closePanel} className="absolute inset-0 bg-[#24231F]/35 backdrop-blur-[3px]" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} transition={{ duration: 0.35 }} />
          <motion.div ref={panel} role="dialog" aria-modal="true" aria-label="Ask Hitesh, AI assistant"
            className="absolute inset-y-0 right-0 flex w-full flex-col p-0 sm:w-[440px] sm:p-3"
            variants={{ hidden: { x: '104%' }, show: { x: 0 } }} transition={{ type: 'spring', stiffness: 260, damping: 32 }}>
            <ChatBox className="h-full shadow-lift sm:rounded-[1.75rem] sm:border sm:border-line" onClose={closePanel} autoFocus onOpenCase={openCase} />
            <p className="hidden pt-2 text-center text-xs text-[#F1EBDD] sm:block">AI answers can be imperfect. For anything important, email {profile.email}.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
