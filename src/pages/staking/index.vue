<template>
    <div class="staking">
        <div class="staking-info">
            <staking-info/>
        </div>
        <section class="staking-cont">
            <deposit-item v-for="(item,index) in [0,1,2,3,4]" />
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import StakingInfo from './modules/staking-info.vue'
    import DepositItem from './modules/deposit-item.vue'
    import ChinaApi from "@/assets/sdk/ChainApi.js";
    import WebChina from "utils/sdk"

    @Component({
        name: 'Staking',
        components: {StakingInfo, DepositItem}
    })
    export default class Staking extends Vue{
        private title: string | undefined = 'Staking'

        mounted(){
            WebChina.connect().then(data => {
                ChinaApi.getPools()
                    .then( res => {
                        console.log(res)
                        // this.poolList = res
                    })
                    .catch(e => { this.$load.tipErrorShow('获取合约列表失败')})
                    .finally(_ => this.$load.hideLoading())
            }).catch(_ => this.$load.hideLoading())
        }
    }
</script>

<style lang="scss" scoped>
    .staking{
        width: 100%;
        section{
            margin-top: 98px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
    }
</style>
