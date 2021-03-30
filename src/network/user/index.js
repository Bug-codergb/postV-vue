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