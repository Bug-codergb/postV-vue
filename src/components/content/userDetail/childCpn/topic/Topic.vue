<template>
  <div class="topic">
    <ul>
      <li v-for="(item,index) in topic" :key="item.topicId">
        <topic-item :topic="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import {getUserJoinTopic} from "@/network/user";
import TopicItem from "@/components/content/topicItem/TopicItem";

export default {
  name: "Topic",
  components: {TopicItem},
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
    console.log("789")
    getUserJoinTopic(this.userId).then(data=>{
      this.topic=data.topic;
    })
  }
}
</script>

<style scoped>

</style>