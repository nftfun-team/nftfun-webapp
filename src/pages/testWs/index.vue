<template>
    <div class="ws">
        <div id="k-line"></div>
<!--        <trading-view-component />-->
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Tv } from 'utils/tradview';
    import store from '../../store';
    import FeedBase from 'utils/datafeed.js';
    import ScokeIoService from 'utils/ws'
    // import TradingViewComponent from './TradingViewComponent.vue'

    declare var TradingView;
    declare var $: any;

    @Component({
        name: 'TestWs',
        // components: {TradingViewComponent}
    })
    export default class Staking extends Vue{
        symbol = 'BNB/USDT';
        bars:any = [
            {
                time:1508313600000,
                close:42.1,
                open:41.0,
                high:43.0,
                low:40.4,
                volume:12000
            }, {
                time:1508317200000,
                close:43.4,
                open:42.9,
                high:44.1,
                low:42.1,
                volume:18500
            }, {
                time:1508320800000,
                close:44.3,
                open:43.7,
                high:44.8,
                low:42.8,
                volume:24000
            }, {
                time:1508324400000,
                close:42.8,
                open:44.5,
                high:44.5,
                low:42.3,
                volume:45000
            }
        ];
        feed:any = null;
        chart:any = null;

        //K线图对象
        widget: any = null;
        //k线图默认时间的显示
        cycle = '5';
        timezone: String = Intl.DateTimeFormat().resolvedOptions().timeZone;


        constructor() {
            super()
            this.createData()
            store.dispatch('updateChartData', this.bars)
        }

        mounted(){
            // const io = new ScokeIoService();
            // io.onCenten()


            this.$serviceApi.klines().then(res => {
                console.error(res)
            })
            this.$serviceApi.avgPrice().then(res => {
                console.error(res)
            })

            // this.$nextTick(()=> {
            //     this.initKLine()
            // })

        }

        test(){
            if ("WebSocket" in window)
            {
                // alert("您的浏览器支持 WebSocket!");

                // 打开一个 web socket
                // var ws = new WebSocket("ws://localhost:3000");
                var ws = new WebSocket("wss://stream.binance.com:9443/ws/streams/bnbusdt@ticker");

                ws.onopen = function()
                {
                    // Web Socket 已连接上，使用 send() 方法发送数据
                    // ws.send("发送数据");
                    // alert("数据发送中...");
                };

                ws.onmessage = function (evt)
                {
                    var received_msg = evt.data;
                    console.log(received_msg)
                    // alert("数据已接收...");
                };

                ws.onclose = function()
                {
                    // 关闭 websocket
                    // alert("连接已关闭...");
                };
            }

            else
            {
                // 浏览器不支持 WebSocket
                alert("您的浏览器不支持 WebSocket!");
            }
        }

        createData() {
            setInterval(() => {
                let data = store.getters.chartData
                data.push({
                    time: new Date().getTime(),
                    close: 40 + Math.random() * 5,
                    open: 40 + Math.random() * 5,
                    high: 40 + Math.random() * 5,
                    low: 40 + Math.random() * 5,
                    volume: 100000 * Math.random()
                })
                store.dispatch('updateChartData', data)
                this.changePair()
            }, 10000)
        }

        createFeed() {
            let Datafeed:any = {};

            Datafeed.DataPulseUpdater = function(datafeed:any, updateFrequency:any) {
                this._datafeed = datafeed;
                this._subscribers = {};

                this._requestsPending = 0;
                var that = this;

                var update = function() {
                    if (that._requestsPending > 0) {
                        return;
                    }

                    for (var listenerGUID in that._subscribers) {
                        var subscriptionRecord = that._subscribers[listenerGUID];
                        var resolution = subscriptionRecord.resolution;

                        var datesRangeRight = parseInt(((new Date().valueOf()) / 1000).toFixed());

                        //	BEWARE: please note we really need 2 bars, not the only last one
                        //	see the explanation below. `10` is the `large enough` value to work around holidays
                        var datesRangeLeft = datesRangeRight - that.periodLengthSeconds(resolution, 10);

                        that._requestsPending++;

                        (function(_subscriptionRecord) { // eslint-disable-line
                            that._datafeed.getBars(_subscriptionRecord.symbolInfo, resolution, datesRangeLeft, datesRangeRight, function(bars:any) {
                                    that._requestsPending--;

                                    //	means the subscription was cancelled while waiting for data
                                    if (!that._subscribers.hasOwnProperty(listenerGUID)) {
                                        return;
                                    }

                                    if (bars.length === 0) {
                                        return;
                                    }

                                    var lastBar = bars[bars.length - 1];
                                    if (!isNaN(_subscriptionRecord.lastBarTime) && lastBar.time < _subscriptionRecord.lastBarTime) {
                                        return;
                                    }

                                    var subscribers = _subscriptionRecord.listeners;

                                    //	BEWARE: this one isn't working when first update comes and this update makes a new bar. In this case
                                    //	_subscriptionRecord.lastBarTime = NaN
                                    var isNewBar = !isNaN(_subscriptionRecord.lastBarTime) && lastBar.time > _subscriptionRecord.lastBarTime;

                                    //	Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
                                    //	old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
                                    if (isNewBar) {
                                        if (bars.length < 2) {
                                            throw new Error('Not enough bars in history for proper pulse update. Need at least 2.');
                                        }

                                        var previousBar = bars[bars.length - 2];
                                        for (var i = 0; i < subscribers.length; ++i) {
                                            subscribers[i](previousBar);
                                        }
                                    }

                                    _subscriptionRecord.lastBarTime = lastBar.time;

                                    for (var j = 0; j < subscribers.length; ++j) {
                                        subscribers[j](lastBar);
                                    }
                                },

                                //	on error
                                function() {
                                    that._requestsPending--;
                                });
                        })(subscriptionRecord);
                    }
                };

                if (typeof updateFrequency != 'undefined' && updateFrequency > 0) {
                    setInterval(update, updateFrequency);
                }
            };

            Datafeed.DataPulseUpdater.prototype.periodLengthSeconds = function(resolution:any, requiredPeriodsCount:any) {
                var daysCount = 0;

                if (resolution === 'D') {
                    daysCount = requiredPeriodsCount;
                } else if (resolution === 'M') {
                    daysCount = 31 * requiredPeriodsCount;
                } else if (resolution === 'W') {
                    daysCount = 7 * requiredPeriodsCount;
                } else {
                    daysCount = requiredPeriodsCount * resolution / (24 * 60);
                }

                return daysCount * 24 * 60 * 60;
            };

            Datafeed.DataPulseUpdater.prototype.subscribeDataListener = function(symbolInfo:any, resolution:any, newDataCallback:any, listenerGUID:any) {
                this._datafeed._logMessage('Subscribing ' + listenerGUID);

                if (!this._subscribers.hasOwnProperty(listenerGUID)) {
                    this._subscribers[listenerGUID] = {
                        symbolInfo: symbolInfo,
                        resolution: resolution,
                        lastBarTime: NaN,
                        listeners: []
                    };
                }

                this._subscribers[listenerGUID].listeners.push(newDataCallback);
            };

            Datafeed.DataPulseUpdater.prototype.unsubscribeDataListener = function(listenerGUID:any) {
                this._datafeed._logMessage('Unsubscribing ' + listenerGUID);
                delete this._subscribers[listenerGUID];
            };

            Datafeed.Container = function(updateFrequency:any){
                this._configuration = {
                    supports_search: false,
                    supports_group_request: false,
                    supported_resolutions: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '3D', '1W', '1M'],
                    supports_marks: true,
                    supports_timescale_marks: true,
                    exchanges: ['myExchange']
                };

                this._barsPulseUpdater = new Datafeed.DataPulseUpdater(this, updateFrequency || 10 * 1000);
                // this._quotesPulseUpdater = new Datafeed.QuotesPulseUpdater(this);

                this._enableLogging = true;
                this._callbacks = {};

                this._initializationFinished = true;
                this._fireEvent('initialized');
                this._fireEvent('configuration_ready');
            };

            Datafeed.Container.prototype._fireEvent = function(event:any, argument:any) {
                if (this._callbacks.hasOwnProperty(event)) {
                    var callbacksChain = this._callbacks[event];
                    for (var i = 0; i < callbacksChain.length; ++i) {
                        callbacksChain[i](argument);
                    }

                    this._callbacks[event] = [];
                }
            };

            Datafeed.Container.prototype._logMessage = function(message:any) {
                if (this._enableLogging) {
                    var now = new Date();
                }
            };

            Datafeed.Container.prototype.on = function(event:any, callback:any) {
                if (!this._callbacks.hasOwnProperty(event)) {
                    this._callbacks[event] = [];
                }

                this._callbacks[event].push(callback);
                return this;
            };

            Datafeed.Container.prototype.onReady = function(callback:any) {
                let that = this;
                if (this._configuration) {
                    setTimeout(function() {
                        callback(that._configuration);
                    }, 0);
                }
                else {
                    this.on('configuration_ready', function() {
                        callback(that._configuration);
                    });
                }
            };

            Datafeed.Container.prototype.resolveSymbol = function(symbolName:any, onSymbolResolvedCallback:any, onResolveErrorCallback:any) {
                this._logMessage("GOWNO :: resolve symbol "+ symbolName);
                Promise.resolve().then(() => {
                    this._logMessage("GOWNO :: onResultReady inject "+this.currency1 + ":"+ this.currency2);
                    onSymbolResolvedCallback({
                        "name": this.currency1 + ":"+ this.currency2,
                        "timezone": "Europe/Warsaw",
                        // "pricescale": LastPrice > 1000 ? 100 : 100000000,
                        "pricescale": 100 ,
                        "minmov": 1,
                        "minmov2": 0,
                        "ticker": this.currency1 + ":"+ this.currency2,
                        "description": "",
                        "session": "24x7",
                        "type": "bitcoin",
                        "exchange-traded": "myExchange",
                        "exchange-listed": "myExchange",
                        "has_intraday": true,
                        "intraday_multipliers": ['60'], //It is an array containing intraday resolutions (in minutes) the datafeed wants to build by itself. E.g., if the datafeed reported he supports resolutions ["1", "5", "15"], but in fact it has only 1 minute bars for symbol X, it should set intraday_multipliers of X = [1]. This will make Charting Library to build 5 and 15 resolutions by itself.
                        "has_weekly_and_monthly": false,
                        "has_no_volume": false,
                        "regular_session": "24x7"
                    });
                })
            };

            Datafeed.Container.prototype.getBars = function(symbolInfo:any, resolution:any, rangeStartDate:any, rangeEndDate:any, onDataCallback:any, onErrorCallback:any) {
                if (rangeStartDate > 0 && (rangeStartDate + '').length > 10) {
                    throw new Error();
                }
                onDataCallback([], { noData: true });
                //onDataCallback(bars, { noData: true , nextTime: data.nb || data.nextTime });
            };

            Datafeed.Container.prototype.subscribeBars = function(symbolInfo:any, resolution:any, onRealtimeCallback:any, listenerGUID:any, onResetCacheNeededCallback:any) {
                console.error('12312312', store.getters.chartData)
                store.getters.chartData.forEach(function (bar:any) { // in subscribeBars
                    onRealtimeCallback(bar)
                });
                this.on('pair_change', function() {
                    onResetCacheNeededCallback();
                });
                //this._barsPulseUpdater.subscribeDataListener(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback);
            };

            Datafeed.Container.prototype.unsubscribeBars = function(listenerGUID:any) {
                this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
            };

            return new Datafeed.Container;
        }

        changePair() {
            if(this.chart && this.feed){
                this.feed._fireEvent('pair_change');
                this.chart.activeChart().resetData();
                this.chart.activeChart().setSymbol("BNB:USDT", () => {
                });
            }
        }

        /**
         * 初始化K线图
         */
        initKLine() {
            this.feed = this.createFeed();
            let self = this;
            var widget = this.widget = new TradingView.widget({
                fullscreen: false,
                theme: 'Light',
                style: 3,
                symbol: self.symbol,
                custom_css_url: './light.css',
                timezone: this.timezone,
                // exchange: 'Lydr Exchange',
                withdateranges: true,

                // 默认显示时间间隔的数据
                interval: this.cycle,
                timeframe: this.cycle,

                container_id: "k-line",
                datafeed: this.feed,
                library_path: "assets/trading/",
                locale:  "zh", // en
                // drawings_access: { type: 'black', tools: [{ name: "Regression Trend" }] },
                // 不显示元素
                disabled_features: Tv.getDisFeatures(),
                favorites: {
                    intervals: ['1', '5', '15', '30', '60', '120', '240', '360', 'D', 'W', 'M'],
                    chartTypes: ['Area']
                },
                // kx
                // 显示元素
                enabled_features: Tv.getEnFeature(),
                preset: "mobile",
                charts_storage_api_version: '1.1',
                client_id: 'tradingview.com',
                user_id: 'public_user_id',

                // 工具栏背景色
                // toolbar_bg: '#ff0',
                autosize: true,//自适应
                time_frames: [],//左侧底部时间格式化
                overrides: Tv.getOverrides().dark_overrides,
                studies_overrides: Tv.getOverrides().dark_studies_overrides,
                allow_symbol_change: true,
            });

            var chartType = 1, _this=this;
            this.widget.onChartReady(function () {
                //设置均线种类 均线样式
                Tv.createStudy(_this.widget);
                //生成时间按钮
                _this.createButton();
                _this.widget.chart().setChartType(chartType);
                // toggleStudy(chartType);
            });

            this.widget = widget;
        }

        /**
         * 创建tradingView
         */
        createButton(){
            var thats = this.widget, _this = this;

            var buttons:any = [
                { title: '分时', resolution: '1', chartType: 3 },
                { title: `1分钟`, resolution: '1', chartType: 1 },
                { title: `3分钟`, resolution: '3', chartType: 1 },
                { title: `5分钟`, resolution: '5', chartType: 1 },
                { title: `15分钟`, resolution: '15', chartType: 1 },
                { title: `30分钟`, resolution: '30', chartType: 1 },
                { title: `1小时`, resolution: '60', chartType: 1 },
                { title: `1天`, resolution: 'D', chartType: 1 },
                { title: `1周`, resolution: 'W', chartType: 1 },
                { title: `1月`, resolution: 'M', chartType: 1 },
            ];
            var resolution = this.cycle, chartType = 1;

            for (var i = 0; i < buttons.length; i++) {
                (function (button) {
                    thats.createButton()
                        .attr('title', button.title).addClass("mydate")
                        .text(button.title)
                        .on('click', function (e) {
                            if ($(e.target).parent().hasClass('active')) {
                                return false;
                            }
                            localStorage.setItem('tradingview.resolution', button.resolution);
                            localStorage.setItem('tradingview.chartType', button.chartType);
                            $(e.target).parent().addClass('active').siblings('.active').removeClass('active');
                            thats.chart().setResolution(button.resolution, function onReadyCallback() { });
                            if (button.chartType != thats.chart().chartType()) {
                                thats.chart().setChartType(button.chartType);
                                toggleStudy(button.chartType);
                            }
                        }).parent().addClass('my-group' + (button.resolution == resolution && button.chartType == chartType ? ' active' : ''));
                })(buttons[i]);
            }

            function toggleStudy(chartType) {
                if (chartType == 3) {
                    for (let item of _this.widget.chart().getAllStudies()) {
                        if (item.name === 'Moving Average') {
                            _this.widget.chart().removeEntity(item.id)
                        }
                    }
                } else {
                    Tv.createStudy(_this.widget);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ws, #k-line{
        width: 100%;
        height: 100%;
    }
</style>
