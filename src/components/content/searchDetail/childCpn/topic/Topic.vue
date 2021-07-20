<template>
  <div class="topic">
    <ul>
      <li v-for="(item,index) in this.$store.state.searchResult.topic">
        <div class="img-container" @click="topicRouter(item)">
          <img :src="item.picUrl" alt=""/>
        </div>
        <div class="state text-nowrap" @click="topicRouter(item)">{{item.name}}</div>
        <div class="creator text-nowrap" @click="userRouter(item)">{{item.leader.userName}}</div>
        <div class="time">{{item.updateTime.substring(0,10)}}</div>
        <div class="content" v-if="item.content">讨论: {{item.content.length}}</div>
        <div class="content">成员: {{item.users}}</div>
      </li>
    </ul>
    <div class="tip" v-if="$store.state.searchResult.topic.length===0">
      <NoTip content="暂无相关专题" font="50px"/>
    </div>
  </div>
</template>

<script>
import NoTip from "@/components/common/noTip/NoTip";
export default {
  name: "Topic",
  components: {NoTip},
  methods:{
    topicRouter(item)
    {
      this.$router.push({
        path:'/topicDetail',
        query:{
          topicId:item.topicId
        }
      })
    },
    userRouter(item)
    {
      this.$router.push({
        path:'/userDetail',
        query:{
          id:item.leader.userId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .topic{
    margin: 20px 0 0 0;
    ul{
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
          background-color: #656565;
          position: relative;
          img{
            .center(50%,50%,-50%,-50%);
            height:100%;
          }
        }
        .state{
          font-size: 14px;
          width: 260px;
          margin: 0 0 0 20px;
        }
        .creator{
          font-size: 12px;
          color: #3a8ee6;
          width: 100px;
          cursor:pointer;
        }
        .time,.content{
          color: #616162;
          font-size: 12px;
          width: 150px;
        }
      }
    }
    .tip{
      height:300px;
    }
  }
</style>