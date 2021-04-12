<template>
  <div class="play">
    <video :src="url" controls="controls" autoplay />
  </div>
</template>

<script>
import {getKnowUrl} from "@/network/recommend";
import Video from "@/views/topList/childCpn/video/Video";

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

<style scoped lang="less">
  .play{
    border-right:1px solid #3a8ee6;
  }
  video{
    width: 500px;
    outline: none;
    display: block;
    margin: 0 auto;
  }
</style>