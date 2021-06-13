<!--用户详情页-->
<template>
  <div class="user-detail">
     <div class="left-content">

       <user-detail-header :user-detail="userDetail"/>

       <tab-control :list="['动态','关注','粉丝','收藏','专题']">
         <div slot='动态'>
           <moment-item :moment-detail="momentDetail"/>
         </div>
         <div slot="关注">
           <follow :follow="userDetail.follow"/>
         </div>
         <div slot="粉丝">
           <fans :fans="userDetail.fans"/>
         </div>
         <div slot="收藏">
           <subscriber :user-id="userId" v-if="userId" :key="userId"/>
         </div>
         <div slot="专题">
           <topic :user-id="userId" v-if="userId" :key="userId"/>
         </div>
       </tab-control>
     </div>

    <div class="right-content">
      <h4>推荐用户</h4>
      <ul class="rec-user">
        <li v-for="(item,index) in recommendUser" :key="item.userId" @click="userRouter(item)">
          <div v-if="item.userId!==userId">
            <div class="avatar">
              <img :src="item.avatarUrl" alt="" />
            </div>
            <div class="rec-user-info">
              <div class="rec-user-name">{{item.userName}}</div>
              <div class="rec-user-desc text-nowrap">{{item.desc}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TabControl from "@/components/common/tabControl/TabControl";
import {recommendUser, setUserDesc, userDetail, userMoment} from "@/network/user";
import {momentDetail} from "@/network/home";
import Moment from "@/components/content/moment/Moment";
import {delMoment} from "@/network/moment";
import Follow from "@/components/content/userDetail/childCpn/follow/Follow";
import {cancelFollow, followUser} from "@/network/follow";
import Subscriber from "@/components/content/userDetail/childCpn/subscriber/Subscriber";
import Fans from "@/components/content/userDetail/childCpn/fans/Fans";
import Topic from "@/components/content/userDetail/childCpn/topic/Topic";
import UserDetailHeader from "@/components/content/userDetail/childCpn/userDetailHeader/UserDetailHeader";
import MomentItem from "@/components/content/momentItem/MomentItem";
export default {
  name: "userDetail",
  components: {
    MomentItem,
    UserDetailHeader,
    Fans,
    Subscriber,
    Moment,
    TabControl,
    Follow,
    Topic
  },
  data(){
    return {
      userDetail:{},
      momentDetail:[],
      moments:[],
      userId:'',
      recommendUser:[]
    }
  },
  created() {
    this.userId=this.$route.query.id;
    this.getUserDetail(this.userId);
  },
  methods:{
    getUserDetail(userId)
    {
      userDetail(userId).then(data=>{
        this.userDetail=data
      })
      userMoment(this.userId).then(data=>{
        if(data.moments)
        {
          this.moments=data.moments
          let promise=this.moments.map((item,index)=>{
            return momentDetail(item.id);
          })
          Promise.all(promise).then(data=>{
            this.momentDetail=data
            console.log(data)
          })
        }
      })
      //推荐用户
      recommendUser().then(data=>{
        this.recommendUser=data;
      })
    },
    //切换用户信息
    userRouter(item)
    {
      this.userId=item.userId;
      this.getUserDetail(this.userId);
    },
    deleteMoment(item)
    {
      //console.log(item.id)
      const result=confirm("您确定要删除动态？")
      if(result)
      {
        delMoment(item.id).then(data=>{
          console.log(data)
        })
      }
    },
  }
}
</script>

<style scoped lang="less">
  .center() {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .user-detail{
    width: 1180px;
    display: flex;
    flex-wrap:nowrap ;
    .left-content {
      width: 70%;
      border-right: 1px solid #d8e8fa;
      .detail-moments{
        border-bottom: 1px solid #c4ddf7;
        padding: 15px 0;
      }
      .detail-moments:hover .delete-moment{
        display: block;
      }
      /*删除动态*/
      .delete-moment{
        margin: 0 0 0 420px;
        display: none;
        cursor: pointer;
        i{
          color: #a1a3a1;
          font-size: 20px;
        }
      }
    }
  }
   .content{
     .state{
       color:#595959;
       /deep/ img{
         display: block;
         outline: 1px solid rgba(0,0,0,.1);
         width:400px;
         margin: 0 auto;
       }
     }
   }
   .right-content{
     h4{
       margin: 0 0 15px 0;
     }
     padding: 0 0 0 10px;
     li{
       &>div{
         padding:5px 0;
         display: flex;
       }
       .avatar{
         position: relative;
         width: 50px;
         height: 50px;
         overflow: hidden;
         background-color: #333;
         img{
           height: 100%;
           .center();
         }
       }
       .rec-user-info{
         margin: 0 0 0 20px;
         .rec-user-name{
           color: #3a8ee6;
           font-size: 12px;
           margin: 0 0 10px 0;
         }
         .rec-user-desc{
           font-size: 12px;
           width: 180px;
         }
       }
     }
   }
</style>