import Vue from 'vue'
import VueRouter from 'vue-router';
import store from '../store'

Vue.use(VueRouter)

import Login from "@/components/content/login/Login";
import HotRecommend from "@/views/hotRecommend/HotRecommend";

const Register=()=>import('../components/content/register/Register');
const Home=()=>import('../components/Home/Home')

const hotRecommend=()=>import('../views/hotRecommend/HotRecommend');
const news=()=>import('../views/news/News');
const topList=()=>import('../views/topList/TopList');
const topic=()=>import('../views/topic/Topic')
//详情页
import {
  userDetailRouter,
  momentDetailRouter,
  videoDetailRouter,
  topicDetailRouter,
  topicUserDetailRouter,
  topicContentDetailRouter,
  searchDetailRouter,
  videoCateRouter,
  imageDetailRouter,
  imageCateRouter,
  technologyCateRouter,
  articleCateRouter,
  knowCateRouter,
  knowDetailRouter,
  knowPlayRouter,
  chatDetailRouter
} from './detail/index'

//榜单子路由
const movie=()=>import('../views/topList/childCpn/movie/Movie')
const picture=()=>import('../views/topList/childCpn/picture/Picture')
const sport=()=>import('../views/topList/childCpn/sport/Sport')
const article=()=>import('../views/topList/childCpn/article/Article')
const video=()=>import('../views/topList/childCpn/video/Video');
const funny=()=>import('../views/topList/childCpn/funny/Funny')

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path:'/',
    redirect:'/Login',
  },
  {
    path:'/Login',
    name:'Login',
    components:{
      login:Login
    }
  },
  {
    path:'/Home',
    name:Home,
    components:{
      login:Home
    },
    children:[
      {
        path:'/Home',
        redirect:'/Home/HotRecommend',
      },
      {
        path:'HotRecommend',
        name:'HotRecommend',
        component: hotRecommend
      },
      {
        path:'News',
        name:'News',
        component: news
      },
      {
        path:'Topic',
        name:'topic',
        component:topic
      },
      {
        path:'TopList',
        name:'TopList',
        component: topList,
        children:[
          {
            path:'/Home/TopList',
            redirect:'/Home/TopList/Video'
          },
          {
            path:'Movie',
            name:'movie',
            component:movie
          },
          {
            path:'Picture',
            name:'picture',
            component:picture
          },
          {
            path:'Article',
            name:'article',
            component:article
          },
          {
            path:'Sport',
            name:'sport',
            component:sport
          },
          {
            path:'Video',
            name:'video',
            component:video
          },
          {
            path:'Funny',
            name:'funny',
            component:funny
          }
        ]
      },

      //动态详情
      momentDetailRouter,
      //用户详情
      userDetailRouter,
      //视频详情
      videoDetailRouter,
        //话题
      topicDetailRouter,
        //专题成员详情
      topicUserDetailRouter,
        //话题内容详情
      topicContentDetailRouter,
        //图片详情页
      imageDetailRouter,
      //搜索详情
      searchDetailRouter,
        //视频分类详情页
      videoCateRouter,
        //图片分类详情页
      imageCateRouter,
        //科技分类详情
      technologyCateRouter,
        //文章分类详情
      articleCateRouter,
        //课程分类·
      knowCateRouter,
        //课程详情
      knowDetailRouter,
        //课程播放
      knowPlayRouter,
        //聊天
      chatDetailRouter
    ]
  },
  {
    path:'/register',
    name:Register,
    components:{
      login:Register
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
router.beforeEach((to,from,next)=>{
  if(to.path.includes("/admin")&&store.state.loginType===0&&store.state.userMsg.auth===0)
  {
    next({name:'Login'})
  }
  else{
    next()
  }
})

export default router
