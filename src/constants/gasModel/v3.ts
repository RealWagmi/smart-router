import { ChainId } from '@real-wagmi/sdk'

// Cost for crossing an uninitialized tick.
export const COST_PER_UNINIT_TICK = 0n

export const BASE_SWAP_COST_V3 = (id: ChainId): bigint => {
  switch (id) {
    case ChainId.ETHEREUM:
    case ChainId.OPTIMISM:
    case ChainId.BSC:
    case ChainId.POLYGON:
    case ChainId.FANTOM:
    case ChainId.ZKSYNC:
    case ChainId.KAVA:
    case ChainId.AVALANCHE:
    case ChainId.ARBITRUM:
    case ChainId.METIS:
      return 2000n
    default:
      return 0n
  }
}
export const COST_PER_INIT_TICK = (id: ChainId): bigint => {
  switch (id) {
    case ChainId.ETHEREUM:
    case ChainId.OPTIMISM:
    case ChainId.BSC:
    case ChainId.POLYGON:
    case ChainId.FANTOM:
    case ChainId.ZKSYNC:
    case ChainId.KAVA:
    case ChainId.AVALANCHE:
    case ChainId.ARBITRUM:
    case ChainId.METIS:
      return 31000n
    default:
      return 0n
  }
}

export const COST_PER_HOP_V3 = (id: ChainId): bigint => {
  switch (id) {
    case ChainId.ETHEREUM:
    case ChainId.OPTIMISM:
    case ChainId.BSC:
    case ChainId.POLYGON:
    case ChainId.FANTOM:
    case ChainId.ZKSYNC:
    case ChainId.KAVA:
    case ChainId.AVALANCHE:
    case ChainId.ARBITRUM:
    case ChainId.METIS:
      return 80000n
    default:
      return 0n
  }
}
