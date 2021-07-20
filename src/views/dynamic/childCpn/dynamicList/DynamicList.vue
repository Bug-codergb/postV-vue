<template>
  <div class="dynamic-list">
    <ul>
      <li v-for="(item,index) in list" :key="item.momentId">
        <div class="avatar">
          <img :src="item.user.avatarUrl" alt=""/>
        </div>
        <div class="msg">
          <div class="user-name">{{item.user.userName}}</div>
          <div class="time">{{formatTime(item.updateTime,"yyyy-MM-dd hh:mm:ss")}}</div>
          <div class="title" @click="momentRouter(item,index)">{{item.title}}</div>
          <div class="content-container" @click="momentRouter(item,index)">
            <div class="img-container" v-if="item.picUrl" ref="imgContainer">
              <img :src="item.picUrl[0]" alt=""/>
            </div>
            <div class="content" v-html="item.content"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {formatDate} from "@/utils/formatDate";

export default {
  name: "DynamicList",
  props:{
    list:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    formatTime(time,ft){
      return formatDate(time,ft);
    },
    momentRouter(item,index){
      console.log(item);
      const {type}=item;
      if(type===1){
        this.$router.push({
          path:"/videoDetail",
          query:{
            vid:item.vid
          }
        })
      }else if(type===0){
        this.$router.push({
          path:"/momentDetail",
          query:{
            userId:item.user.userId,
            momentId:item.momentId
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .center(){
    position:absolute;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .dynamic-list{
    &>ul{
      &>li{
        display: flex;
        align-items: flex-start;
        padding: 15px 0;
        border-bottom: 1px solid #d8e8fa;
        .avatar{
          width: 60px;
          height: 60px;
          overflow: hidden;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(0,0,0,.1);
          position: relative;
          img{
            .center;
            height: 100%;
          }
        }
        .msg{
          margin: 0 0 0 30px;
          flex: 1;
          .user-name{

          }
          .title{
            margin:10px 0;
          }
          .time{
            margin:5px 0;
            color:#99a2aa;
          }
          .content-container{
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            border:1px solid  #e5e9ef;
            border-radius: 4px;
            padding: 0 20px 0 0;
            .img-container{
              width: 200px;
              overflow: hidden;
              margin: 0 30px 0 0;
              img{
                width: 100%;
                border-radius: 4px;
              }
            }
            .content{
              width: 60%;
              height: 150px;
              overflow-y: hidden;
              line-height:25px;
              /deep/img{
                display: none!important;
              }
            }
          }
        }
      }
    }
  }
</style>