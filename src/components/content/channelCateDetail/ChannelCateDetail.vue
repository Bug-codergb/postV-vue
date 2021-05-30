<template>
  <div class="channel-cate-detail">
    <div class="header">
      <img :src="conDetail.coverUrl" alt="" class="bgc"/>
      <div class="msg-outer">
        <div class="msg">
          <!--分类详情头像-->
          <div class="img-container">
            <img :src="conDetail.coverUrl" alt=""/>
          </div>
          <!--分类详情信息-->
          <div class="info">
            <div class="con-name">{{conDetail.name}}</div>
            <div class="create-time">
              创建于<span>{{formatTime(conDetail.createTime,"yyyy-MM-dd hh:mm:ss")}}</span>
            </div>
            <div class="all">
              共有<span>{{conDetail.count}}</span>个视频
            </div>
          </div>
        </div>
        <button class="sub">
          <i class="iconfont icon-guanzhu"></i>订阅</button>
      </div>
    </div>
    <!--分类下频道内容-->
    .<ChannelList :list="conDetail.channel" v-if="conDetail.channel"/>
  </div>
</template>

<script>
import {getCateConDetail} from "@/network/channel";
import {formatDate} from "@/utils/formatDate";
import ChannelList from "@/components/content/channelCateDetail/childCpn/channelList/ChannelList";

export default {
  name: "ChannelCateDetail",
  components: {ChannelList},
  data(){
    return {
      conId:"",
      conDetail:{}
    }
  },
  created() {
    this.conId=this.$route.query.id;
    getCateConDetail(this.conId).then(data=>{
      console.log(data);
      this.conDetail=data;
    })
  },
  methods:{
    formatTime(time,ft){
      return formatDate(time,ft)
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
  .channel-cate-detail{
    width: 100%;
  }
  .header{
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    img.bgc{
      .center();
      width: 1500px;
      filter: blur(80px);
    }
    .msg-outer{
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: space-between;
      .msg{
        position: relative;
        z-index:9;
        height: 100%;
        display: flex;
        align-items: center;
        .img-container{
          width: 85px;
          height: 85px;
          margin: 0 0 0 20px;
          border: 1px solid #676767;
          background-color: #676767;
          position: relative;
          overflow: hidden;
          border-radius: 5px;
          img{
            .center();
            width: 100%;
          }
        }
        .info{
          color: #fff;
          margin: 0 0 0 20px;
          .con-name{
            font-weight: bold;
            font-size: 16px;
            margin: 0 0 15px 0;
          }
          .create-time{
            margin: 0 0 10px 0;
          }
          .create-time,.all{
            font-size: 13px;
          }
        }
      }
      .sub{
        position: relative;
        z-index: 99;
        margin: 0 80px 0 0;
        padding: 5px 20px;
        font-size: 13px;
        display: flex;
        align-items: center;
        background-color: #61a5eb;
        color: #fff;
      }
    }
  }
</style>