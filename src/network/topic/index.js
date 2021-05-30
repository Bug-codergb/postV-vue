import {request} from '../request'
import store from "@/store";
//添加专题
export function addTopic(name,desc)
{
    return request({
        url:'/topic',
        method:"post",
        data:{
            name,
            desc
        },
        headers:{
            'authorization':store.state.userMsg.token
        }
    })
}
//为专题配图
export function addTopicImg(topicId,formData)
{
    return request({
        url:'/topic/img',
        data:formData,
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token,
            'Content-type':'multipart/form-data',
        },
        params:{
            topicId
        }
    })
}
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
export function getTopicContent(topicId,offset=0,limit=30)
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
//收藏专题
export function subTopic(topic_content_id)
{
    return request({
        url:'/topic/content/sub',
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token,
        },
        params:{
            topic_content_id
        }
    })
}
//加入专题
export function joinTopic(topicId)
{
    return request({
        url:'/topic/join',
        params:{
            topicId
        },
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token,
        },
    })
}
//获取专题成员
export function getTopicMember(topicId)
{
    return request({
        url:'/topic/member',
        params:{
          topicId
        }
    })
}
//获取推荐专题
export function getRecTopic()
{
    return request({
        url:'/topic/recommend'
    })
}
/*为专题添加内容*/
export function addContent(topic_content_id,topicId,title,content)
{
    return request({
        url:'/topic/content',
        method:'post',
        params:{
            topicId
        },
        data:{
            title,
            content,
            topic_content_id
        },
        headers:{
            'authorization':store.state.userMsg.token
        }
    })
}
export function addContentImg(topic_content_Id,formData)
{
    return request({
        url:'/topic/content/img',
        data:formData,
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token,
            'Content-type':'multipart/form-data',
        },
        params:{
            topic_content_Id
        }
    })
}