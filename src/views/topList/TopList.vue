<template>
  <div class="toplist">
    <ul class="category">
      <li v-for="(item,index) in ['视频','放映厅','图片','科技','体育','搞笑']"
          :class="{active:index===currentIndex}"
          @click="liClick(index)">
        {{item}}
      </li>
    </ul>
    <!--体育，视频，图片的视图-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "TopList",
  data()
  {
    return {
      currentIndex:0,
      path:['/Home/TopList/Video','/Home/TopList/Movie','/Home/TopList/Picture',
             '/Home/TopList/Technology','/Home/TopList/Sport','/Home/TopList/Funny']
    }
  },
  methods:{
    liClick(index)
    {
      this.currentIndex=index;
      this.$router.push({
        path:this.path[index]
      })
    }
  }
}
</script>

<style scoped lang="less">
  .category{
    display: flex;
    li{
      background-color: #3a8ee6;
      margin: 0 15px;
      padding: 3px 15px;
      color: #fff;
      font-size: 14px;
      cursor:pointer;
      &.active{
        background-color: #0c73c2;
      }
    }
  }
</style>