<template>
  <div class="reply">
    <div class="moment-operator">
      <i class="iconfont icon-dianzan"
         :class="{active:isThumbs}"
         @click="thumbs"
         :style="replyStyle"
         title="点赞"></i>
      <i class="iconfont icon-pinglun"
         @click="publishCom"
         :style="replyStyle"
         title="评论"></i>
      <i class="iconfont icon-biaoqianA01_shoucang-49 subscribe"
         title="收藏"
         :class="{active:isSub}"
         @click="subscribe"
         v-show="isShowSub"></i>
      <i class="iconfont icon-fenxiangzhuanfafasongzhijiantouyuanxingshar"
         :style="replyStyle"
         title="转发"></i>
      <slot name="delete"></slot>
    </div>
    <div class="comment-content" v-show="isShowCom">
      <textarea v-model="content" rows="5" cols="80"
                :disabled="this.$store.state.loginType!==1"/>
      <div ref="commentEdit" id="comment-edit"></div>
      <button class="reply-btn" @click="replyBtn">发表评论</button>
    </div>
  </div>
</template>

<script>
import {cancelSubMoment, subMoment} from "@/network/moment";
import {subTopic} from "@/network/topic";
import E from "wangeditor";
import {APP_HOST} from "@/constants/config/config";
import store from "@/store";

export default {
name: "Reply",
  data()
  {
    return {
      isShowCom:false,
      content:'',
    }
  },
  props:{
    id:{
      type:String,
      default:''
    },
    replyStyle:{
      type:Object,
      default()
      {
        return {}
      }
    },
    status:{
      type:Number,
      default:0
    },
    isShowSub:{
      type:Boolean,
      default:true
    }
  },
  mounted() {
    const editor = new E(this.$refs.commentEdit);
    editor.config.showLinkImg = false;
    editor.config.excludeMenus = [
      'head',
      'video',
      'code',
      'redo',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'list',
      'todo',
      'justify',
      'table',
      'code',
      'splitLine',
      'undo',
      'redo',
    ];
    editor.config.showFullScreen =false;
    editor.config.onchange =(html)=>{
      this.content=html;
    }
    editor.config.uploadImgHeaders = {
      authorization:store.state.userMsg.token
    }
    editor.config.uploadImgServer =`${APP_HOST}/comment/upload/pic`;
    editor.config.uploadFileName = 'comment_picture';
    editor.config.uploadImgParamsWithUrl = true;

    editor.config.uploadImgHooks = {
      success:(xhr)=>{
        const {momentId}=JSON.parse(xhr.response);
        this.momentId=momentId;
      },
    }
    editor.create();
  },
  computed:{
    isThumbs()
    {
      let commentFlag=-1;
      let momentFlag=-1;
      let channelFlag=-1;
      //是否点赞评论
      if(this.$store.state.userDetail.thumbs.comment)
      {
        commentFlag=this.$store.state.userDetail.thumbs.comment.findIndex((item,index)=>{
          return this.id===item.commentId
        })
      }
      //是否点赞动态
      if(this.$store.state.userDetail.thumbs.moment)
      {
          momentFlag=this.$store.state.userDetail.thumbs.moment.findIndex((item,index)=>{
          return this.id===item.momentId
        })
      }
      //是否点赞频道
      if(this.$store.state.userDetail.thumbs.channel){
        channelFlag=this.$store.state.userDetail.thumbs.channel.findIndex((item,index)=>{
          return this.id===item.cId
        })
      }
      if(commentFlag===-1&&momentFlag===-1&&channelFlag===-1)
      {
        return false
      }
      else{
        return true
      }
    },
    //是否已经收藏
    isSub()
    {
      let flag=-1;
      if(this.$store.state.userDetail.subscribe.moment)
      {
        flag=this.$store.state.userDetail.subscribe.moment.findIndex((item,index)=>{
          return this.id===item.momentId
        })
      }
      if(this.$store.state.userDetail.subscribe.topicContent&&flag===-1)
      {
        flag=this.$store.state.userDetail.subscribe.topicContent.findIndex((item,index)=>{
          return this.id===item.topic_content_id
        })
      }
      if(flag===-1)
      {
        return false
      }
      else{
        return true;
      }
    }
  },
  methods:{
    publishCom()
    {
      this.isShowCom=!this.isShowCom
    },
    replyBtn()
    {
      if(this.content.trim().length!==0){
        this.$emit("reply",this.content);
        this.isShowCom=false;
      }else{
        this.$toast.show("内容不能为空",1500);
      }
    },
    //点赞
    thumbs()
    {
      this.$emit("thumb",this.isThumbs);
    },
    //收藏
    subscribe()
    {
      if(!this.isSub)
      {
        if(this.status===0)
        {
          subMoment(this.id,this.$store.state.userMsg.userId).then(data=>{
            console.log(data)
            this.$store.dispatch({
              type:'getUserDetailAction',
              userId:this.$store.state.userMsg.userId
            })
          })
        }
        //收藏专题
        if(this.status===2)
        {
          subTopic(this.id,this.$store.state.userMsg.userId).then(data=>{
            this.$store.dispatch({
              type:'getUserDetailAction',
              userId:this.$store.state.userMsg.userId
            })
          })
        }
      }
      else{
        if(this.status===0)
        {
          cancelSubMoment(this.id,this.$store.state.userMsg.userId).then(data=>{
            console.log(data);
            this.$store.dispatch({
              type:'getUserDetailAction',
              userId:this.$store.state.userMsg.userId
            })
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  .reply{
    margin: 0 0 10px 0;
    position: relative;
  }
  .moment-operator{
    display: flex;
    justify-content:flex-end;
    align-items: center;
    padding: 0 20px 0 0;
  }
  .moment-operator i{
    display: inline-block;
    font-size: 18px;
    margin: 0 13px 0 0;
    cursor: pointer;
    color: #9b9b9b;
  }
  .moment-operator i:hover{
    color: #7f7f7f;
  }
  /*发布的评论内容*/
  .comment-content{
     display: flex;
     align-items: center;
     width: 90%;
     margin: 10px auto 20px;
    #comment-edit{
      width: 100%;
      height: 200px;
    }
  }
  .comment-content textarea{
    width: 500px;
    height: 65px;
    padding: 20px;
    display: none;
    &:focus{
      outline:1px solid #3a8ee6;
      border: none;
    }
  }
  /*回复按钮*/
  .reply-btn{
    padding: 3px 15px;
    background-color:rgba(58, 142, 230,.7);
    color: #fff;
    border-radius: 5px;
    font-size: 13px;
    cursor: pointer;
    height: 65px;
    width: 65px;
    margin: 0 0 0 5px;
  }
  /*点赞*/
  .moment-operator i:nth-child(1).active{
    color: #3a8ee6;
  }
  /*收藏*/
  i.subscribe{
    font-size: 25px;
    &.active{
      color: #3a8ee6;
    }
  }
</style>