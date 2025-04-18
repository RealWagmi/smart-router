import { BigintIsh, Currency, CurrencyAmount, ChainId } from '@real-wagmi/sdk'
import { Abi, Address } from 'viem'
import retry from 'async-retry'
// import uniq from 'lodash/uniq.js'

import {
  GasModel,
  OnChainProvider,
  QuoteProvider,
  QuoteRetryOptions,
  QuoterOptions,
  RouteWithoutQuote,
  RouteWithQuote,
} from '../types'
import { quoterV2ABI } from '../../abis/IQuoterV2'
import { encodeMixedRouteToPath, getQuoteCurrency } from '../utils'
import { Result } from './multicallProvider'
import { PancakeMulticallProvider } from './multicallSwapProvider'
import { V3_QUOTER_ADDRESSES } from '../../constants'
import { BatchMulticallConfigs, ChainMap } from '../../types'
import { BATCH_MULTICALL_CONFIGS } from '../../constants/multicall'
import { AbortControl } from '../../utils/abortControl'

const DEFAULT_BATCH_RETRIES = 2

const SUCCESS_RATE_CONFIG = {
  [ChainId.ETHEREUM]: 0.1,
  [ChainId.BSC]: 0.1,
  [ChainId.ZKSYNC]: 0.2,
  [ChainId.ARBITRUM]: 0.1,
  [ChainId.AVALANCHE]: 0.1,
  [ChainId.FANTOM]: 0.1,
  [ChainId.KAVA]: 0.1,
  [ChainId.OPTIMISM]: 0.1,
  [ChainId.POLYGON]: 0.1,
  [ChainId.METIS]: 0.1,
  [ChainId.BASE]: 0.1,
  [ChainId.IOTA]: 0.1,
  [ChainId.SONIC]: 0.1,
} as const satisfies Record<ChainId, number>

type V3Inputs = [string, string]
type MixedInputs = [string, number[], string]
type CallInputs = V3Inputs | MixedInputs

interface FactoryConfig {
  getCallInputs: (route: RouteWithoutQuote, isExactIn: boolean) => CallInputs
  getQuoterAddress: (chainId: ChainId) => Address
  abi: Abi | any[]
  getQuoteFunctionName: (isExactIn: boolean) => string
}

interface ProviderConfig {
  onChainProvider: OnChainProvider
  gasLimit?: BigintIsh
  multicallConfigs?: ChainMap<BatchMulticallConfigs>
}

export class BlockConflictError extends Error {
  public name = 'BlockConflictError'
}

export class SuccessRateError extends Error {
  public name = 'SuccessRateError'
}

export class ProviderBlockHeaderError extends Error {
  public name = 'ProviderBlockHeaderError'
}

export class ProviderTimeoutError extends Error {
  public name = 'ProviderTimeoutError'
}

/**
 * This error typically means that the gas used by the multicall has
 * exceeded the total call gas limit set by the node provider.
 *
 * This can be resolved by modifying BatchParams to request fewer
 * quotes per call, or to set a lower gas limit per quote.
 *
 * @export
 * @class ProviderGasError
 */
export class ProviderGasError extends Error {
  public name = 'ProviderGasError'
}

interface GetQuotesConfig {
  gasLimitPerCall: number
}

const retryControllerFactory = ({ retries }: QuoteRetryOptions & AbortControl) => {
  const errors: Error[] = []
  let remainingRetries = retries || 0
  return {
    shouldRetry: (error: Error) => remainingRetries > 0 && errors.every((err) => err.name !== error.name),
    onRetry: (error: Error) => {
      errors.push(error)
      remainingRetries -= 1
    },
    getErrorsOnPreviousRetries: () => errors,
  }
}

