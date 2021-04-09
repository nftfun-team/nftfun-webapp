<template>
    <div class="deposit-item">
        <div class="deposit-item-symbol">
            <img :src="imgSrc" alt="">
            <b class="f-pop-bold-family">{{data.name}} LP</b>
            <span class="f-center-y">{{data.weight}}X</span>
        </div>

        <div class="deposit-item-over">
            <h4>Overview </h4>
            <p class="deposit-item-over-line">APR <span class="f-fr">{{data.apr}}%</span></p>
            <p class="deposit-item-over-line">Total Deposits <span class="f-fr">{{data.totalStakeValue | toFixed(2)}} USD</span></p>
        </div>

        <div class="deposit-item-handle">
            <div class="deposit-item-handle-nav">
                <div class="deposit-item-handle-nav-item" :class="{'nav-active': direction=='deposit'}" @click="direction='deposit'">Deposit</div>
                <div class="deposit-item-handle-nav-item" :class="{'nav-active': direction=='withdraw'}" @click="direction='withdraw'">Withdraw</div>
            </div>
            <div class="deposit-item-handle-cont">
                <p class="deposit-item-handle-cont-use">Wallet Available: <span>{{data.userBalance}} {{data.name}} LP</span></p>
                <template v-if="direction=='deposit'">
                    <div class="deposit-item-handle-cont-number f-pr" >
                        <el-input v-model="depositNumber" placeholder="0.0000" @input.native="$filterNumber" @blur="changeVal('deposit')"/>
                        <span class="f-center-y" @click="handleMax('deposit')">MAX</span>
                    </div>
                    <el-button class="deposit-item-handle-cont-btn f-khc-family"  v-if="Number(data.userAllowance) > 0 || approveFlag" :loading="depositLoad" :disabled="!depositNumber || Number(depositNumber) == 0" @click="deposit()">Deposit</el-button>
                    <el-button class="deposit-item-handle-cont-btn f-khc-family" v-else :loading="approveLoad" @click="approve(data.address)">Approve</el-button>

                </template>

                <template v-else>
                    <div class="deposit-item-handle-cont-number f-pr" >
                        <el-input v-model="withdrawNumber" placeholder="0.0000" @input.native="$filterNumber" @blur="changeVal('withdraw')"/>
                        <span class="f-center-y" @click="handleMax('withdraw')">MAX</span>
                    </div>
                    <el-button class="deposit-item-handle-cont-btn f-khc-family" :loading="withdrawLoad" :disabled="!withdrawNumber || Number(withdrawNumber) == 0" @click="withdraw()">Withdraw</el-button>
                </template>
                <p class="deposit-item-handle-cont-link f-cursor" @click="jump()">Get Liquidity Pool Tokens</p>
            </div>
        </div>

        <div class="deposit-item-status">
            <p>Staked <span class="f-fr"> {{data.userAmount}} {{data.name}} LP</span></p>
            <p class="deposit-item-status-end">Rewards <span class="f-fr">{{data.userReward}}</span></p>
            <el-button class="deposit-item-status-btn f-khc-family" :loading="claimLoad" :disabled="Number(data.userReward) == 0" @click="harvest">Claim</el-button>
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
        @Prop({ default: {}, type: Object })
        private data!: Record<string, any>;

        get imgSrc():string {
            let src = ''
            try{
                src = require(`../../../assets/images/stake/${this.data.name.replace('/\//g', '-')}.svg`)
            }catch (e) {
                src = require(`../../../assets/images/stake/defalut.svg`)
            }
            return src
        }

        private depositNumber: string = '';
        private withdrawNumber: string = '';
        private direction: string = 'deposit';
        private approveLoad: boolean = false;
        private approveFlag: boolean = false;
        private depositLoad: boolean = false;
        private withdrawLoad: boolean = false;
        private claimLoad: boolean = false;

        private approve(token:string): void{
            this.approveLoad = true;
            let platform = this.$ChainApi.getContractAddr('MasterChef')
            this.$ChainApi.approve(token, platform).then(res => {
                if(res.status){
                    this.$notify({
                        title: 'Approve',
                        message: 'Approve Success',
                        type: 'success'
                    });
                    this.approveFlag = true
                } else {
                    this.$notify({
                        title: 'Approve',
                        message: 'Approve Error',
                        type: 'error'
                    });
                }
            }).finally(() => {
                this.approveLoad = false;
            });
        }

        private changeVal(type:string): void{
            if(type === 'deposit') this.depositNumber = this.$comparedTo(this.depositNumber,this.data.userBalance) === 1 ? this.data.userBalance : this.depositNumber;
            else this.withdrawNumber = (<any> this).$comparedTo(this.depositNumber,this.data.userAmount) === 1 ? this.data.userAmount : this.depositNumber;
        }

        private handleMax(type: string): void{
            if(type === 'deposit') this.depositNumber = this.data.userBalance;
            else this.withdrawNumber = this.data.userAmount;
        }

        private deposit(): void{
            this.depositLoad = true;
            let amount = this.$BigNumber(this.depositNumber).toFixed()

            this.$ChainApi.deposit(this.data.pid, amount).then(receipt => {
                this.$notify({
                    title: 'Deposit',
                    message: 'Deposit Success',
                    type: 'success'
                });
                this.depositNumber = ''
                this.$ChainApi.updatePool(this.data.pid)
            }).finally(() => {
                this.depositLoad = false;
            });
        }

        private withdraw(): void{
            this.withdrawLoad = true;
            let amount = this.$BigNumber(this.withdrawNumber).toFixed()
            this.$ChainApi.withdraw(this.data.pid, amount).then(receipt => {
                this.$notify({
                    title: 'Withdraw',
                    message: 'Withdraw Success',
                    type: 'success'
                });
                this.withdrawNumber = ''
                this.$ChainApi.updatePool(this.data.pid)
            }).finally(() => {
                this.withdrawLoad = false;
            });
        }

        private harvest(): void{
            this.claimLoad = true;
            this.$ChainApi.harvest(this.data.pid).then(receipt => {
                this.$notify({
                    title: 'Claim',
                    message: 'Claim Success',
                    type: 'success'
                });
                this.$ChainApi.updatePool(this.data.pid)
            }).finally(() => {
                this.claimLoad = false;
            });
        }

        private jump(): void{
            window.open(this.$ChainApi.getSwapAddLpUrl(this.$ChainApi.getTokenAddress(this.data.baseSymbol), this.$ChainApi.getTokenAddress(this.data.tokenSymbol)))
        }
    }
