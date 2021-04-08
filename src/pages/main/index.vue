<template>
    <div class="_main">
        <div class="_main-header">
            <div class="_container">
                <Logo/>
                <NavLink class="dis-nav" :navList="navList" />
                <Button class="dis-nav" :name="'BUY FUN'" :loading="loading" @click="buyClick"/>
                <img class="menu f-fr f-cursor" src="~img/menu.svg" alt="" @click="showNav()">
                <transition name="normal-expand">
                    <nav class="menu-nav f-pa" v-show="showMenu">
                        <p v-for="(item,index) in navList" :key="index" @click='jump(item)'>{{item.title}}</p>
                    </nav>
                </transition>

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
                loading: false,
                showMenu: false,
                navList: [
                    {
                        title: 'DASHBOARD',
                        path: '/dashboard',
                        isRouter: true
                    },
                    {
                        title: 'STAKING',
                        path: '/staking',
                        isRouter: true,
                    },
                    {
                        title: 'AUDIT',
                        path: '',
                        isRouter: false
                    },
                    {
                        title: 'CODE',
                        path: 'https://medium.com/@NFTFunProtocol',
                        isRouter: false
                    },
                    {
                        title: 'BLOG',
                        path: 'https://docs.nftfun.org/',
                        isRouter: false
                    }
                ]
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
            },

            jump(data){
                if(data.isRouter){
                    this.$router.push(data.path)
                }else data.path && window.open(data.path)
            },

            showNav() {
                this.showMenu = !this.showMenu
                var preD=function(e){e.preventDefault();};
                if (this.showMenu) {
                    document.body.style.overflow = 'hidden'
                    document.addEventListener('touchmove', preD, {passive: false}) // 禁止页面滑动
                } else {
                    document.body.style.overflow = '' // 出现滚动条
                    document.removeEventListener('touchmove', preD, {passive: false})
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    ._main-header {
        width: 100%;
        height: 100px;
        background-color: #F3CDC7;
        margin-bottom: -100px;

        ._container {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .menu {
                display: none;
                width: 30px;
            }

            .menu-nav {
                width: 100%;
                top: 60px;
                left: 0;
                background: #F3CDC7;
                overflow-y: hidden;

                p {
                    line-height: 50px;
                    color: #000000;
                    font-size: 14px;
                    text-indent: 20px;
                    cursor: pointer;

                    &:hover {
                        color: #F18878;
                        background: rgba(245, 193, 185, 0.8);
                    }
                }
            }
        }
    }

    ._main {
        width: 100%;
        height: 100%;
        background: #ffffff;

        & > ._content {
            min-height: 100%;
            padding-top: 100px;
            padding-bottom: 115px;
        }
    }

    ._footer {
        margin-top: -115px;
    }

    @media (max-width: 800px) {
        ._main-header {
            height: 60px;
            padding: 0 20px;

            .dis-nav {
                display: none;
            }

            .menu {
                display: block !important;
            }
        }

        ._main {
            &>._content {
                padding-bottom: 55px;
            }
        }

        ._footer {
            margin-top: -55px;
        }
    }
</style>
