<template>
  <div class="search-detail">
    <ul>
      <li v-for="(item,index) in path" @click="searchResRouter(item,index)" :class="{active:currentIndex===index}">
        {{list[index]}}
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "SearchDetail",
  data()
  {
    return {
      currentIndex:0,
      list:['动态','用户'],
      path:['moment','user']
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
    height: 1000px;
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