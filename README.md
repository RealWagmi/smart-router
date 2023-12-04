# Smart Router

fork of `@pancakeswap/smart-router` is a SDK for getting best trade routes from Pancakeswap AMM.

## Install

```bash
$ yarn add @real-wagmi/smart-router
```

## Usage

Use KAVA as an example. Here's how we use smart router sdk to find the best trade route swapping from BNB to CAKE and construct a valid swap transaction from the trade route we got.

For working code example, please refer to [smart-router-example](https://github.com/pancakeswap/smart-router-example).

0. Install other dependencies

```bash
$ yarn add viem graphql-request @real-wagmi/sdk
```

1. Prepare on-chain rpc provider and subgraph providers

```typescript
import { createPublicClient, http } from 'viem'
import { GraphQLClient } from 'graphql-request'
import { SmartRouter } from '@real-wagmi/smart-router'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http('https://evm.kava.io'),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
    },
  },
})

const v3SubgraphClient = new GraphQLClient('https://kava.graph.wagmi.com/subgraphs/name/v3')

const quoteProvider = SmartRouter.createQuoteProvider({ onChainProvider: () => publicClient })
```

2. Get candidate pools

```typescript
import { kavaTokens } from '@real-wagmi/sdk'
import { SmartRouter } from '@real-wagmi/smart-router'

const swapFrom = kavaTokens.kava
const swapTo = kavaTokens.wagmi

const v3Pools = await SmartRouter.getV3CandidatePools({
  onChainProvider: () => publicClient,
  subgraphProvider: () => v3SubgraphClient,
  currencyA: swapFrom,
  currencyB: swapTo,
})
```

3. Find the best swap trade route

```typescript
import { tryParseAmount } from '@real-wagmi/sdk'

// 10 KAVA in our example
const amount = tryParseAmount("10", swapFrom)

const trade = await SmartRouter.getBestTrade(amount, swapTo, TradeType.EXACT_INPUT, {
  gasPriceWei: () => publicClient.getGasPrice(),
  maxHops: 2,
  maxSplits: 2,
  poolProvider: SmartRouter.createStaticPoolProvider(pools),
  quoteProvider,
  quoterOptimization: true,
})
```

4. Build the swap transaction from trade

```typescript
import { ChainId, Percent } from '@real-wagmi/sdk'
import { SmartRouter, SmartRouterTrade, SMART_ROUTER_ADDRESSES, SwapRouter } from '@real-wagmi/smart-router'
import { hexToBigInt } from 'viem'

const routerAddress = SMART_ROUTER_ADDRESSES[ChainId.KAVA]
// Swap recipient address
const address = '0x'

const { value, calldata } = SwapRouter.swapCallParameters(trade, {
  recipient: address,
  slippageTolerance: new Percent(1),
})

const tx = {
  account: address,
  to: routerAddress,
  data: calldata,
  value: hexToBigInt(value),
}
const gasEstimate = await publicClient.estimateGas(tx)
```
