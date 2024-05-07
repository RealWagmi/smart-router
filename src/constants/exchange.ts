import { Token, ChainId, ethereumTokens, optimismTokens, bscTokens, polygonTokens, fantomTokens, zkSyncTokens, kavaTokens, avalancheTokens, arbitrumTokens, metisTokens, blastTokens, baseTokens, metisSepoliaTokens, zkLinkTokens } from '@real-wagmi/sdk'
import { ChainMap, ChainTokenList } from '../types'

export const SMART_ROUTER_ADDRESSES: ChainMap<string> = {
  [ChainId.ZKSYNC]: '0x8F901D3c80e6f72b6Ca118076697608C18ee48fe',
  [ChainId.FANTOM]: '0x0834Cf32553B255c767957588936881Ad8089485',
  [ChainId.ETHEREUM]: '0xD8ac778DB70221AB635921460C6BF70cC6d65293',
  [ChainId.ARBITRUM]: '',
  [ChainId.KAVA]: '0xB9a14EE1cd3417f3AcC988F61650895151abde24',
  [ChainId.OPTIMISM]: '0x49660491C29344C3C8E463Ed1867A68fb69Bb519',
  [ChainId.BSC]: '',
  [ChainId.POLYGON]: '',
  [ChainId.AVALANCHE]: '',
  [ChainId.METIS]: '0x8B741B0D79BE80E135C880F7583d427B4D41F015',
  [ChainId.BLAST]: '',
  [ChainId.BASE]: '',
  [ChainId.METIS_SEPOLIA]: '0x77DcC9b09C6Ae94CDC726540735682A38e18d690',
  [ChainId.ZKLINK]: '0x4daC0281A3d1b2cc097219e1e393A823E6b01bF7'
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.ETHEREUM]: [ethereumTokens.weth,ethereumTokens.usdc, ethereumTokens.usdt, ethereumTokens.dai, ethereumTokens.wbtc],
  [ChainId.OPTIMISM]: [optimismTokens.weth, optimismTokens.wbtc, optimismTokens.usdc, optimismTokens.usdt, optimismTokens.dai],
  [ChainId.BSC]: [bscTokens.wbnb, bscTokens.usdc, bscTokens.usdt],
  [ChainId.POLYGON]: [polygonTokens.wmatic, polygonTokens.usdc, polygonTokens.usdt],
  [ChainId.FANTOM]: [fantomTokens.wftm, fantomTokens.dai, fantomTokens.frax, fantomTokens.usdc, fantomTokens.usdt],
  [ChainId.ZKSYNC]: [zkSyncTokens.weth, zkSyncTokens.usdc, zkSyncTokens.busd],
  [ChainId.KAVA]: [kavaTokens.wkava, kavaTokens.usdt, kavaTokens.usdc, kavaTokens.weth],
  [ChainId.AVALANCHE]: [avalancheTokens.wavax, avalancheTokens.usdc, avalancheTokens.usdt],
  [ChainId.ARBITRUM]: [arbitrumTokens.weth, arbitrumTokens.usdc, arbitrumTokens.usdt, arbitrumTokens.wbtc],
  [ChainId.METIS]: [metisTokens.wmetis, metisTokens.usdc, metisTokens.usdt, metisTokens.weth, metisTokens.wbtc],
  [ChainId.BLAST]: [blastTokens.weth, blastTokens.usdb],
  [ChainId.BASE]: [baseTokens.weth, baseTokens.usdc, baseTokens.usdbc],
  [ChainId.METIS_SEPOLIA]: [metisSepoliaTokens.weth, metisSepoliaTokens.wmetis],
  [ChainId.ZKLINK]: [zkLinkTokens.weth, zkLinkTokens.usdt, zkLinkTokens.usdc, zkLinkTokens.dai, zkLinkTokens.wbtc]
}

/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] }
} = {}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WNATIVE[ChainId.BSC]]
 */
export const CUSTOM_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] }
} = {}
