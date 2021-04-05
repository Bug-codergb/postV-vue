import {request} from '../request';
import store from "@/store";
export function publishCom(content,momentId)
{
    return request({
        url:'/comment',
        method:'post',
        data:{
            content
        },
        headers:{
            'authorization':store.state.userMsg.token
        },
        params:{
            momentId
        }
    })
}
/*回复评论*/
export function replyComment(content,commentId)
{
    return request({
        url:'/comment/reply',
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token
        },
        params:{
            commentId
        },
        data:{
            content
        }
    })
}
//获取评论详情
export function commentDetail(commentId)
{
    return request({
        url:'/comment',
        params:{
            commentId
        }
    })
}
//获取动态评论
export function getMomentCom(momentId)
{
    return request({
        url:'/comment/moment',
        params:{
            momentId
        }
    })
}
//发表专题评论
export function publishTopicCom(topic_content_id,content)
{
    return request({
        url:'/topic/comment',
        method:'post',
        params:{
            topic_content_id
        },
        headers:{
            'authorization':store.state.userMsg.token
        },
        data:{
            content
        }
    })
}
//回复专题评论
export function replyTopicCom(commentId,content)
{
    return request({
        url:'/topic/comment/reply',
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token
        },
        data:{
            content
        },
        params:{
            commentId
        }
    })
}