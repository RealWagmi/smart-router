import { Currency, BigintIsh, ChainId } from '@real-wagmi/sdk'
import { PublicClient } from 'viem'
import type { GraphQLClient } from 'graphql-request'
import type { Options as RetryOptions } from 'async-retry'

import { Pool, PoolType } from './pool'
import { RouteWithoutQuote, RouteWithQuote } from './route'
import { GasModel } from './gasModel'
import { BatchMulticallConfigs, ChainMap } from '../../types'
import { AbortControl } from '../../utils/abortControl'

type GetPoolParams = {
  currencyA?: Currency
  currencyB?: Currency
  blockNumber?: BigintIsh
  protocols?: PoolType[]

  // Only use this param if we want to specify pairs we want to get
  pairs?: [Currency, Currency][]
} & AbortControl

export interface PoolProvider {
  getCandidatePools: (params: GetPoolParams) => Promise<Pool[]>
}

export type QuoteRetryOptions = RetryOptions

export type QuoterOptions = {
  blockNumber?: BigintIsh
  gasModel: GasModel
  retry?: QuoteRetryOptions
} & AbortControl

export type QuoterConfig = {
  onChainProvider: OnChainProvider
  gasLimit?: BigintIsh
  multicallConfigs?: ChainMap<BatchMulticallConfigs>
}

export interface QuoteProvider<C = any> {
  getRouteWithQuotesExactIn: (routes: RouteWithoutQuote[], options: QuoterOptions) => Promise<RouteWithQuote[]>
  getRouteWithQuotesExactOut: (routes: RouteWithoutQuote[], options: QuoterOptions) => Promise<RouteWithQuote[]>

  getConfig?: () => C
}

export type OnChainProvider = ({ chainId }: { chainId?: ChainId }) => PublicClient

export type SubgraphProvider = ({ chainId }: { chainId?: ChainId }) => GraphQLClient | undefined
