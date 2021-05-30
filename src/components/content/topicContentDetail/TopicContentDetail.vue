<template>
  <div class="topic-content-detail">
    <div class="left-content">
      <div class="user-msg">
        <div class="avatar">
          <img :src="contentDetail.user.avatarUrl" />
        </div>
        <div class="user-name">{{contentDetail.user.userName}}</div>
      </div>
      <!--title-->
      <div class="title">{{contentDetail.title}}</div>
      <!--内容-->
      <div class="state" v-html="contentDetail.content">{{contentDetail.content}}</div>
      <control-btn not-show="view thumb">
        <div slot="time" class="topic-content-control-btn">{{contentDetail.updateTime.substring(0,10)}}</div>
        <div slot="comment" class="topic-content-control-btn">{{contentDetail.comments}}</div>
        <div slot="sub" class="topic-content-control-btn">{{contentDetail.sub}}</div>
      </control-btn>

      <!--点赞，评论，回复按钮-->
      <reply :status="2" :id="contentDetail.topic_content_id" @reply="reply"/>
      <!--评论内容-->
      <comment :comment-detail="contentDetail.comment"
               :status="3"
                v-if="contentDetail.comment[0].commentId"
               :key="keyId"
               @reply-comment="replyComment"/>
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script>
import {getTopicContentDetail} from "@/network/topic";
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
import Reply from "@/components/content/reply/Reply";
import Comment from "@/components/content/comment/Comment";
import {publishTopicCom, replyTopicCom} from "@/network/comment";

export default {
  name: "TopicContentDetail",
  components: {Comment, Reply, ControlBtn},
  data()
  {
    return {
      contentDetail:{user:{},updateTime:'',comment:[{}]},
      keyId:0
    }
  },
  created() {
    getTopicContentDetail(this.$route.query.topic_content_id).then(data=>{
      this.contentDetail=data;
    })
  },
  methods:{
    reply(content)
    {
      publishTopicCom(this.contentDetail.topic_content_id,content).then(data=>{
        getTopicContentDetail(this.$route.query.topic_content_id).then(data=>{
          this.contentDetail=data;
          this.keyId+=1;
          this.$toast.show("发表成功");
        })
      })
    },
    replyComment(commentId,content){
       replyTopicCom(commentId,content).then(data=>{
         getTopicContentDetail(this.$route.query.topic_content_id).then(data=>{
           this.contentDetail=data;
           this.keyId+=1;
           this.$toast.show("回复成功");
         })
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
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .topic-content-detail{
    width: 1180px;
  }
  .left-content{
    width:70%;
    border-right: 1px solid rgba(58, 142, 230,.2);
    .user-msg{
      display: flex;
      align-items: center;
      .avatar{
        width: 40px;
        height: 40px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        img{
          height: 40px;
          .center();
        }
      }
      .user-name{
        font-size: 14px;
        color: #3a8ee6;
        font-weight: bolder;
        margin: 0 0 0 15px;
      }
    }
    .title{
      font-size: 20px;
      color: #333;
      font-weight: bolder;
      margin: 20px 0;
    }
    .state{
      margin: 0 0 20px 0;
      /deep/ img{
        width: 350px;
        display: block;
        margin: 20px 0;
      }
    }
    .topic-content-control-btn
    {
      color:#9ca3ab;
      font-size: 13px;
      margin: 0 5px 0 5px;
    }
  }
</style>