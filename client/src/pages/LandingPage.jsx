import Hero from '../components/Hero';
import ChatPanel from '../chatbot/ChatPanel';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen z-10 flex flex-col xl:flex-row items-center justify-center px-4 pt-24 pb-4 xl:p-12 xl:pt-24 gap-8 xl:gap-16">
      {/* Left side: Hero content */}
      <div className="w-full xl:w-1/2 flex justify-center xl:justify-end xl:pr-8">
        <Hero />
      </div>

      {/* Right side: Chatbot */}
      <div className="w-full xl:w-1/2 flex justify-center xl:justify-start max-w-lg xl:max-w-none">
        <div className="w-full max-w-md xl:max-w-lg">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}
