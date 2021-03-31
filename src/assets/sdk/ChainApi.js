
import Web3 from "web3"
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import BigNumber from "bignumber.js"
import Web3Util from './Web3Util.js'

import ERC20TokenABI from './abi/ERC20Token.json'
import IFOABI from './abi/IFO.json'
import IFOFactoryABI from './abi/IFOFactory.json'
import IFOQueryABI from './abi/IFOQuery.json'
import DemaxLPABI from './abi/DemaxLP.json'
import DemaxProjectDeployABI from './abi/DemaxProjectDeploy.json'
import DemaxProjectQueryABI from './abi/DemaxProjectQuery.json'
import DemaxProjectFactory from './abi/DemaxProjectFactory.json'
import DemaxProjectPool from './abi/DemaxProjectPool.json'
import DemaxQueryPairWeigthABI from './abi/DemaxQueryPairWeigth.json'
import DemaxTransferListenerABI from './abi/DemaxTransferListener.json'
import {CHAIN_RPC, CHAIN_BROWSER, Tokens, ContractsAddr, ChainSymbol, BALLOT_BYTECODE, IPFS_URL, AdminUsers} from './ChainConfig.js'
import { data } from "autoprefixer";
// import {ProjectCoin} from '@/assets/js/coin';

var InpageProvider = {}
let $ = InpageProvider;

let web3 = null;
let connector
let ethereum = null
let isMetaMaskInstalled = false

$.ZERO_ADDR = '0x0000000000000000000000000000000000000000'
$.EMPTY_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000'
$.BALLOT_BYTECODE = BALLOT_BYTECODE
$.accounts = []
$.chainId = 1
$.tokens = {}
$.poolsMapWithIndex = {}
$.poolInfoMapWithPair = {}
$.pairsToken = {}
$.ifoPools = {}
$.projectFactories = {}
$.projectPools = {}
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
  if(name === 'IFOFactory') {
    abi = IFOFactoryABI
  } else if(name === 'IFOQuery') {
    abi = IFOQueryABI
  } else if(name === 'DemaxProjectDeploy') {
    abi = DemaxProjectDeployABI
  } else if(name === 'DemaxProjectQuery') {
    abi = DemaxProjectQueryABI
  } else if(name === 'DemaxQueryPairWeigth') {
    abi = DemaxQueryPairWeigthABI
  } else if(name === 'DemaxTransferListener') {
    abi = DemaxTransferListenerABI
  }
  let chainId = getNetworkVersion()
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
  let type = contractName.toLocaleUpperCase() + '_' + eventName.toLocaleUpperCase()
  let tableName = $.chainId + getSelectedAddress();
  const item = {hash: hash, time: new Date().getTime(), type: type, data: result.data, address: result.address};
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

$.updateToken = (addr, symbol, decimals) => {
  // addr = addr.toLocaleLowerCase()
  if($.tokens[addr] == undefined) $.tokens[addr] = {}
  $.tokens[addr]['address'] = addr
  $.tokens[addr]['symbol'] = symbol
  $.tokens[addr]['decimals'] = decimals
}

$.getToken = (addr) => {
  // addr = addr.toLocaleLowerCase()
  return $.tokens[addr]
}

