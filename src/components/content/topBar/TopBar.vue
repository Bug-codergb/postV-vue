<!--设置头部导航条-->
<template>
  <div class="top-bar">
    <!--发表动态-->
    <transition name="moment">
      <publish-moment v-if="isShow" @changeShow="changeShow"/>
    </transition>
    <!--创作专栏-->
    <transition name="channel">
      <ChannelPublish v-if="isShowChannel" @cancel="publishChannel"/>
    </transition>
    <div class="top-bar-content">
      <div class="logo" @click="homeRouter">
        <img src="../../../assets/img/logo2.png"/>
      </div>
      <!--设置搜索框-->
      <search/>
      <!--设置用户信息-->
      <div class="user">
        <div class="avatar" @click="showLogin">
          <!--用户头像-->
          <div class="img-container" v-show="this.$store.state.loginType===1">
            <img v-if="this.$store.state.userDetail.avatarUrl" :src="this.$store.state.userDetail.avatarUrl" alt="用户头像"/>
            <i class="iconfont icon-custom-user no-avatar" v-show="!this.$store.state.userDetail.avatarUrl"></i>
          </div>
          <i class="iconfont icon-custom-user" v-show="this.$store.state.loginType===0"></i>
          <div v-show="this.$store.state.loginType===0" class="user-name">未登录</div>
          <div v-show="this.$store.state.loginType===1" class="user-name">{{ this.$store.state.userDetail.userName }}</div>
          <div class="vip" v-if="this.$store.state.userDetail.vip===1&&this.$store.state.loginType===1">vip</div>
        </div>
        <!--登录-->
        <transition name="login">
          <login v-show="isShowLogin" @changeStatus="showLogin"/>
        </transition>
      </div>
      <message/>
      <!--创作-->
      <div class="innovate" @mouseover="showInnovate" @mouseleave="hideInnovate">
        <button class="moment">创作</button>
        <transition name="innovate">
          <Innovate v-show="isShowInnovate" @publishMoment="publish" @publishChannel="publishChannel"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import PublishMoment from '@/components/content/publishMoment/PublishMoment'
import Login from "./childCpn/login/Login";
import search from './childCpn/search/Search'
import Message from "@/components/content/topBar/childCpn/massage/Message";
import Innovate from "@/components/content/topBar/childCpn/innovate/Innovate";
import ChannelPublish from "@/components/content/channelPublish/ChannelPublish";
export default {
name: "TopBar",
  data()
  {
    return {
      isShow: false,
      isShowLogin:false,
      isShowInnovate:false,
      isShowChannel:false
    }
  },
  components:{
    ChannelPublish,
    Innovate,
    Message,
    Login,
    PublishMoment,
    search
  },
  methods:{
    publish() {
      this.isShow=true
    },
    publishChannel(){
      console.log("d")
      this.isShowChannel=!this.isShowChannel;
    },
    changeShow()
    {
      this.isShow=false;
    },
    homeRouter()
    {
      this.$router.push({
        path:'/Home'
      })
    },
    showLogin()
    {
      this.isShowLogin=!this.isShowLogin
    },
    //显示创作动态，频道
    showInnovate()
    {
      this.isShowInnovate=true;
    },
    //隐藏动态，频道
    hideInnovate()
    {
      this.isShowInnovate=false;
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
.top-bar{
  margin: 0 0 5px 0;
  background-color:#fff;
}
.top-bar-content{
  width: 1180px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
}
.logo img{
  cursor:pointer;
  height: 35px;
}
//创作中心
.innovate{
  margin: 0 0 0 30px;
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  .moment{
    padding: 7px 25px;
    border-radius:3px;
    background-color:rgba(58, 142, 230,.8);
    color: #fff;
    margin: 0 0 0 40px;
    cursor:pointer;
  }
}

/*用户头像，信息*/
.user{
  position: relative;
}
.avatar{
  display: flex;
  align-items: center;
  margin: 0 0 0 80px;
  i{
    font-size: 20px;
    color: @themeColor;
  }
  .no-avatar{
    font-size:24px;
    color: #fff;
  }
  &>div{
    margin: 0 0 0 5px;
    font-size: 13px;
  }
  .img-container{
    height: 30px;
    width: 30px;
    overflow: hidden;
    border-radius: 50%;
    text-align: center;
    background-color:rgba(58, 142, 230,.2);
    position: relative;
    border: 1px solid rgba(0,0,0,.08);
    img{
      .center();
      height: 30px;

    }
  }
  .vip{
    color:#ec4141;
    padding: 2px 10px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    left:90%;
    top:-10%;
  }
}
.top-bar{
  width: 100%;
  height: 62px;
}
.user-name{
  cursor: pointer;
}
/*动态*/
.moment-enter{
  opacity: 0;
}
.moment-enter-active{
  opacity: 0;
  transition: opacity 0.3s;
}
.moment-enter-to{
  opacity: 1;
}
/*channelCateDetail*/
  .channel-enter{
    opacity: 0;
  }
  .channel-enter-active{
    opacity: 0;
    transition: opacity 0.3s;
  }
  .channel-enter-to{
    opacity: 1;
  }
/*登录*/
.login-enter{
  opacity: 0;
  transform: scale(0);
}
.login-enter-active{
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.3s ,transform 0.3s;
}
.login-enter-to{
  opacity: 1;
  transform:scale(1);
}
.login-leave-from{
  opacity: 1;
  transform: scale(1);
}
.login-leave-active{
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.3s,transform 0.3s;
}
.login-leave{
  opacity: 0;
  transform: scale(0);
}
</style>