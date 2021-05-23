<template>
  <div class="cate-list">
    <ul>
      <li v-for="(item,index) in cateList" :key="item.id">
        {{item.name}}
      </li>
    </ul>

  </div>
</template>

<script>
import {getAllCate} from "@/network/channel";

export default {
  name: "CateList",
  data(){
    return {
     cateList:[]
    }
  },
  created() {
    getAllCate().then(data=>{
     // console.log(data);
      this.cateList=data;
    })
  }
}
</script>

<style scoped lang="less">
  .cate-list{
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        padding: 5px 10px;
        margin: 0 15px 0 0;
      }
    }
  }
</style>