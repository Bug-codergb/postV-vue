<template>
  <div class="dynamic">
    <el-carousel :interval="5000" arrow="always" :autoplay="false" height="80px" indicator-position="none">
      <el-carousel-item v-for="(item,index) in [0,1]" :key="item">
        <div class="img-container" v-for="(it,i) in follow.slice(index*8,(index+1)*8)" :key="item.userId">
          <img :src="it.avatarUrl" alt=""/>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {getUserFollow} from "@/network/dynamic";

export default {
  name: "Dynamic",
  data(){
    return {
      follow:[]
    }
  },
  created() {
    getUserFollow().then(data=>{
      console.log(data);
      this.follow=data.follow;
    })
  },
}
</script>

<style scoped lang="less">
  .center(){
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .dynamic{
    .el-carousel__item{
      display: flex;
      justify-content: space-between;
    }
    .img-container{
      width: 70px;
      height: 70px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #373737;
      position: relative;
      img{
        .center();
        height: 100%;
      }
    }
  }
</style>