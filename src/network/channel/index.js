import {request} from "../request";
import store from "@/store";
//获取所有分类
export function getAllCate(){
    return request({
        url:'/channel/cate/all'
    })
}
//添加频道内容
export function addChannelCon(title,content,cateId){
    return request({
        url:'/channel',
        method:"post",
        headers:{
            'authorization':store.state.userMsg.token
        },
        data:{
            cateId,
            content,
            title,
        }
    })
}
//上传频道封面
export function uploadCover(formData,cId){
  return request({
      url:"/channel/upload/cover",
      method:"post",
      data:formData,
      params:{
          cId
      },
      headers:{
          'Content-type':'multipart/form-data',
          'authorization':store.state.userMsg.token
      },
  })
}
//上传视频
export function uploadChannelVio(formData,cId){
    return request({
        url:"/channel/video",
        method:"post",
        data:formData,
        params:{
            cId
        },
        headers:{
            'Content-type':'multipart/form-data',
            'authorization':store.state.userMsg.token
        },
    })
}
//获取分类子类
export function getChannelCateCon(id){
    return request({
        url:"/channel/cate/con",
        params:{
            id
        }
    })
}
