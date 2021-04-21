<template>
<div style="width: 100%">
    <chart-data :data="data" :type="type" :isEmpty="isEmpty" :chartType="'SUPPLY'" :loading="loading"></chart-data>
</div>
</template>

<script>
import ChartData from './index'
export default {
    name: 'supply-chart',
    components: {ChartData},
    props: ['data', 'type', 'isEmpty', 'loading']
}
</script>

<style scoped>

</style>
