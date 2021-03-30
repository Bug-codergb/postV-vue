<template>
  <div class="image-detail">
    <div class="left-content">
      <!--用户信息-->
      <div class="user-msg">
        <div class="avatar">
          <img :src="momentDetail.user.avatarUrl" />
        </div>
        <div class="user-name">{{momentDetail.user.name}}</div>
      </div>
      <!--标题-->
      <p class="title">{{momentDetail.title}}</p>
      <!--图片-->
      <div class="img-container">
        <img :src="momentDetail.picUrl[0].picUrl" />
      </div>
      <reply :id="momentDetail.momentId"/>
      <comment :moment-id="momentDetail.momentId" v-if="momentDetail.momentId"/>
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script>
import {momentDetail} from "@/network/home";
import Reply from "@/components/content/reply/Reply";
import Comment from "@/components/content/comment/Comment";

export default {
name: "ImageDetail",
  components: {Comment, Reply},
  data()
  {
    return {
      momentDetail:{
        user:{},
        picUrl:[
          {picUrl:''}
        ]
      }
    }
  },
  created() {
    momentDetail(this.$route.query.momentId).then(data=>{
      console.log(data);
      this.momentDetail=data;
    })
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
  .image-detail{
    display: flex;
  }
  .left-content{
    width: 710px;
    height: 1500px;
    border-right: 1px solid #3a8ee6;
    .user-msg{
      display: flex;
      align-items: center;
      .avatar{
        width: 30px;
        height:30px;
        overflow: hidden;
        position: relative;
        border-radius: 50%;
        img{
          height:30px ;
          .center();
        }
      }
      .user-name{
        color: #3a8ee6;
        font-size: 14px;
        margin: 0 0 0 15px;
      }
    }
    .title{
      font-size: 20px;
      font-weight: bolder;
      margin: 10px 0;
    }
    .img-container{
      width: 300px;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
  }
  .right-content{
    flex: 1;
  }
</style>