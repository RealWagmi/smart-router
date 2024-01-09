import { Token, ChainId, arbitrumTokens, ethereumTokens, fantomTokens, kavaTokens, zkSyncTokens, optimismTokens, bscTokens, polygonTokens, avalancheTokens, metisTokens } from '@real-wagmi/sdk';

export const usdGasTokensByChain = {
  [ChainId.ETHEREUM]: [ethereumTokens.usdc, ethereumTokens.usdt],
  [ChainId.OPTIMISM]: [optimismTokens.usdc, optimismTokens.usdt],
  [ChainId.BSC]: [bscTokens.usdc, bscTokens.usdt],
  [ChainId.POLYGON]: [polygonTokens.usdc, polygonTokens.usdt],
  [ChainId.FANTOM]: [fantomTokens.dai, fantomTokens.frax, fantomTokens.usdc, fantomTokens.usdt],
  [ChainId.ZKSYNC]: [zkSyncTokens.usdc, zkSyncTokens.busd],
  [ChainId.KAVA]: [kavaTokens.usdt, kavaTokens.usdc],
  [ChainId.AVALANCHE]: [avalancheTokens.usdc, avalancheTokens.usdt],
  [ChainId.ARBITRUM]: [arbitrumTokens.usdc, arbitrumTokens.usdt],
  [ChainId.METIS]: [metisTokens.usdt, metisTokens.usdc]
} satisfies Record<ChainId, Token[]>

export * from './v3';
