// app/contest/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ExternalLink, 
  TrendingUp, 
  Activity, 
  ShieldAlert, 
  Flame, 
  Copy, 
  Check, 
  ShoppingCart,
  PieChart,
  Rocket,
  Menu,
  X,
  Users,
  Trophy,
  Crown,
  Medal,
  Star,
  Twitter,
  Wallet,
  UserCheck,
  Scan,
  MessageCircle,
  BookOpen,
  Volume2,
  Info
} from "lucide-react";
import { motion } from "motion/react";

// Assets (same as your main page)
const logoPng = "/assets/logo.PNG";
const sticker1 = "/assets/stickers/8.gif";
const sticker2 = "/assets/stickers/13.gif";
const sticker3 = "/assets/stickers/4.gif";
const sticker5 = "/assets/stickers/5.gif";

export default function ContestPage() {
  const [copiedCA, setCopiedCA] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // ===== CONTEST STATE =====
  const [entries, setEntries] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [winners, setWinners] = useState([]);
  const [userEntry, setUserEntry] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contestEnded, setContestEnded] = useState(false);
  
  // ===== USER STATE (X Auth) =====
  const [user, setUser] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Contract address
  const contractAddress = "EQA6G0uVERDZTkLNa0drWBna1F5TSbogy7UXEWU5ERHz4uJL";
  const displayAddress = `${contractAddress.slice(0, 6)}...${contractAddress.slice(-6)}`;

  // ===== CONTEST DATA =====
  const PRIZE_POOL = 6000000;
  const CONTEST_END_DATE = "2026-07-01T23:59:59Z";

  // ===== LOAD FROM LOCALSTORAGE =====
  useEffect(() => {
    // Load entries
    const savedEntries = localStorage.getItem('contest_entries');
    if (savedEntries) setEntries(JSON.parse(savedEntries));

    // Load user
    const savedUser = localStorage.getItem('contest_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    // Load winners
    const savedWinners = localStorage.getItem('contest_winners');
    if (savedWinners) setWinners(JSON.parse(savedWinners));

    // Check if contest ended
    if (new Date() > new Date(CONTEST_END_DATE)) {
      setContestEnded(true);
    }
  }, []);

  // ===== UPDATE LEADERBOARD =====
  useEffect(() => {
    if (entries.length > 0) {
      const ranked = [...entries]
        .sort((a, b) => b.points - a.points)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));
      setLeaderboard(ranked);
    }
  }, [entries]);

  // ===== X AUTH =====
  const connectX = () => {
    setIsConnecting(true);
    // Simulate X OAuth flow
    // In production, redirect to your backend OAuth endpoint
    setTimeout(() => {
      const mockUser = {
        id: "123456789",
        username: "grinch_fan",
        name: "Grinch Fan",
        profileImage: "https://pbs.twimg.com/profile_images/...",
        followers: 1234,
        verified: false,
        connectedAt: new Date().toISOString()
      };
      setUser(mockUser);
      localStorage.setItem('contest_user', JSON.stringify(mockUser));
      setIsConnecting(false);
    }, 1500);
  };

  // ===== SUBMIT ENTRY =====
  const submitEntry = (content, postUrl = null) => {
    if (!user) {
      alert("Please connect your X account first!");
      return;
    }

    setIsSubmitting(true);

    // Calculate points (mock engagement simulation)
    const mockPoints = Math.floor(Math.random() * 50) + 10;
    
    const newEntry = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      userImage: user.profileImage,
      content: content,
      postUrl: postUrl,
      points: mockPoints,
      engagement: {
        likes: Math.floor(Math.random() * 20),
        retweets: Math.floor(Math.random() * 10),
        replies: Math.floor(Math.random() * 5)
      },
      submittedAt: new Date().toISOString(),
      verified: false
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('contest_entries', JSON.stringify(updatedEntries));
    setUserEntry(newEntry);
    setIsSubmitting(false);
  };

  // ===== DECLARE WINNERS =====
  const declareWinners = () => {
    if (entries.length === 0) return;

    const sorted = [...entries].sort((a, b) => b.points - a.points);
    const topWinners = sorted.slice(0, 10);
    
    // Distribute prize pool
    const totalPoints = topWinners.reduce((sum, w) => sum + w.points, 0);
    
    const winnersWithPrizes = topWinners.map((winner, index) => ({
      ...winner,
      rank: index + 1,
      prize: Math.floor((winner.points / totalPoints) * PRIZE_POOL),
      prizeClaimed: false
    }));

    setWinners(winnersWithPrizes);
    localStorage.setItem('contest_winners', JSON.stringify(winnersWithPrizes));
    setContestEnded(true);
  };

  // ===== COPY CONTRACT =====
  const copyContractAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  // ===== RENDER ENTRY FORM =====
  const renderEntryForm = () => (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-[#39FF14]" />
        Submit Your Meme
      </h3>
      <p className="text-sm text-neutral-400 mb-4">
        Share your best Pepe Grinch meme for a chance to win!
      </p>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;
        const content = form.content.value;
        const postUrl = form.postUrl.value;
        if (content.trim()) {
          submitEntry(content, postUrl);
          form.reset();
        }
      }}>
        <textarea
          name="content"
          placeholder="Describe your meme or paste your X post..."
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#39FF14] transition-colors min-h-[80px] text-sm"
          required
        />
        <input
          name="postUrl"
          type="url"
          placeholder="X/Twitter post URL (optional)"
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#39FF14] transition-colors mt-3 text-sm"
        />
        <button
          type="submit"
          disabled={isSubmitting || contestEnded}
          className="w-full mt-4 bg-[#39FF14] text-black font-bold py-3 rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : contestEnded ? "Contest Ended" : "Submit Entry"}
        </button>
      </form>
    </div>
  );

  // ===== RENDER LEADERBOARD =====
  const renderLeaderboard = () => (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Leaderboard
        </h3>
        <span className="text-xs text-neutral-500">{leaderboard.length} entries</span>
      </div>

      {leaderboard.length === 0 ? (
        <div className="text-center py-8 text-neutral-500">
          <Users className="w-12 h-12 mx-auto text-neutral-700 mb-2" />
          <p className="text-sm">No entries yet.</p>
          <p className="text-xs">Be the first to submit!</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {leaderboard.slice(0, 20).map((entry, index) => (
            <div
              key={entry.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                index < 3 ? 'bg-[#39FF14]/5 border border-[#39FF14]/20' : 'hover:bg-white/5'
              }`}
            >
              <div className="w-8 text-center font-bold text-sm text-neutral-500">
                #{index + 1}
              </div>
              
              <div className="flex-1 flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-neutral-700 flex-shrink-0 overflow-hidden">
                  {entry.userImage ? (
                    <img src={entry.userImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                      {entry.username?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                </div>
                <div className="truncate">
                  <p className="text-sm text-white font-medium truncate">
                    @{entry.username}
                    {index < 3 && (
                      <span className="ml-1">
                        {index === 0 && '👑'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-[#39FF14]">
                  {entry.points}
                </p>
                <p className="text-[10px] text-neutral-500">pts</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ===== RENDER WINNERS =====
  const renderWinners = () => {
    if (winners.length === 0) return null;

    return (
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-400" />
          🏆 Winners
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {winners.slice(0, 10).map((winner) => (
            <div
              key={winner.id}
              className={`p-4 rounded-xl text-center ${
                winner.rank === 1 
                  ? 'bg-yellow-500/10 border border-yellow-500/30' 
                  : 'glass-card'
              }`}
            >
              <div className="text-2xl font-bold gradient-text">
                #{winner.rank}
              </div>
              <p className="text-sm text-white font-medium">@{winner.username}</p>
              <p className="text-lg font-bold text-[#39FF14]">
                {winner.prize.toLocaleString()} $GRINCH
              </p>
              <p className="text-xs text-neutral-500">
                {winner.points} points
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ===== RENDER USER STATUS =====
  const renderUserStatus = () => (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-neutral-700 flex-shrink-0 overflow-hidden">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl text-neutral-400">
              {user?.username?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">{user?.name || 'User'}</p>
          <p className="text-sm text-neutral-400 truncate">@{user?.username}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="status-dot active"></span>
            <span className="text-xs text-neutral-500">Connected</span>
          </div>
        </div>
        <button
          onClick={() => {
            setUser(null);
            localStorage.removeItem('contest_user');
          }}
          className="text-xs text-neutral-500 hover:text-red-400 transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );

  // ===== MAIN RENDER =====
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans antialiased">
      
      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={logoPng} alt="Pepe Grinch Logo" className="w-10 h-10 object-contain" />
            <span className="font-display text-2xl tracking-tighter text-white uppercase">
              PEPE GRINCH
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase font-bold tracking-widest text-neutral-400">
            <a href="/" className="hover:text-[#39FF14] transition-colors">HOME</a>
            <a href="/contest" className="text-[#39FF14] transition-colors">CONTEST</a>
            <a href="#grinchnomics" className="hover:text-[#39FF14] transition-colors">GRINCHONOMICS</a>
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <button
                onClick={connectX}
                disabled={isConnecting}
                className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white text-xs font-bold rounded-lg hover:bg-[#1a8cd8] transition-all disabled:opacity-50"
              >
                <Twitter className="w-4 h-4" />
                {isConnecting ? "Connecting..." : "Connect X"}
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-2 text-sm text-neutral-400">
                <span className="text-[#39FF14]">●</span>
                @{user.username}
              </div>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-16 left-0 right-0 bg-[#050505]/98 backdrop-blur-md border-b border-white/10 transition-all duration-300 z-40 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="flex flex-col py-4 px-4 space-y-3">
            <a href="/" className="py-3 px-4 text-sm font-mono uppercase tracking-widest text-neutral-400 hover:text-[#39FF14] hover:bg-white/5 transition-colors">HOME</a>
            <a href="/contest" className="py-3 px-4 text-sm font-mono uppercase tracking-widest text-[#39FF14] hover:bg-white/5 transition-colors">CONTEST</a>
            <a href="#grinchnomics" className="py-3 px-4 text-sm font-mono uppercase tracking-widest text-neutral-400 hover:text-[#39FF14] hover:bg-white/5 transition-colors">GRINCHONOMICS</a>
          </div>
        </div>
      </nav>

      {/* ===== CONTEST HERO ===== */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-full mb-6">
            <Trophy className="w-4 h-4 text-[#39FF14]" />
            <span className="text-xs font-mono text-[#39FF14] uppercase tracking-widest font-bold">
              Live Contest
            </span>
          </div>
          
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tighter leading-none">
            <span className="gradient-text">$GRINCH</span>
            <br />
            <span className="text-4xl sm:text-5xl md:text-6xl">MEME CONTEST</span>
          </h1>

          <div className="glass-card rounded-2xl p-6 mt-8 max-w-2xl mx-auto">
            <p className="text-4xl font-bold gradient-text">{PRIZE_POOL.toLocaleString()}</p>
            <p className="text-sm text-neutral-400">Total Prize Pool</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="glass-card rounded-xl px-6 py-3 text-center min-w-[120px]">
              <p className="text-2xl font-bold text-white">{entries.length}</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Entries</p>
            </div>
            <div className="glass-card rounded-xl px-6 py-3 text-center min-w-[120px]">
              <p className="text-2xl font-bold text-white">{leaderboard.filter(e => e.rank <= 10).length}</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Winners</p>
            </div>
            <div className="glass-card rounded-xl px-6 py-3 text-center min-w-[120px]">
              <p className="text-2xl font-bold text-white">
                {contestEnded ? '🎉' : 'Active'}
              </p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Status</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTEST DASHBOARD ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Entry Form & User Status */}
          <div className="lg:col-span-2 space-y-6">
            {user ? renderUserStatus() : (
              <div className="glass-card rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-[#1DA1F2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Twitter className="w-8 h-8 text-[#1DA1F2]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Connect Your X Account</h3>
                <p className="text-sm text-neutral-400 mb-6">
                  Connect to submit entries and track your rank
                </p>
                <button
                  onClick={connectX}
                  disabled={isConnecting}
                  className="px-8 py-3 bg-[#1DA1F2] text-white font-bold rounded-xl hover:bg-[#1a8cd8] transition-all disabled:opacity-50"
                >
                  {isConnecting ? "Connecting..." : "Connect X"}
                </button>
              </div>
            )}

            {user && renderEntryForm()}
            
            {/* Winners Section */}
            {winners.length > 0 && renderWinners()}
          </div>

          {/* Right Column - Leaderboard */}
          <div>
            {renderLeaderboard()}
            
            {/* Contest Info */}
            <div className="glass-card rounded-2xl p-6 mt-6">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-neutral-500" />
                Contest Rules
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF14] mt-0.5">•</span>
                  Submit your best Pepe Grinch meme
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF14] mt-0.5">•</span>
                  Earn points based on engagement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF14] mt-0.5">•</span>
                  Top 10 split 6M $GRINCH prize pool
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF14] mt-0.5">•</span>
                  Contest ends July 1, 2026
                </li>
              </ul>
              
              {!contestEnded && user && entries.length > 0 && (
                <button
                  onClick={declareWinners}
                  className="w-full mt-4 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-bold rounded-xl hover:bg-yellow-500/30 transition-all text-sm"
                >
                  🏆 Declare Winners (Admin)
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#050505] border-t border-white/5 py-8 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={logoPng} alt="Pepe Grinch Logo" className="w-6 h-6 object-contain" />
            <span className="font-display text-white">PEPE GRINCH</span>
          </div>
          <div className="flex gap-6 font-mono uppercase tracking-wider text-[10px]">
            <a href="/" className="hover:text-[#39FF14] transition-colors">Home</a>
            <a href="/contest" className="text-[#39FF14] transition-colors">Contest</a>
            <a href="https://t.me/grinchgramCTO" target="_blank" rel="noopener noreferrer" className="hover:text-[#39FF14] transition-colors">Telegram</a>
            <a href="https://x.com/thegrinchpepe" target="_blank" rel="noopener noreferrer" className="hover:text-[#39FF14] transition-colors">X</a>
          </div>
          <div className="text-[9px]">$GRINCH — DON'T GET GRINCHED · 2026</div>
        </div>
      </footer>

    </div>
  );
}