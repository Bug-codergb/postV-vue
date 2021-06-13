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
//获取分类子分类
export function getAllCateCon(cateId){
    return request({
        url:"/cate/all/con",
        params:{
            cateId
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