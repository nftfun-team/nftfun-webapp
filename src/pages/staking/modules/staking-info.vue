<template>
    <div class="staking-info">
        <div class="staking-info-top">
            <div class="staking-info-top-item">
                <p>APR</p>
                <h5>0%</h5>
            </div>
            <div class="staking-info-top-item">
                <p>Reward Multiplier</p>
                <h5>1.0X</h5>
            </div>
            <div class="staking-info-top-item">
                <p>Bonus distributions have ended.</p>
                <h5>Click here to claim bonuses.</h5>
            </div>
        </div>
        <div class="staking-info-reward"></div>
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
        &-top{
            display: flex;
            justify-content: space-between;
            &-item{
                padding: 26px 20px;
                background: #fff;
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
    }
</style>
