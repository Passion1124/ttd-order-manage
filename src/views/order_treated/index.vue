<template>
    <div class="order_treated_index">
        <div class="common_header">
            <div class="common_title">{{ $t('other.appointment_details') }}</div>
            <div class="back_arrow" @click="back">
                <img src="@/assets/images/back_arrow.png" alt="">
            </div>
        </div>
        <div class="main_row">
            <div class="left_row">
                <div class="order_detail">
                    <div class="detail_title">
                        <div class="order_icon">
                            <img src="@/assets/images/order_icon.png" alt="">
                        </div>
                        <div class="title_text">{{ preOrderInfo.contactor }}</div>
                    </div>
                    <div class="detail_row">
                        <div class="list"><b>{{ $t('other.mailbox') }}：</b>{{ preOrderInfo.mail }}</div>
                        <div class="list"><b>{{ $t('other.telephone') }}：</b>{{ preOrderInfo.phoneNo }}</div>
                        <div class="list"><b>{{ $t('other.regional_preference') }}：</b>{{ getAreaPreference }}</div>
                    </div>
                </div>
                <div class="input_row">
                    <div class="eat_time">
                        <div class="label_row">
                            <div class="circular">
                                <img class="time" src="@/assets/images/time.png" alt="">
                            </div>
                            <div class="label_text text_four">{{ $t('other.dinner_time') }}</div>
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
                            <div class="label_text text_four">{{ $t('other.table_selection') }}</div>
                        </div>
                        <div class="input_box">
                            <div class="select_table_text" @click="handleUpdateSelectType('table')">{{select_table.no ? $t('other.table_number') + ' ' + select_table.no : ''}}</div>
                        </div>
                    </div>
                    <div class="eat_people">
                        <div class="label_row">
                            <div class="circular">
                                <img class="people" src="@/assets/images/people.png" alt="">
                            </div>
                            <div class="label_text text_four">{{ $t('other.number_of_diners') }}</div>
                        </div>
                        <div class="input_box">
                            <!--order.orderStatus !== 1-->
                            <input type="text" v-model="preOrderInfo.totalCount" :disabled="true">
                        </div>
                    </div>
                </div>
                <div class="merches" v-if="orderMerches.length">
                    <div class="row" v-for="(item, index) in orderMerches" :key="index">
                        <div class="poster">
                            <img :src="item.merchImgUrl" alt="">
                        </div>
                        <div class="info">
                            <div class="info_name">{{ item.merchName }}</div>
                            <div class="info_price">
                                <div class="currency">{{ item.currency }}</div>
                                <div class="price">{{ item.payPrice / 100 }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order_explain">
                    <div class="order_explain_title">{{ $t('other.appointment_instruction') }}：</div>
                    <div class="textarea_row">
                        <!--order.orderStatus !== 1-->
                        <textarea v-model="preOrderInfo.customerRequest" :disabled="true"></textarea>
                    </div>
                </div>
                <div class="btn_row" :class="{ flex_center: order.orderStatus === 11 }">
                    <template v-if="order.orderStatus === 1">
                        <button @click="handleRefuseOrder">{{ $t('other.refusal_of_reservation') }}</button>
                        <button @click="handleSureOrder">{{ $t('other.confirm_reservation') }}</button>
                    </template>
                    <template v-else-if="order.orderStatus === 3">
                        <button @click="handleRefuseOrder">{{ $t('other.cancel_the_reservation') }}</button>
                        <button @click="handlePreOrderUsed">{{ $t('other.guest_to_shop') }}</button>
                    </template>
                    <template v-else-if="order.orderStatus === 11">
                        <button @click="handlePreOrderDone">{{ $t('other.guest_departure') }}</button>
                    </template>
                </div>
            </div>
            <div class="right_row">
                <div class="selected_table" v-if="select_type === 'table'">
                    <div class="condition">
                        <div :class="{active: !table_filter}" @click="handleUpdateTableFilter('')">{{ $t('other.all_regions') }}</div>
                        <div :class="{active: table_filter === 'unsmoke'}" @click="handleUpdateTableFilter('unsmoke')">{{ $t('other.non_smoking_area') }}</div>
                        <div :class="{active: table_filter === 'smoke'}" @click="handleUpdateTableFilter('smoke')">{{ $t('other.smoking_area') }}</div>
                        <div :class="{active: table_filter === 'box'}" @click="handleUpdateTableFilter('box')">{{ $t('other.private_room') }}</div>
                    </div>
                    <div class="table_row">
                        <div class="table_row_list" v-for="(item, index) in getFilterTables" :key="index" :class="handleGetTableClass(item)" @click="handleUpdateSelectTable(item)">
                            <div class="table_row_list_title">{{ $t('other.table_number') + ' ' + item.no}}</div>
                            <div class="table_row_list_num">{{ item.siteCount + $t('other.people_table') }}</div>
                            <div class="table_row_list_name">{{item.name | getTableName(lang) }}</div>
                            <div class="table_row_list_smoke">{{ item.allowSmoke ? $t('other.smoking_area') : $t('other.non_smoking_area') }}</div>
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
                            <div class="show_year_month">{{ currentYear + $t('calendar.year') + currentMonth + $t('calendar.month') }}</div>
                            <div class="next_month" @click="handleUpdateMonth('next')">
                                <img src="@/assets/images/add_order_calendar_next.png" alt="">
                            </div>
                        </div>
                        <div class="week_nav">
                            <div>{{ $t('calendar.sunday') }}</div>
                            <div>{{ $t('calendar.monday') }}</div>
                            <div>{{ $t('calendar.tuesday') }}</div>
                            <div>{{ $t('calendar.wednesday') }}</div>
                            <div>{{ $t('calendar.thursday') }}</div>
                            <div>{{ $t('calendar.friday') }}</div>
                            <div>{{ $t('calendar.saturday') }}</div>
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
        <div class="mask" v-if="mask" @click="handleHidePopupAndMask"></div>
        <div class="popup" v-if="popup">
            <div class="p_title">{{ order.orderStatus === 1 ? $t('other.confirm_refuse_guest_order') : $t('other.confirm_cancel_guest_order')}}</div>
            <div class="p_text">{{ order.orderStatus === 1 ? $t('other.refuse_reason') : $t('other.cancel_reason')}}</div>
            <div class="p_tags">
                <div v-for="(item, index) in reasons" :key="index" :class="{ active: item === reason }" @click="handleUpdateReasonText(item)">{{ item }}</div>
            </div>
            <div class="p_btn_group">
                <button @click="handleHidePopupAndMask">{{ $t('other.cancel') }}</button>
                <button @click="handleConfirmCancelOrder">{{ $t('other.confirm') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import { mapGetters } from 'vuex'
    import fetch from '../../utils/fetch'
    import { createCalendar } from "../../utils/common";

    export default {
        name: "order_treated_index",
        data () {
            return {
                orderId: this.$route.query.id,
                order: {},
                orderMerches: [],
                preOrderInfo: {},
                select_day: '',
                select_time: '',
                table_filter: '',
                select_type: '',
                days: [],
                times: [],
                tables: [],
                setting: {},
                select_table: {},
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                confirm: {
                    tableNo: '',
                    date: '',
                    time: ''
                },
                reason: '',
                mask: false,
                popup: false,
                reasons: []
            }
        },
        computed: {
            ...mapGetters(['body']),
            getEatTimeText () {
                let str = moment(String(this.select_day)).format('YYYY/MM/DD') + ' ' + this.select_time;
                return str;
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
            },
            getAreaPreference () {
                let str = '';
                if (this.select_table.allowSmoke === 1) {
                    str += this.$t('other.smoking_area') + ' ';
                } else if (this.select_table.allowSmoke === 0) {
                    str += this.$t('other.non_smoking_area') + ' ';
                } else if (this.select_table.allowSmoke === -1) {
                    str += this.$t('other.not_mind_smoking_area') + ' '
                }
                if (this.select_table.isBox === 1) {
                    str += this.$t('other.private_room');
                } else {
                    str += this.$t('other.non_private_room');
                }
                return str;
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
        created () {
            this.init();
        },
        methods: {
            init () {
                this.handleGetOrderDetail();
                this.handleGetPreOrderSetting();
            },
            handleGetOrderDetail () {
                let api = 'com.ttdtrip.api.order.apis.service.OrderDetailApiService';
                let data = { base: this.body, mid: this.body.myUid, orderId: this.orderId };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.order = r.order;
                    this.orderMerches = r.orderMerches;
                    this.preOrderInfo = r.order.preOrder;
                    if (r.order.preOrder) {
                        let table = { no: r.order.preOrder.tableNo, allowSmoke: r.order.preOrder.allowSmoke, isBox: r.order.preOrder.isBox };
                        this.select_table = Object.assign({}, table);
                        let add_date = moment(String(r.order.preOrder.date));
                        this.currentYear = add_date.year();
                        this.currentMonth = add_date.month() + 1;
                        this.currentDay = add_date.date();
                        this.select_day = add_date.format('YYYYMMDD');
                        this.days = createCalendar(this.currentYear, this.currentMonth, this.currentDay);
                        this.$nextTick(_ => {
                            this.select_time = r.order.preOrder.time;
                        });
                    }
                }).catch(e => {
                    console.error(e);
                })
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
                }).catch(e => {
                    console.error(e);
                })
            },
            // 预订单确认(B端)
            handlePreOrderConfirm (result) {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderConfirmApiService';
                let data = { base: this.body, orderId: this.orderId, mid: this.body.myUid, result };
                if (result) {
                    data.date = this.select_day;
                    data.time = this.select_time;
                    data.tableNo = this.select_table.no;
                } else {
                    data.reason = this.reason;
                }
                fetch.post(api, data).then(r => {
                    console.log(r);
                    if (!result) {
                        // this.back();
                    } else {
                        this.select_type = '';
                    }
                    this.handleGetOrderDetail();
                    this.handleHidePopupAndMask();
                }).catch(e => {
                    console.error(e);
                })
            },
            // 预订单(取消/拒绝)理由
            handlePreOrderReason () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderReasonApiService';
                let data = { base: this.body, mid: this.body.myUid, type: this.order.orderStatus === 1 ? 2 : 1 };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.reasons = r.reasons.split('|');
                }).catch(e => {
                    console.log(e);
                })
            },
            // 客人到店
            handlePreOrderUsed () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderUsedApiService';
                let data = { base: this.body, mid: this.body.myUid, orderId: this.orderId };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.handleGetOrderDetail();
                }).catch(e => {
                    console.log(e);
                })
            },
            // 预订单取消
            handlePreOrderCancel () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderCancelApiService';
                let data = { base: this.body, orderId: this.orderId, mid: this.body.myUid, reason: this.reason };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.handleGetOrderDetail();
                }).catch(e => {
                    console.log(e);
                })
            },
            // 预订单完成(B端) -- 客人离店
            handlePreOrderDone () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderDoneApiService';
                let data = { base: this.body, orderId: this.orderId, mid: this.body.myUid };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.handleGetOrderDetail();
                }).catch(e => {
                    console.log(e);
                })
            },
            // 点击确认预定
            handleSureOrder () {
                if (!this.select_day || !this.select_time) {
                    alert(this.$t('other.choose_dinner_time'));
                } else if (!this.select_table.no) {
                    alert(this.$t('other.choose_table'));
                } else {
                    this.handlePreOrderConfirm(1);
                }
            },
            // 点击拒绝预定
            handleRefuseOrder () {
                this.mask = true;
                this.popup = true;
                this.handlePreOrderReason();
            },
            handleHidePopupAndMask () {
                this.mask = false;
                this.popup = false;
                this.reason = '';
            },
            handleUpdateReasonText (item) {
                this.reason = item;
            },
            handleConfirmCancelOrder () {
                if (this.reason) {
                    if (this.order.orderStatus === 1) {
                        this.handlePreOrderConfirm(0);
                    } else {
                        this.handlePreOrderCancel();
                    }
                } else {
                    alert(this.order.orderStatus === 1 ? this.$t('other.choose_refuse_reason') : this.$t('other.choose_cancel_reason'));
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
                if (this.order.orderStatus === 1) this.select_type = type
            },
            handleUpdateSelectTime (item) {
                this.select_time = item.startTime;
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
    .order_treated_index{
        .main_row{
            display: flex;
            .left_row {
                width: 362px;
                /*height: 100%;*/
                min-height: 694px;
                padding-left: 34px;
                padding-bottom: 20px;
                box-shadow: 0 1px 7px 2px rgba(238, 240, 255, 1);
                box-sizing: border-box;
                .order_detail{
                    margin-top: 32px;
                    .detail_title{
                        display: flex;
                        align-items: center;
                        .order_icon{
                            width: 28px;
                            height: 28px;
                            margin-right: 13px;
                            img{
                                width: 100%;
                                height: 100%;
                                vertical-align: top;
                            }
                        }
                        .title_text{
                            font-size: 25px;
                            line-height: 35px;
                            color: #3B53FF;
                        }
                    }
                    .detail_row{
                        margin-top: 14px;
                        .list{
                            font-size: 18px;
                            line-height: 25px;
                            color: #444145;
                            margin-bottom: 20px;
                            &:last-of-type{
                                margin-bottom: 0;
                            }
                        }
                    }
                }
                .input_row{
                    margin-top: 42px;
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
                .merches{
                    .row {
                        display: flex;
                        align-items: center;
                        margin-top: 20px;
                        .poster {
                            width: 53px;
                            min-width: 53px;
                            height: 53px;
                            border-radius: 5px;
                            overflow: hidden;
                            margin-right: 13px;
                            img {
                                width: 100%;
                                height: 100%;
                                vertical-align: top;
                                object-fit: cover;
                            }
                        }
                        .info {
                            flex: 1;
                            height: 53px;
                            display: flex;
                            justify-content: space-between;
                            flex-direction: row;
                            flex-wrap: wrap;
                            max-width: 221px;
                            .info_name {
                                width: 100%;
                                font-size: 14px;
                                line-height: 20px;
                                color: #4A4A4A;
                            }
                            .info_price{
                                display: flex;
                                align-items: center;
                                .currency {
                                    font-size: 12px;
                                    line-height: 17px;
                                    color: #4A4A4A;
                                    margin-right: 10px;
                                }
                                .price {
                                    font-size: 12px;
                                    line-height: 17px;
                                    color: #D0021B;
                                }
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
                            font-size: 15px;
                            line-height: 21px;
                            padding: 11px 15px;
                            color: #9B9B9B;
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
                    &.flex_center {
                        justify-content: center;
                    }
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
        .mask{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 66;
        }
        .popup{
            position: fixed;
            left: 50%;
            top: 50%;
            width: 409px;
            /*height: 284px;*/
            padding: 49px 45px;
            transform: translate(-50%, -50%);
            background: rgba(255,255,255,1);
            box-shadow: 0 0 6px 4px rgba(206,227,250,0.26);
            border-radius: 4px;
            z-index: 77;
            box-sizing: border-box;
            .p_title{
                font-size: 17px;
                line-height: 24px;
                color: #4A4A4A;
                margin-bottom: 12px;
                text-align: center;
            }
            .p_text{
                font-size: 14px;
                line-height: 20px;
                color: #4A4A4A;
                text-align: center;
                margin-bottom: 20px;
            }
            .p_tags{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                div {
                    font-size: 14px;
                    line-height: 20px;
                    color: #3B53FF;
                    padding: 8px 10px;
                    border: 1px solid #3B53FF;
                    border-radius: 4px;
                    margin-right: 12px;
                    box-sizing: border-box;
                    margin-bottom: 20px;
                    cursor: pointer;
                    &.active{
                        background-color: #3B53FF;
                        color: #fff;
                    }
                }
            }
            .p_btn_group{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
                button {
                    width: 129px;
                    height: 38px;
                    font-size: 14px;
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
    }
</style>
