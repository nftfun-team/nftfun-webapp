<template>
<div class="_dashboard">
<!--    <Tabs :tabsList="tabsList" @tab="tabClick"/>-->
<!--    <div class="_flex _justify-content-center">-->
<!--        <PriceSupply v-if="active === 1"/>-->
<!--        <History v-if="active === 2"/>-->
<!--    </div>-->

    <coming-soon />
</div>
</template>

<script>
import Tabs from '@/components/tabs/index.vue';
import PriceSupply from './price-supply/index';
import History from './history/index'

export default {
    name: 'index',
    components: {Tabs, PriceSupply, History},
    data() {
        return {
            tabsList: [
                {
                    name: '1',
                    label: 'PRICE AND SUPPLY',
                    active: 1
                },
                {
                    name: '2',
                    label: 'REBASE HISTORY',
                    active: 2
                }
            ],
            active: 1
        }
    },
    methods: {
        tabClick($event) {
            this.active = $event.active;
        }
    }
}
</script>

<style scoped lang="scss">
    ._header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 160px;
        font-size: 40px;
        color: #000000;
        font-weight: bold;
        padding: 0 80px;
        background: #FCFEFF;
        box-shadow: 0 4px 4px rgba(243, 243, 243, 0.8);
    }

    ._dashboard {
        padding: 84px 0;
    }
</style>
