<template>
  <div class="topic">
    <create-topic v-show="userId===this.$store.state.userMsg.userId"/>
    <p class="already-join">已经加入的专题</p>
    <ul>
      <li v-for="(item,index) in topic" :key="item.topicId" @click="topicRouter(item)">
        <topic-item :topic="item" />
      </li>
    </ul>
<!--    <p class="created-topic">创建的专题</p>-->
  </div>
</template>

<script>
import {getUserJoinTopic} from "@/network/user";
import TopicItem from "@/components/content/topicItem/TopicItem";
import CreateTopic from "@/components/content/userDetail/childCpn/topic/childCpn/CreateTopic";

export default {
  name: "Topic",
  components: {CreateTopic, TopicItem},
  props:{
    userId:{
      type:String,
      default:''
    }
  },
  data()
  {
    return {
      topic:[]
    }
  },
  created() {
    getUserJoinTopic(this.userId).then(data=>{
      this.topic=data.topic;
    })
  },
  methods:{
    topicRouter(item)
    {
      this.$router.push({
        path:'/topicDetail',
        query:{
          topicId:item.topicId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .already-join,.created-topic{
    font-size: 14px;
    color: #3a8ee6;
    margin: 0 0 20px 0;
    font-weight: bold;
  }
</style>