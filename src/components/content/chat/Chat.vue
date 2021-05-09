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
            <li class="profile" v-for="(item,index) in contentText" :key="item.id">
              <span class="bubble">{{item.content}}</span>
              <div class="avatar">
                <img :src="item.user.avatarUrl" />
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
    }
  },
  created() {
    this.userId=this.$route.query.userId;
    userDetail(this.userId).then(data=>{
      console.log(data);
      this.userDetail=data;
    })
    this.chat();
  },
  methods:{
    createFragment(tool)
    {
      const fragment=document.createDocumentFragment();
      let li=document.createElement('li');
      let span=document.createElement("span");
      let div=document.createElement("div");
      let img=document.createElement("img");
      img.src=this.userDetail.avatarUrl;
      span.innerHTML=tool;
      li.appendChild(span);
      div.appendChild(img);
      div.className="avatar";
      li.appendChild(div);
      li.className="profile";
      fragment.appendChild(li);
      this.$refs.content.appendChild(fragment);
    },
    send()
    {
       let content={
         id:new Date().getTime(),
         content:this.content,
         user:{
           avatarUrl:this.userDetail.avatarUrl
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
      console.log(msg.data)
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
          background:#fff;
          border-bottom: 1px solid rgba(135, 206, 235,.4);
          border-right: 1px solid rgba(135, 206, 235,.4);
          .user-message{
            li{
              padding: 8px 0;
            }
            .profile{
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