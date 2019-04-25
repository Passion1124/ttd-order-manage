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
                <div class="date_show">
                    <div class="value_show">年/月/日</div>
                    <img src="@/assets/images/bottom_arrow.png" alt="">
                </div>
                <input type="date">
            </div>
            <div class="area">
                <div class="area_show">
                    <div class="value_show">全部区域</div>
                    <img src="@/assets/images/bottom_arrow.png" alt="">
                </div>
                <select>
                    <option>全部区域</option>
                    <option>吸烟区</option>
                    <option>非吸烟区</option>
                    <option>包间</option>
                </select>
            </div>
        </div>
        <div class="table_row">
            <div class="table_row_list box_smoke">
                <div class="table_row_list_title">桌台号 4</div>
                <div class="table_row_list_num">4人桌</div>
                <div class="table_row_list_name">桌台名称</div>
                <div class="table_row_list_smoke">吸烟区</div>
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
</template>

<script>
    export default {
        name: "table_preview_index",
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
            .date {
                position: relative;
                width: 130px;
                height: 27px;
                margin-right: 46px;
                .date_show{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    z-index: 9;
                    .value_show{
                        font-size: 19px;
                        line-height: 27px;
                        color: #4A4A4A;
                    }
                    img {
                        width: 13px;
                        height: 9px;
                    }
                }
                input {
                    width: 100%;
                    font-size: 19px;
                    line-height: 27px;
                    border: 0;
                }
            }
            .area {
                position: relative;
                width: 94px;
                height: 27px;
                select {
                    width: 100%;
                    height: 100%;
                    border: 0;
                    font-size: 18px;
                }
                .area_show{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    z-index: 9;
                    .value_show{
                        font-size: 18px;
                        line-height: 25px;
                        color: #4A4A4A;
                    }
                    img {
                        width: 13px;
                        height: 9px;
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
</style>
