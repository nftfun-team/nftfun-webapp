<template>
    <div id="app" class="body-main">
        <router-view/>
        <connect-wallet v-if="isShow" @closeModal="isShow = false" @connect="connect"/>

        <el-dialog
                :visible.sync="dialogTip"
                width="45%"
                :before-close="handleClose">
            <div class="app-dialog-tip">
                <img src="~img/wain.svg" alt="">
                <p>1) Due the significant fluctuation of the Crypto market, the FUN Protocol team decided to not start Rebase function until the market being relatively stable. The First Rebase Time is now tentatively set at UTC 11:00 AM 26th April.</p>
                <p>2) The single token staking (Staking FUN, Earn FUN) will be close at UTC 11:AM 23rd April. Please all users claim your FUN from this staking pool after the closing time and the deadline will be at UTC 11:00 AM 26th April. If you have not claimed your FUN before the deadline time, the FUN Protocol team will not be responsible for your losses.</p>
                <p>3) Users can still stake FUN-Burger/ FUN- USDT/ FUN-BNB LP and there will be a higher APR! Keep Staking!</p>
                <p class="no-indent">Thanks for your supporting and patience!</p>
                <p class="no-indent">Good Luck.</p>
            </div>
         </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Provide, Watch} from 'vue-property-decorator';
    import ConnectWallet from "components/connectWallet/index.vue";
    import ChainApi from '@/assets/sdk/ChainApi.js';
    import {Storage} from 'utils/storage';
    import {Action, Getter, Mutation} from 'vuex-class';

    import {
        M_CHAIN_CHAINID,
        M_CHAIN_WALLETADDRESS,
        G_CHAIN_CHAINID,
        G_CHAIN_WALLETADDRESS, A_CHAIN_COONNECT, G_CHAIN_CONNECTED
    } from 'store/modules/chain/types';

    @Component({
        components: {ConnectWallet}
    })
    export default class App extends Vue {
        @Action(A_CHAIN_COONNECT) private connectWallet!: Function;
        @Mutation(M_CHAIN_CHAINID) private setChainId!: Function;
        @Mutation(M_CHAIN_WALLETADDRESS) private setWalletAddress!: Function;
        @Getter(G_CHAIN_CHAINID) private ChainId!: string;
        @Getter(G_CHAIN_CONNECTED) private connected!: boolean;
        @Getter(G_CHAIN_WALLETADDRESS) private walletAddress!: string;
        private isShow: boolean = false;
        private dialogTip: boolean = true;
        private tipRouteList: String[] = ['/staking', '/dashboard'];

        @Provide('setWalletShow')
        setWalletShow(data: boolean = true) {
            this.isShow = true
        }

        @Watch("$route",{immediate: true, deep: true})
        getRoute(to:any){
            this.dialogTip = this.tipRouteList.includes(to.path)
        }

        @Watch("connected", {deep: true})
        changeConnect(flag: boolean) {
            console.error('changeConnect---->', flag)
            this.isShow = !flag;
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
            // this.connect('m');
            // if(!this.connected){
            //     this.isShow = true;
            // }
            // console.error('walletAddress=====>',this.walletAddress,'>>>>>',this.ChainId, ChainApi.isConnected())
        }

        private connect(type: string): void {
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
        user-select:none;
    }
    .el-dialog__headerbtn {
        font-size: 30px !important;
        top: 15px !important;
        z-index: 20;
    }
    .app-dialog-tip{
        padding: 0 30px 40px 50px;
        text-align: center;
        img{
            margin: 0 auto 5px;
        }
        p{
            text-indent: -22px;
            text-align: left;
            font-size: 16px;
            line-height: 26px;
            color: #252525;
            margin-top: 15px;
            /*word-wrap: break-word;*/
            word-wrap:break-word;
            word-break:normal;
            &:last-child{
                margin-top: -2px;
            }
        }
        .no-indent{
            text-indent: 0px;

        }
    }
    @media (max-width: 768px) {
        .el-dialog__headerbtn {
            font-size: 25px !important;
            z-index: 20;
        }
        .el-dialog{
            width: 90% !important;
        }
        .app-dialog-tip{
            padding: 0 18px 20px 24px;
            img{
                width: 44px;
                margin: 0 auto 0px;
            }
            p{
                text-indent: -17px;
                font-size: 12px;
                line-height: 18px;
                margin-top: 8px;
            }
        }
    }
</style>
