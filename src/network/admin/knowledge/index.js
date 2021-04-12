import {request} from '../../request';
import store from "@/store";
//获取所有课程
export function getAllKnow(offset,limit){
    return request({
        url:'/knowledge/all',
        params:{
            offset,
            limit
        }
    })
}
//获取课程下内容
export function getKnowContent(kid)
{
    return request({
        url:'/knowledge/detail',
        params:{
            kid
        }
    })
}
//获取课程播放地址
export function getKnowUrl(id)
{
    return request({
        url:'/knowledge/url',
        params:{
            id
        }
    })
}
//为课程添加内容
export function addKnowContent(formData,kid)
{
    return request({
        url:'/knowledge/content',
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token
        },
        data:formData,
        params:{
            kid
        }
    })
}
//添加课程
export function addKnow(title,vip,description)
{
    return request({
        url:'/knowledge',
        method:'post',
        data:{
            title,
            vip,
            description
        },
        headers:{
            'authorization':store.state.userMsg.token
        },
    })
}
//为课程配图
export function addKnowPic(formData,kid)
{
    return request({
        url:'/knowledge/img',
        method:'post',
        data:formData,
        params:{
            kid
        },
        headers:{
            'authorization':store.state.userMsg.token,
            'Content-type':'multipart/form-data',
        },
    })
}