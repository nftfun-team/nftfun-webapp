<template>
    <div class="deposit-item">
        <div class="deposit-item-symbol">
            <img src="~img/stake/fun.svg" alt="">
            {{data.name}} LP
            <span class="f-center-y">{{data.weight}}X</span>
        </div>

        <div class="deposit-item-over">
            <h4>Overview </h4>
            <p class="deposit-item-over-line">APR <span class="f-fr">{{data.apr}}%</span></p>
            <p class="deposit-item-over-line">Total Deposits <span class="f-fr">{{data.totalStakeValue}} USD</span></p>
        </div>

        <div class="deposit-item-handle">
            <div class="deposit-item-handle-nav">
                <div class="deposit-item-handle-nav-item" :class="{'nav-active': direction=='deposit'}" @click="direction='deposit'">Deposit</div>
                <div class="deposit-item-handle-nav-item" :class="{'nav-active': direction=='withdraw'}" @click="direction='withdraw'">Withdraw</div>
            </div>
            <div class="deposit-item-handle-cont">
                <p class="deposit-item-handle-cont-use">Wallet Available: {{data.userBalance}} FUN/USDT LP</p>
                <template v-if="direction=='deposit'">
                    <div class="deposit-item-handle-cont-number f-pr" >
                        <el-input v-model="buyNumber" placeholder="0.0000" />
                        <span class="f-center-y">MAX</span>
                    </div>
                    <el-button class="deposit-item-handle-cont-btn f-pm-family" v-if="userAllowance > 0" >Deposit</el-button>
                    <el-button class="deposit-item-handle-cont-btn f-pm-family" :loading="approveLoad" v-else @click="approve(data.address)">Approve</el-button>
                </template>

                <template v-else>
                    <div class="deposit-item-handle-cont-number f-pr" >
                        <el-input v-model="buyNumber" placeholder="0.0000" />
                        <span class="f-center-y">MAX</span>
                    </div>
                    <el-button class="deposit-item-handle-cont-btn f-pm-family">Withdraw</el-button>
                </template>
                <p class="deposit-item-handle-cont-link f-cursor">Get Liquidity Pool Tokens</p>
            </div>
        </div>

        <div class="deposit-item-status">
            <p>Staked <span class="f-fr"> {{data.userAmount}} FUN/USDT LP</span></p>
            <p>Rewards <span class="f-fr">0</span></p>
            <el-button class="deposit-item-status-btn f-pm-family" disabled=true>Claim</el-button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import ChainApi from "@/assets/sdk/ChainApi.js";
    import ComButton from "components/button/index.vue";

    @Component({
        name: 'DepositItem',
        components: {ComButton}
    })
    export default class DepositItem extends Vue{
        @Prop({ default: "data", type: Array })
        private data!: Array<any>;

        private buyNumber: string = '';
        private sellNumber: string = '';
        private direction: string = 'deposit';
        private approveLoad: boolean = false


        private approve(token:string): void{
            this.approveLoad = true;
            let platform = ChainApi.getContractAddr('MasterChef')
            ChainApi.approve(token, platform).then(tx => {
                console.log('approve tx:', tx);
            }).finally(() => {
                this.approveLoad = false;
            });
        }
    }
</script>

<style lang="scss" scoped>
    .deposit-item{
        width: 572px;
        padding: 28px 58px 28px;
        background: #fff;
        box-shadow: -2px 5px 6px #EFEEF1;
        border-radius: 8px;
        border: 1px solid rgba(239, 239, 239, 0.5);
        margin-bottom: 58px;
        color: #000;
        ::v-deep .is-disabled{
            background: #EEEEE9
        }
        &-symbol{
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: center;
            font-size: 16px;
            img{
                margin-right: 24px;
            }
            span{
                font-weight: 600;
                margin-left: 18px;
                height: 20px;
                line-height: 20px;
                border-radius: 10px;
                padding: 0 18px;
                background: #FAFAF1;
                border: 1px solid #000;
                font-size: 14px;
                top: 45%;
            }
        }
        &-over{
            padding: 47px 0 34px;
            border-bottom: 1px solid rgba(104, 102, 102, 0.5);
            h4{
                line-height: 35px;
                font-size: 28px;
                color: #000;
                margin-bottom: 28px;
            }
            p{
                margin-bottom: 20px;
                font-size: 24px;
                line-height: 35px;
                height: 35px;
                font-weight: 800;
                &:last-child{
                    margin-bottom: 0;
                }
                span{
                    font-size: 16px;
                    color: #686666;
                }
            }
        }
        &-handle{
            padding: 25px 0 14px;
            border-bottom: 1px solid rgba(104, 102, 102, 0.5);
            &-nav{
                height: 50px;
                display: flex;
                border-radius: 16px;
                border: 1px solid #2C3035;
                overflow: hidden;
                &-item{
                    text-align: center;
                    line-height: 50px;
                    font-size: 24px;
                    font-weight: 800;
                    flex: 1;
                    cursor: pointer;
                    &:first-child{
                        border-right: 1px solid #2C3035;
                    }
                }
                .nav-active{
                    background: #E1F4FF;
                    color: #6ABFEE;
                }
            }
            &-cont{
                padding: 24px 0 0;
                &-use{
                    font-weight: 800;
                    font-size: 16px;
                    line-height: 23px;
                    height: 23px;
                    margin-bottom: 24px;
                }
                &-number{
                    width: 100%;
                    height: 50px;
                    border-radius: 16px;
                    overflow: hidden;
                    ::v-deep .el-input__inner{
                        height: 50px;
                        border-radius: 16px;
                    }
                    span{
                        font-size: 16px;
                        font-weight: 800;
                        position: absolute;
                        right: 20px;
                        top: 55%;
                    }
                }
                &-btn{
                    width: 100%;
                    height: 43px;
                    border-radius: 22px;
                    font-weight: 500;
                    margin: 18px 0;
                    background: #FAFAF1;
                }
                &-link{
                    font-size: 16px;
                    line-height: 19px;
                    height: 23px;
                    color: #F5B6A1;
                    font-weight: 800;
                    text-indent: 10px;
                }
            }
        }
        &-status{
            margin-top: 28px;
            p{
                margin-bottom: 20px;
                font-size: 24px;
                line-height: 35px;
                height: 35px;
                font-weight: 800;
                span{
                    font-size: 16px;
                    color: #686666;
                }
            }
            &-btn{
                margin-top: 4px;
                width: 100%;
                height: 43px;
                border-radius: 22px;
                font-weight: 500;
                background: #FAFAF1;
            }
        }
    }
</style>