function onChainQuoteProviderFactory({ getQuoteFunctionName, getQuoterAddress, abi, getCallInputs }: FactoryConfig) {
  return function createOnChainQuoteProvider({
    onChainProvider,
    gasLimit,
    multicallConfigs: multicallConfigsOverride,
  }: ProviderConfig): QuoteProvider {
    const createGetRoutesWithQuotes = (isExactIn = true) => {
      const functionName = getQuoteFunctionName(isExactIn)
      const adjustQuoteForGas = (quote: CurrencyAmount<Currency>, gasCostInToken: CurrencyAmount<Currency>) =>
        isExactIn ? quote.subtract(gasCostInToken) : quote.add(gasCostInToken)

      return async function getRoutesWithQuote(
        routes: RouteWithoutQuote[],
        { blockNumber: blockNumberFromConfig, gasModel, retry: retryOptions, signal }: QuoterOptions,
      ): Promise<RouteWithQuote[]> {
        if (!routes.length) {
          return []
        }

        const {
          amount: {
            currency: { chainId },
          },
        } = routes[0]
        const quoterAddress = getQuoterAddress(chainId)
        if(!quoterAddress){
          throw Error('quoterAddress doesn\'t find')
        }
        const minSuccessRate = SUCCESS_RATE_CONFIG[chainId as ChainId]
        // const blockConflictTolerance = BLOCK_CONFLICT_TOLERANCE[chainId as ChainId]
        const multicallConfigs =
          multicallConfigsOverride?.[chainId as ChainId] ||
          BATCH_MULTICALL_CONFIGS[chainId as ChainId] ||
          BATCH_MULTICALL_CONFIGS[ChainId.ETHEREUM]
        const {
          defaultConfig: { gasLimitPerCall: defaultGasLimitPerCall, dropUnexecutedCalls },
        } = multicallConfigs
        const chainProvider = onChainProvider({ chainId })
        const providerConfig = { blockNumber: blockNumberFromConfig }
        const multicall2Provider = new PancakeMulticallProvider(chainId, chainProvider, defaultGasLimitPerCall)
        const inputs = routes.map<CallInputs>((route) => getCallInputs(route, isExactIn))

        const retryOptionsWithDefault = {
          retries: DEFAULT_BATCH_RETRIES,
          minTimeout: 25,
          maxTimeout: 250,
          ...retryOptions,
        }
        const { shouldRetry, onRetry } = retryControllerFactory(retryOptionsWithDefault)

        async function getQuotes({ gasLimitPerCall }: GetQuotesConfig) {
          try {
            const { results, blockNumber, approxGasUsedPerSuccessCall } =
              await multicall2Provider.callSameFunctionOnContractWithMultipleParams<
                CallInputs,
                // amountIn/amountOut, sqrtPriceX96AfterList, initializedTicksCrossedList, gasEstimate
                [bigint, bigint[], number[], bigint]
              >({
                address: quoterAddress,
                abi,
                functionName,
                functionParams: inputs,
                providerConfig,
                additionalConfig: {
                  dropUnexecutedCalls,
                  gasLimitPerCall,
                  gasLimit,
                  signal,
                },
              })
            const successRateError = validateSuccessRate(results, minSuccessRate)
            if (successRateError) {
              throw successRateError
            }

            return {
              results,
              blockNumber,
              approxGasUsedPerSuccessCall,
            }
          } catch (err: any) {
            if (err instanceof SuccessRateError || err instanceof BlockConflictError) {
              throw err
            }

            const slicedErrMsg = err.message.slice(0, 500)
            if (err.message.includes('header not found')) {
              throw new ProviderBlockHeaderError(slicedErrMsg)
            }

            if (err.message.includes('timeout')) {
              throw new ProviderTimeoutError(`Request had ${inputs.length} inputs. ${slicedErrMsg}`)
            }

            if (err.message.includes('out of gas')) {
              throw new ProviderGasError(slicedErrMsg)
            }

            throw new Error(`Unknown error from provider: ${slicedErrMsg}`)
          }
        }

        const quoteResult = await retry(async (bail) => {
          try {
            const quotes = await getQuotes({
              gasLimitPerCall: defaultGasLimitPerCall,
            })
            return quotes
          } catch (e: unknown) {
            const error = e instanceof Error ? e : new Error(`Unexpected error type ${e}`)
            if (!shouldRetry(error)) {
              // bail is actually rejecting the promise on retry function
              return bail(error)
            }
            if (error instanceof SuccessRateError) {
              onRetry(error)
              const { successRateFailureOverrides } = multicallConfigs
              return getQuotes({
                gasLimitPerCall: successRateFailureOverrides.gasLimitPerCall,
              })
            }
            if (error instanceof ProviderGasError) {
              onRetry(error)
              const { gasErrorFailureOverride } = multicallConfigs
              return getQuotes({
                gasLimitPerCall: gasErrorFailureOverride.gasLimitPerCall,
              })
            }
            throw error
          }
        }, retryOptionsWithDefault)

        if (!quoteResult) {
          throw new Error(`Unexpected empty quote result ${quoteResult}`)
        }

        const { results: quoteResults } = quoteResult
        const routesWithQuote = processQuoteResults(quoteResults, routes, gasModel, adjustQuoteForGas)

        // metric.putMetric('QuoteApproxGasUsedPerSuccessfulCall', approxGasUsedPerSuccessCall, MetricLoggerUnit.Count)

        // metric.putMetric('QuoteNumRetryLoops', finalAttemptNumber - 1, MetricLoggerUnit.Count)

        // metric.putMetric('QuoteTotalCallsToProvider', totalCallsMade, MetricLoggerUnit.Count)

        // metric.putMetric('QuoteExpectedCallsToProvider', expectedCallsMade, MetricLoggerUnit.Count)

        // metric.putMetric('QuoteNumRetriedCalls', totalCallsMade - expectedCallsMade, MetricLoggerUnit.Count)

        // const [successfulQuotes, failedQuotes] = _(routesQuotes)
        //   .flatMap((routeWithQuotes: RouteWithQuotes<TRoute>) => routeWithQuotes[1])
        //   .partition((quote) => quote.quote != null)
        //   .value()

        // log.info(
        //   `Got ${successfulQuotes.length} successful quotes, ${failedQuotes.length} failed quotes. Took ${
        //     finalAttemptNumber - 1
        //   } attempt loops. Total calls made to provider: ${totalCallsMade}. Have retried for timeout: ${haveRetriedForTimeout}`,
        // )

        // return { routesWithQuotes: routesQuotes, blockNumber }
        return routesWithQuote
      }
    }

    return {
      getRouteWithQuotesExactIn: createGetRoutesWithQuotes(true),
      getRouteWithQuotesExactOut: createGetRoutesWithQuotes(false),
    }
  }
}

