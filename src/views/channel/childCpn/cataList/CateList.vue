<template>
  <div class="cate-list">
    <ul>
      <li v-for="(item,index) in cateList" :key="item.id"
          @click="cateClick(item,index)"
          :class="{active:currentIndex===index}">
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
     cateList:[],
      currentIndex:0
    }
  },
  created() {
    getAllCate().then(data=>{
     // console.log(data);
      this.cateList=data;
    })
  },
  methods:{
    cateClick(item,index){
      this.currentIndex=index;
      this.$emit("cate-click",item);
    }
  }
}
</script>

<style scoped lang="less">
  .cate-list{
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        padding: 5px 15px;
        margin: 0 15px 0 0;
        cursor:pointer;
        font-size: 13px;
        border-radius: 5px;
        &.active{
          background-color:#d8e8fa;
          color: #3a8ee6;
        }
      }
    }
  }
</style>