<template>
  <div class="spcolumn">
    <toplist-item :list="swiperList"
                  v-if="swiperList.length"
                  :toplist="toplist"></toplist-item>
  </div>
</template>

<script>
import {getSpcolumnTop} from "@/network/toplist";
import ArticleItem from "@/components/common/spcolumnItem/SpcolumnItem";
import ToplistItem from "@/views/topList/childCpn/toplistItem/ToplistItem";
export default {
  name: "Technology",
  components: {ToplistItem, ArticleItem},
  data()
  {
    return {
      swiperList:[],
      toplist:[]
    }
  },
  created() {
    getSpcolumnTop().then(data=>{
      //console.log(data);
      this.toplist=data;
      this.swiperList=data.map((item,index)=>{
        return {
          id:item.momentId,
          coverUrl:item.picUrl?item.picUrl[0]:'',
          title:item.title
        }
      })
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