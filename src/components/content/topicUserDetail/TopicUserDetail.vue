<template>
  <div class="topic-user-detail">
    <div class="left-content">
      <topic-item :topic="topicDetail" v-if="topicDetail.topicId" :is-show="false"/>
      <p class="leader">{{topicMember.leader.userName}}于{{topicDetail.updateTime.substring(0,10)}}创建</p>
      <p class="member-title">成员</p>
      <ul class="member">
        <li v-for="(item,index) in topicMember.users" :key="item.userId" class="text-nowrap">
          <div class="img-container" @click="userRouter(item)">
            <img :src="item.avatarUrl" />
          </div>
          <div class="user-msg">
            <div class="user-name">{{item.userName}}</div>
            <div class="user-desc">{{item.desc}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script>
import {getTopicContent, getTopicMember} from "@/network/topic";
import TopicItem from "@/components/content/topicItem/TopicItem";

export default {
  name: "TopicUserDetail",
  components: {TopicItem},
  data()
  {
    return {
      topicDetail:{updateTime:''},
      topicMember:{leader:{},}
    }
  },
  created() {
    getTopicContent(this.$route.query.topicId,0,30).then(data=>{
      //console.log(data)
      this.topicDetail=data;
    })
    getTopicMember(this.$route.query.topicId).then(data=>{
      console.log(data);
      this.topicMember=data;
    })
  },
  methods:{
    userRouter(item)
    {
      this.$router.push({
        path:'/userDetail',
        query:{
          id:item.userId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
  }
  .topic-user-detail{
    display: flex;
    width: 1180px;
  }
  .left-content{
    width:70%;
    height: 1500px;
    border-right: 1px solid #d8e8fa;
    .member{
      display: flex;
      padding: 20px 20px 0 0;
      justify-content: space-between;
      li{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 350px;
        padding: 15px 0;
      }
      .img-container{
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,.1);
        position: relative;
        img{
          .center();
          height: 100%;
        }
      }
      .user-msg{
        margin: 0 0 0 20px;
        .user-name{
          font-size: 12px;
          color: #3a8ee6;
          margin: 0 0 10px 0;
        }
        .user-desc{
          color: #9b9b9b;
          font-size: 12px;
        }
      }
    }
    .member-title{
      font-size: 14px;
      font-weight: bold;
      margin: 20px 0 0 0;
    }
    .leader{
      color: #cfcfcf;
      font-size: 12px;
    }
  }
  .right-content{
    flex: 1;
  }
</style>