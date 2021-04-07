<template>
<div class="_token">
    <div class="_container">
        <h3>$FUN：An exponential algorithms stable coin pegged to NFT segments.</h3>
        <div class="_flex">
            <div>
                <p>Initial Supply</p>
                <p>1,500,000</p>
            </div>
            <div>
                <p>Prepared for</p>
                <p>Private Sale,Public Sale, Liquidity Mining, Initial liquidity and Ecosystem
                    Fund.</p>
            </div>
        </div>
        <div class="_token-info">
            <div>
                <p>Token Distribution:</p>
                <p><span>Public Sale (55%):</span> public sale through an initial offering on our
                    partner's platform.</p>
                <p><span>Liquidity Mining (20%):</span> distributed to the public through liquidity
                    mining.</p>
                <p><span>Initial Liquidity (10%):</span> used to provide initial liquidity on BSC
                    DEX.</p>
                <p><span>Ecosystem Fund (10%):</span> promote the development of FUN Protocol.</p>
                <p><span>Private Sale (5%):</span> distributed to early investors.</p>
            </div>
            <div>
                <Charts class="chart" :options="options"/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Charts from '@/components/echarts/echarts.vue';

export default {
    name: 'main-token',
    components: {Charts},
    data() {
        return {
            options: null
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.options = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} {b}: {c}%'
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    top: 35,
                    itemWidth: 18,
                    itemHeight: 18,
                    itemGap: 25,
                    formatter: '{name}',
                    textStyle: {
                        color: '#000000',
                        fontFamily: 'BrandonGrotesqueWebRegular',
                        fontWeight: 'bold',
                        padding: 5
                    },
                    data: [
                        {name: 'Public Sale', icon: 'circle'},
                        {name: 'Liquidity Mining', icon: 'circle'},
                        {name: 'Initial Liquidity', icon: 'circle'},
                        {name: 'Ecosystem Fund', icon: 'circle'},
                        {name: 'Private Sale', icon: 'circle'}]
                },
                calculable: true,
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['50%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                            normal: {
                                show: true,
                                position: 'inner',
                                textStyle: {
                                    fontFamily: 'BrandonGrotesqueWebRegular',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                },
                                formatter: '{d}%'
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '20',
                                fontFamily: 'BrandonGrotesqueWebRegular',
                                fontWeight: 'bold',
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                value: 55,
                                name: 'Public Sale',
                                itemStyle: {normal: {color: '#78A1F5'}}
                            },
                            {
                                value: 20,
                                name: 'Liquidity Mining',
                                itemStyle: {normal: {color: '#80DFB6'}}
                            },
                            {
                                value: 10,
                                name: 'Initial Liquidity',
                                itemStyle: {normal: {color: '#7685A0'}}
                            },
                            {
                                value: 10,
                                name: 'Ecosystem Fund',
                                itemStyle: {normal: {color: '#F3C654'}}
                            },
                            {
                                value: 5,
                                name: 'Private Sale',
                                itemStyle: {normal: {color: '#C48EEE'}}
                            },
                        ]
                    }
                ]
            };
        }
    }
}
</script>

<style scoped lang="scss">
    ._token {
        background-color: #F6F6F6;
        padding: 58px 48px;

        h3 {
            font-size: 40px;
            line-height: 40px;
            color: #28292B;
            font-weight: bold;
            margin-bottom: 58px;
            padding-right: 470px;
        }

        ._flex {
            justify-content: space-between;
            margin-bottom: 58px;

            & > div {
                height: 138px;
                background: #FFFFFF;
                border: 1px solid rgba(239, 239, 239, 0.5);
                box-sizing: border-box;
                box-shadow: -2px 5px 6px #EFEEF1;
                border-radius: 8px;
                padding-top: 26px;

                p {
                    font-weight: bold;
                    width: 100%;
                    text-align: center;

                    &:nth-of-type(1) {
                        font-size: 16px;
                        line-height: 19px;
                        color: #686666;
                        margin-bottom: 28px;
                    }

                    &:nth-of-type(2) {
                        font-size: 24px;
                        line-height: 28px;
                        color: #000000;
                    }
                }

                &:nth-of-type(1) {
                    width: 256px;
                }

                &:nth-of-type(2) {
                    width: 920px;
                }
            }
        }

        ._token-info {
            display: flex;
            justify-content: space-between;

            & > div {
                width: 100%;

                &:nth-of-type(1) {
                    p {
                        font-size: 16px;
                        line-height: 19px;
                        color: #686666;
                        margin-bottom: 32px;
                        font-weight: bold;

                        span {
                            color: #000000;
                        }

                        &:nth-of-type(1) {
                            font-size: 24px;
                            line-height: 28px;
                            color: #000000;
                        }

                        &:nth-last-of-type(1) {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }

        .chart {
            width: 100%;
        }
    }
</style>
