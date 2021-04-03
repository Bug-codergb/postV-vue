import {request} from '../request';
//获取最新动态
export function allMoments()
{
    return request({
        url:'moment/all',
        params:{
            offset:0,
            limit:15
        }
    })
}
//获取动态详情
export function momentDetail(momentId)
{
    return request({
        url:'/moment',
        params:{
            momentId
        }
    })
}