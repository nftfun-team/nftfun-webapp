<template>
<div class="_tabs">
    <template v-for="el of tabsList">
    <span
        :class="{'active': el.active === activeIndex}"
        @click="tabClick(el)">
        {{el.label}}
    </span>
    </template>
</div>
</template>

<script>
export default {
    name: 'index',
    props: ['tabsList', 'active'],
    data() {
        return {
            activeIndex: 1
        }
    },
    watch: {
        tabsList: {
            handler(val) {
                console.log('VAL....', val)
            }
        }
    },
    methods: {
        tabClick(data) {
            this.activeIndex = data.active;
            this.$emit('tab', {active: data.active})
        }
    }
}
</script>

<style scoped lang="scss">
    ._tabs {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 64px;

        span {
            font-size: 32px;
            color: #252525;
            padding-bottom: 18px;
            margin-right: 70px;
            transition: all .2s;
            cursor: pointer;
            position: relative;

            &:nth-last-child(1) {
                margin-right: 0;
            }

            &::after {
                content: '';
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                width: 100%;
                height: 2px;
                background-color: transparent;
            }

            &:hover {
                color: #EF8969;
            }
        }

        .active {
            color: #EF8969;

            &::after {
                background-color: #EF8969;
            }
        }
    }

    @media (max-width: 768px) {
        ._tabs {
            margin-bottom: 24px;

            span {
                font-size: 16px;
                margin-right: 30px;
                padding-bottom: 8px;

                &::after {
                    height: 1px;
                }
            }
        }
    }
</style>
