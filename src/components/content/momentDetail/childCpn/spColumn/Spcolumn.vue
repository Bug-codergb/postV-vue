<template>
  <div class="spcolumn">
    <h3>TA的专栏</h3>
    <ul>
      <li v-for="(item,index) in spColumn" :key="item.momentId">
       <div class="spcolumn-outer" v-if="momentId!==item.momentId">
         <div class="img-container" v-if="item.picUrl" @click="momentRouter(item)">
           <img :src="item.picUrl[0]+'&type=small'" alt=""/>
         </div>
         <div class="msg">
           <div class="title text-nowrap">{{item.title}}</div>
           <div class="time">{{formatTime(item.createTime,"yyyy-MM-dd")}}</div>
         </div>
       </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getUserSpColumn} from "@/network/user";
import {formatDate} from "@/utils/formatDate";

export default {
  name: "Spcolumn",
  props:{
    userId:{
      type:String,
      default:""
    },
    momentId:{
      type:String,
      default:""
    }
  },
  data(){
    return {
      spColumn:[]
    }
  },
  created() {
    getUserSpColumn(this.userId).then(data=>{
      console.log(data);
      if(data){
        this.spColumn=data;
      }
    })
  },
  methods:{
    formatTime(time,ft){
      return formatDate(time,ft);
    },
    momentRouter(item){
      this.$emit("spcolumn-change",item.momentId)
    }
  }
}
</script>

<style scoped lang="less">
  .spcolumn{
    width: 100%;
    h3{
      margin: 50px 0 0 0;
    }
    &>ul{
      &>li{
        padding: 10px 0;
        .spcolumn-outer{
          display: flex;
        }
        .img-container{
          width:130px;
          height:80px;
          background-color: #333;
          overflow: hidden;
          border-radius: 4px;
          position: relative;
          img{
            .center(50%,50%,-50%,-50%);
            height: 100%;
          }
        }
        .msg{
          margin: 0 0 0 20px;
          .title {
            width: 160px;
          }
          .time{
            color:#656565;
            font-size: 12px;
            margin: 30px 0 0 0;
          }
        }
      }
    }
  }
</style>