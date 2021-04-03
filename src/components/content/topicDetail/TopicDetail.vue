<template>
  <div class="topic-detail">
    <div class="left-content"></div>
    <div class="left-right"></div>
  </div>
</template>

<script>
export default {
  name: "TopicDetail"
}
</script>

<style scoped lang="less">
  .topic-detail{
    display: flex;
    .left-content{
      width: 750px;
      height: 1000px;
      border-right: 1px solid red;
    }
    .right-content{
      flex: 1;
    }
  }
</style>