export default {
    state: {
        userId: '',
        userName: ''
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
        setUserName(state,name) {
            state.userName = name;
        }

    }
}