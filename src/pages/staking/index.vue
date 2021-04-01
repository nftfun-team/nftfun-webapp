<template>
    <div class="staking f-pf">
        <div class="staking-info">
            <staking-info/>
        </div>
        <section class="staking-cont">
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
        div {
            margin: 0 auto;
        }
    }
</style>
