import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store'
import messages from './langs'

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: store.getters.lang,
    messages
});

export default i18n
