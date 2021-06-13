<!--搜索关键字结果-->
<template>
  <div id="search-result">
    <!--动态-->
    <div class="moment-cate" v-show="searchRes.moment.length!==0">
      <i class="iconfont icon-dongtai"></i>
      动态
    </div>
    <ul class="search-moment">
      <li v-for="(item,index) in searchRes.moment.slice(0,4)"
          :key="item.momentId"
          class="text-nowrap"
          @click.stop="momentRouter(item)">
        <div>{{item.title}}</div>
      </li>
    </ul>
    <!--用户-->
    <div class="user-cate" v-show="searchRes.user.length!==0">
      <i class="iconfont icon-user-s"></i>
      用户
    </div>
    <ul class="search-user">
      <li v-for="(item,index) in searchRes.user.slice(0,4)"
          :key="item.userId"
          class="text-nowrap"
          @click.stop="userRouter(item)">
        <div>{{item.userName}}</div>
      </li>
    </ul>
    <!--专题-->
    <div class="user-cate" v-show="searchRes.topic&&searchRes.topic.length!==0">
      <i class="iconfont icon-zhuanti1" style="color: #000"></i>
      专题
    </div>
    <ul class="search-topic">
      <li v-for="(item,index) in searchRes.topic.slice(0,4)" :key="item.topicId" @click.stop="topicRouter(item)">
        <div>{{item.name}}</div>
      </li>
    </ul>
    <!--频道-->
    <div class="channel-cate" v-show="searchRes.topic.length!==0">
      <i class="iconfont icon-channel2" style="color:#000"> </i>
      频道
    </div>
    <ul class="search-channel">
      <li v-for="(item,index) in searchRes.channel.slice(0,4)" :key="item.id" @click.stop="channelRouter(item)">
        <div class="text-nowrap">{{item.title}}</div>
      </li>
    </ul>
    <div class="no-result"
         v-show="searchRes.user.length===0&&searchRes.moment.length===0&&searchRes.topic.length===0&&searchRes.channel.length===0">
      <i class="iconfont icon-xiangzidakai"></i>
      <p>暂无结果</p>
    </div>
  </div>
</template>

<script>
export default {
name: "SearchResult",
  props:{
    searchRes:{
      type:Object,
      default()
      {
        return {
          user:[],
          moment:[],
          topic:[]
        }
      }
    }
  },
  methods:{
    momentRouter(item)
    {
      this.$emit('dynamic-match',item)
      const {type}=item;
      if(type===1)
      {
        this.$router.push({
          path:'/videoDetail',
          query:{
            vid:item.vid
          }
        })
      }
      else if(type===0)
      {
        this.$router.push({
          path:'/momentDetail',
          query:{
            momentId:item.momentId,
            userId:item.user.userId
          }
        })
      }
    },
    userRouter(item)
    {
      this.$emit('dynamic-match',item)
      this.$router.push({
        path:'/userDetail',
        query:{
          id:item.userId
        }
      })
    },
    topicRouter(item)
    {
      this.$emit('dynamic-match',item);
      this.$router.push({
        path:'/topicDetail',
        query:{
          topicId:item.topicId
        }
      })
    },
    channelRouter(item){
      this.$emit("dynamic-match",item);
      this.$router.push({
        path:"/channelDetail",
        query:{
          cId:item.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  #search-result{
    position: absolute;
    background-color: #fff;
    z-index:999;
    top:115%;
    left: 50%;
    transform:translate(-50%,0);
    width: 340px;
    height: 400px;
    padding:15px 20px;
    box-shadow: 0 0 15px rgba(0,0,0,.3);
    border-radius: 5px;
    .search-moment,.search-user,.search-topic,.search-channel{
      margin: 3px 0 10px 0;
      li{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 5px 0;
        cursor:pointer;
        &:hover{
          background-color: #f2f2f2;
        }
        &>div{
          font-size: 13px;
        }
      }
    }
    .moment-cate,.user-cate,.channel-cate{
      font-size:13px;
      background-color: #f5f5f7;
      padding: 5px 0;
    }
    .channel-cate{
      i{
        font-size: 13px;
      }
    }
    .no-result{
      margin:50% 0;
      text-align: center;
      background-color:#fff;
      color: #3a8ee6;
      i{
        color: #3a8ee6;
        font-size: 40px;
      }
      p{
        margin: 10px 0 0 0;
      }
    }
  }
</style>