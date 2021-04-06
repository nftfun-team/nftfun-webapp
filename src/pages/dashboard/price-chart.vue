<template>
<div>
    <h3>PRICE</h3>
    <div class="_chart-tabs">
        <div>
            <span :class="{'active': active==='1d'}" @click="tabClick('1d', type)">1 DAY</span>
            <span :class="{'active': active==='30d'}" @click="tabClick('30d', type)">30 DAY</span>
            <span :class="{'active': active==='all'}" @click="tabClick('all', type)">ALL</span>
        </div>

        <div>
            <span :class="{'active': type==='ABS'}" @click="tabClick(active,'ABS')">ABS</span>
            <span :class="{'active': type==='%'}" @click="tabClick(active, '%')">%</span>
        </div>
    </div>
    <chart-data :data="data"></chart-data>
</div>
</template>

<script>
import ChartData from './chart-data/index'

export default {
    name: 'price-chart',
    components: {ChartData},
    props: ['options']
}
</script>

<style scoped>

</style>
