<template>
<div class="index-wrap up-main">
  <p>WalletAddress: {{walletAddress}}</p>
    <div style="display: flex; background: #fff; justify-content: space-between;">
      <div>
        <div style="display: flex;">
          <a href="javascript:;" class="btn btn-bg" @click="connectWallet('m')">Metamask</a>&nbsp;&nbsp;
          <a href="javascript:;" class="btn btn-bg" @click="connectWallet('b')">Balance</a>&nbsp;&nbsp;
          <a href="javascript:;" class="btn btn-bg" @click="connectWallet('w')">WConnect</a>&nbsp;&nbsp;
        </div>
      </div>
    </div>
    <div style="height:20px;background: #fff;"></div>
    <div style="height:20px;background: #fff;"></div>
    <div style="display: flex; background: #fff; justify-content: space-between;">
      <div>
        <a href="javascript:;" class="btn btn-bg">Common</a>
        <a href="javascript:;" class="btn btn-line" @click="disconnect">Logout</a>
        <a href="javascript:;" class="btn btn-line" @click="isChainConnected">isChainConnected</a>
        <a href="javascript:;" class="btn btn-line" @click="isConnected">isConnected</a>
        <a href="javascript:;" class="btn btn-line" @click="connectChain">connectChain</a>
        <a href="javascript:;" class="btn btn-line" @click="onChainStatus">onChainStatus</a>
        <a href="javascript:;" class="btn btn-line" @click="onChainChanged">onChainChanged</a>
        <a href="javascript:;" class="btn btn-line" @click="onAccountsChanged">onAccountsChanged</a>

        <a href="javascript:;" class="btn btn-line" @click="balanceOf('FUN')">balanceOf FUN</a>
        <a href="javascript:;" class="btn btn-line" @click="tokenBalanceOf('FUN')">tokenBalanceOf FUN</a>
        <a href="javascript:;" class="btn btn-line" @click="approve('LP')">approve LP</a>
        <a href="javascript:;" class="btn btn-line" @click="allowance('LP')">allowance LP</a>

        <a href="javascript:;" class="btn btn-line" @click="getPools">getPools</a>
        <a href="javascript:;" class="btn btn-line" @click="info">info</a>
        <a href="javascript:;" class="btn btn-line" @click="rebase">rebase</a>
        <a href="javascript:;" class="btn btn-line" @click="deposit">deposit</a>
        <a href="javascript:;" class="btn btn-line" @click="withdraw">withdraw</a>
        <a href="javascript:;" class="btn btn-line" @click="harvest">harvest</a>
      </div>
    </div>
  </div>
</template>

<script>
import BigNumber from "bignumber.js"
import {Pools} from '@/assets/sdk/ChainConfig.js'
import ChainApi from "@/assets/sdk/ChainApi.js";
import {mapGetters} from 'vuex';
import {G_CHAIN_WALLETADDRESS} from "store/modules/chain/types";


