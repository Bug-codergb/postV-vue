import {request} from '../request';
export function getToplistPic(offset,limit)
{
    return request({
        url:"/toplist/picture",
        params:{
            offset,
            limit
        }
    })
}
export function getAllCate(offset,limit)
{
    return request({
        url:'/cate/all',
        params:{
            offset,
            limit
        }
    })
}
//获取视频榜单
export function getVideoToplist(offset=0,limit=30)
{
    return request({
        url:'/toplist/video',
        params:{
            offset,
            limit
        }
    })
}