import { Token, ChainId, arbitrumTokens, ethereumTokens, fantomTokens, kavaTokens, zkSyncTokens, optimismTokens, bscTokens, polygonTokens, avalancheTokens, metisTokens, blastTokens, baseTokens, metisSepoliaTokens, zkLinkTokens, iotaTokens } from '@real-wagmi/sdk';

export const usdGasTokensByChain = {
  [ChainId.ETHEREUM]: [ethereumTokens.usdt, ethereumTokens.usdc],
  [ChainId.OPTIMISM]: [optimismTokens.usdc, optimismTokens.usdt],
  [ChainId.BSC]: [bscTokens.usdt, bscTokens.usdc],
  [ChainId.POLYGON]: [polygonTokens.usdc, polygonTokens.usdt],
  [ChainId.FANTOM]: [fantomTokens.usdc, fantomTokens.dai, fantomTokens.frax, fantomTokens.usdt],
  [ChainId.ZKSYNC]: [zkSyncTokens.usdc, zkSyncTokens.busd],
  [ChainId.KAVA]: [kavaTokens.usdt, kavaTokens.usdc],
  [ChainId.AVALANCHE]: [avalancheTokens.usdc, avalancheTokens.usdt],
  [ChainId.ARBITRUM]: [arbitrumTokens.usdc, arbitrumTokens.usdt],
  [ChainId.METIS]: [metisTokens.usdt, metisTokens.usdc],
  [ChainId.BLAST]: [blastTokens.usdb],
  [ChainId.BASE]: [baseTokens.usdbc, baseTokens.usdc],
  [ChainId.METIS_SEPOLIA]: [metisSepoliaTokens.tusdt, metisSepoliaTokens.tdai],
  [ChainId.ZKLINK]: [zkLinkTokens.usdt, zkLinkTokens.usdc, zkLinkTokens.dai],
  [ChainId.IOTA]: [iotaTokens.usdt, iotaTokens.usdc],
} satisfies Record<ChainId, Token[]>

export * from './v3';
