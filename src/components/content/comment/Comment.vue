<!--评论组件-->
<template>
  <div>
    <ul class="comments">
      <li v-for="(item,index) in comments" :key="item.commentId">
        <!--用户头像-->
        <div class="comment-avatar">
          <img :src="item.user.avatarUrl" />
        </div>
        <!--用户回复内容-->
        <div class="comment-content">
          <span class="comment-user-name">{{item.user.userName}}: </span>
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
              <div class="reply-user-msg">
                <div class="reply-user-avatar">
                  <img :src="iten.user.avatarUrl" alt=""/>
                </div>
                <div class="reply-user-name">{{iten.user.userName}}: </div>
              </div>
              <div v-html="iten.content" class="reply-content"></div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {commentDetail, getMomentCom} from "@/network/comment";
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
      keyId:1
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
    if(this.status===1)
    {
      getMomentCom(this.momentId).then(data=>{
        console.log(data.comments);
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
  methods:{
    formatTime(time,ft){
      return formatDate(time,ft)
    },
    //回复评论
    reply(content,item){
      const {commentId}=arguments[1];
      this.$emit("reply-comment",commentId,content);
    },
    //点赞评论
    thumb(isThumb,item){
      this.$emit('thumb-comment',isThumb,item.commentId);
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
  .comments{
    border-top:1px solid #d8e8fa;
    padding: 30px 0 0 0;
    li{
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
  width: 630px;
}
.comment-content{
  /deep/img{
    width: 60px;
    display: block;
    margin: 5px 0;
  }
  .content{
    color: #616162;
    line-height: 22px;
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
  li {
    margin: 0 0 5px 0;
    padding: 5px 10px;
    display: flex;
    align-items: flex-start;
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
        img{
          width: 100%;
          .center();
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