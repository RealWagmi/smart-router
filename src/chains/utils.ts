import { ChainId } from '@real-wagmi/sdk';
import { defiLlamaChainNames } from './chainNames';

export function getLlamaChainName(chainId: ChainId) {
    return defiLlamaChainNames[chainId];
}

export function getChainFromLlamaChainName(chain: string): ChainId {
    return parseInt(
        //@ts-ignore
        Object.keys(defiLlamaChainNames)
            .filter(chain => !isNaN(Number(chain)))
            //@ts-ignore
            .find(key => defiLlamaChainNames[key] === chain),
    );
}
