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
             <span v-show="!userDetail.desc" class="edit-desc">编辑</span>
           </div>
         </div>
       </div>
       <tab-control :list="['动态','关注','粉丝','收藏']">
         <ul slot='动态'>
           <li v-for="(item,index) in moments" :key="item.id" class="detail-moments">
             <Moment :momentDetail="momentDetail[index]" v-if="momentDetail.length!==0">
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
           <follow/>
         </div>
         <div slot="粉丝">
           123
         </div>
         <div slot="收藏">
           <subscriber :sub="userDetail.subscribe" v-if="userDetail.subscribe" />
         </div>
       </tab-control>
     </div>
    <div class="right-content">
      右部内容
    </div>
  </div>
</template>

<script>
import TabControl from "@/components/common/tabControl/TabControl";
import {userDetail, userMoment} from "@/network/user";
import {momentDetail} from "@/network/home";
import Moment from "@/components/content/moment/Moment";
import {delMoment} from "@/network/moment";
import Follow from "@/components/content/userDetail/childCpn/follow/Follow";
import {cancelFollow, followUser} from "@/network/follow";
import Subscriber from "@/components/content/userDetail/childCpn/subscriber/Subscriber";
export default {
  name: "userDetail",
  components: {
    Subscriber,
    Moment,
    TabControl,
    Follow
  },
  data(){
    return {
      userDetail:{},
      momentDetail:[],
      moments:[],
    }
  },
  created() {
    userDetail(this.$route.query.id).then(data=>{
      console.log(data)
      this.userDetail=data
    })
    userMoment(this.$route.query.id).then(data=>{
      console.log(data.moments)
      this.moments=data.moments
      let promise=this.moments.map((item,index)=>{
        return momentDetail(item.id);
      })
      Promise.all(promise).then(data=>{
         this.momentDetail=data
        //console.log(this.momentDetail)
      })
    })
  },
  methods:{
    deleteMoment(item)
    {
      console.log(item.id)
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
           overflow: hidden;
           border-radius: 8px;
           margin: 0 15px 0 0;
           img {
             height: @size;
           }
         }
         .user-msg{
           .desc{
             margin: 20px 0 0 0;
             font-size: 13px;
             color: #9b9b9b;
             width: 500px;
            line-height: 18px;
             .edit-desc{
               color: #3a8ee6;
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
</style>