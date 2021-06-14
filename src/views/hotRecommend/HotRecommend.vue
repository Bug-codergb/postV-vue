<template>
  <div class="hot-rec">
    <!--推荐轮播图-->
    <el-carousel indicator-position="outside" height="260px">
      <el-carousel-item v-for="(item,index) in banner" :key="item.momentId">
        <div class="img-outer">
          <!--模糊-->
          <div class="img-blur" :style="{backgroundImage:`url(${item.picUrl[0].picUrl})`}"></div>
          <!--轮播图片-->
          <div class="img-container" @click="momentRouter(item)" >
            <img :src="item.picUrl[0].picUrl" :alt="item.title"/>
            <div class="state text-nowrap">{{item.title}}</div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!--推荐动态-->
    <Spcolumn :article="recommendArc" v-if="recommendArc&&recommendArc.moments"/>
    <!--视频，图片科技等-->
    <ul>
      <li v-for="(item,index) in otherRec" :key="item.categoryId">
        <other-cate :cate-detail="item" v-if="otherRec.length&&item.moments.length" />
      </li>
    </ul>
    <Knowledge/>
  </div>
</template>

<script>
import {getCateMsg} from "@/network/moment";
import Moment from "@/components/content/moment/Moment";
import {getHotBanner} from "@/network/recommend";
import Spcolumn from "@/views/hotRecommend/childCpn/spcolumn/Spcolumn";
import {getAllCate} from "@/network/toplist";
import OtherCate from "@/views/hotRecommend/childCpn/otherCate/OtherCate";
import Knowledge from "@/views/hotRecommend/childCpn/knowledge/Knowledge";

export default {
name: "HotRecommend",
  components: {Knowledge, OtherCate, Spcolumn, Moment},
  data()
  {
    return {
      banner:[],
      recommendArc:{},
      otherRec:[]
    }
  },
  created() {
    getHotBanner().then(data=>{
      this.banner=data;
    })
    getAllCate(0,10).then(data=>{
      let promise=data.map((item,index)=>{
        return getCateMsg(item.categoryId)
      })
      Promise.all(promise).then(data=>{
        console.log(data);
        this.recommendArc=data.filter((item,index)=>{
          return item.name==='专栏'
        })[0]
        this.otherRec=data.filter((item,index)=>{
          return item.name!=='专栏'
        });
      })
    })
  },
  methods:{
    momentRouter(item)
    {
      if(item.type===1)
      {
        this.$router.push({
          path:'/videoDetail',
          query:{
            vid:item.vid
          }
        })
      }
      if(item.type===0)
      {
        this.$router.push({
          path:'/momentDetail',
          query:{
            momentId:item.momentId,
            userId:item.user.userId
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .hot-rec{
    .el-carousel--horizontal{
      width: 780px!important;
      margin: 0 auto;
    }
    .img-outer{
      width: 100%;
      height: 100%;
      position: relative;
    }
    .img-container{
      width: 100%;
      height: 100%;
      overflow: hidden;
      justify-content: center;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      /*background-image:linear-gradient(transparent 170px,rgba(0,0,0,.6));*/
      position: absolute;
      z-index: 999;
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
    .img-blur{
      width: 100%;
      height: 100%;
      position: absolute;
      background-repeat: no-repeat;
      filter:blur(10px);
      background-size: cover;
    }
  }
</style>