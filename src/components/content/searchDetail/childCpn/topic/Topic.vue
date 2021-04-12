<template>
  <div class="topic">
    <ul>
      <li v-for="(item,index) in this.$store.state.searchResult.topic">
        <div class="img-container" @click="topicRouter(item)">
          <img :src="item.picUrl" />
        </div>
        <div class="state text-nowrap" @click="topicRouter(item)">{{item.name}}</div>
        <div class="creator text-nowrap" @click="userRouter(item)">{{item.leader.userName}}</div>
        <div class="time">{{item.updateTime.substring(0,10)}}</div>
        <div class="content" v-if="item.content">讨论: {{item.content.length}}</div>
        <div class="content">成员: {{item.users}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Topic",
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
      li{
        display: flex;
        align-items: center;
        .img-container{
          width: 50px;
          height: 50px;
          overflow: hidden;
          img{
            width: 50px;
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
  }
</style>