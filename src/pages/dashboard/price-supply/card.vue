<template>
<div class="_card">
    <p>{{label}}</p>
    <p>
        <span v-if="isRebase">{{value}}</span>
        <Button :name="'REBASE'"
            class="_btn"
            v-else
            :loading="load"
            @click="rebaseClick"/>
    </p>
</div>
</template>

<script>
import Button from '@/components/button/index.vue';

export default {
    name: 'card',
    props: ['label', 'value', 'isRebase', 'load'],
    components: {Button},
    methods: {
        rebaseClick() {
            this.$emit('rebase')
        }
    }
}
</script>

<style scoped lang="scss">
    ._card {
        width: 256px;
        height: 138px;
        background: #FFFFFF;
        border: 1px solid rgba(239, 239, 239, 0.5);
        box-shadow: -2px 5px 6px #EFEEF1;
        border-radius: 8px;
        padding: 20px;
        margin: 0 30px 30px;

        p {
            width: 100%;

            &:nth-of-type(1) {
                font-size: 16px;
                line-height: 16px;
                color: #686666;
                margin-bottom: 28px;
                font-family: KhContent;
            }

            &:nth-of-type(2) {
                font-size: 24px;
                line-height: 24px;
                color: #252525;
            }
        }

        ._btn {
            width: 146px;
            height: 32px;
            padding: 4px 0 0;
            font-size: 18px;
            border-radius: 6px;

            &::before {
                background-color: #FAFAF1;
            }

            &::after {
                border-radius: 6px;
                top: 3px;
                left: 3px;
            }
        }
    }
</style>
