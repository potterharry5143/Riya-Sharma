import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import ChatPanel from '../chatbot/ChatPanel';

export default function LandingPage() {
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  return (
    <div className="relative min-h-screen z-10">

      {/* ── Desktop layout (xl+): side-by-side ── */}
      <div className="hidden xl:flex min-h-screen items-center justify-center px-12 pt-24 pb-4 gap-16">
        <div className="w-1/2 flex justify-end pr-8">
          <Hero />
        </div>
        <div className="w-1/2 flex justify-start max-w-lg">
          <div className="w-full max-w-lg">
            <ChatPanel />
          </div>
        </div>
      </div>

      {/* ── Mobile layout (< xl): Hero only, chatbot as floating bubble ── */}
      <div className="xl:hidden flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-28">
        <Hero />
      </div>

      {/* ── Mobile: Floating chat bubble ── */}
      <div className="xl:hidden">
        <AnimatePresence>
          {!mobileChatOpen && (
            <motion.button
              key="landing-bubble"
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onClick={() => setMobileChatOpen(true)}
              className="fixed bottom-6 right-5 z-50 w-16 h-16 rounded-full btn-shimmer
                shadow-xl shadow-theme-primary/60 text-2xl flex items-center justify-center
                cursor-pointer border-2 border-white/60"
              aria-label="Open AI Chatbot"
            >
              💬
            </motion.button>
          )}
        </AnimatePresence>

        {/* Slide-up chat panel */}
        <AnimatePresence>
          {mobileChatOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="landing-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setMobileChatOpen(false)}
              />
              <motion.div
                key="landing-chat-panel"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl overflow-hidden"
                style={{ height: '88dvh' }}
              >
                {/* Pull bar / close handle */}
                <div
                  className="flex justify-between items-center px-5 py-3 bg-theme-card-bg backdrop-blur-sm cursor-pointer border-b border-white/20"
                  onClick={() => setMobileChatOpen(false)}
                >
                  <div className="w-10 h-1 rounded-full bg-theme-text-muted/60 mx-auto" />
                </div>
                <div className="h-full overflow-hidden">
                  <ChatPanel />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
