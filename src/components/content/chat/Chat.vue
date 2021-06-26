<template>
  <div class="chat">
    <div class="header">
      {{userDetail.userName}}
    </div>
    <div class="body">
        <nav-bar-control :list="chatUsers" v-if="chatUsers.length!==0" @currentChat="currentChat"
                         :current-user="store.state.userMsg.userId">
          <div class="content" v-for="(item,index) in chatUsers" :slot="item.user.userId">
            <div class="content-text">
              <!--聊天记录-->
              <ul class="user-message">
                <!--历史记录-->
                <li v-for="(item,index) in historyMsg" :key="item.id">
                  <div class="msg" :class="{active:item.user.userId===userId}">
                    <span class="bubble">{{item.content}}</span>
                    <div class="avatar" v-if="item.user">
                      <img :src="item.user.avatarUrl" alt="暂无头像" />
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
        </nav-bar-control>
      </div>
    </div>
</template>

<script>
import {goesOnline, readMsg, userDetail} from "@/network/user";
import store from "../../../store"
import NavBarControl from "@/components/common/navBarControl/NavBarControl";
import {getAllChatUserMsg} from "@/network/chat";
import {SOCKET_HOST} from "@/constants/config/config";

export default {
  name: "Chat",
  components: {NavBarControl},
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
      chatUsers:[],
      isCurrentUser:true,
      historyMsg:[]
    }
  },
  created() {
    this.store=store;
    this.userId=this.$route.query.userId;
    goesOnline(1).then(data=>{

    });
    readMsg(this.userId).then(data=>{
      this.$store.dispatch({
        type:"getChatMsgAction"
      })
    })
    getAllChatUserMsg(this.$store.state.userMsg.userId,this.userId).then(data=>{
      //console.log(data);
      this.historyMsg=data;
    })
    userDetail(this.userId).then(data=>{
      //console.log(data);
      this.userDetail=data;
      this.chatUsers.push({
        content:[],
        user:{
          userId:this.userId,
          userName:this.userDetail.userName,
          avatarUrl: this.userDetail.avatarUrl
        }
      })
    })
    this.currentUser={
      userId:this.userId
    }

    this.chat();
  },
  destroyed() {
    goesOnline(0);
    this.socket.close();
  },
  computed:{
    currentContent()
    {

    }
  },
  methods:{
    send()
    {
       let content={
         content:this.content,
         user:{
           id:new Date().getTime(),
           avatarUrl:this.$store.state.userMsg.avatarUrl,
           userId:this.$store.state.userMsg.userId
         }
       }
       //this.contentText.push(content);
       this.sendMessage(this.content);
       this.content="";
      getAllChatUserMsg(this.$store.state.userMsg.userId,this.userId).then(data=>{
        this.historyMsg=data;
      })
    },
    chat()
    {
      this.socket=new WebSocket(`${SOCKET_HOST}:8333?userId=${this.$store.state.userMsg.userId}&chatUserId=${this.userId}`);
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
      }=JSON.parse(msg.data);
      //不是当前聊天用户
      //console.log(user.userId,this.userId);
      if(user.userId!==this.userId)
      {
        let message=[];
        const isExists=this.chatUsers.findIndex((item,index)=>{
          return item.user.userId===user.userId
        })
        if(isExists!==-1)
        {
          this.chatUsers[isExists].content.push(content);
        }
        else if(isExists===-1)
        {
          message.push(content);
          this.chatUsers.push({
            user:user,
            content:message
          })
         }
      }
      //是当前聊天用户
      else{
        getAllChatUserMsg(this.$store.state.userMsg.userId,this.userId).then(data=>{
          this.historyMsg=data;
        })
      }
    },
    sendMessage(content)
    {
      this.socket.send(content);
    },
    //更改当前用户
    currentChat(item)
    {
      this.socket.close();
      this.userId=item.user.userId;
      getAllChatUserMsg(this.$store.state.userMsg.userId,this.userId).then(data=>{
        console.log(data);
        this.historyMsg=data;
      })
      this.chat();
      //console.log(item);
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
        width: 840px;
        box-shadow: 0 4px 10px rgba(0,0,0,.1);
        .content-text{
          padding: 10px 20px;
          height: 410px;
          overflow-y: scroll;
          background:#fff;
          border-bottom: 1px solid rgba(135, 206, 235,.4);
          border-right: 1px solid rgba(135, 206, 235,.4);
          &::-webkit-scrollbar{
            width: 10px;
          }
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
          background: #fff;
          position: relative;
          overflow: hidden;
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