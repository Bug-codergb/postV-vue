import {request} from '../request';
import store from "@/store";
export function addTopic(name)
{
    return request({
        url:'/topic',
        method:"post",
        data:{
            name
        },
        headers:{
            'authorization':store.state.userMsg.token
        }
    })
}
export function getAllTopic(offset,limit)
{
    return request({
        url:"/topic/all",
        params:{
            offset,limit
        }
    })
}
export function delTopic(topicId)
{
    return request({
        url:'/topic/delete',
        params:{
            topicId
        },
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token
        }
    })
}
/*为专题添加内容*/
export function addContent(topicId,title,content)
{
    console.log(title,content)
    return request({
        url:'/topic/content',
        method:'post',
        params:{
            topicId
        },
        data:{
            title,
            content
        },
        headers:{
            'authorization':store.state.userMsg.token
        }
    })
}
export function addContentImg(topic_content_Id,formData)
{
    return request({
        url:'/topic/content/img',
        data:formData,
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token,
            'Content-type':'multipart/form-data',
        },
        params:{
            topic_content_Id
        }
    })
}
export function getAllVideoCate()
{
    return request({
        url:'/video/cate/all'
    })
}
//为视频添加cate
export function addCateForVio(vid,categoryId)
{
    return request({
        url:'/video/cate',
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token,
        },
        data:{
            categoryId
        },
        params:{
            vid
        }
    })
}
//删除专题下的内容
export function delTopicContent(id)
{
    return request({
        url:'/topic/content/delete',
        method:'post',
        params:{
            id
        },
        headers:{
            'authorization':store.state.userMsg.token,
        }
    })
}
//获取所有未审核动态
export function getAllCheckMoment()
{
    return request({
        url:'/check/moment/all'
    })
}
//上传movie
export function uploadMovie(formData)
{
    return request({
        url:'/movie/upload',
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token,
            'Content-type':'multipart/form-data',
        },
        data:formData,
    })
}
//上传movie图片
export function uploadMovieImg(formData,movieId)
{
    return request({
        url:'/movie/img/upload',
        method:'post',
        headers:{
            'authorization':store.state.userMsg.token,
            'Content-type':'multipart/form-data',
        },
        data:formData,
        params:{
            movieId:JSON.stringify(movieId)
        }
    })
}