import { motion } from 'framer-motion';

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base
          ${isUser ? 'bg-theme-primary text-white' : 'bg-theme-accent text-theme-text-main'}`}
      >
        {isUser ? '🧑' : '✨'}
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[78%] px-4 py-3 rounded-2xl text-sm font-semibold leading-relaxed
          shadow-sm whitespace-pre-wrap
          ${isUser
            ? 'bg-theme-primary text-white rounded-br-sm'
            : 'glass text-theme-text-main rounded-bl-sm'}
        `}
      >
        {message.content}
        {message.streaming && (
          <span className="inline-block w-1.5 h-4 bg-theme-primary rounded-sm ml-1 align-middle animate-pulse" />
        )}
      </div>
    </motion.div>
  );
}
