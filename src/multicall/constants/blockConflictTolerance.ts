import { ChainId } from '@real-wagmi/sdk';

export const DEFAULT_BLOCK_CONFLICT_TOLERANCE = 0;

export const BLOCK_CONFLICT_TOLERANCE: { [key in ChainId]?: number } = {
    [ChainId.BSC]: 3,
    [ChainId.ETHEREUM]: 1,
    [ChainId.ARBITRUM]: 5,
    [ChainId.POLYGON]: 1,
    [ChainId.ZKSYNC]: 3,
    [ChainId.OPTIMISM]: 10,
    [ChainId.KAVA]: 3,
    [ChainId.METIS]: 5,
    [ChainId.IOTA]: 3,
    [ChainId.SONIC]: 30,
};
