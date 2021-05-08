<template>
  <div class="other-cate">
    <p class="title" @click="detailRouter(cateDetail.name)">{{cateDetail.name}}
      <i class="iconfont icon-svgarrowsright"></i>
    </p>
    <!--具体内容-->
    <ul class="outer">
      <li v-for="(item,index) in cateDetail.moments" :key="item.momentId">
        <msg-list img-container-height="110px"
                  :is-show-play="cateDetail.name==='视频'||cateDetail.name==='预告片'"
                  :is-show-time="cateDetail.name==='视频'||cateDetail.name==='预告片'">
          <div slot="img-container" @click="videoRouter(item)">
            <img :src="item.picUrl[0].picUrl" />
          </div>
          <div slot="playCount" v-if="item.video">{{item.video.playCount}}</div>
          <div slot="dt" v-if="item.video&&item.video.duration!==0">
            {{formatDate (item.video.duration,"mm:ss") }}
          </div>
          <div slot="state" @click="videoRouter(item)">{{item.title}}</div>
          <div slot="avatarUrl" @click="userRouter(item)">
            <img :src="item.user.avatarUrl"/>
          </div>
          <div slot="userName" @click="userRouter(item)">{{item.user.userName}}</div>
        </msg-list>
      </li>
      <!--占位-->
      <li v-for="(item,index) in holder(cateDetail.moments.length,3)" style="opacity: 0">
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
  created() {
    console.log(this.cateDetail)
  },
  methods:{
    detailRouter(name)
    {
      console.log(name)
      switch(name)
      {
        case '视频':
          this.$router.push({
            path:'/videoCate'
          });break;
        case "图片":
          this.$router.push({
            path:'/imageCate',
            query:{
              categoryId:this.cateDetail.categoryId
            }
          });break;
        case '科技':
          this.$router.push({
            path:'/technologyCate',
            query:{
              categoryId:this.cateDetail.categoryId
            }
          })
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
     if(item.name==='图片')
     {
       this.$router.push({
         path:'/imageDetail',
         query:{
           momentId:item.momentId
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
    margin: 30px 0 10px 0;
    i{
      font-size: 14px;
    }
  }
  .outer{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 215px;
      margin: 0 0 20px 0;
    }
  }
</style>