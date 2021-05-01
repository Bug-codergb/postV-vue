<template>
  <div class="message">
    <i class="iconfont icon-xinxi"></i>
<!--    <div class="notice">0</div>-->
  </div>
</template>

<script>
export default {
name: "Message"
}
</script>

<style scoped lang="less">
  .message{
    margin: 0 0 0 40px;
    position: relative;
    i{
      font-size: 26px;
      color: #3a8ee6;
    }
    .notice{
      width: 20px;
      height: 13px;
      background-color: #ec4141;
      position: absolute;
      top: 0;
      left: 70%;
      border-radius: 15px;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
  }
</style>