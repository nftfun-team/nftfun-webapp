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
        <li v-for="item of tableData">
            <div>{{item.updateTime * 1000 | getDate('yyyy-MM-dd hh:mm:ss')}}</div>
            <div>{{`${(item.supplyDelta / item.lastTotalSupply * 100).toFixed(2)}%`}}</div>
            <div>{{item.lastTotalSupply}}</div>
            <div>{{item.totalSupply}}</div>
            <div>{{item.updateBlock}}</div>
        </li>
    </ul>
    <span @click="moreClick" v-if="!empty">更多</span>
</div>
</template>

<script>
import ChainApi from '../../../assets/sdk/ChainApi';
import WebSdk from '../../../utils/sdk'

export default {
    name: 'nTable',
    data() {
        return {
            params: {
                page: 1,
                size: 1,
            },
            tableData: [],
            empty: false
        }
    },
    mounted() {
        this.getHistoryList()
    },
    methods: {
        getHistoryList() {
            WebSdk.connect().then(() => {
                ChainApi.history(this.params.page, this.params.size).then(res => {
                    if (res.code === 0 && res.data) {
                        console.log('history------>', res)
                        this.tableData = this.tableData.concat(res.data);
                        this.empty = this.tableData.length > res.count
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
            font-weight: bold;
            color: #000000;
            margin-bottom: 20px;
        }

        ._list {
            li {
                display: flex;
                align-items: center;
                padding: 0 66px;
                border-bottom: 1px solid #D8D8D8;
                height: 90px;
                font-size: 16px;
                color: #000000;

                div {
                    width: 20%;
                    /*&:nth-of-type(1) {*/
                    /*    width: 200px;*/
                    /*}*/

                    /*&:nth-of-type(2) {*/
                    /*    width: 200px;*/
                    /*}*/

                    /*&:nth-of-type(3) {*/
                    /*    width: 200px;*/
                    /*}*/

                    /*&:nth-of-type(4) {*/
                    /*    width: 200px;*/
                    /*}*/

                    /*&:nth-of-type(5) {*/
                    /*    width: 200px;*/
                    /*}*/
                }
            }

            ._list-header {
                font-weight: bold;
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
    }
</style>
