import React, { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

export default function ManifestoCrawl() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !textRef.current) return;
      
      const container = containerRef.current;
      const containerHeight = container.clientHeight;
      const windowHeight = window.innerHeight;
      const scrollRange = containerHeight - windowHeight;
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const currentScroll = window.scrollY - containerTop;
      
      let progress = 0;
      if (scrollRange > 0) {
        progress = Math.min(1, Math.max(0, currentScroll / scrollRange));
      }
      
      // Move from 100% (bottom) to -100% (top)
      const translateY = 100 - (progress * 200);
      textRef.current.style.transform = `translateY(${translateY}%)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative bg-black"
      style={{ height: "250vh" }}
    >
      {/* NO borders, NO margins - clean connection */}
      <div 
        className="sticky top-0 h-screen overflow-hidden"
        style={{ perspective: "600px", perspectiveOrigin: "50% 15%" }}
      >
        {/* Stars background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.7)_0%,rgba(5,5,5,1)_100%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#39FF14_1px,transparent_1px),linear-gradient(to_bottom,#39FF14_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Header indicator */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#111] px-5 py-2.5 border border-white/10 z-20 text-[10px] font-mono tracking-widest text-[#39FF14] uppercase whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
          THE $GRINCH MANIFESTO
        </div>

        {/* 3D rotated track */}
        <div 
          className="absolute bottom-0 left-1/2 w-[85%] max-w-3xl"
          style={{
            transform: "translateX(-50%) rotateX(38deg)",
            transformOrigin: "center bottom",
          }}
        >
          <div 
            ref={textRef}
            className="text-center pb-32 will-change-transform"
            style={{ transform: "translateY(100%)" }}
          >
            <div className="space-y-10">
              {/* Title */}
              <div>
                <span className="text-[#39FF14] font-mono tracking-[0.3em] uppercase text-xs sm:text-sm font-bold block mb-4">
                  A LONG TIME AGO ON TELEGRAM...
                </span>
                <h2 className="font-display text-5xl sm:text-7xl leading-none tracking-tight text-white uppercase">
                  THE GRINCH <br />
                  <span className="text-[#39FF14]">NARRATIVE</span>
                </h2>
                <div className="w-16 h-[2px] bg-[#39FF14] mx-auto my-6" />
                <p className="text-sm text-neutral-500 font-mono">2026 — NOT FINANCIAL ADVICE</p>
              </div>

              {/* Section 01 */}
              <div className="space-y-6">
                <div className="inline-block mx-auto px-4 py-1 border border-[#39FF14]/30 bg-[#39FF14]/5">
                  <span className="text-[#39FF14] font-mono text-xs tracking-widest">01 — THE EMOTION</span>
                </div>
                <p className="text-3xl sm:text-5xl text-white font-display font-black leading-tight max-w-2xl mx-auto uppercase">
                  "The market remembers winners. <span className="text-[#39FF14]">It forgets everyone who missed them.</span>"
                </p>
                <p className="text-base sm:text-lg text-neutral-400 font-sans leading-relaxed max-w-xl mx-auto">
                  DOGE. SHIB. PEPE. BONK. UTYA. Every cycle, a handful of tickers rewrite someone's life. But for every winner, there are a thousand traders who were right there — and walked away with nothing.
                </p>
                <div className="space-y-3 max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-3 text-red-500 bg-red-950/20 p-3 border-l-2 border-red-500">
                    <span className="text-white text-sm font-bold">❌ He sold before the breakout.</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-amber-500 bg-amber-950/20 p-3 border-l-2 border-amber-500">
                    <span className="text-white text-sm font-bold">❌ He faded the narrative.</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-orange-500 bg-orange-950/20 p-3 border-l-2 border-orange-500">
                    <span className="text-white text-sm font-bold">❌ He watched someone else get rich.</span>
                  </div>
                </div>
                <div className="bg-neutral-900/80 border-l-4 border-[#39FF14] p-6 max-w-xl mx-auto">
                  <p className="text-neutral-200 italic text-lg">
                    "The greatest pain in crypto isn't losing money. It's being right — and still missing it."
                  </p>
                </div>
              </div>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent mx-auto my-8" />

              {/* Section 02 */}
              <div className="space-y-6">
                <div className="inline-block mx-auto px-4 py-1 border border-[#39FF14]/30 bg-[#39FF14]/5">
                  <span className="text-[#39FF14] font-mono text-xs tracking-widest">02 — WHY IT WORKS</span>
                </div>
                <p className="text-3xl sm:text-5xl text-white font-display font-black leading-tight max-w-2xl mx-auto uppercase">
                  Great memes are <span className="text-[#39FF14]">mirrors.</span>
                </p>
                <p className="text-base sm:text-lg text-neutral-400 font-sans leading-relaxed max-w-xl mx-auto">
                  Pepe Grinch maps onto the single most universal emotion in crypto: <span className="text-[#39FF14] font-bold">regret.</span> The one every trader has felt and none can escape.
                </p>
                <div className="bg-red-950/20 border border-red-800 p-6 max-w-xl mx-auto">
                  <p className="text-red-400 font-mono text-xs font-bold uppercase mb-2">THE MASS ERROR:</p>
                  <p className="text-white font-bold text-base">Most people see a frog in a Santa hat. They're missing it.</p>
                  <p className="text-neutral-400 text-sm mt-3">Christmas is the costume — regret trades 12 months a year.</p>
                </div>
              </div>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent mx-auto my-8" />

              {/* Section 03 */}
              <div className="space-y-6">
                <div className="inline-block mx-auto px-4 py-1 border border-[#39FF14]/30 bg-[#39FF14]/5">
                  <span className="text-[#39FF14] font-mono text-xs tracking-widest">03 — ORIGIN & THESIS</span>
                </div>
                <p className="text-3xl sm:text-5xl text-white font-display font-black leading-tight max-w-2xl mx-auto uppercase">
                  A character <span className="text-[#39FF14]">before a chart.</span>
                </p>
                <p className="text-base sm:text-lg text-neutral-400 font-sans leading-relaxed max-w-xl mx-auto">
                  Born in Telegram's sticker ecosystem — a meme that lived as culture before it ever touched a chart.
                </p>
                <p className="text-xl text-[#39FF14] font-sans font-bold leading-relaxed max-w-xl mx-auto">
                  When TON season ignites, capital hunts for the chain's defining memes. This one is already inside the app.
                </p>
              </div>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent mx-auto my-8" />

              {/* Final CTA */}
              <div className="space-y-6 pb-32">
                <div className="text-center">
                  <span className="text-7xl sm:text-8xl font-black text-white tracking-tighter">$GRINCH</span>
                </div>
                <p className="text-2xl text-[#39FF14] font-display uppercase tracking-widest">Every chain gets one Pepe.</p>
                <p className="text-3xl text-white font-display font-black uppercase">TON JUST GOT HIS.</p>
                <div className="border-2 border-[#39FF14] bg-[#39FF14]/5 p-6 max-w-md mx-auto">
                  <p className="text-[#39FF14] font-mono text-xl font-bold">DON'T GET GRINCHED.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlays */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/95 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none z-10" />
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 text-[10px] font-mono text-neutral-500">
          <span className="uppercase">Scroll to continue</span>
          <ArrowDown className="w-4 h-4 text-[#39FF14] animate-bounce" />
        </div>
      </div>
    </div>
  );
}