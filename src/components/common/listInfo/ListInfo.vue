<template>
  <div class="list-info">
    <div class="img-container">
      <slot name="img"></slot>
    </div>
    <!--右部内容-->
    <div :style="{display:displayStyle}">
      <div class="state">
        <slot name="state"></slot>
      </div>
      <div class="operator">
        <slot name="operator"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "ListInfo",
  props:{
    displayStyle:{
      type:String,
      default:'block'
    }
  }
}
</script>

<style scoped>
  .list-info{
    display: flex;
    align-items: center;
  }
  .img-container{
    width:60px;
    overflow: hidden;
    margin: 0 10px 0 0;
  }
  .img-container img{
    width: 60px;
  }
</style>