export default {
  name: 'Test',
  data () {
    return {
      walletAddress: '',
      balance:'',
    }
  },
  created() {
    // // console.log(FilTokenAddr['97']);
    // console.log(ChainApi.isConnected())
    this.getAccount();
  },
  mounted() {
    this.init();
  },
  methods: {
    userAgent() {
      // console.log('userAgent:', navigator.userAgent)
      alert(navigator.userAgent)
    },
    init() {
      if (this.isConnect) {
        this.queryPoolList()
      }
    },
    connectChain() {
      this.onChainChanged()
      ChainApi.connectChain()
    },
    handleChainStatus(status) {
      // console.log('test handleChainStatus:', status)
    },
    onChainStatus() {
      // console.log('onChainStatus')
      ChainApi.onChainStatus(this.handleChainStatus)
    },
    handleChainChanged(chainId) {
      // console.log('test handleChainChanged:', Number(chainId))
      if(ChainApi.web3()) {
        SwapInstance.onInit(ChainApi.web3());
      }
    },
    isChainConnected() {
      // console.log('isChainConnected:', ChainApi.isChainConnected())
    },
    isConnected() {
      // console.log('isConnected:', ChainApi.isConnected())
    },
    onChainChanged() {
      // console.log('onChainChanged')
      ChainApi.onChainChanged(this.handleChainChanged)
    },
  	getAccount(){
  		ChainApi.getAccounts().then((res) => {
    		// console.log(res);
    	});
  	},
    connectWallet(type){
      // console.log('connectWallet:', type)
      ChainApi.connect(type).then((acc) => {
            this.handleNewAccounts(acc);
            SwapInstance.onInit(ChainApi.web3());
        }).finally(() => {
            // if (fn) {
            //     fn('success');
            // }
        });
    },
    disconnect(){
      ChainApi.disconnect();
    },
    onAccountsChanged() {
      // console.log('onAccountsChanged')
      ChainApi.onAccountsChanged(this.handleNewAccounts)
    },
    handleNewAccounts(newAccounts){
    	// console.log(newAccounts);
      this.walletAddress = newAccounts[0];
      // console.log('walletAddress:', this.walletAddress)
        //const is = newAccounts && newAccounts.length > 0;
        //Storage.storageSetUserName(is ? newAccounts[0] : '');
        //this.setState((state) => {
            //state.account = is ? newAccounts[0] : '';
            //return {
               // ...this.state
           // };
        //});
    },
    getBalance() {
      ChainApi.getBalance().then((res) => {
    		console.log(res);
    	});
    },
    balanceOf(name) {
      ChainApi.balanceOf(Pools[ChainApi.chainId][0].address, this.walletAddress).then((res) => {
    		console.log(res);
    	});
    },
    tokenBalanceOf(name){
    	ChainApi.tokenBalanceOf(Pools[ChainApi.chainId][0].address, this.walletAddress).then((res) => {
    		console.log(res);
        this.balance = res;
    	});
    },
    approve(name) {
      let token = Pools[ChainApi.chainId][0].address
      let platform = ChainApi.getContractAddr('MasterChef')
      ChainApi.approve(token, platform).then(hash => {
            return ChainApi.awaitTransactionMined(hash);
        }).then(tx => {
            console.log('approve tx:', tx);
        }).finally(() => {
            console.log('approve finally')
        });
    },
    allowance(name) {
      let token = Pools[ChainApi.chainId][0].address
      let platform = ChainApi.getContractAddr('MasterChef')
      ChainApi.allowance(token, platform).then(res => {
        console.log(res);
      });

    },
    
    getPools() {
      ChainApi.getPools().then(res => {
        console.log(res);
      });
    },

    deposit() {
      let amount = '0.001'
      if(this.balance) {
        amount = new BigNumber(this.balance).dividedBy(10).toFixed(0)
      }
      ChainApi.deposit(0, amount).then(receipt => {
            console.log('deposit receipt:', receipt)
        }).finally(() => {
            console.log('deposit finally')
        });
    },
    withdraw() {
      let amount = '0.001'
      if(this.balance) {
        amount = new BigNumber(this.balance).dividedBy(20).toFixed(0)
      }
      ChainApi.withdraw(0, amount).then(receipt => {
            console.log('withdraw receipt:', receipt);
        }).finally(() => {
            console.log('withdraw finally')
        });
    },
    harvest() {
      ChainApi.harvest(0).then(receipt => {
            console.log('harvest receipt:', receipt);
        }).finally(() => {
            console.log('repay finally')
        });
    },
  },
  computed: {
    ...mapGetters({
      // isConnect: 'isConnect',
      account: G_CHAIN_WALLETADDRESS
    })
  },
  watch: {
    isConnect ()  {
      if (this.isConnect) {
        // 拿数据
        this.init()
      }
    }
  },
}
</script>
<style lang="scss" scoped>


    .up-main{
        display: block;
        flex: 1;
        flex-basis: auto;
        overflow: auto;
    }

    .btn{
        display: block;
        width: 140px;
        height: 34px;
        border-radius: 4px;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
    }

    .btn.btn-bg{
        color: #ffffff;
        background: linear-gradient(90deg, #22B4B5 0%, #21DAB6 100%);
    }

    .btn.btn-line{
        border: 2px solid #22B4B5;
        background: #ffffff;
        color: #22B4B5;
        line-height: 32px;
    }

    .btn-text{
        color: #22B4B5;
    }
</style>

