import {request} from '../request';
//获取热门Banner
export function getHotBanner()
{
    return request({
        url:'/banner/hot'
    })
}
//获取热门推荐课程
export function getHotKnow(offset,limit)
{
    return request({
        url:'/knowledge/all',
        params:{
            offset,limit
        }
    })
}
//获取课程下内容
export function getHotKnowContent(kid)
{
    return request({
        url:'/knowledge/detail',
        params:{
            kid
        }
    })
}
//获取课程URL
export function getKnowUrl(id)
{
    return request({
        url:'/knowledge/url',
        params:{
            id
        }
    })
}