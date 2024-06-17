import { ChainId } from '@real-wagmi/sdk';
import { RouteConfig } from '../types';

export const ROUTE_CONFIG_BY_CHAIN: { [key in ChainId]?: Partial<RouteConfig> } = {
    [ChainId.OPTIMISM]: {
        distributionPercent: 10,
    },
    [ChainId.ZKSYNC]: {
        distributionPercent: 20,
    },
    [ChainId.ARBITRUM]: {
        distributionPercent: 25,
    },
};
