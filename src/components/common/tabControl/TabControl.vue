<template>
  <div class="tab-control">
    <ul>
      <li v-for="(item,index) in list" :class="{active:currentIndex===index}" @click="liClick(index)">
        {{item}}
      </li>
    </ul>
    <div v-for="(item,index) in list" v-show="currentIndex===index">
      <slot :name="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    list:{
      type:Array,
      default()
      {
        return []
      }
    }
  },
  data()
  {
    return {
      currentIndex:0
    }
  },
  methods:{
    liClick(index)
    {
      this.currentIndex=index;
    }
  }
}
</script>

<style scoped lang="less">
  .tab-control{
    >ul{
      display: flex;
      margin: 0 0 20px 0;
      li{
        margin: 0 20px 0 0;
        cursor:pointer;
        padding: 0 0 3px 0;
      }
      li.active{
        font-weight: bold;
        border-bottom: 4px solid #3a8ee6;
      }
    }
  }
</style>