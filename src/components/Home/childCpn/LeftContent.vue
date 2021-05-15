<template>
  <div class="left-content">
    <router-view class="home-nav"/>
  </div>
</template>
<script>
export default {
  name: "LeftContent",
  data()
  {
    return {
      isRouterAlive:true
    }
  }
}
</script>

<style scoped lang="less">
  .home-nav{
    width:826px;
    padding: 0 30px 0 0;
    border-right: 1px solid rgba(58, 142, 230,.2);
    /*background: orange;*/
  }
</style>