/**
 * @Description: auth.js
 * @author Passion
 * @date 2019/4/26
*/

const USER_KEY = 'USER';

export function getUserInfo() {
    const info = sessionStorage.getItem(USER_KEY);
    return info ? JSON.parse(info) : ''
}

export function setUserInfo(info) {
    sessionStorage.setItem(USER_KEY, info);
}

export function clearLocalCacheData() {
    sessionStorage.clear();
}
