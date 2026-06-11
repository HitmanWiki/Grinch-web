import { useState } from "react";
import { Copy, Check, Info, Sparkles, Smile } from "lucide-react";

export function GrinchLogoSVG({ className = "w-24 h-24", glowing = false }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={`${className} transition-all duration-300 ${glowing ? "drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle with gorgeous radial gradient */}
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      
      {/* Outer Border */}
      <circle cx="100" cy="100" r="96" fill="#15803d" stroke="#22c55e" strokeWidth="4" />
      {/* Inner Blue Sky */}
      <circle cx="100" cy="100" r="88" fill="url(#bgGrad)" />

      {/* Pepe Grinch Body/Coat */}
      <path d="M 60 180 C 60 150, 140 150, 140 180" fill="url(#hatGrad)" stroke="#7f1d1d" strokeWidth="2.5" />
      {/* Fur Collar */}
      <path d="M 54 175 C 65 155, 135 155, 146 175 C 130 185, 70 185, 54 175 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Pepe Green Face */}
      <path d="M 45 110 C 45 60, 155 60, 155 110 C 150 145, 50 145, 45 110 Z" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
      
      {/* Devious Face Cheeks and fur tufts */}
      <path d="M 43 115 C 33 118, 38 128, 48 123" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
      <path d="M 157 115 C 167 118, 162 128, 152 123" fill="#22c55e" stroke="#14532d" strokeWidth="2" />

      {/* Eyes background (classic Pepe sleepy/tired look) */}
      {/* Left Eye */}
      <ellipse cx="78" cy="92" rx="20" ry="14" fill="#fef08a" stroke="#14532d" strokeWidth="2.5" />
      {/* Right Eye */}
      <ellipse cx="122" cy="92" rx="20" ry="14" fill="#fef08a" stroke="#14532d" strokeWidth="2.5" />

      {/* Heavy tired eyelids / Grinch eyebrows */}
      <path d="M 56 86 C 70 76, 92 84, 96 90" fill="none" stroke="#14532d" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M 144 86 C 130 76, 108 84, 104 90" fill="none" stroke="#14532d" strokeWidth="4.5" strokeLinecap="round" />

      {/* Dilated pupils (striking red) */}
      <circle cx="78" cy="94" r="7" fill="#dc2626" />
      <circle cx="78" cy="94" r="3" fill="#ffffff" />
      <circle cx="122" cy="94" r="7" fill="#dc2626" />
      <circle cx="122" cy="94" r="3" fill="#ffffff" />

      {/* Mischievous Grinch smile (devious curlicue smile) */}
      <path d="M 52 118 C 70 134, 130 134, 148 118" fill="none" stroke="#14532d" strokeWidth="4" strokeLinecap="round" />
      <path d="M 148 118 C 144 116, 142 122, 146 124" fill="none" stroke="#14532d" strokeWidth="3" />
      <path d="M 52 118 C 56 116, 58 122, 54 124" fill="none" stroke="#14532d" strokeWidth="3" />

      {/* Santa Hat (Slouched down and beautifully curved) */}
      <path d="M 48 84 C 54 40, 146 40, 152 84 C 140 76, 60 76, 48 84 Z" fill="url(#hatGrad)" stroke="#7f1d1d" strokeWidth="2" />
      {/* White Fluffy Hat Base Trim */}
      <path d="M 44 80 C 44 80, 156 80, 156 82 C 156 90, 44 90, 44 80 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" rx="5" />
      {/* Drooping Tip of hat */}
      <path d="M 148 80 C 165 90, 175 110, 168 120" fill="none" stroke="#b91c1c" strokeWidth="12" strokeLinecap="round" />
      {/* Pom Pom white puff ball */}
      <circle cx="170" cy="125" r="11" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />

      {/* Pepe Grinch Hand holding chin in thinking pose */}
      {/* Left arm/hand loop coming up */}
      <path d="M 90 148 C 95 130, 115 130, 120 148 C 112 154, 98 154, 90 148 Z" fill="#22c55e" stroke="#14532d" strokeWidth="2.5" />
      <path d="M 102 138 C 104 125, 114 125, 116 138" fill="none" stroke="#14532d" strokeWidth="2" />
      <path d="M 109 135 C 111 122, 121 122, 123 135" fill="none" stroke="#14532d" strokeWidth="2" />
      {/* Swirly curl in chin fur representing grinch likeness */}
      <path d="M 98 135 C 92 140, 96 148, 102 146" fill="none" stroke="#14532d" strokeWidth="1.5" />
    </svg>
  );
}

export default function MemeBoard() {
  const [prefix, setPrefix] = useState("He sold?");
  const [suffix, setSuffix] = useState("Grinched.");
  const [copied, setCopied] = useState(false);

  const customText = `${prefix} ${suffix}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreset = (pre: string, suf: string) => {
    setPrefix(pre);
    setSuffix(suf);
  };

  return (
    <div className="bg-neutral-900/60 border border-emerald-950/80 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-0.5">
              Culture Module
            </span>
            <h3 className="text-xl font-sans font-bold text-white">
              Vocabulary Sticker Generator
            </h3>
          </div>
          <Smile className="w-6 h-6 text-emerald-400" />
        </div>

        <p className="text-sm text-neutral-400 mb-6 font-sans">
          The ultimate utility of a meme coin isn't a chart; <span className="text-emerald-300 font-semibold">it's becoming a verb</span>. Type below to generate customized sticker cards to spam in Telegram chat and Twitter!
        </p>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handlePreset("Bro got", "Grinched.")}
            className="text-xs font-mono bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700/50 rounded-full px-3 py-1.5 transition-all cursor-pointer"
          >
            💬 "Bro got..."
          </button>
          <button
            onClick={() => handlePreset("He sold?", "Grinched.")}
            className="text-xs font-mono bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700/50 rounded-full px-3 py-1.5 transition-all cursor-pointer"
          >
            💬 "He sold?..."
          </button>
          <button
            onClick={() => handlePreset("Don't get", "Grinched.")}
            className="text-xs font-mono bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700/50 rounded-full px-3 py-1.5 transition-all cursor-pointer"
          >
            💬 "Don't get..."
          </button>
          <button
            onClick={() => handlePreset("You faded", "Grinched.")}
            className="text-xs font-mono bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700/50 rounded-full px-3 py-1.5 transition-all cursor-pointer"
          >
            💬 "You faded..."
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1.5">
              Action Verb / Prefix
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="e.g. He sold?"
              className="w-full bg-black/40 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white font-sans focus:border-emerald-500/50 focus:outline-none"
              maxLength={20}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1.5">
              End Target / Suffix
            </label>
            <input
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder="e.g. Grinched."
              className="w-full bg-black/40 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white font-sans focus:border-emerald-500/50 focus:outline-none"
              maxLength={20}
            />
          </div>
        </div>
      </div>

      {/* Visual Sticker Card Render Area */}
      <div className="bg-black/40 border border-neutral-800/80 rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center">
        <GrinchLogoSVG className="w-28 h-28 transform hover:scale-105 transition-transform" glowing />
        
        <div className="space-y-1">
          <div className="text-xl font-sans tracking-tight text-white/50 font-normal">
            {prefix}
          </div>
          <div className="text-3xl font-sans font-black tracking-tight text-emerald-400 uppercase">
            {suffix}
          </div>
        </div>

        <button
          onClick={handleCopyText}
          className="bg-neutral-800 hover:bg-neutral-750 text-emerald-400 hover:text-emerald-300 font-mono text-xs px-4 py-2 rounded-lg border border-neutral-700/50 transition-all flex items-center gap-2 cursor-pointer"
        >
          {copied ? (
            <>
              Copied! <Check className="w-3.5 h-3.5 text-emerald-500" />
            </>
          ) : (
            <>
              Copy Phrase <Copy className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
