import store from '../../store'
//用户详情页
const userDetail=()=>import('../../components/content/userDetail/userDetail')
//动态详情页
const momentDetail=()=>import('../../components/content/momentDetail/MomentDetail')
//视频详情
const videoDetail=()=>import('../../components/content/videoDetail/VideoDetail');
//搜索详情页
const searchDetail=()=>import('../../components/content/searchDetail/SearchDetail');
//话题详情
const topicDetail=()=>import('../../components/content/topicDetail/TopicDetail');
//话题用户详情
const topicUserDetail=()=>import('../../components/content/topicUserDetail/TopicUserDetail');
//话题内容详情
const topicContentDetail=()=>import('../../components/content/topicContentDetail/TopicContentDetail')
//搜索子路由
const user=()=>import('../../components/content/searchDetail/childCpn/user/User');
const moment=()=>import('../../components/content/searchDetail/childCpn/moment/Moment');
const topic=()=>import('../../components/content/searchDetail/childCpn/topic/Topic')

//分类详情页
//视频分类详情页
const videoCate=()=>import('../../components/content/category/children/videoCate/VideoCate');
//图片分类详情页
const imageCate=()=>import('../../components/content/category/children/imageCate/ImageCate');
//科技分类详情页
const technologyCate=()=>import('../../components/content/category/children/technology/Technology');
//文章分类详情
const articleCate=()=>import('../../components/content/category/children/articleCate/ArticleCate')
//课程分类详情页
const knowCate=()=>import("../../components/content/category/children/knowCate/KnowCate");
//课程详情页
const knowDetail=()=>import('../../components/content/category/children/knowCate/childCpn/knowDetail/KnowDetail');
//课程播放
const knowPlay=()=>import('../../components/content/category/children/knowCate/childCpn/videoPlay/VideoPlay');
//图片详情页
const imageDetail=()=>import('../../components/content/imageDetail/ImageDetail')
export const userDetailRouter={
    path:'/userDetail',
    name:userDetail,
    components:{
    detail:userDetail
    }
}
export const momentDetailRouter={
    path:'/momentDetail',
    name:'momentDetail',
    components:{
    detail:momentDetail
  }
}
export const videoDetailRouter={
    path: '/videoDetail',
    name: 'videoDetail',
    components: {
    detail: videoDetail
    },
}
//话题详情
export const topicDetailRouter={
    path:'/topicDetail',
    name:'topicDetail',
    components:{
        detail:topicDetail
    }
}
//话题用户详情
export const topicUserDetailRouter={
    path:'/topicUserDetail',
    name:'topicUserDetail',
    components:{
        detail:topicUserDetail
    }
}
//话题内容详情
export const topicContentDetailRouter={
    path:'/topicContentDetail',
    name:'topicContentDetail',
    components:{
        detail:topicContentDetail
    }
}
//图片详情页
export const imageDetailRouter={
    path:'/imageDetail',
    name:'imageDetail',
    components:{
        detail:imageDetail
    }
}
export const searchDetailRouter={
    path:'/searchDetail',
    name:'searchDetail',
    components:{
    detail:searchDetail
    },
    children:[
        {
          path:'/searchDetail',
          redirect:'/searchDetail/moment'
        },
        {
            path:'user',
            name:"user",
            component:user
        },
        {
            path:'moment',
            name:'moment',
            component:moment
        },
        {
            path:'topic',
            name:'topic',
            component:topic
        }
    ]
}
//视频分类详情页
export const videoCateRouter={
    path:'/videoCate',
    name:'videoCate',
    components:{
        detail:videoCate
    }
}
//图片分类详情页
export const imageCateRouter={
    path:'/imageCate',
    name:'imageCate',
    components:{
        detail:imageCate
    }
}
//科技分类详情页
export const technologyCateRouter={
    path:'/technologyCate',
    name:'technologyCate',
    components:{
        detail:technologyCate
    }
}
//文章分类详情
export const articleCateRouter={
    path:'/articleCate',
    name:'articleCate',
    components:{
        detail:articleCate
    }
}
//课程分类详情页
export const knowCateRouter={
    path:'/knowCate',
    name:'knowCate',
    components:{
        detail:knowCate
    }
}
//课程详情页
export const knowDetailRouter={
    path:'/knowledgeMsg',
    name:'knowDetail',
    beforeEnter:(to,from,next)=>{
        const {vip}=to.query;
        if(parseInt(vip)===1)
        {
            if(store.state.userDetail.vip===1)
            {
                next();
            }
        }
        else{
            next();
        }
    },
    components:{
        detail:knowDetail
    }
}
//课程播放
export const knowPlayRouter={
    path:'/knowledgePlay',
    name:'knowPlay',
    components:{
        detail:knowPlay
    }
}