<template>
    <section class="common">
        <div class="common-head f-pf f-fw8">
            {{title}}
            <el-button class="common-head-connect">CONNECT WALLET</el-button>
        </div>
        <div class="common-section"> <router-view /> </div>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from "vue-property-decorator";

    @Component
    export default class AppLayout extends Vue{
        private title: string | undefined = 'Staking'
    }
</script>

<style lang="scss" scoped>
    .common{
        padding-top: 160px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        &-head{
            padding: 0 84px;
            width: 100%;
            height: 160px;
            top: 0;
            left: 0;
            box-shadow: 0px 4px 4px rgba(243, 243, 243, 0.8);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 40px;
            background: #fff;
            &-connect{
                width: 184px;
                height: 55px;
                box-shadow: 4px 4px 2px rgba(0, 0, 0,.9);
            }
        }
        &-section{
            width: 1192px;
            height: 100%;
            /*margin: 0 auto;*/
        }
    }
</style>
