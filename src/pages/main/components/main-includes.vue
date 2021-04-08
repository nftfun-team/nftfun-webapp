<template>
<div class="_includes">
    <div class="_container">
        <h3>FUN Protocol has three phases.</h3>
        <div class="_flex">
            <div class="_card" v-for="el of list">
                <div>
                    <img :src="el.imgUrl" alt="">
                </div>
                <h5>{{el.title}}</h5>
                <p class="f-khc-family">{{el.txt}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'main-includes',
    data() {
        return {
            list: [
                {
                    imgUrl: require('../../../assets/images/money.svg'),
                    title: 'FUN Money',
                    txt: 'FUN Money (FUN) is the first step to build FUN Protocol. Based on Binance Smart Chain (BSC), FUN is a kind of synthetic asset pegged to the total NFT market cap.'
                },
                {
                    imgUrl: require('../../../assets/images/nft.svg'),
                    title: 'FUN NFT',
                    txt: 'FUN Protocol will increase the use scenarios of FUN Money in the NFT field, and the NFT Blind Boxes, NFT Mining and Trading are on the way.'
                },
                {
                    imgUrl: require('../../../assets/images/dao.svg'),
                    title: 'FUN DAO',
                    txt: 'The decentralized governance idea of DAO has brought great changes to community infrastructure and enable the domination over the FUN world.'
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
    ._includes {
        background-color: #ffffff;
        padding: 58px 48px 38px;

        h3 {
            font-size: 40px;
            line-height: 50px;
            color: #28292B;
            margin-bottom: 58px;
            font-family: PoppinsBold;
        }

        ._flex {
            justify-content: space-between;
        }

        ._card {
            width: 360px;
            min-height: 356px;
            background: #F6F6F6;
            border: 1px solid rgba(239, 239, 239, 0.5);
            box-sizing: border-box;
            box-shadow: -2px 5px 6px #EFEEF1;
            border-radius: 8px;
            padding: 28px;
            cursor: pointer;
            transition: all .2s;
            margin-bottom: 20px;

            &:hover {
                margin-top: -10px;
            }

            & > div {
                width: 100%;
                height: 107px;
                line-height: 107px;
                margin-bottom: 18px;

                img {
                    max-height: 100%;
                }
            }

            h5 {
                font-size: 25px;
                line-height: 37px;
                color: #000000;
                font-family: PoppinsBold;
                margin-bottom: 10px;
            }

            p {
                font-size: 15px;
                line-height: 28px;
                color: #686666;
                font-weight: bold;
            }
        }
    }

    @media (min-width: 769px) and (max-width: 1025px){
        ._includes {
            ._flex {
                justify-content: center;
            }

            ._card {
                margin: 20px;
            }
        }
    }

    @media (max-width: 768px) {
        ._includes {
            padding: 24px 18px;
            h3 {
                padding-right: 0;
                font-size: 24px;
                line-height: 30px;
                margin-bottom: 24px;
            }
            ._card {
                margin-bottom: 24px;
                width: 100%;
                text-align: center;
                &:nth-last-of-type(1) {
                    margin-bottom: 0;
                }
            }
            ._flex {
                display: block;
            }
        }
    }
</style>
