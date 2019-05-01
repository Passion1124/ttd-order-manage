<template>
    <div class="table_preview_index">
        <div class="common_header">
            <div class="common_title">桌台预览</div>
            <div class="back_arrow" @click="back">
                <img src="@/assets/images/back_arrow.png" alt="">
            </div>
        </div>
        <div class="filter_condition">
            <div class="date">
                <div class="date_show" @click="handleShowDateInput">
                    <div class="value_show">{{ getFullDate }}</div>
                    <img :class="{rotate: show.calendar}" src="@/assets/images/bottom_arrow.png" alt="">
                </div>
                <div class="calendar_date_box" v-if="show.calendar">
                    <div class="calendar_nav">
                        <div class="pre" @click="handleUpdateMonth('pre')">
                            <img src="@/assets/images/add_order_calendar_pre.png" alt="">
                        </div>
                        <div class="calendar_text">{{ currentYear }}年{{ currentMonth }}月</div>
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
                        <div v-for="(item, index) in days" :key="index" :class="{isCurrent: item.isNowMonth }">
                            <template v-if="item.isNowMonth">
                                <div class="day" :class="{ now: select_day === getFullDays(item) }" @click="handleUpdateSelectDay(item)">{{item.day >= 10 ? item.day : '0' + item.day }}</div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="area">
                <div class="area_show" @click="handleShowSelect">
                    <div class="value_show">{{ getSelectText }}</div>
                    <img :class="{rotate: show.select}" src="@/assets/images/bottom_arrow.png" alt="">
                </div>
                <div class="area_select_box" v-if="show.select">
                    <div v-for="(item, index) in area_arr" :key="index" v-if="item.value !== table_filter" @click="handleUpdateTableFilter(item)">{{ item.label }}</div>
                </div>
            </div>
        </div>
        <div class="table_row">
            <div class="table_row_list" v-for="(item, index) in getFilterTables" :key="index" :class="handleGetTableClass(item)">
                <div class="table_row_list_title">桌台号 {{item.no}}</div>
                <div class="table_row_list_num">{{item.siteCount}}人桌</div>
                <div class="table_row_list_name">{{item.name}}</div>
                <div class="table_row_list_daily_schedule" v-if="item.dailySchedules.length">
                    <div v-for="(i, sIndex) in item.dailySchedules" :key="sIndex">{{ i }}</div>
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

    export default {
        name: "table_preview_index",
        data () {
            return {
                table_list: [],
                table_filter: '',
                area_arr: [
                    { label: '全部区域', value: '' },
                    { label: '吸烟区', value: 'smoke' },
                    { label: '非吸烟区', value: 'unsmoke' },
                    { label: '包间', value: 'box' }
                ],
                select_day: '',
                days: [],
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                show: {
                    calendar: false,
                    select: false
                }
            }
        },
        computed: {
            ...mapGetters(['body']),
            getFullDate () {
                return this.select_day ? moment(this.select_day).format('YYYY-MM-DD') : '';
            },
            getFilterTables () {
                if (!this.table_filter) {
                    return this.table_list
                } else {
                    return this.table_list.filter(item => {
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
            getSelectText () {
                let find = this.area_arr.find(item => item.value === this.table_filter);
                return find ? find.label : '';
            }
        },
        watch: {
            select_day (val) {
                this.show.calendar = false;
                this.handlePreOrderTableSchedule();
            },
            table_filter () {
                this.show.select = false;
            }
        },
        created () {
            this.init();
        },
        methods: {
            init () {
                this.select_day = moment().format('YYYYMMDD');
                this.currentYear = moment().year();
                this.currentMonth = moment().month() + 1;
                this.currentDay = moment().date();
                this.days = createCalendar(this.currentYear, this.currentMonth, this.currentDay);
            },
            // 预订单桌台日计划v2
            handlePreOrderTableSchedule () {
                let api = 'com.ttdtrip.api.order.apis.service.PreOrderTableScheduleApiService';
                let data = { base: this.body, mid: this.body.myUid, date: this.select_day };
                fetch.post(api, data).then(r => {
                    console.log(r);
                    this.table_list = r.schedules;
                }).catch(e => {
                    console.error(e);
                })
            },
            handleUpdateMonth (type) {
                let full_date = this.currentYear + formatNumber(this.currentMonth) + formatNumber(this.currentDay);
                let date = '';
                if (type === 'pre') {
                    date = moment(full_date).subtract(1, 'months');
                } else if (type === 'next') {
                    date = moment(full_date).add(1, 'months');
                }
                this.currentYear = date.year();
                this.currentMonth = date.month() + 1;
                this.days = createCalendar(this.currentYear, this.currentMonth, this.currentDay);
            },
            handleUpdateTableFilter (item) {
                this.table_filter = item.value;
            },
            handleUpdateSelectDay (item) {
                this.select_day = this.getFullDays(item);
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
            handleShowDateInput () {
                this.show.calendar = !this.show.calendar;
                if (this.show.calendar) this.show.select = false;
            },
            handleShowSelect () {
                this.show.select = !this.show.select;
                if (this.show.select) this.show.calendar = false;
            },
            getFullDays (obj) {
                let month = obj.months < 10 ? '0' + obj.months : obj.months;
                let day = obj.day < 10 ? '0' + obj.day : obj.day;
                let str = '' + obj.year + month + day;
                return str;
            },
            back () {
                this.$router.go(-1);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .table_preview_index{
        .filter_condition{
            display: flex;
            align-items: center;
            width: 100%;
            height: 59px;
            background-color: #fff;
            box-shadow:0 1px 7px 2px rgba(238,240,255,1);
            border-radius:1px;
            padding-left: 35px;
            box-sizing: border-box;
            .rotate {
                transform: rotate(180deg);
            }
            .date {
                position: relative;
                width: 130px;
                height: 27px;
                margin-right: 46px;
                .date_show{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    .value_show{
                        font-size: 19px;
                        line-height: 27px;
                        color: #4A4A4A;
                    }
                    img {
                        width: 13px;
                        height: 9px;
                        /*transition: all .3s linear;*/
                    }
                }
                .calendar_date_box{
                    position: absolute;
                    left: 0;
                    top: 36px;
                    width: 375px;
                    height: 291px;
                    background-color: #fff;
                    box-shadow:0 3px 8px 4px rgba(219,236,255,0.68);
                    z-index: 99;
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
            .area {
                position: relative;
                width: 94px;
                height: 27px;
                .area_show{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    .value_show{
                        font-size: 18px;
                        line-height: 25px;
                        color: #4A4A4A;
                    }
                    img {
                        width: 13px;
                        height: 9px;
                        /*transition: all .3s linear;*/
                    }
                }
                .area_select_box{
                    position: absolute;
                    left: 0;
                    top: 36px;
                    width: 114px;
                    height: 120px;
                    background-color: #fff;
                    box-shadow: 0 0 9px 2px rgba(169,180,255,0.21);
                    border-radius: 4px;
                    padding: 8px;
                    z-index: 9;
                    box-sizing: border-box;
                    >div {
                        width: 100%;
                        height: 30px;
                        font-size: 16px;
                        line-height: 30px;
                        padding-left: 9px;
                        /*background-color: #C3DFFE;*/
                        margin-bottom: 5px;
                        border-right: 4px;
                        color: #000;
                        border-radius: 4px;
                        box-sizing: border-box;
                        &:last-of-type{
                            margin-bottom: 0;
                        }
                        &:hover{
                            background-color: #C3DFFE;
                        }
                    }
                }
            }
        }
        .table_row{
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 25px 8px;
            box-sizing: border-box;
            .table_row_list{
                position: relative;
                width: 201px;
                height: 185px;
                background-size: cover;
                background-repeat: no-repeat;
                margin: 0 0 10px 0;
                padding: 0 18px 0 28px;
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
                .table_row_list_daily_schedule{
                    width: 100%;
                    height: 50px;
                    margin-top: 10px;
                    overflow-y: auto;
                    >div {
                        font-size: 15px;
                        line-height: 21px;
                        color: #fff;
                        margin-bottom: 4px;
                    }
                }
            }
        }
    }
</style>
