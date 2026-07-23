import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FloatingShapes from './components/FloatingShapes';
import Navbar from './components/Navbar';

// Code-split heavy sections
const QuizPage = lazy(() => import('./pages/QuizPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-2">
        {['💫', '✨', '⭐'].map((e, i) => (
          <span
            key={i}
            className="text-3xl"
            style={{ animation: `typing-dot 1.1s ${i * 0.18}s ease-in-out infinite` }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Shared floating background — rendered once */}
      <FloatingShapes />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
        <footer className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 pointer-events-none">
          <div
            className="glass px-5 py-3 rounded-2xl shadow-xl border-2"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'var(--color-primary)',
            }}
          >
            <span className="text-theme-text-main text-sm md:text-base font-extrabold tracking-wide drop-shadow-sm">
              A small website with a big purpose—to make Riya happy. 💖
            </span>
          </div>
        </footer>
      </Suspense>
    </BrowserRouter>
  );
}
