<template>
<div class="_main-slogan f-pr">
    <img src="~img/banner.png" alt="">
    <div class="_container f-center-x f-pa">
        <div class="_rt">
            <h3>FUN Protocol</h3>
            <h5>
                DeFi&Gamefi&DAO Protocol prospering with NFT Market
            </h5>
            <h6><img src="~img/img-1.svg" alt=""></h6>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'main-slogan'
}
</script>

<style scoped lang="scss">
    ._main-slogan {
        width: 100%;
        & > img{
            width: 100%;
        }

        ._container {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            top: 0;
        }

        ._rt {
            width: 400px;
        }

        h3 {
            font-size: 64px;
            line-height: 75px;
            color: #28292B;
            font-weight: bold;
            margin-bottom: 30px;
        }

        h5 {
            font-size: 24px;
            line-height: 28px;
            color: #28292B;
            font-weight: bold;
            margin-bottom: 30px;
        }

        h6 {
            text-align: center;
        }
    }
</style>
