import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
    state: {
        userId: '',
        realName: '',
        avatar: ""
    },
    mutations: {
        setUserId(state,id) {
            state.userId = id;
            localStorage.setItem("store",JSON.stringify(state))
        },
        setRealName(state,name) {
            state.realName = name;
            localStorage.setItem("store",JSON.stringify(state))

        },
        setAvatar(state, value) {
            state.avatar = value;
            localStorage.setItem("store",JSON.stringify(state))
        }
    },
    actions:{ 
        setId({commit},data) {
            commit('setUserId',data)
        },
        setName({commit},data) {
            commit('setRealName',data)
        },
        setHead({commit},data) {
            commit('setAvatar',data)
        },
    }
})