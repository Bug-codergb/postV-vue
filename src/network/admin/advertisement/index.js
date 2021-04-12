import {request} from "@/network/request";
import store from "@/store";
export function getAllAdvert(offset,limit)
{
    return request({
        url:'/advert/all',
        params:{
            offset,
            limit
        }
    })
}
//添加广告
export function addAdvert(title,url)
{
  return request({
      url:'/advert',
      method:'post',
      headers:{
          'authorization':store.state.userMsg.token
      },
      data:{
          title,url
      }
  })
}
//为广告配封面
export function addAdvertImg(formData,advertId)
{
    return request({
        url:'/advert/img',
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token,
            'Content-type':'multipart/form-data',
        },
        params:{
            advertId
        },
        data:formData
    })
}