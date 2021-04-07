<template>
    <div class="staking">
<!--        <div class="staking-info">-->
<!--            <staking-info/>-->
<!--        </div>-->
        <section class="staking-cont">
            <deposit-item v-for="(item,index) in poolList" :key="index" :data="item" />
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import StakingInfo from './modules/staking-info.vue'
    import DepositItem from './modules/deposit-item.vue'
    import WebChina from "utils/sdk"

    @Component({
        name: 'Staking',
        components: {StakingInfo, DepositItem}
    })
    export default class Staking extends Vue{
        private poolList: Array<any> = []

        mounted(){
            // this.$formatMoney('1212.1212')

            WebChina.connect().then(data => {
                this.$ChainApi.getPools()
                    .then( res => {
                        console.log(res)
                        this.poolList = res
                    })
                    .catch(e => { this.$load.tipErrorShow('获取合约列表失败'); console.error(e)})
                    .finally(_ => this.$load.hideLoading())
            }).catch(_ => this.$load.hideLoading())
        }
    }
</script>

<style lang="scss" scoped>
    .staking{
        width: 100%;
        padding-bottom: 50px;
        section{
            margin-top: 88px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            & > div:nth-child(odd){
                margin-right: 35px;
            }
        }
        @media (max-width: 1192px){
            section{
                justify-content: center;
                & > div{
                    margin-left: 10px;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
