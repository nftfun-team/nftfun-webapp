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
                if (val) {
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
            console.log('设置数据', this.data, type)
            let XList = this.data.x;
            let YList = this.data.y;

            Array.prototype.max = function () {
                return Math.max.apply({}, this).toFixed(2)
            };

            Array.prototype.min = function () {
                return Math.min.apply({}, this).toFixed(2)
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
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    min: YList.max(),
                    max: YList.min(),
                    // splitLine: {show: false},
                    axisLine: {
                        show: true, //是否展示y轴坐标竖线
                        lineStyle: {
                            color: '#00fff2',
                            width: 1
                        }
                    },
                    splitLine: {    //网格线
                        lineStyle: {
                            type: 'dashed',    //设置网格线类型 dotted：虚线   solid:实线
                            color: 'red'
                        },
                        show: true //隐藏或显示
                    },
                    // axisTick: {show: false}, //是否展示y轴坐标刻度
                    axisLabel: {
                        color: '#9a9b96',
                        fontsize: '14px',
                        formatter: function (value) {
                            return type === '%' ? new BigNumber(value).toFixed(2) + '%' : '$' + new BigNumber(value).toFixed(2);
                        }  //刻度标签的内容格式器，支持字符串模板和回调函数两种形式，按照自己需求设置
                    },
                },
                series: [
                    {
                        type: 'line',
                        stack: '总量',
                        smooth: true, // 曲线平滑
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
