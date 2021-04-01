import {request} from '../request'
export function getCateDetail(id,offset=0,limit=15)
{
    return request({
        url:'/cate/detail',
        params:{
            categoryId:id,
            offset,limit
        }
    })
}