<template>
    <section class="common">
        <div class="common-head f-pf f-fw8">
            <div class="common-head-title">
                <img class="common-head-title-back f-cursor" src="~img/back.svg" alt="" @click="goBack()">
                {{title}}
            </div>

            <div class="common-head-address" v-if="walletAddress" @click="visible = true">
                <img src="~img/BNB.svg" alt="">
                <span class="f-cursor">{{walletAddress | hash(6)}}</span>
            </div>
            <com-button class="com-button" v-else style="{width: 184px;height: 55px}" @click="setWalletShow(true)" name="CONNECT WALLET" />
        </div>
        <div class="common-section"> <router-view /> </div>
        <dialog-top
                :account="walletAddress"
                :visible.sync="visible"
                @close="visible = false"
                @showLogin="setWalletShow(true)"
        />
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch, Inject } from "vue-property-decorator";
    import {Action, Getter} from "vuex-class";
    import ComButton from "components/button/index.vue";
    import DialogTop from "./Dialog-top.vue";
    import {A_CHAIN_COONNECT, G_CHAIN_WALLETADDRESS} from "store/modules/chain/types";

    @Component({
        name: 'Layout',
        components: { ComButton, DialogTop }
    })
    export default class AppLayout extends Vue{
        @Action(A_CHAIN_COONNECT) private connectWallet!: Function;
        @Getter(G_CHAIN_WALLETADDRESS) private walletAddress!: string;
        @Inject('setWalletShow') setWalletShow!: Function

        @Watch("$route",{immediate: true, deep: true})
        getRoute(to:any){
            switch (to.path) {
                case '/staking': this.title = 'Staking'; break;
                case '/dashboard': this.title = 'Dashboard'; break;
            }
        }

        private title: string = 'Staking';
        private visible: Boolean = false;

        private goBack(): void{
            this.$router.push({
                path: '/'
            })
        }
    }
</script>

<style lang="scss" scoped>
    .common{
        padding-top: 100px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        &-head{
            padding: 0 3%;
            width: 100%;
            height: 100px;
            top: 0;
            left: 0;
            box-shadow: 0px 4px 4px rgba(243, 243, 243, 0.8);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 36px;
            background: #fff;
            z-index: 99;
            &-title{
                display: flex;
                align-items: center;
                &-back{
                    margin-right: 10px;
                    width: 40px;
                    margin-left: -10px;
                }
            }

            &-address{
                padding: 5px 18px;
                border-radius: 20px;
                background: #F3CDC7;
                display: flex;
                align-items: center;
                img{
                    width: 30px;
                    height: 30px;
                    margin-right: 14px;
                }
                span{
                    font-size: 18px;
                }
            }

        }
        &-section{
            width: 1192px;
            height: 100%;
        }
    }
    @media (max-width: 768px) {
        .common{
            padding-top: 85px;
            &-head{
                font-size: 18px;
                height: 60px;
                &-title{
                    &-back{
                        width: 26px;
                        position: relative;
                        margin-right: 5px;
                        margin-left: 0px;
                    }
                }

                &-address{
                    padding: 7px 12px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    background: #FFC1B7;
                    img{
                        width: 14px;
                        height: 14px;
                        margin-right: 8px;
                    }
                    span{
                        font-size: 12px;
                    }
                }
            }
        }
        .com-button{
            height: 28px !important;
            font-size: 12px !important;
        }
    }
</style>
