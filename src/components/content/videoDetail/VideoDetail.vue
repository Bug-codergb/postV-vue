<template>
  <div class="video-detail">
    <div class="left-content">
      <div class="vio-container">
        <video :src="videoDetail.url"
               ref="vio"
               @timeupdate="getCurrentTime"
               @ended="endHandle"
               autoplay
               @canplay="canPlay">
        </video>
        <div class="control">
          <!--视频进度条-->
          <div class="wrapper" @mousedown="silderDown">
            <el-slider v-model="progress" @change="changeEnd" @input="change" :show-tooltip="false"></el-slider>
          </div>
          <div class="control-btn">
            <div class="play" @click="play">
              <div class="play-or-pause">
                <i class="iconfont icon-playcircle" v-show="!isPlay"></i>
                <i class="iconfont icon-pause1" v-show="isPlay"></i>
              </div>
              <div class="dt">
                {{format(currentTime,"mm:ss")}}/{{format(videoDetail.duration,"mm:ss")}}
              </div>
            </div>
            <div class="volume">
              <i class="iconfont icon-yangshengqi"></i>
              <div id="volume-progress">
                <el-slider v-model="volume" @change="volumeChange" @input="volumeEnd"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--视频信息-->
      <video-msg :video-detail="videoDetail" />
      <reply :id="videoDetail.moment.momentId"
             v-if="videoDetail.moment"
             @reply="reply"/>
      <!--动态（视频）评论-->
      <comment :momentId="videoDetail.moment.momentId"
               v-if="videoDetail.moment.momentId"
               :key="keyId"/>
    </div>
    <div class="right-content">
      <avatar :user-id="videoDetail.user.userId" v-if="videoDetail.user.userId"/>
      <RecommendVideo :vid="vid" @play-video="playVideo"/>
    </div>
  </div>
</template>

<script>
import {addVideoPlayCouont, getVideoDetail} from "@/network/video";
import Reply from "@/components/content/reply/Reply";
import Avatar from "@/components/content/avatar/Avatar";
import Comment from "@/components/content/comment/Comment";
import RecommendVideo from "@/components/content/videoDetail/childCpn/recommendVideo/RecommendVideo";
import VideoMsg from "@/components/content/videoDetail/childCpn/videoMsg/VideoMsg";
import {formatDate} from "@/utils/formatDate";

export default {
name: "VideoDetail",
  components: {VideoMsg, RecommendVideo, Comment, Avatar, Reply},
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
      currentTime:0,
      keyId:1,
      vid:'',
      progress:0,
      isDrag:false,
      isMove: false,
      volume:10
    }
  },
  created() {
    this.vid=this.$route.query.vid;
    getVideoDetail(this.$route.query.vid).then(data=>{
      console.log(data);
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
    format(time,ft)
    {
      return formatDate(time,ft);
    },
    reply()
    {
      this.keyId+=1;
    },
    play()
    {
      /*addVideoPlayCouont(this.videoDetail.vid).then(data => {
      })*/
      this.isPlay=!this.isPlay;
      this.isPlay?this.$refs.vio.play():this.$refs.vio.pause();
    },
    playVideo(vid)
    {
      getVideoDetail(vid).then(data=>{
        //console.log(data);
        this.videoDetail=data;
        this.keyId+=1;
        this.vid=vid;
      })
    },
    silderDown()
    {
      this.isMove=true
    },
    getCurrentTime(e)
    {
      if(!this.isDrag)
      {
        this.currentTime=e.target.currentTime*1000;
        this.progress=(this.currentTime/this.videoDetail.duration)*100;
      }
    },
    canPlay()
    {
      this.isPlay=true;
    },
    change(val)
    {
      if(this.isMove) {
        this.isDrag = true;
        this.currentTime = this.videoDetail.duration * (val / 100);
      }
    },
    changeEnd(val)
    {
      this.isDrag=false;
      this.$refs.vio.currentTime=this.currentTime/1000;
      this.progress=val;
      this.isMove=false;
    },
    endHandle()
    {
      this.isMove=false;
      this.isPlay=false;
    },
    //音量
    volumeChange(val)
    {
      this.$refs.vio.volume=val/100;
    },
    volumeEnd(val)
    {
      this.$refs.vio.volume=val/100;
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
        text-align: center;
        background-color:#111111;
        border-radius: 5px;
        video{
          height:85%;
          outline: none;
        }
        .el-slider{
          height: 3px!important;
        }
        //控制信息
        .control{
          .wrapper{
            padding: 0 10px;
          }
          .control-btn{
            margin: 10px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #c1c1c1;
            .play{
              display: flex;
              align-items: center;
              .play-or-pause{
                cursor: pointer;
                margin: 0 10px 0 10px;
                i{
                  font-size: 22px;
                }
              }
            }
            .volume{
              display: flex;
              align-items: center;
              width: 100px;
              i{
                font-size: 20px;
              }
              #volume-progress{
                flex: 1;
                margin: 0 10px 0 5px;
              }
            }
          }
        }
      }
    }
    .right-content{
       flex: 1;
    }
  }
</style>