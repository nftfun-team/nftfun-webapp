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
    </div>
</div>
</template>

<script>
import NavLink from '@/components/nav/index.vue';
import Logo from '@/components/logo/index.vue';
import Button from '@/components/button/index.vue';
import MainSlogan from './components/main-slogan.vue';

export default {
    name: 'index',
    components: {NavLink, Logo, Button, MainSlogan}
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
