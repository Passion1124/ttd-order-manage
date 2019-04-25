<template>
    <div class="order_treated_index">
        <div class="common_header">
            <div class="common_title">预约详情</div>
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
                        <div class="title_text">Yema Dong</div>
                    </div>
                    <div class="detail_row">
                        <div class="list"><b>邮箱：</b>622576902@qq.com</div>
                        <div class="list"><b>电话：</b>13222708079</div>
                        <div class="list"><b>区域偏好：</b>吸烟区 包间</div>
                    </div>
                </div>
                <div class="input_row">
                    <div class="eat_time">
                        <div class="label_row">
                            <div class="circular">
                                <img class="time" src="@/assets/images/time.png" alt="">
                            </div>
                            <div class="label_text text_four">用餐时间</div>
                        </div>
                        <div class="input_box">
                            <input type="text" placeholder="">
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
                            <input type="text" placeholder="">
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
                            <input type="text" placeholder="">
                        </div>
                    </div>
                </div>
                <div class="order_explain">
                    <div class="order_explain_title">预约说明：</div>
                    <div class="textarea_row">
                        <textarea></textarea>
                    </div>
                </div>
                <div class="btn_row">
                    <button>取消</button>
                    <button>确认预定</button>
                </div>
            </div>
            <div class="right_row">
                <div class="selected_table">
                    <div class="condition">
                        <div class="active">全部区域</div>
                        <div>非吸烟区</div>
                        <div>吸烟区</div>
                        <div>包间</div>
                    </div>
                    <div class="table_row">
                        <div class="table_row_list unbox_unsmoke">
                            <div class="table_row_list_title">桌台号 4</div>
                            <div class="table_row_list_num">4人桌</div>
                            <div class="table_row_list_name">桌台名称</div>
                            <div class="table_row_list_smoke">吸烟区</div>
                            <div class="table_selected">
                                <img src="@/assets/images/yes.png" alt="">
                            </div>
                        </div>
                        <div class="table_row_list box_smoke">
                            <div class="table_row_list_title">桌台号 4</div>
                            <div class="table_row_list_num">4人桌</div>
                            <div class="table_row_list_name">桌台名称</div>
                            <div class="table_row_list_smoke">吸烟区</div>
                        </div>
                        <div class="table_row_list unbox_smoke">
                            <div class="table_row_list_title">桌台号 4</div>
                            <div class="table_row_list_num">4人桌</div>
                            <div class="table_row_list_name">桌台名称</div>
                            <div class="table_row_list_smoke">吸烟区</div>
                        </div>
                        <div class="table_row_list box_unsmoke">
                            <div class="table_row_list_title">桌台号 4</div>
                            <div class="table_row_list_num">4人桌</div>
                            <div class="table_row_list_name">桌台名称</div>
                            <div class="table_row_list_smoke">吸烟区</div>
                        </div>
                        <div class="table_row_list unbox_smoke">
                            <div class="table_row_list_title">桌台号 4</div>
                            <div class="table_row_list_num">4人桌</div>
                            <div class="table_row_list_name">桌台名称</div>
                            <div class="table_row_list_smoke">吸烟区</div>
                        </div>
                        <div class="table_row_list box_unsmoke">
                            <div class="table_row_list_title">桌台号 4</div>
                            <div class="table_row_list_num">4人桌</div>
                            <div class="table_row_list_name">桌台名称</div>
                            <div class="table_row_list_smoke">吸烟区</div>
                        </div>
                        <div class="table_row_list unbox_smoke">
                            <div class="table_row_list_title">桌台号 4</div>
                            <div class="table_row_list_num">4人桌</div>
                            <div class="table_row_list_name">桌台名称</div>
                            <div class="table_row_list_smoke">吸烟区</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="false"></div>
        <div class="popup" v-if="false">
            <div class="p_title">确认要取消客人的订单吗？</div>
            <div class="p_text">取消理由</div>
            <div class="p_tags">
                <div>客人打电话取消</div>
                <div>今日订满</div>
                <div>菜品不足</div>
            </div>
            <div class="p_btn_group">
                <button>取消</button>
                <button>确认</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "order_treated_index",
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
    .order_treated_index{
        .main_row{
            display: flex;
            .left_row {
                width: 362px;
                height: 100%;
                min-height: 694px;
                padding-left: 34px;
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
                            font-size: 16px;
                            line-height: 23px;
                            color: #4A4A4A;
                            padding-bottom: 4px;
                            border-bottom: 1px solid #D3EBFF; /* px */
                            box-sizing: border-box;
                            input{
                                width: 100%;
                                height: 100%;
                                border: 0;
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
            height: 284px;
            padding: 49px 45px 0;
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
