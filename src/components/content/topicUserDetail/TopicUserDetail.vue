<template>
  <div class="topic-user-detail">
    <div class="left-content">
      <topic-item :topic="topicDetail" v-if="topicDetail.topicId"/>
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
      topicDetail:{}
    }
  },
  created() {
    getTopicContent(this.$route.query.topicId,0,30).then(data=>{
      console.log(data)
      this.topicDetail=data;
    })
    getTopicMember(this.$route.query.topicId).then(data=>{
      console.log(data);
    })
  }
}
</script>

<style scoped lang="less">
  .topic-user-detail{
    display: flex;
  }
  .left-content{
    width:750px;
    height: 1500px;
    border-right: 1px solid #d8e8fa;
  }
  .right-content{
    flex: 1;
  }
</style>