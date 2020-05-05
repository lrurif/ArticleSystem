import Vue from 'vue'
import vuex from 'vuex'
import user from './module/user'
Vue.use(vuex)

export default new vuex.Store({
    modules: {
        user
    }
})