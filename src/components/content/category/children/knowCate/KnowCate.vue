<template>
  <div class="know-cate">
    <ul>
      <li v-for="(item,index) in hotKnow" :key="item.kid">
        <div class="img-container" @click="knowRouter(item)">
          <div class="vip" v-show="item.vip===1">vip</div>
          <img :src="item.picUrl" />
        </div>
        <div class="state">{{item.title}}</div>
        <div class="time">{{item.updateTime.substring(0,10)}}</div>
        <div class="creator">{{item.user.userName}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getHotKnow} from "@/network/recommend";

export default {
  name: "KnowCate",
  data()
  {
    return {
      hotKnow:[]
    }
  },
  created() {
    getHotKnow(0,30).then(data=>{
      console.log(data);
      this.hotKnow=data;
    })
  },
  methods:{
    knowRouter(item)
    {
      if(item.vip===1)
      {
        if(this.$store.state.userDetail.vip===1)
        {
          this.$router.push({
            path:'/knowledgeMsg',
            query:{
              kid:item.kid
            }
          })
        }
        else{
          this.$toast.show("vip课程，开通vip后观看",1500);
        }
      }
      else{
        this.$router.push({
          path:'/knowledgeMsg',
          query:{
            kid:item.kid
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .know-cate{
    ul{
      li{
        display: flex;
        align-items: center;
        padding: 10px 0;
        &:nth-child(odd)
        {
          background-color: rgba(58, 142, 230,.07);
        }
        &:hover{
          background-color: rgba(58, 142, 230,0.1);
        }
        .img-container{
          width: 120px;
          height: 80px;
          overflow: hidden;
          position:relative;
          .vip{
            position: absolute;
            background-color: #ec4141;
            color: #fff;
            z-index: 9;
            padding: 3px;
            left: 100%;
            transform: translateX(-100%);
          }
          img{
            width: 120px;
          }
          background-color: #9cc6f2;
        }
        .state{
          font-size: 14px;
          width: 200px;
        }
        .time{
          width: 100px;
          font-size: 12px;
        }
        .creator{
          width: 150px;
          font-size: 12px;
          color: #3a8ee6;
        }
      }
    }
  }
</style>