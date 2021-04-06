<template>
  <div class="picture">
    <ul>
      <li v-for="(item,index) in pictures" :key="item.id">
        <!--用户头像信息-->
        <div class="avatar">
          <div class="user-avatar">
            <img :src="item.user.avatarUrl" :alt="item.title" />
          </div>
          <div class="user-name">
            {{item.user.userName}}
          </div>
        </div>
        <div class="title">{{item.title}}</div>
        <div class="img-container">
          <img :src="item.picUrl" />
        </div>
        <tags/>
        <reply id="item.momentId"/>
        <!--图片（动态）评论-->
        <comment :momentId="item.momentId" />
      </li>
    </ul>
  </div>
</template>

<script>
import {getToplistPic} from "@/network/toplist";
import Comment from "@/components/content/comment/Comment";
import Reply from "@/components/content/reply/Reply";
import Tags from "@/components/content/tags/Tags";

export default {
  name: "picture",
  components: {Tags, Reply, Comment},
  data()
  {
    return {
      pictures:[]
    }
  },
  created()
  {
    getToplistPic(0,7).then(data=>{
      console.log(data)
      this.pictures=data;
    })
  }
}
</script>

<style scoped lang="less">
  .picture{
    margin: 20px 0 0 20px;
    ul{
      li{
        border-bottom: 1px solid #c4ddf7;
        padding: 15px 0;
        .img-container{
          img{
            width: 400px;
            outline:1px solid rgba(0,0,0,.3) ;
          }
        }
        .title{
          margin: 10px 0;
        }
      }
    }
  }
  .avatar{
    display: flex;
    align-items: center;
    .user-avatar{
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #d8e8fa;
      img{
        width: 50px;
      }
    }
    .user-name{
      font-size: 14px;
      font-weight: bold;
      color: #3a8ee6;
      margin: 0 0 0 5px;
    }
  }
</style>