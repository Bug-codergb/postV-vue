<template>
  <div class="sport">
    <toplist-item :list="swiperList" :toplist="toplist"/>
  </div>
</template>

<script>
import ToplistItem from "@/views/topList/childCpn/toplistItem/ToplistItem";
import {getToplist} from "@/network/toplist";

export default {
  name: "Sport",
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

<style scoped>

</style>