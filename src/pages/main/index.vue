<template>

<div class="_main">
    <div class="_main-header">
        <div class="_container">
            <Logo/>
            <NavLink/>
            <Button :name="'BUY NFTFUN'"/>
        </div>
    </div>
    <div class="_container">
        <MainSlogan/>
        <MainDescribe :title="title1" :subTitle="subTitle1"/>
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
import MainDescribe from './components/main-describe.vue';

export default {
    name: 'index',
    components: {NavLink, Logo, Button, MainSlogan, MainDescribe, Footer},
    data() {
        return {
            title1: 'Elastic supply',
            subTitle1: 'Our supply is like ditto. It has the ability to rearrange its entire cell structure according to the current price.'
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

        & > ._container {
            min-height: 100%;
            padding-top: 160px;
            padding-bottom: 115px;
        }
    }

    ._footer {
        margin-top: -115px;
    }
</style>
