<template>
<div class="_main">
    <div class="_main-header">
        <div class="_container">
            <Logo/>
            <NavLink/>
            <Button :name="'BUY NFTFUN'" :loading="loading" @click="buyClick"/>
        </div>
    </div>

    <div class="_content">
        <MainSlogan/>
        <MainIncludes/>
        <MainToken/>
        <MainFaq/>
    </div>
    <Footer/>
</div>
</template>

<script>
import NavLink from '@/components/nav/index.vue';
import Logo from '@/components/logo/index.vue';
import Button from '@/components/button/index.vue';
import Footer from '@/components/footer/index.vue';
import MainSlogan from './components/main-slogan.vue';
import MainFaq from './components/main-faq';
import MainIncludes from './components/main-includes';
import MainToken from './components/main-token';
import WebSdk from '../../utils/sdk'

export default {
    name: 'index',
    components: {NavLink, Logo, Button, MainSlogan, MainFaq, Footer, MainIncludes, MainToken},
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
    ._main-header {
        width: 100%;
        height: 160px;
        background-color: #F3CDC7;
        margin-bottom: -160px;

        ._container {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    ._main {
        width: 100%;
        height: 100%;
        background: #ffffff;

        & > ._content {
            min-height: 100%;
            padding-top: 160px;
            padding-bottom: 115px;
        }
    }

    ._footer {
        margin-top: -115px;
    }
</style>
