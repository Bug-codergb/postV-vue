<template>
  <div class="article-cate">
    <ul>
      <li v-for="(item,index) in allArticle" :key="item.momentId" @click="articleRouter(item)">
        <article-item :article="item"/>
      </li>
    </ul>
  </div>
</template>

<script>
import {getCateDetail} from "@/network/category";
import ArticleItem from "@/components/common/articleItem/ArticleItem";

export default {
name: "ArticleCate",
  components: {ArticleItem},
  data()
  {
    return{
      allArticle:[]
    }
  },
  created() {
    getCateDetail(this.$route.query.categoryId).then(data=>{
      console.log(data);
      this.allArticle=data;
    })
  },
  methods:{
    articleRouter(item)
    {
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
  .article-cate{
    ul{
      li{
        padding: 15px 0;
        border-bottom: 1px solid #d8e8fa;
        cursor: pointer;
      }
    }
  }
</style>