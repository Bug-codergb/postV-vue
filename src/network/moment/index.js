import {request} from '../request';
import store from '../../store/index'
export function publishMoment(momentId=new Date().getTime(),title,cate,content)
{
    return request({
        url:'/moment/add',
        method:'post',
        headers:{
          'authorization':store.state.userMsg.token
        },
        data:{
            momentId,
            title,
            content,
            cate
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
//为动态配图
export function momentPic(forData,momentId)
{
    return request({
        url:'/upload/moment/picture',
        method:'post',
        headers:{
            'Content-type':'multipart/form-data',
            'authorization':store.state.userMsg.token
        },
        data:forData,
        params:{
            momentId
        }
    })
}
export function delMomentPic(id)
{
    return request({
        url:'/delete/moment/picture',
        headers:{
            'authorization':store.state.userMsg.token
        },
        method:'post',
        params:{
            id
        }
    })
}
//推荐动态
export function recMoment()
{
    return request({
        url:'/moment/recommend',
    })
}
//动态点击
export function momentView(momentId)
{
    return request({
        url:'/view',
        method:"post",
        headers:{
            'authorization':store.state.userMsg.token
        },
        params:{
            momentId
        }
    })
}
//推荐分类下动态
export function getCateMsg(categoryId)
{
    return request({
        url:'/moment/hot',
        params:{
            categoryId
        }
    })
}
//收藏动态
export function subMoment(momentId,userId)
{
    return request({
        url:'/moment/sub',
        method:'post',
        params:{
            momentId,
            userId
        },
        headers:{
            'authorization':store.state.userMsg.token
        }
    })
}
//取消动态收藏
export function cancelSubMoment(momentId,userId)
{
    return request({
        url:'/moment/cancel',
        method:"post",
        headers:{
            'authorization':store.state.userMsg.token
        },
        params:{
            momentId,
            userId
        }
    })
}
//获取动态点赞收藏评论数
export function getMomentCount(momentId)
{
    return request({
        url:'/moment/detail/count',
        params:{
            momentId
        }
    })
}