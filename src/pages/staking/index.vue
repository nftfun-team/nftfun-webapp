<template>
    <div class="staking">
<!--        <div class="staking-info">-->
<!--            <staking-info/>-->
<!--        </div>-->

<!--        <coming-soon />-->
        <loading :loading="load">
            <no-data v-if="poolList.length === 0" />
            <section class="staking-cont" v-else>
                <deposit-item v-for="(item,index) in poolList" :key="index" :data="item" />
            </section>
        </loading>
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

        mounted(){
            WebChain.connect().then(data => {
                this.load = true
                this.$ChainApi.getPools()
                    .then( res => {
                        console.error('---->', res)
                        this.poolList = res
                    })
                    .catch(e => { this.$load.tipErrorShow('获取列表失败'); console.error(e)})
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
