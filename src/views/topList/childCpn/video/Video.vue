<template>
  <div class="video">
    <ul class="video-cate">
      <li v-for="(item,index) in videos" :key="item.categoryId">
        <div class="cate-name">{{item.name}}</div>
        <!--分类下视频-->
        <ul class="video-item">
          <li v-for="(iten,index) in item.videos" :key="iten.vid">
            <div class="img-container" @click="vioRouter(iten.vid)">
              <img v-lazy="iten.coverUrl" :alt="iten.title"/>
              <!--播放按钮-->
              <div class="play">
                <i class="iconfont icon-play"></i>
              </div>
              <!--播放量-->
              <div class="play-count">
                <i class="iconfont icon-bofang"></i>
                <span>{{iten.playCount}}</span>
              </div>
            </div>
            <div class="state text-nowrap" :title="iten.title">{{iten.title}}</div>
            <div class="creator">{{iten.user.userName}}</div>
          </li>
          <li v-for="item in (3-item.videos.length%3)" style="opacity: 0"><div class="img-container"></div></li>
        </ul>

      </li>
    </ul>
  </div>
</template>

<script>
import {getAllVideo, getCateVideo} from "@/network/video";
import {getAllVideoCate} from "@/network/admin";

export default {
  name: "Video",
  data()
  {
    return {
      videos:[]
    }
  },
  created() {
    /*getAllVideo(20,0).then(data=>{
     console.log(data);
      this.msgItem=data
    })*/
    getAllVideoCate().then(data=>{
      //console.log(data)
      let promise=data.map((item,index)=>{
        return getCateVideo(item.categoryId)
      })
      Promise.all(promise).then(data=>{
        this.videos=data;
        console.log(data)
      })
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
    }
  }
}
</script>

<style scoped lang="less">
  .video{
    .cate-name{
      font-weight: bold;
      margin:15px 0 15px 25px;
    }
    ul.video-item{
      display:flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      li{
        margin: 0 0 15px 0;
        .play{
          position: absolute;
          width: 45px;
          height:45px;
          background-color:rgba(255,255,255,.8);
          top:50%;
          left: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          text-align: center;
          line-height: 45px;
          display: none;
          i{
            font-size: 30px;
            color: #3a8ee6;
          }
        }
        /*播放量*/
        .play-count{
          display: flex;
          align-items: center;
          i{
            color: #fff;
            margin: 0 5px 0 0;
          }
          span{
            color: #fff;
            font-size: 13px;
          }
          position: absolute;
          top:5%;
          left:100%;
          transform: translateX(-140%);
        }
      }
      .img-container{
        height: 104px;
        width: 200px;
        overflow: hidden;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        background-color: rgba(0,0,0,.8);
        img{
          height: 100%;
          transform: scale(1);
          transition: 0.3s transform;
        }
        &:hover{
          img{
            transform: scale(1.3);
          }
          .play{
            display: block;
          }
        }
      }
      .state{
        font-size: 14px;
        color: #373737;
        margin: 10px 0 5px 0;
        width: 185px;
      }
      .creator{
        font-size: 12px;
        color:#60a4e7;
      }
    }
  }
</style>