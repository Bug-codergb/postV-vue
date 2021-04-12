import {request} from "@/network/request";
export function getAllAdvert(offset,limit)
{
    return request({
        url:'/advert/all',
        params:{
            offset,
            limit
        }
    })
}