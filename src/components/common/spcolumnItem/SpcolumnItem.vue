<template>
  <div class="article-item">
    <div class="left-content">
      <div class="img-container" >
        <img v-if="article.picUrl" :src="article.picUrl[0].picUrl" alt=""/>
      </div>
    </div>
    <div class="right-content">
      <div class="title text-nowrap">{{article.title}}</div>
      <div class="msg">
        <div class="user-msg">
          <div class="avatar">
            <img :src="article.user.avatarUrl" alt="" />
          </div>
          <div class="user-name">{{article.user.userName}}</div>
        </div>
        <div>
          <control-btn not-show="sub">
            <div slot="time" class="article-item-control-btn">{{article.updateTime.substring(0,10)}}</div>
            <div slot="view" class="article-item-control-btn">{{article.views}}</div>
            <div slot="comment" class="article-item-control-btn">{{article.comments}}</div>
            <div slot="thumb" class="article-item-control-btn">{{article.thumbs}}</div>
          </control-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
export default {
  name: "SpcolumnItem",
  components: {ControlBtn},
  props:{
    article:{
      type:Object,
      default()
      {
        return {
          user:{}
        }
      }
    }
  },
  created() {
    //console.log(this.spcolumn)
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  }
  .article-item{
    display: flex;
    &:hover{
      .right-content .title{
        color: #3a8ee6;
      }
    }
  }
  .left-content{
    .img-container{
      width: 150px;
      height: 100px;
      overflow: hidden;
      position: relative;
      background-color: #333;
      img{
        .center();
        width: 150px;
      }
    }
  }
  .right-content{
    margin: 0 0 0 20px;
    .title{
      font-size: 20px;
      width: 550px;
      color: #212121;
    }
    .msg{
      display:flex;
      margin: 30px 0 0 0;
      width: 450px;
      justify-content: space-between;
      .user-msg{
        display: flex;
        align-items: center;
        .avatar{
          width: 20px;
          height: 20px;
          overflow: hidden;
          position: relative;
          border-radius: 50%;
          img{
            height:20px;
            .center();
          }
        }
        .user-name{
          font-size: 12px;
          color: #3a8ee6;
        }
      }
      .article-item-control-btn{
        font-size: 12px;
        color: #9ca3ab;
        margin: 0 0 0 5px;
      }
    }
  }
</style>