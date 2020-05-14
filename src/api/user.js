import fetch from "../utils/fetch"

export function login(data) {
    return fetch({
        url: 'user/login',
        method: 'post',
        data
    })
}
export function register(data) {
    return fetch({
        url: 'user/register',
        method: 'post',
        data
    })
}
export function getUserRecommend() {
    return fetch( {
        url: 'user/getRecommend',
        method: 'post'
    })
}