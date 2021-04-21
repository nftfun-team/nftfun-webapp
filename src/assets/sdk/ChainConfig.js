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
const Report_URL = {
    56: '',
    97: 'https://api-test.nftfun.org'
}

const Swap_URL = {
    56: 'https://exchange.pancakeswap.finance/#',
    97: 'https://www.bakeryswap.org/#'
}

const ContractsAddr = {
    56: {
        Master: '',
        Oracle: '',
        MasterChef: '',
        Query: '',
    },
    97: {
        Master: '0x80EbE98696df632e40963E60c252c41aeA2d6404',
        Oracle: '0xbe3d3708A6c50457834Fce564677e6cce72fdc8b',
        MasterChef: '0x7966F5653e20cAa3eF57cEE0100277321c4AE770',
        Query: '0xBf41799DAaF2a9d7e607042687De2d2018F3EE02',
    },
}

const Tokens = {
    56: {
        FUN: '',
    },
    97: {
        FUN: '0xB9f8985b884d16DedfA8de7f37651AE938949A54',
        USDT: '0xF2ED382e6A3439Be124813842200cf6702fD6ecA',
        WBNB: '0x094616f0bdfb0b526bd735bf66eca0ad254ca81f',
        BURGER: '0x06bF890dfF5b422c35c9683f47d2d7663f6E1c24',
        FUN_USDT_LP: '0x33763d9EdF9D8F91bBAFfA4f8df622f90EC9DDA9',
    },
}

const Pools = {
    56: [],
    97: [
        {
            name: "FUN-USDT",
            address: "0x33763d9EdF9D8F91bBAFfA4f8df622f90EC9DDA9",
            pid: 0,
            tokenSymbol: "FUN",
            baseSymbol: "USDT",
            tokenType: 2,
        },
        {
            name: "FUN-WBNB",
            address: "0x98655083a337b1658e0b7b818da039e5f1ce707c",
            pid: 1,
            tokenSymbol: "FUN",
            baseSymbol: "WBNB",
            tokenType: 2,
        },
        {
            name: "FUN-BURGER",
            address: "0xa0cFA7ca408924c00A57a1603E01fdCA18e16C5F",
            pid: 2,
            tokenSymbol: "FUN",
            baseSymbol: "BURGER",
            tokenType: 2,
        },
        {
            name: "USDT",
            address: "0xF2ED382e6A3439Be124813842200cf6702fD6ecA",
            pid: 3,
            tokenSymbol: "USDT",
            baseSymbol: "",
            tokenType: 1,
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

export {CHAIN_RPC, CHAIN_BROWSER, Tokens, Pools, ContractsAddr, ChainSymbol, IPFS_URL, Report_URL, Swap_URL};
