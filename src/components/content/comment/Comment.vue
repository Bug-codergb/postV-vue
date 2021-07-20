<!--评论组件-->
<template>
  <div>
    <ul class="comments">
      <li v-for="(item,index) in comments" :key="item.commentId">
        <!--用户头像-->
        <div class="comment-avatar" @click="userRouter(item,index)">
          <img :src="item.user.avatarUrl" alt=""/>
        </div>
        <!--用户回复内容-->
        <div class="comment-content">
          <div class="user-name-outer">
            <span class="comment-user-name">{{item.user.userName}}: </span>
            <i class="iconfont icon-MoreVertical"
               @click.stop="showDel(index)"
               v-if="self.$store.state.userMsg.userId===item.user.userId">
              <span class="del" v-show="isShow&&currentIndex===index" @click="delComment(item,index,type=0,0)">
                <i class="iconfont icon-template_delete-copy"></i>
              </span>
            </i>
          </div>
          <div v-html="item.content" class="content"></div>
          <div class="comment-time">
            {{item.createTime?formatTime(item.createTime,"yyyy-MM-dd hh:mm:ss"):formatTime(item.updateTime,"yyyy-MM-dd hh:mm:ss")}}
          </div>
          <reply :replyStyle="{fontSize:'14px'}"
                 :status="status"
                 :id="item.commentId"
                 :is-show-sub="false"
                 @reply="reply($event,item)"
                 @thumb="thumb($event,item)"/>
          <!--回复评论的评论-->
          <ul class="reply-comment" v-if="item.reply">
            <li v-for="(iten,i) in item.reply"
                :key="iten.commentId">
              <div class="reply-msg">
                <!--回复人头像-->
                <div class="reply-user-msg">
                  <div class="reply-user-avatar">
                    <img class="avatar-img" :src="iten.user.avatarUrl" alt=""/>
                  </div>
                  <div class="reply-user-name">{{iten.user.userName}}: </div>
                </div>
                <!--回复内容-->
                <div v-html="iten.content" class="reply-content"></div>
              </div>
              <div class="reply-time">
                <div class="create-time">{{formatTime(iten.createTime,"yyyy-MM-dd hh:mm:ss")}}</div>
                <i class="iconfont icon-MoreVertical"
                   @click.stop="showDel(i)"
                   v-if="self.$store.state.userMsg.userId===iten.user.userId">
                <span class="del" v-show="isShow&&currentIndex===i" @click="delComment(iten,i,type=1,index)">
                  <i class="iconfont icon-template_delete-copy"></i>
                </span>
                </i>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {commentDetail, delComment, getMomentCom} from "@/network/comment";
import reply from '@/components/content/reply/Reply'
import {formatDate} from "@/utils/formatDate";
export default {
  name: "Comment",
  components:{
    reply
  },
  data()
  {
    return {
      comments:[],
      keyId:1,
      isShow:false,
      currentIndex:0,
      self:null
    }
  },
  props:{
    momentId:{
      type:String,
      default:''
    },
    status:{
      type:Number,
      default:1
    },
    commentDetail:{
      type:Array,
      default()
      {
        return []
      }
    }
  },
  created() {
    this.self=this;
    if(this.status===1)
    {
      getMomentCom(this.momentId).then(data=>{
       // console.log(data.comments);
        if(data.comments)
        {
          this.comments=data.comments;
        }
      })
    }
    else if(this.status===3){
      this.comments=this.commentDetail
    }
  },
  mounted() {
    this.$nextTick(()=>{
      document.addEventListener('click',()=>{
        this.isShow=false;
      })
    })
  },
  methods:{
    formatTime(time,ft){
      return formatDate(time,ft)
    },
    showDel(index){
      this.currentIndex=index;
      this.isShow=true;
    },
    delComment(item,index,type,i){
      //console.log(item.commentId);
      this.$message.show("确定要删除吗?").then(data=>{
        if(data){
          delComment(item.commentId).then(data=>{
            if(type===0){
              this.$delete(this.comments,index);
            }
            if(type===1){
              this.$delete(this.comments[i].reply,index);
            }
            this.$toast.show("删除成功",1500);
          })
        }
      })
    },
    //回复评论
    reply(content,item){
      const {commentId}=arguments[1];
      this.$emit("reply-comment",commentId,content);
    },
    //点赞评论
    thumb(isThumb,item){
      this.$emit('thumb-comment',isThumb,item.commentId);
    },
    userRouter(item,index){
      console.log(item);
      this.$router.push({
        path:"/userDetail",
        query:{
          id:item.user.userId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .center(){
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .del(){
    font-size: 24px;
    color: #9b9b9b;
    position: relative;
    cursor: pointer;
    &:hover{
      color: #616162;
    }
    span.del{
      cursor:pointer;
      position: absolute;
      background-color: #fff;
      font-size: 20px;
      left: 50%;
      top: 100%;
      transform: translate(-50%,0);
      padding: 5px 7px;
      box-shadow:0 0 6px rgba(0,0,0,.2);
      border-radius: 3px;
    }
  }
  .comments{
    border-top:1px solid #d8e8fa;
    padding: 30px 0 0 0;
    &>li{
      display: flex;
      margin: 0 0 10px 0;
    }
  }
.comment-user-name{
  font-size: 14px;
  color: #3a8ee6;
  margin: 0 0 10px 5px;
  font-weight: bold;
  display: block;
}
.comment-avatar{
  width: 40px;
  height:40px;
  border-radius: 50%;
  background-color:#9b9b9b ;
  overflow: hidden;
}
.comment-avatar img{
  width: 40px;
}
.comments .comment-content{
  border-bottom:1px solid rgba(0,0,0,.09);
  padding: 5px 0 5px 15px;
  font-size: 13px;
  width: 90%;
}
.comment-content{
  .user-name-outer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>i{
      .del();
    }
  }
  .content{
    color: #616162;
    line-height: 22px;
    /deep/img{
      width: 60px;
      display: block;
      margin: 5px 0;
    }
  }
}
.comments .comment-time{
  font-size: 13px;
  color: #9b9b9b;
  text-align:left;
  margin: 10px 0 0 0;
}
/*回复评论信息*/
.reply-comment {
  &>li{
    margin: 0 0 5px 0;
    padding: 5px 10px;
    .reply-msg{
      display: flex;
      align-items: flex-start;
    }
    .reply-time{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .create-time{
        font-size: 13px;
        color: #9B9B9B;
        margin: 15px 0 0 0;
      }
      &>i{
        .del();
      }
    }
    .reply-content {
      color: #616162;
    }
    .reply-user-msg {
      display: flex;
      align-items: center;
      .reply-user-avatar{
        width: 25px;
        height: 25px;
        overflow: hidden;
        position: relative;
        border: 1px solid #dddddd;
        border-radius: 50%;
        &>img.avatar-img{
          .center();
          height: 100%;
        }
      }
      .reply-user-name{
        color: #3a8ee6;
        font-size: 13px;
        font-weight: bold;
        white-space: nowrap;
        margin: 0 5px 0 15px;
      }
    }
  }
}
</style>