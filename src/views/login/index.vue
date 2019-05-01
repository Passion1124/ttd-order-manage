<template>
    <div class="login">
        <div class="account">
            <input type="text" v-model="account" placeholder="账号">
        </div>
        <div class="password">
            <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="login_btn">
            <button @click="handleLogin">登录</button>
        </div>
    </div>
</template>

<script>
    import md5 from 'js-md5'
    import fetch from '../../utils/fetch'
    import { mapGetters } from 'vuex'
    import {setUserInfo } from "../../utils/auth";

    export default {
        name: "index",
        data () {
            return {
                account: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters(['body'])
        },
        methods: {
            handleLogin () {
                let api = 'com.ttdtrip.api.merchant.apis.service.MerchantLoginApiService';
                let data = { base: this.body, account: this.account, password: md5(this.password), type: 'yd', opType: 2 };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    setUserInfo(JSON.stringify(r));
                    // this.$store.commit('updateBody', Object.assign(this.body, { myUid: r.merchantOPInfo.mid }));
                    this.$router.push('/');
                }, e => {
                    console.error(e);
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 340px;
        height: 240px;
        background-color: #fff;
        box-shadow:0 3px 8px 4px rgba(219,236,255,0.68);
        transform: translate(-50%, -50%);
        z-index: 9;
        .account, .password{
            width: 80%;
            height: 50px;
            margin: 20px auto;
            input {
                width: 100%;
                height: 50px;
                font-size: 19px;
                line-height: 50px;
                background-color: #FAFBFC;
                border-radius: 4px;
                padding-left: 24px;
                border: 0;
                box-sizing: border-box;
                color: #A3A1A4;
            }
        }
        .login_btn{
            text-align: center;
            button{
                width: 192px;
                height: 50px;
                color: #fff;
                font-size: 19px;
                background: linear-gradient(270deg,rgba(131,237,254,1) 0%,rgba(106,174,254,1) 100%);
                box-shadow: 0 2px 3px 0 rgba(119,209,254,0.65);
                border-radius: 25px;
                border: none;
            }
        }
    }

</style>
