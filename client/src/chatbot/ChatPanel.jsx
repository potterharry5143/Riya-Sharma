import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import SpecialResponseCard from './SpecialResponseCard';
import { matchTrigger, TRIGGER_HINT, TRIGGER_HINT2 } from './specialResponses';

const INTRO = {
  title: '✨ Ask Me Anything!',
  emoji: '🤖',
};

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const scrollRef = useRef(null);
  const abortRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || isStreaming) return;

      if (!started) setStarted(true);

      const userMsg = { role: 'user', content: text };
      setMessages((prev) => [...prev, userMsg]);

      // ─────────────────────────────────────────────────────────────────────
      // TRIGGER CHECK — runs BEFORE any Gemini API call.
      // If the message contains a trigger word/name, respond locally.
      // ─────────────────────────────────────────────────────────────────────
      const triggerData = matchTrigger(text);

      if (triggerData) {
        // Add a special-type message; no API call made.
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            role: 'assistant',
            type: 'special',  // renderer key
            data: triggerData,
          },
        ]);
        return; // ← skip Gemini entirely
      }

      // ─────────────────────────────────────────────────────────────────────
      // GEMINI API PATH — only reached when no trigger matched
      // ─────────────────────────────────────────────────────────────────────
      setIsTyping(true);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      // Build history from all non-special messages only
      const history = [...messages, userMsg]
        .filter((m) => m.type !== 'special')
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        setIsTyping(false);

        // Start streaming AI bubble
        const aiMsgId = Date.now();
        setMessages((prev) => [
          ...prev,
          { id: aiMsgId, role: 'assistant', content: '', streaming: true },
        ]);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') break;
              try {
                const parsed = JSON.parse(data);
                const chunk = parsed.text ?? '';
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === aiMsgId ? { ...m, content: m.content + chunk } : m
                  )
                );
              } catch {
                // skip malformed SSE chunks
              }
            }
          }
        }

        // Mark streaming done
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId ? { ...m, streaming: false } : m
          )
        );
      } catch (err) {
        if (err.name === 'AbortError') {
          // Cancelled — seal off whatever was streamed so far
          setMessages((prev) =>
            prev.map((m) =>
              m.streaming ? { ...m, streaming: false, content: m.content + ' ✋' } : m
            )
          );
        } else {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: '😅 Oops! Something went wrong. Try again?',
            },
          ]);
        }
      } finally {
        setIsTyping(false);
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming, started]
  );

  const handleStop = () => {
    abortRef.current?.abort();
  };

  return (
    <>
      {/* Full-screen backdrop when maximized */}
      {maximized && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMaximized(false)}
        />
      )}

    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={maximized ? { position: 'fixed', inset: '1rem', zIndex: 50 } : {}}
      className={`flex flex-col glass overflow-hidden transition-colors duration-300 rounded-2xl
        ${
          maximized
            ? 'shadow-2xl h-full'
            : minimized
            ? 'h-14'
            : 'h-full min-h-[480px] sm:min-h-[560px] md:h-[560px] lg:h-[620px]'
        }`}
    >
      {/* ── Header ── */}
      <div
        className="flex-shrink-0 cursor-pointer select-none"
        onClick={() => setMinimized((m) => !m)}
      >
        {/* Top row: title + minimize button */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            {/* "AI Chatbot" heading */}
            <span className="font-extrabold text-theme-text-main text-base">
              AI Chatbot
            </span>
            {isStreaming && (
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="text-xs text-theme-primary font-bold"
              >
                ● live
              </motion.span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {/* Maximize / restore button */}
            {!minimized && (
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => { e.stopPropagation(); setMaximized((m) => !m); }}
                title={maximized ? 'Restore' : 'Fullscreen'}
                className="w-7 h-7 rounded-full bg-theme-card-bg border border-theme-card-border flex items-center justify-center
                  text-theme-text-main hover:brightness-110 transition-colors cursor-pointer text-sm shadow-sm"
              >
                {maximized ? '⊡' : '⛶'}
              </motion.button>
            )}

            {/* Minimize / restore button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              className="w-7 h-7 rounded-full bg-theme-card-bg border border-theme-card-border flex items-center justify-center
                text-theme-text-main hover:brightness-110 transition-colors cursor-pointer shadow-sm"
            >
              {minimized ? '⬆' : '⬇'}
            </motion.button>
          </div>
        </div>

        {/* Hint row */}
        {!minimized && (
          <div className="px-4 pb-2.5 border-b border-white/30">
            {/* EDIT HERE: Replace placeholder hint text with the real name/word */}
            <p className="text-[11px] font-semibold text-theme-text-muted select-text">
              💡 Try searching:{' '}
              <span className="font-extrabold text-theme-text-main">{TRIGGER_HINT}</span> or{' '}
              <span className="font-extrabold text-theme-text-main">{TRIGGER_HINT2}</span>
            </p>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <AnimatePresence>
        {!minimized && (
          <motion.div
            key="chat-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {/* Messages or intro state */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto chat-scroll px-4 py-3 space-y-3"
            >
              {!started ? (
                /* ── Intro splash ── */
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-col items-center justify-center h-full text-center py-6"
                >
                  <div className="text-6xl mb-3">{INTRO.emoji}</div>
                  <h3 className="text-xl font-extrabold text-theme-text-main mb-2">
                    {INTRO.title}
                  </h3>
                </motion.div>
              ) : (
                /* ── Message list ── */
                <>
                  {messages.map((msg, i) =>
                    msg.type === 'special' ? (
                      // Trigger match → render animated special card
                      <SpecialResponseCard key={msg.id ?? i} data={msg.data} isMaximized={maximized} />
                    ) : (
                      // Normal text bubble
                      <ChatBubble key={msg.id ?? i} message={msg} />
                    )
                  )}
                  {isTyping && <TypingIndicator />}
                </>
              )}
            </div>

            {/* Input bar */}
            <div className="px-3 pb-3 pt-1 flex-shrink-0">
              <ChatInput
                onSend={sendMessage}
                isStreaming={isStreaming}
                onStop={handleStop}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
}
