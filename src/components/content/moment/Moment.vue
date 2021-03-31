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

        <!--内容-->
       <div class="content-outer">
         <!--标题-->
         <slot name="momentContent"></slot>
       </div>
        <!--标签-->
        <div class="tags" v-if="momentDetail!==undefined">
          <p v-if="momentDetail.tags!==null">标签</p>
          <ul>
            <li v-for="(it,i) in momentDetail.tags">
              <div @click="delTag(momentDetail.momentId,it.tagId)"><i class="iconfont icon-chahao"></i></div>
              {{it.tagName}}
            </li>
            <!--添加标签-->
            <Tags :moment="momentDetail"/>
          </ul>
        </div>
        <!--动态回复按钮-->
        <reply :id="momentDetail.momentId" v-if="isShowCom"/>
        <!--评论回复-->
        <comment :momentId="momentDetail.momentId" v-if="momentDetail&&isShowCom"/>
  </div>
</template>

<script>
import {deleteTag} from "@/network/tag";
import reply from '@/components/content/reply/Reply';
import Tags from "@/components/content/tags/Tags"
import {commentDetail} from "@/network/comment";
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
    delTag(momentId,tagId)
    {
      deleteTag(momentId,tagId).then(data=>{
        console.log(data)
        this.$store.dispatch({
          type:'getAllMomentsAction'
        })
      })
    },
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
.content-outer{
  display: flex;
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

/*评论*/
.tags{
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;
}
.tags >ul{
  display: flex;
}
.tags li{
  font-size: 14px;
  margin: 0 10px 0 0;
  background-color: #fff;
  padding: 5px 10px;
  color: #3a8ee6;
  border-radius: 5px;
  position: relative;
  background-color: rgba(58, 142, 230,.1);
}
.tags li:hover div{
  display: block;
}
.tags li div{
  position: absolute;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: rgba(58,142,230,.1);
  text-align: center;
  line-height: 17px;
  top: -10px;
  left:100%;
  cursor: pointer;
  transform: translateX(-100%);
  display: none;
}
.tags li div i{
  font-size: 18px;
}
.tags p{
  font-size:14px;
  margin: 0 10px 0 0;
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