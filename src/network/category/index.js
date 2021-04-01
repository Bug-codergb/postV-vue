import {request} from '../request'
export function getCateDetail(id)
{
    return request({
        url:'/cate/detail',
        params:{
            categoryId:id
        }
    })
}