
import Web3 from "web3"
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import BigNumber from "bignumber.js"
import Web3Util from './Web3Util.js'

import ERC20TokenABI from './abi/ERC20Token.json'
import MasterABI from './abi/Master.json'
import MasterChefABI from './abi/MasterChef.json'
import OracleABI from './abi/Oracle.json'
import QueryABI from './abi/Query.json'
import {CHAIN_RPC, CHAIN_BROWSER, Tokens, Pools, ContractsAddr, ChainSymbol, IPFS_URL, Report_URL, Swap_URL} from './ChainConfig.js'

var InpageProvider = {}
let $ = InpageProvider;

let web3 = null;
let connector
let ethereum = null
let isMetaMaskInstalled = false

$.ZERO_ADDR = '0x0000000000000000000000000000000000000000'
$.EMPTY_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000'
$.accounts = []
$.chainId = 1
$.tokens = {}
$.poolsMapWithIndex = {}
$.poolInfoMapWithPair = {}
$.pairsToken = {}
$.pools = {}
$.contractHistory = []

$.funPrice = '0'
$.masterChefData = {}
let web3Util = new Web3Util()

let chainStatusHandles = []
let newAccountsHandles = []
let newChainHandles = []
let baseToken = ''
let dayPreBlock = 0

function setSession(key, val) {
  if(val !== undefined) {
    sessionStorage.setItem(key, val);
  }
}

function getSession(key) {
  return sessionStorage.getItem(key);
}

function getContractByName(name) {
  let abi = null
  if(name === 'Master') {
    abi = MasterABI
  } else if(name === 'MasterChef') {
    abi = MasterChefABI
  } else if(name === 'Oracle') {
    abi = OracleABI
  } else if(name === 'Query') {
    abi = QueryABI
  }
  let chainId = getNetworkVersion()
  // console.log('getContractByName contract:', chainId, name)
  let addr = ContractsAddr[chainId][name]
  console.log('getContractByName contract address:', chainId, name, addr)
  return getContract(abi, addr)
}

function handleChainStatus (status) {
  console.log('handleChainStatus:', status)
  for (const cb of chainStatusHandles) {
    cb(status)
  }
}

function handleNewChain (chainId) {
  console.log('handleNewChain:', chainId)
  if(!chainId) {
    return
  }
  let cid = Number(chainId)
  console.log('handleNewChain id:', cid)
  $.chainId = cid
  $.loadContractHistory()
  for (const cb of newChainHandles) {
    cb(cid)
  }

}

