<template>
    <section class="common">
        <div class="common-head f-pf f-fw8">
            {{title}}
            <span class="f-cursor" v-if="walletAddress" @click="visible = true">{{walletAddress | hash(6)}}</span>
            <com-button v-else style="{width: 184px;height: 55px}" @click="isShow = true" name="CONNECT WALLET" />
        </div>
        <div class="common-section"> <router-view /> </div>
        <connect-wallet v-if="isShow" @closeModal="isShow = false" @connect="connect" />
        <dialog-top
                :account="walletAddress"
                :visible.sync="visible"
                @close="visible = false"
                @showLogin="isShow = true"
        ></dialog-top>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from "vue-property-decorator";
    import {Action, Getter} from "vuex-class";
    import ComButton from "components/button/index.vue";
    import ConnectWallet from "components/connectWallet/index.vue";
    import DialogTop from "./Dialog-top.vue";
    import {A_CHAIN_COONNECT, G_CHAIN_WALLETADDRESS} from "store/modules/chain/types";

    @Component({
        name: 'Layout',
        components: { ComButton, ConnectWallet, DialogTop }
    })
    export default class AppLayout extends Vue{
        @Action(A_CHAIN_COONNECT) private connectWallet!: Function;
        @Getter(G_CHAIN_WALLETADDRESS) private walletAddress!: string;

        @Watch("$route",{immediate: true, deep: true})
        getRoute(to:any){
            switch (to.path) {
                case '/staking': this.title = 'Staking'; break;
                case '/dashboard': this.title = 'Dashboard'; break;
            }
        }

        private title: string = 'Staking';
        private isShow: Boolean = false;
        private visible: Boolean = false;

        private connect(type: string): void{
            this.connectWallet(type).then(res => {
                this.isShow = false;
            })
        }
    }
</script>

<style lang="scss" scoped>
    .common{
        padding-top: 160px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        &-head{
            padding: 0 84px;
            width: 100%;
            height: 160px;
            top: 0;
            left: 0;
            box-shadow: 0px 4px 4px rgba(243, 243, 243, 0.8);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 40px;
            background: #fff;
            z-index: 99;
        }
        &-section{
            width: 1192px;
            height: 100%;
        }
    }
</style>
