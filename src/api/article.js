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
export function getCollectArticle(data) {
    return fetch({
        url: 'collect/getCollectArticle',
        method: 'post',
        data
    })
}
// 获取浏览历史
export function getBrowsingArticle(data) {
    return fetch({
        url: 'article/getBrowsingArticle',
        method: 'post',
        data
    })
}
// 新增或修改浏览历史
export function addBrowsingHistory(data) {
    return fetch({
        url: 'article/addBrowsingHistory',
        method: 'post',
        data
    })
}
// 新增s收藏文章
export function addCollection(data) {
    return fetch({
        url: 'article/addCollection',
        method: 'post',
        data
    })
}
// 取消收藏文章
export function cancelCollection(data) {
    return fetch({
        url: 'article/cancelCollection',
        method: 'post',
        data
    })
}
// 获取可投稿文章
export function getSubmitArticle(data) {
    return fetch({
        url: 'article/getSubmitArticle',
        method: 'post',
        data
    })
}