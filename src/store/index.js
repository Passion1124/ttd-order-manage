/**
 * @Description: vue-store
 * @author Passion
 * @date 2019/4/26
*/

import Vue from 'vue'
import Vuex from 'vuex'
import statics from './modules/statics'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        statics
    },
    getters
});

export default store
