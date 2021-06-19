<template>
  <div class="swiper">
    <el-carousel indicator-position="outside" :height=height @change="change" ref="swiper" :autoplay="autoPlay">
      <el-carousel-item v-for="(item,index) in list" :key="item.vid||item.id">
        <div class="img-outer">
          <!--模糊-->
          <div class="img-blur" :style="{backgroundImage:`url(${item.coverUrl})`}"></div>
          <!--轮播图片-->
          <div class="img-container" @click="divClick(item,index)">
            <img :src="item.coverUrl" :alt="item.title"/>
            <div class="state text-nowrap" v-show="isShowTitle">{{item.title}}</div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props:{
    list:{
      type:Array,
      default(){
        return []
      }
    },
    height:{
      type:String,
      default:"260px"
    },
    isShowTitle:{
      type:Boolean,
      default:true
    },
    activeItem:{
      type:Number,
      default:0
    },
    autoPlay:{
      type:Boolean,
      default:true
    }
  },
  watch:{
    activeItem(newVal,oldVal){
      this.$refs.swiper.setActiveItem(newVal)
    },
  },
  methods:{
    divClick(item,index){
     this.$emit('img-click',item,index);
    },
    change(current,prev){
      this.$emit('change',current,prev);
    }
  }
}
</script>

<style scoped lang="less">
  .banner{
    .el-carousel--horizontal{
      /*width: 780px!important;*/
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
      background-image:linear-gradient(transparent 170px,rgba(0,0,0,.6));
      position: absolute;
      z-index: 999;
      img{
        vertical-align: bottom;
        width: 400px;
      }
      .state{
        width: 100%;
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