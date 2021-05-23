<template>
  <div class="channel">
    <cate-list/>
    <ul class="cate-detail-list">
      <li v-for="(item,index) in cateDetail" :key="item.id">
        <!--频道头-->
        <div class="title">
          <div class="img-container">
            <img :src="item.coverUrl"/>
          </div>
          <div class="msg">
            <div class="title-name">{{item.name}}</div>
            <div class="total">
              {{item.channels.length}}个视频
            </div>
          </div>
        </div>
        <!--频道内容-->
        <ul class="cate-content">
          <li v-for="(iten,i) in item.channels" :key="iten.cId">
            <msg-list :is-show-play="false" item-width="168px" :is-show-time="false" creator-top="85%">
              <div slot="img-container">
                <img :src="iten.picUrl"/>
              </div>
              <div class="cate-content-state text-nowrap" slot="state">{{iten.title}}</div>
              <div slot="avatarUrl">
                <img :src="iten.user.avatarUrl"/>
              </div>
              <div slot="userName" class="cate-content-user-name text-nowrap">
                {{iten.user.userName}}
              </div>
            </msg-list>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import CateList from "./childCpn/cataList/CateList";
import {getChannelCateDetail} from "@/network/channel";
import MsgList from "@/components/common/msgList/MsgList";
export default {
  name: "Channel",
  components: {MsgList, CateList},
  data(){
    return {
      cateDetail:[]
    }
  },
  created() {
    getChannelCateDetail(1621165270587).then(data=>{
      console.log(data);
      this.cateDetail=data;
    })
  }
}
</script>

<style scoped lang="less">
  .center(){
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .channel{
    .cate-detail-list{
      margin: 30px 0 0 0;
      &>li{
        margin: 0 0 30px 0 ;
      }
      .img-container{
        overflow: hidden;
        height: 70px;
        width: 70px;
        position: relative;
        img{
          height: 100%;
          .center()
        }
      }
      .title{
        display: flex;
        align-items: center;
        .msg{
          margin: 0 0 0 15px;
          .title-name{
            font-size: 16px;
            color: #212121;
            margin: 0 0 15px 0;
          }
          .total{
            color: #999999;
            font-size: 13px;
          }
        }
      }
      .cate-content{
        margin: 20px 0 0 0;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          width:168px;
        }
        .cate-content-state{
          margin:20px 0 0 0 ;
        }
        .cate-content-user-name{
          font-size: 13px;
        }
      }
    }
  }
</style>