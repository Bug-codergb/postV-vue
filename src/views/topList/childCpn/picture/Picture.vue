<template>
  <div class="picture">
    <ul>
      <li v-for="(item,index) in pictures" :key="item.id">
        <div class="index">{{ (index+1).toString().padStart(2,"0")}}</div>
        <div class="img-outer">
          <images :imgDetail="item"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getToplistPic} from "@/network/toplist";
import Comment from "@/components/content/comment/Comment";
import Reply from "@/components/content/reply/Reply";
import Tags from "@/components/content/tags/Tags";
import Images from "@/components/common/images/Images";

export default {
  name: "picture",
  components: {Images, Tags, Reply, Comment},
  data()
  {
    return {
      pictures:[]
    }
  },
  created()
  {
    getToplistPic(0,7).then(data=>{
      console.log(data)
      this.pictures=data;
    })
  }
}
</script>

<style scoped lang="less">
  .picture {
    margin: 20px 0 0 20px;
    ul {
      li {
        border-bottom: 1px solid #c4ddf7;
        padding: 15px 0;
        display: flex;
        align-items: center;
        .index{
          color: #3a8ee6;
          font-size: 30px;
          padding: 0 20px 0 0;
        }
        .img-outer{
          flex: 1;
        }
      }
    }
  }
</style>