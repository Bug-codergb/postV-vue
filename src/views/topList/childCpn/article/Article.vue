<template>
  <div class="article">
    <ul>
      <li v-for="(item,index) in article" :key="item.momentId" @click="articleRouter(item)">
        <div class="article-item">
          <div class="index">{{index+1}}</div>
          <article-item :article="item" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getArticleToplist} from "@/network/toplist";
import ArticleItem from "@/components/common/spcolumnItem/SpcolumnItem";

export default {
  name: "Technology",
  components: {ArticleItem},
  data()
  {
    return {
       article:[]
    }
  },
  created() {
    getArticleToplist(0,30).then(data=>{
      //console.log(data)
      this.article=data;
    })
  },
  methods:{
    articleRouter(item)
    {
      console.log(item)
      this.$router.push({
        path:'/momentDetail',
        query:{
          momentId:item.momentId,
          userId:item.user.userId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .article{
    margin: 30px 0 0 0;
    ul{
      li{
        position: relative;
        padding: 15px 0;
        border-bottom: 1px solid #d8e8fa;
        .article-item{
          display: flex;
          .index{
            position: absolute;
            width: 25px;
            color: #fff;
            z-index: 9;
            height: 25px;
            line-height: 30px;
            background-color: rgba(58, 142, 230,.6);
            border-radius: 0 0 100% 0;
            text-align: center;
          }
        }
      }
    }
  }
</style>