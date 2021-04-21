<template>
    <div class="loading-main">
        <template v-if="loading">
            <div class="loading">
                <div class="loading-box">
                    <img src="~img/loading.gif" alt="">
                </div>
                <span>Loading...</span>
            </div>
        </template>
        <slot v-else></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';

    @Component({name: 'Loading'})
    export default class ComingSoon extends Vue {
        @Prop({type: Boolean, default: false}) private loading!: Boolean
    }
</script>

<style scoped lang="scss">
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .loading-main{
        height: 100%;
    }
    .loading {
        width: 100%;
        padding: 30px 0 0;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .loading-box {
            display: flex;

            img {
                display: block;
                margin: 0 auto;
                width: 42px;
                height: 42px;
                /*animation: spin 2s linear infinite;*/
            }
        }

        span {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #000000;
        }
    }
</style>