function walletConnectInit() {
  const bridge = "https://bridge.walletconnect.org";
  connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
  // check if already connected
  let newAccounts = []
  if (!connector.connected) {
    console.log('walletConnectInit connect...');
    // create new session
    connector.createSession()
    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`);
      console.log(JSON.stringify(payload));
      const { accounts, chainId } = payload.params[0];
      newAccounts = accounts
      handleNewAccounts(accounts)
      handleNewChain(chainId)
      handleChainStatus(2)
    })
    // handleNewAccounts(newAccounts)
    connector.on("session_update", (error, payload) => {
      const { accounts, chainId } = payload.params[0];
      console.log('walletConnectInit session_update:', accounts);
      handleNewAccounts(accounts)
      handleNewChain(chainId)
    });
    connector.on("disconnect", (error, payload) => {
      console.log(`connector.on("disconnect")`);
      console.log('walletConnectInit disconnect');
      handleNewAccounts([])
    });
  } else {
    newAccounts = connector.accounts
    console.log('walletConnectInit connected:', newAccounts);
    handleNewAccounts(newAccounts)
    handleChainStatus(2)

  }

  console.log('walletConnectInit account:', newAccounts)
  web3 = getWeb3(true);
  return newAccounts
}

let tryCount = 0
function connectMetamask() {
  if (!window.ethereum) {
    console.log('not found Metamask')
    if(tryCount < 1) {
      setTimeout(()=>{
        connectMetamask()
          tryCount++
      },2000)
    }
    else {
      console.log('not found Metamask, timeout')
        handleChainStatus(0)
    }
  } else {
    ethereum = window.ethereum
    chainConnected()
  }
}

function connectBinance() {
  if (!window.BinanceChain) {
    console.log('not found Binance')
    if(tryCount < 1) {
      setTimeout(()=>{
        connectBinance()
          tryCount++
      },2000)
    }
    else {
      console.log('not found Binance, timeout')
        handleChainStatus(0)
    }
  } else {
    ethereum = window.BinanceChain
    chainConnected()
  }
}

function chainConnected() {
  isMetaMaskInstalled = true
  web3 = new Web3(ethereum);
  handleChainStatus(2)
  console.log('isMetaMaskInstalled:', isMetaMaskInstalled)
  console.log('ethereum:', ethereum)

  console.log('chainClient:', getSession('chainClient'))
  console.log('chainId:', ethereum.chainId)
  handleNewChain(ethereum.chainId)
  ethereum.autoRefreshOnNetworkChange = false
  ethereum.on('chainChanged', handleNewChain)
  ethereum.on('accountsChanged', handleNewAccounts)
}

function handleNewAccounts (newAccounts) {
  $.accounts = newAccounts
  for (const cb of newAccountsHandles) {
    cb(newAccounts)
  }
}

function getWeb3(force = false) {
  if(!web3 || force) {
    console.log('new web3')
    web3 = new Web3(CHAIN_RPC[getNetworkVersion()])
  }
  return web3
}

$.web3 = () => {
  return web3;
}

$.connectChain = (to='') => {
  tryCount = 0
  if(!to) {
    to = getSession('chainClient')
    if(!to) {
      to = 'm'
    }
  }
  console.log('connectChain:', to)
  setSession('chainClient', to)
  if(to == 'b') {
    connectBinance()
  } else if(to == 'm') {
    connectMetamask()
  } else if(to == 'w') {
    walletConnectInit()
  }
}

$.connect = (to='') => {
  if(!to) {
    to = getSession('chainClient')
    if(!to) {
      to = 'm'
    }
  } else {
    $.disconnect()
  }
  if($.isConnected()) {
    return Promise.resolve($.accounts)
  }
  console.log('connect to:', to)
  setSession('chainClient', to)
  tryCount = 0
  if(to === 'm') {
    connectMetamask()
    if (!isMetaMaskInstalled) {
      console.log('No Provider!')
      return Promise.reject('No Provider!')
    }
  } else if(to === 'b') {
    connectBinance()
    if (!isMetaMaskInstalled) {
      console.log('No Provider!')
      return Promise.reject('No Provider!')
    }
  } else if (to === 'w') {
    return Promise.resolve(walletConnectInit())
  }

  if (isMetaMaskInstalled) {
    console.log('connect...')
    return ethereum.request({
      method: 'eth_requestAccounts',
    }).then(newAccounts => {
        console.log('connect accounts', newAccounts)
        handleNewAccounts(newAccounts)
        return newAccounts
    })
  }

}

$.disconnect = () => {
  if (connector && connector.connected) {
    console.log('disconnect connector')
    connector.killSession()
  }

  isMetaMaskInstalled = false
  handleNewAccounts([])
}

$.bigNumberStringFormat = (val, decimals=18, fixed=4) => {
  let amount = new BigNumber(val).shiftedBy(-1*Math.abs(decimals)).toFixed(fixed)
  if(Number(val)>0 && amount < '0.0001') amount = '<0.0001'
  return amount
}


$.getTradingList = (account) => {
  let tableName = $.chainId + account;
  const list = localStorage.getItem(tableName);
  if (list) {
    let data = JSON.parse(list);
    return data.map(d => {
      console.log('log:', d)
      return {
          time: d.time,
          hash: d.hash,
          type: d.type,
          content: parseEventLogContent(d),
      }
  })
  } else {
    return [];
  }
}

$.handleEventLog = (web3, abi, receipt, contractName, eventName) => {
  if(!receipt) {
    console.warn('handleEventLog receipt is null ' ,contractName, eventName)
    return
  }
  let result = web3Util.parseEventLog(web3, abi, receipt, eventName)
  // console.log('handleEventLog:', contractName, eventName, result)
  let hash = result.hash
  let tableName = 'contractEvent' + $.chainId + getSelectedAddress();
  const item = {hash: hash, time: new Date().getTime(), status: 1, contractName: contractName, funcName: eventName, data: result.data};
  // console.log('handleEventLog item:', item)
  const local = localStorage.getItem(tableName);
  if (local) {
    const list = JSON.parse(local);
    list.unshift(item);
    localStorage.setItem(tableName, JSON.stringify(list));
  } else {
    const list = [];
    list.unshift(item);
    localStorage.setItem(tableName, JSON.stringify(list));
  }
}

// status, 0: pending 1:success 2:fail
$.handleCall = (hash, contractName, methodName, status=0) => {
  if(!hash) {
    console.warn('handleCall hash is null ', hash, contractName, methodName)
    return
  }
  let tableName = 'contractCall'+ $.chainId + getSelectedAddress();
  const item = {hash: hash, time: new Date().getTime(), status: status, contractName: contractName, funcName: methodName, data: null};
  // console.log('handleEventLog item:', item)
  const local = localStorage.getItem(tableName);
  if (local) {

    let foundI = -1;
    $.contractHistory.forEach((d, i)=>{
      if(d.hash == item.hash) {
        foundI = i
        return
      }
    })
    if(foundI > -1) {
      $.contractHistory.splice(foundI, 1)
    }
    $.contractHistory.unshift(item);
    localStorage.setItem(tableName, JSON.stringify($.contractHistory));
  } else {
    $.contractHistory.unshift(item);
    localStorage.setItem(tableName, JSON.stringify($.contractHistory));
  }
}

$.loadContractHistory = () => {
  let tableName = 'contractCall'+ $.chainId + getSelectedAddress();
  const local = localStorage.getItem(tableName);
  if (local) {
    $.contractHistory = [...JSON.parse(local)];
  }
}

$.cleanContractHistory = () => {
  let tableName = 'contractCall'+ $.chainId + getSelectedAddress();
  localStorage.removeItem(tableName);
}

$.getBlockNumber = async() => {
  return await getWeb3().eth.getBlockNumber();
}

$.getBlockSpanTime = () => {
  if(getNetworkVersion() == 1) {
    return 13.5;
  }
  return 3;
}

$.getBlockToTimes = (start, end) => {
  let now = new Date().getTime();
  let spanTime = (Number(end) - Number(start))* $.getBlockSpanTime();
  return now+parseInt(spanTime *1000);
}

$.getNowToEndBlockTime = async (block) => {
  let currentBlock = await $.getBlockNumber();
  return getBlockToTimes(currentBlock, block);
}

$.getBlockNumbers = (blockNumber, blockTime, targetTime) => {
  let diff = (targetTime - blockTime)/1000/$.getBlockSpanTime();
  return Number(blockNumber) + parseInt(diff);
}

$.getBlockNumberCount = (blockTime, targetTime) => {
  return parseInt((targetTime - blockTime)/1000/$.getBlockSpanTime());
}

$.string2bytes32 = (val) => {
  return web3Util.string2bytes32(val)
}

$.bytes32string = (val) => {
  return web3Util.hexToAscii(val)
}

$.keccak256 = (val) => {
  return web3Util.keccak256(val)
}

$.onChainStatus = (handleChainStatus) => {
  chainStatusHandles.push(handleChainStatus)
}

$.onAccountsChanged = (handleNewAccounts) => {
  newAccountsHandles.push(handleNewAccounts)
}

$.onChainChanged = (handleChain) => {
  newChainHandles.push(handleChain)
}

$.on = (event, handler) => {
  ethereum.on(event, handler)
}

$.getAccounts = () => {
  console.log('getAccounts')
  if ($.accounts.length > 0) {
    return Promise.resolve($.accounts)
  }
  if (connector && connector.connected) {
    return Promise.resolve(connector.accounts)
  }
  if (isMetaMaskInstalled) {
    return ethereum.request({
      method: 'eth_accounts',
    })
  }
  return Promise.resolve([])
}

$.isChainConnected = () => {
  console.log('isChainConnected')
  if (connector && connector.connected) {
    return true
  }
  if(window.ethereum) {
    isMetaMaskInstalled = true
    return true
  }
  isMetaMaskInstalled = false
  return false
}

$.isConnected = () => {
  console.log('isConnected')
  if (connector && connector.connected) {
    return true
  }
  if (!isMetaMaskInstalled) {
    return false
  }
  return $.accounts.length > 0
}

$.getEtherscanAddress = (address) => {
  address = address || $.accounts[0]
  return CHAIN_BROWSER[getNetworkVersion()] + "/address/" + address
}

$.getEtherscanTx = (tx) => {
  return CHAIN_BROWSER[getNetworkVersion()] + "/tx/" + tx
}

$.getSwapTradeUrl = (tokenIn, tokenOut) => {
  return Swap_URL[getNetworkVersion()] + '/swap?inputCurrency='+tokenIn+'&outputCurrency='+tokenOut
}

$.getSwapAddLpUrl = (token0, token1) => {
  return Swap_URL[getNetworkVersion()] + '/add/'+token0+'/'+token1
}

function transactionReceiptAsync(hash, resolve, reject) {
  getWeb3().eth.getTransactionReceipt(hash).then(receipt => {
    if (!receipt) {
      setTimeout(function () {
        transactionReceiptAsync(hash, resolve, reject)
      }, 1000);
    } else {
      resolve(receipt)
    }
  }).catch(reject)
}

$.getZeroSymbol = () => {
  return ChainSymbol.ZeroToken[getNetworkVersion()]
}

$.getWSymbol = () => {
  return ChainSymbol.WToken[getNetworkVersion()]
}

$.getTokenAddress = (name) => {
  return Tokens[getNetworkVersion()][name]
}

$.isWethAddress = (addr) => {
  return Tokens[getNetworkVersion()][$.getWSymbol()].toLocaleLowerCase() == addr.toLocaleLowerCase()
}

$.getPoolAddress = (address) => {
  if(!address) {
    return $.poolsMapWithIndex[0]
  }
  return address
}

$.getContractAddr = (name) => {
  let cid = getNetworkVersion()
  if(ContractsAddr.hasOwnProperty(cid) && ContractsAddr[cid].hasOwnProperty(name))
    return ContractsAddr[cid][name]
  return ''
}

function getSelectedAddress() {
  if ($.accounts.length > 0) {
    return $.accounts[0]
  } else if (connector && connector.connected && connector.accounts.length > 0) {
    return connector.accounts[0]
  } else if(ethereum) {
    return ethereum.selectedAddress
  }
  console.log('getSelectedAddress is null')
  return ''
}

function getContract(abi, address) {
  if (!abi || !address) {
    throw('Illegal getContract')
    return null
  }
  const web3 = getWeb3()
  return new web3.eth.Contract(abi, address)
}

function getContractMethods(abi, address) {
  const web3 = getWeb3()
  return new web3.eth.Contract(abi, address).methods
}

function getContractMethodsByName(name) {
  let contract = getContractByName(name)
  return contract.methods
}

function getNetworkVersion() {
  let version = 0 // mainnet
  if (connector && connector.connected) {
    console.log('connector chainId:', connector.chainId)
    version = connector.chainId
  } else if (isMetaMaskInstalled) {
    version = Number(ethereum.chainId)
  }
  // console.log('getNetworkVersion:', version)
  return version
}

function awaitTransactionMined(hash) {
  return new Promise(function (resolve, reject) {
    transactionReceiptAsync(hash, resolve, reject)
  })
}

async function executeContract(contract, methodName, value, params) {
  console.log('executeContract:', methodName, value, params)
  const data = contract.methods[methodName](...params).encodeABI()
  if(value && value != '0') {
    value = web3Util.numberToHex(value)
  }
  const tansParams = [
    {
      from: getSelectedAddress(),
      to: contract._address,
      value: value,
      data
    },
  ];

  return await sendTransaction(tansParams)
}

async function executeContractAwait(contract, contractName, methodName, value, params) {
  let hash = await executeContract(contract, methodName, value, params)
  $.handleCall(hash, contractName, methodName, 0)
  let reciept = await awaitTransactionMined(hash)
  let status = 2
  if(reciept.status) {
    status = 1
  }
  $.handleCall(hash, contractName, methodName, status)
  return reciept
}

function executeContractByName(contractName, methodName, value, params) {
  return executeContractAwait(getContractByName(contractName), contractName, methodName, value, params)
}

function sendTransaction(params) {

  if (connector && connector.connected) {
    console.log('sendTransaction connector params:', params)
    return connector.sendTransaction(params[0])
  }
  console.log('sendTransaction params:', params)
  return ethereum
    .request({
      method: 'eth_sendTransaction',
      params,
    })
}

$.getNetworkVersion = getNetworkVersion

$.updateToken = (addr, symbol, decimals) => {
  addr = addr.toLocaleLowerCase()
  if($.tokens[addr] == undefined) $.tokens[addr] = {}
  $.tokens[addr]['address'] = addr
  $.tokens[addr]['symbol'] = symbol
  $.tokens[addr]['decimals'] = decimals
}

$.getToken = (addr) => {
  addr = addr.toLocaleLowerCase()
  return $.tokens[addr]
}

$.queryToken = async (addr) => {
  addr = addr.toLocaleLowerCase()
  let token = $.tokens[addr]
  if(!token) {
    let methods = getContractMethods(ERC20TokenABI, addr)
    let symbol = await methods.symbol().call()
    let decimals = await methods.decimals().call()
    $.updateToken(addr, symbol, decimals)
    token = $.tokens[addr]
  }
  return token
}

$.getTokenDecimals = async (addr) => {
  let token = await $.queryToken(addr)
  if(token) {
    return Number(token['decimals'])
  }
  console.error('getTokenDecimals not found token:', addr)
  return 18
}

$.allowance = async (token, spender) => {
  if (!spender) {
    throw('please  input spender')
  }
  if($.isWethAddress(token)) {
    return new BigNumber('1000000000000000000000').toFixed()
  }
  console.log('allowance:', token, getSelectedAddress(), spender)
  let methods = getContractMethods(ERC20TokenABI, token)
  let decimals = await methods.decimals().call();

  let allowance = await methods.allowance(getSelectedAddress(), spender).call();
  return new BigNumber(allowance).shiftedBy(-1*decimals).toFixed()
}

$.approve = async (token, spender) => {
  if (!spender) {
    throw('please  input spender')
  }
  // console.log('approve:', token, spender)
  const maxApproval = new BigNumber(2).pow(255).minus(1)
  let contact = getContract(ERC20TokenABI, token)
  return await executeContractAwait(contact, 'Token', 'approve', 0, [spender, maxApproval.toFixed()])
}

$.getBalance = async (address) => {
  if (!address) {
    address = getSelectedAddress()
  }
  const web3 = getWeb3()
  return await web3.eth.getBalance(address)
}

$.balanceOf = async (token, address) => {
  if($.isWethAddress(token)) {
    return await $.getBalance(address)
  }
  let methods = getContractMethods(ERC20TokenABI, token)
  return await methods.balanceOf(address).call()
}

$.tokenBalanceOf = async (token, address) => {
  // console.log('tokenBalanceOf:', token, address)
  if($.isWethAddress(token)) {
    let balance = await $.getBalance(address)
    return new BigNumber(balance).shiftedBy(-18).toFixed()
  }
  let methods = getContractMethods(ERC20TokenABI, token)
  let decimals = await methods.decimals().call()
  let balance = await methods.balanceOf(address).call()
  console.log('tokenBalanceOf:', token, decimals, balance)
  return new BigNumber(balance).shiftedBy(-1*decimals).toFixed()
}

$.getTokenPriceByReserve = (res, token) => {
  let d0 = new BigNumber(res.decimals0)
  let d1 = new BigNumber(res.decimals1)
  let r0 = new BigNumber(res.reserve0)
  let r1 = new BigNumber(res.reserve1)
  let offset = d0.minus(d1)
  r1 = r1.multipliedBy(new BigNumber(10).pow(offset))
  if (token.toLocaleLowerCase() === res.token0.toLocaleLowerCase()) {
    return r1.dividedBy(r0).toFixed()
  } else {
    return r0.dividedBy(r1).toFixed()
  }
}

$.getTokenPrice = async (pair, token) => {
  if (!pair || !token) {
    return '0'
  }
  let methods = getContractMethodsByName('Query')
  let res = await methods.getSwapPairReserve(pair).call()
  return $.getTokenPriceByReserve(res, token)
}

$.getTokenPriceByTokens = async (token, baseToken) => {
  let methods = getContractMethodsByName('Query')
  let res = await methods.getSwapPairReserveByTokens(token, baseToken).call()
  return $.getTokenPriceByReserve(res, token)
}

$.getFunPrice = async () => {
  return await $.getTokenPriceByTokens($.getTokenAddress('FUN'), $.getTokenAddress('USDT'))
}

$.getWTokenPrice = async () => {
  return await $.getTokenPriceByTokens($.getTokenAddress($.getWSymbol()), $.getTokenAddress('USDT'))
}

$.getLpValue = async (token, baseToken, amount) => {
  let methods = getContractMethodsByName('Query')
  return await methods.getLpValue(token, baseToken, amount).call()
}

$.getDemaxLpValue = async (lpToken, baseToken, amount) => {
  let methods = getContractMethodsByName('Query')
  return await methods.getDemaxLpValue(lpToken, baseToken, amount).call()
}

$.getLpUsdValue = async (pool, amount) => {
  let token = $.getTokenAddress(pool.tokenSymbol)
  let baseToken = $.getTokenAddress(pool.baseSymbol)
  if(baseToken.toLocaleLowerCase() == $.getTokenAddress($.getWSymbol()).toLocaleLowerCase()) {
    let res = await $.getLpValue(token, baseToken, amount)
    let wValue = new BigNumber(res[0]).shiftedBy(-1*res[1])
    let wPrice = await $.getWTokenPrice()
    return wValue.multipliedBy(wPrice).toFixed()
  } else if(baseToken.toLocaleLowerCase() == $.getTokenAddress('BURGER').toLocaleLowerCase()) {
      let res = await $.getDemaxLpValue(pool.address, baseToken, amount)
      console.log('getDemaxLpValue:', res)
      let burgerValue = new BigNumber(res[0]).shiftedBy(-1*res[1])
      let burgerPrice = await $.getTokenPriceByTokens($.getTokenAddress('BURGER'), $.getTokenAddress('USDT'))
      console.log('burgerPrice:', burgerPrice)
      return burgerValue.multipliedBy(burgerPrice).toFixed()
  } else if(baseToken.toLocaleLowerCase() == $.getTokenAddress('USDT').toLocaleLowerCase()) {
    let res = await $.getLpValue(token, baseToken, amount)
    return new BigNumber(res[0]).shiftedBy(-1*res[1]).toFixed()
  }
  return '0'
}

$.poolRewardApr = async (poolData, masterChefData, funPrice) => {
  if(masterChefData.funPerBlock == 0 || masterChefData.totalAllocPoint == 0 || masterChefData.totalSupply == 0 || funPrice ==0) {
    console.log('poolRewardApr param is 0 ', masterChefData, poolData.totalStake, funPrice)
    return '0'
  }

  let aYearAmount = new BigNumber(masterChefData.funPerBlock).shiftedBy(-9).div($.getBlockSpanTime()).multipliedBy(24*3600*365)
  aYearAmount = aYearAmount.multipliedBy(poolData.weight).div(masterChefData.totalAllocPoint)
  let earned = aYearAmount.multipliedBy(funPrice)
  if(poolData.totalStakeValue > 0) {
    console.log('poolRewardApr earned is ', poolData.tokenSymbol+'/'+poolData.baseSymbol, earned.toFixed(), funPrice)
    return earned.div(new BigNumber(poolData.totalStakeValue)).multipliedBy(100).toFixed(2)
  }
  console.log('poolRewardApr earned is 0 ', poolData.tokenSymbol+'/'+poolData.baseSymbol, earned.toFixed(), funPrice, aYearAmount.toFixed())
  return earned.toFixed(2)
}

$.updatePool = async(pid) => {
  let userInfo = await getContractMethodsByName('MasterChef').userInfo(pid, getSelectedAddress()).call()
  let poolInfo = await getContractMethodsByName('MasterChef').poolInfo(pid).call()
  let pendingFun = await $.pendingFun(pid)
  $.pools[pid].userBalance = await $.tokenBalanceOf($.pools[pid].address, getSelectedAddress())
  $.pools[pid].userAmount = new BigNumber(userInfo.amount).shiftedBy(-18).toFixed()
  $.pools[pid].userReward = new BigNumber(pendingFun).shiftedBy(-9).toFixed()
  let totalStake = await $.balanceOf($.pools[pid].address, $.getContractAddr('MasterChef'))
  $.pools[pid].totalStake = new BigNumber(totalStake).shiftedBy(-18).toFixed()
  $.pools[pid].totalStakeValue = await $.getLpUsdValue($.pools[pid], totalStake)
  $.pools[pid].weight = poolInfo.allocPoint
  $.pools[pid].apr = await $.poolRewardApr($.pools[pid], $.masterChefData, $.funPrice)
  $.pools[pid].userAllowance = await $.allowance($.pools[pid].address, $.getContractAddr('MasterChef'))
  console.log('updatePool:', $.pools[pid])
  return $.pools[pid]
}

$.getPools = async() => {
  let pools = Pools[getNetworkVersion()]
  $.funPrice = new BigNumber(await getContractMethodsByName('Oracle').getCurrentRate().call()).shiftedBy(-18).toFixed(2)
  $.masterChefData = {
    totalAllocPoint: await getContractMethodsByName('MasterChef').totalAllocPoint().call(),
    totalSupply: await getContractMethodsByName('MasterChef').totalSupply().call(),
    funPerBlock: await getContractMethodsByName('MasterChef').funPerBlock().call(),
    endBlock: await getContractMethodsByName('MasterChef').endBlock().call(),
  }
  let curBlock = await $.getBlockNumber()
  let status = 1 // open
  if(Number(curBlock) > Number($.masterChefData.endBlock)) {
    status = 0 // close
  }
  pools.forEach(async (d)=>{
    d.apr = '--'
    d.userAllowance = '0'
    d.userBalance = '--'
    d.userAmount = '--'
    d.userReward = '--'
    d.userAmount = '--'
    d.totalStake = '--'
    d.totalStakeValue = '--'
    d.weight = '--'
    d.status = status
    $.pools[d.pid] = d
    $.updatePool(d.pid)
  })
  return pools
}

$.rebase = async() => {
  return await executeContractByName('Master', 'rebase', 0, [])
}

$.deposit = async(pid, amount) => {
  amount = new BigNumber(amount).shiftedBy(18).toFixed()
  return await executeContractByName('MasterChef', 'deposit', 0, [pid, amount])
}

$.withdraw = async(pid, amount) => {
  amount = new BigNumber(amount).shiftedBy(18).toFixed()
  return await executeContractByName('MasterChef', 'withdraw', 0, [pid, amount])
}

$.pendingFun = async(pid) => {
  return await getContractMethodsByName('MasterChef').pendingFun(pid, getSelectedAddress()).call()
}

$.harvest = async(pid) => {
  return await executeContractByName('MasterChef', 'harvest', 0, [pid])
}

$.nftCurrentValue = async() => {
  return await getContractMethodsByName('Oracle').nftCurrentValue().call()
}

$.updateNftCurrentValue = async(value) => {
  return await executeContractByName('Oracle', 'updateNftCurrentValue', 0, [value])
}

$.info = async() => {
  let data = {
    cooldown: Number(await getContractMethodsByName('Master').lastRebaseTimestampSec().call()) + Number(await getContractMethodsByName('Master').rebaseCooldown().call()),
    oraclePrice: new BigNumber(await getContractMethodsByName('Oracle').getRate().call()).shiftedBy(-18).toFixed(2),
    totalSupply: new BigNumber(await getContractMethods(ERC20TokenABI, $.getTokenAddress('FUN')).totalSupply().call()).shiftedBy(-9).toFixed(2),
    price: new BigNumber(await getContractMethodsByName('Oracle').getCurrentRate().call()).shiftedBy(-18).toFixed(2),
    nftCurrentValue: await getContractMethodsByName('Oracle').nftCurrentValue().call(),
    targetPrice: 1.00,
    marketCap: 0
  }
  data.marketCap = new BigNumber(data.totalSupply).multipliedBy(data.price).toFixed(2)
  return data
}

$.report = async() => {
  let url = Report_URL[getNetworkVersion()] + '/report'
  let resp = await fetch(url, {
    method: 'get'
  })

  let text = await resp.text()
  try {
    return JSON.parse(text)
  } catch(e) {
    return {
      code: 1,
      msg: 'fail',
      data: []
    }
  }
}

$.history = async(page=1, size=10) => {
  let url = Report_URL[getNetworkVersion()] + '/history?page='+page+'&size='+size
  let resp = await fetch(url, {
    method: 'get'
  })

  let text = await resp.text()
  try {
    return JSON.parse(text)
  } catch(e) {
    return {
      code: 1,
      msg: 'fail',
      data: []
    }
  }
}

export default InpageProvider
