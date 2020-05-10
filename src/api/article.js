import fetch from '../utils/fetch'
// 添加文章
export function articleAdd(data) {
    return fetch({
        url: 'article/add',
        method: 'post',
        data
    })
}
// 获取文章列表
export function getArticle(data) {
    return fetch({
        url: 'article/getArticle',
        method: 'post',
        data
    })
}
// 增加阅读量
export function addReadNums(data) {
    return fetch({
        url: 'article/addReadNums',
        method: 'post',
        data
    })
}
// 获取文章内容
export function getArticleDetail(data) {
    return fetch({
        url: 'article/getArticleDetail',
        method: 'post',
        data
    })
}
// 点赞文章
export function likeArticle(data) {
    return fetch({
        url: 'article/likeArticle',
        method: 'post',
        data
    })
}