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
        <div className="px-4 pt-28 pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-3xl text-center"
          >
            <div className="text-5xl mb-3">🤖✨</div>
            <h1 className="text-2xl font-black text-theme-text-main mb-2">
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
              className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full btn-shimmer
                shadow-xl shadow-theme-primary/60 text-2xl flex items-center justify-center
                cursor-pointer border-2 border-white/60"
            >
              💬
            </motion.button>
          )}
        </AnimatePresence>

        {/* Slide-up panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 h-[85vh] rounded-t-3xl overflow-hidden"
            >
              {/* Close bar */}
              <div
                className="flex justify-center items-center py-2 bg-theme-card-bg backdrop-blur-sm cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-10 h-1 rounded-full bg-theme-text-muted/60" />
              </div>
              <ChatPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
