import { Token, ChainId, ethereumTokens, optimismTokens, bscTokens, polygonTokens, fantomTokens, zkSyncTokens, kavaTokens, avalancheTokens, arbitrumTokens } from '@real-wagmi/sdk'
import { ChainMap, ChainTokenList } from '../types'

export const SMART_ROUTER_ADDRESSES: ChainMap<string> = {
  [ChainId.ZKSYNC]: '0x718AeA365b83AFF91e561597ab9D4225f632b52a',
  [ChainId.FANTOM]: '0x660FC63608A4641267e958Ee254DC0A275D0eD6e',
  [ChainId.ETHEREUM]: '0x4E537A3A1E59FCdfA225FA470976B356786888Cc',
  [ChainId.ARBITRUM]: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
  [ChainId.KAVA]: '0xE88b19885935B4Be8dCF38e2C96b8c73CfC9b6e2',
  [ChainId.OPTIMISM]: '0x765c286762cC4B9Da61b5515Ecc026421819Cd12',
  [ChainId.BSC]: '',
  [ChainId.POLYGON]: '',
  [ChainId.AVALANCHE]: ''
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
