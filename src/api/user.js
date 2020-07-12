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
export function getUserRecommend(data) {
    return fetch( {
        url: 'user/getRecommend',
        method: 'post',
        data
    })
}

export function toggleFocus(data) {
    return fetch( {
        url: 'user/toggle_focus',
        method: 'post',
        data
    })
}
// 通过id获取用户基本信息
export function getUserInfoById(data) {
    return fetch( {
        url: 'user/getUserInfoById',
        method: 'post',
        data
    })
}
// 修改个人信息
export function editInfo(data) {
    return fetch( {
        url: 'user/editInfo',
        method: "post",
        data
    })
}