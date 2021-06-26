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
//设置用户简介
export function setUserDesc(content)
{
    return request({
        url:'/user/desc',
        method:'post',
        data:{
            content
        },
        headers:{
            'authorization':store.state.userMsg.token,
        }
    })
}
//获取用户其它专栏
export function getUserSpColumn(userId){
    return request({
        url:"/user/spcolumn",
        params:{
            userId
        }
    })
}
//用户上线
export function goesOnline(online=0){
    return request({
        url:"/user/online",
        method:"post",
        data:{
          online
        },
        headers:{
            'authorization':store.state.userMsg.token,
        }
    })
}
//用户已读信息
export function readMsg(userId){
    return request({
        url:"/message/read",
        method:"post",
        data:{
          userId
        },
        headers:{
            'authorization':store.state.userMsg.token,
        }
    })
}