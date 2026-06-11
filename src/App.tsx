import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  MessageCircle, 
  ExternalLink, 
  TrendingUp, 
  Activity, 
  ShieldAlert, 
  Flame, 
  Volume2, 
  BookOpen, 
  Copy, 
  Check, 
  Twitter,
  Wallet,
  ShoppingCart,
  ArrowUpRight,
  PieChart,
  Users,
  Lock,
  Rocket,
  Menu,
  X
} from "lucide-react";
import { motion } from "motion/react";




// Use direct paths to public folder
const logoPng = "/assets/logo.PNG";
const sticker1 = "/assets/stickers/8.gif";   // Sold too early (Crying)
const sticker2 = "/assets/stickers/13.gif";  // Waited for entry (Shocked)
const sticker3 = "/assets/stickers/4.gif";   // Watched 100x (Forever Alone)
const sticker5 = "/assets/stickers/5.gif";   // Egor Zhgun sticker

// Rest of your component remains the same...

export default function App() {
  const [copiedCA, setCopiedCA] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [marketData, setMarketData] = useState({
    marketCap: null,
    liquidity: null,
    price: null,
    priceChange: null,
    volume24h: null,
    loading: true,
    error: null
  });
  
  // Contract address
  const contractAddress = "EQA6G0uVERDZTkLNa0drWBna1F5TSbogy7UXEWU5ERHz4uJL";
  
  // Format address for display (truncated)
  const displayAddress = `${contractAddress.slice(0, 6)}...${contractAddress.slice(-6)}`;

  const copyContractAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  // Fetch real data from DexScreener API
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setMarketData(prev => ({ ...prev, loading: true, error: null }));
        
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/search?q=${contractAddress}`
        );
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.pairs && data.pairs.length > 0) {
          const tonPair = data.pairs.find(pair => 
            pair.chainId === "ton" || pair.chainId?.toLowerCase() === "the open network"
          ) || data.pairs[0];
          
          if (tonPair) {
            setMarketData({
              marketCap: tonPair.marketCap ? parseFloat(tonPair.marketCap) : (tonPair.fdv ? parseFloat(tonPair.fdv) : 0),
              liquidity: tonPair.liquidity?.usd ? parseFloat(tonPair.liquidity.usd) : 0,
              price: tonPair.priceUsd ? parseFloat(tonPair.priceUsd) : 0,
              priceChange: tonPair.priceChange?.h24 ? parseFloat(tonPair.priceChange.h24) : 0,
              volume24h: tonPair.volume?.h24 ? parseFloat(tonPair.volume.h24) : 0,
              loading: false,
              error: null
            });
          } else {
            throw new Error("No trading pair found");
          }
        } else {
          throw new Error("No data available for this contract");
        }
      } catch (err) {
        console.error("Failed to fetch DexScreener data:", err);
        setMarketData(prev => ({
          ...prev,
          loading: false,
          error: err.message || "Failed to load market data"
        }));
      }
    };
    
    fetchMarketData();
    
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, [contractAddress]);

  // Format numbers for display
  const formatMarketCap = (value) => {
    if (!value && value !== 0) return "Loading...";
    const numValue = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(numValue)) return "N/A";
    if (numValue >= 1_000_000) return `$${(numValue / 1_000_000).toFixed(2)}M`;
    if (numValue >= 1_000) return `$${(numValue / 1_000).toFixed(2)}K`;
    return `$${numValue.toFixed(2)}`;
  };

  const formatLiquidity = (value) => {
    if (!value && value !== 0) return "Loading...";
    const numValue = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(numValue)) return "N/A";
    if (numValue >= 1_000) return `$${(numValue / 1_000).toFixed(1)}K`;
    return `$${numValue.toFixed(0)}`;
  };

  const formatPrice = (value) => {
    if (!value && value !== 0) return "Loading...";
    const numValue = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(numValue)) return "N/A";
    if (numValue === 0) return "$0.00";
    if (numValue < 0.000001) return `$${numValue.toExponential(4)}`;
    if (numValue < 0.001) return `$${numValue.toFixed(8)}`;
    if (numValue < 1) return `$${numValue.toFixed(6)}`;
    return `$${numValue.toFixed(4)}`;
  };

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
   <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-[#39FF14] selection:text-black antialiased relative overflow-x-hidden">
      
      {/* ===== BACKGROUND ANIMATIONS ===== */}
      {/* Animated Stars Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-stars animate-twinkle" />
      </div>
      
      {/* Floating Orbs */}
      <div className="fixed top-[5%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-neon/8 blur-[150px] animate-float-orb1 pointer-events-none z-0" />
      <div className="fixed top-[50%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-neon/5 blur-[140px] animate-float-orb2 pointer-events-none z-0" />
      <div className="fixed bottom-[5%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/5 blur-[130px] animate-float-orb3 pointer-events-none z-0" />
      
      {/* Rotating Rings */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-neon/10 animate-slow-rotate pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-neon/5 animate-slow-rotate-reverse pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-neon/3 animate-slow-rotate pointer-events-none z-0" style={{ animationDuration: '80s' }} />
      
      {/* Scanning Light Beam */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-neon/40 to-transparent animate-scan" />
      </div>
      
      {/* Subtle Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#050505] via-transparent to-[#050505] opacity-60 pointer-events-none z-0" />

      {/* Sticky Premium Navbar */}
      <nav className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logoPng} 
              alt="Pepe Grinch Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-display text-2xl tracking-tighter text-white uppercase">
              PEPE GRINCH
            </span>
          </div>
          
          {/* Desktop Navigation - Updated with only existing sections */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase font-bold tracking-widest text-neutral-400">
            <a href="#thesis" className="hover:text-neon transition-colors">THE NARRATIVE</a>
            <a href="#how-to-buy" className="hover:text-neon transition-colors">HOW TO BUY</a>
            <a href="#grinchnomics" className="hover:text-neon transition-colors">GRINCHONOMICS</a>
            <a href="#chart" className="hover:text-neon transition-colors">LIVE CHART</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://t.me/pepegrinchton" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-none text-neutral-400 hover:text-neon hover:bg-neutral-900 transition-all"
              title="Telegram Channel"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://dexscreener.com/ton/eqdpvwtqr53cwgat_vcfsmrleg5fbvsttjmrvyvprf_roc9z"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-6 py-2.5 border border-white text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-none"
            >
              Buy Now
            </a>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Updated with only existing sections */}
        <div className={`md:hidden fixed top-16 left-0 right-0 bg-[#050505]/98 backdrop-blur-md border-b border-white/10 transition-all duration-300 z-40 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="flex flex-col py-4 px-4 space-y-3">
            <a href="#thesis" className="py-3 px-4 text-sm font-mono uppercase tracking-widest text-neutral-400 hover:text-neon hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>THE NARRATIVE</a>
            <a href="#how-to-buy" className="py-3 px-4 text-sm font-mono uppercase tracking-widest text-neutral-400 hover:text-neon hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>HOW TO BUY</a>
            <a href="#grinchnomics" className="py-3 px-4 text-sm font-mono uppercase tracking-widest text-neutral-400 hover:text-neon hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>GRINCHONOMICS</a>
            <a href="#chart" className="py-3 px-4 text-sm font-mono uppercase tracking-widest text-neutral-400 hover:text-neon hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>LIVE CHART</a>
            <div className="pt-2 px-4">
              <a
                href="https://dexscreener.com/ton/eqdpvwtqr53cwgat_vcfsmrleg5fbvsttjmrvyvprf_roc9z"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 bg-neon text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors rounded-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Presentation Section */}
      <header className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Narrative Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block relative">
              <span className="text-neon font-display text-xl mb-2 tracking-[0.2em] uppercase font-bold block">
                MEME NARRATIVE THESIS — TON
              </span>
              <div className="h-[3px] w-24 bg-neon" />
            </div>

            <h1 className="font-display text-[72px] sm:text-[140px] leading-[0.8] tracking-tighter text-white uppercase">
              PEPE <br />
              <span className="text-neon">GRINCH</span>
            </h1>

            <div className="text-neon font-mono text-xl font-bold tracking-widest">
              $GRINCH
            </div>

            <div className="space-y-4 max-w-xl">
              <p className="text-xl sm:text-2xl font-sans font-medium text-neutral-100 leading-relaxed">
                Every chain gets a Pepe.
              </p>
              <p className="text-xl sm:text-2xl font-sans text-neutral-300 leading-relaxed">
                TON didn't need one.
              </p>
              <p className="text-2xl sm:text-3xl font-sans font-bold text-neon leading-relaxed">
                It already had one.
              </p>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />
              <p className="text-lg sm:text-xl font-sans font-medium text-white leading-relaxed">
                The Face of <span className="text-neon">FOMO</span>.
              </p>
              <p className="text-lg sm:text-xl font-sans font-medium text-white leading-relaxed">
                The Face of <span className="text-neon">Regret</span>.
              </p>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />
              <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
                Created by <span className="text-white font-bold">Egor Zhgun</span>,
                the artist behind <span className="text-neon">$UTYA</span>, <span className="text-neon">Baby $YODA</span>,
                and some of Telegram's most recognizable characters.
              </p>
            </div>

            {/* Statistics Block */}
            <div className="flex flex-wrap gap-8 sm:gap-12 mt-12 border-l-4 border-neon pl-6 sm:pl-8">
              <div className="flex flex-col">
                <span className="text-xs uppercase opacity-50 font-mono tracking-wider mb-1">Market Cap</span>
                <span className="text-2xl sm:text-3xl font-black font-display text-white">
                  {marketData.loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : marketData.error ? (
                    <span className="text-red-500 text-sm">Error</span>
                  ) : (
                    formatMarketCap(marketData.marketCap)
                  )}
                </span>
                {marketData.priceChange && !marketData.loading && !marketData.error && (
                  <span className={`text-xs font-mono mt-1 ${marketData.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {marketData.priceChange >= 0 ? '▲' : '▼'} {Math.abs(marketData.priceChange).toFixed(2)}%
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase opacity-50 font-mono tracking-wider mb-1">Liquidity</span>
                <span className="text-2xl sm:text-3xl font-black font-display text-white">
                  {marketData.loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : marketData.error ? (
                    <span className="text-red-500 text-sm">Unavailable</span>
                  ) : (
                    formatLiquidity(marketData.liquidity)
                  )}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase opacity-50 font-mono tracking-wider mb-1">Price</span>
                <span className="text-xl sm:text-2xl font-black font-display text-neon">
                  {marketData.loading ? (
                    <span className="animate-pulse text-white">Loading...</span>
                  ) : marketData.error ? (
                    <span className="text-red-500 text-sm">N/A</span>
                  ) : (
                    formatPrice(marketData.price)
                  )}
                </span>
              </div>
            </div>

            {/* CA Copy Bar */}
            <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center bg-[#111] p-4 sm:p-5 border border-white/10 max-w-2xl">
              <div className="flex-1 font-mono text-xs sm:text-sm opacity-60 overflow-hidden text-ellipsis select-all py-2 sm:py-0">
                {displayAddress}
              </div>
              <button 
                onClick={copyContractAddress}
                className="ml-0 sm:ml-4 mt-3 sm:mt-0 px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neon hover:text-black hover:scale-105 active:scale-95 transition-all text-center rounded-none"
              >
                {copiedCA ? "Copied!" : "Copy CA"}
              </button>
            </div>

            {/* <div className="flex flex-wrap items-center gap-6 pt-2">
              <a 
                href="#manifesto-crawl" 
                className="text-xs font-mono text-neutral-400 hover:text-neon transition-colors flex items-center gap-1.5"
              >
                Read The Manifesto <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-neutral-800 font-mono">|</span>
              <span className="text-neutral-500 font-mono text-xs">2026 · Not financial advice</span>
            </div> */}
          </div>

          {/* Hero Right Avatar Graphic Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-neon/15 rounded-full blur-[50px] group-hover:bg-neon/25 transition-all duration-300" />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
              >
                <img 
                  src={logoPng} 
                  alt="Pepe Grinch Logo" 
                  className="w-48 h-48 sm:w-68 sm:h-68 lg:w-88 lg:h-88 drop-shadow-[0_10px_40px_rgba(57,255,20,0.25)] animate-float object-contain"
                />
              </motion.div>
            </div>
          </div>

        </div>

        {/* Decorative Divider */}
        {/* <div className="border-b border-white/10 mt-16 sm:mt-20 pt-4 flex justify-between items-center text-xs text-neutral-500 font-mono">
          <span>DON'T GET GRINCHED.</span>
          <span>$GRINCH — TON COIN NARRATIVE</span>
        </div> */}
      </header>
            {/* ===== SECTION 2: WHY PEPE GRINCH? ===== */}
      <section id="thesis" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#050505] border-b border-white/5 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-6">
            <div className="inline-block relative">
              <span className="text-neon font-mono text-sm tracking-[0.2em] uppercase font-bold block">
                WHY PEPE GRINCH?
              </span>
              <div className="h-[3px] w-16 bg-neon mt-1" />
            </div>

            <div className="space-y-3">
              <p className="text-2xl sm:text-3xl text-white font-display leading-tight">
                Pepe is <span className="text-neon">internet culture.</span>
              </p>
              <p className="text-2xl sm:text-3xl text-white font-display leading-tight">
                Pepe Grinch is <span className="text-neon">trader culture.</span>
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-neutral-400 font-sans leading-relaxed">
                Every trader knows this character. Every cycle creates millions of them.
              </p>
            </div>

            <div className="pt-2">
              <p className="text-white font-bold text-lg leading-relaxed">
                SAW IT.<br />
                UNDERSTOOD IT.<br />
                DIDN'T BUY IT.<br />
                <span className="text-neon text-2xl">NOW WATCHING.</span>
              </p>
            </div>

            <div className="inline-block px-4 py-2 bg-neon/10 border border-neon/30">
              <span className="text-neon font-bold text-lg tracking-wider">THAT'S PEPE GRINCH.</span>
            </div>

            <p className="text-neutral-500 text-sm italic">
              If you understood this, you've already been Grinched.
            </p>
          </div>

          {/* Right Side - 3 GIFs */}
          <div className="space-y-6">
            {/* GIF 1 - Sold too early */}
            <div className="group flex items-center gap-4 p-4 bg-[#0d0d0d] border border-white/10 rounded-xl hover:border-red-500/50 transition-all duration-300">
              <img src={sticker1} alt="Sold too early" className="w-16 h-16 object-contain group-hover:scale-105 transition-transform" />
              <div>
                <p className="text-red-500 font-bold text-sm uppercase tracking-wider">SOLD TOO EARLY</p>
                <p className="text-neutral-400 italic text-xs">"I'll buy back lower."</p>
              </div>
            </div>

            {/* GIF 2 - Waited for better entry */}
            <div className="group flex items-center gap-4 p-4 bg-[#0d0d0d] border border-white/10 rounded-xl hover:border-yellow-500/50 transition-all duration-300">
              <img src={sticker2} alt="Waited for better entry" className="w-16 h-16 object-contain group-hover:scale-105 transition-transform" />
              <div>
                <p className="text-yellow-500 font-bold text-sm uppercase tracking-wider">WAITED FOR A BETTER ENTRY</p>
                <p className="text-neutral-400 italic text-xs">"It'll retrace."</p>
              </div>
            </div>

            {/* GIF 3 - Watched it go 100x */}
            <div className="group flex items-center gap-4 p-4 bg-[#0d0d0d] border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300">
              <img src={sticker3} alt="Watched it go 100x" className="w-16 h-16 object-contain group-hover:scale-105 transition-transform" />
              <div>
                <p className="text-purple-500 font-bold text-sm uppercase tracking-wider">WATCHED IT GO 100X</p>
                <p className="text-neutral-400 italic text-xs">"I knew about it at launch."</p>
              </div>
            </div>
          </div>

        </div>
      </section>

            {/* ===== SECTION 3: THE EGOR CONNECTION ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#050505] border-b border-white/5 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Sticker Image */}
          <div className="flex justify-center items-center order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-neon/20 rounded-full blur-[60px] group-hover:bg-neon/30 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 group-hover:border-neon/30 transition-all duration-300">
                <img 
                  src={sticker5} 
                  alt="Egor Zhgun Sticker" 
                  className="w-56 h-56 sm:w-72 sm:h-72 object-contain group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full border border-neon/30">
                  <span className="text-[8px] sm:text-[10px] font-mono text-neon uppercase tracking-wider">Egor Zhgun Original</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-block relative">
              <span className="text-neon font-mono text-sm tracking-[0.2em] uppercase font-bold block">
                THE EGOR CONNECTION
              </span>
              <div className="h-[3px] w-16 bg-neon mt-1" />
            </div>

            <p className="text-xl sm:text-2xl text-white font-display leading-tight">
              Most meme coins create a token and then search for a story.
            </p>

            <p className="text-2xl sm:text-3xl text-neon font-display font-bold leading-tight">
              Pepe Grinch already had one.
            </p>

            <div className="space-y-4 text-neutral-400 font-sans leading-relaxed">
              <p>
                Created by <span className="text-white font-bold">Egor Zhgun</span>, the artist behind 
                <span className="text-neon"> $UTYA</span>, <span className="text-neon"> Baby $YODA</span>, 
                <span className="text-neon"> ZOICH</span>, and some of Telegram's most recognizable characters.
              </p>
              <p>
                A generation of Telegram-native internet culture.
              </p>
              <p className="text-white font-semibold">
                A character first. A token second.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-3 py-1 bg-neon/10 border border-neon/20 rounded-full text-xs text-neon font-mono">$UTYA</span>
              <span className="px-3 py-1 bg-neon/10 border border-neon/20 rounded-full text-xs text-neon font-mono">Baby $YODA</span>
              <span className="px-3 py-1 bg-neon/10 border border-neon/20 rounded-full text-xs text-neon font-mono">ZOICH</span>
              <span className="px-3 py-1 bg-neon/10 border border-neon/20 rounded-full text-xs text-neon font-mono">Telegram Stickers</span>
            </div>
          </div>

        </div>
      </section>

            {/* ===== SECTION 4: MEET THE MANY FACES with Stickers ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#050505] border-b border-white/5 z-10 relative">
        <div className="text-center mb-12">
          <div className="inline-block relative mb-4">
            <span className="text-neon font-mono text-sm tracking-[0.2em] uppercase font-bold block">
              MEET THE MANY FACES
            </span>
            <div className="h-[3px] w-16 bg-neon mx-auto mt-1" />
          </div>

          <p className="text-xl sm:text-2xl text-white font-display leading-tight">
            Every trader has been at least one of them.
          </p>

          <div className="inline-block px-4 py-2 bg-neon/10 border border-neon/30 mt-6">
            <span className="text-neon font-bold text-base tracking-wider">12 Faces. 12 Ways to Get Grinched.</span>
          </div>

          <p className="text-neutral-500 text-sm italic mt-4">Which one are you?</p>
        </div>

        {/* All 15 GIFs Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="bg-[#0d0d0d] border border-white/10 rounded-xl p-3 hover:border-neon/30 transition-all duration-300 hover:scale-105">
              <img 
                src={`/assets/stickers/${i + 1}.gif`} 
                alt={`Grinch Sticker ${i + 1}`}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      

           {/* ===== CALL TO ACTION SECTION ===== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-transparent to-neon/5 rounded-3xl blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-neon/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-neon/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/20 rounded-full mb-6">
            <Flame className="w-4 h-4 text-neon" />
            <span className="text-xs font-mono text-neon uppercase tracking-widest font-bold">
              Join The Movement
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tighter leading-tight">
            JOIN THE <span className="text-neon">COMMUNITY</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {/* Buy $GRINCH Button */}
            <a
              href="https://dexscreener.com/ton/eqdpvwtqr53cwgat_vcfsmrleg5fbvsttjmrvyvprf_roc9z"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-neon text-black rounded-xl font-mono text-base font-bold hover:bg-white transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              Buy $GRINCH
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Join Telegram Button */}
            <a
              href="https://t.me/pepegrinchton"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-black border border-white/20 rounded-xl text-white font-mono text-base font-semibold hover:border-neon/50 hover:bg-neon/5 transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Join Telegram
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Follow on X Button */}
            <a
              href="https://x.com/thegrinchpepe"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-black border border-white/20 rounded-xl text-white font-mono text-base font-semibold hover:border-neon/50 hover:bg-neon/5 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 fill-current group-hover:text-neon transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow on X
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <p className="text-[10px] text-neutral-500 font-mono mt-8">
            Be the first to know. Alpha, stickers, and community events.
          </p>
        </div>
      </section>

            {/* ===== HOW TO BUY SECTION ===== */}
      <section id="how-to-buy" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#050505] border-y border-white/5 z-10 relative">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-full mb-4">
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-[#39FF14]" />
            <span className="text-[10px] sm:text-xs font-mono text-[#39FF14] uppercase tracking-widest font-bold">
              Step by Step Guide
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none">
            HOW TO <span className="text-[#39FF14]">BUY</span>
          </h2>
          <p className="text-neutral-400 font-sans mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Join the Grinch movement in 4 simple steps. Don't get left behind.
          </p>
          <div className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent mx-auto mt-4 sm:mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Step 1 */}
          <div className="group relative bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-[#39FF14]/30 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -top-3 left-4 sm:left-6 w-7 h-7 sm:w-8 sm:h-8 bg-[#39FF14] text-black rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">1</div>
            <div className="pt-4 sm:pt-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#39FF14]/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#39FF14]/20 transition-colors">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Get a TON Wallet</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">Download <span className="text-white font-semibold">Tonkeeper</span> or <span className="text-white font-semibold">Wallet.tg</span> from Telegram.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-[#39FF14]/30 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -top-3 left-4 sm:left-6 w-7 h-7 sm:w-8 sm:h-8 bg-[#39FF14] text-black rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">2</div>
            <div className="pt-4 sm:pt-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#39FF14]/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#39FF14]/20 transition-colors">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Buy TON</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">Purchase <span className="text-white font-semibold">TON</span> on Bybit, OKX, or directly in Tonkeeper.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-[#39FF14]/30 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -top-3 left-4 sm:left-6 w-7 h-7 sm:w-8 sm:h-8 bg-[#39FF14] text-black rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">3</div>
            <div className="pt-4 sm:pt-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#39FF14]/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#39FF14]/20 transition-colors">
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Swap on DEX</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">Go to <span className="text-white font-semibold">DeDust</span> or <span className="text-white font-semibold">STON.fi</span> and swap TON for <span className="text-[#39FF14] font-semibold">$GRINCH</span>.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="group relative bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-[#39FF14]/30 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -top-3 left-4 sm:left-6 w-7 h-7 sm:w-8 sm:h-8 bg-[#39FF14] text-black rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">4</div>
            <div className="pt-4 sm:pt-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#39FF14]/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#39FF14]/20 transition-colors">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">HODL & Don't Get Grinched</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">Hold tight. Join the community. <span className="text-[#39FF14]">Don't get Grinched!</span></p>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-flex flex-wrap gap-3 sm:gap-4 justify-center">
            <a href="https://app.tonkeeper.com/" target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-2 sm:py-3 bg-[#0d0d0d] border border-white/10 rounded-xl text-white font-mono text-xs sm:text-sm hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 transition-all">Download Tonkeeper →</a>
            <a href="https://dedust.io/" target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-2 sm:py-3 bg-[#0d0d0d] border border-white/10 rounded-xl text-white font-mono text-xs sm:text-sm hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 transition-all">Trade on DeDust →</a>
            <a href="https://app.ston.fi/" target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-2 sm:py-3 bg-[#0d0d0d] border border-white/10 rounded-xl text-white font-mono text-xs sm:text-sm hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 transition-all">Trade on STON.fi →</a>
          </div>
        </div>
      </section>

      {/* ===== GRINCHONOMICS SECTION ===== */}
      <section id="grinchnomics" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#050505] z-10 relative">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-full mb-4">
            <PieChart className="w-3 h-3 sm:w-4 sm:h-4 text-[#39FF14]" />
            <span className="text-[10px] sm:text-xs font-mono text-[#39FF14] uppercase tracking-widest font-bold">
              Token Distribution
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none">
            GRINCH<span className="text-[#39FF14]">ONOMICS</span>
          </h2>
          <div className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent mx-auto mt-4 sm:mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Supply Info */}
          <div className="space-y-5 sm:space-y-6">
            {/* Total Supply Card */}
            <div className="bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-[#39FF14]/20 rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-neutral-400 font-mono text-xs sm:text-sm uppercase tracking-wider mb-2">Total Supply</p>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#39FF14] mb-2">1,000,000,000</div>
              <p className="text-white font-semibold text-base sm:text-lg">Pepe Grinch GRINCH</p>
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent mx-auto my-3" />
              <p className="text-[11px] sm:text-xs text-neutral-400">Max Supply: 1,000,000,000 GRINCH</p>
            </div>

            {/* 100% LP Distribution */}
            <div className="bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-5 sm:p-6">
              <div className="text-center mb-3 sm:mb-4">
                <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-[#39FF14]/10 rounded-full mb-2 sm:mb-3">
                  <Lock className="w-3 h-3 text-[#39FF14]" />
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#39FF14] uppercase tracking-widest">Fair Launch</span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-[#39FF14] mb-2">100%</div>
                <div className="text-white font-semibold text-base sm:text-lg">Added to Liquidity Pool</div>
                <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent mx-auto my-2 sm:my-3" />
                <p className="text-[10px] sm:text-xs text-neutral-400 max-w-xs mx-auto">
                  Zero team allocation. Zero presale. Zero private sale. 
                  Every single token was added to LP at launch.
                </p>
              </div>
            </div>

            {/* Distribution Breakdown */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center p-3 sm:p-4 bg-[#0d0d0d] border border-white/5 rounded-xl hover:border-[#39FF14]/20 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#39FF14]" />
                  <span className="text-white font-medium text-sm sm:text-base">Liquidity Pool</span>
                </div>
                <span className="text-[#39FF14] font-bold text-lg sm:text-xl">100%</span>
              </div>
              <div className="flex justify-between items-center p-3 sm:p-4 bg-[#0d0d0d]/50 border border-white/5 rounded-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-neutral-600" />
                  <span className="text-neutral-500 font-medium text-sm sm:text-base">Team / Presale / Private</span>
                </div>
                <span className="text-neutral-500 font-bold text-lg sm:text-xl">0%</span>
              </div>
            </div>
          </div>

          {/* Right Side - Tokenomics Highlights */}
          <div className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-[#39FF14]/30 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#39FF14]/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14]" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">0%</div>
                <div className="text-[10px] sm:text-xs text-neutral-400 font-mono mt-1">Buy/Sell Tax</div>
              </div>
              <div className="bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-[#39FF14]/30 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#39FF14]/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14]" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
                <div className="text-[10px] sm:text-xs text-neutral-400 font-mono mt-1">Community Owned</div>
              </div>
              <div className="bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-[#39FF14]/30 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#39FF14]/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14]" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">🔒</div>
                <div className="text-[10px] sm:text-xs text-neutral-400 font-mono mt-1">LP Locked Forever</div>
              </div>
              <div className="bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-[#39FF14]/30 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#39FF14]/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14]" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">✓</div>
                <div className="text-[10px] sm:text-xs text-neutral-400 font-mono mt-1">Contract Renounced</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#39FF14]/5 to-transparent border-l-4 border-[#39FF14] p-4 sm:p-5 rounded-r-2xl">
              <p className="text-xs sm:text-sm text-white font-semibold mb-2">⚡ Fair Launch Principles</p>
              <div className="space-y-1 text-[10px] sm:text-xs text-neutral-400">
                <div className="flex items-center gap-2">✓ No presale</div>
                <div className="flex items-center gap-2">✓ No private sale</div>
                <div className="flex items-center gap-2">✓ No team allocation</div>
                <div className="flex items-center gap-2">✓ 100% of supply added to LP at launch</div>
                <div className="flex items-center gap-2">✓ Liquidity locked forever</div>
              </div>
            </div>

            {/* Contract Address */}
            <div className="bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-400 font-mono text-[10px] sm:text-xs">Contract Address (TON)</span>
                <button onClick={copyContractAddress} className="text-[#39FF14] hover:text-white transition-colors">
                  {copiedCA ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                </button>
              </div>
              <code className="text-[9px] sm:text-[10px] font-mono text-white break-all bg-black/50 p-2 rounded-lg block">
                {contractAddress}
              </code>
              <p className="text-[8px] sm:text-[9px] text-neutral-500 font-mono mt-2">Always verify contract address before swapping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-10 sm:py-12 text-[10px] sm:text-xs text-neutral-500 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <img src={logoPng} alt="Pepe Grinch Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain opacity-80" />
            <span className="font-display tracking-tight text-white text-base sm:text-lg">PEPE GRINCH</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 font-mono text-neutral-400 uppercase tracking-wider text-[9px] sm:text-[11px]">
            <a href="#how-to-buy" className="hover:text-neon transition-colors">How to Buy</a>
            <a href="#grinchnomics" className="hover:text-neon transition-colors">GRINCHONOMICS</a>
            <a href="https://dexscreener.com/ton/eqdpvwtqr53cwgat_vcfsmrleg5fbvsttjmrvyvprf_roc9z" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors">DexScreener</a>
            <a href="https://t.me/pepegrinchton" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors">Telegram</a>
            <a href="https://x.com/thegrinchpepe" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors">X (Twitter)</a>
          </div>

          <div className="font-mono text-neutral-500 tracking-wider text-[9px] sm:text-[11px]">
            $GRINCH — DON'T GET GRINCHED · 2026
          </div>
        </div>
      </footer>

      {/* Marquee */}
      <div className="h-12 sm:h-16 bg-neon flex items-center overflow-hidden w-full select-none cursor-default font-display uppercase text-black text-base sm:text-xl lg:text-2xl font-black border-t-2 border-black/20">
        <div className="animate-marquee whitespace-nowrap flex space-x-6 sm:space-x-12 items-center">
          <span>$GRINCH</span>
          <span>•</span>
          <span>THE FACE OF FOMO</span>
          <span>•</span>
          <span>$GRINCH</span>
          <span>•</span>
          <span>THE FACE OF REGRET</span>
          <span>•</span>
          <span>$GRINCH</span>
          <span>•</span>
          <span>EGOR ZHGUN</span>
          <span>•</span>
          <span>$GRINCH</span>
          <span>•</span>
          <span>DON'T GET GRINCHED</span>
          <span>•</span>
          <span>$GRINCH</span>
          <span>•</span>
          <span>UTYA</span>
          <span>•</span>
          <span>$GRINCH</span>
          <span>•</span>
          <span>BABY YODA</span>
          <span>•</span>
          <span>$GRINCH</span>
          <span>•</span>
          <span>TON NATIVE</span>
          <span>•</span>
          <span>$GRINCH</span>
        </div>
      </div>
    </div>
  );
}