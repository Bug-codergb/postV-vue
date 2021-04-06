<template>
  <div class="video">
    <ul>
      <li v-for="(item,index) in videoTopList" :key="item.vid">
        <div class="index">{{(index+1).toString().padStart(2,"0")}}</div>
        <div class="left-content">
          <div class="img-container">
            <img :src="item.coverUrl" :alt="item.title"/>
            <div class="duration">{{duration(item.duration,"mm:ss")}}</div>
            <div class="playCount">
              <i class="iconfont icon-play1"></i>
              {{item.playCount}}</div>
          </div>
        </div>
        <div class="right-content">
          <div class="title text-nowrap">{{item.title.trim()}}</div>
          <div class="cate">
            <span>类型:</span>{{item.cate}}</div>
          <div class="msg">
            <div class="user-msg">
              <div class="avatar">
                <img :src="item.user.avatarUrl" alt="item.title" />
              </div>
              <div class="user-name">{{item.user.userName}}</div>
            </div>
            <control-btn not-show="view thumb">
              <div slot="time" class="video-control-btn">{{item.updateTime.substring(0,10)}}</div>
              <div slot="comment" class="video-control-btn">{{item.comments}}</div>
              <div slot="sub" class="video-control-btn">{{item.sub}}</div>
            </control-btn>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getVideoToplist} from "@/network/toplist";
import LeftContent from "@/components/Home/childCpn/LeftContent";
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
import {formatDate} from "@/utils/formatDate";
export default {
  name: "Video",
  components: {ControlBtn, LeftContent},
  data()
  {
    return {
      videos:[],
      videoTopList:[]
    }
  },
  created() {
    getVideoToplist(0,30).then(data=>{
      console.log(data);
      this.videoTopList=data;
    })
  },
  methods:{
    vioRouter(vid)
    {
       this.$router.push({
         path:'/videoDetail',
         query:{
           vid,
         }
       })
    },
    duration(item,format)
    {
      return formatDate(item,format)
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position:absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .video{
    margin: 30px 0 0 0;
    ul{
      li{
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #d8e8fa;
        .index{
          display: flex;
          align-items: center;
          width: 50px;
          font-size: 30px;
          color: #3a8ee6;
        }
      }
    }
  }
  .left-content{
    .img-container{
      width: 200px;
      height: 130px;
      overflow: hidden;
      position: relative;
      background-color: #333;
      border-radius: 3px;
      img{
        width: 200px;
        .center();
      }
      .duration{
        position: absolute;
        color: #fff;
        left: 100%;
        top: 80%;
        transform: translateX(-115%);
        font-size: 14px;
      }
      .playCount{
        color: #fff;
        position: absolute;
        transform: translateX(-115%);
        left: 100%;
        white-space: nowrap;
        font-size: 14px;
        top:5%;
      }
    }
  }
  .right-content{
    margin: 0 0 0 20px;
    .title{
      font-size: 20px;
      width: 400px;
      text-align: left;
    }
    .cate{
      font-size: 12px;
      color: #3a8ee6;
      margin: 10px 0;
      span{
        color: #9ca3ab;
        margin: 0 5px 0 0;
      }
    }
    .msg{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0 0 0;
      .user-msg{
        display:flex;
        align-items: center;
        .avatar{
          width: 20px;
          height: 20px;
          overflow: hidden;
          border-radius:50%;
          position: relative;
          img{
            height:20px;
            .center();
          }
        }
        .user-name{
          margin: 0 0 0 10px;
          color: #3a8ee6;
          font-size:12px;
        }
      }
      .video-control-btn{
        color: #9ca3ab;
        font-size: 12px;
        margin: 0 0 0 5px;
      }
    }
  }
</style>