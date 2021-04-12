<template>
  <div class="advert">
    <button class="add-advert">添加广告</button>
    <div class="advert-content">
      <textarea rows="2" cols="20"></textarea>
      <div class="control-btn">
        <button></button>
      </div>
    </div>
    <ul>
      <li v-for="(item,index) in adverts" :key="item.advertId">
        <div class="img-container">
          <img :src="item.picUrl" :alt="item.title"/>
        </div>
        <div class="title">
          <a :href="item.url" target="_blank">{{item.title}}</a>
        </div>
        <div class="creatTime">{{item.createTime.substring(0,10)}}</div>
        <div class="creator">{{item.user.userName}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllAdvert} from "@/network/admin/advertisement";

export default {
name: "Advertisement",
  data()
  {
    return {
      adverts:[]
    }
  },
  created() {
    getAllAdvert(0,30).then(data=>{
      console.log(data);
      this.adverts=data;
    })
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .advert{
    background-color: pink;
    .advert-content{
      padding: 20px;
      box-shadow: 0 0 15px rgba(0,0,0,.3);
      position: absolute;
      z-index: 99;
      background-color: #fff;
    }
    .add-advert{
      width: 200px;
      height: 40px;
      background-color: #3a8ee6;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin: 20px auto;
      display: block;
      cursor: pointer;
    }
    ul{
      li{
        padding: 10px;
        display: flex;
        align-items: center;
        &:nth-child(odd)
        {
          background-color: #f0f6fd;
        }
        .title{
          width: 260px;
          margin: 0 0 0 20px;
        }
        .creatTime,.creator{
          color: #616162;
          font-size: 12px;
          width: 150px;
        }
      }
    }
    .img-container{
      width: 50px;
      height: 50px;
      overflow: hidden;
      background-color: #333;
      position: relative;
      img{
        .center();
        width: 50px;
      }
    }
  }
</style>