<template>
  <div class="channel-video-msg">
    <div class="user-msg">
      <div class="img-container">
        <img :src="channelDetail.user&&channelDetail.user.avatarUrl"/>
      </div>
      <div class="user-name">{{channelDetail.user&&channelDetail.user.userName}}</div>
    </div>
    <div class="title">{{channelDetail.title}}</div>
    <div class="channel-content">
      {{channelDetail.content}}
    </div>
    <div class="play-time">
      <p>
        <span>发布于:</span>
        <span>{{formatDate(channelDetail.createTime,"yyyy-MM-dd hh:mm:ss")}}</span>
      </p>
      <p>
        <span>播放:</span>
        <span>{{channelDetail.playCount}}次</span>
      </p>
    </div>
    <div class="cate">
      分类:<span>{{channelDetail.category&&channelDetail.category.name}}</span>
    </div>
  </div>
</template>

<script>
import {formatDate} from "@/utils/formatDate";

export default {
  name: "ChannelMsg",
  data(){
    return {

    }
  },
  props:{
    channelDetail:{
      type:Object,
      default(){
        return {
        }
      }
    }
  },
  methods:{
    formatDate(time,dt){
      return formatDate(time,dt)
    }
  }
}
</script>

<style scoped lang="less">
  .center(){
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .channel-video-msg{
    .user-msg{
      display: flex;
      align-items: center;
      .img-container{
        width: 50px;
        height: 50px;
        overflow: hidden;
        position: relative;
        background-color: #373737;
        border-radius: 50%;
        img{
          height: 100%;
          .center();
        }
      }
      .user-name{
        margin: 0 0 0 15px;
        font-size: 13px;
        color: #676767;
      }
    }
    .title{
      font-size: 18px;
      font-weight: bolder;
      margin: 20px 0 0 0;
    }
    .channel-content{
      margin: 20px 0 0 0;
      color: #676767;
      line-height: 24px;
      text-indent: 2em;
    }
    .cate{
      margin: 20px 0 0 0;
      span{
        color:#3a8ee6;
        margin: 0 0 0 10px;
      }
    }
    .play-time{
      display: flex;
      margin: 20px 0 0 0;
      color: #676767;
      align-items: center;
      p{
        margin: 0 15px 0 0;
        span{
          &:nth-child(2){
            margin: 0 0 0 5px;
          }
        }
      }
    }
  }
</style>