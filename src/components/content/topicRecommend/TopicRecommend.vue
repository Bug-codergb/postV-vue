<template>
  <div class="recommend-topic">
    <h4>推荐专题</h4>
    <ul>
      <li v-for="(item,index) in recTopic" :key="item.topicId">
       <div class="topic-list" v-if="item.topicId!==topicId">
         <div class="img-container" @click="topicRouter(item)">
           <img :src="item.picUrl" />
         </div>
         <div class="msg">
           <div class="topic-name text-nowrap">{{item.name}}</div>
           <div class="user-name text-nowrap" @click="userRouter(item.user)">by {{item.user.userName}}</div>
         </div>
       </div>
      </li>
    </ul>
 </div>
</template>

<script>
import {getRecTopic} from "@/network/topic";

export default {
  name: "TopicRecommend",
  data()
  {
    return {
      recTopic:[]
    }
  },
  props:{
    topicId:{
      type:String,
      default:''
    }
  },
  created() {
    getRecTopic().then(data=>{
      console.log(data);
      this.recTopic=data;
    })
  },
  methods:{
    topicRouter(item)
    {
      this.$emit('changeTopicStatus',item.topicId)
    },
    userRouter(user)
    {
      this.$router.push({
        path:'/userDetail',
        query:{
          id:user.userId
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
    left:50%;
    top:50%;
    transform: translate(-50%,-40%);
  }
  .recommend-topic{
    ul{
      li{
       .topic-list{
         padding: 15px 0;
         display: flex;
         align-items: center;
       }
        .msg{
          margin: 0 0 0 15px;
          .user-name{
            font-size: 12px;
            color: #9b9b9b;
            cursor:pointer;
          }
          .topic-name{
            font-size: 13px;
            margin: 0 0 10px 0;
          }
        }
      }
    }
  }
  .img-container{
    width: 130px;
    height:90px;
    background-color: #333;
    overflow: hidden;
    cursor:pointer;
    position: relative;
    img{
      .center();
      width:100%;
    }
  }
</style>