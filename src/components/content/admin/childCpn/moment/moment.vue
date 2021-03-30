<template>
  <div>
    <ul class="check-moment">
      <li v-for="(item,index) in allCheckMoment" :key="item.momentId">
        <div class="title text-nowrap">{{item.title}}</div>
        <div class="content text-nowrap">{{item.content}}</div>
        <div class="creator">{{item.user.userName}}</div>
        <div class="time">{{item.updateTime.substring(0,10)}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllCheckMoment} from "@/network/admin";

export default {
  name: "moment",
  data()
  {
    return {
      allCheckMoment:[]
    }
  },
  created() {
    getAllCheckMoment().then(data=>{
      console.log(data);
      this.allCheckMoment=data;
    })
  }
}
</script>

<style scoped lang="less">
  .check-moment{
    li{
      display: flex;
      font-size: 14px;
      padding:10px 0;
      &:nth-child(odd)
      {
        background-color: rgba(58, 142, 230,.1);
      }
      .title{
        width: 200px;
      }
      .content{
        width: 300px;
      }
      .creator{
        font-size: 12px;
        width: 100px;
      }
      .time{
        font-size: 12px;
      }
    }
  }
</style>