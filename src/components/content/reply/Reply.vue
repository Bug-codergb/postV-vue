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
      <button class="reply-btn" @click="replyBtn">发表评论</button>
    </div>
  </div>
</template>

<script>
import {publishCom, publishTopicCom, replyComment, replyTopicCom} from "@/network/comment";
import {cancelThumb, thumbs} from "@/network/thumbs";
import {cancelSubMoment, subMoment} from "@/network/moment";
import {subTopic} from "@/network/topic";

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
  computed:{
    isThumbs()
    {
      let commentFlag=-1;
      let momentFlag=-1;
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

      if(commentFlag===-1&&momentFlag===-1)
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
      /*发送动态评论*/
      if(this.content&&this.status===0)
      {
        publishCom(this.content,this.id).then(data=>{
          this.$store.dispatch({
            type:'getMomentDetail',
            momentId:this.id
          })
          this.isShowCom=false;
          this.$toast.show("评论成功",2000);
          this.$emit('reply')
        })
      }
      /*回复评论的评论*/
      if(this.content&&this.status===1)
      {
        replyComment(this.content,this.id).then(data=>{
          this.isShowCom=false;
          this.$toast.show("回复评论成功",2000);
          this.$bus.$emit('replyComment');
        })
      }
      //发表专题评论
      if(this.content&&this.status===2)
      {
        this.isShowCom=false;
        publishTopicCom(this.id,this.content).then(data=>{
          this.$toast.show("评论成功",2000);
          this.$emit('reply')
        })
      }
      //回复专题评论
      if(this.content&&this.status===3)
      {
        this.isShowCom=false;
        replyTopicCom(this.id,this.content).then(data=>{
          this.$toast.show("回复成功",2000);
          this.$bus.$emit('replyTopicComment');
        })
      }
    },
    //点赞
    thumbs()
    {
      if(!this.isThumbs)
      {
        thumbs(this.id).then(data=>{
          console.log(data)
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
          this.$toast.show("点赞成功",3000);
        })
      }
      if(this.isThumbs)
      {
         cancelThumb(this.id).then(data=>{
           console.log(data)
           this.$store.dispatch({
             type:'getUserDetailAction',
             userId:this.$store.state.userMsg.userId
           })
         })
      }

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
    width: 610px;
    margin: 10px auto 20px;
  }
  .comment-content textarea{
    width: 500px;
    display: block;
    height: 25px;
    padding: 20px;
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