import fetch from "../utils/fetch"

export function uploadSingle(data) {
    return fetch({
        url: 'upload/single',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
export function uploadMultiple(data) {
    return fetch({
        url: 'upload/multiple',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}