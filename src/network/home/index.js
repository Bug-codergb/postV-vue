import {request} from '../request';
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