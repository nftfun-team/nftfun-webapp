<template>
    <div class="_nav">
        <el-menu
                :default-active="activeIndex"
                class="_nav-menu"
                mode="horizontal"
                router>
            <template v-for="(el, index) in navList">
                <el-menu-item v-if='el.isRouter' :key="index" :index="el.path" >
                    <span slot="title" v-if="!el.animation">{{ el.title }}</span>
                    <div slot="title" class="_nav-animation" v-else>
                        <p class="s1">D</p>
                        <p class="s2">a</p>
                        <p class="s3">s</p>
                        <p class="s4">h</p>
                        <p class="s5">b</p>
                        <p class="s6">o</p>
                        <p class="s7">a</p>
                        <p class="s8">r</p>
                        <p class="s8">d</p>
                    </div>
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

        &-animation{
            height: 40px;
            p {
                float: left;
                font-size: 14px;
                padding-right: 2px;
                animation-name: myani;
                animation-duration: 1.25s;
                animation-iteration-count: infinite;
                animation-timing-function: ease;
                animation-direction: alternate;
                animation-fill-mode: both;
            }
            .s1 {
                animation-delay: 0.2s;
            }
            .s2 {
                animation-delay: 0.4s;
            }
            .s3 {
                animation-delay: 0.6s;
            }
            .s4 {
                animation-delay: 0.8s;
            }
            .s5 {
                animation-delay: 1s;
            }
            .s6 {
                animation-delay: 1.2s;
            }
            .s7 {
                animation-delay: 1.4s;
            }
            .s8 {
                animation-delay: 1.6s;
            }
        }

        @keyframes myani {
            0%, 100% {
                padding-bottom: 0;
            }
            50% {
                transform: translateY(-10px);
            }
        }
    }

</style>
