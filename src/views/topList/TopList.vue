<template>
  <div class="top-list">
    <ul class="category">
      <li v-for="(item,index) in videoCate" :key="item.categoryId"
          :class="{active:index===currentIndex}"
          @click="liClick(item,index)">
        {{item.name}}
      </li>
    </ul>
    <!--体育，视频，图片的视图-->
    <router-view/>
  </div>
</template>

<script>
import {getAllVideoCate} from "@/network/category";

export default {
  name: "TopList",
  data()
  {
    return {
      currentIndex:0,
      videoCate:[],
      path:['/Home/TopList/Life','/Home/TopList/Funny','/Home/TopList/Sport',
             '/Home/TopList/Technology','/Home/TopList/Music','/Home/TopList/Game','/Home/TopList/Movie']
    }
  },
  created() {
    getAllVideoCate().then(data=>{
      this.videoCate=data.filter((item,index)=>{
        return item.name!=="知识"
      });
    })
  },
  methods:{
    liClick(item,index)
    {
      this.currentIndex=index;
      this.$router.push({
        path:this.path[index],
        query:{
          categoryId:item.categoryId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .topic-list{

  }
  .category{
    display: flex;
    flex-wrap:wrap ;
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