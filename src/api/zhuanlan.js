import fetch from "@/utils/fetch"
export function add(data) {
    return fetch({
        url: 'zhuanlan/add',
        method: 'post',
        data
    })
}
export function getRecommend(data) {
    return fetch({
        url: 'zhuanlan/getRecommend',
        method: 'post',
        data
    })
}
export function getZhuanlanDetail(data) {
    return fetch({
        url: 'zhuanlan/getZhuanlanDetail',
        method: 'post',
        data
    })
}