<template>
  <div class="toplist">
    <ul class="category">
      <li v-for="(item,index) in allCate"
          :class="{active:index===currentIndex}"
          @click="liClick(index)">
        {{item.name}}
      </li>
    </ul>
    <!--体育，视频，图片的视图-->
    <router-view/>
  </div>
</template>

<script>
import {getAllCate} from "@/network/toplist";

export default {
  name: "TopList",
  data()
  {
    return {
      currentIndex:0,
      path:['/Home/TopList/Video','/Home/TopList/Movie','/Home/TopList/Picture',
             '/Home/TopList/spcolumn'],
      allCate:[]
    }
  },
  created() {
    getAllCate(0,30).then(data=>{
      console.log(data)
      this.allCate=data.filter((item,index)=>{
        return item.name!=="微课堂"&&item.name!=="预告片"
      })
    })
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