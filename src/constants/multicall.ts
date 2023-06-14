import { ChainId } from '@real-wagmi/sdk';

import { ChainMap, BatchMulticallConfigs } from '../types';

export const BATCH_MULTICALL_CONFIGS: ChainMap<BatchMulticallConfigs> = {
    [ChainId.ZK_SYNC]: {
        defaultConfig: {
            multicallChunk: 50,
            gasLimitOverride: 1_000_000,
        },
        gasErrorFailureOverride: {
            gasLimitOverride: 1_000_000,
            multicallChunk: 40,
        },
        successRateFailureOverrides: {
            gasLimitOverride: 1_000_000,
            multicallChunk: 45,
        },
    },
    [ChainId.FANTOM]: {
        defaultConfig: {
            multicallChunk: 150,
            gasLimitOverride: 1_000_000,
        },
        gasErrorFailureOverride: {
            gasLimitOverride: 1_000_000,
            multicallChunk: 30,
        },
        successRateFailureOverrides: {
            gasLimitOverride: 1_000_000,
            multicallChunk: 40,
        },
    },
};
