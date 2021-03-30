<template>
  <div class="know-detail">
   <div class="header">
     <div class="img-container">
       <img :src="knowDetail.picUrl" />
     </div>
     <div class="state">{{knowDetail.title}}</div>
   </div>
    <div class="line"></div>
    <p>列表</p>
    <ul class="know-list">
      <li v-for="(item,index) in knowDetail.content" :key="item.id" @click="play(item)">
        <div class="index">{{index.toString().padStart(2,'0')}}</div>
        <div class="title">{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getKnowContent} from "@/network/admin/knowledge";

export default {
  name: "KnowDetail",
  data()
  {
    return {
      knowDetail:{}
    }
  },
  created() {
    getKnowContent(this.$route.query.kid).then(data=>{
      this.knowDetail=data;
    })
  },
  methods:{
    play(item)
    {
      this.$router.push({
        path:'/admin/videoPlay',
        query:{
          id:item.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .header{
    display: flex;
    .img-container{
      width: 200px;
      height: 150px;
      overflow: hidden;
      img{
        width: 200px;
      }
    }
    .state{
      margin: 0 0 0 20px;
    }
  }
  .line{
    width: 70%;
    height: 4px;
    background-color: rgba(58, 142, 230,.6);
  }
  .know-list{
    li{
      display: flex;
      align-items: center;
      padding: 10px 5px;
      cursor:pointer;
      &:nth-child(odd)
      {
        background-color: rgba(58, 142, 230,.06);
      }
      &:hover{
        background-color: rgba(58, 142, 230,.07);
      }
      .index{
        margin: 0 20px 0 20px;
        width: 100px;
        color: #3a8ee6;
      }
    }
  }
</style>