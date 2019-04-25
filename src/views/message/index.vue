<template>
    <div class="message_index">
        <div class="common_header">
            <div class="common_title">消息</div>
            <div class="back_arrow" @click="back">
                <img src="@/assets/images/back_arrow.png" alt="">
            </div>
        </div>
        <div class="message_row">
            <div class="message">
                <div class="msg_title">顾客yema来了新的预定单</div>
                <div class="msg_date">2019-04-09 13:00</div>
            </div>
            <div class="message">
                <div class="msg_title">顾客yema来了新的预定单</div>
                <div class="msg_date">2019-04-09 13:00</div>
            </div>
            <div class="message">
                <div class="msg_title">顾客yema来了新的预定单</div>
                <div class="msg_date">2019-04-09 13:00</div>
            </div>
            <div class="message">
                <div class="msg_title">顾客yema来了新的预定单</div>
                <div class="msg_date">2019-04-09 13:00</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "message_index",
        data () {
            return {}
        },
        methods: {
            back () {
                this.$router.go(-1);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .message_index {
        .message_row{
            .message{
                width: 100%;
                height: 82px;
                padding: 17px 0 0 36px;
                box-sizing: border-box;
                /*border-bottom: 6px solid #F2F4FD;*/
                background: rgba(255,255,255,1);
                margin-bottom: 6px;
                box-shadow:0 1px 7px 2px rgba(238,240,255,1);
                border-radius:1px;
                &:last-of-type{
                    margin-bottom: 0;
                }
                .msg_title{
                    font-size: 19px;
                    line-height: 27px;
                    color: #4a4a4a;
                }
                .msg_date{
                    font-size: 16px;
                    line-height: 23px;
                    color: #9B9B9B;
                }
            }
        }
    }
</style>
