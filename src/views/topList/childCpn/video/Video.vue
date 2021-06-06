<template>
  <div class="video">
    <div class="header">

    </div>
  </div>
</template>

<script>
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
    },
    videoRouter(item)
    {
      this.$router.push({
        path:'/videoDetail',
        query:{
          vid:item.vid
        }
      })
    },
    videoCate()
    {
      this.$router.push({
        path:'/videoCate',
      })
    },
    userRouter(item)
    {
      this.$router.push({
        path:'/userDetail',
        query:{
          id:item.user.userId
        }
      })
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
      cursor:pointer;
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
          cursor: pointer;
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