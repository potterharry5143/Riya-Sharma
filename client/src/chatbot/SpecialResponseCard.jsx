import { motion, AnimatePresence } from 'framer-motion';

// ─── Shared animation variants ─────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, scale: 0.92, y: 18 },
  visible: { opacity: 1, scale: 1,    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 22, delay: 0.05 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 14 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.36, ease: 'easeOut', delay: d },
  }),
};

const staggerWrap = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } },
};

const thumbItem = {
  hidden:  { opacity: 0, scale: 0.75, y: 10 },
  visible: { opacity: 1, scale: 1,    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

// ─── Normal-mode card (compact, unchanged) ────────────────────────────────────
function NormalCard({ image, intro, works }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="flex items-start gap-2"
    >
      {/* AI avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-accent
        flex items-center justify-center text-base mt-1">
        ✨
      </div>

      {/* Card body */}
      <div className="glass rounded-2xl rounded-bl-sm overflow-hidden max-w-[85%] w-full">

        {/* Profile image */}
        <div className="relative w-full">
          <img
            src={image}
            alt="Profile"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
            className="w-full max-h-52 object-cover object-top"
          />
          <div style={{ display: 'none' }}
            className="w-full h-32 bg-gradient-to-br from-pink-100 to-purple-100
              flex flex-col items-center justify-center gap-1">
            <span className="text-3xl">🖼️</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Intro Section */}
          <motion.div variants={fadeUp} custom={0.28}
            initial="hidden" animate="visible"
            className="space-y-1.5"
          >
            <h3 className="text-base font-black text-theme-text-main tracking-tight text-right">
              No Nazar Plzz 🧿
            </h3>
            <p className="text-sm font-semibold text-theme-text-main leading-relaxed">
              {intro}
            </p>
          </motion.div>

          {/* Horizontal gallery */}
          {works?.length > 0 && (
            <div>
              <motion.p variants={fadeUp} custom={0.4}
                initial="hidden" animate="visible"
                className="text-xs font-extrabold text-theme-primary uppercase tracking-wide mb-2">
                🎨 Works &amp; Paintings
              </motion.p>
              <motion.div
                variants={staggerWrap} initial="hidden" animate="visible"
                className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1"
                style={{ scrollbarWidth: 'none' }}
              >
                {works.map((work, i) => (
                  <motion.div key={i} variants={thumbItem}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex-shrink-0 w-28 cursor-default">
                    <div className="w-28 h-24 rounded-xl overflow-hidden
                      bg-gradient-to-br from-pink-100 to-purple-100
                      border border-white/60 relative">
                      <img
                        src={work.image} alt={work.caption}
                        loading="lazy" decoding="async"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextSibling.style.display = 'flex';
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div style={{ display: 'none' }}
                        className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl">🎨</span>
                      </div>
                    </div>
                    {work.caption && (
                      <p className="text-[11px] font-bold text-theme-text-muted
                        mt-1 leading-tight text-center line-clamp-2">
                        {work.caption}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Fullscreen-mode card (rich portrait layout) ───────────────────────────────
function FullscreenCard({ image, intro, works }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="flex items-start gap-3 w-full"
    >
      {/* AI avatar */}
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-theme-accent
        flex items-center justify-center text-lg mt-1 shadow-md">
        ✨
      </div>

      {/* Full-width card */}
      <div className="glass rounded-2xl rounded-bl-sm overflow-hidden flex-1 min-w-0
        flex flex-col" style={{ maxHeight: 'calc(100vh - 180px)' }}>

        {/* Scrollable inner content */}
        <div className="overflow-y-auto flex-1 min-h-0"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(180,140,220,0.45) transparent',
          }}>

          {/* Profile image — contain, no crop */}
          <motion.div
            variants={fadeUp} custom={0.05}
            initial="hidden" animate="visible"
            className="relative w-full bg-gradient-to-b from-white/20 to-white/5
              flex items-center justify-center"
            style={{ minHeight: '200px', maxHeight: '42vh' }}
          >
            <img
              src={image}
              alt="Profile"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
              style={{ maxHeight: '42vh', width: '100%', objectFit: 'contain' }}
            />
            {/* Fallback */}
            <div style={{ display: 'none' }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-5xl">🖼️</span>
              <span className="text-sm text-purple-400 font-semibold">Image not found</span>
            </div>
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-10
              bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
          </motion.div>

          {/* Intro block */}
          <motion.div
            variants={fadeUp} custom={0.25}
            initial="hidden" animate="visible"
            className="px-5 pt-4 pb-4 border-b border-white/20"
          >
            <div className="flex items-center justify-end gap-2 mb-2">
              <span className="text-xl">👑</span>
              <span className="text-base font-black text-theme-text-main tracking-tight">
                No Nazar Plzz 🧿
              </span>
            </div>
            <p className="text-sm font-semibold text-theme-text-main leading-relaxed">
              {intro}
            </p>
          </motion.div>

          {/* Paintings & Works grid */}
          {works?.length > 0 && (
            <motion.div
              variants={fadeUp} custom={0.4}
              initial="hidden" animate="visible"
              className="px-5 pt-4 pb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">🖼️</span>
                <h4 className="text-xs font-black text-theme-primary uppercase tracking-widest">
                  Paintings &amp; Works
                </h4>
              </div>

              {/* 2-column grid */}
              <motion.div
                variants={staggerWrap}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {works.map((work, i) => (
                  <motion.div
                    key={i}
                    variants={thumbItem}
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="group cursor-default rounded-xl overflow-hidden
                      border border-white/50 shadow-md
                      bg-gradient-to-br from-white/30 to-white/10"
                  >
                    {/* 4:3 image */}
                    <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                      <img
                        src={work.image}
                        alt={work.caption}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextSibling.style.display = 'flex';
                        }}
                        className="absolute inset-0 w-full h-full object-cover
                          group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Fallback */}
                      <div style={{ display: 'none' }}
                        className="absolute inset-0 flex flex-col items-center justify-center
                          bg-gradient-to-br from-pink-100/60 to-purple-100/60">
                        <span className="text-3xl">🎨</span>
                      </div>
                      {/* Hover caption overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45
                        to-transparent opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-end p-2">
                        {work.caption && (
                          <span className="text-[10px] font-bold text-white
                            leading-tight line-clamp-2">
                            {work.caption}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Static caption */}
                    {work.caption && (
                      <p className="text-[11px] font-bold text-theme-text-muted
                        px-2 py-1.5 text-center leading-snug line-clamp-2">
                        {work.caption}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
        {/* end scroll */}
      </div>
    </motion.div>
  );
}

// ─── Main export — switches layout based on isMaximized ───────────────────────
export default function SpecialResponseCard({ data, isMaximized }) {
  const { image, intro, works } = data;

  return (
    <AnimatePresence mode="wait">
      {isMaximized ? (
        <FullscreenCard key="fs" image={image} intro={intro} works={works} />
      ) : (
        <NormalCard key="nm" image={image} intro={intro} works={works} />
      )}
    </AnimatePresence>
  );
}
