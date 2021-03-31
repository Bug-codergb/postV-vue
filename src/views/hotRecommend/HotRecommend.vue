<template>
  <div class="hot-rec">
    <!--推荐轮播图-->
    <el-carousel indicator-position="outside" height="260px">
      <el-carousel-item v-for="(item,index) in banner" :key="item.momentId">
        <div class="img-container">
          <img :src="item.picUrl[0].picUrl" :alt="item.title" />
          <div class="state text-nowrap">{{item.title}}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!--视频，图片科技等-->
    <ul>
      <li v-for="(item,index) in cateDetail" :key="item.categoryId">
        <other-cate :cate-detail="item" v-if="cateDetail.length&&item.videos.length" />
      </li>
    </ul>
    <Knowledge/>
  </div>
</template>

<script>
import Moment from "@/components/content/moment/Moment";
import {getHotBanner} from "@/network/recommend";

import {getAllVideoCate, getCateDetail} from "@/network/category";
import OtherCate from "@/views/hotRecommend/childCpn/otherCate/OtherCate";
import Knowledge from "@/views/hotRecommend/childCpn/knowledge/Knowledge";

export default {
name: "HotRecommend",
  components: {Knowledge, OtherCate,Moment},
  data()
  {
    return {
      banner:[],
      recommendArc:{},
      otherRec:[],
      //所有视频分类
      videoCate:[],
      cateDetail:[]
    }
  },
  created() {
    getHotBanner().then(data=>{
      //console.log(data);
      this.banner=data;
    })
    getAllVideoCate().then(data=>{
      this.videoCate=data;
      //获取分类下视频
      let promise=data.map((item,index)=>{
        return getCateDetail(item.categoryId)
      })
      Promise.all(promise).then(data=>{
        console.log(data);
        this.cateDetail=data;
      })
    })
  }
}
</script>

<style scoped lang="less">
  .hot-rec{
    .el-carousel--horizontal{
      width: 650px!important;
      margin: 0 auto;
    }
    .img-container{
      width: 100%;
      height: 100%;
      overflow: hidden;
      justify-content: center;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background-image:linear-gradient(#9cc6f2 170px,rgba(0,0,0,.6));
      position: relative;
      img{
        vertical-align: bottom;
        width: 400px;
      }
      .state{
        width: 610px;
        position: absolute;
        top: 74%;
        left: 0;
        padding: 20px;
        font-weight: bold;
        font-size: 18px;
        color: #fff;
      }
    }
  }
</style>