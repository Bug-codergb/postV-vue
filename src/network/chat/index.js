import {request} from "@/network/request";
//获取所有聊天记录
export function getAllChatUserMsg(userId,sideId)
{
    return request({
        url:"/chat/all",
        params:{
            userId,
            sideId
        }
    })
}