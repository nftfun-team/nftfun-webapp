<template>
<div id="app" class="body-main">
    <router-view/>
    <connect-wallet v-if="isShow" @closeModal="isShow = false" @connect="connect" />
</div>
</template>

<script lang="ts">
import {Component, Vue, Provide} from 'vue-property-decorator';
import ConnectWallet from "components/connectWallet/index.vue";
import ChainApi from '@/assets/sdk/ChainApi.js';
import {Storage} from 'utils/storage';
import {Action, Getter, Mutation} from 'vuex-class';

import {
    M_CHAIN_CHAINID,
    M_CHAIN_WALLETADDRESS,
    G_CHAIN_CHAINID,
    G_CHAIN_WALLETADDRESS, A_CHAIN_COONNECT
} from 'store/modules/chain/types';

@Component({
    components: {ConnectWallet}
})
export default class App extends Vue {
    @Action(A_CHAIN_COONNECT) private connectWallet!: Function;
    @Mutation(M_CHAIN_CHAINID) private setChainId!: Function;
    @Mutation(M_CHAIN_WALLETADDRESS) private setWalletAddress!: Function;
    @Getter(G_CHAIN_CHAINID) private ChainId!: string;
    @Getter(G_CHAIN_WALLETADDRESS) private walletAddress!: string;
    private isShow: boolean = false;

    @Provide('setWalletShow')
    setWalletShow(data:boolean = true){
        console.error('data---->', data)
        this.isShow = true
    }


    created() {
        this.init();
    }

    mounted() {
        this.$nextTick(() => {
            (<any>document).getElementById('screen-loading').style.display = 'none';
        });
    }


    // public setWalletShow(data:boolean = true): void {
    //     console.error('data---->', data)
    //     this.isShow = true
    // }

    private reload(): void {
        window.location.reload();
    }

    public init(): void {
        this.onChainStatus();
        this.onChainChanged();
        this.onAccountsChanged();
    }

    private connect(type: string): void{
        this.connectWallet(type).then(res => {
            this.isShow = false;
        })
    }

    onChainStatus() {
        ChainApi.onChainStatus(this.handleChainStatus);
    }

    onChainChanged() {
        ChainApi.onChainChanged(this.handleChainChanged);
    }

    onAccountsChanged() {
        ChainApi.onAccountsChanged(this.handleNewAccounts);
    }

    handleNewAccounts(acc) {
        // console.error('acc----->',acc)
        if (!acc.length) {
            Storage.removeItem('account');
            return;
        }

        let user = this.walletAddress;
        if (acc.length) {
            if (user !== null) {
                if (user !== acc[0]) {
                    this.setWalletAddress(acc[0]);
                    this.reload();
                }
            }
        }
    }

    handleChainChanged(chainId) {
        // console.error('chainId----->',chainId)
        if (!chainId) return;

        if (chainId != this.ChainId && this.ChainId) {
            this.setChainId(chainId);
            this.reload();
        } else {
            this.setChainId(chainId);
        }
    }

    handleChainStatus(status) {
        // console.error('test handleChainStatus:', status);
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
}

</script>

<style lang="scss">
    #app {
        font-size: 14px;
        color: rgba(0, 0, 0);
        width: 100%;
        height: 100%;
    }
</style>
