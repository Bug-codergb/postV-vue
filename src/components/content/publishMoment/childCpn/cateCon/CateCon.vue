<template>
  <div class="cate-con">
    <ul class="cate-con-list">
      <li v-for="(item,index) in list.cate" :key="item.id"
          :class="{active:currentIndex===index}"
          @click="liClick(item,index)">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CateCon",
  props:{
    list:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    liClick(item,index){
      this.currentIndex=index;
      this.$emit('cate-click',item);
    }
  }

}
</script>

<style scoped lang="less">
  .cate-con-list{
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0;
    li{
      margin: 0 10px 10px 0;
      padding: 5px 15px;
      font-size: 13px;
      background-color: #a0c9f3;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      &.active{
        background-color:#3a8ee6;
      }
    }
  }
</style>