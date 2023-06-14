import { ChainId, Currency } from '@real-wagmi/sdk';

// a list of tokens by chain
export type ChainMap<T> = {
    readonly [chainId in ChainId]: T;
};

export type ChainCurrencyList = ChainMap<Currency[]>;
