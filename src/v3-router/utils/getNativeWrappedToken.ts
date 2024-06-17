import { Token, WETH9, ChainId } from '@real-wagmi/sdk';

export function getNativeWrappedToken(chainId: ChainId): Token | null {
    return WETH9[chainId] ?? null;
}
