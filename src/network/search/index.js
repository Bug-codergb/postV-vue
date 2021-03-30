import {request} from '../request';
export function search(keyword)
{
    return request({
        url:"/search",
        params:{
            keyword
        }
    })
}