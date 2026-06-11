export interface TokenStats {
  priceUsd: string;
  priceTon: string;
  marketCap: string;
  liquidity: string;
  volume24h: string;
  change24h: number;
  pairAddress: string;
  tokenAddress: string;
}

export interface RegretResult {
  lossUsd: number;
  lossTon: number;
  currentValueUsd: number;
  grinchedSeverity: "low" | "medium" | "high" | "terminal";
  statusPhrase: string;
  reactionGifMessage: string;
}

export interface MemeTemplate {
  id: string;
  topText: string;
  bottomText: string;
  vibe: string;
}
