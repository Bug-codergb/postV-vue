<template>
  <div class="video-detail">
    <div class="left-content">
      <div class="vio-container">
        <video :src="videoDetail.url"
               ref="vio"
               @play.once="play"
               @timeupdate="getCurrentTime"
               @canplay="canplay"
               controls="controls"
               autoplay>
        </video>
        <button @click="playVideo">565播放</button>
      </div>
      <!--进度条设置-->
      <el-slider v-model="value1" @change="endChange"></el-slider>
      <div class="profile">
        <div class="img-container">
          <img :src="videoDetail.user.avatarUrl" />
        </div>
        <div class="user-name">{{videoDetail.user.userName}}</div>
      </div>
      <!--视频标题-->
      <h2>{{videoDetail.moment.title}}</h2>
      <div class="vio-msg">
        <span>发布于: {{videoDetail.updateTime.substring(0,10)}}</span>
        <span>播放: {{videoDetail.playCount}}次</span>
      </div>
      <reply :id="videoDetail.moment.momentId"
             v-if="videoDetail.moment"
             @reply="reply"/>
      <!--动态（视频）评论-->
      <comment :momentId="videoDetail.moment.momentId" v-if="videoDetail.moment.momentId" :key="keyId"/>
    </div>
    <div class="right-content">
      <avatar :user-id="videoDetail.user.userId" v-if="videoDetail.user.userId"/>
    </div>
  </div>
</template>

<script>
import {addVideoPlayCouont, getVideoDetail} from "@/network/video";
import Reply from "@/components/content/reply/Reply";
import Avatar from "@/components/content/avatar/Avatar";
import Comment from "@/components/content/comment/Comment";

export default {
name: "VideoDetail",
  components: {Comment, Avatar, Reply},
  data()
  {
    return {
      videoDetail:{
        user:{},
        moment:{},
        updateTime:'',
        playCount:0,
        comments:[],
      },
      //是否播放
      isPlay:false,
      value1:0,
      duration:0,
      currentTime:0,
      keyId:1
    }
  },
  created() {
    getVideoDetail(this.$route.query.vid).then(data=>{
      //console.log(data);
      this.videoDetail=data;
    })
  },
  mounted() {
    this.$nextTick(()=>{
      this.$refs.vio.volume=0.1;
      //console.log(this.reply)
      this.$bus.$on('replyComment',this.reply);
    })
  },
  methods: {
    reply()
    {
      this.keyId+=1;
    },
    play()
    {
      addVideoPlayCouont(this.videoDetail.vid).then(data => {
        console.log(data)
      })
    },
    getCurrentTime(e)
    {
     //console.log(e.target.currentTime);
     this.currentTime=e.target.currentTime*1000;
    },
    playVideo() {
      if(this.isPlay)
      {
        console.log(this.duration)
        this.$refs.vio.pause();
        this.isPlay=false;
      }
      else{
        this.$refs.vio.play();
        this.isPlay=true;
      }
    },
    canplay()
    {
      this.duration=this.$refs.vio.duration*1000;
      console.log(this.duration)
    },
    //鼠标松开后出发
    endChange(val)
    {
      console.log(val/100);
      const time=val/100;
      this.$refs.vio.currentTime=time*this.duration*1000;
      console.log(this.$refs.vio)
    }
  }
}
</script>

<style scoped lang="less">
  .video-detail{
    /*border: 1px solid #3a8ee6;*/
    display: flex;
    .left-content{
      width: 710px;
      border-right: 1px solid rgba(58, 142, 230,.2);
      height: 1500px;
      .vio-container{
        width: 700px;
        height:300px;
        overflow: hidden;
        text-align: center;
        background-color: rgba(0,0,0,.8);
        border-radius: 5px;
        video{
          height:100%;
        }
      }
      .profile{
        margin: 20px 0 ;
        display: flex;
        align-items: center;
        .img-container{
          width:50px;
          height:50px;
          margin: 0 15px 0 0;
          border-radius: 50%;
          background-color: rgba(209, 225, 243);
          overflow: hidden;
          img{
            width: 100%;
          }
        }
        .user-name{
          font-size: 14px;
        }
      }
    .vio-msg{
      margin: 10px 0 0 0;
      font-size: 12px;
      color: #cfcfcf;
      span{
        margin: 0 20px 0 0;
      }
    }
    }
    .right-content{
       flex: 1;
    }
  }
</style>