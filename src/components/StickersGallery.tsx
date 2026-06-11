import React, { useState } from "react";
import { X, MessageCircle, Copy, Check, Sparkles, Flame } from "lucide-react";

// Import all stickers from assets
import sticker1 from "../assets/stickers/1.gif";
import sticker2 from "../assets/stickers/2.gif";
import sticker3 from "../assets/stickers/3.gif";
import sticker4 from "../assets/stickers/4.gif";
import sticker5 from "../assets/stickers/5.gif";
import sticker6 from "../assets/stickers/6.gif";
import sticker7 from "../assets/stickers/7.gif";
import sticker8 from "../assets/stickers/8.gif";
import sticker9 from "../assets/stickers/9.gif";
import sticker10 from "../assets/stickers/10.gif";
import sticker11 from "../assets/stickers/11.gif";
import sticker12 from "../assets/stickers/12.gif";
import sticker13 from "../assets/stickers/13.gif";
import sticker14 from "../assets/stickers/14.gif";
import sticker15 from "../assets/stickers/15.gif";

// List of Pepe Grinch stickers with imported images
const STICKERS_LIST = [
  { id: 1, image: sticker1, alt: "Laughing Grinch" },
  { id: 2, image: sticker2, alt: "Angry Grinch" },
  { id: 3, image: sticker3, alt: "Smiling Grinch" },
  { id: 4, image: sticker4, alt: "Crying Grinch" },
  { id: 5, image: sticker5, alt: "Shocked Grinch" },
  { id: 6, image: sticker6, alt: "Cool Grinch" },
  { id: 7, image: sticker7, alt: "To The Moon" },
  { id: 8, image: sticker8, alt: "Green Candles" },
  { id: 9, image: sticker9, alt: "Faded" },
  { id: 10, image: sticker10, alt: "Missed The Pump" },
  { id: 11, image: sticker11, alt: "Buying" },
  { id: 12, image: sticker12, alt: "Selling" },
  { id: 13, image: sticker13, alt: "HODL" },
  { id: 14, image: sticker14, alt: "Rugged" },
  { id: 15, image: sticker15, alt: "Got Grinched" },
];

export default function StickersGallery() {
  const [selectedSticker, setSelectedSticker] = useState<typeof STICKERS_LIST[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const openSticker = (sticker: typeof STICKERS_LIST[0]) => {
    setSelectedSticker(sticker);
  };

  const closeSticker = () => {
    setSelectedSticker(null);
  };

  const copyStickerLink = () => {
    navigator.clipboard.writeText("https://t.me/pepegrinchton");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="stickers-gallery-section relative bg-[#050505]">
      {/* Neon Border Top - No gap! */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#39FF14]" />
            <span className="text-xs font-mono text-[#39FF14] uppercase tracking-widest font-bold">
              Official Sticker Pack
            </span>
            <Flame className="w-4 h-4 text-[#39FF14]" />
          </div>
          
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tighter leading-none">
            THE <span className="text-[#39FF14]">GRINCH</span>
          </h2>
          <p className="text-xl text-neutral-500 font-mono mt-2 tracking-widest">STICKER COLLECTION</p>
          
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent mx-auto mt-6 mb-4" />
          
          <p className="text-neutral-400 font-sans max-w-2xl mx-auto text-sm">
            Over <span className="text-[#39FF14] font-bold">1M+ daily uses</span> on Telegram. 
            Now on <span className="text-white font-bold">TON Network</span>.
            Each sticker spreads the <span className="text-[#39FF14]">DON'T GET GRINCHED</span> culture.
          </p>
        </div>

        {/* Sticker Grid - 15 stickers */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 auto-rows-fr">
          {STICKERS_LIST.map((sticker) => (
            <div
              key={sticker.id}
              onClick={() => openSticker(sticker)}
              className="group relative bg-gradient-to-br from-[#0d0d0d] to-[#080808] border-2 border-[#39FF14]/10 rounded-xl p-3 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#39FF14]/40 hover:scale-105 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)]"
            >
              {/* Sticker Number */}
              <div className="absolute top-1 left-1 text-[7px] font-mono text-neutral-600 group-hover:text-[#39FF14]/40 transition-colors z-10">
                #{sticker.id}
              </div>
              
              {/* Hot Indicator for first 3 */}
              {sticker.id <= 3 && (
                <div className="absolute top-1 right-1">
                  <Flame className="w-2.5 h-2.5 text-orange-500 animate-pulse" />
                </div>
              )}
              
              {/* Sticker Image */}
              <div className="w-full min-h-[100px] flex items-center justify-center">
                <img
                  src={sticker.image}
                  alt={sticker.alt}
                  className="w-full h-auto max-h-[110px] object-contain transition-all duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Sticker Name on Hover */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap bg-black/90 px-2 py-0.5 rounded-full border border-[#39FF14]/30 pointer-events-none z-20">
                <span className="text-[8px] font-mono text-[#39FF14]">{sticker.alt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-[#0d0d0d] border border-white/5 rounded-full px-6 py-3">
            <div className="text-center px-3">
              <span className="block text-xl font-bold text-[#39FF14]">1M+</span>
              <span className="text-[9px] text-neutral-500 uppercase tracking-wider">Daily Sends</span>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-center px-3">
              <span className="block text-xl font-bold text-[#39FF14]">15</span>
              <span className="text-[9px] text-neutral-500 uppercase tracking-wider">Unique Stickers</span>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-center px-3">
              <span className="block text-xl font-bold text-[#39FF14]">TON</span>
              <span className="text-[9px] text-neutral-500 uppercase tracking-wider">Native Chain</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Popup when sticker is clicked */}
      {selectedSticker && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeSticker}
        >
          <div 
            className="relative max-w-md w-full bg-gradient-to-br from-[#0f0f0f] to-[#050505] border border-[#39FF14]/30 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeSticker}
              className="absolute -top-3 -right-3 w-7 h-7 bg-black border border-[#39FF14] rounded-full flex items-center justify-center text-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-all duration-300 z-10 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Modal Content */}
            <div className="text-center space-y-5">
              <div className="space-y-1">
                <span className="inline-block px-3 py-1 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-full text-[9px] font-mono text-[#39FF14] uppercase tracking-widest">
                  Pepe Grinch
                </span>
                <h3 className="text-lg font-display text-white uppercase tracking-tight">
                  {selectedSticker.alt}
                </h3>
              </div>

              {/* Sticker Image in Modal */}
              <div className="bg-black/50 border border-white/10 rounded-xl p-6 flex items-center justify-center">
                <img
                  src={selectedSticker.image}
                  alt={selectedSticker.alt}
                  className="max-w-[220px] max-h-[220px] w-full h-auto object-contain"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={copyStickerLink}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-white font-mono text-xs hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#39FF14]" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Link
                    </>
                  )}
                </button>
                
                <a
                  href="https://t.me/pepegrinchton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#39FF14] text-black rounded-xl font-mono text-xs font-bold hover:bg-white transition-all duration-300"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Get Pack
                </a>
              </div>

              <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">
                DON'T GET GRINCHED • SHARE WITH YOUR DEGENS
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-in {
          animation: fadeIn 0.2s ease-out;
        }
        .stickers-gallery-section {
          background: #050505;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}