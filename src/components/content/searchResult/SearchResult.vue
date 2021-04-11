<!--搜索关键字结果-->
<template>
  <div id="search-result">
    <!--动态-->
    <div class="moment-cate" v-show="searchRes.moment.length!==0">
      <i class="iconfont icon-dongtai"></i>
      动态
    </div>
    <ul class="search-moment">
      <li v-for="(item,index) in searchRes.moment"
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
      <li v-for="(item,index) in searchRes.user"
          :key="item.userId"
          class="text-nowrap"
          @click.stop="userRouter(item)">
        <div>{{item.userName}}</div>
      </li>
    </ul>
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
          moment:[]
        }
      }
    }
  },
  methods:{
    momentRouter(item)
    {
      this.$emit('moment-match',item)
      this.$router.push({
        path:'/momentDetail',
        query:{
          momentId:item.momentId,
          userId:item.user.userId
        }
      })
    },
    userRouter(item)
    {
      this.$emit('moment-match',item)
      this.$router.push({
        path:'/userDetail',
        query:{
          id:item.userId
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
    top:110%;
    left: 8%;
    width: 300px;
    height: 400px;
    padding:15px 20px;
    box-shadow: 0 0 15px rgba(0,0,0,.3);
    border-radius: 5px;
    .search-moment,.search-user{
      font-size: 12px;
      li{
        display: flex;
        align-items: center;
        width: 280px;
        padding: 5px 0;
        cursor:pointer;
        &:hover{
          background-color: #f2f2f2;
        }
      }
    }
    .moment-cate,.user-cate{
      font-size:13px;
      background-color: #f5f5f7;
      padding: 5px 0;
    }
  }
</style>