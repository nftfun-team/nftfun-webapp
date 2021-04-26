import ChainApi from '../assets/sdk/ChainApi.js'
import {Storage} from "utils/storage"
import store from 'store'
import User from 'utils/user'
import { M_CHAIN_WALLETADDRESS } from 'store/modules/chain/types'

class WebChain {
    walletAddress = ''

    constructor() {
        this.walletAddress = Storage.getItem('walletAddress')
    }

    connect = async (data) => {
        if(!Storage.getItem('chainId')){
            User.logout();
            return Promise.reject({account: '', isConnect: false})
        }

        return ChainApi.connect(data).then(acc => {
            let is = acc && acc.length > 0;
            this.walletAddress = is ? acc[0] : '';
            if (is) {
                User.login(this.walletAddress, is);
                return {account: acc, isConnect: is};
            }else{
                User.logout();
                throw ('链接失败')
            }
        });
    }

    //注册
    onChainStatus = () => {
        ChainApi.onChainStatus(this.handleChainStatus);
    }

    //返回状态
    handleChainStatus = (status) => {
        console.log('test handleChainStatus:', status);
        if (status === 2) {

            //console.log('连接成功');
            // this.$store.commit('isInstall', true);
            // this.isOpen = !this.account;
        } else {
            //console.log('未安装')
            // this.$store.commit('isInstall', false);
            // this.isOpen = true;
        }
    }

    handleChainChanged = (chainId) => {
        console.log('test handleChainChanged:', chainId)
        if (!chainId) {
            return;
        }

        // if (chainId !== this.chainId) {
        //     this.$store.commit('chainId', chainId);
        //     window.location.reload();
        // }
    }

    //监听链
    onChainChanged = () => {
        console.log('onChainChanged')
        ChainApi.onChainChanged(this.handleChainChanged);
    }

    //监听钱包
    onAccountsChanged = () => {
        console.log('onAccountsChanged')
        ChainApi.onAccountsChanged(this.handleNewAccounts);
    }

    handleNewAccounts(acc) {
        // console.log('handleNewAccounts:', acc);
        // if (!acc.length) {
        //     sessionStorage.removeItem('account');
        //     console.log('handleNewAccounts removeItem')
        //     return;
        // }
        //
        // let user = this.walletAddress;
        //
        // if (acc.length) {
        //     if (user !== null) {
        //         if (user === acc[0]) {
        //             console.log('handleNewAccounts no changes')
        //             return;
        //         } else {
        //             this.$store.commit('account', acc[0]);
        //             console.log('handleNewAccounts changes')
        //             this.reload();
        //         }
        //     }
        // }
        // if (user !== null) {
        //     console.log('handleNewAccounts connect')
        //     this.$store.dispatch('connect');
        // }
    }

    checkConnect = () => {
        return this.connect()
    }

    ifoList = () => {
        return ChainApi.ifoList();
    }

    ifoIPFS = () => {
        return ChainApi.ifoIPFS();
    }
}

export default new WebChain()

