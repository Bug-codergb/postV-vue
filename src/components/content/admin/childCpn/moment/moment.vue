<template>
  <div>
    <ul class="check-moment">
      <li v-for="(item,index) in allCheckMoment" :key="item.momentId">
        <div class="title text-nowrap" @click="momentRouter(item)">{{item.title}}</div>
        <div class="content text-nowrap">{{item.content}}</div>
        <div class="creator">{{item.user.userName}}</div>
        <div class="time">{{item.updateTime.substring(0,10)}}</div>
        <div class="check" @click="check(item)" v-show="item.status===0">
          未通过
        </div>
        <div class="check" v-show="item.status">
          <i class="iconfont icon-danyehuaban"></i>已通过
        </div>
        <div class="delete" @click="delMoment(item,index)">删除</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllCheckMoment} from "@/network/admin";
import {checkMoment, delMoment} from "@/network/admin/moment";

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
  },
  methods:{
    momentRouter(item)
    {
      console.log(item);
      this.$router.push({
        path:'/admin/adminMomentDetail',
        query:{
          momentId:item.momentId,
          userId:item.user.userId
        }
      })
    },
      //审核内容
      check(item)
      {
        checkMoment(item.momentId).then(data=>{
          console.log(data);
        })
      },
    //删除动态
    delMoment(item,index)
    {
      const flag=confirm("你确定要删除吗?");
      if(flag)
      {
        delMoment(item.momentId).then(data=>{
          if(data)
          {
            this.$delete(this.allCheckMoment,index)
          }
        })
      }
    }
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
        width: 150px;
      }
      //审核通过或未通过按钮
      .check,.delete{
        background-color: #3a8ee6;
        margin: 0 10px 0 0;
        color: #fff;
        font-size: 13px;
        padding: 3px 10px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
</style>