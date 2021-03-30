import {request} from '../request';
export function getNewBanner()
{
    return request({
        url:'/banner/new',
    })
}