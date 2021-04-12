<!--为图片封装的cpn-->
<template>
  <div class="image">
    <div class="left-content">
      <div class="title" @click="imgRouter">{{imgDetail.title}}</div>
      <div class="msg">
        <div class="user-msg">
          <div class="avatar">
            <img :src="imgDetail.user.avatarUrl" />
          </div>
          <div class="user-name">{{imgDetail.user.userName}}</div>
        </div>
        <control-btn not-show="sub">
          <div slot="time" class="image-cate-control-btn">{{imgDetail.updateTime.substring(0,10)}}</div>
          <div slot="thumb" class="image-cate-control-btn">{{imgDetail.thumbs}}</div>
          <div slot="comment" class="image-cate-control-btn">{{imgDetail.comments}}</div>
          <div slot="view" class="image-cate-control-btn">{{imgDetail.views}}</div>
        </control-btn>
      </div>
    </div>
    <div class="right-content">
      <!--图片内容-->
      <div class="img-container" @click="imgRouter">
        <img :src="imgDetail.picUrl[0].picUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
export default {
  name: "Images",
  components: {ControlBtn},
  props:{
    imgDetail:{
      type:Object,
      default()
      {
        return {}
      }
    }
  },
  methods:{
    imgRouter()
    {
      console.log(this.imgDetail)
      this.$router.push({
        path:'/imageDetail',
        query:{
          momentId:this.imgDetail.momentId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.center()
{
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
  .left-content{
    .title{
      font-size: 20px;
      color: #212121;
    }
  }
  .image{
    display: flex;
    justify-content: space-between;
    padding: 10px 30px 10px 0;
  }
  .msg{
    display: flex;
    margin: 30px 0 0 0;
    .user-msg{
      display: flex;
      align-items: center;
      margin: 0 20px 0 0;
      .avatar{
        width: 20px;
        height: 20px;
        overflow: hidden;
        position: relative;
        border-radius: 50%;
        img{
          height: 20px;
          .center();
        }
      }
      .user-name{
        font-size: 12px;
        color: #3a8ee6;
      }
    }
    .image-cate-control-btn{
      font-size: 12px;
      color: #9ca3ab;
      margin: 0 0 0 5px;
    }
  }
.right-content{
  width: 117px;
  height: 88px;
  background-color: #333;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  img{
    height: 117px;
    .center();
  }
}
</style>