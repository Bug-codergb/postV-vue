import {request} from '../request'
//获取分类下视频
export function getCateDetail(id)
{
    return request({
        url:'/cate/detail',
        params:{
            categoryId:id
        }
    })
}
//获取所有视频分类
export function getAllVideoCate()
{
    return request({
        url:'/video/cate/all',
    })
}