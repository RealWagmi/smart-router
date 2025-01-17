import { Token, ChainId, arbitrumTokens, ethereumTokens, fantomTokens, kavaTokens, zkSyncTokens, optimismTokens, bscTokens, polygonTokens, avalancheTokens, metisTokens, baseTokens, iotaTokens, sonicTokens } from '@real-wagmi/sdk';

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
  [ChainId.BASE]: [baseTokens.usdbc, baseTokens.usdc],
  [ChainId.IOTA]: [iotaTokens.usdt, iotaTokens.usdc],
  [ChainId.SONIC]: [sonicTokens.usdce]
} satisfies Record<ChainId, Token[]>

export * from './v3';