function validateSuccessRate(
  allResults: Result<[bigint, bigint[], number[], bigint]>[],
  quoteMinSuccessRate: number,
): undefined | SuccessRateError {
  const numResults = allResults.length
  const numSuccessResults = allResults.filter((result) => result.success).length

  const successRate = (1.0 * numSuccessResults) / numResults

  if (successRate < quoteMinSuccessRate) {
    return new SuccessRateError(`Quote success rate below threshold of ${quoteMinSuccessRate}: ${successRate}`)
  }
  return undefined
}

// function validateBlockNumbers(results: { blockNumber: bigint }[], tolerance = 1): BlockConflictError | null {
//   if (results.length <= 1) {
//     return null
//   }
//
//   const blockNumbers = results.map((result) => result.blockNumber)
//
//   const blockStrs = blockNumbers.map((blockNumber) => blockNumber.toString())
//   const uniqBlocks = uniq(blockStrs)
//
//   if (uniqBlocks.length > 0 && uniqBlocks.length <= tolerance) {
//     return null
//   }
//
//   return new BlockConflictError(`Quotes returned from different blocks. ${uniqBlocks}`)
// }

function processQuoteResults(
  quoteResults: (Result<[bigint, bigint[], number[], bigint]> | null)[],
  routes: RouteWithoutQuote[],
  gasModel: GasModel,
  adjustQuoteForGas: (
    quote: CurrencyAmount<Currency>,
    gasCostInToken: CurrencyAmount<Currency>,
  ) => CurrencyAmount<Currency>,
): RouteWithQuote[] {
  const routesWithQuote: RouteWithQuote[] = []

  // const debugFailedQuotes: {
  //   amount: string
  //   percent: number
  //   route: string
  // }[] = []

  for (let i = 0; i < quoteResults.length; i += 1) {
    const route = routes[i]
    const quoteResult = quoteResults[i]
    if (!quoteResult) {
      continue
    }

    const { success } = quoteResult

    if (!success) {
      // const amountStr = amount.toFixed(Math.min(amount.currency.decimals, 2))
      // const routeStr = routeToString(route)
      // debugFailedQuotes.push({
      //   route: routeStr,
      //   percent,
      //   amount: amountStr,
      // })
      continue
    }

    const quoteCurrency = getQuoteCurrency(route, route.amount.currency)
    const quote = CurrencyAmount.fromRawAmount(quoteCurrency.wrapped, quoteResult.result[0].toString())
    const { gasEstimate, gasCostInToken, gasCostInUSD } = gasModel.estimateGasCost(
      {
        ...route,
        quote,
      },
      { initializedTickCrossedList: quoteResult.result[2] },
    )

    routesWithQuote.push({
      ...route,
      quote,
      quoteAdjustedForGas: adjustQuoteForGas(quote, gasCostInToken),
      // sqrtPriceX96AfterList: quoteResult.result[1],
      gasEstimate,
      gasCostInToken,
      gasCostInUSD,
    })
  }

  // // For routes and amounts that we failed to get a quote for, group them by route
  // // and batch them together before logging to minimize number of logs.
  // const debugChunk = 80
  // _.forEach(_.chunk(debugFailedQuotes, debugChunk), (quotes, idx) => {
  //   const failedQuotesByRoute = _.groupBy(quotes, (q) => q.route)
  //   const failedFlat = _.mapValues(failedQuotesByRoute, (f) =>
  //     _(f)
  //       .map((f) => `${f.percent}%[${f.amount}]`)
  //       .join(','),
  //   )

  //   log.info(
  //     {
  //       failedQuotes: _.map(failedFlat, (amounts, routeStr) => `${routeStr} : ${amounts}`),
  //     },
  //     `Failed on chain quotes for routes Part ${idx}/${Math.ceil(debugFailedQuotes.length / debugChunk)}`,
  //   )
  // })

  return routesWithQuote
}

export const createV3OnChainQuoteProvider = onChainQuoteProviderFactory({
  getQuoterAddress: (chainId) => V3_QUOTER_ADDRESSES[chainId],
  getQuoteFunctionName: (isExactIn) => (isExactIn ? 'quoteExactInput' : 'quoteExactOutput'),
  abi: quoterV2ABI,
  getCallInputs: (route, isExactIn) => [
    encodeMixedRouteToPath(route, !isExactIn),
    `0x${route.amount.quotient.toString(16)}`,
  ],
})
