import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function ChatInput({ onSend, isStreaming, onStop }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleSend = useCallback(() => {
    const msg = value.trim();
    if (!msg || isStreaming) return;
    onSend(msg);
    setValue('');
    textareaRef.current?.focus();
  }, [value, isStreaming, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-2 sm:p-3 glass rounded-2xl">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything... 💭"
        rows={1}
        className="flex-1 bg-transparent outline-none resize-none text-theme-text-main placeholder-theme-text-muted/70
          font-semibold text-sm leading-relaxed max-h-28 overflow-y-auto min-h-[44px] py-3"
        style={{ fieldSizing: 'content' }}
        disabled={isStreaming}
      />

      {isStreaming ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onStop}
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-red-400 text-white flex items-center justify-center
            shadow-md hover:bg-red-500 transition-colors cursor-pointer flex-shrink-0"
          title="Stop"
        >
          ⬛
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          onClick={handleSend}
          disabled={!value.trim()}
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full btn-shimmer text-theme-text-main flex items-center justify-center
            shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
          title="Send"
        >
          ➤
        </motion.button>
      )}
    </div>
  );
}

