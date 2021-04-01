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