<template>
  <div>
    <ul class="topic-item">
      <li v-for="(item,index) in topicContent" :key="item.topic_content_id">
        <div class="img-container">
          <img :src="item.picUrls[0].picUrl" />
        </div>
        <div class="state text-nowrap">{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllTopicContent} from "@/network/topic";

export default {
name: "topicItem",
  props:{
    topicId:{
      type:String,
      default:''
    }
  },
  data()
  {
    return {
      topicContent:[]
    }
  },
  created() {
    getAllTopicContent(this.topicId,0,6).then(data=>{
      console.log(data);
      this.topicContent=data;
    })
  }
}
</script>

<style scoped lang="less">
  .topic-item{
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    li{
      margin: 0px 20px 20px 0;
      .state{
        width: 170px;
      }
    }
  }
  .img-container{
    width: 170px;
    overflow: hidden;
    border-radius: 5px;
    img{
      width: 170px;
      border-radius: 5px;
    }
  }
</style>