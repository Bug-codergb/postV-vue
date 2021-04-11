<template>
  <div class="search-history">
    <p class="title">搜索历史
      <i class="iconfont icon-template_delete-copy"
         @click="clearAll"
         title="清空搜索历史"></i>
    </p>
    <ul class="history-item" v-if="history.length">
      <li v-for="item in history" :key="item" ref="history">
        <div v-if="item" @click="changeKeyword(item)">{{item}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {strToHistoryArray} from "@/utils/history";

export default {
name: "History",
  data()
  {
    return {
      history:[],
    }
  },
  created()
  {
    if (Array.isArray(strToHistoryArray())) {
      this.history=strToHistoryArray()
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if(this.$refs.history)
      {
        this.$refs.history.forEach((item,index)=>{
          if(item.offsetWidth>=280)
          {
            item.classList.add('active')
          }
        })
      }
    })
  },
  methods:{
    clearAll()
    {
      window.localStorage.removeItem('history');
    },
    changeKeyword(item)
    {
      this.$emit('changeKeyword',item)
    }
  }
}
</script>

<style scoped lang="less">
  .search-history{
    position: absolute;
    background-color: #fff;
    z-index:999;
    top:110%;
    left: 5%;
    width: 300px;
    height: 200px;
    padding:15px 20px;
    box-shadow: 0 0 15px rgba(0,0,0,.3);
    border-radius: 5px;
    .title{
      font-size: 13px;
      margin: 0 0 20px 0;
      color: #666666;
      i{
        margin: 0 0 0 20px;
        color: #666666;
        cursor:pointer;
      }
    }
    .history-item{
      display: flex;
      flex-wrap: wrap;
      li{
        font-size: 13px;
        border: 1px solid #d8d8d8;
        padding: 3px 10px;
        margin: 0 10px 5px 0;
        border-radius: 15px;
        color: #666666;
        cursor:pointer;
        &.active{
          width: 280px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
</style>