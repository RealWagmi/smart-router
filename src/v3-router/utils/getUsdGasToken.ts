import { Token, ChainId } from '@real-wagmi/sdk';

import { usdGasTokensByChain } from '../../constants';

export function getUsdGasToken(chainId: ChainId): Token | null {
    return usdGasTokensByChain[chainId]?.[0] ?? null;
}
