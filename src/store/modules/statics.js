/**
 * @Description: statics.js 静态数据
 * @author Passion
 * @date 2019/4/26
*/

const statics = {
    state: {
        body: {
            language: "zh-cn",
            lat: 0,
            lng: 0,
            currency: 'CNY'
        }
    },
    mutations: {
        SET_BODY: (state, body) => {
            state.body = body
        },
        SET_LANGUAGE: (state, language) => {
            state.body.language = language
        }
    },
    actions: {
        updateBody ({ commit }, data) {
            commit('SET_BODY', data);
        },
        updateLanguage ({ commit }, data) {
            commit('SET_LANGUAGE', data);
        }
    }
};

export default statics
