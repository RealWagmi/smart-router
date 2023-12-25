import { ChainId } from '@real-wagmi/sdk'
import { defiLlamaChainNames } from './chainNames'

export function getLlamaChainName(chainId: ChainId) {
  return defiLlamaChainNames[chainId]
}

export function getChainFromLlamaChainName(chain: string): ChainId {
  //@ts-ignore
  return parseInt(Object.keys(defiLlamaChainNames).filter((chain) => !isNaN(Number(chain))).find(key => defiLlamaChainNames[key] === chain)); 
}