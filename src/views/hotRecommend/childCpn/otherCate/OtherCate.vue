<template>
  <div class="other-cate">
    <p class="title" @click="detailRouter(cateDetail)">
      <i class="iconfont icon-yingshi video-cate-icon" v-if="cateDetail.name==='影视'"></i>
      <i class="iconfont icon-yinle music-cate-icon" v-if="cateDetail.name==='音乐'"></i>
      <i class="iconfont icon-junshi military-cate-icon" v-if="cateDetail.name==='军事'"></i>
      <i class="iconfont icon-tiyu sport-cate-icon" v-if="cateDetail.name==='体育'"></i>
      {{cateDetail.name}}
      <i class="iconfont icon-svgarrowsright"></i>
    </p>
    <!--具体内容-->
    <ul class="outer">
      <li v-for="(item,index) in cateDetail.moments" :key="item.momentId">
        <msg-list img-container-height="110px"
                  :is-show-play="true"
                  :is-show-time="true"
                  @play="videoRouter(item)">
          <div slot="img-container" @click="videoRouter(item)">
            <img :src="item.picUrl[0].picUrl+'&type=small'" alt=""/>
          </div>
          <div slot="playCount" v-if="item.video">{{item.video.playCount}}</div>
          <div slot="dt" v-if="item.video&&item.video.duration!==0">
            {{formatDate (item.video.duration,"mm:ss") }}
          </div>
          <div slot="state" @click="videoRouter(item)" class="other-state">{{item.title}}</div>
          <div slot="avatarUrl" @click="userRouter(item)">
            <img :src="item.user.avatarUrl" alt=""/>
          </div>
          <div slot="userName" @click="userRouter(item)">{{item.user.userName}}</div>
        </msg-list>
      </li>
      <!--占位-->
      <li v-for="(item,index) in holder(cateDetail.moments.length,4)" style="opacity: 0">
        <div class="img-container"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import {holder} from "@/utils/holder";
import MsgList from "@/components/common/msgList/MsgList";
import {formatDate} from "@/utils/formatDate";

export default {
name: "OtherCate",
  components: {MsgList},
  props:{
    cateDetail:{
      type:Object,
      default()
      {
        return {}
      }
    }
  },
  methods:{
    detailRouter(detail)
    {
      switch(detail.name)
      {
        case '影视':
          this.$router.push({
            path:'/videoCate',
            query:{
              id:detail.categoryId
            }
          });break;
        case "音乐":
          this.$router.push({
            path:'/musicCate',
            query:{
              id:detail.categoryId
            }
          });break;
        case "军事":
          this.$router.push({
            path:'/militaryCate',
            query:{
              id:detail.categoryId
            }
          });break;
        case "体育":
          this.$router.push({
            path:'/sportCate',
            query:{
              id:detail.categoryId
            }
          });break;
      }
    },
    //占位
    holder(count,line)
    {
      return holder(count,line);
    },
    videoRouter(item)
    {
      if(item.type===1)
      {
        this.$router.push({
          path:'/videoDetail',
          query:{
            vid:item.video.vid
          }
        })
      }
    },
    userRouter(item)
    {
      this.$router.push({
        path:"/userDetail",
        query:{
          id:item.user.userId
        }
      })
    },
    formatDate(time,ft){
      return formatDate(time,ft)
    }
  }
}
</script>

<style scoped lang="less">
  .title{
    font-weight: bold;
    font-size: 16px;
    cursor:pointer;
    display: flex;
    align-items: center;
    margin: 30px 0 10px 0;
    i{
      font-size: 14px;
    }
    .sport-cate-icon,.military-cate-icon,.music-cate-icon,.video-cate-icon{
      font-size: 16px;
      margin: 0 10px 0 0;
    }
    .video-cate-icon{
      color: #7b78eb;
    }
    .music-cate-icon{
      font-size: 24px;
      color: #ec4141;
    }
    .military-cate-icon{
      color: #476736;
      font-size: 20px;
    }
    .sport-cate-icon{
      color: #be4f39;
      font-size: 20px;
    }
  }
  .outer{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 180px;
      margin: 0 0 20px 0;
    }
    .other-state{
      margin: 20px 0 0 0;
    }
  }
</style>