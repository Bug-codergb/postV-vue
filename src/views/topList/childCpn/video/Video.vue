<template>
  <div class="video">
    <toplist-item :list="swiperList" :toplist="toplist"/>
  </div>
</template>

<script>
import {getToplist} from "@/network/toplist";
import ToplistItem from "@/views/topList/childCpn/toplistItem/ToplistItem";
export default {
  name: "Video",
  components: {ToplistItem},
  data()
  {
    return {
      swiperList:[],
      toplist:[]
    }
  },
  created() {
    getToplist(1614678769218).then(data=>{
      console.log(data);
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

<style scoped lang="less">

</style>