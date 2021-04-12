<template>
<div class="no-data">
    <img src="~@/assets/images/empty.png" alt="">
    <p>Temporarily no data</p>
</div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';

@Component
export default class NoData extends Vue {

}
</script>

<style lang="scss" scoped>
    .no-data {
        width: 100%;
        text-align: center;
        position: relative;
        padding: 20px 0;

        img {
            width: 180px;
        }

        p {
            margin-top: 48px;
            font-size: 24px;
            line-height: 24px;
            color: #252525;
            font-weight: bold;
            text-align: center;
        }
    }

    @media (max-width: 768px) {
        .no-data {
            img {
                width: 165px;
            }

            p {
                margin-top: 30px;
                font-size: 18px;
            }
        }
    }
</style>
