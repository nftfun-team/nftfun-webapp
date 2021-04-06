<template>
    <div class="deposit-item">
        <div class="deposit-item-deposit">
            <h4>Deposit</h4>
            <div class="deposit-item-deposit-line">
                Get Liquidity Pool Tokens <span>Stake Stake</span>
            </div>
        </div>
        <div class="deposit-item-deposit">
            <h4>Withdraw</h4>
            <div class="deposit-item-deposit-line _n-mg-bt-24">
<!--                Withdraw Amount (CAKE-LP) -->
                <span>Deposited:0 {{data.name}}</span>
            </div>
            <div class="deposit-item-deposit-input _n-mg-bt-29 f-pr">
                <el-input v-model="value" placeholder="0.0" />
                <span class="f-center-y f-fw8 f-cursor">MAX</span>
            </div>
            <div class="deposit-item-deposit-line _n-mg-bt-34">
                Withdraw Amount <span>≈ 0 FUN</span>
            </div>
            <div class="deposit-item-deposit-line">
                Rewards Earned: <span>0 {{data.tokenSymbol}}  </span>
            </div>
        </div>
        <div class="deposit-item-deposit">
            <h4>Status</h4>
            <div class="deposit-item-deposit-line _n-mg-bt-34">
                Total Deposits <span>261,197.41 USD</span>
            </div>
            <div class="deposit-item-deposit-line">
                Program duration <span>Ended</span>
            </div>
        </div>
        <div class="deposit-item-btn">
            <com-button style="height: 48px" name="CONNECT WALLET"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import ComButton from "components/button/index.vue";

    @Component({
        name: 'DepositItem',
        components: {ComButton}
    })
    export default class DepositItem extends Vue{
        @Prop({ default: "data", type: Array })
        private data!: Array<any>;

        private value: string = '';
    }
</script>

<style lang="scss" scoped>
    .deposit-item{
        width: 572px;
        padding: 38px 47px 34px;
        background: #fff;
        box-shadow: -2px 5px 6px #EFEEF1;
        border-radius: 8px;
        border: 1px solid rgba(239, 239, 239, 0.5);
        margin-bottom: 58px;
        &-deposit{
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(104, 102, 102, 0.5);
            margin-bottom: 34px;
            h4{
                font-weight: 800;
                font-size: 24px;
                line-height: 28px;
                color: #000000;
                margin-bottom: 28px;
            }
            &-line{
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                line-height: 19px;
                color: #686666;
                font-weight: 800;
            }
            &-input{
                ::v-deep .el-input__inner{
                    width: 100%;
                    height: 50px;
                    border: 1px solid #2C3035;
                    box-sizing: border-box;
                    border-radius: 16px;
                }
                span{
                    position: absolute;
                    right: 20px;
                    font-size: 16px;
                    line-height: 19px;
                    color: #686666;
                    top: 55%;
                }
            }
            &:nth-of-type(3){
                border: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
        }
        &-btn{
            margin-top: 58px;
            display: flex;
            justify-content: center;
        }
    }
</style>
