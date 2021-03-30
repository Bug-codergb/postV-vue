<!--右侧头像推荐组件-->
<template>
  <div class="avatar">
    <div class="img-container">
      <img :src="userDetail.avatarUrl" />
    </div>
    <ul class="user-msg">
      <li>
        <div>{{userDetail.moments}}</div>
        <div>动态</div>
      </li>
      <li>
        <div>{{userDetail.follow?userDetail.follow.length:0}}</div>
        <div>关注</div>
      </li>
      <li>
        <div>{{userDetail.fans?userDetail.fans.length:0}}</div>
        <div>粉丝</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {userDetail} from "@/network/user";

export default {
name: "Avatar",
  props:{
    userId:{
      type:String,
      default:''
    }
  },
  data()
  {
    return {
      userDetail:{}
    }
  },
  created() {
    userDetail(this.userId).then(data=>{
      //console.log(data);
      this.userDetail=data;
    })
  }
}
</script>

<style scoped lang="less">
  .avatar{
    .img-container{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 auto;
      overflow: hidden;
      background-color: #d8e8fa;
      img{
        width: 100%;
      }
    }
    .user-msg{
      display: flex;
      width: 200px;
      margin: 10px auto;
      justify-content: space-between;
      li{
        div{
          text-align: center;
        }
      }
    }
  }
</style>