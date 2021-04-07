<template>
    <div class="deposit-item">
        <div class="deposit-item-symbol">
            <img :src="imgSrc" alt="">
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
                <p class="deposit-item-handle-cont-use">Wallet Available: {{data.userBalance}} {{data.name}} LP</p>
                <template v-if="direction=='deposit'">
                    <div class="deposit-item-handle-cont-number f-pr" >
                        <el-input v-model="depositNumber" placeholder="0.0000" @input.native="$filterNumber" @blur="changeVal('deposit')"/>
                        <span class="f-center-y" @click="handleMax('deposit')">MAX</span>
                    </div>
                    <el-button class="deposit-item-handle-cont-btn f-pm-family"  v-if="Number(data.userAllowance) > 0 || approveFlag" :loading="depositLoad" :disabled="!depositNumber || Number(depositNumber) == 0" @click="deposit()">Deposit</el-button>
                    <el-button class="deposit-item-handle-cont-btn f-pm-family" v-else :loading="approveLoad" @click="approve(data.address)">Approve</el-button>

                </template>

                <template v-else>
                    <div class="deposit-item-handle-cont-number f-pr" >
                        <el-input v-model="withdrawNumber" placeholder="0.0000" @input.native="$filterNumber" @blur="changeVal('withdraw')"/>
                        <span class="f-center-y" @click="handleMax('withdraw')">MAX</span>
                    </div>
                    <el-button class="deposit-item-handle-cont-btn f-pm-family" :loading="withdrawLoad" :disabled="!withdrawNumber || Number(withdrawNumber) == 0" @click="withdraw()">Withdraw</el-button>
                </template>
                <p class="deposit-item-handle-cont-link f-cursor">Get Liquidity Pool Tokens</p>
            </div>
        </div>

        <div class="deposit-item-status">
            <p>Staked <span class="f-fr"> {{data.userAmount}} {{data.name}} LP</span></p>
            <p>Rewards <span class="f-fr">{{data.userReward}}</span></p>
            <el-button class="deposit-item-status-btn f-pm-family" :loading="claimLoad" :disabled="Number(data.userReward) == 0" @click="harvest">Claim</el-button>
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
            return require(`../../../assets/images/stake/${this.data.name.replace('/\//g', '-')}.svg`)
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
                if(res.status) this.approveFlag = true
            }).finally(() => {
                this.approveLoad = false;
            });
        }

        private changeVal(type:string): void{
            if(type === 'deposit') this.depositNumber = (<any> this).$comparedTo(this.depositNumber,this.data.userBalance) === 1 ? this.data.userBalance : this.depositNumber;
            else this.withdrawNumber = (<any> this).$comparedTo(this.depositNumber,this.data.userAmount) === 1 ? this.data.userAmount : this.depositNumber;
        }

        private handleMax(type: string): void{
            if(type === 'deposit') this.depositNumber = this.data.userBalance;
            else this.withdrawNumber = this.data.userAmount;
        }

        private deposit(): void{
            this.depositLoad = true;
            let amount = this.$BigNumber(this.depositNumber).toFixed()

            this.$ChainApi.deposit(0, amount).then(receipt => {
                this.$ChainApi.updatePool(this.data.pid)
            }).finally(() => {
                this.depositLoad = false;
            });
        }
        private withdraw(): void{
            this.withdrawLoad = true;
            let amount = this.$BigNumber(this.withdrawNumber).toFixed()
            this.$ChainApi.withdraw(0, amount).then(receipt => {
                this.$ChainApi.updatePool(this.data.pid)
            }).finally(() => {
                this.withdrawLoad = false;
            });
        }

        private harvest(): void{
            this.claimLoad = true;
            this.$ChainApi.harvest(this.data.pid).then(receipt => {
                this.$ChainApi.updatePool(this.data.pid)
            }).finally(() => {
                this.claimLoad = false;
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
        ::v-deep .el-button:hover{
            background: #FCFCED;
        }
        ::v-deep .is-disabled{
            background: #EEEEE9;
            &:hover{background: #EEEEE9}
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
                    &:hover{
                        color: #6ABFEE;
                        /*background: #E1F4FF;*/
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
                        font-size: 16px;
                    }
                    span{
                        font-size: 16px;
                        font-weight: 800;
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
                    line-height: 19px;
                    height: 23px;
                    color: #F5B6A1;
                    font-weight: 800;
                    text-indent: 10px;
                    &:hover{
                        color: #F3A58B;
                    }
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
                font-size: 18px;
                background: #FAFAF1;
            }
        }
    }
</style>
