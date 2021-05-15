<template>
  <div class="home">
    <top-bar/>
    <div class="content-body">
      <tab-bar :list="['热门','最新','榜单','专题','频道']" :path="['/HotRecommend','/News','/TopList','/Topic','/Channel']">
        <i class="iconfont icon-remen" slot="热门"></i>
        <i class="iconfont icon-news" slot="最新"></i>
        <i class="iconfont icon-rank_fill" slot="榜单"></i>
        <i class="iconfont icon-zhuanti" slot="专题"></i>
        <i class="iconfont icon-channel2" slot="频道"></i>
      </tab-bar>
      <router-view class="routerView" name="detail"/>
        <left-content/>
        <right-content v-if="!livePath.includes('Detail')"/>
    </div>
    <transition name="backTop">
      <div class="back-top" v-show="backTop" @click="backToTop">
        <i class="iconfont icon-back-top"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import LeftContent from "@/components/Home/childCpn/LeftContent";
import RightContent from "@/components/Home/childCpn/RightContent";
import TabBar from "@/components/common/tabBar/TabBar";
import TopBar from "@/components/content/topBar/TopBar";

export default {
  name: "Home",
  components: {RightContent, LeftContent,TabBar,TopBar},
  data()
  {
    return{
      livePath:'',
      backTop:false
    }
  },
  watch:{
    $route(to,from){
      this.livePath=to.path;
    }
  },
  mounted() {
    this.$nextTick(()=>{
      let _this=this;
      window.addEventListener('scroll',function(){
        if(this.pageYOffset>=760)
        {
          _this.backTop=true;
        }
        else{
          _this.backTop=false;
        }
      })
    })
  },
  methods:{
    backToTop()
    {
      let html=document.documentElement;
      let body=document.body;
      let timber=setInterval(()=>{
        body.scrollTop-=100;
        html.scrollTop-=100;
        if(body.scrollTop<=0&&html.scrollTop<=0)
        {
          clearInterval(timber)
        }
      },10)
    }
  }
}
</script>

<style scoped>
.content-body{
  width: 1180px;
  margin: 0 auto;
  border: 1px solid rgba(58, 142, 230,.6);
  display: flex;
  background-color: #fff;
  padding:  30px 30px 50px 30px;
}
.routerView{
  /*border:1px solid #3a8ee6;*/
  /*margin: 0 auto;*/
  /*background: skyblue;*/
}
.back-top{
  position: fixed;
  left: 1300px;
  top: 650px;
  background-color:rgba(58, 142, 230,.5);
  color: #fff;
  font-size: 14px;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 3px;
  cursor: pointer;
}
.backTop-enter-from{
  opacity: 0;
}
.backTop-enter-active{
  opacity: 0;
  transition: opacity 1s;
}
.backTop-enter-to{
  opacity: 1;
}
.backTop-leave-from{
  opacity: 1;
}
.backTop-leave-active{
  opacity: 1;
  transition: opacity 1s;
}
.backTop-leave-to{
  opacity: 0;
}
</style>