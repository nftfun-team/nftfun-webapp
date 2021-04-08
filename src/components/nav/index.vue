<template>
    <div class="_nav">
        <el-menu
                :default-active="activeIndex"
                class="_nav-menu"
                mode="horizontal"
                router>
            <template v-for="(el, index) in navList">
                <el-menu-item v-if='el.isRouter' :key="index" :index="el.path" >
                    <span slot="title">{{ el.title }}</span>
                </el-menu-item>
                <el-menu-item v-else @click="routerClick(el)">{{ el.title }}</el-menu-item>

            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'nav-link',
        props: {
            navList:{
                type: Array,
                default: () => []
            }
        },
        methods: {
            routerClick(data){
                data.path && window.open(data.path)
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
