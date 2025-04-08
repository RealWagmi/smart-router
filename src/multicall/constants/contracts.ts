import { ChainId } from '@real-wagmi/sdk';
import { Address } from 'viem';

export const MULTICALL_ADDRESS: { [key in ChainId]: Address } = {
    [ChainId.ZKSYNC]: '0x95071cBD09184083E7F732a710c2e30c9882Fd5f',
    [ChainId.BSC]: '0x39eecaE833c944ebb94942Fa44CaE46e87a8Da17',
    [ChainId.ETHEREUM]: '0xC0916D7E360c31D5F6D0c497E6a36B7B0E80e3cf',
    [ChainId.ARBITRUM]: '0xbFfE39cDD04f0183e0493c1Deb6E275c5cf84AdF',
    [ChainId.KAVA]: '0x6ebBFd291516acc91d1C17E68463a4a7a0322C69',
    [ChainId.FANTOM]: '0x7906d667a938b4d1da9dd8909204fc4c32f7d9b0',
    [ChainId.OPTIMISM]: '0x91DFb48ABD7031877f4F45C945b940f0c7F32D1a',
    [ChainId.METIS]: '0x16b413526d062142eb9eDA9d75312cA9f2e418FD',
    [ChainId.BASE]: '0x3EFaAb8D7A631cfF5ccF5f149d1Bbb3B5bfda2C0',
    [ChainId.IOTA]: '0x212Aa024E25A9C9bAF5b5397B558B7ccea81740B',
    [ChainId.POLYGON]: '0x9ab6E62123464d6F7a21457840Daf34754C9C6d7',
    [ChainId.AVALANCHE]: '0x721655cCcd531DD6a2d87F72A31E2e927B965C3c',
    [ChainId.SONIC]: '0x6dF85fD781ddDAbD7f12835f1ff847Db6F14Ca2c',
};

export const MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';

export const MULTICALL3_ADDRESSES: {
    [key in ChainId]?: Address;
} = {
    [ChainId.ETHEREUM]: MULTICALL3_ADDRESS,
    [ChainId.BSC]: MULTICALL3_ADDRESS,
    [ChainId.ZKSYNC]: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
    [ChainId.ARBITRUM]: MULTICALL3_ADDRESS,
    [ChainId.KAVA]: '0x7d6eb773e9e0a32987082432bd6ffefae4f84dd3',
    [ChainId.METIS]: MULTICALL3_ADDRESS,
    [ChainId.FANTOM]: '0xca11bde05977b3631167028862be2a173976ca11',
    [ChainId.IOTA]: '0xBE5d1d15617879B22C7b6a8e1e16aDD6d0bE3c61',
    [ChainId.BASE]: '0x7301350CC76D669ea384e77aF38a70C61661CA48',
    [ChainId.POLYGON]: '0xFE9409E7d74D4512a8BB5576937d990fcD8aBc52',
    [ChainId.AVALANCHE]: '0x8bb1Be7acD806BF6C9766486dC4c21284a472BaC',
    [ChainId.SONIC]: '0x2dA5DdBeC63dfd93112AedFa44F880927AA5Ae41',
};
