<template>
  <div class="moment">
        <!--用户简略信息-->
        <div class="user-msg">
          <div class="img-container">
            <img :src="momentDetail.user.avatarUrl"
                 @click="userRouter(momentDetail.user)"/>
          </div>
          <div class="creator">
            {{momentDetail.user.name}}
          </div>

          <slot name="delete"></slot>
        </div>
        <!--标题-->
        <h3 class="moment-title">{{momentDetail.title}}</h3>
        <!--内容-->
       <div>
         <slot name="momentContent"></slot>
       </div>
       <!--发表时间和查看数,点击量，评论数-->
       <moment-bar :moment-detail="momentDetail"/>
       <!--标签-->
       <Tags :momentDetail="momentDetail"/>
        <!--动态回复按钮-->
        <reply :id="momentDetail.momentId" v-if="isShowCom"/>
        <!--评论回复-->
        <comment :momentId="momentDetail.momentId"
                 v-if="momentDetail&&isShowCom"
                 :key="momentDetail.momentId+momentDetail.comments.length"/>
  </div>
</template>

<script>
import reply from '@/components/content/reply/Reply';
import Tags from "@/components/content/tags/Tags"
import Comment from "@/components/content/comment/Comment";
import MomentBar from "@/components/content/moment/children/momentBar/MomentBar";
export default {
  name: "Moment",
  components:{
    MomentBar,
    Comment,
    reply,
    Tags
  },
  props:{
    momentDetail:{
      type:Object,
      default()
      {
        return {
          user:{}
        }
      }
    },
    user:{
      type:Object,
      default()
      {
        return {}
      }
    },
    isShowCom:{
      type:Boolean,
      default:true
    }
  },
  data()
  {
    return {
      replies:[]
    }
  },
  created() {
    //console.log(this.momentDetail)
  },
  methods:{

    userRouter(user)
    {
      console.log(this.user)
      this.$router.push({
        path:'/userDetail',
        query:{
          id:user.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
/*用户头像*/
.img-container{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #9b9b9b;
  overflow: hidden;
}
.img-container img{
  width:40px;
}
.moments{
  margin: 0 0 0 30px;
}
//动态 标题
.moment-title{
  margin: 15px 0 15px 0;
  color:#333333;
}
.moments ul.moments-content > li{
  margin: 0 0 30px 0;
  border-bottom: 1px solid #e3e3e3;
  padding: 0 0 20px 0;
}
.user-msg
{
  display: flex;
  align-items: center;
}
.creator{
  margin: 0 5px 0 10px;
  font-size: 14px;
  color: #3a8ee6;
  font-weight: bold;
}


.reply-comment{
  li{
    background-color: rgba(0,0,0,.04);
    margin: 0 0 5px 0;
    padding: 5px 0;
  }
}
.replyName{
  color: #3a8ee6;
}
</style>