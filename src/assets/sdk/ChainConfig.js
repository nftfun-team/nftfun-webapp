const CHAIN_RPC = {
    1: 'https://mainnet.infura.io/v3/0e47785118b2494092b1a9a9b576c2bd',
    42: 'https://kovan.infura.io/v3/0e47785118b2494092b1a9a9b576c2bd',
    56: 'https://bsc-dataseed.binance.org',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    128: 'https://http-mainnet.hecochain.com',
    256: 'https://http-testnet.hecochain.com'
};

const CHAIN_BROWSER = {
    1: "https://etherscan.io",
    42: "https://kovan.etherscan.io",
    56: "https://bscscan.com",
    97: "https://testnet.bscscan.com",
    128: "https://scan.hecochain.com",
    256: "https://scan-testnet.hecochain.com"
}

const IPFS_URL = 'https://ipfs.io/ipfs'

const ContractsAddr = {
    56: {
        FunUsdPair: '',
        Master: '',
        MasterChef: '',
    },
    97: {
        FunUsdPair: '',
        Master: '0x0B1Ae6ff6591E582950bc604C023cf050ADD8100',
        MasterChef: '0x1b3B385a0E9B52a95dA25bF00F60329ea5A15C95',
    },
}

const Tokens = {
    56: {
        FUN: '',
    },
    97: {
        FUN: '0xB2F70423d34c9e9e63D0363167d990295CD0c5D6',
    },
}

const Pools = {
    56: [
    ],
    97: [
        {
            "name": "FUN-USDT",
            "address": "0x455985da88818f422ef3bf9d379427f7be34c81b",
            "weigth": 100,
        },
        {
            "name": "FUN-BNB",
            "address": "0x4195f83e2d2450d7083423c61c56631611527075",
            "weigth": 100,
        }
    ],
}

const ChainSymbol = {
    WToken: {
        1: "WETH",
        42: "WETH",
        56: "WBNB",
        97: "WBNB",
        128: "WHT",
        256: "WHT"
    },
    ZeroToken: {
        1: "ETH",
        42: "ETH",
        56: "BNB",
        97: "BNB",
        128: "HT",
        256: "HT"
    }
}

export {CHAIN_RPC, CHAIN_BROWSER, Tokens, Pools, ContractsAddr, ChainSymbol, IPFS_URL};
