<template>
  <div class="video-cate">
    <div class="banner">
      <swiper :list="banner" @item-click="videoRouter"/>
    </div>
    <cate-list title="类别" :list="videoCate" v-if="videoCate.length" @cate="cate" />
    <ul class="video-list" v-if="videoList.videos">
      <li v-for="(item,index) in videoList.videos" :key="item.vid">
        <msg-list img-container-height="115px" @play="videoRouter(item)">
          <div slot="img-container" @click="videoRouter(item)">
            <img :src="item.coverUrl+'&type=small'" alt=""/>
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
import CateList from "@/components/common/cateList/CateList";
import {getVideoBanner} from "@/network/video";
import {getCateVideo} from "@/network/video";
import {holder} from "@/utils/holder";
import MsgList from "@/components/common/msgList/MsgList";
import {getAllCateCon} from "@/network/category";
import Swiper from "@/components/common/swiper/Swiper";
export default {
  name: "VideoCate",
  components: {Swiper, MsgList, CateList},
  data()
  {
    return {
      videoCate:[],
      videoCatMap:new Map(),
      videoList:{
        videos:[]
      },
      cateId:"",
      banner:[]
    }
  },
  created() {
    this.cateId=this.$route.query.id;
    getAllCateCon(this.cateId).then(data=>{
      console.log(data.cate);
      this.videoCate=data.cate;
      if(data.cate){
        this.cate(data.cate[0])
      }
    })
    //获取视频banner
    getVideoBanner(this.cateId,0,5).then(data=>{
      this.banner=data;
    })
  },
  methods:{
    cate(item)
    {
      getCateVideo(item.id).then(data=>{
        this.videoList=data;
      })
    },
    videoRouter(item)
    {
      this.$router.push({
        path:'/videoDetail',
        query:{
          vid:item.vid
        }
      })
    },
    holder(count,line)
    {
      return holder(count,line);
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    transform: translate(-50%,-50%);
    top:50%;
    left:50%;
    position:absolute;
  }
  .video-cate{
    border-right: 1px solid #d8e8fa;
    width: 70%;
    padding: 0 30px 0 0;
    ul.video-list{
      margin: 20px 0 0 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        margin: 0 0 20px 0;
        width: 180px;
      }
      .video-cate-state{
        margin: 20px 0 0 0;
      }
    }
  }
</style>