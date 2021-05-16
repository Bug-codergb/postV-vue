import {request} from "../request";
//获取所有分类
export function getAllCate(){
    return request({
        url:'/channel/cate/all'
    })
}