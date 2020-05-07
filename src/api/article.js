import fetch from '../utils/fetch'

export function articleAdd(data) {
    return fetch({
        url: 'article/add',
        method: 'post',
        data
    })
}
export function getArticle(data) {
    return fetch({
        url: 'article/getArticle',
        method: 'post',
        data
    })
}
export function addReadNums(data) {
    return fetch({
        url: 'article/addReadNums',
        method: 'post',
        data
    })
}
export function getArticleDetail(data) {
    return fetch({
        url: 'article/getArticleDetail',
        method: 'post',
        data
    })
}