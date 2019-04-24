<template>
    <div class="add_order_index">
        <div class="common_header">
            <div class="common_title">预约详情</div>
            <div class="back_arrow">
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
                    <div class="order_people">
                        <div class="label_row">
                            <div class="circular">
                                <img class="order_people" src="@/assets/images/order_people.png" alt="">
                            </div>
                            <div class="label_text text_three">预定人</div>
                        </div>
                        <div class="input_box">
                            <input type="text" placeholder="">
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
                            <input type="text" placeholder="">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add_order_index"
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
                }
            }
        }
    }

</style>
