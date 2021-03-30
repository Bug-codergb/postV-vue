import {request} from '../request'
export function getAllTopic(offset,limit)
{
    return request({
        url:'/topic/all',
        params:{
            offset,
            limit
        }
    })
}
export function getAllTopicContent(topicId,offset,limit)
{
    return request({
        url:'/topic/content',
        params:{
            topicId,
            offset,
            limit
        }
    })
}