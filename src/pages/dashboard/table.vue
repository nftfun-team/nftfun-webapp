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
            <div>{{item.date}}</div>
            <div>{{item.mix}}</div>
            <div>{{item.before}}</div>
            <div>{{item.after}}</div>
            <div>{{item.block}}</div>
        </li>
    </ul>
    <el-pagination
        class="_pagination"
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>
</div>
</template>

<script>
export default {
    name: 'nTable',
    data() {
        return {
            tableData: [{
                date: '2021-03-31 15:52',
                mix: '0%',
                before: 5251326.75,
                after: 5251326.75,
                block: 6154706
            }, {
                date: '2021-03-31 15:52',
                mix: '0%',
                before: 5251326.75,
                after: 5251326.75,
                block: 6154706
            }]
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
                display: flex;
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
