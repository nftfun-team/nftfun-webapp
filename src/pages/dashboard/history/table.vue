<template>
<div class="_table">
    <h3>PRBASES</h3>
    <ul class="_list">
        <template v-if="isPc">
        <li class="_list-header">
            <div>Date</div>
            <div>Supply Adjustment %</div>
            <div>Supply Before Rebase</div>
            <div>Supply After Rebase</div>
            <div>Block</div>
        </li>
        <template v-if="!load">
        <li v-for="item of tableData">
            <div>{{item.updateTime * 1000 | getDate('yyyy-MM-dd hh:mm:ss')}}</div>
            <div>{{`${(item.supplyDelta / item.lastTotalSupply * 100).toFixed(2)}%`}}</div>
            <div>{{item.lastTotalSupply}}</div>
            <div>{{item.totalSupply}}</div>
            <div>{{item.updateBlock}}</div>
        </li>
        </template>
        </template>

        <template v-if="!isPc && !load">
        <li class="_mobile-li" v-for="item of tableData">
            <div>
                <p>Date</p>
                <p>{{item.updateTime * 1000 | getDate('yyyy-MM-dd hh:mm:ss')}}</p>
            </div>
            <div>
                <p>Supply Adjustment %</p>
                <p>{{`${(item.supplyDelta / item.lastTotalSupply * 100).toFixed(2)}%`}}</p>
            </div>
            <div>
                <p>Supply Before Rebase</p>
                <p>{{item.lastTotalSupply}}</p>
            </div>
            <div>
                <p>Supply After Rebase</p>
                <p>{{item.totalSupply}}</p>
            </div>
            <div>
                <p>Block</p>
                <p>{{item.updateBlock}}</p>
            </div>
        </li>
        </template>

        <Loading :loading="load || moreLoad"/>
        <Empty v-if="!load && empty" />
        <div class="_more" v-if="!load && !moreLoad && !empty">
            <div @click="moreClick">
                <img src="~img/more.svg" alt="">
                <span>More</span>
            </div>
        </div>

    </ul>
</div>
</template>

<script>
import Loading from '@/components/loading/index.vue'
import ChainApi from '../../../assets/sdk/ChainApi';
import WebSdk from '../../../utils/sdk';
import Empty from '@/components/empty/index.vue';

export default {
    name: 'nTable',
    components: {Loading, Empty},
    data() {
        return {
            params: {
                page: 1,
                size: 10,
            },
            tableData: [],
            empty: false,
            load: true,
            moreLoad: false,
            isPc: true
        }
    },
    mounted() {
        this.getHistoryList();
        if (window.innerWidth <= 768) {
            this.isPc = false
        }
    },
    methods: {
        getHistoryList() {
            WebSdk.connect().then((data) => {
                ChainApi.history(this.params.page, this.params.size).then(res => {
                    this.load = false;
                    this.moreLoad = false;
                    if (res.code === 0 && res.data) {
                        console.log('history------>', res)
                        this.tableData = this.tableData.concat(res.data);
                        this.empty = this.tableData.length >= res.count;
                    } else {
                        this.empty = true
                    }
                }).catch(e => {
                    this.load = false;
                    this.empty = true;
                })
            }).catch(e => {
                this.load = false;
                this.empty = true;
            })
        },
        moreClick() {
            this.params.page++;
            this.moreLoad = true;
            this.getHistoryList();
        }
    }
}
</script>

<style scoped lang="scss">
    ._table {
        width: 100%;

        h3 {
            padding: 0 66px;
            font-size: 32px;
            font-weight: 400;
            color: #252525;
            margin-bottom: 30px;
        }

        ._list {
            li {
                display: flex;
                align-items: center;
                padding: 0 66px;
                border-bottom: 1px solid #D8D8D8;
                height: 90px;
                font-size: 16px;
                color: #252525;
                font-family: KhContent;

                div {
                    /*width: 20%;*/
                    &:nth-of-type(1) {
                        width: 20%;
                    }

                    &:nth-of-type(2) {
                        width: 22%;
                    }

                    &:nth-of-type(3) {
                        width: 25%;
                    }

                    &:nth-of-type(4) {
                        width: 25%;
                    }

                    &:nth-of-type(5) {
                        width: 8%;
                    }
                }
            }

            ._list-header {
                font-family: Poppins;
            }
        }

        ::v-deep ._pagination {
            margin-top: 24px;
            margin-left: 66px;
            display: flex;

            .el-pager {
                display: flex;
            }

            .el-pager li,
            .btn-prev,
            .btn-next {
                vertical-align: center;
                min-width: 32px;
                width: 32px;
                height: 32px;
                line-height: 32px;
                border-radius: 8px;
                border: 1px solid #D8D8D8;
                background-color: #F6F6F6;
                align-items: center;
                justify-content: center;
                padding: 0;
                font-size: 14px;
                margin-right: 8px;
            }

            .el-pager li.active {
                color: inherit;
                background-color: #EBEBEB;
            }
        }

        ._more {
            text-align: center;
            margin-top: 44px;

            & > div {
                width: 45px;
                font-size: 18px;
                line-height: 21px;
                color: #EF8969;
                font-weight: 300;
                cursor: pointer;
                margin: 0 auto;

                img {
                    margin-bottom: 8px;
                    transition: all .2s;
                }

                &:hover img {
                    margin-top: 5px;
                }
            }
        }
    }

    @media (max-width: 768px) {
        ._table {
            background-color: #ffffff;
            padding: 0 18px 50px;

            h3 {
                font-size: 14px;
                line-height: 14px;
                margin-bottom: 18px;
                padding: 18px 0 0;
            }

            ._list {
                ._mobile-li {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    padding: 0;
                    height: auto;
                    margin-bottom: 18px;

                    div {
                        width: 50% !important;
                        margin-bottom: 18px;

                        &:nth-of-type(odd) {
                            text-align: left;
                        }

                        &:nth-of-type(even) {
                            text-align: right;
                        }

                        p {
                            line-height: 16px;

                            &:nth-of-type(1) {
                                font-size: 12px;
                                color: #686666;
                                margin-bottom: 8px;
                            }

                            &:nth-of-type(2) {
                                font-size: 16px;
                                color: #252525;
                            }
                        }
                    }
                }
            }


        }
    }
</style>
