/**
 * @Description: 正则表达式
 * @author Passion
 * @date 2019/5/5
*/

// 手机号
export function validateMobile(mobile) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return reg.test(mobile)
}

// 邮箱
export function validateEmail(email) {
    const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return reg.test(email)
}

// 正整数
export function validateValueIsInteger(val) {
    const reg = /^[-\+]?\d+$/;
    return reg.test(val)
}
