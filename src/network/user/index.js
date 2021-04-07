import {request} from '../request';
import store from "@/store";
export function userMoment(userId)
{
    return request({
        url:'/user/moment',
        params:{
            userId
        }
    })
}
export function userDetail(userId)
{
    return request({
        url:'/user/detail',
        params:{
            userId
        }
    })
}
//获取推荐用户
export function recommendUser()
{
    return request({
        url:'/user/recommend',
    })
}
//用户头像上传
export function uploadAvatar(file)
{
    return request({
       url:'/upload/avatar',
        data:file,
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token,
            'Content-type':'multipart/form-data',
        }
    })
}
//获取用户收藏
export function getUserSub(userId)
{
    return request({
        url:'/user/sub',
        params:{
            userId
        }
    })
}
//获取用户加入的专题
export function getUserJoinTopic(userId)
{
    return request({
        url:'/user/topic/join',
        params:{
            userId
        }
    })
}