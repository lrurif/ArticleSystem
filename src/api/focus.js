import fetch from '../utils/fetch'
// 添加关注专栏、作者、文章
export function getFocusData(data) {
    return fetch({
        url: 'focus/get_article',
        method: 'post',
        data
    })
}