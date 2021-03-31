<template>
    <div class="no-data">
        <img src="~@/assets/images/nodata.png" alt="">
        <p>暂无数据</p>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from "vue-property-decorator";

    @Component
    export default class NoData extends Vue{

    }
</script>

<style lang="scss" scoped>
    .no-data{
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #AAB2C0;
        position: relative;
        background: #fff;
        padding: 20px 0;
        img{
            width: 50px;
        }
        p{
            line-height: 22px;
            position: relative;
            top: 5px;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            color: #333;
        }
    }
</style>