<template>
  <div class="rec-video">
    <h4 class="rec-title">推荐视频</h4>
    <ul>
      <li v-for="(item,index) in videoList" :key="item.vid">
        <div class="video-list" v-if="item.vid!==vid">
          <div class="img-container" @click="playVideo(item)">
            <img :src="item.coverUrl"/>
            <div class="play-count">
              <i class="iconfont icon-play1"></i>
              {{item.playCount}}</div>
            <div class="duration">{{duration(item.duration,"MM:ss")}}</div>
          </div>
          <div class="right-content">
            <div class="title text-nowrap">{{item.title}}</div>
            <div class="creator">by {{item.user.userName}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getRecommendVio} from "@/network/video";
import {formatDate} from "@/utils/formatDate";

export default {
  name: "RecommendVideo",
  data()
  {
    return {
      videoList:[]
    }
  },
  props:{
    vid:{
      type:String,
      default()
      {
        return ""
      }
    }
  },
  created() {
    getRecommendVio().then(data=>{
      console.log(data);
      this.videoList=data;
    })
  },
  methods:{
    duration(time,fmt)
    {
      return formatDate(time,fmt)
    },
    playVideo(item)
    {
      this.$emit('play-video',item.vid);
    }
  }
}
</script>

<style scoped lang="less">
  .rec-video{
    .rec-title{
      margin: 0 0 0 15px;
    }
    li .video-list{
      display: flex;
      padding: 10px 0 10px 15px;
    }
  }
  .img-container{
    width: 140px;
    height: 90px;
    overflow: hidden;
    background-color: #333;
    position: relative;
    img{
      width: 100%;
    }
    .play-count{
      white-space: nowrap;
      position: absolute;
      left:100%;
      top: 0;
      color: #fff;
      transform: translate(-105%,0);
      font-size: 13px;
    }
    .duration{
      position: absolute;
      color: #fff;
      left: 100%;
      top: 100%;
      font-size: 13px;
      transform: translate(-105%,-105%);
    }
  }
  .title{
    width: 100px;
    font-size: 13px;
    margin: 10px 0 0 10px;
  }
  .creator{
    color: #9b9b9b;
    font-size: 12px;
    margin: 10px 0 0 10px;
  }
</style>