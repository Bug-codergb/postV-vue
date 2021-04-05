<template>
  <div class="video">

  </div>
</template>

<script>
import {getVideoToplist} from "@/network/toplist";
export default {
  name: "Video",
  data()
  {
    return {
      videos:[]
    }
  },
  created() {
    getVideoToplist(0,30).then(data=>{
      console.log(data)
    })
  },
  methods:{
    vioRouter(vid)
    {
       this.$router.push({
         path:'/videoDetail',
         query:{
           vid,
         }
       })
    }
  }
}
</script>

<style scoped lang="less">

</style>