<template>
  <div class="chat">
    <div class="header">
      {{userDetail.userName}}
    </div>
    <div class="body">
      <div class="user-list"></div>
      <div class="content">
        <div class="content-text">
          <ul class="user-message" ref="content">
            <li class="profile" v-for="(item,index) in contentText" :key="item.id" >
              <div class="msg" v-if="item.user.userId===store.state.userMsg.userId||item.user.userId===userId"
                               :class="{active:item.user.userId===userId}">
                <span class="bubble">{{item.content}}</span>
                <div class="avatar" v-if="item.user">
                  <img :src="item.user.avatarUrl" />
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="inp">
          <textarea cols="124" rows="4" v-model="content"></textarea>
          <button class="send" @click="send">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userDetail} from "@/network/user";
import store from "../../../store"
export default {
  name: "Chat",
  data()
  {
    return {
      userId:'',
      userDetail:{},
      content:'',
      contentText:[],
      socket:null,
      message:null,
      store:null,
      //当前用户
      currentUser:null,
      //在线用户
      chatUsers:[]
    }
  },
  created() {
    this.store=store;
    this.userId=this.$route.query.userId;
    userDetail(this.userId).then(data=>{
      console.log(data);
      this.userDetail=data;
    })
    this.currentUser={
      userId:this.userId
    }
    this.chatUsers.push({
      userId:this.userId
    })
    this.chat();
  },
  methods:{
    send()
    {
       let content={
         id:new Date().getTime(),
         content:this.content,
         user:{
           avatarUrl:this.$store.state.userMsg.avatarUrl,
           userId:this.$store.state.userMsg.userId
         }
       }
       this.contentText.push(content);
       this.sendMessage(this.content);
       this.content="";
    },
    chat()
    {
      this.socket=new WebSocket(`ws://localhost:8333?userId=${this.$store.state.userMsg.userId}&chatUserId=${this.userId}`);
      this.socket.onopen=this.open;
      this.socket.onmessage=this.getMessage;
    },
    open()
    {
      console.log("connection")
    },
    getMessage(msg)
    {
      const {
        content,user
      }=JSON.parse(msg.data)
      this.message={
        id:new Date().getTime(),
        content:content,
        user:user
      }
      console.log(this.message);
      this.contentText.push(this.message);
      console.log(JSON.parse(msg.data));
    },
    sendMessage(content)
    {
      this.socket.send(content);
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .chat{
    height: 600px;
    .header{
      height: 40px;
      background:#89bbf0;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
    }
    .body{
      display: flex;
      .user-list{
        width: 150px;
        background: #89bbf0;
        height: 550px;
      }
      .content{
        flex: 1;
        .content-text{
          padding: 10px 20px;
          height: 410px;
          overflow-y: scroll;
          background:#fff;
          border-bottom: 1px solid rgba(135, 206, 235,.4);
          border-right: 1px solid rgba(135, 206, 235,.4);
          .user-message{
            li{
              .msg{
                padding: 8px 0;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .bubble{
                  background-color: #12b7f5;
                  font-size: 13px;
                  color: #fff;
                  padding: 5px 10px;
                  border-radius: 10px;
                }
                .avatar{
                  width: 30px;
                  height: 30px;
                  background-color: #111;
                  margin: 0 0 0 15px;
                  border-radius: 50%;
                  position: relative;
                  overflow:hidden;
                  img{
                    height: 100%;
                    .center();
                  }
                }
                &.active{
                  flex-direction: row-reverse;
                  justify-content:flex-end;
                  .avatar{
                    margin: 0 15px 0 0;
                  }
                }
              }
            }

          }
        }
        .inp{
          height: 120px;
          background: skyblue;
          position: relative;
          textarea{
            border: none;
            outline: none;
            padding: 10px;
          }
          .send{
            padding: 3px 10px;
            background-color: #3a8ee6;
            color: #fff;
            position: absolute;
            left: 90%;
            top: 100%;
            transform: translate(0,-120%);
          }
        }
      }
    }
  }
</style>