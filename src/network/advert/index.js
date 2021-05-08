import {request} from "../request"
export function getAllAdvert(offset=0,limit=30)
{
    console.log("all")
    return request({
        url:'/advert/all',
        params:{
            offset,
            limit
        }
    })
}