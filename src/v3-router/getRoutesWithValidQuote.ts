/* eslint-disable no-console */
import { BigintIsh, Currency, CurrencyAmount, TradeType } from '@real-wagmi/sdk';
import chunk from 'lodash/chunk.js';

import { BaseRoute, GasModel, QuoteProvider, RouteWithoutQuote, RouteWithQuote } from './types';
import { getAmountDistribution } from './functions';
import { metric } from './utils/metric';
import { AbortControl } from '../utils/abortControl';
import { pMap } from '../utils/pMap';

type Params = {
    blockNumber?: BigintIsh;
    amount: CurrencyAmount<Currency>;
    baseRoutes: BaseRoute[];
    distributionPercent: number;
    quoteProvider: QuoteProvider;
    tradeType: TradeType;
    gasModel: GasModel;
    quoterOptimization?: boolean;
} & AbortControl;

export async function getRoutesWithValidQuote({
    amount,
    baseRoutes,
    distributionPercent,
    quoteProvider,
    tradeType,
    blockNumber,
    gasModel,
    quoterOptimization = true,
    signal,
}: Params): Promise<RouteWithQuote[]> {
    const [percents, amounts] = getAmountDistribution(amount, distributionPercent);
    const routesWithoutQuote = amounts.reduce<RouteWithoutQuote[]>(
        (acc, curAmount, i) => [
            ...acc,
            ...baseRoutes.map(r => ({
                ...r,
                amount: curAmount,
                percent: percents[i],
            })),
        ],
        [],
    );
    const getRoutesWithQuote = tradeType === TradeType.EXACT_INPUT ? quoteProvider.getRouteWithQuotesExactIn : quoteProvider.getRouteWithQuotesExactOut;

    if (!quoterOptimization) {
        return getRoutesWithQuote(routesWithoutQuote, { blockNumber, gasModel, signal });
    }

    const requestCallback = typeof window === 'undefined' ? setTimeout : window.requestIdleCallback || window.setTimeout;
    metric('Get quotes', 'from', routesWithoutQuote.length, 'routes', routesWithoutQuote);
    // Split into chunks so the calculation won't block the main thread
    const getQuotes = (routes: RouteWithoutQuote[]): Promise<RouteWithQuote[]> =>
        new Promise((resolve, reject) => {
            requestCallback(async () => {
                try {
                    const result = await getRoutesWithQuote(routes, { blockNumber, gasModel, signal });
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            });
        });
    const chunks = chunk(routesWithoutQuote, 10);
    const result = await pMap(chunks, async chunk => getQuotes(chunk), { concurrency: 5 });
    const quotes = result.reduce<RouteWithQuote[]>((acc, cur) => [...acc, ...cur], []);
    metric('Get quotes', 'success, got', quotes.length, 'quoted routes', quotes);
    return quotes;
}
