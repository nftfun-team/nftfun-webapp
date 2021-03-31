<template>
<div>
    <header>
        <div class="_container">
            <Logo/>
            <NavLink/>
            <Button :name="'BUY NFTFUN'"/>
        </div>
    </header>

    <div class="_container">
        <MainSlogan/>
        <MainDescribe :title="title1" :subTitle="subTitle1"/>
    </div>
</div>
</template>

<script>
import NavLink from '@/components/nav/index.vue';
import Logo from '@/components/logo/index.vue';
import Button from '@/components/button/index.vue';
import MainSlogan from './components/main-slogan.vue';
import MainDescribe from './components/main-describe.vue';

export default {
    name: 'index',
    components: {NavLink, Logo, Button, MainSlogan, MainDescribe},
    data() {
        return {
            title1: 'Elastic supply',
            subTitle1: 'Our supply is like ditto. It has the ability to rearrange its entire cell structure according to the current price.'
        }
    }
}
</script>

<style scoped lang="scss">
    header {
        width: 100%;
        height: 160px;
        background-color: #F3CDC7;

        ._container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    ._container {
        width: 1133px;
        height: 100%;
        margin: 0 auto;
    }
</style>
