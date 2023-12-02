import { BigintIsh, Currency } from '@real-wagmi/sdk'

import { OnChainProvider, Pool, PoolType, SubgraphProvider } from '../../types'
import { getV3CandidatePools } from './getV3CandidatePools'

export type GetCandidatePoolsParams = {
  currencyA?: Currency
  currencyB?: Currency

  // Only use this param if we want to specify pairs we want to get
  pairs?: [Currency, Currency][]

  onChainProvider?: OnChainProvider
  v3SubgraphProvider?: SubgraphProvider
  blockNumber?: BigintIsh
  protocols?: PoolType[]
}

export async function getCandidatePools({
  protocols = [PoolType.V3],
  v3SubgraphProvider,
  ...rest
}: GetCandidatePoolsParams): Promise<Pool[]> {
  const { currencyA } = rest
  const chainId = currencyA?.chainId
  if (!chainId) {
    return []
  }

  const poolSets = await Promise.all(
    protocols.map((protocol) => {
      if (protocol === PoolType.V3) {
        return getV3CandidatePools({ ...rest, subgraphProvider: v3SubgraphProvider })
      }
      throw new Error("Protocol doesn't supported")
    }),
  )

  return poolSets.reduce<Pool[]>((acc, cur) => [...acc, ...cur], [])
}
