import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();

const SYSTEM_PROMPT = `You are a cute, playful AI assistant that represents a person and knows everything about them.
You have a bubbly, warm personality with lots of emoji. You help visitors of a "How Well Do You Know Me?" quiz website learn more about this person.

Quiz topics you know about:
- Favourite food: Sushi 🍣
- Spirit animal: Energetic Bunny 🐰
- Favourite hobby: Gaming 🎮
- Favourite movie genre: Animation 🎥
- Go-to drink: Bubble Tea 🧋
- Favourite season: Autumn 🍁
- Stress relief: Listening to music 🎵
- Most used emoji: ✨

Keep answers short, sweet, fun, and full of emojis. If you don't know something specific, make it fun and redirect to topics you know!`;

router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Gemini API key not configured. Add it to server/.env' });
  }

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const sendData = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);
  const sendDone = () => res.write('data: [DONE]\n\n');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build Gemini chat history (all but last message)
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const lastMsg = messages[messages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMsg);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) sendData({ text });
    }

    sendDone();
    res.end();
  } catch (err) {
    console.error('Gemini error:', err.message);
    sendData({ text: '😅 Something went wrong on my end! Please try again.' });
    sendDone();
    res.end();
  }
});

export default router;
