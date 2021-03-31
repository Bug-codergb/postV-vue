<template>
  <div class="play">
    <video :src="url" controls="controls" autoplay />
  </div>
</template>

<script>
import {getKnowUrl} from "@/network/recommend";
import Video from "@/views/topList/childCpn/funny/Funny";

export default {
  name: "VideoPlay",
  components: {Video},
  data()
  {
    return {
      url:''
    }
  },
  created() {
    getKnowUrl(this.$route.query.id).then(data=>{
      this.url=data.url;
    })
  }
}
</script>

<style scoped>
  video{
    width: 300px;
  }
</style>