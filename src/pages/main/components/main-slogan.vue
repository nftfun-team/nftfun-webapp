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
</style>
