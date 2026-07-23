export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-accent flex items-center justify-center text-base">
        ✨
      </div>
      <div className="glass px-5 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
        <span className="typing-dot w-2 h-2 rounded-full bg-theme-primary inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full bg-theme-primary inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full bg-theme-primary inline-block" />
      </div>
    </div>
  );
}
