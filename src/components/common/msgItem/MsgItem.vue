<template>
  <div class="msg-item">
    <div class="img-container" :style="{width:imgWidth,height:(parseInt(imgWidth)*0.65)+'px'}">
      <div class="index">
        <slot name="index"></slot>
      </div>
      <slot name="img-container"></slot>
    </div>
    <div class="right-msg">
      <div class="title">{{title}}</div>
      <div class="user-control">
        <div class="user-msg">
          <div class="avatar">
            <slot name="avatar"></slot>
          </div>
          <div class="user-name">
            <slot name="user-name"></slot>
          </div>
        </div>
        <control-btn not-show="sub">
          <span slot="time" class="msg-item-control">
            <slot name="time"></slot>
          </span>
          <span slot="thumb" class="msg-item-control">
            <slot name="thumb"></slot>
          </span>
          <span slot="comment" class="msg-item-control">
            <slot name="comment"></slot>
          </span>
          <span slot="view" class="msg-item-control">
            <slot name="view"></slot>
          </span>
        </control-btn>
      </div>
    </div>
  </div>
</template>

<script>
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
export default{
  name: "MsgItem",
  components: {ControlBtn},
  props:{
    title:{
      type:String,
      default:""
    },
    imgWidth:{
      type:String,
      default:"170px"
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
    display: flex;
    width: 100%;
    position: relative;
    .img-container{
      overflow: hidden;
      background-color: #373737;
      position: relative;
      cursor: pointer;
      img{
        .center();
        height: 100%;
      }
      .index{
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        width: 30px;
        height: 30px;
        background-color: rgba(58, 142, 230,.5);
        text-align: center;
        line-height: 30px;
        border-radius: 0 0 100% 0;
        z-index: 99;
      }
    }
    .right-msg{
      margin: 0 0 0 30px;
      width:70%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .title{
        font-size: 20px;
        color: #212121;
      }
      .user-control{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-msg{
          display: flex;
          align-items: center;
          .avatar{
            width: 20px;
            height: 20px;
            overflow: hidden;
            background-color: #373737;
            position: relative;
            border-radius: 50%;
            img{
              .center();
              height: 100%;
            }
          }
          .user-name{
            color: #3a8ee6;
          }
        }
        .msg-item-control{
          color: #9ca3ab;
          font-size: 12px;
          margin: 0 0 0 5px;
        }
      }
    }
    &:hover{
      .title{
        color: #3a8ee6;
        cursor: pointer;
      }
    }
  }
</style>