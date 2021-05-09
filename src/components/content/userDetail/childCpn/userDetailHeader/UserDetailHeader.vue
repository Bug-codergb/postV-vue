<template>
  <div class="user-detail-outer">
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
        <div class="chat" @click="chatRouter">
          <i class="iconfont icon-pinglun1"></i>
          <div class="tip">发私信</div>
        </div>
      </div>
  </div>
</template>

<script>
import {cancelFollow, followUser} from "@/network/follow";
import {setUserDesc} from "@/network/user";

export default {
  name: "UserDetailHeader",
  props:{
    userDetail:{
      type:Object,
      default()
      {
        return {}
      }
    }
  },
  data()
  {
    return{
      isShow:false,
      desc:'',
    }
  },
  methods:{
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
    },
    chatRouter()
    {
      this.$router.push({
        path:'/chatDetail',
        query:{
          userId:this.userDetail.userId
        }
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
.center() {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.user-detail-outer {
  @size: 170px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 30px 0;
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
  .user-msg {
    .desc {
      margin: 20px 0 0 0;
      font-size: 13px;
      color: #9b9b9b;
      width: 500px;
      position: relative;
      line-height: 18px;
      cursor: pointer;

      .edit-desc {
        color: #3a8ee6;
      }

      //编辑简介内容
      .edit-desc-content {
        position: absolute;
        left: 0;
        top: 100%;
        border-radius: 5px;

        textarea {
          outline: 1px solid rgba(58, 142, 230, .3);
        }
      }
    }
    .attention {
      margin: 20px 0 0 0;
      background-color: #3a8ee6;
      color: #fff;
      padding: 3px 10px;
    }
  }
  //聊天
  .chat{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 0 0;
    border:1px solid #3a8ee6;
    padding: 5px 0;
    border-radius: 15px;
    width: 100px;
    cursor: pointer;
    .tip{
      font-size: 14px;
      color: #9b9b9b;
      margin: 0 0 0 10px;
    }
    i{
      color: #3a8ee6;
    }
  }
}
</style>