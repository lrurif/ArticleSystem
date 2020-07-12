export default {
    state: {
        userId: '',
        realName: ''
    },
    getters: {
        getId(state) {
            return state.userId;
        }
    },
    mutations: {
        setUserId(state,id) {
            state.userId = id;
        },
        setRealName(state,name) {
            state.realName = name;
        }

    }
}