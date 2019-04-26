/**
 * @Description: 路由拦截和处理
 * @author Passion
 * @date 2019/4/26
*/

import router from './router'
import store from './store'
import { getUserInfo } from "./utils/auth";

const whiteList = ['/login']; // 不重定向白名单

router.beforeEach((to, form, next) => {
    if (getUserInfo()) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (store.getters.body.myUid) {
                next()
            } else {
                let data = Object.assign(store.getters.body, { myUid: getUserInfo().merchantOPInfo.mid });
                store.dispatch('updateBody', data);
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登陆名单中，直接进入
            next()
        } else {
            next('/login')
        }
    }
});

router.afterEach((to, form, next) => {
    // document.title = to.meta.title
});
