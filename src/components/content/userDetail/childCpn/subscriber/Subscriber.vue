<template>
  <div class="subscriber">
    <div class="content">
      <tab-control :list="['动态','专题']">
        <ul class="moment" slot="动态">
          <li v-for="(item,index) in momentDetails" :key="item.momentId">
            <div class="moment-left">
              <div class="moment-img-container">
                <img :src="item.picUrl[0].picUrl" />
              </div>
            </div>
            <div class="moment-right">
              <div class="title text-nowrap">{{item.title}}</div>
              <div class="msg">
                <div class="user-msg" v-if="user">
                  <div class="avatar">
                    <img :src="user.avatarUrl" />
                  </div>
                  <div class="user-name">{{user.userName}}</div>
                </div>
                <div class="time">{{item.updateTime.substring(0,10)}}</div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="topic" slot="专题">
          <li v-for="(item,index) in topicDetails" :key="item.topic_content_id">
            <div class="topic-left">
              <div class="title">{{item.title}}</div>
              <div class="msg">
                <div class="user-msg" v-if="user">
                  <div class="avatar">
                    <img :src="user.avatarUrl" />
                  </div>
                  <div class="user-name">{{user.userName}}</div>
                </div>
              </div>
            </div>
            <div class="topic-right">
              <div class="topic-container-img" v-if="item.picUrl">
                <img :src="item.picUrl[0].picUrl" />
              </div>
            </div>
          </li>
        </ul>
      </tab-control>
    </div>
  </div>
</template>

<script>
import MomentDetail from "@/components/content/momentDetail/MomentDetail";
import Moment from "@/components/content/moment/Moment";
import {getUserSub} from "@/network/user";
import TabControl from "@/components/common/tabControl/TabControl";

export default {
name: "Subscriber",
  components: {TabControl, Moment, MomentDetail},
  props:{
    userId:{
      type:String,
      default()
      {
        return ''
      }
    },
  },
  data()
  {
    return {
      momentDetails:[],
      topicDetails:[],
      user:{}
    }
  },
  created() {
  console.log(this.userId)
    getUserSub(this.userId).then(data=>{
      console.log(data)
      this.momentDetails=data.moments
      this.topicDetails=data.topicContent;
      this.user=data.user;
    })
  },
  methods:{

  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .moment{
    li{
      display: flex;
      padding: 10px 0;
      .moment-left{
        .moment-img-container{
          width: 200px;
          height: 130px;
          overflow: hidden;
          background-color: #333;
          img{
            width: 200px;
          }
        }
      }
      .moment-right{
        margin: 0 0 0 20px;
        .title{
          width:450px;
          margin: 0 0 20px 0;
        }
        .msg{
          display: flex;
          width: 400px;
          align-items: center;
          justify-content:space-between;
          .user-msg{
            display: flex;
            align-items: center;
            .avatar{
              width: 20px;
              height: 20px;
              overflow: hidden;
              border-radius: 50%;
              position: relative;
              img{
                .center();
                height: 20px;
              }
            }
            .user-name{
              font-size: 12px;
              color: #3a8ee6;
            }
          }
          .time{
            color: #9ca3ab;
            font-size: 12px;
          }
        }
      }
    }
  }
  .topic{
    li{
      display: flex;
      justify-content: space-between;
      padding: 10px 30px 10px 0;
      border-bottom: 1px solid #d8e8fa;
    }
    .topic-left{
      .title{
        font-size: 20px;
        margin: 0 0 30px 0;
      }
      .msg{
        .user-msg{
          display: flex;
          align-items: center;
          .avatar{
            width: 20px;
            height: 20px;
            overflow: hidden;
            border-radius: 50%;
            position: relative;
            img{
              .center();
              height: 20px;
            }
          }
          .user-name{
            color: #3a8ee6;
            font-size: 12px;
          }
        }
      }
    }
      .topic-right{
        .topic-container-img{
          width: 120px;
          height: 80px;
          overflow: hidden;
          border-radius: 8px;
          background-color: #333;
          img{
            width: 120px;
          }
        }
    }
  }
</style>