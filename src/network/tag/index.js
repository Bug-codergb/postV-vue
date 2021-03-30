import {request} from '../request';
import store from '../../store/index'
export function addTag(momentId,tagName)
{
    return request({
        url:'/tag/moment',
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token
        },
        data:{
            tagName,
        },
        params:{
            momentId,
        }
    })
}
//删除某一动态tag
export function deleteTag(momentId,tagId)
{
    return request({
        url:'/tag/moment/delete',
        method:'post',
        params:{
            momentId,
            tagId
        },
        headers:{
            'authorization':store.state.userMsg.token
        }
    })
}
