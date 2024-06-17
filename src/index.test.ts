import { expect, test } from 'vitest';
import * as exportedNameSpaces from './index';

test('exports', () => {
    expect(Object.keys(exportedNameSpaces)).toMatchInlineSnapshot(`
    [
      "BIG_INT_TEN",
      "BIPS_BASE",
      "MIN_BNB",
      "BETTER_TRADE_LESS_HOPS_THRESHOLD",
      "SMART_ROUTER_ADDRESSES",
      "BASES_TO_CHECK_TRADES_AGAINST",
      "ADDITIONAL_BASES",
      "CUSTOM_BASES",
      "COST_PER_UNINIT_TICK",
      "BASE_SWAP_COST_V3",
      "COST_PER_INIT_TICK",
      "COST_PER_HOP_V3",
      "usdGasTokensByChain",
      "BATCH_MULTICALL_CONFIGS",
      "MSG_SENDER",
      "ADDRESS_THIS",
      "V3_QUOTER_ADDRESSES",
      "SmartRouter",
      "SwapRouter",
      "Transformer",
      "PoolType",
      "RouteType",
      "defiLlamaChainNames",
      "getLlamaChainName",
      "getChainFromLlamaChainName",
      "getDefaultGasLimit",
      "getDefaultGasBuffer",
      "getGasLimitOnChain",
      "getGasLimit",
      "MULTICALL_ADDRESS",
      "MULTICALL3_ADDRESS",
      "MULTICALL3_ADDRESSES",
      "DEFAULT_BLOCK_CONFLICT_TOLERANCE",
      "BLOCK_CONFLICT_TOLERANCE",
      "DEFAULT_GAS_LIMIT",
      "DEFAULT_GAS_LIMIT_BY_CHAIN",
      "DEFAULT_GAS_BUFFER",
      "DEFAULT_GAS_BUFFER_BY_CHAIN",
      "getMulticallContract",
      "getMulticall3ContractAddress",
      "multicallByGasLimit",
      "getBlockConflictTolerance",
      "AbortError",
      "abortInvariant",
      "isAbortError",
    ]
  `);
});

test('SmartRouter exports', () => {
    expect(Object.keys(exportedNameSpaces.SmartRouter)).toMatchInlineSnapshot(`
    [
      "getBestTrade",
      "v3PoolSubgraphSelection",
      "getV3PoolsWithoutTicksOnChain",
      "getV3PoolSubgraph",
      "getAllV3PoolsFromSubgraph",
      "v3PoolTvlSelector",
      "createHybridPoolProvider",
      "createStaticPoolProvider",
      "v3PoolsOnChainProviderFactory",
      "getV3PoolsWithTvlFromOnChain",
      "getV3PoolsWithTvlFromOnChainFallback",
      "getV3PoolsWithTvlFromOnChainStaticFallback",
      "createGetV3CandidatePoolsWithFallbacks",
      "createGetV3CandidatePools",
      "getV3CandidatePools",
      "getCandidatePools",
      "createPoolProvider",
      "createQuoteProvider",
      "createOffChainQuoteProvider",
      "PancakeMulticallProvider",
      "createCommonTokenPriceProvider",
      "getTokenUsdPricesBySubgraph",
      "getCommonTokenPricesBySubgraph",
      "getCommonTokenPricesByLlma",
      "getCommonTokenPricesByWalletApi",
      "getCommonTokenPrices",
      "getExecutionPrice",
      "maximumAmountIn",
      "minimumAmountOut",
      "isV3Pool",
      "getMidPrice",
      "involvesCurrency",
      "logger",
      "Transformer",
      "getPoolAddress",
      "getPairCombinations",
      "getCheckAgainstBaseTokens",
      "APISchema",
    ]
  `);
});
