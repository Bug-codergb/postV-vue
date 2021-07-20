<template>
  <div class="no-tip">
    <i class="iconfont icon-xiangzidakai" :style="{color:color,fontSize:font}"></i>
    <p class="content" :style="{color:color}">{{content}}</p>
  </div>
</template>

<script>
export default {
  name: "NoTip",
  props:{
    content:{
      type:String,
      default:'暂无内容'
    },
    color:{
      type:String,
      default:'#3a8ee6'
    },
    font:{
      type:String,
      default:'30px'
    }
  }
}
</script>

<style scoped lang="less">
  .no-tip{
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &>p.content{
      margin: 10px 0 0 0;
    }
  }
</style>