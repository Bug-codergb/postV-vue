import {request} from '../request';
export function getAllMovie(offset,limit)
{
    return request({
        url:'/movie/all',
        params:{
            offset,
            limit
        }
    })
}