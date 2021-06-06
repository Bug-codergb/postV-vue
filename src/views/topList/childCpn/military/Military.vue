<template>
  <div class="military">
    <toplist-item :list="swiperList" :toplist="toplist"/>
  </div>
</template>

<script>
import ToplistItem from "@/views/topList/childCpn/toplistItem/ToplistItem";
import {getToplist} from "@/network/toplist";

export default {
  name: "military",
  components: {ToplistItem},
  data()
  {
    return {
      swiperList:[],
      toplist:[]
    }
  },
  created() {
    getToplist(this.$route.query.id).then(data=>{
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