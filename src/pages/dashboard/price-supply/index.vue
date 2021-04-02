<template>
<div class="_price-supply _flex _justify-content-center">
    <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
    <Card :label="'ORACLE PRICE'" :value="'$0.97'"/>
    <Card :label="'DITTO SUPPLY'" :value="'5,251,326.75'"/>
    <Card :label="'PRICE TARGET'" :value="'$1.00'"/>
    <Card :label="'DITTO MARKET CAP'" :value="'$5,119,175.15'"/>
    <Button :name="'REBASE'" class="_btn"/>

    <h3>PRICE</h3>
    <div class="_chart-tabs">
        <div>
            <span class="active">1 DAY</span>
            <span>30 DAY</span>
            <span>ALL</span>
        </div>

        <div>
            <span>ABS</span>
            <span>%</span>
        </div>
    </div>
    <Charts class="chart" :options="options"/>
</div>
</template>

<script>
import Button from '@/components/button/index.vue';
import Charts from '@/components/echarts/echarts.vue';
import Card from './card.vue';
import axios from 'axios';

export default {
    name: 'index',
    components: {Button, Card, Charts},
    data() {
        return {
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
            axios.get('../chart.json').then(res => {
                console.error('这是什么', res)
            })
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
