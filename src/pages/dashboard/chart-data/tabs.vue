<template>
<div style="width: 100%;">
    <h3>{{title}}</h3>
    <div class="_chart-tabs">
        <div>
            <span :class="{'active': active==='7d'}" @click="tabClick('7d', type)">7 DAY</span>
            <span :class="{'active': active==='30d'}" @click="tabClick('30d', type)">30 DAY</span>
            <span :class="{'active': active==='all'}" @click="tabClick('all', type)">ALL</span>
        </div>

        <div>
            <span :class="{'active': type==='ABS'}" @click="tabClick(active,'ABS')">ABS</span>
            <span :class="{'active': type==='%'}" @click="tabClick(active, '%')">%</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'tabs',
    props: ['active', 'type', 'title'],
    data() {
        return {
            init7d: '7d',
            init30d: '30d',
        }
    },
    methods: {
        tabClick(name, type) {
            this.$emit('tab', {name, type})
        }
    }
}
</script>

<style scoped lang="scss">
    h3 {
        font-size: 32px;
        line-height: 32px;
        color: #252525;
        font-weight: 400;
        margin-bottom: 30px;
        margin-top: 94px;
        width: 100%;
    }

    ._chart-tabs {
        display: flex;
        width: 100%;
        margin-bottom: 30px;

        div {
            background: #FFFFFF;
            box-shadow: -2px 5px 6px #EFEEF1;
            border-radius: 8px;
            height: 35px;
            overflow: hidden;
            margin-right: 38px;

            &:nth-last-of-type(1) {
                margin-right: 0;
            }

            span {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 100%;
                border-right: 1px solid #F8F8F8;
                cursor: pointer;
                transition: all .2s;
                font-family: KhContent;
                font-size: 12px;
                color: #000000;

                &:nth-last-of-type(1) {
                    border-right: 0;
                }
            }

            .active {
                background-color: #F3CDC7;
            }
        }
    }

    @media (max-width: 768px) {
        h3 {
            font-size: 14px;
            line-height: 14px;
            margin-top: 30px;
            margin-bottom: 12px;
        }

        ._chart-tabs {
            flex-wrap: wrap;
            justify-content: center;
            div {
                margin-bottom: 8px;
            }
        }
    }
</style>
