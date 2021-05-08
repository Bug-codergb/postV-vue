<template>
  <div class="video-cate">
    <cate-list title="类别" :list="videoCate" v-if="videoCate.length" @cate="cate" />
    <ul class="video-list" v-if="videoList.videos">
      <li v-for="(item,index) in videoList.videos" :key="item.vid">
        <msg-list img-container-height="120px">
          <div slot="img-container" @click="videoRouter(item)">
            <img :src="item.coverUrl"/>
          </div>
          <div slot="state">
            <div>{{item.title}}</div>
          </div>
          <div slot="avatarUrl"><img :src="item.user.avatarUrl"/>}}</div>
          <div slot="userName">{{item.user.userName}}</div>
          <div slot="playCount">{{item.playCount}}</div>
        </msg-list>
      </li>
      <li v-for="(item,index) in holder(videoList.videos.length,3)" style="opacity: 0">
        <div class="img-container"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import CateList from "@/components/common/cateList/CateList";
import {getAllVideoCate} from "@/network/video";
import {getCateVideo} from "@/network/video";
import {holder} from "@/utils/holder";
import MsgList from "@/components/common/msgList/MsgList";
export default {
  name: "VideoCate",
  components: {MsgList, CateList},
  data()
  {
    return {
      videoCate:[],
      videoCatMap:new Map(),
      videoList:[]
    }
  },
  created() {
    getAllVideoCate().then(data=>{
      data.forEach((item,index)=>{
        this.videoCatMap.set(item.name,item.categoryId);
        this.cate("科幻")
      })
      this.videoCate=data.map((item,index)=>{
        return item.name
      })
    })
  },
  methods:{
    cate(item)
    {
      getCateVideo(this.videoCatMap.get(item)).then(data=>{
        //console.log(data);
        this.videoList=data;
      })
    },
    videoRouter(item)
    {
      this.$router.push({
        path:'/videoDetail',
        query:{
          vid:item.vid
        }
      })
    },
    holder(count,line)
    {
      return holder(count,line);
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    transform: translate(-50%,-50%);
    top:50%;
    left:50%;
    position:absolute;
  }
  .video-cate{
    border-right: 1px solid #d8e8fa;
    ul.video-list{
      margin: 20px 0 0 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        margin: 0 0 20px 0;
        width: 225px;
      }
    }
  }
</style>