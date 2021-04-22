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
        Master: '0xab61073E66D7E35753757aDAB4442628874FbCeb',
        Oracle: '0x4894140Ef1D9aCD420fd9482cb64c285530dF8b4',
        MasterChef: '0x1fa65c1666d5771F5dd0C3abf54564BB55a12227',
        Query: '0x1eCaeE6e4e01C45712ccd9262c3e9F623A6ac7ed',
    },
    97: {
        Master: '0x80EbE98696df632e40963E60c252c41aeA2d6404',
        Oracle: '0xbe3d3708A6c50457834Fce564677e6cce72fdc8b',
        MasterChef: '0x17B1Adbf780CD72dF88171e5b0274567f51C1Ec3',
        Query: '0xBf41799DAaF2a9d7e607042687De2d2018F3EE02',
    },
}

const Tokens = {
    56: {
        FUN: '0xCC89AC2C6f4a82e5A4c53215b6a6d7ebA4C25E6a',
        USDT: '0x55d398326f99059fF775485246999027B3197955',
        WBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        BURGER: '0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f',
        FUN_USDT_LP: '0xA7F3D08992E6B35a22CF8d3E18FB5883b8C8BDC9',
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
    56: [
        {
            name: "FUN-BURGER",
            address: "0xa31b33A4042457021Db559ca4B1f65b33aC508af",
            pid: 0,
            type: 'double',
            tokenSymbol: "FUN",
            baseSymbol: "BURGER",
            tokenType: 2,
        },
        {
            name: "FUN-USDT",
            address: "0xA7F3D08992E6B35a22CF8d3E18FB5883b8C8BDC9",
            pid: 1,
            type: 'double',
            tokenSymbol: "FUN",
            baseSymbol: "USDT",
            tokenType: 2,
        },
        {
            name: "FUN-WBNB",
            address: "0xea57B995E86a194C19836594D6E2DAC56E25E7a2",
            pid: 2,
            type: 'double',
            tokenSymbol: "FUN",
            baseSymbol: "WBNB",
            tokenType: 2,
        },
        
        {
            name: "FUN",
            address: "0xCC89AC2C6f4a82e5A4c53215b6a6d7ebA4C25E6a",
            pid: 3,
            type: 'single',
            tokenSymbol: "FUN",
            baseSymbol: "",
            tokenType: 1,
        }
    ],
    97: [
        {
            name: "FUN-USDT",
            address: "0x33763d9EdF9D8F91bBAFfA4f8df622f90EC9DDA9",
            pid: 0,
            type: 'double',
            tokenSymbol: "FUN",
            baseSymbol: "USDT",
            tokenType: 2,
        },
        {
            name: "FUN-WBNB",
            address: "0x98655083a337b1658e0b7b818da039e5f1ce707c",
            pid: 1,
            type: 'double',
            tokenSymbol: "FUN",
            baseSymbol: "WBNB",
            tokenType: 2,
        },
        {
            name: "FUN-BURGER",
            address: "0xa0cFA7ca408924c00A57a1603E01fdCA18e16C5F",
            pid: 2,
            type: 'double',
            tokenSymbol: "FUN",
            baseSymbol: "BURGER",
            tokenType: 2,
        },
        {
            name: "FUN",
            address: "0xB9f8985b884d16DedfA8de7f37651AE938949A54",
            pid: 3,
            type: 'single',
            tokenSymbol: "FUN",
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
