<template>
  <div class="login">
    <div v-show="this.$store.state.loginType===1">
      <ul class="user-follow">
        <li>
          <div>{{this.$store.state.userDetail.moments}}</div>
          <div>动态</div>
        </li>
        <li>
          <div>
            {{this.$store.state.userDetail.follow===null?0:this.$store.state.userDetail.follow.length}}
          </div>
          <div>关注</div>
        </li>
        <li>
          <div>{{this.$store.state.userDetail.fans===null?0:this.$store.state.userDetail.fans.length}}</div>
          <div>粉丝</div>
        </li>
      </ul>
      <div class="exit-login" @click="logout">
        <i class="iconfont icon-tuichudenglu"></i>
        退出登录
      </div>
    </div>
    <LoginCpn v-if="this.$store.state.loginType===0" class="login-cpn" @enter="enter">
      <div slot="enter" class="login-btn">
        登录
      </div>
    </LoginCpn>
  </div>
</template>

<script>
import LoginCpn from '@/components/common/loginCpn/LoginCpn'
export default {
name: "Login",
  components:{
    LoginCpn
  },
  methods:{
    logout()
    {
      window.sessionStorage.removeItem('userMsg');
      window.sessionStorage.removeItem('loginType');
      window.sessionStorage.removeItem('userDetail');
      this.$store.commit({
        type:'changeLoginType',
        loginType:0
      });
      this.$emit('changeStatus')
    },
    enter(userName,password)
    {
      this.$store.dispatch({
        type:'getUserMsgAction',
        userName,
        password
      }).then(data=>{
        if(data)
        {
          window.sessionStorage.setItem('loginType','1')
          this.$store.commit({
            type:'changeLoginType',
            loginType:1
          })
          this.$emit('changeStatus')
          if(this.$store.state.userMsg.auth===1)
          {
            this.$router.push({
              path:'/admin'
            })
          }
        }
        else{
          this.isShowErr=true;
          setTimeout(()=>{
            this.isShowErr=false
          },1500)
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login{
    position: absolute;
    top:100%;
    left: -50%;
    background-color: #fff;
    height:350px;
    width: 300px;
    z-index: 999;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0,0,0,.2);
    transform-origin:top center ;
  }
  .user-follow{
    display: flex;
    width: 250px;
    margin: 30px auto 0;
    justify-content: space-around;
    li{
      padding: 0 10px;
      div{
        text-align: center;
        &:nth-child(1)
        {
          font-size: 25px;
          color: #333333;
          font-weight: bolder;
          margin: 0 0 10px 0;
        }
        &:nth-child(2)
        {
          font-size: 12px;
          color: #666666;
        }
      }
    }
  }
  .exit-login{
    border-top: 1px solid #eeedee;
    border-bottom: 1px solid #eeedee;
    margin: 100px 0 0 0;
    font-size: 16px;
    color: #333333;
    line-height: 30px;
    padding: 15px 20px;
    i{
      font-size: 20px;
    }
    cursor:pointer;
  }
  .login-cpn{
    width: 310px;
    position: static;
    .login-btn{
      background-color: #3a8ee6;
      padding:10px 20px;
      width:180px;
      margin: 30px auto 0;
      text-align: center;
      font-size: 14px;
      color: #fff;
      &:hover{
        background-color: #0c73c2;
      }
    }
  }
</style>