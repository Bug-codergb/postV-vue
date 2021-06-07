import {request} from "../request";
import store from "../../store";
//获取用户关注用户
export function getUserFollow(){
    return request({
        url:"/dynamic/user",
        method:"post",
        headers:{
            "authorization":store.state.userMsg.token
        }
    })
}