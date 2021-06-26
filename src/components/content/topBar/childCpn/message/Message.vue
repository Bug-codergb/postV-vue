<template>
  <div class="message" @click="msgClick">
    <i class="iconfont icon-xinxi"></i>
    <div class="notice" v-show="this.$store.state.chatMsg.length>0">
      {{this.$store.state.chatMsg.length}}
    </div>
    <transition name="msg">
      <div class="msg-info" v-show="isShow">
       <div @click="myMsg">我的消息</div>
        <div>系统消息</div>
      </div>
    </transition>
    <transition name="allMsg">
      <div class="all-msg" v-show="isShowMsg">
        <ul>
          <li v-for="(item,index) in this.$store.state.chatMsg"
              :key="item.id"
              @click.stop="chatRouter(item,index)">
            <div class="img-container">
              <img :src="item.avatarUrl" alt=""/>
            </div>
            <div class="content">{{item.content[0].content}}</div>
            <div class="create-time">{{formatTime(item.content[0].createTime,"yyyy-MM-dd hh:mm:ss")}}</div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import {formatDate} from "@/utils/formatDate";

export default {
  name: "Message",
  data(){
    return {
      isShow:false,
      isShowMsg:false
    }
  },
  methods:{
    msgClick(){
      this.isShow=!this.isShow;
    },
    myMsg(){
      this.isShowMsg=true;
    },
    formatTime(time,ft){
      return formatDate(time,ft)
    },
    chatRouter(item,index){
      console.log(item)
      this.$router.push({
        path:"/chatDetail",
        query:{
          userId:item.userId
        }
      });
      this.isShowMsg=false;
      this.isShow=false;
    }
  }
}
</script>

<style scoped lang="less">
  .message{
    margin: 0 0 0 40px;
    position: relative;
    i{
      font-size: 26px;
      color: #3a8ee6;
    }
    .notice{
      width: 20px;
      height: 13px;
      background-color: #ec4141;
      position: absolute;
      top: -5%;
      left: 70%;
      border-radius: 15px;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
    .msg-info{
      z-index: 9999999;
      position: absolute;
      width: 12rem;
      height:10rem;
      box-shadow:0 0 15px rgba(0,0,0,.3);
      background-color: #fff;
      left: 50%;
      top: 100%;
      transform-origin:left top;
      transform: translate(-50%,0);
      padding: 20px 0;
      border-radius: 5px;
      &>div{
        padding: 10px 20px;
        &:hover{
          background-color:#f4f4f4 ;
          cursor:pointer;
        }
      }
    }
    .msg-enter,.msg-leave-to{
      opacity: 0;
      transform:scale(0) translate(-50%,0);
    }
    .msg-enter-active,.msg-leave-active{
      transition: opacity 0.3s ,transform 0.3s;
    }
    .msg-enter-to,.msg-leave{
      opacity: 1;
      transform:scale(1) translate(-50%,0);
    }
    .all-msg{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      padding: 30px 0;
      z-index: 999999;
      box-shadow: 0 0 15px rgba(0,0,0,.3);
      width: 45rem;
      height: 25rem;
      overflow-y: scroll;
      border-radius: 5px;
      &>ul{
        width: 100%;
        &>li{
          padding:10px 30px;
          width: 100%;
          display: flex;
          align-items: center;
          &:nth-child(odd){
            background-color: #f9f9f9;
          }
          &:hover{
            background-color: #f0f1f2;
          }
          .img-container{
            width: 30px;
            height: 30px;
            overflow: hidden;
            position: relative;
            border: 1px solid rgba(0,0,0,.3);
            border-radius: 50%;
            margin: 0 20px 0 0;
            img{
              height: 100%;
              .center(50%,50%,-50%,-50%);
            }
          }
          .content{
            width: 60%;
            color: #676767;
            cursor: pointer;
          }
          .create-time{
            font-size: 13px;
            color: #656565;
          }
        }
      }
    }
  }
</style>