<template>
  <div class="cate-list">
    <div class="title" v-if="title">{{title}}:</div>
    <ul>
      <li v-for="(item,index) in list" :key="item.id"
          :class="{active:currentIndex===index}"
          @click="liClick(item,index)"
          :style="{backgroundColor:color}">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CateList",
  props:{
    title:{
      type:String,
      default()
      {
        return ''
      }
    },
    list:{
      type:Array,
      default()
      {
        return []
      }
    },
    color:String,
    default:"#7698d0"
  },
  data()
  {
    return {
      currentIndex:0,
    }
  },
  methods:{
    liClick(item,index)
    {
      this.currentIndex=index;
      this.$emit('cate',item)
    }
  }
}
</script>

<style scoped lang="less">
  .cate-list{
    display: flex;
    align-items: center;
    font-size: 13px;
    color:#676767;
    margin: 10px 0 0 0;
    .title{
      margin: 0 20px 0 0;
    }
    ul{
      display: flex;
      li{
        padding: 5px 15px;
        cursor: pointer;
        border-radius: 4px;
        margin: 0 15px 0 0;
        background-image: url("../../../assets/img/video.png");
        background-color:#7698d0;
        background-size: contain;
        color: #fff;
        font-size: 13px;
        &.active{
          background-color:#8bd9f3!important;
        }
      }
    }
  }
</style>