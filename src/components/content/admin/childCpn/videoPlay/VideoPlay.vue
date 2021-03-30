<template>
  <div class="video-play">
   <video :src="url" controls="controls" autoplay/>
  </div>
</template>

<script>
import {getKnowUrl} from "@/network/admin/knowledge";

export default {
  name: "VideoPlay",
  data()
  {
    return {
      url:''
    }
  },
  created() {
    getKnowUrl(this.$route.query.id).then(data=>{
      this.url=data.url
    })
  }
}
</script>

<style scoped>
  video{
    width: 300px;
  }
</style>