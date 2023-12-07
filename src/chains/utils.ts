import { ChainId } from '@real-wagmi/sdk'
import { defiLlamaChainNames } from './chainNames'

export function getLlamaChainName(chainId: ChainId) {
  return defiLlamaChainNames[chainId]
}

export function getChainFromLlamaChainName(chain: string){
  //@ts-ignore
  return Object.keys(defiLlamaChainNames).find(key => defiLlamaChainNames[key] === chain); 
}