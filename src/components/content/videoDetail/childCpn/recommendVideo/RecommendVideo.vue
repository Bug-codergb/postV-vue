<template>
  <div class="rec-video">
    <h4 class="rec-title">推荐视频</h4>
    <ul>
      <li v-for="(item,index) in videoList" :key="item.vid">
        <div class="video-list" v-if="item.vid!==vid">
          <div class="img-container" @click="playVideo(item)">
            <img :src="item.coverUrl" alt=""/>
            <div class="play-count">
              <i class="iconfont icon-play1"></i>
              {{item.playCount}}</div>
            <div class="duration">{{item.duration,"mm:ss"|formatTime}}</div>
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
import filter from "@/utils/filter";

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
  filters:filter,
  created() {
    getRecommendVio().then(data=>{
      console.log(data);
      this.videoList=data;
    })
  },
  methods:{
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
      .right-content{
        width:50%;
      }
    }
  }
  .img-container{
    width: 140px;
    height: 90px;
    overflow: hidden;
    background-color: #333;
    position: relative;
    border-radius: 5px;
    img{
      width: 100%;
      .center(50%,50%,-50%,-50%);
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
    width: 85%;
    font-size: 13px;
    margin: 10px 0 0 10px;
  }
  .creator{
    color: #9b9b9b;
    font-size: 12px;
    margin: 10px 0 0 10px;
  }
</style>