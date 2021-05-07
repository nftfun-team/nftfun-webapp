<template>
    <div class="staking">
<!--        <div class="staking-info">-->
<!--            <staking-info/>-->
<!--        </div>-->

<!--        <coming-soon />-->
        <loading :loading="load">
            <no-data v-if="poolList.length === 0" />
            <section class="staking-cont" v-else>
                <deposit-item v-for="(item,index) in poolList" :key="index" :data="item" @openTips="dialogTip = true"/>
            </section>
        </loading>


        <el-dialog
                :visible.sync="dialogTip"
                width="45%"
                >
            <div class="app-dialog-tip">
                <img src="~img/wain.svg" alt="">
                <p>1) The single token staking (Staking FUN, Earn FUN) will be close at UTC 11:AM 23rd April. Please all users withdraw your FUN from this staking pool after the closing time and the deadline will be at UTC 11:00 AM 26th April. If you have not withdrawed your FUN before the deadline time, the FUN Protocol team will not be responsible for your losses.</p>
                <p>2) Users can still stake FUN-Burger/ FUN- USDT/ FUN-BNB LP and there will be a higher APR! Keep Staking!</p>
                <p>3) Due the significant fluctuation of the Crypto market, the FUN Protocol team decided to not start Rebase function until the market being relatively stable. The First Rebase Time is now tentatively set at UTC 11:00 AM 26th April.</p>
                <p class="no-indent">Thanks for your supporting and patience!</p>
                <p class="no-indent">Good Luck.</p>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import StakingInfo from './modules/staking-info.vue'
    import DepositItem from './modules/deposit-item.vue'
    import WebChain from "utils/sdk"

    @Component({
        name: 'Staking',
        components: {StakingInfo, DepositItem}
    })
    export default class Staking extends Vue{
        private poolList: Array<any> = []
        private load: Boolean = true;
        private dialogTip: boolean = false;

        mounted(){
            WebChain.connect().then(data => {
                this.load = true
                this.$ChainApi.getPools()
                    .then( res => {
                        this.poolList = res
                    })
                    .catch(e => { this.$load.tipErrorShow('获取列表失败')})
                    .finally(_ => this.load = false)
            }).catch(_ => this.load = false)
        }
    }
</script>

<style lang="scss" scoped>
    .staking{
        width: 100%;
        height: 100%;
        padding-bottom: 50px;
        section{
            margin-top: 70px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            & > div:nth-child(odd){
                margin-right: 25px;
            }
        }
    }
    @media (max-width: 1175px){
        .staking section{
            justify-content: center;
            & > div{
                margin-left: 15px;
                margin-right: 15px !important;
                width: 90%;
                padding: 28px 15px;
            }
        }
    }

    @media (max-width: 768px){
        .staking{
            section{
                margin-top: 0px;
                & > div{
                    padding: 18px;
                }
            }
        }
    }
</style>
