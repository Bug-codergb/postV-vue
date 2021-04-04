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
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script>
import {getTopicContentDetail} from "@/network/topic";

export default {
  name: "TopicContentDetail",
  data()
  {
    return {
      contentDetail:{user:{}}
    }
  },
  created() {
    getTopicContentDetail(this.$route.query.topic_content_id).then(data=>{
      console.log(data)
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
    border-right: 1px solid red;
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
      /deep/ img{
        width: 350px;
        display: block;
      }
    }
  }
</style>