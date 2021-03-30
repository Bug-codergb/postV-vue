<template>
  <div class="topic">
    <ul>
      <li v-for="(item,index) in allTopic" :key="item.topicId">
        <div class="title">{{item.name}}</div>
        <topic-item :topic-id="item.topicId" />
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllTopic} from "@/network/topic";
import TopicItem from "@/views/topic/childCpn/topicItem/topicItem";

export default {
name: "Topic",
  components: {TopicItem},
  data()
  {
    return {
      allTopic:[]
    }
  },
  created() {
    getAllTopic(0,20).then(data=>{
      console.log(data)
      this.allTopic=data;
    })
  }
}
</script>

<style scoped lang="less">
  .title{
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 10px 0;
  }
  .topic{
    ul{
      li{
        margin: 0 0 15px 0;
      }
    }
  }
</style>