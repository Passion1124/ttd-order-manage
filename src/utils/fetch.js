/**
 * @Description: axios封装
 * @author Passion
 * @date 2019/4/22
*/

import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API,
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
        if (res.code === '0000') {
            return Promise.resolve(res)
        } else {
            return Promise.reject(res)
        }
    },
    error => {
        console.log('error_response:');
        return Promise.reject(error)
    }
);

export default service
