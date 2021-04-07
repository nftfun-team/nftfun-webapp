<template>
<div class="_main-faq">
    <div class="_container">
        <h2>FAQ</h2>
        <div class="_faq-list" v-for="el of list">
            <h3>{{el.title}}</h3>
            <p v-html="el.txt"></p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'main-describe',
    data() {
        return {
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
                    txt: 'FUN tokens will be available for public sale through an initial offering on our partner\'s platform. For more information please check our official <a href="" target="_blank">telegram</a> or <a href="" target="_blank">Twitter</a>.'
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
    ._main-faq {

        background-color: #ffffff;
        padding-top: 58px;

        h2 {
            font-size: 40px;
            line-height: 40px;
            color: #28292B;
            font-weight: bold;
            padding-bottom: 58px;
            padding-right: 570px;
            border-bottom: 1px solid #EF8969;
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
    }
</style>
