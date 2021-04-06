<template>
    <el-dialog
            :append-to-body="true"
            class="dialog-madel pd-0"
            :visible="visible"
            :before-close="close"
            :close-on-click-modal="false"
    >
        <div class="pd">
            <div class="dialog-title _wallet-title">
                <span class="title-account">Account</span>
            </div>
            <div class="dialog-body">
                <p class="connect-account">Connected with MetaMask</p>
                <p class="hash">{{ account | hash(6) }}</p>
                <div class="bsc-scan">
                    <div
                            class="copy copy-btn"
                            @click="copyClick(account)"
                            :data-clipboard-text="account"
                    >
                        Copy Address
                    </div>
                    <div class="open" @click="winOpen">View on Bsccan</div>
                    <div class="copy open" @click="logoutClick">Log Out</div>
                </div>
            </div>
        </div>

        <div class="history-box">
            <template v-if="actionCache.length">
                <div class="clear-box">
                    <span class="left">Recent Transactions</span>
                    <div class="clear-history" @click="clearCache">
                        Your transactions will appear here...
                    </div>
                </div>
                <div v-for="item in actionCache" class="history" :key="item.timestamp">
                    <span class="left" @click="winAddress(item)">{{item.params.describe}}</span>
                    <span class="state">
                <img :src="iconMap[item.code] || iconMap.default" alt=""/>
            </span>
                </div>
            </template>
        </div>
        <div v-if="!actionCache.length" class="dialog-footer">
            Your transactions will appear here...
        </div>
    </el-dialog>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Emit} from "vue-property-decorator";
    import {Getter, Mutation} from "vuex-class";
    import {M_CHAIN_WALLETADDRESS, G_HASH_CACHE, M_HASH_CLEANCACHE} from "store/modules/chain/types";


    @Component({
        name: 'DialogTop',
    })
    export default class DialogTop extends Vue {
        @Mutation(M_CHAIN_WALLETADDRESS) private setWalletAdress!: Function;
        @Mutation(M_HASH_CLEANCACHE) private clearCache!: Function;
        @Getter(G_HASH_CACHE) private actionCache!: Array<any>;

        @Prop({type: Boolean, default: false}) private visible!: Boolean
        @Prop({type: String, default: ''}) private account!: Boolean

        public iconMap: Record<any, any> = {
            0: require('../../assets/images/pending.svg'),
            1: require('../../assets/images/success.svg'),
            4: require('../../assets/images/success.svg'),
            default: require('../../assets/images/error.svg'),
        };

        @Emit('close')
        public close() {}

        private winAddress(): void {
            // window.open(this.$swap.getBscscanTx(data.result));
        }

        private copyClick(address: string): void {
            window.copy(address)
        }

        private winOpen(): void {
            // this.$store
            //     .dispatch('bsc', {
            //         account: this.account,
            //     })
            //     .then((res) => {
            //         window.open(res);
            //     });
        }

        @Emit('showLogin')
        showLogin(){}

        private logoutClick(): void {
            this.close();
            this.setWalletAdress('');
            this.showLogin()
        }
    }
</script>

