<template>
    <div class="order_date_index">
        <div class="common_header">
            <div class="common_title">{{ restaurant_name }}</div>
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
                        <img src="@/assets/images/calendar.png" alt="" @click="handleTriggerCalendar">
                        <div class="calendar_date_box" v-if="calendar_show">
                            <div class="calendar_nav">
                                <div class="pre" @click="handleUpdateMonth('pre')">
                                    <img src="@/assets/images/add_order_calendar_pre.png" alt="">
                                </div>
                                <div class="calendar_text">{{ calendar_year }}年{{ calendar_month }}月</div>
                                <div class="next" @click="handleUpdateMonth('next')">
                                    <img src="@/assets/images/add_order_calendar_next.png" alt="">
                                </div>
                            </div>
                            <div class="week">
                                <div>日</div>
                                <div>一</div>
                                <div>二</div>
                                <div>三</div>
                                <div>四</div>
                                <div>五</div>
                                <div>六</div>
                            </div>
                            <div class="day_list">
                                <div v-for="(item, index) in calendar_days" :key="index" :class="{isCurrent: item.isNowMonth }">
                                    <template v-if="item.isNowMonth">
                                        <div class="day" :class="{ now: select_day === getFullDate(item, '-') }" @click="handleUpdateSelectDay(item)">{{item.day >= 10 ? item.day : '0' + item.day }}</div>
                                    </template>
                                </div>
                            </div>
                        </div>
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
                            <div class="date">{{ getCalendarMonthAndDay }}</div>
                            <div class="week">{{ getCheckedDateIsWeekNum }}</div>
                        </div>
                        <div class="center">
                            <div class="remain">
                                <img src="@/assets/images/remain.png" alt="">
                            </div>
                            <div>待处理</div>
                        </div>
                        <div class="bottom">
                            <div class="table_row" v-for="(item, index) in table_list" :key="index">
                                <div class="other_info">
                                    <span v-if="item.isBox">VIP</span>
                                    <img src="@/assets/images/smoke.png" alt="" v-if="item.allowSmoke">
                                </div>
                                <div class="table_num">{{ item.no }}号桌</div>
                            </div>
                        </div>
                    </div>
                    <div class="scroll_width">
                        <div class="top">
                            <div class="time_list_row">
                                <div v-for="(item, index) in time_list" :key="index">{{ item.startTime }}</div>
                            </div>
                        </div>
                        <div class="center">
                            <div class="wait_order_list">
                                <div v-for="(item, index) in time_list" :key="index">
                                    <div class="wait" v-if="getWaitNumber(item, getWaitOrderList)" @click="handleShowOrderListPopup(item, 'wait_use')">{{ getWaitNumber(item, getWaitOrderList) }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="table_data" v-for="(table, t_index) in table_list" :key="t_index">
                                <div class="table_time_row">
                                    <div class="time_list" v-for="(time, time_index) in time_list" :key="time_index">
                                        <div :class="getTableStatusClassName(table, time_list[time_index - 1])" @click="handleShowOrderListPopup(time_list[time_index - 1], 'wait_eat', table)"></div>
                                        <div :class="getTableStatusClassName(table, time)" @click="handleShowOrderListPopup(time, 'wait_eat', table)">
                                            <div class="img_row">
                                                <img class="waiting_img" src="@/assets/images/audit.png" alt="">
                                                <img class="eating_img" src="@/assets/images/eating.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calendar_bottom">
                <div class="left_tips">
                    <div>
                        <div>未处理：{{ bottom_tips.remain }}</div>
                        <div>今日应到店：{{ bottom_tips.should }}</div>
                    </div>
                    <div>
                        <div>今日新订：{{ bottom_tips.new_order }}</div>
                        <div>今日实到店：{{ bottom_tips.solid }}</div>
                    </div>
                </div>
                <div class="right_tips">
                    <div class="eat">
                        <div class="tips_bg"></div>
                        <div class="tips_text">就餐中</div>
                    </div>
                    <div class="order">
                        <div class="tips_bg"></div>
                        <div class="tips_text">待就餐</div>
                    </div>
                    <div class="handle">
                        <div class="tips_bg"></div>
                        <div class="tips_text">待处理</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="mask" @click="handleHideOrderListPopup"></div>
        <div class="order_list" v-if="order_list_popup">
            <div class="order" v-for="(item, index) in popup_order_list" :key="index" @click="handleGoToTheOrderTreatedPage(item)">
                <div class="order_name">顾客{{ item.preOrder.contactor }}的订单</div>
                <div class="order_arrow">
                    <img class="hover" src="@/assets/images/order_hover_arrow.png" alt="">
                    <img class="normal" src="@/assets/images/order_arrow.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import { mapGetters } from 'vuex'
    import fetch from '../../utils/fetch'
    import { createCalendar, formatNumber } from "../../utils/common";
    import { getUserInfo } from "../../utils/auth";

    export default {
        name: "order_date_index",
        data () {
            return {
                restaurant_name: '餐厅名称',
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                calendar_year: 1970,
                calendar_month: 1,
                calendar_days: [],
                select_day: '',
                days: [],
                time_list: [],
                table_list: [],
                order_list: [],
                days_date: {},
                switch_type: 'month',
                bottom_tips: {
                    remain: 0,
                    should: 0,
                    solid: 0,
                    new_order: 0
                },
                mask: false,
                order_list_popup: false,
                order_filter: {
                    status: '',
                    time: ''
                },
                popup_order_list: [],
                calendar_show: true
            }
        },
        computed: {
            ...mapGetters(['body', 'lang']),
            getCheckedDateIsWeekNum () {
                let arr = ['天', '一', '二', '三', '四', '五', '六'];
                let week = moment(this.select_day).day();
                return '星期' + arr[week];
            },
            getCalendarText () {
                return this.select_day ? moment(this.select_day).format('YYYY年MM月DD日') : moment().format('YYYY年MM月DD日');
            },
            getCalendarMonthAndDay () {
                return moment(this.select_day).format('MM月DD日');
            },
            getWaitOrderList () {
                return this.order_list.filter(order => order.orderStatus === 1);
            }
        },
        filters: {},
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
                if (this.calendar_show) {
                    this.handleTriggerCalendar();
                }
            }
        },
        created () {
            this.init();
        },
        methods: {
            init () {
                let userInfo = getUserInfo();
                console.log(userInfo);
                if (userInfo) {
                    this.restaurant_name = userInfo.goodsInfo[this.lang].name;
                }
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
                this.order_list = [];
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderListByTimeApiService';
                let data = { base: this.body, date: this.select_day.replace(/-/g, ''), mid: this.body.myUid, needTotalCount: 1 };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    if (moment().format('YYYYMMDD') === data.date) {
                        this.bottom_tips.should = r.orders.filter(item => item.orderStatus === 3).length;
                        this.bottom_tips.solid = r.orders.filter(item => item.orderStatus === 5).length;
                        this.bottom_tips.new_order = r.totalCount;
                    }
                    this.order_list = r.orders;
                }).catch(e => {
                    console.error(e);
                })
            },
            // 预订单列表(B端)
            handlePreOrderList () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderListApiService';
                let data = { base: this.body, mid: this.body.myUid, page: 1, size: 10000, needTotalCount: 1, hasConfirmed: 0 };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.bottom_tips.remain = r.totalCount
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
                    this.switch_type = 'day';
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
            handleGoToTheOrderTreatedPage (item) {
                this.$router.push({
                    name: 'order_treated',
                    query: { id: item.id }
                })
            },
            getFullDate (obj, separator) {
                let month = obj.months < 10 ? '0' + obj.months : obj.months;
                let day = obj.day < 10 ? '0' + obj.day : obj.day;
                let arr = [obj.year, month, day];
                return arr.join(separator);
            },
            getWaitNumber (item, wait_order) {
                let arr = wait_order.filter(order => order.preOrder.time === item.startTime && order.preOrder.date === item.date);
                return arr.length;
            },
            handleShowOrderListPopup (time, type, table) {
                if (type === 'wait_use') {
                    this.popup_order_list = this.order_list.filter(order => order.orderStatus === 1 && order.preOrder.time === time.startTime && order.preOrder.date === time.date);
                    this.mask = true;
                    this.order_list_popup = true;
                } else {
                    if (time && table) {
                        let arr = this.order_list.filter(item => item.preOrder.time === time.startTime && item.preOrder.date === time.date && item.preOrder.tableNo === table.no);
                        let eating = arr.find(item => item.orderStatus === 11);
                        let waiting = arr.find(item => item.orderStatus === 3);
                        if (eating) {
                            this.handleGoToTheOrderTreatedPage(eating);
                        }
                        if (waiting) {
                            this.handleGoToTheOrderTreatedPage(waiting);
                        }
                    }
                }
            },
            handleHideOrderListPopup () {
                this.mask = false;
                this.order_list_popup = false;
            },
            getTableStatusClassName (table, time) {
                if (table && time) {
                    let arr = this.order_list.filter(item => item.preOrder.time === time.startTime && item.preOrder.date === time.date && item.preOrder.tableNo === table.no);
                    let eating = arr.find(item => item.orderStatus === 11);
                    let waiting = arr.find(item => item.orderStatus === 3);
                    if (eating) {
                        return 'eating';
                    } else if (waiting) {
                        return 'waiting';
                    } else {
                        return ''
                    }
                } else {
                    return '';
                }
            },
            handleTriggerCalendar () {
                this.calendar_show = !this.calendar_show;
                if (this.calendar_show) {
                    this.calendar_year = this.currentYear;
                    this.calendar_month = this.currentMonth;
                    this.calendar_days = createCalendar(this.calendar_year, this.calendar_month, 1);
                } else {
                    this.calendar_days = [];
                }
            },
            handleUpdateMonth (type) {
                let full_date = this.calendar_year + formatNumber(this.calendar_month) + '01';
                let date = '';
                if (type === 'pre') {
                    date = moment(full_date).subtract(1, 'months');
                } else if (type === 'next') {
                    date = moment(full_date).add(1, 'months');
                }
                this.calendar_year = date.year();
                this.calendar_month = date.month() + 1;
                this.calendar_days = createCalendar(this.calendar_year, this.calendar_month, 1);
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
                        cursor: pointer;
                        &:first-of-type{
                            margin-right: 7px;
                        }
                        img{
                            width: 10px;
                            height: 17px;
                        }
                    }
                }
                >.calendar_text{
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
                        position: relative;
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
                            cursor: pointer;
                        }
                        .calendar_date_box{
                            position: absolute;
                            left: -201px;
                            top: 48px;
                            width: 375px;
                            height: 291px;
                            background-color: #fff;
                            box-shadow:0 3px 8px 4px rgba(219,236,255,0.68);
                            z-index: 120;
                            .calendar_nav{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 100%;
                                height: 37px;
                                background-color: #E4EFFC;
                                .pre, .next{
                                    width: 8px;
                                    height: 14px;
                                    img {
                                        width: 100%;
                                        height: 100%;
                                        vertical-align: top;
                                    }
                                }
                                .calendar_text{
                                    font-size: 15px;
                                    line-height: 21px;
                                    color: #3B53FF;
                                    margin: 0 14px;
                                }
                            }
                            .week {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                width: 100%;
                                height: 39px;
                                text-align: center;
                                >div {
                                    flex: 1;
                                    font-size: 13px;
                                    line-height: 19px;
                                    color: #3B53FF;
                                    font-weight: 500;
                                }
                            }
                            .day_list{
                                display: flex;
                                align-items: center;
                                flex-wrap: wrap;
                                >div{
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 14.2857%;
                                    height: 36px;
                                    box-sizing: border-box;
                                    background-color: #fff;
                                    .day{
                                        width: 25px;
                                        height: 25px;
                                        font-size: 16px;
                                        line-height: 23px;
                                        border-radius: 50%;
                                        color: #9B9B9B;
                                        text-align: center;
                                        &.now{
                                            background-color: #3B53FF;
                                            color: #fff !important;
                                        }
                                    }
                                }
                            }
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
                        cursor: pointer;
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
                            cursor: pointer;
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
                                cursor: pointer;
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
                    position: relative;
                    width: 100%;
                    height: 530px;
                    padding-left: 104px;
                    box-sizing: border-box;
                    .fixed_width{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 104px;
                        height: 100%;
                        z-index: 9;
                        .top {
                            width: 100%;
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
                            width: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-top: 1px solid #fff;
                            background-color: #F5A623;
                            box-sizing: border-box;
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
                            width: 100%;
                            height: 436px;
                            background-color: #fff;
                            box-shadow: 6px 2px 9px 0 rgba(169,180,255,0.21);
                            overflow-y: auto;
                            .table_row{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                width: 100%;
                                height: 42px;
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
                        /*display: flex;*/
                        /*flex-wrap: wrap;*/
                        width: 100%;
                        height: 100%;
                        max-width: 846px;
                        overflow-x: auto;
                        .top {
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            white-space: nowrap;
                            .time_list_row {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: flex-start;
                                background-color: #78B6FC;
                                >div{
                                    flex: 1;
                                    min-width: 100px;
                                    height: 100%;
                                    font-size: 15px;
                                    line-height: 54px;
                                    text-align: center;
                                    color: #fff;
                                    outline: none;
                                }
                            }
                        }
                        .center{
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            /*white-space: nowrap;*/
                            .wait_order_list{
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: flex-start;
                                box-shadow:0 5px 9px 0 rgba(169,180,255,0.21);
                                >div{
                                    flex: 1;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    min-width: 100px;
                                    height: 41px;
                                    font-size: 15px;
                                    line-height: 54px;
                                    text-align: center;
                                    /*background-color: #fff;*/
                                    .wait {
                                        width: 42px;
                                        height: 41px;
                                        line-height: 41px;
                                        color: #fff;
                                        font-size: 23px;
                                        background-color: #F5A623;
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                        .bottom {
                            /*width: auto;*/
                            .table_data {
                                display: flex;
                                align-items: center;
                                height: 42px;
                                box-sizing: border-box;
                                .table_time_row{
                                    flex: 1;
                                    display: flex;
                                    align-items: center;
                                    justify-content: flex-start;
                                    height: 42px;
                                    border-bottom: 1px solid #E2F0FF;
                                    box-sizing: border-box;
                                    >div {
                                        flex: 1;
                                        display: flex;
                                        align-items: center;
                                        justify-content: flex-start;
                                        min-width: 100px;
                                        height: 40px;
                                        background-color: #fff;
                                        >div {
                                            flex: 1;
                                            height: 100%;
                                            &.waiting {
                                                cursor: pointer;
                                                background-color: #9DEDFF;
                                                .img_row {
                                                    background-color: #25D8FC;
                                                    .waiting_img{
                                                        display: block;
                                                    }
                                                }
                                            }
                                            &.eating {
                                                background-color: #C3DFFE;
                                                cursor: pointer;
                                                .img_row {
                                                    background-color: #76B6FE;
                                                    .eating_img{
                                                        display: block;
                                                    }
                                                }
                                            }
                                            .img_row{
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                width: 40px;
                                                height: 40px;
                                                img {
                                                    display: none;
                                                }
                                                .waiting_img {
                                                    width: 21px;
                                                    height: 21px;
                                                    vertical-align: top;
                                                }
                                                .eating_img {
                                                    width: 24px;
                                                    height: 24px;
                                                    vertical-align: top;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    >div{
                        .top {
                            /*width: 100%;*/
                            height: 54px;
                            background-color: #78B6FC;
                            color: #fff;
                        }
                        .center{
                            position: relative;
                            /*width: 100%;*/
                            height: 41px;
                            z-index: 99;
                        }
                        .bottom {
                            /*width: 100%;*/
                            height: 418px;
                            box-sizing: border-box;
                        }
                    }
                }
            }
            .calendar_bottom{
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-top: 20px;
                padding-bottom: 17px;
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
        .mask{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            z-index: 100;
        }
        .order_list{
            position: fixed;
            left: 50%;
            top: 50%;
            width: 297px;
            height: 234px;
            padding: 24px 15px;
            background-color: #fff;
            box-shadow: 0 0 12px 3px rgba(169,180,255,0.21);
            transform: translate(-50%, -50%);
            border-radius: 5px;
            z-index: 101;
            box-sizing: border-box;
            overflow-y: auto;
            .order {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                max-height: 217px;
                height: 46px;
                color: #FFCF77;
                padding: 0 11px;
                border-radius: 10px;
                box-sizing: border-box;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                &:hover{
                    background-color: #F5A623;
                    .order_name{
                        color: #FFFFFF;
                    }
                    .order_arrow{
                        .hover{
                            display: block;
                        }
                        .normal {
                            display: none;
                        }
                    }
                }
                .order_name {
                    font-size: 22px;
                    line-height: 31px;
                }
                .order_arrow {
                    .hover {
                        display: none;
                    }
                    img {
                        width: 9px;
                        height: 16px;
                    }
                }
            }
        }
    }
</style>
