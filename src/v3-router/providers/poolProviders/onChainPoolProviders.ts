import { ChainId, BigintIsh, Currency } from '@real-wagmi/sdk'
import { V3_CORE_FACTORY_ADDRESSES, v3PoolAbi, parseProtocolFees, feeAmounts } from '@real-wagmi/v3-sdk'
import { Abi, Address, ContractFunctionConfig } from 'viem'

import { OnChainProvider, Pool, PoolType, V3Pool } from '../../types'
import { computeV3PoolAddress } from '../../utils'
import { PoolMeta, V3PoolMeta } from './internalTypes'

export const getV3PoolsWithoutTicksOnChain = createOnChainPoolFactory<V3Pool, V3PoolMeta>({
  abi: v3PoolAbi,
  getPossiblePoolMetas: ([currencyA, currencyB]) => {
    const deployerAddress = V3_CORE_FACTORY_ADDRESSES[currencyA.chainId as ChainId]
    if (!deployerAddress) {
      return []
    }
    return feeAmounts.map((fee) => ({
      address: computeV3PoolAddress({
        V3_CORE_FACTORY_ADDRESSES: deployerAddress,
        tokenA: currencyA.wrapped,
        tokenB: currencyB.wrapped,
        fee,
      }),
      currencyA,
      currencyB,
      fee,
    }))
  },
  buildPoolInfoCalls: (address) => [
    {
      address,
      functionName: 'liquidity',
    },
    {
      address,
      functionName: 'slot0',
    },
  ],
  buildPool: ({ currencyA, currencyB, fee, address }, [liquidity, slot0]) => {
    if (!slot0) {
      return null
    }
    const [sqrtPriceX96, tick, , , , feeProtocol] = slot0
    const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped)
      ? [currencyA, currencyB]
      : [currencyB, currencyA]
    const [token0ProtocolFee, token1ProtocolFee] = parseProtocolFees(feeProtocol)
    return {
      type: PoolType.V3,
      token0,
      token1,
      fee,
      liquidity: BigInt(liquidity.toString()),
      sqrtRatioX96: BigInt(sqrtPriceX96.toString()),
      tick: Number(tick),
      address,
      token0ProtocolFee,
      token1ProtocolFee,
    }
  },
})

interface OnChainPoolFactoryParams<TPool extends Pool, TPoolMeta extends PoolMeta, TAbi extends Abi | unknown[] = Abi> {
  abi: TAbi
  getPossiblePoolMetas: (pair: [Currency, Currency]) => TPoolMeta[]
  buildPoolInfoCalls: (poolAddress: Address) => Omit<ContractFunctionConfig<TAbi>, 'abi'>[]
  buildPool: (poolMeta: TPoolMeta, data: any[]) => TPool | null
}

function createOnChainPoolFactory<
  TPool extends Pool,
  TPoolMeta extends PoolMeta = PoolMeta,
  TAbi extends Abi | unknown[] = Abi,
>({ abi, getPossiblePoolMetas, buildPoolInfoCalls, buildPool }: OnChainPoolFactoryParams<TPool, TPoolMeta, TAbi>) {
  return async function poolFactory(
    pairs: [Currency, Currency][],
    provider?: OnChainProvider,
    blockNumber?: BigintIsh,
  ): Promise<TPool[]> {
    if (!provider) {
      throw new Error('No valid onchain data provider')
    }

    const chainId: ChainId = pairs[0]?.[0]?.chainId
    const client = provider({ chainId })
    if (!chainId || !client) {
      return []
    }

    const poolAddressSet = new Set<string>()

    const poolMetas: TPoolMeta[] = []
    for (const pair of pairs) {
      const possiblePoolMetas = getPossiblePoolMetas(pair)
      for (const meta of possiblePoolMetas) {
        if (!poolAddressSet.has(meta.address)) {
          poolMetas.push(meta)
          poolAddressSet.add(meta.address)
        }
      }
    }

    let calls: Omit<ContractFunctionConfig<TAbi>, 'abi'>[] = []
    let poolCallSize = 0
    for (const { address } of poolMetas) {
      const poolCalls = buildPoolInfoCalls(address)
      if (!poolCallSize) {
        poolCallSize = poolCalls.length
      }
      if (!poolCallSize || poolCallSize !== poolCalls.length) {
        throw new Error('Inconsistent pool data call')
      }
      calls = [...calls, ...poolCalls]
    }

    if (!calls.length) {
      return []
    }

    const results = await client.multicall({
      contracts: calls.map((call) => ({
        abi: abi as any,
        address: call.address as `0x${string}`,
        functionName: call.functionName,
        args: call.args as any,
      })),
      allowFailure: true,
      blockNumber: blockNumber ? BigInt(Number(BigInt(blockNumber))) : undefined,
    })

    const pools: TPool[] = []
    for (let i = 0; i < poolMetas.length; i += 1) {
      const poolResults = results.slice(i * poolCallSize, (i + 1) * poolCallSize)
      const pool = buildPool(
        poolMetas[i],
        poolResults.map((result) => result.result),
      )
      if (pool) {
        pools.push(pool)
      }
    }
    return pools
  }
}
