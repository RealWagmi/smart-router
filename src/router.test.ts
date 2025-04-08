import { describe, it } from 'vitest';
import { Chain, createPublicClient, http } from 'viem';
import { GraphQLClient } from 'graphql-request';
import { SmartRouter } from './index';
import { ChainId, Token, TradeType, sonicTokens, tryParseAmount } from '@real-wagmi/sdk';

describe('test router', () => {
    it('should get best trade', async () => {
        const sonic = {
            id: ChainId.SONIC,
            name: 'Sonic',
            network: 'sonic',
            nativeCurrency: {
                decimals: 18,
                name: 'S',
                symbol: 'S',
            },
            rpcUrls: {
                default: {
                    http: ['https://rpc.soniclabs.com'],
                },
                public: {
                    http: ['https://rpc.soniclabs.com'],
                },
            },
            contracts: {
                multicall3: {
                    address: '0x2dA5DdBeC63dfd93112AedFa44F880927AA5Ae41',
                    blockCreated: 60,
                },
            },
        } satisfies Chain;
        
        const publicClient = createPublicClient({
            chain: sonic,
            transport: http(),
            batch: {
                    multicall: {
                    batchSize: 1024 * 200,
                },
            },
        })
    
        const v3SubgraphClient = new GraphQLClient('https://sonic.graph.wagmi.com/subgraphs/name/v3')
    
        const quoteProvider = SmartRouter.createQuoteProvider({ onChainProvider: () => publicClient });
    
        const swapFrom = new Token(ChainId.SONIC, '0x79bbF4508B1391af3A0F4B30bb5FC4aa9ab0E07C', 18, 'ANON');
        const swapTo = sonicTokens.usdce;
    
        const v3Pools = await SmartRouter.getV3CandidatePools({
            onChainProvider: () => publicClient,
            subgraphProvider: () => v3SubgraphClient,
            currencyA: swapFrom,
            currencyB: swapTo,
        });

        console.log(`v3 pools: ${v3Pools.length}`);

        const amount = tryParseAmount("108", swapFrom);
    
        const trade = await SmartRouter.getBestTrade(amount!, swapTo, TradeType.EXACT_INPUT, {
            gasPriceWei: () => publicClient.getGasPrice(),
            maxHops: 3,
            maxSplits: 4,
            poolProvider: SmartRouter.createStaticPoolProvider(v3Pools),
            quoteProvider,
            quoterOptimization: true,
        });
    
        console.log(`trade ${trade?.inputAmount.toExact()} ${trade?.inputAmount.currency.symbol} => ${trade?.outputAmount.toExact()} ${trade?.outputAmount.currency.symbol}`);
        expect(trade).toBeDefined();
    });
})