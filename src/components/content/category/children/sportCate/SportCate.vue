<template>
  <div class="sport-cate">
    <div class="banner">
      <swiper :list="banner"/>
    </div>
    <div class="header">
      <CateList :list="sportCate" color="#e15822" @cate="cateClick"/>
    </div>
    <ul class="video-list" v-if="videoList.videos">
      <li v-for="(item,index) in videoList.videos" :key="item.vid">
        <msg-list img-container-height="115px" @play="videoRouter(item)">
          <div slot="img-container" @click="videoRouter(item)">
            <img v-lazy="item.coverUrl+'&type=small'" alt=""/>
          </div>
          <div slot="state">
            <div class="video-cate-state">{{item.title}}</div>
          </div>
          <div slot="avatarUrl"><img :src="item.user.avatarUrl" alt=""/></div>
          <div slot="userName">{{item.user.userName}}</div>
          <div slot="playCount">{{item.playCount}}</div>
        </msg-list>
      </li>
      <li v-for="(item,index) in holder(videoList.videos.length,4)" style="opacity: 0">
        <div class="img-container"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllCateCon} from "@/network/category";
import {getCateVideo, getVideoBanner} from "@/network/video";
import {holder} from "@/utils/holder";
import Swiper from "@/components/common/swiper/Swiper";
import MsgList from "@/components/common/msgList/MsgList";
import CateList from "@/components/common/cateList/CateList";
export default {
  name: "SportCate",
  components:{
    Swiper,
    MsgList,
    CateList
  },
  data(){
    return {
      cateId:"",
      sportCate:[],
      videoList:[],
      banner:[]
    }
  },
  created() {
    this.cateId=this.$route.query.id;
    getAllCateCon(this.cateId).then(data=>{
      this.sportCate=data.cate;
      if(data.cate){
        this.cateClick(data.cate[0],0)
      }
    });
    //获取视频banner
    getVideoBanner(this.cateId,0,5).then(data=>{
      this.banner=data;
    })
  },
  methods:{
    cateClick(item,index){
      getCateVideo(item.id).then(data=>{
        this.videoList=data;
      })
    },
    holder(count,line){
      return holder(count,line);
    },
    videoRouter(item){
      this.$router.push({
        path:'/videoDetail',
        query:{
          vid:item.vid
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .sport-cate{
    width: 70%;
    padding: 0 30px 0 0;
    border-right: 1px solid #d8e8fa;
    ul.video-list{
      margin: 20px 0 0 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        margin: 0 0 20px 0;
        width:180px;
      }
      .video-cate-state{
        margin: 20px 0 0 0;
      }
    }
  }
</style>