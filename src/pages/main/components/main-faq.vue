<template>
<div class="_main-faq">
    <div class="_container">
        <h2>FAQ</h2>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="el.title" :name="index" v-for="(el, index) of list">
                <div class="txt" v-html="el.txt"></div>
            </el-collapse-item>
            <img src="~img/loading.gif" alt="" v-if="load" class="load-img">
        </el-collapse>
        <div class="_faq-more" v-if="hideFlag">
            <span @click="moreClick">Show More</span>
            <img src="~img/show-more.svg" alt="">
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'main-describe',
    data() {
        return {
            load: false,
            hideFlag: true,
            // activeNames: [0, 1, 2],
            list: [
                {
                    title: 'What is the price target of FUN?',
                    txt: 'FUN is pegged to the total NFT market cap at a ratio of 1: 30,000,000,000. If the total NFT market cap is $30 Billion, FUN is pegged to $1.00. If the total NFT market cap is $150 Billion, FUN is pegged to $5.00.'
                },
                {
                    title: 'When rebase?',
                    txt: 'Rebase can be triggered via our dashboard every 24 hours. <br>The rebase has to be activated manually via the rebase button, and everybody can trigger a rebase. First come first serve! Once a rebase is activated, it will affect all wallet balances.'
                },
                {
                    title: 'How can I purchase FUN?',
                    txt: 'FUN tokens will be available for public sale through an initial offering on our partner\'s platform. For more information please check our official <a href="https://t.me/NftFunProtocol" target="_blank">telegram</a> or <a href="https://twitter.com/NFTFunProtocol" target="_blank">Twitter</a>.'
                }
            ],
            list2: [
                {
                    title: 'What is FUN rebase?',
                    txt: 'Fun is an elastic supply synthetic index token based on the total market cap of the NFT field. Pegged at a ratio of 1:30,000,000,000, FUN protocol derives its data using decentralized oracles to maintain the accuracy of feeds and accurate rebases. The value of the total market cap of the NFT field is obtained using an oracle developed by our trusted partner. The oracle sources the data from CoinGecko to provide the feeds. Based on these feeds, FUN performs rebase once every 24 hours. Our oracles sources the information, for example total market cap of NFT assets, from CoinGecko every 10 minutes, and then provides the TWAP data feed to perform the most accurate rebase and maintain its peg.'
                },
                {
                    title: 'What is the total supply of FUN?',
                    txt: 'The initial supply of FUN after the TGE and before the first rebase will be 1,500,000 FUN tokens.'
                },
                {
                    title: 'What is the Vesting period for public sale?',
                    txt: 'There is no lockup period for public offering tokens.'
                },
                {
                    title: ' Types of rebases：',
                    txt: 'Positive rebase above target price *1.05, supply will increase; <br>Negative rebase below target price *0.95, supply will decease; <br>Neutral rebase in a price range of (target price *0.95, target price  *1.05), supply will not change.'
                },
                {
                    title: 'Rebase Formula:',
                    txt: 'Positive rebase adjusts by price difference/5.\n' +
                        'E.g. if the price is $1.10 and the target price is $1.00, the rebase is +2%.\n' +
                        'Negative rebase adjusts by price difference/2.\n' +
                        'E.g. if the price is $0.90 and the target price is $1.00, the rebase is -5%.'
                },
                {
                    title: 'What makes FUN rebase different from other algorithm stable coin?',
                    txt: 'With the expansion of NFT market, the NFT Anchoring Index keeps going up, while FUN Money has enough space to the index to go up.'
                }
            ]
        }
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        moreClick() {
            this.load = true;
            setTimeout(() => {
                this.list = this.list.concat(this.list2);
                this.hideFlag = false;
                this.load = false
            }, 1000)

        }
    }
}
</script>

<style scoped lang="scss">
    ._main-faq {
        background-color: #ffffff;
        padding: 58px 48px;

        .load-img {
            width: 24px;
            height: 24px;
            display: block;
            margin: 0 auto;
        }

        h2 {
            font-size: 40px;
            line-height: 40px;
            color: #252525;
            padding-bottom: 48px;
            border-bottom: 1px solid #EF8969;
            font-family: PoppinsBold;
        }

        ._faq-list {
            padding: 58px 0;
            border-bottom: 1px solid #EF8969;
        }

        h3 {
            font-size: 40px;
            line-height: 47px;
            color: #28292B;
            margin-bottom: 30px;
            font-weight: bold;
        }

        p {
            font-size: 24px;
            line-height: 28px;
            color: #28292B;
            font-weight: 300;

            ::v-deep a {
                color: #EF8969;
            }
        }

        .el-collapse {
            border: 0;
        }

        ::v-deep .el-collapse-item {
            padding: 0 10px;
            transition: all .2s;

            &:hover {
                background-color: rgba(239, 137, 105, 0.1);
            }

            .el-collapse-item__header {
                height: 116px;
                font-size: 26px;
                color: #252525;
                font-weight: 400;
                background-color: transparent;
                border-bottom: 0;
            }

            .el-collapse-item__arrow {
                font-size: 20px;
                color: #EF8969;
                font-weight: bold;
            }

            .el-collapse-item__wrap {
                background-color: transparent;
                border-bottom: 0;
            }

            .txt {
                font-size: 16px;
                line-height: 34px;
                color: #28292B;
            }
        }

        ._faq-more {
            font-size: 18px;
            line-height: 21px;
            color: #EF8969;
            font-weight: 300;
            height: 82px;
            display: flex;
            align-items: center;
            padding: 0 10px;

            span {
                cursor: pointer;
            }

            img {
                margin-left: 6px;
            }
        }
    }

    @media (max-width: 768px) {
        ._main-faq {
            padding: 24px 18px;

            h2 {
                padding-right: 0;
                font-size: 24px;
                line-height: 36px;
                padding-bottom: 24px;
            }

            ::v-deep .el-collapse-item {
                padding: 0 5px;

                .el-collapse-item__header {
                    height: auto;
                    min-height: 56px;
                    font-size: 16px;
                    line-height: 20px;
                }

                .el-collapse-item__arrow {
                    font-size: 16px;
                }

                .txt {
                    font-size: 12px;
                    line-height: 18px;
                }
            }
        }
    }
</style>
