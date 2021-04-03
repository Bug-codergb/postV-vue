import {request} from "@/network/request";
import store from "@/store";
export function checkMoment(momentId)
{
    return request({
        url:'/check/moment',
        method:'post',
        params:{
            momentId
        },
        headers:{
            'authorization':store.state.userMsg.token,
        }
    })
}
//删除动态
export function delMoment(id)
{
    return request({
        url:'/moment/delete',
        params:{
            momentId:id
        },
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token
        },
    })
}