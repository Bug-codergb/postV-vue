<template>
  <div class="channel">
    <ul>
      <li v-for="(item,index) in this.$store.state.searchResult.channel"
          :key="item.id">
        <div class="img-container" @click="channelRouter(item,index)">
          <img :src="item.picUrl" alt=""/>
        </div>
        <div class="state text-nowrap">
          {{item.title}}
        </div>
        <div class="user-name">{{item.user.userName}}</div>
        <div class="cate">{{item.category.name}}</div>
        <div class="create-time">
          {{formatTime(item.createTime,"yyyy-MM-dd hh:mm:ss")}}
        </div>
        <div class="dt">
          {{formatTime(item.duration,"mm:ss")}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {formatDate} from "@/utils/formatDate";

export default {
  name: "Channel",
  methods:{
    formatTime(time,ft){
      return formatDate(time,ft);
    },
    channelRouter(item,index){
      console.log(item);
      this.$router.push({
        path:"/channelDetail",
        query:{
          cId:item.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .channel{
    margin: 20px 0 0 0;
    width: 100%;
    &>ul{
      &>li{
        display: flex;
        align-items: center;
        padding: 10px 0;
        &:nth-child(odd){
          background-color: #f9f9f9;
        }
        .img-container{
          width: 50px;
          height: 50px;
          overflow: hidden;
          img{
            height: 100%;
          }
        }
        .state{
          font-size: 13px;
          color: #3a8ee6;
          width: 20%;
          margin: 0 10px 0 20px;
          cursor: pointer;
        }
        .user-name{
          font-size: 13px;
          color: #656565;
          width:15%;
        }
        .cate{
          color: #3a8ee6;
          font-size: 13px;
          width: 10%;
        }
        .create-time,.dt{
          font-size: 13px;
          color: #656565;
          width: 15%;
        }
        .create-time{
          width: 20%;
        }
      }
    }
  }
</style>