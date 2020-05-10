import fetch from "@/utils/fetch"
export function add(data) {
    return fetch({
        url: 'zhuanlan/add',
        method: 'post',
        data
    })
}