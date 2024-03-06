import { ChainId } from '@real-wagmi/sdk'

import { ChainMap, BatchMulticallConfigs } from '../types'

const DEFAULT: BatchMulticallConfigs = {
  defaultConfig: {
    gasLimitPerCall: 1_000_000,
  },
  gasErrorFailureOverride: {
    gasLimitPerCall: 2_000_000,
  },
  successRateFailureOverrides: {
    gasLimitPerCall: 2_000_000,
  },
}

export const BATCH_MULTICALL_CONFIGS: ChainMap<BatchMulticallConfigs> = {
  [ChainId.ETHEREUM]: DEFAULT,
  [ChainId.OPTIMISM]: {
    ...DEFAULT,
    defaultConfig: {
      ...DEFAULT.defaultConfig,
      gasLimitPerCall: 1_200_000,
    }
  },
  [ChainId.BSC]: DEFAULT,
  [ChainId.POLYGON]: DEFAULT,
  [ChainId.FANTOM]: DEFAULT,
  [ChainId.ZKSYNC]: {
    ...DEFAULT,
    successRateFailureOverrides: {
      ...DEFAULT.successRateFailureOverrides,
      gasLimitPerCall: 3_000_000,
    }
  },
  [ChainId.KAVA]: {
    defaultConfig: {
      gasLimitPerCall: 5_000_000,
    },
    gasErrorFailureOverride: {
      gasLimitPerCall: 5_000_000,
    },
    successRateFailureOverrides: {
      gasLimitPerCall: 3_000_000,
    },
  },
  [ChainId.AVALANCHE]: DEFAULT,
  [ChainId.ARBITRUM]: DEFAULT,  
  [ChainId.METIS]: DEFAULT,
  [ChainId.BLAST]: DEFAULT
}
