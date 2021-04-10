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
           @focus="focus"
           v-model="keywords" />
    <search-result v-show="isShow" :searchRes="searchRes"/>
    <history v-if="isShowHistory" @changeKeyword="changeKeyword"/>
  </div>
</template>

<script>
import SearchResult from "@/components/content/searchResult/SearchResult";
import {search} from "@/network/search";
import History from "@/components/content/topBar/childCpn/search/history/History";
import {historyStr, strToHistoryArray} from "@/utils/history";

export default {
  name: "Search",
  data() {
    return {
      keywords: '',
      isShow: false,
      isShowHistory:false,
      searchRes: {
        user: [],
        moment: []
      }
    }
  },
  components: {
    History,
    SearchResult
  },
  methods: {
    searchInp() {
      if (this.keywords.length !== 0) {
        this.isShowHistory=false;
        search(this.keywords).then(data => {
          console.log(data);
          this.searchRes = data;
        })
        this.isShow = true;
      }
      else{
        this.isShow=false;
       this.isShowHistory=true;
      }
    },
    changeKeyword(item)
    {
      this.keywords=item;
      this.searchRouter();
    },
    changeStatus() {
      this.isShow = false;
      this.isShowHistory=false;
    },
    //将search数据添加到vuex
    searchRouter() {
      if(strToHistoryArray().length<=20)
      {
        let isExist=strToHistoryArray().findIndex((item,index)=>{
          return item===this.keywords;
        })
        if(isExist===-1)
        {
          historyStr(this.keywords);
        }
        else{
          const index=strToHistoryArray().indexOf(this.keywords);
          let historyArray=strToHistoryArray();
          historyArray.splice(index,1);
          window.localStorage.removeItem('history');
          window.localStorage.setItem('history',historyArray.join(","));
          historyStr(this.keywords);
        }
      }
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
    },
    focus()
    {
      if(this.keywords==='')
      {
        this.isShowHistory=true
      }
      else{
        this.isShowHistory=false;
        this.isShow=true;
      }
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