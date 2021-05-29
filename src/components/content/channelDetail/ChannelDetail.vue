<template>
  <div class="channel-detail">
  <div class="left-content">
    <video-play :dt="dt" :url="url"/>
    <div class="channel-msg">
      <ChannelMsg :channelDetail="channelDetail"/>
    </div>
    <div class="comment-channel">
      <reply :status="99" :id="cId"/>
    </div>
  </div>
  </div>
</template>

<script>
import VideoPlay from "@/components/common/videoPlay/VideoPlay";
import ChannelMsg from "@/components/content/channelDetail/childCpn/ChannelMsg";
import {getChannelDetail, getChannelUrl} from "@/network/channel";
import Reply from "@/components/content/reply/Reply";
export default {
  name: "ChannelDetail",
  components: {
    Reply,
    VideoPlay,
    ChannelMsg
  },
  data(){
    return {
      cId:"",
      url:"",
      dt:0,
      channelDetail:{}
    }
  },
  created() {
    this.cId=this.$route.query.cId
    getChannelUrl(this.cId).then(data=>{
      console.log(data);
      const {vidUrl,duration}=data;
      this.url=vidUrl;
      this.dt=duration;
    })
    getChannelDetail(this.cId).then(data=>{
      //console.log(data)
      this.channelDetail=data;
    })
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