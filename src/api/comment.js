import fetch from "../utils/fetch"

export function commentAdd(data) {
    return fetch({
        url: 'comment/add',
        method: "post",
        data
    })
}
export function getAllComments(data) {
    return fetch({
        url: 'comment/getAllComments',
        method: 'post',
        data
    })
}
export function toggleZan(data) {
    return fetch({
        url: 'comment/toggleThumbUp',
        method: 'post',
        data
    })
}