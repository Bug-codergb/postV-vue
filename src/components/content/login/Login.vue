<template>
  <div class="login">
    <login-cpn @enter="enter">
      <!--登录用户名或者密码错误提示-->
      <transition name="err" slot="transition">
        <div v-if="isShowErr" class="user-or-pass">{{this.$store.state.response.message}}</div>
      </transition>
      <!--登录-->
      <div slot="enter">
        <button class="enter">登录</button>
      </div>
      <span slot="register">没有账号? </span>
      <span slot="register" @click="registerRouter"> 注册</span>
    </login-cpn>
  </div>
</template>

<script>
import LoginCpn from "@/components/common/loginCpn/LoginCpn";
export default {
name: "Login",
  components: {LoginCpn},
  data()
  {
    return {
      isShowErr:false
    }
  },
  methods:{
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
          if(this.$store.state.userMsg.auth===1)
          {
            this.$router.push({
              path:'/admin'
            })
          }
          else{
            this.$router.push({
              path:'/Home'
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
    },
    registerRouter()
    {
      this.$router.push({
        path:'/register',
      })
    }
  }
}
</script>

<style scoped>
.login .enter{
  display: block;
  width: 220px;
  margin:40px auto 20px;
  padding: 10px 0;
  background-color: #3a8ee6;
  color: #fff;
  cursor:pointer;
}
.login .enter:hover{
  background-color: #0c73c2;
}
/*用户名或者密码错误提示*/
.user-or-pass
{
  position: absolute;
  left: 50%;
  top:-5%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px rgba(58, 142, 230,.3) ;
  padding: 15px 20px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 8px;
  color: #e6021d;
  transform-origin: center top;
}
</style>