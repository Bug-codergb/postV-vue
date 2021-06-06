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
    <div class="body-content">
      <ul class="item-content">
        <li v-for="(item,index) in toplist.slice(5,100)" :key="item.momentId" @click="detailRouter(item,index)">
           <MsgItem :title="item.title" img-width="140px">
             <div slot="index" class="spcolumn-index">{{index+6}}</div>
             <img slot="img-container" :src="item.picUrl[0]+'&type=small'" v-if="item.picUrl" alt=""/>
             <img slot="avatar" :src="item.user.avatarUrl" alt=""/>
             <div slot="user-name" class="spcolumn-user-name">{{item.user.userName}}</div>
             <span slot="time">{{ formatTime(item.createTime,"yyyy-MM-dd hh:mm:ss")}}</span>
             <span slot="thumb">{{item.thumbs}}</span>
             <span slot="comment">{{item.comments}}</span>
             <span slot="view">{{item.view}}</span>
           </MsgItem>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper";
import MsgItem from "@/components/common/msgItem/MsgItem";
import {formatDate} from "@/utils/formatDate";
export default {
  name: "ToplistItem",
  components: {MsgItem, Swiper},
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
    },
    toplist:{
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
    },
    formatTime(time,ft){
      return formatDate(time,ft);
    },
    detailRouter(item,index){
      console.log(item);
      const {type,user}=item;
      if(type===1) {
        this.$router.push({
          path: "/videoDetail",
          query: {
            vid: item.vid
          }
        })
      }
      else if(type===0){
       this.$router.push({
        path:"/momentDetail",
        query:{
          momentId:item.momentId,
          userId:user.userId
        }
      })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .toplist-item{
    margin: 30px 0;
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
    .body-content{
      .item-content{
        &>li{
          width: 100%;
          padding: 15px 0;
          border-bottom: 1px solid #d8e8fa;
          display: flex;
          align-items: center;
          .spcolumn-index{
            font-size: 16px;
            text-shadow: 0 0 20px #fff;
          }
          .spcolumn-user-name{
            font-size: 12px;
            margin: 0 0 0 5px;
          }
        }
      }
    }
  }
</style>