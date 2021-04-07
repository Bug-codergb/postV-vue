<template>
  <div class="topic-item">
    <div class="header">
      <div class="left-content">
        <div class="img-container">
          <img :src="topic.picUrl" />
        </div>
      </div>
      <div class="right-content">
        <div class="state">
          <div>
            <div class="title">{{topic.name}}</div>
            <div class="user-msg">
              <div class="avatar">
                <img :src="topic.user.avatarUrl" />
              </div>
              <div class="user-name">{{topic.user.userName}}</div>
              <!--创建实践-->
              <div class="time">{{topic.updateTime.substring(0,10)}}</div>
            </div>
            <!--成员数-->
            <div class="user-count">
              {{topic.users}}
              成员
              <i class="iconfont icon-svgarrowsright"></i>
            </div>
          </div>
          <div class="follow" v-show="!isJoin" @click.stop="join(topic)">加入</div>
          <div class="follow" v-show="isJoin">已加入</div>
        </div>
        <!--简介-->
        <div class="desc">
          <span>简介: </span>
          {{topic.description}}
        </div>
      </div>
    </div>
    <!--        <topic-item :topic-id="item.topicId" />-->
  </div>
</template>

<script>
import {joinTopic} from "@/network/topic";

export default {
  name: "TopicItem",
  props:{
    topic:{
      type:Object,
      default()
      {
        return {}
      }
    }
  },
  created() {
    console.log(this.topic)
  },
  computed:{
    isJoin()
    {
      let flag=-1;
      if(this.$store.state.userDetail.topic)
      {
        flag=this.$store.state.userDetail.topic.findIndex((item,index)=>{
          return this.topic.topicId===item.topicId
        })
        console.log(flag)
        if(flag===-1)
        {
          return false
        }
        else{
          return true
        }
      }
    }
  },
  methods:{
    join(item)
    {
      joinTopic(item.topicId).then(data=>{
        this.$toast.show("加入成功",1500)
        this.$store.dispatch({
          type:'getUserDetailAction',
          userId:this.$store.state.userMsg.userId
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.center()
{
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.title{
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px 0;
}
.topic-item{
      .header{
        display: flex;
        margin: 0 0 15px 0;
        .left-content{
          .img-container{
            width:150px;
            height: 150px;
            overflow: hidden;
            background-color: #333;
            border-radius: 8px;
            img{
              width: 150px;
            }
          }
        }
        .right-content{
          margin: 0 0 0 20px;
          .title{
            font-size: 20px;
            font-weight: bolder;
          }
          //成员数
          .user-count{
            display: flex;
            margin: 15px 0 0 0;
            align-items: center;
            font-size: 13px;
            i{
              font-size: 12px;
            }
          }
          .state{
            display: flex;
            align-items: flex-start;
            width:500px;
            justify-content: space-between;
            .follow{
              background-color: rgba(58, 142, 230,.75);
              color: #fff;
              padding: 5px 15px;
              font-size: 13px;
              border-radius: 4px;
              text-align: center;
              cursor: pointer;
            }
            .user-msg{
              display: flex;
              align-items: center;
              .avatar{
                border: 1px solid rgba(0,0,0,.2);
                position: relative;
                height: 20px;
                width:20px;
                overflow: hidden;
                border-radius: 50%;
                img{
                  height: 20px;
                }
              }
              .user-name{
                font-size:12px ;
                color: #3a8ee6;
                margin: 0 15px 0 5px;
                cursor: pointer;
              }
              .time{
                font-size:12px ;
                color: #676767;
              }
            }
          }
          .desc{
            font-size: 12px;
            color:#676767;
            margin: 15px 0 0 0;
            width: 500px;
            line-height: 20px;
            overflow: hidden;
            height:40px;
          }
        }
      }
}
</style>