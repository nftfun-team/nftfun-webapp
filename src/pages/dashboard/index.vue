<template>
<div class="_dashboard">
    <Tabs :tabsList="tabsList" :active="activeIndex"/>
    <div class="_flex _justify-content-center">
        <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
        <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
        <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
        <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
        <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
        <Button :name="'REBASE'" class="_btn"/>
        <Charts class="chart" :options="options"/>
    </div>
</div>
</template>

<script>
import Button from '@/components/button/index.vue';
import Tabs from '@/components/tabs/index.vue';
import Charts from '@/components/echarts/echarts.vue';
import Card from './card.vue'

export default {
    name: 'index',
    components: {Button, Tabs, Card, Charts},
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
            options: null,
            data: [
                ['2000-06-05', 116], ['2000-06-06', 129], ['2000-06-07', 135], ['2000-06-08', 86], ['2000-06-09', 73], ['2000-06-10', 85], ['2000-06-11', 73], ['2000-06-12', 68], ['2000-06-13', 92], ['2000-06-14', 130], ['2000-06-15', 245], ['2000-06-16', 139], ['2000-06-17', 115], ['2000-06-18', 111], ['2000-06-19', 309], ['2000-06-20', 206], ['2000-06-21', 137], ['2000-06-22', 128], ['2000-06-23', 85], ['2000-06-24', 94], ['2000-06-25', 71], ['2000-06-26', 106], ['2000-06-27', 84], ['2000-06-28', 93], ['2000-06-29', 85], ['2000-06-30', 73], ['2000-07-01', 83], ['2000-07-02', 125], ['2000-07-03', 107], ['2000-07-04', 82], ['2000-07-05', 44], ['2000-07-06', 72], ['2000-07-07', 106], ['2000-07-08', 107], ['2000-07-09', 66], ['2000-07-10', 91], ['2000-07-11', 92], ['2000-07-12', 113], ['2000-07-13', 107], ['2000-07-14', 131], ['2000-07-15', 111], ['2000-07-16', 64], ['2000-07-17', 69], ['2000-07-18', 88], ['2000-07-19', 77], ['2000-07-20', 83], ['2000-07-21', 111], ['2000-07-22', 57], ['2000-07-23', 55], ['2000-07-24', 60]
            ]
        }
    },
    mounted() {
        this.upDate();
    },
    methods: {
        upDate() {
            let dateList = this.data.map(function (item) {
                return item[0];
            });
            let valueList = this.data.map(function (item) {
                return item[1];
            });
            this.options = {
                // Make gradient line here
                // visualMap: [{
                //     show: false,
                //     type: 'continuous',
                //     seriesIndex: 0,
                //     min: 0,
                //     max: (dateList.length - 1) * 10
                // }],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: dateList
                },
                yAxis: {
                    type: 'value',
                    splitLine: {show: false},
                    axisLine: {
                        show: true, //是否展示y轴坐标竖线
                        lineStyle: {
                            color: '#00fff2',
                            width: 10
                        }
                    },
                    axisTick: {show: false}, //是否展示y轴坐标刻度
                    axisLabel: {
                        color: '#9a9b96',
                        fontsize: '14px'
                    },
                },
                series: [{
                    data: valueList,
                    type: 'line',
                    showSymbol: false,
                    itemStyle: {
                        'color': {
                            'type': 'linear',
                            'x': 0,
                            'y': 0,
                            'x2': 0,
                            'y2': 1,
                            'colorStops': [
                                {
                                    'offset': 0,
                                    'color': '#00fff2'
                                },
                                {
                                    'offset': 1,
                                    'color': '#F3CDC7'
                                }
                            ],
                            'globalCoord': false
                        }
                    }
                }]
            };
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
        padding-top: 84px;

        ._btn {
            min-width: 256px;
            margin: 40px 30px 0;

            &::before {
                background-color: #FAFAF1;
            }
        }

        .chart {
            width: 100%;
        }
    }
</style>
