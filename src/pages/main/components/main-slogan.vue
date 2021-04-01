<template>
<div class="_main-slogan">
    <h3>Nftfun Money</h3>
    <h5>
        <img src="~img/img-1.svg" alt="">
        <span>The first elastic supply token on the
        Binance Smart Chain.</span>
    </h5>
</div>
</template>

<script>
export default {
    name: 'main-slogan'
}
</script>

<style scoped lang="scss">
    ._main-slogan {
        text-align: center;
        padding: 100px 0;

        h3 {
            height: 115px;
            font-size: 64px;
            line-height: 75px;
            color: #28292B;
            font-weight: bold;
        }

        h5 {
            height: 90px;
            font-size: 24px;
            line-height: 28px;
            color: #28292B;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                display: inline-flex;
                width: 337px;
                height: 100%;
                align-items: center;
                margin-left: 25px;
            }
        }
    }
</style>
