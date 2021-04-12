<template>
  <div class="advert" v-if="this.$store.state.userDetail.vip!==1">
    <el-carousel height="160px" v-if="allAdvert.length" arrow="never" :autoplay="false" indicator-position="outside">
      <el-carousel-item v-for="item in allAdvert" :key="item.advertId">
       <div class="content">
         <a class="small" style="display: block" :href="item.url" target="_blank">
           <img :src="item.picUrl" />
         </a>
         <div class="tip">广告</div>
         <div class="title text-nowrap">{{item.title}}</div>
       </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {getAllAdvert} from "@/network/admin/advertisement";

export default {
  name: "Advert",
  data()
  {
    return {
      allAdvert:[]
    }
  },
  created() {
    getAllAdvert(0,5).then(data=>{
      console.log(data);
      this.allAdvert=data;
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
  .el-carousel__item {
    background-color: rgba(0,0,0,.4);
  }
  .content{
    position: relative;
    img{
      height: 160px;
    }
    .tip{
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(58, 142, 230,.5);
      font-size: 13px;
      padding: 5px;
      color: #fff;
    }
    .title{
      position: absolute;
      padding: 10px 15px;
      top: 100%;
      left: 0;
      transform: translate(0,-100%);
      background-image:linear-gradient(transparent 2px,rgba(0,0,0,.6));
      color: #fff;
      font-size: 13px;
      font-weight: bold;
      width: 100%;
    }
  }
</style>