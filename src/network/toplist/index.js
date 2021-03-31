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
/*获取榜单分类下详情*/
export function getTopListDetail(categoryId)
{
    return request({
        url:'/toplist/detail',
        params:{
            categoryId
        }
    })
}
