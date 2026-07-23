// ─────────────────────────────────────────────────────────────────────────────
// specialResponses.js
// Trigger-based local responses — checked BEFORE the Gemini API is called.
// Match is case-insensitive and substring-based (any word in the message
// that contains a trigger key will fire the response).
// ─────────────────────────────────────────────────────────────────────────────

const specialResponses = {
  // Primary trigger
  "riya": {
    image: "/Image4.jpeg",
    intro: "Meet Riya Sharma 🌸 — a kind-hearted , talented , and inspiring person ✨. As a Fashion Design student  with a passion for painting and sketching , she brings creativity and elegance into everything she does. Her honesty and determination  make her truly special. She deserves all the happiness  and every beautiful moment life has to offer. 🌺",
    works: [
      { image: "/Image1.jpeg", caption: "🌊 Watercolour Dreamscape" },
      { image: "/Image2.jpeg", caption: "🌸 Floral Impressions" },
      { image: "/Image3.jpeg", caption: "✏️ Sketchbook Stories" },
    ],
  },

  // Nickname aliases — same data, different trigger words
  "cutie": {
    image: "/Image4.jpeg",
    intro: "Meet Riya Sharma 🌸 — a kind-hearted , talented , and inspiring person ✨. As a Fashion Design student  with a passion for painting and sketching , she brings creativity and elegance into everything she does. Her honesty and determination  make her truly special. She deserves all the happiness  and every beautiful moment life has to offer. 🌺",
    works: [
      { image: "/Image1.jpeg", caption: "🌊 Watercolour Dreamscape" },
      { image: "/Image2.jpeg", caption: "🌸 Floral Impressions" },
      { image: "/Image3.jpeg", caption: "✏️ Sketchbook Stories" },
    ],
  },

  // ⚠️ Key MUST be lowercase — matchTrigger lowercases the input before matching
  "pyaazpaglu": {
    image: "/Image4.jpeg",
    intro: "Meet Riya Sharma 🌸 — a kind-hearted , talented , and inspiring person ✨. As a Fashion Design student  with a passion for painting and sketching , she brings creativity and elegance into everything she does. Her honesty and determination  make her truly special. She deserves all the happiness  and every beautiful moment life has to offer. 🌺",
    works: [
      { image: "/Image1.jpeg", caption: "🌊 Watercolour Dreamscape" },
      { image: "/Image2.jpeg", caption: "🌸 Floral Impressions" },
      { image: "/Image3.jpeg", caption: "✏️ Sketchbook Stories" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// matchTrigger(text)
// Returns the matched specialResponse object (or null if no match).
// Matching rules:
//   1. Lowercase the entire input message.
//   2. For each trigger key, check if the message *contains* that key
//      as a word-boundary match (so "riya!" matches "riya", etc.).
//   3. Returns the FIRST match found (order = Object.keys order above).
// ─────────────────────────────────────────────────────────────────────────────
export function matchTrigger(text) {
  const lower = text.toLowerCase().trim();
  for (const [key, data] of Object.entries(specialResponses)) {
    // Word-boundary aware: the trigger can appear anywhere in the message,
    // surrounded by non-word chars or at start/end.
    const pattern = new RegExp(`(?:^|[^a-z0-9])${key}(?:[^a-z0-9]|$)`);
    if (pattern.test(lower)) {
      return data;
    }
  }
  return null;
}

// EDIT HERE: Update the hint text shown in the chatbot header — use the
// primary trigger word/name that the user should type to see the special card.
export const TRIGGER_HINT = "Riya"; // e.g. "Riya", "her name", etc.
export const TRIGGER_HINT2 = "Pyaazpaglu";

export default specialResponses;
