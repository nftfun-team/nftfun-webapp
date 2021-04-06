<template>
<div class="_price-supply _flex _justify-content-center">
    <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
    <Card :label="'ORACLE PRICE'" :value="'$0.97'"/>
    <Card :label="'DITTO SUPPLY'" :value="'5,251,326.75'"/>
    <Card :label="'PRICE TARGET'" :value="'$1.00'"/>
    <Card :label="'DITTO MARKET CAP'" :value="'$5,119,175.15'"/>
    <Button :name="'REBASE'" class="_btn"/>

    <Tabs :title="'PRICE'" :active="active" :type="type" @tab="tabClick"/>
    <PriceChart :data="priceData" :type="type"/>
    <Tabs :title="'SUPPLY'" :active="active" :type="type" @tab="tabClick"/>
    <SupplyChart :data="supplyData" :type="type"/>
    <Tabs :title="'MARKET CAP'" :active="active" :type="type" @tab="tabClick"/>
    <MktCapChart :data="mktCapChartData" :type="type"/>
</div>
</template>

<script>
import Button from '@/components/button/index.vue';
import Card from './card.vue';
import PriceChart from '../chart-data/price-chart';
import SupplyChart from '../chart-data/supply-chart';
import MktCapChart from '../chart-data/mktcap-chart';
import Tabs from '../chart-data/tabs';
import axios from 'axios';
import WebSdk from '../../../utils/sdk'
import ChainApi from '../../../assets/sdk/ChainApi'

export default {
    name: 'index',
    components: {Button, Card, PriceChart, SupplyChart, MktCapChart, Tabs},
    data() {
        return {
            data: null,
            priceData: null,
            supplyData: null,
            mktCapChartData: null,
            active: '1d',
            type: 'ABS'
        }
    },
    mounted() {
        this.upDate();
    },
    methods: {
        upDate() {
            axios.get('/js/chart.json').then(res => {
                if (res) {
                    this.data = res.data.info;
                    this.tabClick({name: this.active, type: this.type});
                }
            });
            WebSdk.connect().then(res => {
                // ChainApi.info().then(res => {
                //     console.log('info====>', res)
                // })
            })
        },
        tabClick($event) {
            this.active = $event.name;
            this.type = $event.type;
            this.getPriceData();
            this.getSupplyData();
            this.getMktCapData();
        },
        getPriceData() {
            this.priceData = this.getChartData({
                chartData: this.data,
                activeDuration: this.active,
                activeType: this.type,
                map: ({x, p}) => ({x, p}),
            });
        },
        getSupplyData() {
            this.supplyData = this.getChartData({
                chartData: this.data,
                activeDuration: this.active,
                activeType: this.type,
                map: ({x, s: p}) => ({x, p}),
            });
        },
        getMktCapData() {
            this.mktCapChartData = this.getChartData({
                chartData: this.data,
                activeDuration: this.active,
                activeType: this.type,
                map: ({x, s, p}) => {
                    const y = s.map((a, i) => parseFloat(a) + parseFloat(p[i]))
                    return {x, p: y}
                },
            });
        },
        getChartData({chartData, activeDuration, activeType, map}) {
            console.error('chartData', chartData)
            const data = chartData[activeDuration]
            if (!data) return

            const {x, p} = map(data)
            let y;
            if (activeType === '%') {
                y = [0]
                for (let i = 1; i < p.length; i++) {
                    const a = parseFloat(p[i])
                    const b = parseFloat(p[i - 1])
                    y.push(!a ? 0 : (1e2 * (a - b)) / a)
                }
            } else {
                y = p.map((py) => parseFloat(py))
            }
            return {
                x,
                y,
                xy: x.map((px, i) => ({x: px, y: y[i]})),
            }
        }
    }
}
</script>

<style scoped lang="scss">
    ._price-supply {
        width: 100%;

        ._btn {
            min-width: 256px;
            margin: 40px 30px 0;

            &::before {
                background-color: #FAFAF1;
            }
        }
    }
</style>
