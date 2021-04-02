<template>
    <div class="staking-info">
        <div class="staking-info-item">
            <p>APR</p>
            <h5>0%</h5>
        </div>
        <div class="staking-info-item">
            <p>Reward Multiplier</p>
            <h5>1.0X</h5>
        </div>
        <div class="staking-info-item">
            <p>Rewards Earned</p>
            <h5>0 FUN</h5>
        </div>
        <div class="staking-info-item">
            <p>Bonus distributions have ended.</p>
            <h5>Click here to claim bonuses.</h5>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: 'StakingInfo'
    })
    export default class StakingInfo extends Vue{

    }
</script>

<style lang="scss" scoped>
    .staking-info{
        width: 100%;
        margin-top: 64px;
        display: flex;
        justify-content: space-between;
        &-item{
                padding: 26px 20px;
                background: #fff;
                width: 256px;
                border: 1px solid rgba(239, 239, 239, 0.5);
                box-shadow: -2px 5px 6px #EFEEF1;
                border-radius: 8px;
                p{
                    font-family: BrandonGrotesqueWeb-Bold;
                    font-size: 16px;
                    line-height: 19px;
                    color: #686666;
                }
                h5{
                    margin-top: 20px;
                    font-family: BrandonGrotesqueWeb-Bold;
                    font-size: 24px;
                    line-height: 28px;
                    word-wrap: break-word;
                    color: #000000;
                }
            }
    }
</style>
