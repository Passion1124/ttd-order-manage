import md5 from 'js-md5'
import store from '../store'

export function getHeaderJson(opt) {
    let headers = {
        'Content-Type': 'application/json',
        'X-Ca-Appid': 'ttd1',
        'X-Ca-Version': '1.0',
        'X-Ca-Api': opt.apiname,
        'X-Ca-Timestamp': new Date().getTime(),
        'X-Ca-Nonce': 'e807f1fcf82d132f9byh987bjn98', //随便给个
        'X-Ca-Signature': '',
        'X-Ca-Signature-Headers': 'X-Ca-Appid,X-Ca-Nonce,X-Ca-Timestamp,X-Ca-Version',
        'Accept': 'application/json'
    };
    let defaultOption = {
        type: "POST",
        url: process.env.BASE_URL,
        data: {},
        async: true,
        timeout: 20000,
        dataType: "json"
    };
    let option = Object.assign(defaultOption, opt);
    option.data['base'] = store.getters.body;
    headers['Content-MD5'] = md5(JSON.stringify(option.data));
    headers['X-Ca-Signature'] = getSignature(headers);
    return headers;
}

function getHeaders(headers) {
    let params = headers['X-Ca-Signature-Headers'].split(',');
    let result = '';
    for (let i = 0; i < params.length; i++) {
        let headerKey = params[i];
        result += headerKey + ":" + headers[headerKey] + "\n";
    }
    return result;
}

function getSignature(headers) {
    let Headers = getHeaders(headers);
    let Path = '/gateway/';
    let Accept = headers['Accept'];
    let ContentType = headers['Content-Type'];
    let dateTime = headers['Date'];
    let ContentMD5 = headers['Content-MD5'];
    let appSecret = 'ttdscret';
    let stringToSign = 'POST' + "\n" +
        Accept + "\n" +
        ContentMD5 + "\n" +
        ContentType + "\n" +
        dateTime + "\n" +
        Headers +
        Path;
    let signed = md5(stringToSign + appSecret);
    return signed;
}

// 是否为闰年
function is_leap(year) {
    return ( year % 100 === 0 ?(year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0));
}
// 创建一个月的日历
export function createCalendar (year, month, day){
    let days = [];
    let nstr1 = new Date(year, month-1, 1);  //当月第一天
    let firstDay = nstr1.getDay();   //当月第一天是星期几
    let m_days = [31,28+is_leap(year),31,30,31,30,31,31,30,31,30,31]; //各月份的总天数
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
                    days.push({id:id++, day:lastDays++, months: month - 1, year, isNowMonth:false, month:'last', checked:false})
                    //月份为1
                }else if(month === 1){
                    days.push({id:id++,day:lastDays++, months: month - 1, year, isNowMonth:false,month:'last',checked:false})
                }
                //下一个月的开始几天
            }else if(date_str > m_days[lastMonth]){
                //月份在1到12之间
                if(month < 12 && month >= 1){
                    days.push({id:id++,day:s++, months: month + 1, year,isNowMonth:false,month:'next',checked:false})
                    //月份为12
                }else if(month === 12){
                    days.push({id:id++,day:s++, months: month + 1, year, isNowMonth:false,month:'next',checked:false})
                }
                //当前月份
            }else{
                days.push({id:id++, day:date_str, months: month, year, isNowMonth:true, month:'now', checked:false})
            }
        }
    }
    return days
}

export function md5Result(val) {
    return md5(val);
}
