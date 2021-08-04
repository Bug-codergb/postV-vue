<template>
  <div class="video-detail">
    <div class="left-content">
      <video-play :url="videoDetail.url" :dt="videoDetail.duration"/>
      <!--视频信息-->
      <video-msg :video-detail="videoDetail" />
      <reply :id="videoDetail.moment.momentId"
             v-if="videoDetail.moment"
             @reply="reply"
             @thumb="thumb"
             @sub="sub"/>
      <!--动态（视频）评论-->
      <comment :momentId="videoDetail.moment.momentId"
               v-if="videoDetail.moment.momentId"
               :key="keyId"
               @reply-comment="replyComment"
               @thumb-comment="thumbComment"/>
    </div>
    <div class="right-content">
      <RecommendVideo :vid="vid" @play-video="playVideo"/>
    </div>
  </div>
</template>

<script>
import {getVideoDetail} from "@/network/video";
import Reply from "@/components/content/reply/Reply";
import Avatar from "@/components/content/avatar/Avatar";
import Comment from "@/components/content/comment/Comment";
import RecommendVideo from "@/components/content/videoDetail/childCpn/recommendVideo/RecommendVideo";
import VideoMsg from "@/components/content/videoDetail/childCpn/videoMsg/VideoMsg";
import {publishCom, replyComment} from "@/network/comment";
import VideoPlay from "@/components/common/videoPlay/VideoPlay";
import {cancelThumb, thumbs} from "@/network/thumbs";
import {cancelSubMoment, subMoment} from "@/network/moment";

export default {
name: "VideoDetail",
  components: {VideoPlay, VideoMsg, RecommendVideo, Comment, Avatar, Reply},
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
      keyId:1,
      vid:'',
    }
  },
  created() {
    this.vid=this.$route.query.vid;
    getVideoDetail(this.$route.query.vid).then(data=>{
      //console.log(data);
      this.videoDetail=data;
    })
  },
  methods: {
    playVideo(vid)
    {
      getVideoDetail(vid).then(data=>{
        //console.log(data);
        this.videoDetail=data;
        this.keyId+=1;
        this.vid=vid;
      })
    },
    //发表视频评论
    reply(content)
    {
      publishCom(content,this.videoDetail.moment.momentId).then(data=>{
        this.keyId+=1;
        this.$toast.show("发表成功");
      })
    },
    //回复评论
    replyComment(commentId,content){
      replyComment(content,commentId).then(data=>{
        this.keyId+=1;
        this.$toast.show("回复成功");
      })
    },
    //点赞视频
    thumb(isThumb){
      if(!isThumb){
        thumbs(this.videoDetail.moment.momentId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }else{
        cancelThumb(this.videoDetail.moment.momentId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }
    },
    //点赞评论
    thumbComment(isThumb,commentId){
      if(!isThumb){
        thumbs(commentId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }else{
        cancelThumb(commentId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }
    },
    sub(isSub){
      if(!isSub)
      {
        subMoment(this.videoDetail.moment.momentId,this.$store.state.userMsg.userId).then(data=>{
          console.log(data)
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }
      else{
        cancelSubMoment(this.videoDetail.moment.momentId,this.$store.state.userMsg.userId).then(data=>{
          console.log(data);
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .video-detail{
    /*border: 1px solid #3a8ee6;*/
    display: flex;
    width: 1180px;
    .left-content{
      width: 70%;
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
       width: 28%;
    }
  }
</style>