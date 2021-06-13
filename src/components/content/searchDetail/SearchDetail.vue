<template>
  <div class="search-detail">
    <div class="left-content">
      <ul>
        <li v-for="(item,index) in path" @click="searchResRouter(item,index)" :class="{active:currentIndex===index}">
          {{list[index]}}
        </li>
      </ul>
      <router-view/>
    </div>
    <div class="right-content">
      45
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchDetail",
  data()
  {
    return {
      currentIndex:0,
      list:['动态','用户','专题','频道'],
      path:['moment','user','topic','channel']
    }
  },
  methods:{
    searchResRouter(item,index)
    {
      this.currentIndex=index;
      this.$router.push({
        path:`/searchDetail/${item}`
      })
    }
  }
}
</script>

<style scoped lang="less">
  .search-detail{
    width: 100%;
    height: 1000px;
    display: flex;
    .left-content{
      width:70%;
      border-right: 1px solid #d8e8fa;
    }
    ul{
      display: flex;
      li{
        margin: 0 20px 0 0;
        cursor:pointer;
        padding: 0 0 5px 0;
        &.active{
          font-weight: bolder;
          border-bottom:3px solid @themeColor;
        }
      }
    }
  }
</style>