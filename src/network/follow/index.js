import {request} from '../request';
import store from "@/store";
//关注用户
export function followUser(userId)
{
    return request({
        url:'/user/follow',
        params:{
            userId
        },
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token
        }
    })
}
//取消关注
export function cancelFollow(userId)
{
    return request({
        url:'/user/follow/cancel',
        params:{
            userId
        },
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token
        }
    })
}