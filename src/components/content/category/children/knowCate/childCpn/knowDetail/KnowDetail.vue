<template>
  <div class="know-detail">
    <div class="header">
      <div class="img-container">
        <img :src="knowDetail.picUrl" />
      </div>
      <div class="right-content">
        <div class="title">{{knowDetail.title}}</div>
        <div class="desc" v-if="knowDetail.description">{{knowDetail.description.substring(0,100)}}...</div>
      </div>
    </div>
    <div class="line"></div>
    <tab-control :list="['目录']">
      <div slot="目录">
        <ul class="catalog">
          <li v-for="(item,index) in knowDetail.content">
            <div class="index">{{index.toString().padStart(2,'0')}}</div>
            <div class="content text-nowrap" @click="knowPlayRouter(item)">{{item.title}}</div>
          </li>
        </ul>
      </div>
    </tab-control>
  </div>
</template>

<script>
import {getHotKnowContent} from "@/network/recommend";
import TabControl from "@/components/common/tabControl/TabControl";

export default {
  name: "KnowDetail",
  components: {TabControl},
  data()
  {
    return{
      knowDetail:{
        description:''
      }
    }
  },
  created() {
    getHotKnowContent(this.$route.query.kid).then(data=>{
      console.log(data)
      this.knowDetail=data;
    })
  },
  methods:{
    knowPlayRouter(item)
    {
      this.$router.push({
        path:'/knowledgePlay',
        query:{
          id:item.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .know-detail{
    width: 70%;
  }
  .header{
    display: flex;
    .img-container{
      width: 240px;
      height:150px;
      overflow: hidden;
      img{
        width: 240px;
      }
    }
    .right-content{
      width: 400px;
      margin: 0 0 0 25px;
      .title{
        font-weight: bold;
        font-size: 20px;
        margin: 0 0 30px 0;
      }
      .desc{
        font-size: 12px;
      }
    }
  }
  .line{
    width: 100%;
    height: 3px;
    background-color: #3a8ee6;
    margin: 20px 0;
  }
  .catalog{
    li{
      display: flex;
      align-items: center;
      padding: 10px 0 10px 30px;
      &:nth-child(odd)
      {
        background-color: rgba(58, 142, 230,.06);
      }
      &:hover{
        background-color: rgba(58, 142, 230,.09);
      }
      .index{
        margin: 0 30px 0 0;
        color: #3a8ee6;
      }
      .content{
        font-size: 14px;
        width: 300px;
        cursor:pointer;
        height: 100%;
        &:hover{
          color: #3a8ee6;
        }
      }
    }
  }
</style>