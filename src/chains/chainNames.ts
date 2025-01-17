import { ChainId } from '@real-wagmi/sdk';

// @see https://github.com/DefiLlama/defillama-server/blob/master/common/chainToCoingeckoId.ts
// @see https://github.com/DefiLlama/chainlist/blob/main/constants/chainIds.json
export const defiLlamaChainNames: Record<ChainId, string> = {
    [ChainId.BSC]: 'bsc',
    [ChainId.ETHEREUM]: 'ethereum',
    [ChainId.ZKSYNC]: 'era',
    [ChainId.OPTIMISM]: 'optimistic-ethereum',
    [ChainId.POLYGON]: 'polygon-pos',
    [ChainId.FANTOM]: 'fantom',
    [ChainId.KAVA]: 'kava',
    [ChainId.AVALANCHE]: 'avalanche',
    [ChainId.ARBITRUM]: 'arbitrum-one',
    [ChainId.METIS]: 'metis',
    [ChainId.BASE]: 'base',
    [ChainId.IOTA]: 'iota',
    [ChainId.SONIC]: 'sonic',
};
