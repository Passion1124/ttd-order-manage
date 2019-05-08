<template>
    <div class="add_order_index">
        <div class="common_header">
            <div class="common_title">预约详情</div>
            <div class="back_arrow" @click="back">
                <img src="@/assets/images/back_arrow.png" alt="">
            </div>
        </div>
        <div class="main_row">
            <div class="left_row">
                <div class="input_row">
                    <div class="eat_time">
                        <div class="label_row">
                            <div class="circular">
                                <img class="time" src="@/assets/images/time.png" alt="">
                            </div>
                            <div class="label_text text_four">用餐时间</div>
                        </div>
                        <div class="input_box">
                            <div class="eat_time_text" @click="handleUpdateSelectType('date')">{{ getEatTimeText }}</div>
                        </div>
                    </div>
                    <div class="select_table">
                        <div class="label_row">
                            <div class="circular">
                                <img class="table_icon" src="@/assets/images/table_icon.png" alt="">
                            </div>
                            <div class="label_text text_four">选择桌台</div>
                        </div>
                        <div class="input_box">
                            <div class="select_table_text" @click="handleUpdateSelectType('table')">{{select_table.no ? '桌台号 ' + select_table.no : ''}}</div>
                        </div>
                    </div>
                    <div class="eat_people">
                        <div class="label_row">
                            <div class="circular">
                                <img class="people" src="@/assets/images/people.png" alt="">
                            </div>
                            <div class="label_text text_four">用餐人数</div>
                        </div>
                        <div class="input_box">
                            <input type="number" v-model="preOrderInfo.totalCount">
                        </div>
                    </div>
                    <div class="order_people">
                        <div class="label_row">
                            <div class="circular">
                                <img class="order_people" src="@/assets/images/order_people.png" alt="">
                            </div>
                            <div class="label_text text_three">预定人</div>
                        </div>
                        <div class="input_box">
                            <input type="text" v-model="preOrderInfo.contactor">
                        </div>
                    </div>
                    <div class="email">
                        <div class="label_row">
                            <div class="circular">
                                <img class="email" src="@/assets/images/email.png" alt="">
                            </div>
                            <div class="label_text text_two">邮箱</div>
                        </div>
                        <div class="input_box">
                            <input type="text" v-model="preOrderInfo.mail">
                        </div>
                    </div>
                    <div class="phone">
                        <div class="label_row">
                            <div class="circular">
                                <img class="phone" src="@/assets/images/phone.png" alt="">
                            </div>
                            <div class="label_text text_three">手机号</div>
                        </div>
                        <div class="input_box">
                            <input type="text" v-model="preOrderInfo.phoneNo">
                        </div>
                    </div>
                </div>
                <div class="order_explain">
                    <div class="order_explain_title">预约说明：</div>
                    <div class="textarea_row">
                        <textarea v-model="preOrderInfo.customerRequest"></textarea>
                    </div>
                </div>
                <div class="btn_row">
                    <button @click="back">取消</button>
                    <button @click="handleCreatePreOrder">{{orderGen ? '预定中...' : '确认预定'}}</button>
                </div>
            </div>
            <div class="right_row">
                <div class="selected_table" v-if="select_type === 'table'">
                    <div class="condition">
                        <div :class="{active: !table_filter}" @click="handleUpdateTableFilter('')">全部区域</div>
                        <div :class="{active: table_filter === 'unsmoke'}" @click="handleUpdateTableFilter('unsmoke')">非吸烟区</div>
                        <div :class="{active: table_filter === 'smoke'}" @click="handleUpdateTableFilter('smoke')">吸烟区</div>
                        <div :class="{active: table_filter === 'box'}" @click="handleUpdateTableFilter('box')">包间</div>
                    </div>
                    <div class="table_row">
                        <div class="table_row_list" v-for="(item, index) in getFilterTables" :key="index" :class="handleGetTableClass(item)" @click="handleUpdateSelectTable(item)">
                            <div class="table_row_list_title">桌台号 {{item.no}}</div>
                            <div class="table_row_list_num">{{item.siteCount}}人桌</div>
                            <div class="table_row_list_name">{{item.name | getTableName(lang) }}</div>
                            <div class="table_row_list_smoke">{{ item.allowSmoke ? '吸烟区' : '非吸烟区' }}</div>
                            <div class="table_selected" v-if="select_table.no === item.no">
                                <img src="@/assets/images/yes.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="select_eat_time" v-if="select_type === 'date'">
                    <div class="calendar_row">
                        <div class="date_nav">
                            <div class="pre_month" @click="handleUpdateMonth('pre')">
                                <img src="@/assets/images/add_order_calendar_pre.png" alt="">
                            </div>
                            <div class="show_year_month">{{currentYear}}年{{currentMonth}}月</div>
                            <div class="next_month" @click="handleUpdateMonth('next')">
                                <img src="@/assets/images/add_order_calendar_next.png" alt="">
                            </div>
                        </div>
                        <div class="week_nav">
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
                                    <div class="date" :class="{ now: select_day === getFullDate(item), allow: getDateAllowSelected(item) } ">{{item.day >= 10 ? item.day : '0' + item.day }}</div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="time_row">
                        <div class="time" v-for="(item, index) in times" :key="index" @click="handleUpdateSelectTime(item)">{{ item.startTime }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import { mapGetters } from 'vuex'
    import fetch from '../../utils/fetch'
    import { validateEmail, validateMobile, validateValueIsInteger } from "../../utils/validate";
    import { createCalendar, md5Result } from "../../utils/common";

    export default {
        name: "add_order_index",
        data () {
            return {
                table_filter: '',
                select_type: 'date',
                days: [],
                times: [],
                tables: [],
                setting: {},
                select_day: '',
                select_time: '',
                select_table: {},
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                preOrderInfo: {
                    mid: '',
                    contactor: '',
                    mail: '',
                    phoneNo: '',
                    isBox: 0,
                    allowSmoke: -1,
                    totalCount: '',
                    date: '',
                    time: '',
                    customerRequest: '',
                    tableNo: ''
                },
                orderGen: false
            }
        },
        computed: {
            ...mapGetters(['body', 'lang']),
            getCurrentFullDay () {
                return '' + this.currentYear + this.currentMonth + this.currentDay
            },
            getEatTimeText () {
                let str = '';
                if (this.select_day && this.select_time) {
                    str = moment(this.select_day).format('YYYY/MM/DD') + ' ' + this.select_time;
                }
                return str
            },
            getFilterTables () {
                if (!this.table_filter) {
                    return this.tables
                } else {
                    return this.tables.filter(item => {
                        if (this.table_filter === 'smoke') {
                            return item.allowSmoke;
                        } else if (this.table_filter === 'unsmoke') {
                            return !item.allowSmoke
                        } else if (this.table_filter === 'box') {
                            return item.isBox
                        }
                    })
                }
            }
        },
        watch: {
            select_day (val) {
                if (val) {
                    this.handleGetTimes();
                    this.select_time = '';
                }
            },
            select_type (val) {
                if (val === 'table') {
                    this.table_filter = '';
                    this.handleGetTableList();
                }
            }
        },
        filters: {
            getTableName (json, lang) {
                if (json && typeof json === 'string') {
                    json = JSON.parse(json);
                    return json[lang]
                } else {
                    return ''
                }
            }
        },
        created () {
            this.init();
        },
        methods: {
            init () {
                this.handleGetPreOrderSetting();
            },
            handleGetTimes () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderBookTimeApiService';
                let data = { base: this.body, mid: this.body.myUid, date: this.select_day };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.times = r.schedules;
                }).catch(e => {
                    console.error(e);
                    this.times = [];
                })
            },
            handleGetTableList () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderTableScheduleApiService';
                let data = { base: this.body, mid: this.body.myUid, date: this.select_day };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.tables = r.schedules;
                }).catch(e => {
                    console.log(e);
                })
            },
            // 预订单设置查询
            handleGetPreOrderSetting () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderSettingApiService';
                let data = { base: this.body, mid: this.body.myUid };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.setting = r.setting;
                    let add_date = moment().add(r.setting.preOrderDays, 'days');
                    this.currentYear = add_date.year();
                    this.currentMonth = add_date.month() + 1;
                    this.currentDay = add_date.date();
                    this.select_day = add_date.format('YYYYMMDD');
                    this.days = createCalendar(this.currentYear, this.currentMonth, this.currentDay);
                }).catch(e => {
                    console.error(e);
                })
            },
            // 生成订单
            handleOrderGen () {
                let api = 'com.ttdtrip.api.order.apis.service.OrderGenApiService';
                let p_data = { orderType: 0, orderFrom: 2, preOrderInfo: this.preOrderInfo };
                let sn = md5Result(p_data + new Date().getTime());
                let data = Object.assign({ base: this.body }, { sn }, p_data);
                this.orderGen = true;
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.back();
                }).catch(e => {
                    console.error(e);
                    this.orderGen = false;
                })
            },
            handleCreatePreOrder () {
                if (!this.select_day || !this.select_time) {
                    alert('请选择用餐时间');
                } else if (!this.select_table.no) {
                    alert('请选择桌台');
                } else if (!this.preOrderInfo.totalCount) {
                    alert('请输入用餐人数');
                } else if (!validateValueIsInteger(this.preOrderInfo.totalCount)) {
                    alert('请输入正确的用餐人数');
                } else if (!this.preOrderInfo.contactor) {
                    alert('请输入预定人');
                } else if (!this.preOrderInfo.mail) {
                    alert('请输入邮箱');
                } else if (!validateEmail(this.preOrderInfo.mail)) {
                    alert('请输入正确的邮箱');
                } else if (!this.preOrderInfo.phoneNo) {
                    alert('请输入手机号');
                } else if (!validateMobile(this.preOrderInfo.phoneNo)) {
                    alert('请输入正确的手机号');
                } else {
                    if (this.orderGen) return false;
                    this.preOrderInfo.date = this.select_day;
                    this.preOrderInfo.time = this.select_time.split('-')[0];
                    this.preOrderInfo.mid = this.body.myUid;
                    let { allowSmoke, isBox, no } = this.select_table;
                    this.preOrderInfo.allowSmoke = allowSmoke;
                    this.preOrderInfo.isBox = isBox;
                    this.preOrderInfo.tableNo = no;
                    this.handleOrderGen();
                }
            },
            handleGetTableClass (item) {
                let str = '';
                if (item.allowSmoke && item.isBox) {
                    str = 'box_smoke'
                } else if (!item.allowSmoke && item.isBox) {
                    str = 'box_unsmoke';
                } else if (item.allowSmoke && !item.isBox) {
                    str = 'unbox_smoke';
                } else if (!item.allowSmoke && !item.isBox) {
                    str = 'unbox_unsmoke'
                }
                return str;
            },
            handleUpdateTableFilter (val) {
                this.table_filter = val;
            },
            handleUpdateMonth (type) {
                if (type === 'pre') {
                    if (this.currentMonth === 1) {
                        this.currentYear -= 1;
                        this.currentMonth = 12;
                    } else {
                        this.currentMonth -= 1;
                    }
                } else if (type === 'next') {
                    if (this.currentMonth === 12) {
                        this.currentYear += 1;
                        this.currentMonth = 1
                    } else {
                        this.currentMonth += 1;
                    }
                }
                this.days = createCalendar(this.currentYear, this.currentMonth, this.currentDay);
            },
            handleUpdateSelectDay (item) {
                let selected = this.getDateAllowSelected(item);
                if (selected) {
                    this.select_day = this.getFullDate(item);
                }
            },
            handleUpdateSelectType (type) {
                if (type === 'date') {
                    this.select_type = type;
                } else {
                    if (this.select_day && this.select_time) {
                        this.select_type = type
                    } else {
                        alert('请选择用餐时间');
                    }
                }
            },
            handleUpdateSelectTime (item) {
                this.select_time = item.startTime + '-' + item.endTime;
                this.select_type = 'table'
            },
            handleUpdateSelectTable (item) {
                this.select_table = item;
            },
            getFullDate (obj) {
                let month = obj.months < 10 ? '0' + obj.months : obj.months;
                let day = obj.day < 10 ? '0' + obj.day : obj.day;
                let str = '' + obj.year + month + day;
                return str;
            },
            getDateAllowSelected (obj) {
                // console.log(obj);
                let now = moment(moment().format('YYYY-MM-DD 00:00:00')).valueOf();
                if (this.setting.preOrderDays) {
                    now = moment(moment().add(this.setting.preOrderDays, 'days').format('YYYY-MM-DD 00:00:00')).valueOf();
                }
                let month = obj.months < 10 ? '0' + obj.months : obj.months;
                let day = obj.day < 10 ? '0' + obj.day : obj.day;
                let str = obj.year + '-' + month + '-' + day;
                let timestamp = moment(str).valueOf();
                return now <= timestamp
            },
            back () {
                this.$router.go(-1);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .add_order_index{
        .main_row{
            display: flex;
            .left_row{
                width: 362px;
                height: 100%;
                min-height: 694px;
                padding-left: 34px;
                box-shadow:0 1px 7px 2px rgba(238,240,255,1);
                box-sizing: border-box;
                .input_row{
                    margin-top: 64px;
                    >div{
                        display: flex;
                        align-items: center;
                        margin-bottom: 20px;
                        &:last-of-type{
                            margin-bottom: 0;
                        }
                        .label_row{
                            display: flex;
                            align-items: center;
                            margin-right: 12px;
                            .circular{
                                position: relative;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 39px;
                                height: 39px;
                                background-color: #6CB5FE;
                                /*box-shadow:0 1px 7px 2px rgba(238,240,255,1);*/
                                border-radius: 50%;
                                z-index: 5;
                                .time, .order_people{
                                    width: 26px;
                                    height: 26px;
                                }
                                .table_icon{
                                    width: 24px;
                                    height: 25px;
                                }
                                .people{
                                    width: 26px;
                                    height: 24px;
                                }
                                .email{
                                    width: 23px;
                                    height: 20px;
                                }
                                .phone{
                                    width: 18px;
                                    height: 27px;
                                }
                            }
                            .label_text{
                                height: 31px;
                                line-height: 31px;
                                font-size: 16px;
                                padding-left: 27px;
                                background: linear-gradient(270deg,rgba(131,237,254,1) 0%,rgba(106,174,254,1) 100%);
                                box-shadow: 0 2px 3px 0 rgba(119,209,254,0.65);
                                border-radius: 24px;
                                padding-right: 15px;
                                box-sizing: border-box;
                                color: #fff;
                                margin-left: -19.5px;
                                &.text_one{}
                                &.text_two{
                                    width: 78px;
                                }
                                &.text_three{
                                    width: 92px;
                                }
                                &.text_four{
                                    width: 107px;
                                }
                            }
                        }
                        .input_box{
                            width: 151px;
                            height: 28px;
                            color: #4A4A4A;
                            padding-bottom: 4px;
                            border-bottom: 1px solid #D3EBFF; /* px */
                            box-sizing: border-box;
                            input{
                                width: 100%;
                                height: 100%;
                                font-size: 16px;
                                line-height: 23px;
                                border: 0;
                            }
                            div {
                                width: 100%;
                                height: 100%;
                                font-size: 16px;
                                line-height: 23px;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .order_explain{
                    width: 100%;
                    margin-top: 40px;
                    padding-right: 42px;
                    box-sizing: border-box;
                    .order_explain_title{
                        font-size: 18px;
                        line-height: 25px;
                        color: #444145;
                        font-weight: 500;
                        margin-bottom: 17px;
                    }
                    .textarea_row{
                        textarea{
                            width: 100%;
                            height: 107px;
                            padding: 11px 15px;
                            font-size: 15px;
                            line-height: 21px;
                            border-radius: 4px;
                            border: 1px solid #9B9B9B; /* px */
                            box-sizing: border-box;
                            resize: none;
                        }
                    }
                }
                .btn_row{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 30px;
                    padding-right: 42px;
                    box-sizing: border-box;
                    button {
                        width: 129px;
                        height: 38px;
                        font-size: 14px;
                        line-height: 38px;
                        color: #fff;
                        border-radius: 50px;
                        border: 0;
                        &:first-of-type{
                            background:linear-gradient(90deg,rgba(141,149,159,1) 0%,rgba(203,206,209,1) 100%);
                        }
                        &:last-of-type{
                            background:linear-gradient(90deg,rgba(106,175,254,1) 0%,rgba(130,237,254,1) 100%);
                        }
                    }
                }
            }
            .right_row{
                flex: 1;
                .selected_table{
                    .condition{
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 59px;
                        padding-left: 27px;
                        box-shadow: 0 1px 7px 2px rgba(238,240,255,1);
                        border-radius: 1px; /* px */
                        box-sizing: border-box;
                        div{
                            font-size: 18px;
                            color: #9B9B9B;
                            margin-right: 48px;
                            cursor: pointer;
                            &.active{
                                color: #4A4A4A;
                                font-weight: 500;
                            }
                        }
                    }
                    .table_row{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        padding: 25px 5px 25px 17px;
                        box-sizing: border-box;
                        .table_row_list{
                            position: relative;
                            width: 201px;
                            height: 185px;
                            background-size: cover;
                            background-repeat: no-repeat;
                            margin: 0 10px 10px 0;
                            padding-left: 28px;
                            color: #fff;
                            box-sizing: border-box;
                            cursor: pointer;
                            &.box_smoke{
                                background-image: url("../../assets/images/box_smoke.png");
                            }
                            &.unbox_smoke{
                                background-image: url("../../assets/images/unbox_smoke.png");
                            }
                            &.box_unsmoke{
                                background-image: url("../../assets/images/box_unsmoke.png");
                            }
                            &.unbox_unsmoke{
                                background-image: url("../../assets/images/unbox_unsmoke.png");
                            }
                            .table_row_list_title{
                                margin-top: 21px;
                                font-size: 18px;
                                line-height: 25px;
                            }
                            .table_row_list_num, .table_row_list_name, .table_row_list_smoke {
                                font-size: 15px;
                                line-height: 21px;
                                margin-top: 12px;
                            }
                            .table_row_list_name, .table_row_list_smoke {
                                margin-top: 8px;
                            }
                            .table_selected{
                                position: absolute;
                                right: -1px;
                                top: -5px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 33px;
                                height: 33px;
                                border-radius: 50%;
                                background-color: #fff;
                                box-shadow:0 1px 6px 0 rgba(103,173,252,0.54);
                                z-index: 9;
                                img{
                                    width: 20px;
                                    height: 17px;
                                }
                            }
                        }
                    }
                }
                .select_eat_time{
                    .calendar_row{
                        box-shadow:0 1px 7px 2px rgba(238,240,255,1);
                        .date_nav{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            height: 50px;
                            border-bottom: 1px solid #E2F0FF;
                            .pre_month, .next_month{
                                cursor: pointer;
                                line-height: 0;
                                img{
                                    width: 9px;
                                    height: 17px;
                                }
                            }
                            .show_year_month{
                                font-size: 17px;
                                line-height: 24px;
                                color: #3B53FF;
                                margin: 0 21px;
                            }
                        }
                        .week_nav {
                            display: flex;
                            align-items: center;
                            width: 100%;
                            height: 40px;
                            line-height: 40px;
                            font-size: 16px;
                            color: #4A4A4A;
                            >div{
                                flex: 1;
                                text-align: center;
                            }
                        }
                        .date_list{
                            display: flex;
                            align-items: center;
                            flex-wrap: wrap;
                            >div{
                                width: 14.2857%;
                                height: 82px;
                                box-sizing: border-box;
                                background-color: #E4EFFC;
                                &.isCurrent{
                                    border-right: 1px solid #E2F0FF; /* px */
                                    border-top: 1px solid #E2F0FF; /* px */
                                    background-color: #fff;
                                }
                                &:nth-of-type(7n){
                                    border-right: 0;
                                }
                                .date{
                                    width: 22px;
                                    height: 22px;
                                    font-size: 16px;
                                    line-height: 22px;
                                    border-radius: 50%;
                                    color: #9B9B9B;
                                    margin: 4px 0 0 7px;
                                    text-align: center;
                                    &.now{
                                        background-color: #3B53FF;
                                        color: #fff !important;
                                    }
                                    &.allow{
                                        color: #000;
                                    }
                                }
                            }
                        }
                    }
                    .time_row{
                        margin: 20px 0;
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        padding: 0 7px;
                        box-sizing: border-box;
                        .time{
                            width: 83px;
                            height: 48px;
                            font-size: 17px;
                            color: #4A4A4A;
                            line-height: 48px;
                            box-shadow:0 1px 7px 2px rgba(238,240,255,1);
                            border-radius:6px;
                            background-color: #fff;
                            margin: 0 12px 12px 0;
                            text-align: center;
                            &.active{
                                color: #fff;
                                background-color: #3B53FF;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
