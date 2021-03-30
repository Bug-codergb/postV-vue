<template>
  <div class="cate-list">
    <div class="title">{{title}}:</div>
    <ul>
      <li v-for="(item,index) in list" :key="item" :class="{active:currentIndex===index}" @click="liClick(item,index)">
        {{item}}
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
    }
  },
  data()
  {
    return {
      currentIndex:0
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
        padding: 3px 10px;
        cursor: pointer;
        border-radius: 5px;
        margin: 0 10px 0 0;
        &.active{
          background-color: rgba(58, 142, 230,.2);
          color: #3a8ee6;
        }
      }
    }
  }
</style>