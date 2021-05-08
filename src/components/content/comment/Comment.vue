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
          {{item.content}}
          <div class="comment-time">{{item.createTime?item.createTime.slice(0,19):item.updateTime.slice(0,19)}}</div>
          <reply :replyStyle="{fontSize:'14px'}"
                 :status="status"
                 :id="item.commentId"
                 :is-show-sub="false"/>
          <!--回复评论的评论-->
          <ul class="reply-comment" v-if="item.reply">
            <li v-for="(iten,i) in item.reply"
                :key="iten.commentId">
              <div class="replyName">{{iten.user.userName}}: </div>
              <div>{{iten.content}}</div>
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
        //console.log(data.comments);
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
  }
}
</script>

<style scoped lang="less">
/*评论用户*/
.comments li{
  display: flex;
  margin: 0 0 10px 0;
}
.comment-user-name{
  font-size: 13px;
  color: #3a8ee6;
  margin: 0 0 0 5px;
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
  padding: 5px 0 5px 10px;
  font-size: 13px;
  width: 630px;
}
.comments .comment-time{
  font-size: 13px;
  color: #9b9b9b;
  text-align:left;
  margin: 10px 0 0 0;
}
.reply-comment{
li{
  background-color: rgba(0,0,0,.03);
  margin: 0 0 5px 0;
  padding: 5px 10px;
}
}
.replyName{
  color: #3a8ee6;
  white-space: nowrap;
  margin: 0 5px 0 0;
}
</style>