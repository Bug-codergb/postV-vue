import {request} from '../request';
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
//获取专栏榜单详情
export function getSpcolumnTop(cateId=1616757439494){
    return request({
        url:"/toplist/spcolumn",
        params:{
            cateId
        }
    })
}
//获取其它榜单详情
export function getToplist(cateId){
    return request({
        url:"/toplist",
        params:{
            cateId
        }
    })
}