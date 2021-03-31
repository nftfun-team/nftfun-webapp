<template>
    <div class="login f-common-color f-pf">
        <div class="login-cont f-center-x">
            <div class="login-cont-top f-tac">
                <h3 id="names">BurgerSwap Manage</h3>
            </div>

            <div class="login-cont-main f-center-x">
                <button class="login-cont-main-btn f-tac f-btn-primary" @click="login">点击授权登录</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import WebChina from 'utils/sdk'

    @Component
    export default class Login extends Vue {
        mounted(){
            this.listenerKey()
        }

        /**
         * Listener KeyDown Event
         */
        public listenerKey(){
            document.onkeydown = (event) => {
                var e: any = event || window.event;
                if (e.keyCode == 13) {
                    this.login()
                }
            };
        }

        /**
         * Login Action
         */
        public login() {
            WebChina.connect().then((res:any) => {
                if(res.isConnect) this.$router.push({ path: '/pool-ifo'})
                else this.$message.error("登录失败")
            })
        }
    }
</script>

<style lang="scss" scoped>
    .login{
        width: 100%;
        height: 100%;
        background: #f0f2f5;
        background-size: 100%;
        top: 0;
        right: 0;
        &-cont{
            width: 400px;
            min-height: 100%;
            padding: 250px 0 144px;
            position: relative;
            &-top{
                font-size: 30px;
                margin-bottom: 30px;
            }
            &-main{
                width: 400px;
                &-btn{
                    margin-top: 25px;
                    font-size: 16px;
                    height: 50px;
                    width: 100%;
                }
            }
        }
        &-foot{
            position: absolute;
            width: 100%;
            bottom: 0px;
            padding: 0 16px;
            margin: 48px 0 24px;
            text-align: center;
        }
    }
</style>
