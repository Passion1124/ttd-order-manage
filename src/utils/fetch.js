/**
 * @Description: axios封装
 * @author Passion
 * @date 2019/4/22
*/

import axios from 'axios'
import { getHeaderJson } from "./common";

/* process.env.NODE_ENV === 'production' ? 'https://api.ttd-trip.com' : 'http://47.99.42.94:8080' */
// 创建axios实例
const service = axios.create({
    baseURL: 'http://47.99.42.94:8080',
    timeout: 20000 // 接口超时时间
});

service.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
});

service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.ret_code === '0000') {
            return Promise.resolve(res)
        } else {
            alert(res.ret_msg);
            return Promise.reject(res);
        }
    },
    error => {
        console.log('error_response:');
        return Promise.reject(error)
    }
);

const fetch = {
    post (api, data) {
        return service({
            url: '/gateway/',
            method: 'post',
            data,
            headers: getHeaderJson({ apiname: api, data: data })
        })
    },
    get (api, data) {
        return service({
            url: '/gateway/',
            method: 'get',
            data,
            headers: getHeaderJson({ apiname: api, data: data })
        })
    }
};

export default fetch
