<template>
    <div id="chart_container"></div>
</template>

<script>
    const LastPrice = 1234.2365
    import store from '../../store';
    import { Tv } from 'utils/tradview';
    export default {
        name: "index",
        data(){
            return{
                feed: null,
                chart: null,
                symbol: 'BNB/USDT',
                cycle: '5',
                bars: [
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
                ],
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        },


        created() {
            this.createData()
            store.dispatch('updateChartData', this.bars)
        },

        mounted() {
            this.$nextTick(() => {
                this.feed = this.createFeed();
                this.chart = new TradingView.widget({
                    theme: 'Light',
                    fullscreen: false,
                    autosize: true,
                    symbol:this.symbol,
                    container_id: "chart_container",
                    datafeed: this.feed,
                    library_path: "/custom_scripts/",
                    locale: "en",
                    timezone: 'Etc/UTC', //todo: ustawianie timezone'a po strefie usera
                    charts_storage_api_version: "1.1",
                    client_id: 'tradingview.com',
                    user_id: 'public_user_id',
                    debug: true,
                    // loading_screen:{ backgroundColor: "#00ff00",foregroundColor: "#000000", }, //todo:do it
                    interval: '60',
                    // interval: this.cycle,
                    timeframe: this.cycle,
                    // timeframe:'',//todo: na koncu
                    // toolbar_bg: "red",
                    toolbar_bg: "#20334d",
                    // saved_data: this.savedData,
                    allow_symbol_change: true,
                    time_frames: [
                        // {text: "1y", resolution: "1W"},
                        // {text: "6m", resolution: "3D"},
                        // {text: "3m", resolution: "1D"},
                        // {text: "1m", resolution: "1D"},
                        // {text: "1w", resolution: "30"},
                        // {text: "3d", resolution: "30"},
                        // {text: "1d", resolution: "30"},
                        // {text: "6h", resolution: "15"},
                        // {text: "1h", resolution: "1"}
                    ],
                    drawings_access: {
                        type: 'black',
                        // tools: [{name: "Regression Trend"}]//todo: moje
                        tools: [{name: "Trend Line", grayed: true}, {name: "Trend Angle", grayed: true}] //todo: bb
                    },
                    disabled_features: Tv.getDisFeatures(),
                    enabled_features: [
                        "dont_show_boolean_study_arguments",
                        "use_localstorage_for_settings",
                        "remove_library_container_border",
                        "save_chart_properties_to_local_storage",
                        "side_toolbar_in_fullscreen_mode",
                        "hide_last_na_study_output",
                        "constraint_dialogs_movement",//todo: nie do końca jestem pewien
                    ],
                    studies_overrides: Tv.getOverrides('Dark').dark_studies_overrides,
                    overrides: Tv.getOverrides('Dark').dark_overrides,
                    custom_css_url: 'chart.css'
                });

                var chartType = 1, _this=this;
                this.chart.onChartReady(function () {
                    //设置均线种类 均线样式
                    Tv.createStudy(_this.chart);
                    //生成时间按钮
                    _this.createButton();
                    _this.chart.chart().setChartType(chartType);
                    // toggleStudy(chartType);
                });
            })
        },

        methods:{
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
                }, 20000)
            },

            changePair() {
                if(this.chart && this.feed){
                    this.feed._fireEvent('pair_change');
                    this.chart.activeChart().resetData();
                    this.chart.activeChart().setSymbol(this.symbol, () => {
                    });
                }
            },

            createButton(){
                var thats = this.chart, _this = this;

                var buttons = [
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
                        for (let item of _this.chart.chart().getAllStudies()) {
                            if (item.name === 'Moving Average') {
                                _this.chart.chart().removeEntity(item.id)
                            }
                        }
                    } else {
                        Tv.createStudy(_this.chart);
                    }
                }
            },

            createFeed() {
                let Datafeed = {};

                Datafeed.DataPulseUpdater = function(datafeed, updateFrequency) {
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
                                that._datafeed.getBars(_subscriptionRecord.symbolInfo, resolution, datesRangeLeft, datesRangeRight, function(bars) {
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

                Datafeed.DataPulseUpdater.prototype.periodLengthSeconds = function(resolution, requiredPeriodsCount) {
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

                Datafeed.DataPulseUpdater.prototype.subscribeDataListener = function(symbolInfo, resolution, newDataCallback, listenerGUID) {
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

                Datafeed.DataPulseUpdater.prototype.unsubscribeDataListener = function(listenerGUID) {
                    this._datafeed._logMessage('Unsubscribing ' + listenerGUID);
                    delete this._subscribers[listenerGUID];
                };

                Datafeed.Container = function(updateFrequency){
                    this._configuration = {
                        supports_search: false,
                        supports_group_request: false,
                        supported_resolutions: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '3D', '1W', '1M'],
                        supports_marks: true,
                        supports_timescale_marks: true,
                        exchanges: ['Binance']
                    };

                    this._barsPulseUpdater = new Datafeed.DataPulseUpdater(this, updateFrequency || 10 * 1000);
                    // this._quotesPulseUpdater = new Datafeed.QuotesPulseUpdater(this);

                    this._enableLogging = true;
                    this._callbacks = {};

                    this._initializationFinished = true;
                    this._fireEvent('initialized');
                    this._fireEvent('configuration_ready');
                };

                Datafeed.Container.prototype._fireEvent = function(event, argument) {
                    if (this._callbacks.hasOwnProperty(event)) {
                        var callbacksChain = this._callbacks[event];
                        for (var i = 0; i < callbacksChain.length; ++i) {
                            callbacksChain[i](argument);
                        }

                        this._callbacks[event] = [];
                    }
                };

                Datafeed.Container.prototype._logMessage = function(message) {
                    if (this._enableLogging) {
                        var now = new Date();
                    }
                };

                Datafeed.Container.prototype.on = function(event, callback) {
                    if (!this._callbacks.hasOwnProperty(event)) {
                        this._callbacks[event] = [];
                    }

                    this._callbacks[event].push(callback);
                    return this;
                };

                Datafeed.Container.prototype.onReady = function(callback) {
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

                Datafeed.Container.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
                    this._logMessage("GOWNO :: resolve symbol "+ symbolName);
                    Promise.resolve().then(() => {
                        // this._logMessage("GOWNO :: onResultReady inject "+this.currency1 + ":"+ this.currency2);
                        onSymbolResolvedCallback({
                            "name": this.symbol,
                            "timezone": "Europe/Warsaw",
                            "pricescale": LastPrice > 1000 ? 100 : 100000000,
                            "minmov": 1,
                            "minmov2": 0,
                            "ticker": this.symbol,
                            "description": "",
                            "session": "24x7",
                            "type": "bitcoin",
                            "exchange-traded": "Binance",
                            "exchange-listed": "Binance",
                            "has_intraday": true,
                            "intraday_multipliers": ['60'], //It is an array containing intraday resolutions (in minutes) the datafeed wants to build by itself. E.g., if the datafeed reported he supports resolutions ["1", "5", "15"], but in fact it has only 1 minute bars for symbol X, it should set intraday_multipliers of X = [1]. This will make Charting Library to build 5 and 15 resolutions by itself.
                            "has_weekly_and_monthly": false,
                            "has_no_volume": false,
                            "regular_session": "24x7"
                        });
                    })
                };

                Datafeed.Container.prototype.getBars = function(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {
                    if (rangeStartDate > 0 && (rangeStartDate + '').length > 10) {
                        throw new Error();
                    }
                    onDataCallback([], { noData: true });
                    //onDataCallback(bars, { noData: true , nextTime: data.nb || data.nextTime });
                };

                Datafeed.Container.prototype.subscribeBars = function(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback) {
                    store.getters.chartData.forEach(function (bar) { // in subscribeBars
                        onRealtimeCallback(bar)
                    });
                    this.on('pair_change', function() {
                        onResetCacheNeededCallback();
                    });
                    //this._barsPulseUpdater.subscribeDataListener(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback);
                };

                Datafeed.Container.prototype.unsubscribeBars = function(listenerGUID) {
                    this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
                };

                return new Datafeed.Container;
            }
        }
    }
</script>

<style scoped>
    #chart_container{
        width: 110%;
        /*margin-left: -25%;*/
        height: 600px;
    }
</style>
