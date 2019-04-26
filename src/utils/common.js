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
