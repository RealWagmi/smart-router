import { ChainId } from '@real-wagmi/sdk'
import { defiLlamaChainNames } from './chainNames'

export function getLlamaChainName(chainId: ChainId) {
  return defiLlamaChainNames[chainId]
}
