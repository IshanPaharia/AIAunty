import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const [situation, setSituation] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Read API Key
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isKeyMissing = !apiKey || apiKey === 'your_key_here' || apiKey.trim() === '';

  const exampleChips = [
    "I quit my job",
    "I'm dating someone",
    "I failed my exam"
  ];

  const handleAsk = async (textToSubmit) => {
    const promptText = textToSubmit || situation;
    if (!promptText.trim()) return;

    if (isKeyMissing) {
      setError("Bas karo! You must add your Gemini API Key to the .env file first. Aunty cannot read your mind without the internet!");
      return;
    }

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-3.1-flash-lite",
        systemInstruction: "You are a nosy, loving Indian aunty. You give unsolicited advice, compare the person to their cousins, ask about their marriage plans, comment on their weight or career, and sprinkle in Hindi words like 'beta', 'arre', 'haaye', 'bas karo'. You are dramatic, opinionated, and caring at the same time. Keep responses to 4-6 sentences.",
      });

      const result = await model.generateContent(promptText);
      const res = await result.response;
      const text = res.text();
      
      if (!text) {
        throw new Error("Aunty is speechless! (Empty response from Gemini)");
      }
      
      setResponse(text);
    } catch (err) {
      console.error(err);
      setError(err.message || "Arre re! Something went wrong while talking to Gemini. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#f8f5f0] via-[#fefdfb] to-[#ece6dc] min-h-screen p-4 sm:p-6 flex flex-col items-center justify-center font-sans antialiased text-[#2e1d18]">
      
      {/* Main card container - Glassmorphism, smooth shadow, elegant borders */}
      <div className="w-full max-w-lg bg-white/95 rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(120,12,30,0.06)] border border-[#eaddcd] overflow-hidden flex flex-col transition-all duration-300">
        
        {/* Header section with Premium Royal Crimson */}
        <header className="bg-gradient-to-r from-[#780c1e] via-[#9e1c31] to-[#b83146] p-6 text-white text-center shadow-md relative rounded-t-[1.9rem] overflow-hidden">
          
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-wide select-none drop-shadow-md text-[#fffbf2] flex items-center justify-center gap-2">
            AI Aunty <span className="animate-pulse drop-shadow-none">🧕</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm font-semibold text-[#fdecd2] tracking-widest mt-1.5 uppercase italic opacity-95">
            She knows best. Always.
          </p>
        </header>

        {/* Card Body */}
        <main className="p-6 space-y-6">
          
          {/* API Key Missing Notice - Curated warm peach box */}
          {isKeyMissing && (
            <div className="bg-[#fef8ec] border-l-4 border-[#eab308] p-4 rounded-r-2xl shadow-sm text-sm text-[#7c2d12] border-y border-r border-[#f4e4c9]/70 animate-pulse">
              <p className="font-bold mb-1 flex items-center gap-1.5 text-[#7c2d12]">
                <span>🔑</span> API Key Required (VITE_GEMINI_API_KEY)
              </p>
              <p className="text-xs leading-relaxed text-[#7c2d12]/90">
                To consult Aunty, create a <code className="bg-[#fef0d5] px-1 py-0.5 rounded font-mono font-bold">.env</code> file in the project root folder and configure:
              </p>
              <pre className="mt-2 p-2 bg-[#fdf0d8]/50 rounded-xl font-mono text-xs overflow-x-auto select-all border border-[#f3ddb6]/50">
                VITE_GEMINI_API_KEY=your_key_here
              </pre>
              <p className="text-[11px] mt-2 font-semibold text-[#b45309]">
                ⚠️ Make sure to restart your Vite development server after updating the file!
              </p>
            </div>
          )}

          {/* User Input Section */}
          <div className="space-y-2">
            <label 
              htmlFor="situation-input" 
              className="font-bold text-[#4a342d] text-sm flex items-center gap-1.5 tracking-wide"
            >
              <span>💭</span> Describe your life situation:
            </label>
            <textarea
              id="situation-input"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Tell aunty what's going on... (e.g., I ordered pizza again today, I want to delay my wedding...)"
              className="w-full min-h-[120px] p-4 border border-[#e1d5c5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#9e1c31] focus:border-transparent resize-none bg-[#faf8f4] placeholder-[#8c7a72]/50 text-[#36221c] transition-all shadow-inner text-base"
              disabled={isLoading}
            />
          </div>

          {/* Example Chips */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#8c776e] uppercase tracking-widest block">
              Tap an example:
            </span>
            <div className="flex flex-wrap gap-2">
              {exampleChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => !isLoading && setSituation(chip)}
                  disabled={isLoading}
                  className="px-4 py-1.5 text-xs sm:text-sm bg-[#faf8f5] hover:bg-[#9e1c31]/5 border border-[#e5dccf] hover:border-[#9e1c31]/30 text-[#5c4942] hover:text-[#9e1c31] rounded-full font-medium shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Ask Button - Elegant crimson block */}
          <button
            onClick={() => handleAsk()}
            disabled={isLoading || !situation.trim()}
            className="w-full py-4 bg-gradient-to-r from-[#9e1c31] to-[#780c1e] disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl font-bold shadow-lg shadow-[#9e1c31]/10 disabled:shadow-none hover:shadow-xl hover:shadow-[#9e1c31]/25 hover:from-[#b83146] hover:to-[#9e1c31] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#9e1c31] focus:ring-offset-2 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed text-base sm:text-lg"
          >
            {isLoading ? "Aunty is thinking... 🤔" : "Ask Aunty 🙏"}
          </button>

          {/* Error Message */}
          {error && (
            <div className="bg-[#fef2f2] border border-[#fca5a5] text-[#991b1b] p-4 rounded-2xl text-sm leading-relaxed flex gap-2.5 animate-shake">
              <span className="text-lg">🤦🏽‍♀️</span>
              <div>
                <span className="font-bold block mb-0.5">Arre Beta!</span>
                {error}
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <div className="flex space-x-2.5">
                <div className="w-3.5 h-3.5 bg-[#780c1e] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3.5 h-3.5 bg-[#d97706] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3.5 h-3.5 bg-[#b83146] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-[#5c4942] text-sm font-bold tracking-wide animate-pulse">
                Aunty is thinking... 🤔
              </span>
            </div>
          )}

          {/* Response Container (WhatsApp-styled message bubble) */}
          {response && !isLoading && (
            <div className="pt-5 border-t border-[#f0e7db] flex flex-col space-y-3">
              <span className="text-[10px] font-bold text-[#8c776e] uppercase tracking-widest block">
                Aunty's Response:
              </span>
              
              <div className="flex items-start gap-3 w-full">
                {/* Aunty Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d97706] to-[#b91c1c] flex-shrink-0 flex items-center justify-center text-xl shadow-md border border-[#f3ddb6]/35 select-none">
                  🧕
                </div>

                {/* WhatsApp Message Bubble */}
                <div className="flex-1 bg-[#e2f7cb] border border-[#c6e5ad] rounded-2xl rounded-tl-none p-4 shadow-sm relative text-[#2e1d18] text-[15px] leading-relaxed transition-all duration-300">
                  {/* WhatsApp header inside bubble */}
                  <div className="flex justify-between items-center mb-1.5 border-b border-[#b7df9b]/50 pb-1">
                    <span className="text-[#075e54] text-xs font-bold">Aunty</span>
                    <span className="text-[9px] text-[#075e54]/75 font-bold tracking-wider bg-white/60 px-2 py-0.5 rounded-full uppercase">
                      Nosy but Loving
                    </span>
                  </div>

                  {/* Bubble text */}
                  <p className="font-sans text-[#231612] font-normal whitespace-pre-wrap">
                    {response}
                  </p>

                  {/* Bubble footer with timestamp and blue tick marks */}
                  <div className="flex justify-between items-center mt-3.5 pt-2 border-t border-[#b7df9b]/40">
                    {/* Ask Again Action */}
                    <button
                      onClick={() => handleAsk()}
                      disabled={isLoading}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#128c7e] hover:bg-[#075e54] text-white text-xs font-bold rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
                      </svg>
                      Ask Again
                    </button>

                    <div className="flex items-center gap-1 select-none">
                      <span className="text-[10px] text-[#075e54]/60 font-semibold">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-[#34b7f1] text-xs font-extrabold leading-none">
                        ✓✓
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Card Footer - Minimal and elegant */}
        <footer className="p-4 bg-[#faf8f5] border-t border-[#f0e7db] text-center">
          <p className="text-[11px] text-[#8c776e] font-semibold tracking-wide">
            Made with 🧡 and high blood pressure. 
            <br />
            Disclaimers: She will judge you.
          </p>
        </footer>

      </div>
    </div>
  );
}

export default App;