<style lang="scss">
    .pd {
        padding: 10px 20px 0 20px;
    }

    .el-dialog {
        border-radius: 8px;
        width: 480px;
    }

    .el-dialog__body {
        position: relative;
        padding: 20px 0 0;

        .pool-amount {
            padding: 0 0 30px 0;
            color: #1e2226;

            span {
                font-weight: bold;
            }
        }

        .dialog-title {
            /*width: 100%;*/
            min-height: 35px;
            display: flex;
            align-items: center;
            position: absolute;
            top: -14px;
            left: 0;
            color: #1e2226;
            padding: 0 40px 0 30px;

            &._wallet-title {
                padding-left: 22px;
            }

            img {
                height: 26px;
                width: auto;
            }

            span {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
                //margin-left: 10px;
            }

            .type {
                font-size: 14px;
                border-radius: 10px;

                &.subject {
                    font-weight: bold;
                    font-size: 24px;
                }
            }
        }

        .dialog-body {
            padding: 0px 0 30px 0;

            .block {
                font-size: 24px;
                color: #1e2226;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
            }

            .creater {
                padding: 10px 0;
                //color: var(--col-label);
                color: #1e2226;

                .with5 {
                    color: rgba(30, 34, 38, 0.5);
                }

                .address {
                    font-weight: bold;
                }
            }

            .date {
                display: flex;
                color: rgba(#1e2226, 0.5);
                padding: 10px 0 20px 0;
                justify-content: space-between;
                border-bottom: 1px solid var(--col-border);
            }

            .total {
                display: flex;
                justify-content: space-between;
                color: #1e2226;
                font-size: 16px;
                padding-top: 20px;
                align-items: center;

                p {
                    padding: 5px 0;
                }

                p span:nth-of-type(2) {
                    font-weight: bold;
                }

                .button {
                    font-size: 16px;
                    font-weight: bold;
                    width: 116px;
                }
            }

            .vote {
                display: flex;
                //justify-content: space-between;
                flex-direction: column;
                padding-top: 20px;

                .support,
                .support-it {
                    padding-left: 20px;
                    border-radius: 10px;
                    min-height: 140px;
                    border: 1px solid rgba(#000000, 0.2);
                    display: flex;
                    align-items: center;
                    margin-top: 10px;

                    .number-of-votes {
                        font-size: 24px;
                        font-weight: bold;
                        color: #1e2226;
                        margin-left: 10px;
                    }

                    &.pointer {
                        cursor: pointer;

                        &:hover {
                            box-shadow: 0 0 20px rgba(21, 11, 112, 0.2);
                        }
                    }
                }
            }

            .effection {
                padding: 30px 0 15px 0;
                font-size: 16px;

                span:nth-of-type(1) {
                    color: #1e2226;
                }

                span:nth-of-type(2) {
                    color: var(--col-main);
                }
            }

            .output {
                min-height: 100px;
                border: 1px solid rgba(0, 0, 0, 0.2);
                padding: 20px;
                color: #1e2226;
                border-radius: 10px;
            }

            .your-vote-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 60px;
                //background: var(--col-card-background-default);
                color: #22b4b5;
                padding: 0 20px;
                margin: 10px 0;

                .my-vote {
                    display: flex;
                    align-items: center;
                }
            }

            // governance
            .voting-reward {
                padding-bottom: 10px;

                span {
                    //color: var(--col-font);
                }
            }

            .connect-account {
                color: #1e2226;
                font-size: 19px;
                padding: 10px 0 30px 0;
            }

            .hash {
                color: #f0b80b;
                font-size: 40px;
                word-break: break-word;
                font-weight: 700;
                margin-bottom: 30px;
            }

            .bsc-scan {
                display: flex;
                font-size: 17px;
            }

            .copy,
            .open {
                cursor: pointer;
                border-radius: 20px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #f0b80b;
                background-color: rgba(240, 184, 11, 0.2);
                padding: 0 10px;
                transition: all .2s;

                &:hover {
                    background-color: #FFF8DE;
                }
            }

            .open {
                margin-left: 20px;
            }
        }


        .append-box {
            display: flex;
            align-items: center;

            .up {
                color: #333333;
                font-size: 16px;
                margin-top: -2px;
            }

            .all {
                font-size: 16px;
                color: #2775ca;
                margin-left: 30px;
                cursor: pointer;
            }

            .max {
                padding: 0;
                margin-left: 5px;
            }
        }

        //.select {
        //  .el-input__inner,
        //  .el-input-group__append {
        //    height: 40px;
        //  }
        //}
        .el-input__suffix {
            display: flex;
            align-items: center;
            right: 20px;
        }

        .el-input__inner,
        .el-input-group__append {
            background: transparent;
            border-radius: 10px;
            color: #1e2226;
            height: 60px;
        }

        .asset-box {
            height: 30px;
            align-items: center;
            display: flex;
            justify-content: space-between;

            .left {
                padding-left: 15px;
            }
        }

        .withdraw-tips {
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--col-font);
            font-size: 16px;
        }

        .dialog-footer {
            display: flex;
            padding: 20px 0 20px 0;
            font-size: 18px;
            justify-content: center;

            .button {
                width: 140px;
            }

            .button-200 {
                width: 200px;
                height: 60px;
            }
        }
    }
</style>
<style scoped lang="scss">

    .dialog-footer {
        background: rgba(30, 34, 38, 0.05);
        color: #1e2226;
        font-size: 16px;
    }

    .history-box {
        max-height: 250px;
        overflow-y: scroll;
        background-color: rgba(30, 34, 38, 0.05);
    }

    .history {
        display: flex;
        justify-content: space-between;
        height: 40px;
        align-items: center;
        padding: 0 20px;

        .left {
            color: #3b8cff;
            font-size: 12px;
            cursor: pointer;
        }
    }

    .clear-box {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;

        .left {
            color: #1e2226;
        }

        .clear-history {
            cursor: pointer;
            border-radius: 0.26667rem;
            color: #f0b80b;
            background: rgba(30, 34, 38, 0.05);
            padding: 10px;
            text-align: center;
        }
    }
</style>
