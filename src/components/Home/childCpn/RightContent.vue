<template>
  <div class="right-content">
    <div>
      <div class="avatar">
        <i class="iconfont icon-custom-user"
           v-if="this.$store.state.loginType===0||!this.$store.state.userDetail.avatarUrl"
           title="点击上传头像"></i>
        <img :src="this.$store.state.userDetail.avatarUrl" alt="用户头像"
             v-if="this.$store.state.loginType===1&&this.$store.state.userDetail.avatarUrl"
             @click="e=>{userRouter(this.$store.state.userDetail.userId)}"/>
        <input type="file" id="inp"
               v-if="this.$store.state.loginType===1&&!this.$store.state.userDetail.avatarUrl"
               ref="avatar"
               @change="upload"/>
      </div>
      <!--未登录信息-->
      <div v-if="this.$store.state.loginType===0">
        <em>您还未登录，登陆后您可以发动态，写评论，发现更过精彩内容</em>
        <button class="login">立即登录</button>
      </div>
      <div class="loginMsg" v-if="this.$store.state.loginType===1">
        {{this.$store.state.userDetail.userName}}
      </div>
      <ul class="user-msg" v-if="this.$store.state.loginType===1">
        <li v-for="(item,index) in ['动态','关注','粉丝']">
          <div v-show="item==='动态'">{{_this.$store.state.userDetail.moments}}</div>
          <div v-show="item==='关注'">{{_this.$store.state.userDetail.follow===null? 0 : _this.$store.state.userDetail.follow.length}}</div>
          <div v-show="item==='粉丝'">{{_this.$store.state.userDetail.fans===null? 0: _this.$store.state.userDetail.fans.length}}</div>
          <div>{{item}}</div>
        </li>
      </ul>
    </div>
    <h4>推荐用户</h4>
    <ul class="recommend-user">
        <li v-for="(item,index) in recUser" :key="item.userId">
          <list-info display-style="flex">
            <div slot="img" @click="userRouter(item.userId)" class="rec-user-img-container">
              <img :src="item.avatarUrl" />
            </div>
            <div slot="state" class="rec-state">{{item.userName}}
              <div>{{item.fanCount}}个关注</div>
            </div>
            <div slot="operator" class="follow-btn">+ 关注</div>
          </list-info>
        </li>
    </ul>
    <h4>推荐动态</h4>
    <ul class="recommend-moment">
      <li v-for="(item,index) in recMoment" :key="item.momentId">
        <list-info>
          <div slot="img" v-if="item.pictures" class="recommend-pic" @click="momentRouter(item)">
            <img :src="item.pictures[0].picUrl" />
          </div>
          <div slot="state" class="recommend-moment-state text-nowrap">{{item.title}}</div>
          <div slot="operator" class="recommend-moment-creator" @click="userRouter(item.user.userId)">{{item.user.userName}}</div>
        </list-info>
      </li>
    </ul>
    <!--广告-->
    <div class="advert">
      <advert/>
    </div>
  </div>
</template>

<script>
import {recommendUser, uploadAvatar, userDetail} from "@/network/user";
import ListInfo from "@/components/common/listInfo/ListInfo";
import {recMoment} from "@/network/moment";
import Advert from "@/components/Home/childCpn/childCpn/advert/Advert";

export default {
  name: "RightContent",
  components: {Advert, ListInfo},
  data()
  {
    return {
      userDetail:{},
      _this:{},
      recUser:[],
      recMoment:[]
    }
  },
  created() {
    this._this=this;
    recommendUser().then(data=>{
     // console.log(data)
      this.recUser=data;
    })
    //推荐动态
    recMoment().then(data=>{
     // console.log(data)
      this.recMoment=data;
    })
  },
  methods:{
    upload()
    {
      console.log(this.$refs.avatar.files[0]);
      const formData=new FormData();
      formData.append('avatar',this.$refs.avatar.files[0])
      uploadAvatar(formData).then(data=>{
        console.log(data)
      })
    },
    userRouter(id)
    {
      this.$router.push({
        path:'/userDetail',
        query:{
          id
        }
      })
    },
    momentRouter(item)
    {
      this.$router.push({
        path:"/momentDetail",
        query:{
          userId:item.user.userId,
          momentId:item.momentId
        }
      })
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
    transform: translate(-50%,-50%);
  }
  .right-content{
    width: 300px;
    margin: 0 auto;
    .advert{
      margin:50px 0 0 10px;
    }
  }
  .avatar{
    background-color:rgba(58, 142, 230,.2);
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    margin: 20px auto;
    overflow: hidden;
    border-radius: 50%;
    position: relative;
    #inp{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      height: 80px;
      opacity: 0;
    }
  }
  .avatar i{
    font-size: 48px;
    color: #fff;
  }
  .avatar img{
    height: 100px;
    .center();
  }
  .right-content em{
    font-size: 13px;
    width: 260px;
    color: #989898;
    display: block;
    margin: 0 auto;
    text-align: center;
  }
  .login{
    width:200px;
    background-color: #3a8ee6;
    display: block;
    color: #fff;
    font-size: 16px;
    padding: 10px 0;
    margin: 10px auto;
  }
  .login:hover{
    background-color: #0c73c2;
    cursor: pointer;
  }
  /*用户信息*/
  .loginMsg{
    text-align: center;
  }
  .user-msg{
    display: flex;
    width: 200px;
    margin: 10px auto;
    justify-content: space-between;
  }
  .user-msg li{

  }
  .user-msg li div{
    text-align: center;
  }
  h4{
    margin: 30px 0 0 20px;
  }
  /*推荐用户信息*/
  .recommend-user{
    margin: 0 0 0 20px;
    &>li{
      margin: 10px 0;
      .rec-user-img-container{
        position: relative;
        width: 60px;
        height: 40px;
        overflow:hidden;
      }
      img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        outline: 1px solid rgba(0,0,0,.1);
      }
    }
    .rec-state{
      font-size: 13px;
      color: #595959;
      width: 100px;
    }
    .follow-btn{
      font-size: 13px;
      background-color: #ebf3fc;
      padding: 3px 5px;
      color: #3a8ee6;
      cursor:pointer;
    }
  }
  /*推荐动态信息*/
  .recommend-moment {
    margin: 20px 0 0 20px;
    li{
      margin: 0 0 15px 0;
      .recommend-pic{
        width: 60px;
        height: 40px;
        overflow: hidden;
        position: relative;
        img{
          outline:1px solid rgba(0,0,0,.1);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .recommend-moment-state{
        color: #595959;
        font-size: 13px;
        width: 158px;
      }
      .recommend-moment-creator{
        color: #3a8ee6;
        font-size: 13px;
        cursor:pointer;
      }
    }
  }
</style>