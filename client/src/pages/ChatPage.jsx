import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatPanel from '../chatbot/ChatPanel';

export default function ChatPage() {
  // Mobile floating bubble state
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen z-10">

      {/* Desktop layout */}
      <div className="hidden md:flex min-h-screen items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.1 }}
          >
            <ChatPanel />
          </motion.div>
        </div>
      </div>

      {/* Mobile: floating bubble + slide-up panel */}
      <div className="md:hidden">
        {/* Info content */}
        <div className="px-4 pt-24 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-5 rounded-3xl text-center"
          >
            <div className="text-5xl mb-3">🤖✨</div>
            <h1 className="text-xl font-black text-theme-text-main mb-2">
              Chat with My AI
            </h1>
            <p className="text-theme-text-muted font-semibold text-sm leading-relaxed">
              Tap the bubble below to start chatting! I'll answer everything about this person 💕
            </p>
          </motion.div>
        </div>

        {/* Floating bubble button */}
        <AnimatePresence>
          {!mobileOpen && (
            <motion.button
              key="bubble"
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onClick={() => setMobileOpen(true)}
              className="fixed bottom-6 right-5 z-50 w-16 h-16 rounded-full btn-shimmer
                shadow-xl shadow-theme-primary/60 text-2xl flex items-center justify-center
                cursor-pointer border-2 border-white/60"
              aria-label="Open chat"
            >
              💬
            </motion.button>
          )}
        </AnimatePresence>

        {/* Slide-up panel */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                key="mobile-panel"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl overflow-hidden flex flex-col"
                style={{ height: '88dvh' }}
              >
                {/* Close / drag handle bar */}
                <div
                  className="flex-shrink-0 flex items-center justify-between px-5 py-3 bg-theme-card-bg backdrop-blur-sm cursor-pointer border-b border-white/20"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="w-10 h-1 rounded-full bg-theme-text-muted/60 mx-auto" />
                </div>
                {/* ChatPanel fills remaining height */}
                <div className="flex-1 overflow-hidden">
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
