<template>
  <div class="music-cate">
    <toplist-item :list="swiperList" :toplist="toplist"/>
  </div>
</template>

<script>
import ToplistItem from "@/views/topList/childCpn/toplistItem/ToplistItem";
import {getToplist} from "@/network/toplist";

export default {
  name: "Music",
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
          momentId:item.momentId,
          coverUrl:item.picUrl?item.picUrl[0]:'',
          title:item.title,
          type:item.type,
          vid:item.vid
        }
      })
    })
  },
}
</script>

<style scoped>

</style>