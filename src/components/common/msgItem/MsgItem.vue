<template>
  <div class="msg-item">
    <div class="img-container">
      <img :src="detail.picUrl[0].picUrl" />
      <div class="play">
        <i class="iconfont icon-play"></i>
      </div>
    </div>
    <div class="state">{{detail.title}}</div>
    <div class="user-msg">
      <div class="avatar">
        <img :src="detail.user.avatarUrl" />
      </div>
      <div class="user-name">{{detail.user.userName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MsgItem",
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
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
  .msg-item{
    .img-container{
      width: 200px;
      height: 104px;
      overflow: hidden;
      border-radius: 3px;
      text-align: center;
      background-color: #333333;
      position: relative;
      &:hover{
        img{
          transform: scale(1.3);
        }
        .play{
          display: block;
        }
      }
      img{
        height: 104px;
        transition: transform 0.3s;
      }
      .play{
        .center();
        width: 45px;
        height: 45px;
        background-color: rgba(255, 255, 255,.6);
        border-radius: 50%;
        text-align: center;
        line-height: 45px;
        i{
          color: #3a8ee6;
          font-size: 30px;
        }
        display: none;
      }
    }
    .state{
      margin: 10px 0;
      font-size: 14px;
    }
    .user-msg{
      display: flex;
      .avatar{
        width: 20px;
        height: 20px;
        overflow: hidden;
        position: relative;
        img{
          .center();
          height: 20px;
        }
      }
      .user-name{
        font-size: 12px;
        color: #3a8ee6;
      }
    }
  }
</style>