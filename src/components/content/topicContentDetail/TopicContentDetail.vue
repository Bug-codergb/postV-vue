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
      <reply :status="2" :id="contentDetail.topic_content_id"/>
      <!--评论内容-->
      <comment :comment-detail="contentDetail.comment" :status="3" v-if="contentDetail.comment"/>
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script>
import {getTopicContentDetail} from "@/network/topic";
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
import Reply from "@/components/content/reply/Reply";
import Comment from "@/components/content/comment/Comment";

export default {
  name: "TopicContentDetail",
  components: {Comment, Reply, ControlBtn},
  data()
  {
    return {
      contentDetail:{user:{},updateTime:''}
    }
  },
  created() {
    getTopicContentDetail(this.$route.query.topic_content_id).then(data=>{
      this.contentDetail=data;
    })
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
  .left-content{
    width:750px;
    height: 1500px;
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