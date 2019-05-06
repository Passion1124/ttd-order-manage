<template>
    <div class="login_index">
        <div class="white_bg"></div>
        <div class="login">
            <div class="login_icon">
                <img src="@/assets/images/login_icon.png" alt="">
            </div>
            <div class="account">
                <input type="text" v-model="account" :placeholder="$t('login.account')">
            </div>
            <div class="password">
                <input type="password" v-model="password" :placeholder="$t('login.password')">
            </div>
            <div class="login_btn">
                <button @click="handleLogin">{{ $t('login.log') }}</button>
            </div>
            <div class="login_tips">{{ $t('login.tips') }}：ttd-vip@ttd-trip.com</div>
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
    .login_index{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #3B53FF;
        overflow: hidden;
        z-index: 12;
        .white_bg{
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 100%;
            height: 60%;
            background-color: #fff;
            border-radius: 50% 50% 0 0/100% 100% 0 0;
            transform: translateX(-50%) scaleX(1.35);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 6;
        }
        .login {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 300px;
            height: 250px;
            background-color: #fff;
            box-shadow:0 0 5px 0 rgba(59,83,255,0.13);
            border-radius: 5px;
            transform: translate(-50%, -50%);
            z-index: 9;
            .login_icon{
                width: 41px;
                height: 29px;
                margin: 30px auto 21px;
                img {
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                }
            }
            .account, .password{
                width: 66%;
                height: 30px;
                margin: 10px auto;
                input {
                    width: 100%;
                    height: 30px;
                    font-size: 10px;
                    line-height: 30px;
                    background-color: #FAFBFC;
                    border-radius: 4px;
                    padding-left: 12px;
                    border: 0;
                    box-sizing: border-box;
                    color: #A3A1A4;
                }
            }
            .login_btn{
                text-align: center;
                button{
                    width: 96px;
                    height: 25px;
                    line-height: 25px;
                    color: #fff;
                    font-size: 10px;
                    background: linear-gradient(270deg,rgba(131,237,254,1) 0%,rgba(106,174,254,1) 100%);
                    box-shadow: 0 2px 3px 0 rgba(119,209,254,0.65);
                    border-radius: 25px;
                    border: none;
                    cursor: pointer;
                }
            }
            .login_tips{
                font-size: 10px;
                line-height: 12px;
                color: #9B9B9B;
                text-align: center;
                margin-top: 16px;
            }
        }
    }

</style>
