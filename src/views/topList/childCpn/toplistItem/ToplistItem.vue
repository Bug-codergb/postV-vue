<template>
  <div class="toplist-item">
    <div class="toplist-item-header">
      <div class="banner">
        <swiper :list="list.slice(0,5)" height="240px" :is-show-title="false"
                 @change="change"
                 :activeItem="activeItem"
                 :auto-play="autoPlay"/>
      </div>
      <div class="state" @mouseover="over" @mouseleave="leave">
        <ul>
          <li v-for="(item,index) in list.slice(0,5)" :key="item.id" class="text-nowrap"
              :class="{active:index===liveIndex}"
               @click="liClick(item,index)">
            <span class="index">{{index+1}}</span>
            {{item.title}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper";
export default {
  name: "ToplistItem",
  components: {Swiper},
  data(){
    return {
      liveIndex:0,
      activeItem:0,
      autoPlay:true
    }
  },
  props:{
    list:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    change(current,prev){
      this.liveIndex=current;
    },
    liClick(item,index){
      this.activeItem=index;
    },
    over(){
      this.autoPlay=false
    },
    leave(){
      this.autoPlay=true
    }
  }
}
</script>

<style scoped lang="less">
  .toplist-item{
    margin: 10px 0;
    .toplist-item-header{
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: space-between;
      .banner{
        width: 60%;
      }
      .state{
        width: 38%;
        background-color: #363636;
        color: #fff;
        &>ul{
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 240px;
          &>li{
            padding: 10px;
            font-size: 13px;
            cursor: pointer;
            width: 100%;
            .index{
              margin: 0 5px 0 0;
              font-weight: bold;
              text-shadow: 0 10px 120px rgba(255,255,255);
            }
            &.active{
              background-color: #959595;
            }
          }
        }
      }
    }
  }
</style>