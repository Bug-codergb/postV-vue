<template>
  <div class="topic">
    <ul>
      <li v-for="(item,index) in allTopic" :key="item.topicId" @click="topicRouter(item)">
        <topic-item :topic="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllTopic} from "@/network/topic";
import TopicItem from "@/components/content/topicItem/TopicItem";

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
  },
  methods:{
    topicRouter(item)
    {
      console.log(item)
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

</style>