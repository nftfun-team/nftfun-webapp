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
            <span class="active" @click="tabClick('1d')">1 DAY</span>
            <span @click="tabClick('30d')">30 DAY</span>
            <span @click="tabClick('all')">ALL</span>
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
            data: [],
            oneDayList: [],
            thirtyDaysList: [],
            allDaysList: []
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
                    console.error('这是什么', res.data.info)
                    this.data = res.data.info;
                    console.log('数据', this.data);
                    this.tabClick('30d')
                }
            });
        },
        tabClick(name) {
            console.log('这是点击的', name, this.data[name]);
            this.data = this.data[name];
            this.setOptions(this.data)
        },
        setOptions(item) {
            console.log('设置数据', item)
            let dateList = item['x'].map(x => {
                return x;
            });
            let valueList = item['p'].map(y => {
                console.log(y)
                return new BigNumber(y).toFixed(2);
            });

            Array.prototype.max = function () {
                return Math.max.apply({}, this)
            };

            Array.prototype.min = function () {
                return Math.min.apply({}, this)
            };

            this.options = {
                grid: {
                    left: '2%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: dateList,
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    min: valueList.max(),
                    max: valueList.min(),
                    // splitLine: {show: false},
                    axisLine: {
                        show: true, //是否展示y轴坐标竖线
                        lineStyle: {
                            color: '#00fff2',
                            width: 1
                        }
                    },
                    // axisTick: {show: false}, //是否展示y轴坐标刻度
                    axisLabel: {
                        color: '#9a9b96',
                        fontsize: '14px'
                    },
                },
                series: [
                    {
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
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
                        },
                        data: valueList
                    },]
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
