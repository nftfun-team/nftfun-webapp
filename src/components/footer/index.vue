<template>
<div class="_footer">
    <a href="https://twitter.com/NFTFunProtocol" target="_blank">
        <img src="~img/twitter.svg" alt="">
    </a>
    <a href="https://t.me/NftFunProtocol" target="_blank">
        <img src="~img/telegram.svg" alt="">
    </a>
    <a href="https://medium.com/@NFTFunProtocol" target="_blank">
        <img src="~img/medium.svg" alt="">
    </a>
    <a href="https://github.com/nftfun/nftfun-protocol" target="_blank">
        <img src="~img/github.svg" alt="">
    </a>
</div>
</template>

<script>
export default {
    name: 'index'
}
</script>

<style scoped lang="scss">
    ._footer {
        height: 115px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F3CDC7;
        a {
            margin: 0 15px;
        }
    }
    @media (max-width: 800px) {
        ._footer {
            height: 55px;
            a {
                display: inline-flex;
                align-items: center;
            }
            img {
                width: 28px;
            }
        }
    }
</style>
