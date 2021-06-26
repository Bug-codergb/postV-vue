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
//添加子分类
export function addChannelCateCon(cateId,name){
    return request({
        url:"/channel/cate/con",
        method:"post",
        params:{
            cateId
        },
        data:{
          name
        },
        headers:{
            'authorization':store.state.userMsg.token
        },
    })
}
//添加子分类头图
export function addCateConCover(formData,id){
    return request({
        url:"/channel/cate/con/cover",
        data:formData,
        method:"post",
        params:{
            id
        },
        headers:{
            'authorization':store.state.userMsg.token,
            'Content-type':'multipart/form-data',
        },
    })
}
//获取分类下（体育，搞笑）内容
export function getChannelCateDetail(cateId,offset=0,limit=15){
    return request({
       url:"/channel/cate/detail",
        params:{
           cateId,
            offset,
            limit
        }
    })
}
//获取频道内容详情
export function getChannelDetail(cId){
    return request({
        url:"/channel/content/detail",
        params:{
            cId
        }
    })
}
//获取频道播放地址
export function getChannelUrl(cId){
    return request({
        url:"/channel/url",
        params:{
            cId
        }
    })
}
//发表频道内容评论
export function publishChannelComment(cId,content){
    return request({
        url:"/channel/comment",
        method:"post",
        data:{
            cId,
            content,
        },
        headers:{
            'authorization':store.state.userMsg.token,
        },
    })
}
//获取子分类内容详情
export function getCateConDetail(id,offset=0,limit=30){
    return request({
        url:"/channel/cate/con/detail",
        params:{
            id,
            offset,
            limit
        }
    })
}
//获取频道评论内容
export function getChannelComment(cId,offset=0,limit=30){
    return request({
        url:"/channel/comment",
        params:{
            id:cId,
            offset,
            limit
        }
    })
}
//回复频道内容评论
export function replyChannelComment(commentId,content,cId){
    return request({
      url:"/channel/comment/reply",
      method:"post",
      headers:{
          'authorization':store.state.userMsg.token,
      },
      data:{
          commentId,
          content,
          cId,
      }
    })
}
//点赞频道
export function thumbChannel(cId){
    return request({
        url:"/channel/thumb",
        method:"post",
        headers:{
            'authorization':store.state.userMsg.token,
        },
        data:{
            id:cId
        }
    })
}
//取消点赞频道
export function cancelThumbChannel(cId){
    return request({
        url:"/channel/thumb/cancel",
        method:"post",
        headers:{
            'authorization':store.state.userMsg.token,
        },
        data:{
            cId
        }
    })
}
//收藏频道
export function subChannel(id){
    return request({
        url:"/channel/sub",
        method:"post",
        headers:{
            'authorization':store.state.userMsg.token,
        },
        params:{
            id
        }
    })
}
//取消收藏频道
export function cancelChannelSub(id){
    return request({
        url:"/channel/sub/cancel",
        method:"post",
        headers:{
            'authorization':store.state.userMsg.token
        },
        params:{
            id
        }
    })
}