</script>

<style lang="scss" scoped>
    .deposit-item{
        width: 572px;
        padding: 28px 48px 28px;
        background: #fff;
        box-shadow: -2px 5px 6px #EFEEF1;
        border-radius: 8px;
        border: 1px solid rgba(239, 239, 239, 0.5);
        margin-bottom: 48px;
        color: #000;
        transition: all .2s;
        ::v-deep .el-button:hover{
            background: #FCFCED;
        }
        ::v-deep .is-disabled{
            background: #EEEEE9;
            &:hover{background: #EEEEE9}
        }
        &:hover {
            margin-top: -10px;
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
                margin-left: 18px;
                height: 20px;
                line-height: 20px;
                border-radius: 10px;
                padding: 0 18px;
                background: #FAFAF1;
                border: 1px solid #000;
                font-size: 14px;
                top: 47%;
            }
        }
        &-over{
            padding: 47px 0 34px;
            border-bottom: 1px solid rgba(104, 102, 102, 0.5);
            h4{
                line-height: 24px;
                font-size: 24px;
                color: #252525;
                margin-bottom: 28px;
            }
            p{
                margin-bottom: 28px;
                font-size: 24px;
                line-height: 24px;
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
            padding: 18px 0 13px;
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
                    color: #252525;
                    flex: 1;
                    cursor: pointer;
                    &:hover{
                        color: #6ABFEE;
                    }
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
                    font-size: 16px;
                    line-height: 24px;
                    height: 24px;
                    margin-bottom: 18px;
                }
                &-number{
                    width: 100%;
                    height: 50px;
                    border-radius: 16px;
                    overflow: hidden;
                    color: #686666;
                    ::v-deep .el-input__inner{
                        height: 50px;
                        border-radius: 16px;
                        font-size: 16px;
                        color: #686666;
                    }
                    span{
                        font-size: 16px;
                        position: absolute;
                        right: 20px;
                        top: 55%;
                        cursor: pointer;
                    }
                }
                &-btn{
                    width: 100%;
                    height: 43px;
                    font-size: 18px;
                    border-radius: 22px;
                    font-weight: 500;
                    margin: 18px 0;
                    background: #FAFAF1;
                }
                &-link{
                    font-size: 16px;
                    line-height: 24px;
                    height: 24px;
                    color: #F5B6A1;
                    &:hover{
                        color: #F3A58B;
                    }
                }
            }
        }
        &-status{
            margin-top: 28px;
            color: #252525;
            p{
                margin-bottom: 31px;
                font-size: 24px;
                line-height: 24px;
                height: 24px;
                span{
                    font-size: 16px;
                    color: #686666;
                }
            }
            &-end{
                margin-bottom: 28px;
            }
            &-btn{
                margin-top: 4px;
                width: 100%;
                height: 43px;
                border-radius: 22px;
                font-weight: 500;
                font-size: 18px;
                background: #FAFAF1;
            }
        }
    }

    @media (max-width: 768px){
        .deposit-item{
            margin-bottom: 28px;
            &-symbol{
                height: 30px;
                line-height: 31px;
                font-size: 14px;
                justify-content: left;
                img{
                    height: 30px;
                }
                span{
                    height: 14px;
                    line-height: 14px;
                    font-size: 10px;
                    padding: 0 12px;
                }

            }
            &-over{
                padding: 18px 0 8px;
                h4{
                    font-size: 16px;
                    line-height: 24px;
                    margin-bottom: 8px;
                }
                p{
                    font-size: 16px;
                    margin-bottom: 8px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    span{
                        display: block;
                        float: none;
                        margin-top: 8px;
                        font-size: 14px;
                        line-height: 16px;
                    }
                }
            }
            &-handle {
                padding: 10px 0 8px;
                &-nav {
                    height: 34px;
                    border-radius: 8px;
                    &-item{
                        line-height: 34px;
                        font-size: 14px;
                    }
                }
                &-cont{
                    padding: 10px 0 0;
                    &-use{
                        font-size: 16px;
                        line-height: 24px;
                        height: auto;
                        span{
                            margin-top: 8px;
                            display: block;
                            font-size: 14px;
                            line-height: 16px;
                            color: #686666;
                        }
                    }
                    &-number{
                        height: 34px;
                        border-radius: 8px;
                        ::v-deep .el-input__inner{
                            height: 34px;
                            border-radius: 8px;
                            font-size: 12px;
                        }
                        span{
                            font-size: 12px;
                            position: absolute;
                            right: 10px;
                            top: 51%;
                            cursor: pointer;
                        }
                    }
                    &-btn{
                        height: 34px;
                        font-size: 12px;
                        border-radius: 17px;
                        margin: 20px 0 18px;
                    }
                    &-link{
                        font-size: 14px;
                        line-height: 14px;
                        height: 14px;
                    }
                }
            }
            &-status{
                margin-top: 14px;
                p{
                    margin-bottom: 12px;
                    font-size: 16px;
                    line-height: 24px;
                    height: auto;
                    span{
                        float: none;
                        display: block;
                        font-size: 14px;
                        line-height: 16px;
                        margin-top: 8px;
                    }
                }
                &-end{
                    margin-bottom: 24px;
                }
                &-btn{
                    height: 34px;
                    border-radius: 17px;
                    font-size: 12px;
                }
            }
        }
    }
</style>
