<!--用户详情页-->
<template>
  <div class="user-detail">
     <div class="left-content">
       <div class="user-detail-header">
         <div class="img-container">
           <img :src="userDetail.avatarUrl" />
         </div>
         <div class="user-msg">
           <h2>{{userDetail.userName}}</h2>
           <button class="attention" v-show="!followStatus" @click="follow(userDetail.userId)">
             <i class="iconfont icon-guanzhu"></i>
             关注
           </button>
           <button class="attention"
                   v-show="followStatus"
                   @click="cancelFollow(userDetail.userId)"
                   title="取消关注">
             <i class="iconfont icon-danyehuaban"></i>
             已关注
           </button>
           <div class="desc">
             <span>简介:</span>
             <span>{{userDetail.desc}}</span>
             <span v-show="!userDetail.desc" class="edit-desc" @click="editDesc">编辑</span>
             <div class="edit-desc-content" v-show="isShow">
               <label>
                 <textarea cols="30" rows="2" @blur="finish" v-model="desc"></textarea>
               </label>
             </div>
           </div>
         </div>
       </div>
       <tab-control :list="['动态','关注','粉丝','收藏','专题']">
         <ul slot='动态'>
           <li v-for="(item,index) in moments" :key="item.id" class="detail-moments">
             <Moment :momentDetail="momentDetail[index]"
                     v-if="momentDetail.length!==0"
                     :key="userId">
               <div slot="delete" class="delete-moment" title="删除动态" @click="deleteMoment(item)">
                 <i class="iconfont icon-template_delete-copy"></i>
               </div>
               <!--动态内容-->
               <div slot="momentContent">
                 <div class="content">
                   <div class="state" v-if="momentDetail.length">
                     <span v-html="momentDetail[index].content">{{momentDetail.content}}</span>
                   </div>
                 </div>
               </div>
             </Moment>
           </li>
         </ul>
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
              <img :src="item.avatarUrl" />
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
export default {
  name: "userDetail",
  components: {
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
      isShow:false,
      desc:'',
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
    follow(id)
    {
      followUser(id).then(data=>{
        console.log(data);
        this.$store.dispatch({
          type:'getUserDetailAction',
          userId:this.$store.state.userMsg.userId
        })
      })
    },
    cancelFollow(id)
    {
      cancelFollow(id).then(data=>{
        console.log(data)
        this.$store.dispatch({
          type:'getUserDetailAction',
          userId:this.$store.state.userMsg.userId
        })
      })
    },
    //编辑简介
    editDesc()
    {
      if(this.userId!==this.$store.state.userMsg.userId)
      {
        this.$toast.show('您没有编辑的权限',1500);
      }
      else{
        this.isShow=!this.isShow;
      }
    },
    //编写完毕
    finish()
    {
      const isComplete=confirm("编写完毕?");
      if(isComplete)
      {
        if(!this.desc)
        {
          this.$toast.show("简介不能为空",1500);
        }
        else{
          this.isShow=false;
          setUserDesc(this.desc).then(data=>{
            this.getUserDetail(this.userId)
          })
        }
      }
    }
  },
  computed:{
    followStatus()
    {
      let flag=-1;
      if(this.$store.state.userDetail.follow!==null)
      {
          flag=this.$store.state.userDetail.follow.findIndex((item,index)=>{
          return item.id===this.userDetail.userId
        })
      }
      //console.log(flag)
      if(flag!==-1)
      {
        return true
      }
      else{
        return false
      }
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
    transform:translate(-50%,-50%);
  }
   @size:170px;
   .user-detail {
     display: flex;
     flex-wrap: wrap;
     /*左部内容*/
     .left-content{
       width: 720px;
       border-right: 1px solid #3a8ee6;
       /*头像。等信息*/
       .user-detail-header {
         margin: 0 0 30px 0;
         display: flex;
         .img-container {
           width: @size;
           height: @size;
           background-color: #f4f4f4;
           position: relative;
           overflow: hidden;
           border-radius: 8px;
           margin: 0 15px 0 0;
           img {
             .center();
             width: @size;
           }
         }
         .user-msg{
           .desc{
             margin: 20px 0 0 0;
             font-size: 13px;
             color: #9b9b9b;
             width: 500px;
             position: relative;
             line-height: 18px;
             cursor: pointer;
             .edit-desc{
               color: #3a8ee6;
             }
             //编辑简介内容
             .edit-desc-content{
               position: absolute;
               left:0;
               top:100%;
               border-radius: 5px;
               textarea{
                 outline:1px solid rgba(58, 142, 230,.3);
               }
             }
           }
           .attention{
             margin: 20px 0 0 0;
             background-color: #3a8ee6;
             color: #fff;
             padding: 3px 10px;
           }
         }
       }
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