import { ChainId } from '@real-wagmi/sdk';

import { PoolSelectorConfig, PoolSelectorConfigChainMap, TokenPoolSelectorConfigChainMap } from '../types';

export const DEFAULT_POOL_SELECTOR_CONFIG: PoolSelectorConfig = {
    topN: 2,
    topNDirectSwaps: 2,
    topNTokenInOut: 3,
    topNSecondHop: 1,
    topNWithEachBaseToken: 3,
    topNWithBaseToken: 5,
};

export const V3_DEFAULT_POOL_SELECTOR_CONFIG: PoolSelectorConfigChainMap = {
    [ChainId.OPTIMISM]: {
        topN: 2,
        topNDirectSwaps: 2,
        topNTokenInOut: 2,
        topNSecondHop: 1,
        topNWithEachBaseToken: 3,
        topNWithBaseToken: 3,
    },
    [ChainId.ARBITRUM]: {
        topN: 2,
        topNDirectSwaps: 2,
        topNTokenInOut: 2,
        topNSecondHop: 1,
        topNWithEachBaseToken: 3,
        topNWithBaseToken: 2,
    },
};

// Use to configure pool selector config when getting quote from specific tokens
// Allow to increase or decrese the number of candidate pools to calculate routes from
export const V3_TOKEN_POOL_SELECTOR_CONFIG: TokenPoolSelectorConfigChainMap = {};
