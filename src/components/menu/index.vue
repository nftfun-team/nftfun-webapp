<template>
    <div class="body-main">
        <header>BurgerSwap Manage
            <span class="f-fr">钱包地址：{{walletAddress}}</span>
        </header>
        <div class="body-main-content">
            <el-menu :default-active="active"
                     active-text-color="#FFD04B"
                     text-color="#fff"
                     background-color="#5C6CF6"
                     router class="el-menu-vertical-demo"
                     :collapse="isCollapse">

                <el-submenu
                        v-if="item.children"
                        v-for="(item,index) in meunList"
                        :key="index"
                        :index="index + ''"
                >

                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span> {{item.name}}</span>
                    </template>


                    <el-menu-item v-for="(child, ind) in item.children" :key="ind" :index="child.path">
                        <span slot="title">{{ child.name }}</span>
                    </el-menu-item>
                </el-submenu>

                <el-menu-item v-else :index="item.path">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </el-menu>

            <section>
                <router-view/>
            </section>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { G_GET_WALLETADDRESS } from 'store/modules/chainSdk/types'
import WebChina from "utils/sdk";
import ChinaApi from "@/assets/sdk/ChainApi";
import {Storage} from "utils/storage";
export default {
    data() {
        return {
            isCollapse: false,
            active: this.$route.path,
            meunList: [
                // {name: '文案管理', path: '/pool-font', icon: 'el-icon-coin'},
                // {name: 'LaunchPad', path: '/pool-contract', icon: 'el-icon-tickets'},
                {name: 'LaunchPool', path: '/pool-ifo', icon: 'el-icon-s-data'},
                {name: 'pairWeight', path: '/pair-weight', icon: 'el-icon-s-opportunity'},
            ]
        };
    },
    watch: {
        $route(to, from) {
            this.active = to.path;
        },
    },
    created() {
        this.regularPerssion();
    },
    methods: {
        regularPerssion(){
            WebChina.connect().then( _ => {
                if(!ChinaApi.isAdmin()) {
                    this.$load.tipErrorShow('你没有权限查看');
                    this.$router.push({path: '/login'})
                }
            })
        }
    },
    computed:  mapGetters({
        'walletAddress': G_GET_WALLETADDRESS,
    })
}
</script>

<style lang="scss" scoped>
.body-main{
    width: 100%;
    header{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        text-indent: 30px;
        font-weight: 800;
        font-size: 16px;
        padding-right: 30px;
    }
    &-content{
        display: flex;
        flex-direction:row;
        width: 100%;
    }
    section{
        width: calc(100% - 200px);
        padding-bottom: 100px;
        box-sizing: border-box;
    }
}
.el-menu-vertical-demo{
    &:not(.el-menu--collapse) {
        width: 200px;
        min-height: calc(100vh - 50px);
    }
}
</style>
