<template>
    <div class="login">
        <div class="account">
            <input type="text" v-model="account">
        </div>
        <div class="password">
            <input type="password" v-model="password">
        </div>
        <button @click="handleLogin">登录</button>
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

<style scoped>

</style>
