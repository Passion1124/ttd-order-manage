/**
 * @Description: getters.js
 * @author Passion
 * @date 2019/4/26
*/

const getters = {
    body: state => state.statics.body,
    lang: state => state.statics.body.language
};

export default getters
