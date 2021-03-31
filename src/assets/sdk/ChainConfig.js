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
        ThirdTokenPair: '',
        ThirdTokenBurgerPair: '',
        DemaxQueryPairWeigth: '0x19A8cb7498c40dc36FD65e600ad4a67c1F9BF920',
        DemaxTransferListener: '0x3BecD05231bBBa6F7AdDa92F3c79fb3AA96d943b',
        DemaxProjectDeploy: '0x5Bb57735352165cEaBCB50dc9b11DB5341E5C7b5',
        DemaxProjectQuery: '0x76DA67bB008BAeE6e53DCbDCD63c11f10924bF4F',
        ThirdBurgerUsdPair: '0x034772cdcd90f5baabb2da325a879d6aa6840f6e',
        ThirdCokeUsdPair: '',
    },
    97: {
        ThirdTokenPair: '',
        ThirdTokenBurgerPair: '',
        DemaxQueryPairWeigth: '0xbc34DEC637a1b0585d0c089041De592EbbF1072E',
        DemaxTransferListener: '0x6Cb0205BeD6133bcb9531c475D6E01f6CF0e2cd4',
        DemaxProjectDeploy: '0xB2632a763d7E32FC895f1852D5B039199071ED60',
        DemaxProjectQuery: '0x1286305a93fC34Fc530D57503045838fF1fe7Fb2',
        IFOFactory: '0x51B8a6E45fc09f5fED502Fe87952A5825384538c',
        IFOQuery: '0x319bFA57e452815184880EFf71eFD1FF729C3f82',
        IFOBaseToken: '0xF2ED382e6A3439Be124813842200cf6702fD6ecA',
        IFOLPToken: '0x60EF479e7d48578dFE9edd8b22504A2b4c3D6Fe8',
    },
}

const Tokens = {
    56: {
        BURGER: '0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f',
        USDT: '0x55d398326f99059fF775485246999027B3197955',
        WETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        USDC: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    97: {
        BURGER: '0x06bF890dfF5b422c35c9683f47d2d7663f6E1c24',
        USDT: '0x8FB6a96E1A3CB6ABFd3714d49d4040cEC9bb34fC',
        WETH: '0x7FcCaDD3e6A3F80e194CaDf13FeDF36B9BBbe98F',
        USDC: '0xE1106e7396dEA8c298Af67C1cdd732e0f3F32361',
        BUSD: '',
    },
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

const AdminUsers = {
    56: [
        "0xbc554d0FA1745AeB52acBA8343106CF8ACa038Ca",
        "0x710981E8bDDD736C6796e968115B70697681221a"
    ],
    97: [
        "0xEcF600B841D0734F301B8Cc7e6e3c93772638851",
        "0xa027d231d6852f8986409dccc58908d83a48169f"
    ]
}

const BALLOT_BYTECODE = ""


export {CHAIN_RPC, CHAIN_BROWSER, Tokens, ContractsAddr, ChainSymbol, BALLOT_BYTECODE, IPFS_URL, AdminUsers};
