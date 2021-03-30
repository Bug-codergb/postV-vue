import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import actions from './actions';
import mutations from "./mutations";
export default new Vuex.Store({
  state: {
    //用户登录信息
    userMsg:JSON.parse(window.sessionStorage.getItem('userMsg')) || {
      avatarUrl:'',
      userName:'',
      auth:0
     /* follow:[],
      fans:[],*/
    },
    //响应错误信息
    response:{},
    //登录状态
    loginType:parseInt(window.sessionStorage.getItem('loginType'))||0,
    //用户详情
    userDetail:JSON.parse(window.sessionStorage.getItem('userDetail'))||{
      avatarUrl:"",
      fans:[],
      follow:[]
    },
    //所有动态
    allMoments:[],
    //热门动态
    hotMoment:[],
    //动态详情
    momentDetail:[],
    //搜索结果
    searchResult:{
      user:[{avatarUrl:""}]
    }
  },
  mutations,
  actions,
  modules: {
  }
})
