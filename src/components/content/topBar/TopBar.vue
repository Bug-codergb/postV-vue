<!--设置头部导航条-->
<template>
  <div class="top-bar">
    <!--发表动态-->
    <transition name="moment">
      <publish-moment v-if="isShow" @changeShow="changeShow"/>
    </transition>
    <div class="top-bar-content">
      <div class="logo" @click="homeRouter">
        <img src="../../../assets/img/logo2.png"/>
      </div>
      <!--设置搜索框-->
      <search/>
      <button class="moment" @click="publish">发动态</button>
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
        </div>
        <!--登录-->
        <transition name="login">
          <login v-show="isShowLogin" @changeStatus="showLogin"/>
        </transition>
      </div>
      <message/>
    </div>
  </div>
</template>

<script>
import PublishMoment from '@/components/content/publishMoment/PublishMoment'
import Login from "./childCpn/login/Login";
import search from './childCpn/search/Search'
import Message from "@/components/content/topBar/childCpn/massage/Message";
export default {
name: "TopBar",
  data()
  {
    return {
      isShow: false,
      isShowLogin:false
    }
  },
  components:{
    Message,
    Login,
    PublishMoment,
    search
  },
  methods:{
    publish() {
      this.isShow=true
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
    }
  }
}
</script>

<style scoped lang="less">
.top-bar{
  margin: 0 0 5px 0;
  background-color:#fff;
}
.top-bar-content{
  width: 1140px;
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
.moment{
  padding: 7px 20px;
  border-radius: 8px;
  background-color: @themeColor;
  color: #fff;
  margin: 0 0 0 40px;
  cursor:pointer;
}
/*用户头像，信息*/
.user{
  position: relative;
}
.avatar{
  display: flex;
  align-items: center;
  margin: 0 0 0 50px;
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
    img{
      width: 30px;
    }
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