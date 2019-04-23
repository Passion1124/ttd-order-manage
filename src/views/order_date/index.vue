<template>
    <div class="order_date_index">
        <div class="common_header">
            <div class="common_title">餐厅名称</div>
            <div class="icon_row">
                <div class="preview_icon">
                    <img src="@/assets/images/preview.png" alt="">
                </div>
                <div class="add_icon">
                    <img src="@/assets/images/add.png" alt="">
                </div>
                <div class="remind_icon">
                    <img src="@/assets/images/remind.png" alt="">
                </div>
            </div>
        </div>
        <div class="main_row">
            <div class="calendar_top">
                <div class="arrow_button">
                    <div class="left_btn">
                        <img src="@/assets/images/left_arrow.png" alt="">
                    </div>
                    <div class="right_btn">
                        <img src="@/assets/images/right_arrow.png" alt="">
                    </div>
                </div>
                <div class="calendar_text">{{ showFormatDate }}</div>
                <div class="calendar_switch">
                    <div class="calendar_btn">
                        <img src="@/assets/images/calendar.png" alt="">
                    </div>
                    <div class="today">今天</div>
                    <div class="switch_type">
                        <div class="month_type active">月</div>
                        <div class="day_type">日</div>
                    </div>
                </div>
            </div>
            <div class="calendar_main">
                <div class="type_is_day">
                    <div class="week_title">
                        <div>星期天</div>
                        <div>星期一</div>
                        <div>星期二</div>
                        <div>星期三</div>
                        <div>星期四</div>
                        <div>星期五</div>
                        <div>星期六</div>
                    </div>
                    <div class="date_list">
                        <template v-if="currentWeek">
                            <div v-for="(item, index) in currentWeek" :key="'0' + index"></div>
                        </template>
                        <div v-for="(item, index) in days" :key="index" :class="{isCurrent: item.day.getMonth() + 1 === currentMonth}">
                            <template v-if="item.day.getMonth() + 1 === currentMonth">
                                <div class="date">{{item.day.getDate() >= 10 ? item.day.getDate() : '0' + item.day.getDate()}}</div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="type_is_month"></div>
            </div>
            <div class="calendar_bottom">
                <div class="left_tips">
                    <div>
                        <div>未处理：</div>
                        <div>今日应到店：</div>
                    </div>
                    <div>
                        <div>今日新订：</div>
                        <div>今日实到店：</div>
                    </div>
                </div>
                <div class="right_tips">
                    <div class="eat">
                        <div class="tips_bg"></div>
                        <div class="tips_text">已就餐</div>
                    </div>
                    <div class="order">
                        <div class="tips_bg"></div>
                        <div class="tips_text">已预约</div>
                    </div>
                    <div class="handle">
                        <div class="tips_bg"></div>
                        <div class="tips_text">待处理</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "order_date_index",
        data () {
            return {
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                currentWeek: 1,
                days: [],
                showFormatDate: ''
            }
        },
        created () {
            this.initData('2019-03-22');
            console.log(this.days);
        },
        methods: {
            initData (cur) {
                let count = 0; // 存放剩余数量
                let date;
                if (cur) {
                    date = new Date(cur);
                    this.showFormatDate = this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
                } else {
                    let now = new Date();
                    this.showFormatDate = this.formatDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
                    let d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
                    d.setDate(35);
                    date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
                }
                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth() + 1;
                this.currentWeek = date.getDay();
                let str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
                for (let i = this.currentWeek - 1; i >= 0; i--) {
                    let d = new Date(str);
                    d.setDate(d.getDate() - i);
                    let dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                    dayobject.day = d;
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                }
                //其他周
                for (let i = 1; i <= 35 - this.currentWeek; i++) {
                    let d = new Date(str);
                    d.setDate(d.getDate() + i);
                    let dayobject = {};
                    dayobject.day = d;
                    this.days.push(dayobject);
                }
            },
            pickPre (year, month) {

                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                let d = new Date(this.formatDate(year , month , 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            },
            pickNext (year, month) {
                let d = new Date(this.formatDate(year , month , 1));
                d.setDate(35);
                this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            },
            pickYear (year, month) {
                alert(year + "," + month);
            },
            // 返回 类似 2016-01-02 格式的字符串
            formatDate (year, month, day) {
                let y = year;
                let m = month;
                if (m<10) m = "0" + m;
                let d = day;
                if (d<10) d = "0" + d;
                return y+"-"+m+"-"+d
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .order_date_index{
        .main_row{
            width: 100%;
            padding: 0 37px;
            box-sizing: border-box;
            .calendar_top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                margin: 15px 0;
                .arrow_button{
                    display: flex;
                    align-items: center;
                    &>div{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 38px;
                        height: 38px;
                        background-color: #3B53FF;
                        border-radius: 4px;
                        &:first-of-type{
                            margin-right: 7px;
                        }
                        img{
                            width: 10px;
                            height: 17px;
                        }
                    }
                }
                .calendar_text{
                    flex: 1;
                    font-size: 26px;
                    line-height: 37px;
                    color: #3B53FF;
                    text-align: center;
                    padding-left: 156px;
                    box-sizing: border-box;
                }
                .calendar_switch{
                    display: flex;
                    align-items: center;
                    .calendar_btn{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 39px;
                        background-color: #3B53FF;
                        border-radius: 4px;
                        margin-right: 14px;
                        img{
                            width: 25px;
                            height: 24px;
                        }
                    }
                    .today{
                        width: 54px;
                        height: 39px;
                        line-height: 39px;
                        font-size: 18px;
                        background-color: #3B53FF;
                        border-radius: 4px;
                        color: #fff;
                        margin-right: 14px;
                        text-align: center;
                    }
                    .switch_type{
                        display: flex;
                        align-items: center;
                        width: 118px;
                        height: 39px;
                        background-color: #3B53FF;
                        border-radius: 4px;
                        padding: 3px;
                        box-sizing: border-box;
                        &>div{
                            flex: 1;
                            text-align: center;
                            color: #fff;
                            line-height: 33px;
                            &.active{
                                background-color: #fff;
                                color: #3B53FF;
                                border-radius: 4px;
                            }
                        }
                    }
                }
            }
            .calendar_main{
                width: 950px;
                height: 530px;
                background-color: #fff;
                box-shadow: 0 1px 7px 2px rgba(238,240,255,1);
                overflow: hidden;
                .type_is_day{
                    > div:not(:last-of-type) {
                        border-bottom: 1px solid #E2F0FF;
                    }
                    .week_title{
                        width: 100%;
                        height: 54px;
                        display: flex;
                        align-items: center;
                        div {
                            flex: 1;
                            font-size: 16px;
                            line-height: 23px;
                            color: #4A4A4A;
                            text-align: center;
                            padding-top: 19px;
                            box-sizing: border-box;
                        }
                    }
                    .date_list{
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        >div{
                            width: 14.2857%;
                            height: 95px;
                            box-sizing: border-box;
                            background-color: #E4EFFC;
                            &.isCurrent{
                                border-right: 1px solid #E2F0FF; /* px */
                                border-bottom: 1px solid #E2F0FF; /* px */
                                background-color: #fff;
                            }
                            &:nth-of-type(7n){
                                border-right: 0;
                            }
                            .date{
                                width: 25px;
                                height: 25px;
                                font-size: 16px;
                                line-height: 25px;
                                border-radius: 50%;
                                color: #9B9B9B;
                                margin: 4px 0 0 7px;
                            }
                        }
                    }
                }
            }
            .calendar_bottom{
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-top: 20px;
                .left_tips{
                    >div{
                        display: flex;
                        align-items: center;
                        &:first-of-type{
                            margin-bottom: 12px;
                        }
                        >div{
                            width: 200px;
                            font-size: 16px;
                            line-height: 23px;
                            color: #3B53FF;
                            & + div {
                                margin-left: 8px;
                            }
                        }
                    }
                }
                .right_tips{
                    display: flex;
                    align-items: center;
                    &>div{
                        display: flex;
                        align-items: center;
                        &+div{
                            margin-left: 30px;
                        }
                        .tips_bg{
                            width: 15px;
                            height: 15px;
                            background-color: #B7D9FF;
                            border-radius: 4px;
                        }
                        &:nth-of-type(1) .tips_bg{
                            background-color: #B7D9FF;
                        }
                        &:nth-of-type(2) .tips_bg{
                            background-color: #9DEDFF;
                        }
                        &:nth-of-type(3) .tips_bg{
                            background-color: #F5A623;
                        }
                        .tips_text{
                            font-size: 16px;
                            line-height: 23px;
                            color: #3B53FF;
                            margin-left: 8px;
                        }
                    }
                }
            }
        }
    }
</style>
