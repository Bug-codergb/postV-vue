<template>
  <div class="spcolumn-cate">
    <ul class="all-cate">
      <li v-for="(item,index) in allCate" :key="item.id"
          @click="liClick(item,index)"
          :class="{active:currentIndex===index}">
        {{item.name}}
      </li>
    </ul>
    <ul class="spcolumn-detail">
      <li v-for="(item,index) in allSpcolumnDetail" :key="item.momentId" @click="articleRouter(item)">
        <SpcolumnItem :article="item"/>
      </li>
    </ul>
  </div>
</template>

<script>
import {getCateDetail} from "@/network/category";
import SpcolumnItem from "@/components/common/spcolumnItem/SpcolumnItem";
import {momentView} from "@/network/moment";
import {getAllSpcolumnCate, getSpcolumnDetail} from "@/network/spcolumn";

export default {
name: "SpcolumnCate",
  components: {SpcolumnItem},
  data()
  {
    return{
      allSpcolumnDetail:[],
      allCate:[],
      currentIndex:0
    }
  },
  created() {
    getAllSpcolumnCate().then(data=>{
      this.allCate=data;
      getSpcolumnDetail(this.$route.query.categoryId,this.allCate[0].id).then(data=>{
        this.allSpcolumnDetail=data;
      })
    })
  },
  methods:{
    articleRouter(item)
    {
      momentView(item.momentId);
      this.$router.push({
        path:'/momentDetail',
        query:{
          momentId:item.momentId,
          userId:item.user.userId
        }
      })
    },
    liClick(item,index){
      this.currentIndex=index;
      getSpcolumnDetail(this.$route.query.categoryId,item.id).then(data=>{
        this.allSpcolumnDetail=data;
      })
    }
  }
}
</script>

<style scoped lang="less">
  .spcolumn-cate{
    width: 70%;
    border-right: 1px solid #d8e8fa;
    .all-cate{
      display: flex;
      align-items: center;
      li{
        margin: 0 20px 0 0;
        padding: 0 10px 5px;
        cursor:pointer;
        border-bottom: 2px solid transparent;
        &.active{
          border-bottom: 2px solid #3a8ee6;
          color: #3a8ee6;
        }
      }
    }
    ul.spcolumn-detail{
      margin: 30px 0 0 0;
      li{
        padding: 15px 0;
        border-bottom: 1px solid #d8e8fa;
        cursor: pointer;
      }
    }
  }
</style>