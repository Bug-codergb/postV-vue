<template>
  <div class="dynamic">
    <div id="swiper">
      <el-carousel :interval="5000" arrow="never" :autoplay="false" height="80px"
                   indicator-position="none"
                   ref="carousel"
                   v-if="follow.length!==0">
        <el-carousel-item v-for="(item,index) in swiperItemL" :key="item">
          <div class="img-container" v-for="(it,i) in follow.slice(index*8,(index+1)*8)"
               :key="item.userId"
                @click="divClick(it,i)"
                :class="{active:liveIndex===i}">
            <img :src="it.avatarUrl" alt=""/>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="prev" @click="prev">
        <i class="iconfont icon-svgarrowsright"></i>
      </div>
      <div class="next" @click="next">
        <i class="iconfont icon-svgarrowsright"></i>
      </div>
    </div>
    <ul class="cate-list">
      <li v-for="(item,index) in cate"
          :key="item.categoryId"
          :class="{active:currentIndex===index}"
          @click="liClick(item,index)">
        {{item.name}}
      </li>
    </ul>
    <DynamicList :list="dynamic"/>
  </div>
</template>

<script>
import {getUserDynamic, getUserFollow} from "@/network/dynamic";
import {getAllCate} from "@/network/category";
import DynamicList from "@/views/dynamic/childCpn/dynamicList/DynamicList";

export default {
  name: "Dynamic",
  components: {DynamicList},
  data(){
    return {
      follow:[],
      cate:[],
      currentIndex:0,
      liveIndex:0,
      userId:"",
      cateId:"",
      dynamic:[]
    }
  },
  created() {
    getUserFollow().then(data=>{
      //console.log(data.follow);
      this.follow=data.follow;
      this.userId=data.follow[0].userId;
      getAllCate(0,20).then(data=>{
        this.cate=data;
        this.cateId=data[0].categoryId
        this.divClick(this.follow[0],0)
      })
    });
  },
  computed:{
    swiperItemL(){
      return Math.ceil(this.follow.length/8);
    }
  },
  methods:{
    prev(){
      this.$refs.carousel.prev();
    },
    next(){
      this.$refs.carousel.prev();
    },
    liClick(item,index){
      this.cateId=item.categoryId;
      this.currentIndex=index;
      getUserDynamic(this.userId,item.categoryId).then(data=>{
        this.dynamic=data;
        console.log(data);
      })
    },
    divClick(item,index){
      this.userId=item.userId;
      this.liveIndex=index;
      getUserDynamic(item.userId,this.cateId).then(data=>{
        this.dynamic=data;
        console.log(data);
      })
    }
  }
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
    #swiper{
      width: 100%;
      background-color: #fff;
      position: relative;
      .prev{
        position: absolute;
        transform: rotateZ(180deg) translate(0,50%);
        left:0;
        top: 50%;
      }
      .next{
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translate(-100%,-50%);
      }
      .prev,.next{
        cursor:pointer;
        i{
          font-size: 20px;
          color: #ccd0d7;
          font-weight: bolder;
        }
      }
    }
    .el-carousel__item{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .el-carousel{
      width: 90%;
      margin: 0 auto;
      padding: 0 10px;
    }
    .img-container{
      width: 60px;
      height:60px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #373737;
      position: relative;
      img{
        .center();
        height: 100%;
      }
      &.active{
        border: 3px solid #3a8ee6;
      }
    }
    .cate-list{
      margin:20px 0 0 0;
      padding: 10px 0;
      display: flex;
      align-items: center;
      li{
        padding: 0 10px 3px 10px;
        color: #99a2aa;
        margin: 0 10px;
        cursor: pointer;
        &.active{
          border-bottom: 2px solid #3a8ee6;
          color: #3a8ee6;
        }
      }
    }
  }
</style>