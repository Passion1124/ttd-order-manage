<template>
    <div class="order_date_index">
        <div class="common_header">
            <div class="common_title">餐厅名称</div>
            <div class="icon_row">
                <div class="preview_icon" @click="handleGoToTheTablePreview">
                    <img src="@/assets/images/preview.png" alt="">
                </div>
                <div class="add_icon" @click="handleGoToTheAddOrderPage">
                    <img src="@/assets/images/add.png" alt="">
                </div>
                <div class="remind_icon" @click="handleGoToTheMessagePage" v-if="false">
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
                <div class="calendar_text">{{ getCalendarText }}</div>
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
                <div class="type_is_day" v-if="switch_type === 'month'">
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
                        <div v-for="(item, index) in days" :key="index" :class="{isCurrent: item.isNowMonth }" @click="handleUpdateSelectDay(item)">
                            <template v-if="item.isNowMonth">
                                <div class="date" :class="{ now: select_day === getFullDate(item, '-') }">{{item.day >= 10 ? item.day : '0' + item.day }}</div>
                                <template v-if="days_date[getFullDate(item, '')]">
                                    <div class="wait_used" v-if="days_date[getFullDate(item, '')].waitUsedCount">
                                        <div>待就餐</div>
                                        <div>{{days_date[getFullDate(item, '')].waitUsedCount}}</div>
                                    </div>
                                    <div class="wait_confirm" v-if="days_date[getFullDate(item, '')].waitCount">
                                        <div>待处理</div>
                                        <div>{{days_date[getFullDate(item, '')].waitCount}}</div>
                                    </div>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="type_is_month" v-if="switch_type === 'day'">
                    <div class="fixed_width">
                        <div class="top">
                            <div class="date">{{currentMonth}}月{{currentDay}}日</div>
                            <div class="week">{{ getCheckedDateIsWeekNum }}</div>
                        </div>
                        <div class="center">
                            <div class="remain">
                                <img src="@/assets/images/remain.png" alt="">
                            </div>
                            <div>待处理</div>
                        </div>
                        <div class="bottom">
                            <div class="table_row">
                                <div class="other_info">
                                    <span>VIP</span>
                                    <img src="@/assets/images/smoke.png" alt="">
                                </div>
                                <div class="table_num">1号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info">
                                    <img src="@/assets/images/no_smoking.png" alt="">
                                </div>
                                <div class="table_num">2号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info"></div>
                                <div class="table_num">3号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info"></div>
                                <div class="table_num">4号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info"></div>
                                <div class="table_num">5号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info"></div>
                                <div class="table_num">6号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info"></div>
                                <div class="table_num">7号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info"></div>
                                <div class="table_num">8号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info"></div>
                                <div class="table_num">9号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info"></div>
                                <div class="table_num">10号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info"></div>
                                <div class="table_num">11号桌</div>
                            </div>
                            <div class="table_row">
                                <div class="other_info"></div>
                                <div class="table_num">12号桌</div>
                            </div>
                        </div>
                    </div>
                    <div class="scroll_width">
                        <div class="top">
                            <div>9:30</div>
                            <div>10:00</div>
                            <div>10:30</div>
                            <div>11:00</div>
                            <div>11:30</div>
                            <div>12:00</div>
                            <div>12:30</div>
                            <div>13:00</div>
                            <div>13:30</div>
                            <div>14:00</div>
                            <div>14:30</div>
                            <div>15:00</div>
                            <div>15:30</div>
                            <div>16:00</div>
                            <div>16:30</div>
                            <div>17:00</div>
                            <div>17:30</div>
                            <div>17:30</div>
                            <div>17:30</div>
                            <div>17:30</div>
                            <div>17:30</div>
                            <div>17:30</div>
                        </div>
                        <div class="center"></div>
                        <div class="bottom"></div>
                    </div>
                </div>
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
    import moment from 'moment'
    import { mapGetters } from 'vuex'
    import { createCalendar } from "../../utils/common";
    import fetch from '../../utils/fetch'
    export default {
        name: "order_date_index",
        data () {
            return {
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                select_day: '',
                days: [],
                time_list: [],
                table_list: [],
                days_date: {},
                switch_type: 'month'
            }
        },
        computed: {
            ...mapGetters(['body']),
            getCheckedDateIsWeekNum () {
                let arr = ['天', '一', '二', '三', '四', '五', '六'];
                let week = new Date(this.currentYear + '-' +  this.currentMonth + '-' + this.currentDay).getDay();
                return '星期' + arr[week];
            },
            getCalendarText () {
                return this.select_day ? moment(this.select_day).format('YYYY年MM月DD日') : moment().format('YYYY年MM月DD日');
            }
        },
        watch: {
            currentMonth () {
                let s_date = moment().month(this.currentMonth - 1).startOf('month').format('YYYYMMDD');
                let e_date = moment().month(this.currentMonth - 1).endOf('month').format('YYYYMMDD');
                this.handleGetPreOrderDateList(s_date, e_date);
            },
            select_day (val) {
                this.handlePreOrderListByTime();
                this.handlePreOrderTableSchedule();
                this.handlePreOrderBookTime();
            }
        },
        created () {
            this.init();
        },
        methods: {
            init () {
                this.changeYearMonthDay('now');
                this.handlePreOrderList();
            },
            // 预订单日期数据查询列表
            handleGetPreOrderDateList (startDate, endDate) {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderDateListApiService';
                let data = { base: this.body, startDate, endDate, mid: this.body.myUid };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.days_date = r.days;
                }).catch(e => {
                    console.error(e);
                })
            },
            // 时间点预订单列表(B端大屏)
            handlePreOrderListByTime () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderListByTimeApiService';
                let data = { base: this.body, date: this.select_day.replace(/-/g, ''), mid: this.body.myUid };
                fetch.post(api, data).then(r => {
                    console.log(r);
                }).catch(e => {
                    console.error(e);
                })
            },
            // 预订单列表(B端)
            handlePreOrderList () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderListApiService';
                let data = { base: this.body, mid: this.body.myUid };
                fetch.post(api, data).then(r => {
                    console.log(r);
                }).catch(e => {
                    console.error(e);
                })
            },
            // 预订单桌台日计划v2
            handlePreOrderTableSchedule () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderTableScheduleApiService';
                let data = { base: this.body, mid: this.body.myUid ,date: this.select_day.replace(/-/g, '') };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.table_list = r.schedules;
                }).catch(e => {
                    console.error(e);
                })
            },
            // 预订单预约时间v2
            handlePreOrderBookTime () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderBookTimeApiService';
                let data = { base: this.body, mid: this.body.myUid, date: this.select_day.replace(/-/g, '') };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.time_list = r.schedules;
                }).catch(e => {
                    console.error(e);
                })
            },
            handleUpdateSwitchType (type) {
                if (this.switch_type !== type) this.switch_type = type
            },
            changeYearMonthDay (type) {
                if (type === 'now') {
                    this.currentYear = moment().year();
                    this.currentMonth = moment().month() + 1;
                    this.currentDay = moment().date();
                    this.select_day = moment().format('YYYY-MM-DD');
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
                this.days = createCalendar(this.currentYear, this.currentMonth, this.currentDay);
            },
            handleUpdateSelectDay (item) {
                if (item.isNowMonth) {
                    this.select_day = this.getFullDate(item, '-');
                }
            },
            handleUpdateDateIsNow () {
                if (this.switch_type === 'month') {
                    this.changeYearMonthDay('now');
                } else {
                    this.select_day = moment().format('YYYY-MM-DD');
                }
            },
            handleShowLastMonth () {
                if (this.switch_type === 'month') {
                    this.changeYearMonthDay('last');
                } else {
                    this.select_day = moment(moment(this.select_day).subtract(1, 'days')).format('YYYY-MM-DD');
                }
            },
            handleShowNextMonth () {
                if (this.switch_type === 'month') {
                    this.changeYearMonthDay('next');
                } else {
                    this.select_day = moment(moment(this.select_day).add(1, 'days')).format('YYYY-MM-DD');
                }
            },
            handleGoToTheTablePreview () {
                this.$router.push({
                    name: 'table_preview'
                })
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
            getFullDate (obj, separator) {
                let month = obj.months < 10 ? '0' + obj.months : obj.months;
                let day = obj.day < 10 ? '0' + obj.day : obj.day;
                let arr = [obj.year, month, day];
                return arr.join(separator);
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
                background-color: #fff;
                box-shadow: 0 1px 7px 2px rgba(238,240,255,1);
                overflow: hidden;
                .type_is_day{
                    height: 623px;
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
                            .wait_confirm {
                                position: relative;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                width: 113px;
                                height: 25px;
                                padding: 0 8px;
                                background: rgba(246,197,116,1);
                                border-radius: 0 4px 4px 0;
                                border-left: 3px solid #F5A623;
                                box-sizing: border-box;
                                margin-left: 11px;
                                margin-top: 5px;
                                >div{
                                    font-size: 13px;
                                    line-height: 19px;
                                    color: #fff;
                                }
                            }
                            .wait_used {
                                position: relative;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                width: 99px;
                                height: 21px;
                                padding: 0 8px;
                                background: rgba(157,237,255,1);
                                border-radius: 0 4px 4px 0;
                                border-left: 3px solid #25D8FC;
                                box-sizing: border-box;
                                margin-left: 11px;
                                margin-top: 5px;
                                >div{
                                    font-size: 13px;
                                    line-height: 19px;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
                .type_is_month{
                    display: flex;
                    align-items: center;
                    height: 530px;
                    .fixed_width{
                        width: 104px;
                        min-width: 104px;
                        height: 100%;
                        .top {
                            padding-top: 5px;
                            text-align: center;
                            border-right: 1px solid #fff; /* px */
                            box-sizing: border-box;
                            .date, .week{
                                font-size: 16px;
                                line-height: 23px;
                            }
                        }
                        .center{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-top: 1px solid #fff;
                            background-color: #F5A623;
                            .remain{
                                width: 19px;
                                height: 19px;
                                margin-right: 6px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            >div:last-of-type{
                                font-size: 16px;
                                line-height: 23px;
                                color: #fff;
                            }
                        }
                        .bottom {
                            background-color: #fff;
                            box-shadow:6px 2px 9px 0 rgba(169,180,255,0.21);
                            overflow-y: auto;
                            .table_row{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                width: 100%;
                                height: 40px;
                                padding: 0 15px 0 9px;
                                box-sizing: border-box;
                                .other_info{
                                    display: flex;
                                    align-items: center;
                                    justify-content: flex-end;
                                    width: 28px;
                                    span {
                                        font-size: 8px;
                                        line-height: 11px;
                                        margin-right: 4px;
                                        color: #9B9B9B;
                                    }
                                    img{
                                        width: 16px;
                                        height: 13px;
                                    }
                                }
                                .table_num{
                                    font-size: 16px;
                                    line-height: 23px;
                                    color: #9B9B9B;
                                }
                            }
                        }
                    }
                    .scroll_width {
                        flex: 1;
                        max-width: 846px;
                        overflow: auto;
                        .top {
                            display: flex;
                            align-items: center;
                            width: auto;
                            padding: 0 10px;
                            box-sizing: border-box;
                            >div{
                                width: 50px;
                                min-width: 50px;
                                height: 100%;
                                font-size: 15px;
                                line-height: 54px;
                                text-align: center;
                                color: #fff;
                                background-color: #78B6FC;
                            }
                        }
                        .center{
                            width: auto;
                        }
                        .bottom {
                            width: auto;
                        }
                    }
                    >div{
                        .top {
                            width: 100%;
                            height: 54px;
                            background-color: #78B6FC;
                            color: #fff;
                        }
                        .center{
                            width: 100%;
                            height: 41px;
                            box-shadow:0 5px 9px 0 rgba(169,180,255,0.21);
                        }
                        .bottom {
                            width: 100%;
                            height: 436px;
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
