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

    @Component({
        name: 'Staking',
        components: {StakingInfo, DepositItem}
    })
    export default class Staking extends Vue{
        private title: string | undefined = 'Staking'
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
