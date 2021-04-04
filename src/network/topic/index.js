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
//获取专题下内容
export function getTopicContent(topicId,offset,limit)
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
//获取专题下内容详情
export function getTopicContentDetail(topic_content_id)
{
    return request({
        url:'/topic/content/detail',
        params:{
            topic_content_id
        }
    })
}