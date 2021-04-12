import {request} from "@/network/request";
export function getAllAdvert(offset,limit)
{
    return request({
        url:'/advert/all',
        method:'post',
        params:{
            offset,
            limit
        }
    })
}