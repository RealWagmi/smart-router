import { BigintIsh } from '@real-wagmi/sdk'

export function toBigInt(num: BigintIsh): bigint {
  return BigInt(num.toString())
}