$.queryToken = async (addr) => {
  // addr = addr.toLocaleLowerCase()
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

$.getTokenDecimals = (addr) => {
  // addr = addr.toLocaleLowerCase()
  if($.tokens[addr]) {
    return Number($.tokens[addr]['decimals'])
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
  return await executeContract(contact, 'approve', 0, [spender, maxApproval.toFixed()])
}

$.updatePairToken = (pair, supplyToken, collateralToken, lpToken0Symbol, lpToken1Symbol) => {
  pair = pair.toLocaleLowerCase()
  $.pairsToken[pair] = {
    supplyToken: $.tokens[supplyToken],
    collateralToken: $.tokens[collateralToken],
    lpToken0Symbol: lpToken0Symbol,
    lpToken1Symbol: lpToken1Symbol
  }
  // console.log('updatePairToken:', $.pairsToken[pair])
}

$.getPairToken = (pair) => {
  pair = pair.toLocaleLowerCase()
  return $.pairsToken[pair]
}

$.getEtherscanAddress = (address) => {
  address = address || $.accounts[0]
  return CHAIN_BROWSER[getNetworkVersion()] + "/address/" + address
}

$.getEtherscanTx = (tx) => {
  return CHAIN_BROWSER[getNetworkVersion()] + "/tx/" + tx
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
  return Tokens[getNetworkVersion()]['WETH'].toLocaleLowerCase() == addr.toLocaleLowerCase()
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

  let hash = await sendTransaction(tansParams)
  return awaitTransactionMined(hash)
}

function executeContractByName(contractName, methodName, value, params) {
  return executeContract(getContractByName(contractName), methodName, value, params)
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

$.getDayPreBlock = async() => {
  if(!dayPreBlock) {
    let methods = getContractMethodsByName('AAAAConfig')
    dayPreBlock = parseInt(await methods.DAY().call())
  }
  // console.log('dayPreBlock:', dayPreBlock)
  return dayPreBlock
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
    return new BigNumber(balance).shiftedBy(-18)
  }
  let methods = getContractMethods(ERC20TokenABI, token)
  let decimals = await methods.decimals().call()
  let balance = await methods.balanceOf(address).call()
  return new BigNumber(balance).shiftedBy(-1*decimals)
}

$.queryPairWeightList = async () => {
  let methods = getContractMethodsByName('DemaxQueryPairWeigth')
  let pools = await methods.iteratePairWeightList(0,10000).call()
  for (let res of pools) {
    $.poolInfoMapWithPair[res.pair] = res
  }
  return pools
}


$.getPairInfo = async (pair) => {
  let methods = getContractMethodsByName('DemaxQueryPairWeigth')
  let res = await methods.getPairWeight(pair).call()
  $.poolInfoMapWithPair[res.pair] = res
  return res
}

$.updatePairPowers = async (pairs, values) => {
  let contract = getContractByName('DemaxTransferListener')
  return executeContract(contract, 'updatePairPowers', 0, [pairs, values])
}

$.ifoCreate = async (_lpToken, _offeringToken, _startBlock, _endBlock, _offeringAmount, _raisingAmount) => {
  return await executeContractByName('IFOFactory', 'createPair', 0, [_lpToken, _offeringToken, _startBlock, _endBlock, _offeringAmount, _raisingAmount])
}

$.ifoDeposit = async (pair, amount) => {
  let contract = getContract(IFOABI, pair)
  return await executeContract(contract, 'deposit', 0, [amount])
}

$.ifoHarvest = async (pair) => {
  let contract = getContract(IFOABI, pair)
  return await executeContract(contract, 'harvest', 0, [])
}

$.ifoFinalWithdraw = async (pair, _lpAmount, _offerAmount) => {
  let contract = getContract(IFOABI, pair)
  return await executeContract(contract, 'finalWithdraw', 0, [_lpAmount, _offerAmount])
}

$.ifoLpTokenWithdraw = async (pair, _lpAmount) => {
  let contract = getContract(IFOABI, pair)
  return await executeContract(contract, 'lpTokenWithdraw', 0, [_lpAmount])
}

$.ifoOfferingTokenWithdraw = async (pair, _offerAmount) => {
  let contract = getContract(IFOABI, pair)
  return await executeContract(contract, 'offeringTokenWithdraw', 0, [_offerAmount])
}

$.ifoUpdateOfferingAmount = async (pair) => {
  let contract = getContract(IFOABI, pair)
  return await executeContract(contract, 'updateOfferingAmount', 0, [])
}

$.ifoSetOfferingAmount = async (pair, _offerAmount) => {
  let contract = getContract(IFOABI, pair)
  return await executeContract(contract, 'setOfferingAmount', 0, [_offerAmount])
}

$.ifoSetRaisingAmount = async (pair, _raisingAmount) => {
  let contract = getContract(IFOABI, pair)
  return await executeContract(contract, 'setRaisingAmount', 0, [_raisingAmount])
}

$.ifoSetEndBlock = async (pair, _endBlock) => {
  let contract = getContract(IFOABI, pair)
  return await executeContract(contract, 'setEndBlock', 0, [_endBlock])
}

$.ifoSetParam = async (pair, _startBlock, _endBlock, _offerAmount, _raisingAmount) => {
  let contract = getContract(IFOABI, pair)
  return await executeContract(contract, 'setParams', 0, [_startBlock, _endBlock, _offerAmount, _raisingAmount])
}

$.ifoHasHarvest = async (pair, user) => {
  if(!user) {
    user = getSelectedAddress()
  }
  let contract = getContract(IFOABI, pair)
  return await contract.methods.hasHarvest(user).call()
}

function ifoStatus(start, end) {
  // 0:pending, 1:open, 2:close
  let now = Math.floor(new Date().getTime())
  if(now>= start && now < end) {
    return 1
  } else if(now >= end) {
    return 2
  }
  return 0
}

$.ifoList = async () => {
  let methods = getContractMethodsByName('IFOQuery')
  let pools = await methods.iterateReversePoolList(99999, 0).call()
  let nowBlock = await $.getBlockNumber()
  let data = []
  for (let res of pools) {
    let d = Object.assign({}, res)
    d.startTime = $.getBlockToTimes(nowBlock, res.startBlock)
    d.endTime = $.getBlockToTimes(nowBlock, res.endBlock)
    d.status = ifoStatus(d.startTime, d.endTime)
    $.ifoPools[d.pool.toLocaleLowerCase()] = d
    data.push(d)
  }
  return data
}

$.ifoGetPool = async(pair) => {
  let pool = $.ifoPools[pair.toLocaleLowerCase()]
  if(pool) {
    return pool
  }
  await $.ifoList()
  return $.ifoPools[pair.toLocaleLowerCase()]
}

$.ifoIPFS = async () => {
  let methods = getContractMethodsByName('IFOQuery')
  let res = await methods.ipfs().call()
  if(!res) {
    return []
  }
  let url = $.ipfsUrl() + '/' + res
  let resp = await fetch(url, {
        method: 'get'
    })

  let text = await resp.text()
  try {
    return JSON.parse(text)
  } catch(e) {
    return []
  }
}

$.ifoIPFSHash = async () => {
  let methods = getContractMethodsByName('IFOQuery')
  return await methods.ipfs().call()
}

$.ifoSetIPFS = async (value) => {
  let contract = getContractByName('IFOQuery')
  return executeContract(contract, 'changeIpfs', 0, [value])
}

$.ifoQueryToken = async (token, user) => {
  if(!user) {
    user = getSelectedAddress()
  }
  let methods = getContractMethodsByName('IFOQuery')
  return await methods.queryToken(token).call({from: user})
}

$.getLpValue = async (token, baseToken, amount) => {
  let methods = getContractMethodsByName('IFOQuery')
  let _token = token
  let _baseToken = baseToken
  if(token.toLocaleLowerCase() == $.getContractAddr('IFOBaseToken').toLocaleLowerCase()) {
    _token = baseToken
    _baseToken = token
  }
  return await methods.getLpValue(_token, _baseToken, amount).call()
}

$.getDemaxLpValue = async (lpToken, amount) => {
  let methods = getContractMethodsByName('IFOQuery')
  return await methods.getDemaxLpValue(lpToken, $.getContractAddr('IFOBaseToken'), amount).call()
}

$.ifoManager = async() => {
  let methods = getContractMethodsByName('IFOFactory')
  return {
    owner: await methods.owner().call(),
    dev: await methods.dev().call(),
  }
}

$.ipfsUrl = () => {
  let url = IPFS_URL
  if(process.env.VUE_APP_BASE_IPFS_URL) {
    url = process.env.VUE_APP_BASE_IPFS_URL
  }
  return url
}

$.projectFactoryList = async () => {
  let methods = getContractMethodsByName('DemaxProjectQuery')
  let list = await methods.getFactoryList().call()
  console.log('factory list:', list)
  let nowBlock = await $.getBlockNumber()
  let data = []
  for (let res of list) {
    let d = Object.assign({}, res)
    d.status = 0
    if(nowBlock<res.finishBlock) {
      d.status = 1
    } else if(nowBlock>=res.finishBlock && res.finishBlock > 0) {
      d.status = 2
    }
    d.finishBlockTime = $.getBlockToTimes(nowBlock, res.finishBlock)
    d.finishBlockTime = $.getBlockToTimes(nowBlock, res.finishBlock)
    $.projectFactories[d.factory.toLocaleLowerCase()] = d
    data.push(d)
  }
  return data
}

$.projectPoolList = async (factory) => {
  let methods = getContractMethodsByName('DemaxProjectQuery')
  console.log('projectPoolList-->', factory)
  let list = await methods.getPoolList(factory).call()
  console.log('projectPoolList-->', list)
  for (let res of list) {
    $.projectPools[res.pool.toLocaleLowerCase()] = res
  }
  return list
}

$.projectCreateFactory = async (mintToken, intro) => {
  return await executeContractByName('DemaxProjectDeploy', 'createFactory', 0, [mintToken, intro, '0x'+DemaxProjectFactory['bytecode']])
}

$.projectCreatePool = async (factory, lpToken) => {
  return await executeContractByName('DemaxProjectDeploy', 'createPool', 0, [factory, lpToken, '0x'+DemaxProjectPool['bytecode']])
}

$.projectSetWeights = async (factory, pools, weights) => {
  let contract = getContract(DemaxProjectFactory['abi'], factory)
  return await executeContract(contract, 'setWeights', 0, [pools, weights])
}

$.projectAddReward = async(factory, amount, duration) => {
  let contract = getContract(DemaxProjectFactory['abi'], factory)
  return await executeContract(contract, 'addReward', 0, [amount, duration])
}

$.projectSetFactory = async(factory, value) => {
  return await executeContractByName('DemaxProjectDeploy', 'setFactory', 0, [factory, value])
}

$.projectSetPool = async(pool, value) => {
  return await executeContractByName('DemaxProjectDeploy', 'setPool', 0, [pool, value])
}

$.isAdmin = () => {
  return AdminUsers[getNetworkVersion()].some(res => getSelectedAddress().toLocaleLowerCase() == res.toLocaleLowerCase())
  // AdminUsers[getNetworkVersion()].forEach((u)=>{
  //   if(getSelectedAddress().toLocaleLowerCase() == u.toLocaleLowerCase()) {
  //     return true;
  //   }
  // });
  // return false;
}

export default InpageProvider
