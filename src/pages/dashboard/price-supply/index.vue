<template>
<div class="_price-supply _flex _justify-content-center">
    <Card :label="'REBASE COOLDOWN'"
        :value="!show ? `${time.d}d:${time.h}h:${time.m}m:${time.s}s` : '--'"
        :isRebase="time.down"
        :load="load"
        @rebase="rebaseClick"/>

    <Card :label="'PRICE TARGET'"
        :value="targetPrice || '--'"
        :isRebase="true"/>

    <Card :label="'NFT MARKET CAP'" :value="nftMarketCap || '--'" :isRebase="true"/>

    <Card :label="'FUN SUPPLY'" :value="totalSupply || '--'" :isRebase="true"/>

    <Card :label="'ORACLE PRICE'" :value="price || '--'" :isRebase="true"/>

    <Card :label="'FUN MARKET CAP'" :value="funMarketCap || '--'" :isRebase="true"/>


    <Tabs :title="'PRICE'" :active="active" :type="type" @tab="tabClick"/>
    <PriceChart :data="priceData" :type="type"/>
    <Tabs :title="'SUPPLY'" :active="active" :type="type" @tab="tabClick"/>
    <SupplyChart :data="supplyData" :type="type"/>
    <Tabs :title="'MARKET CAP'" :active="active" :type="type" @tab="tabClick"/>
    <MktCapChart :data="mktCapChartData" :type="type"/>
</div>
</template>

<script>
import Card from './card.vue';
import PriceChart from '../chart-data/price-chart';
import SupplyChart from '../chart-data/supply-chart';
import MktCapChart from '../chart-data/mktcap-chart';
import Tabs from '../chart-data/tabs';
import WebSdk from '../../../utils/sdk'
import ChainApi from '../../../assets/sdk/ChainApi';
import count from '../../../assets/js/countDown';

export default {
    name: 'index',
    components: {Card, PriceChart, SupplyChart, MktCapChart, Tabs},
    data() {
        return {
            data: null,
            priceData: null,
            supplyData: null,
            mktCapChartData: null,
            active: '7d',
            type: 'ABS',
            coolDown: 0,
            price: 0,
            totalSupply: 0,
            targetPrice: 0,
            funMarketCap: 0,
            nftMarketCap: 0,
            load: false,
            disabled: false,
            timer: null,
            time: {
                down: true,
                d: '00',
                h: '00',
                m: '00',
                s: '00'
            },
            show: true
        }
    },
    mounted() {
        this.upDate();
    },
    methods: {
        upDate() {
            console.log('CountDown', count);
            WebSdk.connect().then((data) => {
                // if(!data.isConnect) return
                this.getInfo();
                this.$ChainApi.report().then(res => {
                    console.log('res.....', res)
                    if (res.code === 0 && res.data) {
                        this.data = res.data;
                        this.tabClick({name: this.active, type: this.type});
                    }
                })
            });
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
        },
        getInfo() {
            this.$ChainApi.info().then(res => {
                console.log('info====>', res);
                this.coolDown = res.cooldown * 1000;
                this.price = `$${this.verifyNumber(res.price)}`;
                this.totalSupply = this.verifyNumber(res.totalSupply);
                this.targetPrice = `$${this.verifyNumber(res.targetPrice.toFixed(2, 1))}`;
                this.funMarketCap = `$${this.verifyNumber(res.marketCap)}`;
                this.nftMarketCap = `$${this.verifyNumber(new BigNumber(res.nftCurrentValue).toFixed(2, 1))}`;
                this.setCountDown();
            });
        },
        setCountDown() {
            if (new Date().getTime() < Number(this.coolDown) * 1000) {
                this.timer = setInterval(() => {
                    const date = count(new Date().getTime(), this.coolDown, () => {
                        // window.location.reload();
                        this.time.down = false;
                        clearInterval(this.timer)
                    });
                    this.time = {...date};
                    this.show = false;
                }, 1000)
            } else {
                this.time.down = false;
                this.show = false;
            }
        },
        verifyNumber(val) {
            return val.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
        },
        rebaseClick() {
            this.load = true;
            ChainApi.rebase().then(res => {
                console.log('res', res)
                this.load = false;
                this.show = true;
                this.getInfo();
            }).catch(c => {
                this.load = false;
                this.getInfo();
            }).finally(f => {
                this.load = false
            });
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
