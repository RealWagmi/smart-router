/* eslint-disable no-console */
import { QuoteProvider, RouteWithoutQuote, RouteWithQuote, RouteType, QuoterOptions, QuoterConfig } from '../types'
import { createOffChainQuoteProvider } from './offChainQuoteProvider'
import { createV3OnChainQuoteProvider } from './onChainQuoteProvider'

// For evm
export function createQuoteProvider(config: QuoterConfig): QuoteProvider<QuoterConfig> {
  const { onChainProvider, multicallConfigs, gasLimit } = config
  const offChainQuoteProvider = createOffChainQuoteProvider()
  const v3OnChainQuoteProvider = createV3OnChainQuoteProvider({ onChainProvider, multicallConfigs, gasLimit })

  const createGetRouteWithQuotes = (isExactIn = true) => {
    const getOffChainQuotes = isExactIn
      ? offChainQuoteProvider.getRouteWithQuotesExactIn
      : offChainQuoteProvider.getRouteWithQuotesExactOut
    const getV3Quotes = isExactIn
      ? v3OnChainQuoteProvider.getRouteWithQuotesExactIn
      : v3OnChainQuoteProvider.getRouteWithQuotesExactOut

    return async function getRoutesWithQuotes(
      routes: RouteWithoutQuote[],
      { blockNumber, gasModel }: QuoterOptions,
    ): Promise<RouteWithQuote[]> {
      const v3SingleHopRoutes: RouteWithoutQuote[] = []
      const v3MultihopRoutes: RouteWithoutQuote[] = []
      const routesCanQuoteOffChain: RouteWithoutQuote[] = []
      for (const route of routes) {
        if (route.type === RouteType.V3) {
          if (route.pools.length === 1) {
            v3SingleHopRoutes.push(route)
            continue
          }
          v3MultihopRoutes.push(route)
          continue
        }        
        routesCanQuoteOffChain.push(route)
      }

      const results = await Promise.allSettled([
        getOffChainQuotes(routesCanQuoteOffChain, { blockNumber, gasModel }),
        getV3Quotes(v3SingleHopRoutes, { blockNumber, gasModel }),
        getV3Quotes(v3MultihopRoutes, { blockNumber, gasModel, retry: { retries: 1 } }),
      ])
      if (results.every((result) => result.status === 'rejected')) {
        throw new Error(results.map((result) => (result as PromiseRejectedResult).reason).join(','))
      }
      return results
        .filter((result): result is PromiseFulfilledResult<RouteWithQuote[]> => result.status === 'fulfilled')
        .reduce<RouteWithQuote[]>((acc, cur) => [...acc, ...cur.value], [])
    }
  }

  return {
    getRouteWithQuotesExactIn: createGetRouteWithQuotes(true),
    getRouteWithQuotesExactOut: createGetRouteWithQuotes(false),
    getConfig: () => config,
  }
}
