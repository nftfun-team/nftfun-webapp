<template>
<div class="_price-supply _flex _justify-content-center">
    <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
    <Card :label="'ORACLE PRICE'" :value="'$0.97'"/>
    <Card :label="'DITTO SUPPLY'" :value="'5,251,326.75'"/>
    <Card :label="'PRICE TARGET'" :value="'$1.00'"/>
    <Card :label="'DITTO MARKET CAP'" :value="'$5,119,175.15'"/>
    <Button :name="'REBASE'" class="_btn"/>
</div>
</template>

<script>
import Button from '@/components/button/index.vue';

import Card from './card.vue';
import axios from 'axios';

export default {
    name: 'index',
    components: {Button, Card},
    data() {
        return {
            options: null,
            data: [],
            oneDayList: [],
            thirtyDaysList: [],
            allDaysList: [],
            active: '1d',
            type: 'ABS'
        }
    },
    mounted() {
        this.upDate();
    },
    methods: {
        init() {

        },
        upDate() {
            axios.get('/js/chart.json').then(res => {
                if (res) {
                    console.log('这是什么', res.data.info)
                    this.data = res.data.info;
                    console.log('数据', this.data);
                    this.tabClick(this.active, this.type);
                }
            });
        },
        tabClick(name, type) {
            this.active = name;
            this.type = type;
            // this.data = this.data[name];
            const newData = this.getChartData({
                chartData: this.data,
                activeDuration: name,
                activeType: type,
                map: ({x, p}) => ({x, p}),
            })
            console.error('这是数据吗？', newData)
            // this.setOptions(newData)
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

        .chart {
            width: 100%;
            height: 368px;
            background: #FFFFFF;
            border: 1px solid rgba(239, 239, 239, 0.5);
            box-shadow: -2px 5px 6px #EFEEF1;
            border-radius: 8px;
        }

        h3 {
            font-size: 32px;
            line-height: 37px;
            color: #000000;
            font-weight: bold;
            margin-bottom: 10px;
            margin-top: 94px;
            width: 100%;
        }

        ._chart-tabs {
            display: flex;
            width: 100%;
            margin-bottom: 30px;

            div {
                background: #FFFFFF;
                box-shadow: -2px 5px 6px #EFEEF1;
                border-radius: 8px;
                height: 35px;
                overflow: hidden;
                margin-right: 38px;

                &:nth-last-of-type(1) {
                    margin-right: 0;
                }

                span {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 80px;
                    height: 100%;
                    border-right: 1px solid #F8F8F8;
                    cursor: pointer;
                    transition: all .2s;

                    &:nth-last-of-type(1) {
                        border-right: 0;
                    }
                }

                .active {
                    background-color: #F3CDC7;
                }
            }
        }
    }
</style>
