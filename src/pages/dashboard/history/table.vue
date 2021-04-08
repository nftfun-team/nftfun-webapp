<template>
<div class="_table">
    <h3>PRBASES</h3>
    <ul class="_list">
        <li class="_list-header">
            <div>Date</div>
            <div>Supply Adjustment %</div>
            <div>Supply Before Rebase</div>
            <div>Supply After Rebase</div>
            <div>Block</div>
        </li>
        <Loading :loading="load">
            <li v-for="item of tableData">
                <div>{{item.updateTime * 1000 | getDate('yyyy-MM-dd hh:mm:ss')}}</div>
                <div>{{`${(item.supplyDelta / item.lastTotalSupply * 100).toFixed(2)}%`}}</div>
                <div>{{item.lastTotalSupply}}</div>
                <div>{{item.totalSupply}}</div>
                <div>{{item.updateBlock}}</div>
            </li>
            <div class="_more">
                <div @click="moreClick" v-if="!empty">
                    <img src="~img/more.svg" alt="">
                    <span>More</span>
                </div>
            </div>
        </Loading>
    </ul>
</div>
</template>

<script>
import Loading from '@/components/loading/index.vue'
import ChainApi from '../../../assets/sdk/ChainApi';
import WebSdk from '../../../utils/sdk';

export default {
    name: 'nTable',
    components: {Loading},
    data() {
        return {
            params: {
                page: 1,
                size: 10,
            },
            tableData: [],
            empty: false,
            load: true
        }
    },
    mounted() {
        this.getHistoryList()
    },
    methods: {
        getHistoryList() {
            WebSdk.connect().then((data) => {
                if(!data.isConnect) return
                ChainApi.history(this.params.page, this.params.size).then(res => {
                    this.load = false;
                    if (res.code === 0 && res.data) {
                        console.log('history------>', res)
                        this.tableData = this.tableData.concat(res.data);
                        this.empty = this.tableData.length >= res.count;
                    }
                })
            })
        },
        moreClick() {
            this.params.page++;
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

                &:hover img{
                    margin-top: 5px;
                }
            }
        }
    }
</style>
