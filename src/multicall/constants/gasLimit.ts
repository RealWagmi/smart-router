import { ChainId } from '@real-wagmi/sdk';

export const DEFAULT_GAS_LIMIT = 150_000_000n;

export const DEFAULT_GAS_LIMIT_BY_CHAIN: { [key in ChainId]?: bigint } = {
    [ChainId.BSC]: 100_000_000n,
    [ChainId.ZKSYNC]: 500_000_000n,
    [ChainId.POLYGON]: 1_500_000n,
    [ChainId.SONIC]: 5_000_000_000n,
};

export const DEFAULT_GAS_BUFFER = 3_000_000n;

export const DEFAULT_GAS_BUFFER_BY_CHAIN: { [key in ChainId]?: bigint } = {
    [ChainId.BSC]: DEFAULT_GAS_BUFFER,
    [ChainId.POLYGON]: 0n,
};
