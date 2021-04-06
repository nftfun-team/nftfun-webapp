<template>
<div style="width: 100%">
    <chart-data :data="data" :type="type"></chart-data>
</div>
</template>

<script>
import ChartData from './index'

export default {
    name: 'mktcap-chart',
    components: {ChartData},
    props: ['data', 'type']
}
</script>

<style scoped>

</style>
