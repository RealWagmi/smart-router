import { ChainId } from '@real-wagmi/sdk';

// Cost for crossing an uninitialized tick.
export const COST_PER_UNINIT_TICK = 0n;

export const BASE_SWAP_COST_V3 = (id: ChainId): bigint => {
    switch (id) {
        case ChainId.FANTOM:
        case ChainId.ZK_SYNC:
            return 2000n;
        default:
            return 0n;
    }
};
export const COST_PER_INIT_TICK = (id: ChainId): bigint => {
    switch (id) {
        case ChainId.FANTOM:
        case ChainId.ZK_SYNC:
            return 31000n;
        default:
            return 0n;
    }
};

export const COST_PER_HOP_V3 = (id: ChainId): bigint => {
    switch (id) {
        case ChainId.FANTOM:
        case ChainId.ZK_SYNC:
            return 80000n;
        default:
            return 0n;
    }
};

export const MSG_SENDER = '0x0000000000000000000000000000000000000001';
export const ADDRESS_THIS = '0x0000000000000000000000000000000000000002';
