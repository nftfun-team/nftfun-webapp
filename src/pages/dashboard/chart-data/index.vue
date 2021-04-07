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
                    console.log('走到这里了吗。。。。。', val)
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
                            console.log('item===>', item)
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
                            type: 'dashed',    //设置网格线类型 dotted：虚线   solid:实线
                            color: 'rgba(0, 0, 0, 0.3)'
                        },
                        show: true //隐藏或显示
                    }
                },
                yAxis: {
                    type: 'value',
                    min: YList.max(),
                    max: YList.min(),
                    axisLine: {
                        show: true, //是否展示y轴坐标竖线
                        lineStyle: {
                            color: '#9a9b96',
                            width: 1
                        }
                    },
                    splitLine: {    //网格线
                        lineStyle: {
                            type: 'dashed',    //设置网格线类型 dotted：虚线   solid:实线
                            color: 'rgba(0, 0, 0, 0.3)'
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
                        areaStyle: {
                            normal: {
                                color: 'rgba(99, 216, 241, 0.3)' //改变区域颜色
                            },
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        showSymbol: false,
                        itemStyle: {
                            normal: {
                                color: '#67DEF8', //改变折线点的颜色
                                lineStyle: {
                                    color: '#67DEF8' //改变折线颜色
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
