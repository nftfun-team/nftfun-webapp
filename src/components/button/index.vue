<template>
<el-button :style="style" class="_button" @click="handleClick()">
    {{name}}
</el-button>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Emit } from "vue-property-decorator";

    @Component({ name: 'ComButton'})
    export default class ComButton extends Vue{
        @Prop({type: String || undefined}) name
        @Prop({type: Object || undefined, default: {}}) style

        @Emit('click')
        private handleClick(): void{}
    }
</script>

<style scoped lang="scss">
    ._button {
        height: 55px;
        padding: 0 36px;
        background: #FFFFFF;
        border: 1px solid #000000;
        border-radius: 8px;
        font-weight: 500;
        font-size: 18px;
        position: relative;
        z-index: 0;

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            content: '';
            background: #ffffff;
            border-radius: 8px;
        }

        &::after {
            position: absolute;
            top: 4px;
            left: 4px;
            z-index: -2;
            width: 100%;
            height: 100%;
            content: '';
            background: #000000;
            border-radius: 8px;
        }
    }
</style>
