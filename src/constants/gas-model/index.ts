import { ChainId, fantomTokens, zkSyncTokens, Token } from '@real-wagmi/sdk';

export const nativeWrappedTokenByChain: { [chainId in ChainId]?: Token } = {
    [ChainId.FANTOM]: fantomTokens.wftm,
    [ChainId.ZK_SYNC]: zkSyncTokens.weth,
};

export const usdGasTokensByChain: { [chainId in ChainId]?: Token[] } = {
    [ChainId.FANTOM]: [fantomTokens.usdc],
    [ChainId.ZK_SYNC]: [fantomTokens.usdc],
};
