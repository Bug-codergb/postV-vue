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
        <!--动态回复，评论，点赞按钮-->
        <reply :id="momentDetail.momentId" v-if="isShowCom"
               @reply="reply"
               @thumb="thumb"
               @sub="sub"/>
        <!--评论回复-->
        <comment :momentId="momentDetail.momentId"
                 v-if="momentDetail&&isShowCom"
                 :key="momentDetail.momentId+momentDetail.comments.length+keyId"
                 @reply-comment="replyComment"
                 @thumb-comment="thumbComment"/>
  </div>
</template>

<script>
import reply from '@/components/content/reply/Reply';
import Tags from "@/components/content/tags/Tags"
import Comment from "@/components/content/comment/Comment";
import MomentBar from "@/components/content/moment/children/momentBar/MomentBar";
import {publishCom, replyComment} from "@/network/comment";
import {cancelThumb, thumbs} from "@/network/thumbs";
import {cancelSubMoment, subMoment} from "@/network/moment";
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
      replies:[],
      keyId:0
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
    },
    reply(content){
      publishCom(content,this.momentDetail.momentId).then(data=>{
        this.keyId+=1
        this.$toast.show("发表成功");
      })
    },
    replyComment(commentId,content){
      replyComment(content,commentId).then(data=>{
        this.keyId+=1
        this.$toast.show("回复成功");
      })
    },
    //点赞
    thumb(isThumb){
      if(!isThumb)
      {
        thumbs(this.momentDetail.momentId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
          this.$toast.show("点赞成功",3000);
        })
      }
      if(isThumb)
      {
        cancelThumb(this.momentDetail.momentId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }
    },
    //点赞评论
    thumbComment(isThumb,commentId){
      if(!isThumb)
      {
        thumbs(commentId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
          this.$toast.show("点赞成功",3000);
        })
      }
      if(isThumb)
      {
        cancelThumb(commentId).then(data=>{
          this.$store.dispatch({
            type:'getUserDetailAction',
            userId:this.$store.state.userMsg.userId
          })
        })
      }
    },
    //收藏动态
    sub(isSub){
      if(!isSub)
      {
          subMoment(this.momentDetail.momentId,this.$store.state.userMsg.userId).then(data=>{
            console.log(data)
            this.$store.dispatch({
              type:'getUserDetailAction',
              userId:this.$store.state.userMsg.userId
            })
          })
      }
      else{
          cancelSubMoment(this.momentDetail.momentId,this.$store.state.userMsg.userId).then(data=>{
            console.log(data);
            this.$store.dispatch({
              type:'getUserDetailAction',
              userId:this.$store.state.userMsg.userId
            })
          })
      }
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
  font-size: 18px;
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