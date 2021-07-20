<template>
  <div class="knowledge">
    <p class="title" @click="detailRouter()">课堂
      <i class="iconfont icon-svgarrowsright"></i>
    </p>
    <ul>
      <li v-for="(item,index) in hotKnow" :key="item.kid">
          <div class="img-container" @click="knowRouter(item)">
            <img :src="item.picUrl" alt=""/>
            <div class="vip" v-if="item.vip===1">vip</div>
          </div>
        <div class="state">{{item.title}}</div>
        <div class="user-msg">
          <div class="avatar">
            <img :src="item.user.avatarUrl" alt=""/>
          </div>
          <div class="user-name">{{item.user.userName}}</div>
        </div>
      </li>
      <li v-for="item in holder(hotKnow.length,4)">
        <div class="img-container"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getHotKnow} from "@/network/recommend";
import {holder} from "@/utils/holder";

export default {
name: "Knowledge",
  data()
  {
    return {
      hotKnow:[]
    }
  },
  created() {
    getHotKnow(0,6).then(data=>{
      //console.log(data);
      this.hotKnow=data;
    })
  },
  methods:{
    detailRouter()
    {
      this.$router.push({
        path:'/knowCate'
      })
    },
    holder(count,line)
    {
      return holder(count,line)
    },
    knowRouter(item)
    {
      if(parseInt(item.vip)===1)
      {
        if(this.$store.state.userDetail.vip===0)
        {
          this.$toast.show("当前课程为VIP课程,请开通VIP",1500);
        }
        else if(this.$store.state.userDetail.vip===1)
        {
          this.$router.push({
            path:'/knowledgeMsg',
            query:{
              kid:item.kid,
              vip:item.vip
            }
          })
        }
      }
      else{
        this.$router.push({
          path:'/knowledgeMsg',
          query:{
            kid:item.kid,
            vip:item.vip
          }
        })
      }
    },
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
  .knowledge{
    .title{
      font-weight: bold;
      font-size: 16px;
      cursor:pointer;
      margin: 30px 0 10px 0;
      i{
        font-size: 14px;
      }
    }
    ul{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        margin: 0 0 15px 0;
        .img-container{
          width:180px;
          height:105px;
          overflow: hidden;
          text-align: center;
          border-radius: 3px;
          position: relative;
          img{
            width:100%;
          }
          .vip{
            position: absolute;
            top: 0;
            left:100%;
            padding: 1px 10px;
            background-color: #ec4141;
            color: #fff;
            transform: translateX(-100%);
          }
        }
        .state{
          font-size: 14px;
          margin: 5px 0;
        }
        .user-msg{
          display: flex;
          .avatar{
            width:20px;
            height:20px;
            overflow: hidden;
            border-radius: 50px;
            position: relative;
            img{
              height:20px;
              .center();
            }
          }
          .user-name{
            font-size: 12px;
            color: #3a8ee6;
            margin: 0 0 0 5px;
          }
        }
      }
    }
  }
</style>