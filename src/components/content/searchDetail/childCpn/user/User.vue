<template>
  <div class="user">
    <ul>
      <li v-for="(item,index) in this.$store.state.searchResult.user">
        <div class="img-container">
          <img :src="item.avatarUrl" />
        </div>
        <div class="right-content">
          <div class="creator">
            {{item.userName}}
          </div>
          <div class="desc" v-if="item.desc">{{item.desc}}</div>
          <div class="desc" v-else>暂无简介</div>
          <div class="simple-desc">
            <div class="moment">
              动态:{{item.moments}}
            </div>
            <div class="moment">
              关注:{{item.follow}}
            </div>
            <div class="moment">
              粉丝:{{item.fans}}
            </div>
            <div class="moment">
              加入的专题:{{item.topic}}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {userDetail} from "@/network/user";

export default {
  name: "User",
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
  }
  .user{
    margin: 20px 0 0 0;
    ul{
      li{
        margin: 0 20px 0 0;
        display: flex;
        height: 100px;
        align-items: center;
        border-bottom: 1px solid #d8e8fa;
      }
      display: flex;
      .img-container{
        width:70px;
        height:70px;
        border-radius:50% ;
        overflow: hidden;
        position: relative;
        img{
          .center();
          height: 100%;
        }
        background-color: #d8e8fa;
      }
      .creator{
        font-size: 14px;
        color: #7f7f7f;
        margin:0 0 10px 0 ;
      }
    }
    .right-content{
      margin: 0 0 0 20px;
      .simple-desc{
        display: flex;
        font-size: 13px;
        color: #9b9b9b;
        div{
          margin: 0 10px 0 0;
        }
      }
      .desc{
        font-size: 12px;
        color: #9b9b9b;
        margin: 0 0 10px 0;
      }
    }
  }
</style>