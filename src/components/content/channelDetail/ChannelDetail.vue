<template>
  <div class="channel-detail">
  <div class="left-content">
    <video-play :dt="dt" :url="url"/>
    <div class="channel-msg">
      <ChannelMsg :channelDetail="channelDetail"/>
    </div>
    <div class="comment-channel">
      <reply :id="cId"
             @reply="reply"
             @thumb="thumb"
             @sub="sub"/>
    </div>
    <div class="channel-comment">
      <comment :status="3" :comment-detail="comment"
               v-if="comment.length!==0"
               :key="keyId"
               @reply-comment="replyComment"
               @thumb-comment="thumbComment"/>
    </div>
  </div>
  </div>
</template>

<script>
import VideoPlay from "@/components/common/videoPlay/VideoPlay";
import ChannelMsg from "@/components/content/channelDetail/childCpn/ChannelMsg";
import {
  cancelChannelSub,
  cancelThumbChannel,
  getChannelComment,
  getChannelDetail,
  getChannelUrl,
  publishChannelComment,
  replyChannelComment, subChannel, thumbChannel
} from "@/network/channel";
import Reply from "@/components/content/reply/Reply";
import Comment from "@/components/content/comment/Comment";
import {cancelThumb, thumbs} from "@/network/thumbs";
export default {
  name: "ChannelDetail",
  components: {
    Comment,
    Reply,
    VideoPlay,
    ChannelMsg
  },
  data(){
    return {
      cId:"",
      url:"",
      dt:0,
      channelDetail:{},
      comment:[],
      keyId:0
    }
  },
  created() {
    this.cId=this.$route.query.cId
    getChannelUrl(this.cId).then(data=>{
      //console.log(data);
      const {vidUrl,duration}=data;
      this.url=vidUrl;
      this.dt=duration;
    })
    getChannelDetail(this.cId).then(data=>{
      //console.log(data)
      this.channelDetail=data;
    })
    getChannelComment(this.cId).then(data=>{
      //console.log(data.comment);
      this.comment=data.comment;
    })
  },
  methods:{
    reply(content){
      publishChannelComment(this.cId,content).then(data=>{
        getChannelComment(this.cId,0,20).then(data=>{
          this.$toast.show("发表成功");
          this.keyId+=1;
          this.comment=data.comment;
        })
      })
    },
    replyComment(commentId,content){
      replyChannelComment(commentId,content,this.cId).then(data=>{
        getChannelComment(this.cId,0,20).then(data=>{
          this.$toast.show("回复成功");
          this.keyId+=1;
          this.comment=data.comment;
        })
      })
    },
    //点赞频道
    thumb(isThumb){
      if(!isThumb){
        thumbChannel(this.cId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }else{
        cancelThumbChannel(this.cId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }
    },
    //点赞频道评论
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
    //收藏频道
    sub(isSub){
      if(!isSub){
        subChannel(this.cId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }else{
        cancelChannelSub(this.cId).then(data=>{
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
  .channel-detail{
    width: 1180px;
    .left-content{
      padding: 0 20px 0 0;
      width: 70%;
      border-right: 1px solid #d8e8fa;
      .channel-msg{
        margin: 20px 0 0 0;
      }
    }
  }
</style>