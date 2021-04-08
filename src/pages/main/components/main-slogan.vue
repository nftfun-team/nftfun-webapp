<template>
<div class="_main-slogan">
    <div class="_container">
        <div class="_lf">
            <img src="~img/banner-2.png" alt="">
        </div>
        <div class="_rt">
            <h3>FUN Protocol</h3>
            <h5>
                DeFi&Gamefi&DAO Protocol prospering with NFT Market
            </h5>
            <h6><img src="~img/img-1.svg" alt=""></h6>
        </div>
        <Button :name="'BUY NFTFUN'" :loading="loading" @click="buyClick" class="btn"/>
    </div>
</div>
</template>

<script>
import Button from '@/components/button/index.vue';
import WebSdk from '../../../utils/sdk';

export default {
    name: 'main-slogan',
    components: {Button},
    data() {
        return {
            loading: false
        }
    },
    methods: {
        buyClick() {
            this.loading = true;
            WebSdk.connect().then(() => {
                const url = this.$ChainApi.getSwapTradeUrl(this.$ChainApi.getTokenAddress('USDT'), this.$ChainApi.getTokenAddress('FUN'));
                this.loading = false;
                window.open(url)
            })
        }
    }
}
</script>

<style scoped lang="scss">
    ._main-slogan {
        height: 580px;
        width: 100%;
        background-image: url("~img/banner-1.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;

        ._container {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .btn {
            display: none;
        }

        ._lf {
            width: 518px;

            img {
                max-width: 100%;
            }
        }

        ._rt {
            width: 450px;
        }

        h3 {
            font-size: 64px;
            line-height: 75px;
            color: #28292B;
            font-family: PoppinsBold;
            margin-bottom: 30px;
        }

        h5 {
            font-size: 24px;
            line-height: 45px;
            color: #252525;
            margin-bottom: 30px;
            font-family: KhContent;
            font-weight: 400;
        }

        h6 {
            /*text-align: center;*/
        }
    }

    @media (max-width: 768px) {
        ._main-slogan {
            height: auto;

            ._container {
                justify-content: center;
                flex-wrap: wrap;
                padding: 17px 0;
            }

            ._lf, ._rt {
                width: 100%;
            }

            ._lf {
                text-align: center;

                img {
                    height: 284px;
                }
            }

            ._rt {
                padding: 12px 34px;
                text-align: center;
            }

            h3 {
                font-size: 36px;
                line-height: 36px;
                margin-bottom: 12px;
            }

            h5 {
                font-size: 18px;
                line-height: 34px;
                margin-bottom: 4px;
            }

            h6 {
                text-align: center;

                img {
                    width: 24px;
                }
            }
        }
    }
</style>
