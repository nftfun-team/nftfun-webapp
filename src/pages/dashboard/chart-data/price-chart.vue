<template>
<div style="width: 100%">
    <chart-data :data="data" :type="type" :isEmpty="isEmpty"></chart-data>
</div>
</template>

<script>
import ChartData from './index'

export default {
    name: 'price-chart',
    components: {ChartData},
    props: ['data', 'type', 'isEmpty'],
    data() {
        return {}
    },
}
</script>

<style scoped lang="scss">

</style>
