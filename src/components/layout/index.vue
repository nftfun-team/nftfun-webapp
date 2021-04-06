<template>
    <section class="common">
        <div class="common-head f-pf f-fw8">
            {{title}}
            <com-button style="{width: 184px;height: 55px}" name="CONNECT WALLET" />
        </div>
        <div class="common-section"> <router-view /> </div>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import ComButton from "components/button/index.vue";

    @Component({
        name: 'Layout',
        components: { ComButton }
    })
    export default class AppLayout extends Vue{
        private title: string = 'Staking'
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
            z-index: 99;
        }
        &-section{
            width: 1192px;
            height: 100%;
        }
    }
</style>
