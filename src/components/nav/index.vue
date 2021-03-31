<template>
<div class="_nav">
    <el-menu
        :default-active="activeIndex"
        class="_nav-menu"
        mode="horizontal"
        router>
        <template v-for="(el, index) in navList">
        <el-menu-item :index="el.path">{{el.title}}</el-menu-item>
        </template>
    </el-menu>
</div>
</template>

<script>
export default {
    name: 'nav-link',
    data() {
        return {
            navList: [
                {
                    title: 'DASHBOARD',
                    path: '/dashboard',
                    isRouter: true
                },
                {
                    title: 'STAKING',
                    path: '/staking',
                    isRouter: true
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
    ._nav {
        height: 100%;
        display: inline-flex;
        align-items: center;

        ._nav-menu {
            border: 0;
            background: transparent;

            .el-menu-item {
                padding: 0;
                border: 0;
                font-size: 14px;
                font-weight: bold;
                color: #000000;
                margin-right: 50px;

                &:nth-last-of-type(1) {
                    margin-right: 0;
                }

                &:hover, &:focus {
                    background: transparent;
                }
            }
        }
    }
</style>
