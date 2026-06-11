import { useState, useEffect } from "react";
import { ExternalLink, Copy, Check, TrendingUp, DollarSign, Activity, Percent } from "lucide-react";

export default function DexWidget() {
  const [copied, setCopied] = useState(false);
  const [marketData, setMarketData] = useState({
    price: null,
    marketCap: null,
    volume24h: null,
    priceChange24h: null,
    liquidity: null,
    loading: true,
    error: null
  });
  
  const contractAddress = "EQA6G0uVERDZTkLNa0drWBna1F5TSbogy7UXEWU5ERHz4uJL";
  const dexscreenerUrl = "https://dexscreener.com/ton/eqdpvwtqr53cwgat_vcfsmrleg5fbvsttjmrvyvprf_roc9z";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          // Find the pair on TON chain
          const tonPair = data.pairs.find(pair => 
            pair.chainId === "ton" || pair.chainId?.toLowerCase() === "the open network"
          ) || data.pairs[0];
          
          if (tonPair) {
            setMarketData({
              price: tonPair.priceUsd ? parseFloat(tonPair.priceUsd) : 0,
              marketCap: tonPair.marketCap ? parseFloat(tonPair.marketCap) : (tonPair.fdv ? parseFloat(tonPair.fdv) : 0),
              volume24h: tonPair.volume?.h24 ? parseFloat(tonPair.volume.h24) : 0,
              priceChange24h: tonPair.priceChange?.h24 ? parseFloat(tonPair.priceChange.h24) : 0,
              liquidity: tonPair.liquidity?.usd ? parseFloat(tonPair.liquidity.usd) : 0,
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
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, [contractAddress]);

  // Format price based on value
  const formatPrice = (value) => {
    if (!value && value !== 0) return "...";
    if (value === 0) return "$0.00";
    if (value < 0.000001) return `$${value.toExponential(4)}`;
    if (value < 0.001) return `$${value.toFixed(8)}`;
    if (value < 1) return `$${value.toFixed(6)}`;
    return `$${value.toFixed(4)}`;
  };

  // Format market cap
  const formatMarketCap = (value) => {
    if (!value && value !== 0) return "...";
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  // Format volume
  const formatVolume = (value) => {
    if (!value && value !== 0) return "...";
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  // Format liquidity
  const formatLiquidity = (value) => {
    if (!value && value !== 0) return "...";
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className="bg-neutral-900/80 border border-emerald-950 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
            Live Market Feed
          </span>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-white">
            $GRINCH Chart & Trade Data
          </h2>
        </div>
        
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="bg-black/40 border border-emerald-900/30 rounded-xl px-4 py-2 flex items-center justify-between gap-3 font-mono text-xs">
            <span className="text-neutral-500">TON CA:</span>
            <span className="text-neutral-200 select-all truncate max-w-[150px]">{contractAddress.slice(0, 6)}...{contractAddress.slice(-6)}</span>
            <button 
              onClick={handleCopy}
              className="text-emerald-400 hover:text-emerald-300 transition-colors p-1 rounded hover:bg-neutral-800"
              title="Copy Contract Address"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          
          <a
            href={dexscreenerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-sm px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Open DexScreener <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Embedded Chart Frame */}
      <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-xl overflow-hidden border border-neutral-800 bg-black/50 mb-6">
        <iframe
          src={`${dexscreenerUrl}?embed=1&theme=dark&trades=0&info=0`}
          className="absolute inset-0 w-full h-full border-0"
          title="Pepe Grinch DexScreener Embed"
          loading="lazy"
        />
      </div>

      {/* Real-time Token metrics panel - NO DUMMY DATA */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Price */}
        <div className="bg-black/30 border border-neutral-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono mb-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            <span>PRICE</span>
          </div>
          <div className="text-xl font-mono text-neutral-100 font-bold">
            {marketData.loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : marketData.error ? (
              <span className="text-red-500 text-sm">Error</span>
            ) : (
              formatPrice(marketData.price)
            )}
          </div>
          {!marketData.loading && !marketData.error && marketData.priceChange24h !== null && (
            <span className={`text-[10px] font-mono font-semibold ${marketData.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {marketData.priceChange24h >= 0 ? '▲' : '▼'} {Math.abs(marketData.priceChange24h).toFixed(2)}%
            </span>
          )}
        </div>

        {/* Market Cap */}
        <div className="bg-black/30 border border-neutral-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>MARKET CAP</span>
          </div>
          <div className="text-xl font-mono text-neutral-100 font-bold">
            {marketData.loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : marketData.error ? (
              <span className="text-red-500 text-sm">Error</span>
            ) : (
              formatMarketCap(marketData.marketCap)
            )}
          </div>
          <span className="text-neutral-500 text-[10px] font-mono">Fully Diluted</span>
        </div>

        {/* 24H Volume */}
        <div className="bg-black/30 border border-neutral-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono mb-1">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span>24H VOLUME</span>
          </div>
          <div className="text-xl font-mono text-neutral-100 font-bold">
            {marketData.loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : marketData.error ? (
              <span className="text-red-500 text-sm">Error</span>
            ) : (
              formatVolume(marketData.volume24h)
            )}
          </div>
          <span className="text-neutral-500 text-[10px] font-mono">DexScreener Live</span>
        </div>

        {/* Liquidity */}
        <div className="bg-black/30 border border-neutral-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono mb-1">
            <Percent className="w-3.5 h-3.5 text-emerald-500" />
            <span>LIQUIDITY</span>
          </div>
          <div className="text-xl font-mono text-neutral-100 font-bold">
            {marketData.loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : marketData.error ? (
              <span className="text-red-500 text-sm">Error</span>
            ) : (
              formatLiquidity(marketData.liquidity)
            )}
          </div>
          <span className="text-neutral-500 text-[10px] font-mono">Locked Forever</span>
        </div>
      </div>
    </div>
  );
}