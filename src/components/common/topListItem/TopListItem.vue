<template>
   <div class="top-list-item">
     <div class="left-content">
       <div class="vio-img">
         <img :src="detail.picUrl[0].picUrl" />
       </div>
     </div>
     <div class="right-content">
       <div class="title">{{detail.title}}</div>
       <div class="msg">
         <div class="user-msg">
           <div class="avatar">
             <img :src="detail.user.avatarUrl" />
           </div>
           <div class="user-name">{{detail.user.userName}}</div>
         </div>
         <control-btn not-show="sub">
           <div slot="time" class="top-list-control-btn">{{detail.updateTime.substring(0,10)}}</div>
           <div slot="thumb" class="top-list-control-btn">{{detail.thumbs}}</div>
           <div slot="comment" class="top-list-control-btn">{{detail.comment}}</div>
           <div slot="view" class="top-list-control-btn">{{detail.views}}</div>
         </control-btn>
       </div>
     </div>
   </div>
</template>

<script>
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
export default {
  name: "TopListItem",
  components: {ControlBtn},
  props:{
    detail:{
      type:Object,
      default()
      {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .top-list-item{
    display: flex;
    &:hover{
      .right-content .title{
        color: #9cc6f2;
      }
    }
    .left-content{
      .vio-img{
        width: 200px;
        height: 130px;
        overflow: hidden;
        position: relative;
        background-color: #333;
        img{
          height: 130px;
          .center()
        }
      }
    }
    .right-content{
      margin: 0 0 0 20px;
      .title{
        font-size: 20px;
        color:#595959 ;
        margin: 15px 0 20px 0;
      }
      .msg{
        display: flex;
        justify-content: space-between;
      }
      .user-msg{
        display: flex;
        align-items: center;
        .avatar{
          width: 20px;
          height: 20px;
          overflow: hidden;
          position: relative;
          border-radius: 50%;
          img{
            height: 20px;
            .center();
          }
        }
        .user-name{
          font-size: 12px;
          color: #3a8ee6;
        }
      }
      .top-list-control-btn{
        font-size: 12px;
        color:#9ca3ab;
      }
    }
  }
</style>