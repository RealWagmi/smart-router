export const approveAndCallAbi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'approveMax',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'approveMaxMinusOne',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'approveZeroThenMax',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'approveZeroThenMaxMinusOne',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
            },
        ],
        name: 'callPositionManager',
        outputs: [
            {
                internalType: 'bytes',
                name: 'result',
                type: 'bytes',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'getApprovalType',
        outputs: [
            {
                internalType: 'enum IApproveAndCall.ApprovalType',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'token0',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'token1',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount0Min',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount1Min',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct IApproveAndCall.IncreaseLiquidityParams',
                name: 'params',
                type: 'tuple',
            },
        ],
        name: 'increaseLiquidity',
        outputs: [
            {
                internalType: 'bytes',
                name: 'result',
                type: 'bytes',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'token0',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'token1',
                        type: 'address',
                    },
                    {
                        internalType: 'uint24',
                        name: 'fee',
                        type: 'uint24',
                    },
                    {
                        internalType: 'int24',
                        name: 'tickLower',
                        type: 'int24',
                    },
                    {
                        internalType: 'int24',
                        name: 'tickUpper',
                        type: 'int24',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount0Min',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount1Min',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'recipient',
                        type: 'address',
                    },
                ],
                internalType: 'struct IApproveAndCall.MintParams',
                name: 'params',
                type: 'tuple',
            },
        ],
        name: 'mint',
        outputs: [
            {
                internalType: 'bytes',
                name: 'result',
                type: 'bytes',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
] as const;
