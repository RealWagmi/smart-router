import { ChainId } from '@real-wagmi/sdk'
import { ChainMap } from '../types'
import { Address } from 'viem'

export const MSG_SENDER = '0x0000000000000000000000000000000000000001'
export const ADDRESS_THIS = '0x0000000000000000000000000000000000000002'

export const V3_QUOTER_ADDRESSES: ChainMap<Address> = {
  [ChainId.ZKSYNC]: '0x1e034f92e6d071941B58Ca15368adb8b8EBA6AAD',
  [ChainId.FANTOM]: '0x5dB68a533465040F5185e2771746AFed8CC4D14E',
  [ChainId.ETHEREUM]: '0x66034b71A749E655feE0005C5496D5c0949590F0',
  [ChainId.KAVA]: '0x8187808B163E7CBAcCc4D0A9B138AE6196ac1f72',
  [ChainId.OPTIMISM]: '0xe4d69A93e8CB390B4Fc04Dc7836a8206F074949C',
  [ChainId.BSC]: '' as Address,
  [ChainId.POLYGON]: '' as Address,
  [ChainId.AVALANCHE]: '' as Address,
  [ChainId.ARBITRUM]: '' as Address
}
