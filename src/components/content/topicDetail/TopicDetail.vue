<template>
  <div class="topic-detail">
    <div class="left-content">
      <!--头部内容-->
      <topic-item :topic="topicContent" v-if="topicContent.topicId"/>
      <!--发布内容-->
      <div class="publish-content">
        <p>一起讨论</p>
        <i class="iconfont icon-pinglun1" title="发表内容" @click="publish"></i>
        <div class="publish-topic-content" v-show="isShow">
          <TopicContent :topic-id="topicContent.topicId" @cancelPublish="cancelPublish"/>
        </div>

      </div>
      <!--内容-->
      <ul>
        <li v-for="(item,index) in topicContent.content" :key="item.topic_content_id" @click="topicContentRouter(item)">
          <div class="left-msg">
            <div class="title">{{item.title}}</div>
            <div class="user-msg">
              <div class="avatar">
                <img :src="item.user.avatarUrl" />
              </div>
              <div class="user-name">{{item.user.userName}}</div>
            </div>
          </div>
          <div class="right-msg">
            <div class="img-container" v-if="item.picUrl">
              <img :src="item.picUrl[0].picUrl" />
            </div>
          </div>

        </li>
      </ul>
    </div>
    <div class="left-right"></div>
  </div>
</template>

<script>
import {getTopicContent} from "@/network/topic";
import TopicItem from "@/components/content/topicItem/TopicItem";
import TopicContent from "@/components/content/admin/childCpn/topic/childCpn/TopicContent";

export default {
  name: "TopicDetail",
  components: {TopicContent, TopicItem},
  data()
  {
    return {
      topicContent:{},
      isShow:false
    }
  },
  created() {
    getTopicContent(this.$route.query.topicId,0,30).then(data=>{
      //console.log(data.content);
      this.topicContent=data;
    })
  },
  methods:{
    topicContentRouter(item)
    {
      //console.log(item);
      this.$router.push({
        path:'/topicContentDetail',
        query:{
          topic_content_id:item.topic_content_id
        }
      })
    },
    publish()
    {
      this.isShow=true;
    },
    cancelPublish()
    {
      this.isShow=false;
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .topic-detail{
    display: flex;
    .left-content{
      width: 750px;
      height: 1000px;
      border-right: 1px solid rgba(58, 142, 230,.2);
      /*发布专题内容*/
      .publish-content{
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(58, 142, 230,.4);
        padding: 20px 0;
        position: relative;
        p{
          font-size: 14px;
          margin: 0 10px 0 0;
        }
        i{
          color: #3a8ee6;
          cursor: pointer;
        }
        .publish-topic-content{
          background-color: #fff;
          .center();
          z-index: 99;
        }
      }
      ul{
        li{
          display: flex;
          justify-content: space-between;
          padding: 10px 50px 10px 0;
          border-bottom: 1px solid #d8e8fa;
        }
      }
      .left-msg{
        .title{
          font-size: 20px;
          font-weight: bolder;
        }
        .user-msg{
          display: flex;
          margin: 20px 0 0 0;
          align-items: center;
          .avatar{
            width: 20px;
            height: 20px;
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            img{
              height: 20px;
              .center();
            }
          }
          .user-name{
            font-size: 12px;
            color: #3a8ee6;
          }
        }
      }
      .right-msg{
        .img-container{
          width: 120px;
          overflow: hidden;
          height: 80px;
          background-color: #333;
          position: relative;
          border-radius: 5px;
          img{
            width: 120px;
            .center();
          }
        }
      }
    }
    .right-content{
      flex: 1;
    }
  }
</style>