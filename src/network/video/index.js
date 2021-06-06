import {request} from '../request';
import store from "../../store";
//上传视频
export function uploadVio(formData,momentId)
{
    return request({
        url:'/video/upload',
        method:'post',
        headers:{
            'Content-type':'multipart/form-data',
            'authorization':store.state.userMsg.token
        },
        data:formData,
        params:{
            momentId
        }
    })
}
//上传视频图片
export function uploadVioImg(formData,vid)
{
    return request({
        url:"/video/img",
        method:'post',
        headers: {
            'Content-type': 'multipart/form-data',
            'authorization': store.state.userMsg.token
        },
        data:formData,
        params:{
            vid
        }
    })
}
export function getAllVideo(limit,offset)
{
    return request({
        url:'/video/all',
        params:{
            limit,
            offset
        }
    })
}
//获取视频详情
export function getVideoDetail(vid)
{
    return request({
        url:'/video/detail',
        params:{
            vid
        }
    })
}
//增加视频点击量
export function addVideoPlayCouont(vid)
{
    return request({
        url:'/video/add/playCount',
        method:'post',
        params:{
            vid
        }
    })
}
//获取所有视频分类
export function getAllVideoCate()
{
    return request({
        url:'/video/cate/all'
    })
}
//获取分类下视频
export function getCateVideo(categoryId)
{
    return request({
        url:'/video/cate',
        params:{
            categoryId
        }
    })
}
//获取推荐视频
export function getRecommendVio()
{
    return request({
        url:'/video/commend',
    })
}
//获取视频banner
export function getVideoBanner(cateId,offset=0,limit=30){
    return request({
        url:"/video/banner",
        params:{
            cateId,
            offset,
            limit
        }
    })
}