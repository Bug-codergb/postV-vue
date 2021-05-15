<template>
  <div class="tab-bar">
    <ul>
      <li v-for="(item,index) in list" :class="{active:currentIndex===index}" @click="liClick(index)">
        <slot :name="item"></slot>
        {{item}}
        <div class="indicate" v-show="currentIndex===index">
          <i class="iconfont icon-right-triangle"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data()
  {
    return {
      currentIndex:0
    }
  },
  props:{
    list:{
      type:Array,
      default()
      {
        return []
      }
    },
    path:{
      type:Array,
      default()
      {
        return []
      }
    }
  },
  methods:{
    liClick(index)
    {
      this.currentIndex=index;
      this.$router.push({
        path:`/Home${this.path[index]}`
      })
    },
  }
}
</script>

<style scoped lang="less">
 .tab-bar{
   position: fixed;
   transform: translateX(-100%);
   left: 8%;
   top: 30%;
 }
 .tab-bar ul li
 {
   margin: 0 0 20px 0;
   background-color: #3a8ee6;
   font-size: 16px;
   color: #fff;
   padding: 5px 10px;
   cursor: pointer;
   position: relative;
   border-radius: 3px;
   &:hover{
     background-color: #0c73c2;
   }
   &.active{
     background-color:#0c73c2 ;
   }
   .indicate{
     width: 25px;
     height:$width;
     line-height: $height;
     position: absolute;
     top: 50%;
     transform: translateY(-50%);
     left: 100%;
     border-radius: 0 -50px 50% 0;
     i{
       color: #0c73c2;
       font-size: 16px;
     }
   }
 }
</style>