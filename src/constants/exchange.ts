import {
    Token,
    ChainId,
    ethereumTokens,
    optimismTokens,
    bscTokens,
    polygonTokens,
    fantomTokens,
    zkSyncTokens,
    kavaTokens,
    avalancheTokens,
    arbitrumTokens,
    metisTokens,
    blastTokens,
    baseTokens,
    metisSepoliaTokens,
    zkLinkTokens,
    iotaTokens,
} from '@real-wagmi/sdk';
import { ChainMap, ChainTokenList } from '../types';

export const SMART_ROUTER_ADDRESSES: ChainMap<string> = {
    [ChainId.ZKSYNC]: '0x8F901D3c80e6f72b6Ca118076697608C18ee48fe',
    [ChainId.FANTOM]: '0x0834Cf32553B255c767957588936881Ad8089485',
    [ChainId.ETHEREUM]: '0xD8ac778DB70221AB635921460C6BF70cC6d65293',
    [ChainId.ARBITRUM]: '0x491D195B05DF4e9fD6Aba8C00e6f6d3459A1aB51',
    [ChainId.KAVA]: '0xB9a14EE1cd3417f3AcC988F61650895151abde24',
    [ChainId.OPTIMISM]: '0x49660491C29344C3C8E463Ed1867A68fb69Bb519',
    [ChainId.BSC]: '0x83a98D089D0cB37BB82Aa5aE16033C93f474b8a9',
    [ChainId.POLYGON]: '0x53dca7E0015B8c445881A9BC2baC1D8648d7f800',
    [ChainId.AVALANCHE]: '0xd5B59C29efC50348241e815D1AFc37d1A7B26544',
    [ChainId.METIS]: '0x8B741B0D79BE80E135C880F7583d427B4D41F015',
    [ChainId.BLAST]: '',
    [ChainId.BASE]: '0xB5fa77E3929fe198a86Aa40fd6c77886785bCd0e',
    [ChainId.METIS_SEPOLIA]: '0x77DcC9b09C6Ae94CDC726540735682A38e18d690',
    [ChainId.ZKLINK]: '0xB2Bd4dB07731BA1517f3f43C4e8fe801F870B374',
    [ChainId.IOTA]: '0xaE7b92C8B14E7bdB523408aE0A6fFbf3f589adD9',
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
    [ChainId.ETHEREUM]: [ethereumTokens.weth, ethereumTokens.usdc, ethereumTokens.usdt, ethereumTokens.dai, ethereumTokens.wbtc],
    [ChainId.OPTIMISM]: [optimismTokens.weth, optimismTokens.wbtc, optimismTokens.usdc, optimismTokens.usdt, optimismTokens.dai],
    [ChainId.BSC]: [bscTokens.wbnb, bscTokens.usdc, bscTokens.usdt],
    [ChainId.POLYGON]: [polygonTokens.wmatic, polygonTokens.usdc, polygonTokens.usdt],
    [ChainId.FANTOM]: [fantomTokens.wftm, fantomTokens.dai, fantomTokens.frax, fantomTokens.usdc, fantomTokens.usdt],
    [ChainId.ZKSYNC]: [zkSyncTokens.weth, zkSyncTokens.usdc, zkSyncTokens.busd],
    [ChainId.KAVA]: [kavaTokens.wkava, kavaTokens.usdt, kavaTokens.usdc, kavaTokens.weth],
    [ChainId.AVALANCHE]: [avalancheTokens.wavax, avalancheTokens.usdc, avalancheTokens.usdt],
    [ChainId.ARBITRUM]: [arbitrumTokens.weth, arbitrumTokens.usdc, arbitrumTokens.usdt, arbitrumTokens.wbtc],
    [ChainId.METIS]: [metisTokens.wmetis, metisTokens.usdc, metisTokens.usdt, metisTokens.weth, metisTokens.wbtc],
    [ChainId.BLAST]: [blastTokens.weth, blastTokens.usdb],
    [ChainId.BASE]: [baseTokens.weth, baseTokens.usdc, baseTokens.usdbc],
    [ChainId.METIS_SEPOLIA]: [metisSepoliaTokens.weth, metisSepoliaTokens.wmetis],
    [ChainId.ZKLINK]: [zkLinkTokens.weth, zkLinkTokens.usdt, zkLinkTokens.usdc, zkLinkTokens.dai, zkLinkTokens.wbtc],
    [ChainId.IOTA]: [iotaTokens.weth, iotaTokens.usdt, iotaTokens.usdc, iotaTokens.wiota],
};

/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: {
    [chainId in ChainId]?: { [tokenAddress: string]: Token[] };
} = {};

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WNATIVE[ChainId.BSC]]
 */
export const CUSTOM_BASES: {
    [chainId in ChainId]?: { [tokenAddress: string]: Token[] };
} = {};
