import {request} from "@/network/request";
//获取所有专栏分类
export function getAllSpcolumnCate(){
    return request({
        url:"/spcolumn"
    })
}
//获取专栏下分类内容
export function getSpcolumnDetail(cateId,spId,offset=0,limit=30){
    return request({
        url:"/spcolumn/cate/detail",
        params:{
            cateId,
            spId,
            offset,
            limit
        }
    })
}