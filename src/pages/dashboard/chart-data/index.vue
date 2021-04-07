<template>
<div>
    <Charts class="chart" :options="options"/>
</div>
</template>

<script>
import Charts from '@/components/echarts/echarts.vue';

export default {
    name: 'index',
    components: {Charts},
    data() {
        return {
            options: null,
        }
    },
    props: ['data', 'type'],
    watch: {
        data: {
            handler(val) {
                if (val && val !== null) {
                    this.setOptions();
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        setOptions() {
            const type = this.type;
            // console.log('data', this.data, type)
            let XList = this.data.x;
            let YList = this.data.y;

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
                    trigger: 'axis',
                    formatter: function (params) {
                        var result = params[0].name;
                        params.forEach(function (item) {
                            result += '<br/>';
                            result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:' + item.color + '"></span>';
                            result += isNaN(item.value) ? 0 : (type === '%' ? new BigNumber(item.value).toFixed(2) + '%' : '$' + new BigNumber(item.value).toFixed(2));
                        });
                        return result;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: XList,
                    boundaryGap: false,
                    axisLabel: {
                        color: '#9a9b96'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#9a9b96'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(0, 0, 0, 0.3)'
                        },
                        show: true
                    }
                },
                yAxis: {
                    type: 'value',
                    min: YList.max(),
                    max: YList.min(),
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#9a9b96',
                            width: 1
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(0, 0, 0, 0.3)'
                        },
                        show: true
                    },
                    axisLabel: {
                        color: '#9a9b96',
                        fontsize: '14px',
                        formatter: function (value) {
                            return type === '%' ? new BigNumber(value).toFixed(2) + '%' : '$' + new BigNumber(value).toFixed(2);
                        }
                    },
                },
                series: [
                    {
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        areaStyle: {
                            normal: {
                                color: 'rgba(99, 216, 241, 0.3)'
                            },
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        showSymbol: false,
                        itemStyle: {
                            normal: {
                                color: '#67DEF8',
                                lineStyle: {
                                    color: '#67DEF8'
                                },
                            }
                        },
                        data: YList
                    },]
            };
        },
    }
}
</script>

<style scoped lang="scss">
    .chart {
        width: 100%;
        height: 368px;
        background: #FFFFFF;
        border: 1px solid rgba(239, 239, 239, 0.5);
        box-shadow: -2px 5px 6px #EFEEF1;
        border-radius: 8px;
    }
</style>
