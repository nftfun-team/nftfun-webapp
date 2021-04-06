<template>
<div style="width: 100%">
    <chart-data :data="data" :type="type"></chart-data>
</div>
</template>

<script>
import ChartData from './index'

export default {
    name: 'price-chart',
    components: {ChartData},
    props: ['data', 'type'],
    data() {
        return {}
    },
}
</script>

<style scoped lang="scss">

</style>
