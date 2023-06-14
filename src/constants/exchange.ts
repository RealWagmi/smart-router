import { ChainId, Token, WETH9, fantomTokens, nativeOnChain, zkSyncTokens } from '@real-wagmi/sdk'

import { ChainCurrencyList } from '../types'

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainCurrencyList = {
  [ChainId.FANTOM]: [WETH9[ChainId.FANTOM], fantomTokens.usdc, fantomTokens.dai, fantomTokens.frax, fantomTokens.usdt],
  [ChainId.ZK_SYNC]: [WETH9[ChainId.ZK_SYNC], zkSyncTokens.usdc, zkSyncTokens.busd],
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

export const COMMON_BASES: ChainCurrencyList = {
  [ChainId.ZK_SYNC]: [
    nativeOnChain(ChainId.ZK_SYNC),
    zkSyncTokens.usdc,
    zkSyncTokens.busd,
    WETH9[ChainId.ZK_SYNC],
  ],
  [ChainId.FANTOM]: [
    nativeOnChain(ChainId.FANTOM),
    WETH9[ChainId.FANTOM],
    fantomTokens.usdc,
    fantomTokens.dai,
    fantomTokens.frax,
    fantomTokens.usdt,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainCurrencyList = {
  [ChainId.FANTOM]: [WETH9[ChainId.FANTOM], fantomTokens.usdc, fantomTokens.dai, fantomTokens.frax, fantomTokens.usdt],
  [ChainId.ZK_SYNC]: [WETH9[ChainId.ZK_SYNC], zkSyncTokens.usdc, zkSyncTokens.busd],
}

export const PINNED_PAIRS: {
  readonly [chainId in ChainId]?: [Token, Token][]
} = {}
