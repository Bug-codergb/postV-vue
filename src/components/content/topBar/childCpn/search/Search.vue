<!--设置搜索框样式-->
<template>
  <div class="search-outer">
    <i class="iconfont icon-search searchIcon" @click="searchRouter"></i>
    <input type="text"
           class="search"
           placeholder="搜索你感兴趣的"
           @input="searchInp"
           @blur="changeStatus"
           @keydown.enter="enter"
           v-model="keywords" />
    <search-result v-show="isShow" :searchRes="searchRes"/>
  </div>
</template>

<script>
import SearchResult from "@/components/content/searchResult/SearchResult";
import {search} from "@/network/search";

export default {
  name: "Search",
  data() {
    return {
      keywords: '',
      isShow: false,
      searchRes: {
        user: [],
        moment: []
      }
    }
  },
  components: {
    SearchResult
  },
  methods: {
    searchInp() {
      if (this.keywords.length !== 0) {
        search(this.keywords).then(data => {
          console.log(data);
          this.searchRes = data;
        })
        this.isShow = true;
      }
    },
    changeStatus() {
      this.isShow = false;
    },
    //将search数据添加到vuex
    searchRouter() {
      this.$store.commit({
        type:'changeSearchResult',
        searchResult:this.searchRes
      })
      this.$router.push({
        path:'/searchDetail'
      })
    },
    enter()
    {
      this.searchRouter();
    }
  }
}
</script>

<style scoped lang="less">
.search-outer{
 /* background-color: #3a8ee6;*/
  position: relative;
  margin: 0 0 0 200px;
  i{
    cursor:pointer;
  }
}
.search{
  border: 1px solid @themeColor;
  height: 35px;
  width: 300px;
  padding:0 20px 0 40px;
  border-radius: 20px;
}
.searchIcon{
  position: absolute;
  top:50%;
  transform: translateY(-50%);
  left: 4%;
}
</style>