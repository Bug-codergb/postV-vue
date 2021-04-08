<template>
  <div class="video-cate">
    <cate-list title="类别" :list="videoCate" v-if="videoCate.length" @cate="cate" />
    <ul class="video-list">
      <li v-for="(item,index) in videoList.videos" :key="item.vid">
        <div class="img-container" v-if="item.coverUrl" @click="videoRouter(item)">
          <div class="play">
            <i class="iconfont icon-play"></i>
          </div>
          <img v-lazy="item.coverUrl" />
          <div class="play-count">
            <i class="iconfont icon-play1" ></i>
            <span>{{item.playCount}}</span>
          </div>
        </div>
        <div class="state text-nowrap">{{item.title}}</div>
        <div class="msg">
          <div class="user-msg" v-if="item.user">
            <div class="avatar">
              <img :src="item.user.avatarUrl" />
            </div>
            <div class="user-name">{{item.user.userName}}</div>
          </div>
          <div class="time" v-if="item.updateTime">
            <i class="iconfont icon-shijian"></i>
            <div>{{item.updateTime.substring(0,10)}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CateList from "@/components/common/cateList/CateList";
import {getAllVideoCate} from "@/network/admin";
import {getCateVideo} from "@/network/video";
export default {
  name: "VideoCate",
  components: {CateList},
  data()
  {
    return {
      videoCate:[],
      videoCatMap:new Map(),
      videoList:[]
    }
  },
  created() {
    getAllVideoCate().then(data=>{
      data.forEach((item,index)=>{
        this.videoCatMap.set(item.name,item.categoryId);
        this.cate("科幻")
      })
      this.videoCate=data.map((item,index)=>{
        return item.name
      })
    })
  },
  methods:{
    cate(item)
    {
      getCateVideo(this.videoCatMap.get(item)).then(data=>{
        //console.log(data);
        this.videoList=data;
      })
    },
    videoRouter(item)
    {
      this.$router.push({
        path:'/videoDetail',
        query:{
          vid:item.vid
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    transform: translate(-50%,-50%);
    top:50%;
    left:50%;
    position:absolute;
  }
  .video-cate{
    ul.video-list{
      margin: 20px 0 0 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        margin: 0 0 20px 0;
        .img-container{
          width: 220px;
          height: 115px;
          overflow: hidden;
          border-radius: 5px;
          background-color: #333333;
          position: relative;
          text-align: center;
          &:hover{
            img{
              transform: scale(1.3);
            }
            .play{
              display: block;
            }
          }
          img{
            height: 115px;
            transition: transform 0.3s;
          }
          .play-count{
            font-size:13px;
            position: absolute;
            left: 100%;
            top: 2%;
            transform: translateX(-110%);
            color: #fff;
          }
          .play{
            width: 45px;
            height: 45px;
            background-color: rgba(255,255,255,.6);
            border-radius: 50%;
            z-index: 99;
            .center();
            text-align: center;
            line-height: 45px;
            display: none;
            i{
              font-size: 30px;
              color: #3a8ee6;
            }
          }
        }
        .state{
          font-size: 14px;
          margin: 10px 0;
          width: 205px;
        }
        .msg{
          display: flex;
          justify-content: space-between;
          .user-msg{
            display: flex;
            align-items: center;
            .avatar{
              width: 20px;
              height: 20px;
              position: relative;
              overflow: hidden;
              border-radius: 50%;
              img{
                height: 20px;
                .center();
              }
            }
            .user-name{
              font-size: 12px;
              color: #3a8ee6;
              margin: 0 0 0 5px;
              cursor:pointer;
            }
          }
          .time{
            display: flex;
            align-items: center;
            color: #9ca3ab;
            font-size: 12px;
            i{
              margin: 0 5px 0 0;
            }
          }
        }
      }
    }
  }
</style>