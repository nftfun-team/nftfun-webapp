<template>
<div class="_main-slogan">
    <div class="_container">
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
        height: 580px;
        width: 100%;
        background-image: url("~img/banner.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;

        ._container {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
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
