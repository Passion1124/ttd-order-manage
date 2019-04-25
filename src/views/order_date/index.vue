<template>
    <div class="order_date_index">
        <div class="common_header">
            <div class="common_title">餐厅名称</div>
            <div class="icon_row">
                <div class="preview_icon">
                    <img src="@/assets/images/preview.png" alt="">
                </div>
                <div class="add_icon" @click="handleGoToTheAddOrderPage">
                    <img src="@/assets/images/add.png" alt="">
                </div>
                <div class="remind_icon" @click="handleGoToTheMessagePage">
                    <img src="@/assets/images/remind.png" alt="">
                </div>
            </div>
        </div>
        <div class="main_row">
            <div class="calendar_top">
                <div class="arrow_button">
                    <div class="left_btn" @click="handleShowLastMonth">
                        <img src="@/assets/images/left_arrow.png" alt="">
                    </div>
                    <div class="right_btn" @click="handleShowNextMonth">
                        <img src="@/assets/images/right_arrow.png" alt="">
                    </div>
                </div>
                <div class="calendar_text">{{ currentYear }}年{{ currentMonth }}月{{ currentDay }}日</div>
                <div class="calendar_switch">
                    <div class="calendar_btn">
                        <img src="@/assets/images/calendar.png" alt="">
                    </div>
                    <div class="today" @click="handleUpdateDateIsNow">今天</div>
                    <div class="switch_type">
                        <div class="month_type" :class="{ active: switch_type === 'month' }" @click="handleUpdateSwitchType('month')">月</div>
                        <div class="day_type" :class="{ active: switch_type === 'day' }" @click="handleUpdateSwitchType('day')">日</div>
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
                        <div v-for="(item, index) in days" :key="index" :class="{isCurrent: item.isNowMonth }">
                            <template v-if="item.isNowMonth">
                                <div class="date" :class="{ now: item.num === currentDay }">{{item.num >= 10 ? item.num : '0' + item.num }}</div>
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
                days: [],
                showFormatDate: '',
                switch_type: 'month'
            }
        },
        computed: {},
        created () {
            this.init();
        },
        methods: {
            init () {
                this.changeYearMonthDay('now');
            },
            handleUpdateSwitchType (type) {
                if (this.switch_type !== type) this.switch_type = type
            },
            changeYearMonthDay (type) {
                if (type === 'now') {
                    let now = new Date();
                    this.currentYear = now.getFullYear();
                    this.currentMonth = now.getMonth() + 1;
                    this.currentDay = now.getDate();
                } else {
                    if (type === 'last') {
                        this.currentMonth -= 1;
                        if (this.currentMonth <= 0) {
                            this.currentMonth = 12;
                            this.currentYear -= 1;
                        }
                    } else if (type === 'next') {
                        this.currentMonth += 1;
                        if (this.currentMonth > 12) {
                            this.currentMonth = 1;
                            this.currentYear += 1;
                        }
                    }
                }
                this.createCalendar(this.currentYear, this.currentMonth, this.currentDay);
            },
            handleUpdateDateIsNow () {
                this.changeYearMonthDay('now');
            },
            handleShowLastMonth () {
                this.changeYearMonthDay('last');
            },
            handleShowNextMonth () {
                this.changeYearMonthDay('next');
            },
            handleGoToTheAddOrderPage () {
                this.$router.push({
                    name: 'add_order'
                })
            },
            handleGoToTheMessagePage () {
                this.$router.push({
                    name: 'message'
                })
            },
            // 是否为闰年
            is_leap(year) {
                return ( year % 100 === 0 ?(year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0));
            },
            // 创建一个月的日历
            createCalendar(year, month, day){
                this.days = [];
                let nstr1 = new Date(year, month-1, 1);  //当月第一天
                let firstDay = nstr1.getDay();   //当月第一天是星期几
                let m_days = [31,28+this.is_leap(year),31,30,31,30,31,31,30,31,30,31]; //各月份的总天数
                let lastMonth = '';  //上个月
                let lastWeek = '';   //上个月的最后一天的星期数
                let lastDays = '';
                if(month === 1){
                    lastMonth = 11;
                    lastWeek = new Date(year-1,lastMonth,m_days[lastMonth]).getDay();
                    lastDays = m_days[lastMonth]-lastWeek
                }else{
                    lastMonth = month-1;
                    lastWeek = new Date(year,lastMonth-1,m_days[lastMonth-1]).getDay();
                    lastDays = m_days[lastMonth-1]-lastWeek
                }
                let s = 1;
                let id = 1;
                for(let i = 0; i < 6; i++){
                    for(let j = 0; j < 7; j++){
                        let idx = i * 7 + j; //单元格自然序列号
                        let date_str = idx - firstDay + 1; //计算日期
                        //前一个月的最后几天
                        if(date_str <= 0){
                            //月份在1到12之间
                            if(month > 1 && month <= 12){
                                this.days.push({id:id++,num:lastDays++,isNowMonth:false,month:'last',checked:false})
                                //月份为1
                            }else if(month === 1){
                                this.days.push({id:id++,num:lastDays++,isNowMonth:false,month:'last',checked:false})
                            }
                            //下一个月的开始几天
                        }else if(date_str > m_days[lastMonth]){
                            //月份在1到12之间
                            if(month < 12 && month >= 1){
                                this.days.push({id:id++,num:s++,isNowMonth:false,month:'next',checked:false})
                                //月份为12
                            }else if(month === 12){
                                this.days.push({id:id++,num:s++,isNowMonth:false,month:'next',checked:false})
                            }
                            //当前月份
                        }else{
                            this.days.push({id:id++, num:date_str, isNowMonth:true, month:'now', checked:false})
                        }
                    }
                }
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
                            font-size: 18px;
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
                height: 623px;
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
                                text-align: center;
                                &.now{
                                    background-color: #3B53FF;
                                    color: #fff;
                                }
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
