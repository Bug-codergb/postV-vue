<template>
  <div class="register">
    <login-cpn @enter="enter">
      <div slot="transition">
        <transition name="register">
          <div class="tip" v-show="isShowTip">{{ this.$store.state.response.message }}</div>
        </transition>
      </div>
      <div slot="enter" class="enter">注册</div>
      <div slot="captcha" class="captcha">
        <span>验证码</span>
        <div class="code">
          <input type="text" v-model="code"/>
          <img src="http://8.140.110:7876/getimgCode" alt="暂无图片" v-if="change" @click="changeCode"/>
        </div>
      </div>
    </login-cpn>
    <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_imyUMa.json"
                   background="#3a8ee6"
                   speed="1"  style="width:80%; height: 700px;"
                   loop autoplay></lottie-player>
  </div>
</template>

<script>
import {getCode, register} from "@/network/login";
import LoginCpn from '@/components/common/loginCpn/LoginCpn'
export default {
  name: "Register",
  components: {LoginCpn},
  data(){
    return {
      code:'',
      change:true,
      isShowTip:false
    }
  },
  methods:{
    enter(userName,password)
    {
      register( userName,password,this.code).then(data=>{
        this.changeCode();
        if(data){
          this.$toast.show("注册成功");
          this.$router.push({
            path:'Login',
          })
        }
        else{
          this.isShowTip=true;
          setTimeout(()=>{
            this.isShowTip=false;
          },1500)
        }
      })
    },
    changeCode(){
     getCode();
     this.change=false;
     setTimeout(()=>{
       this.change=true;
     },100)
    }
  }
}
</script>

<style scoped lang="less">
  .register{
    height: 700px;
    position: relative;
    background-color:#3a8ee6;
    /*错误信息提示*/
    .tip{
      position: absolute;
      box-shadow:0 0 10px rgba(0,0,0,.1);
      color:#dd001b;
      padding: 15px 30px;
      background-color: #fff;
      top:3%;
      left: 50%;
      transform: translate(-50%,-100%);
      border-radius: 5px;
    }
    .captcha{
      width: 257px;
      margin: 20px auto 0;
      font-size: 14px;
      .code{
        margin: 10px 0 0 0;
        display: flex;
        align-items: center;
      }
      input{
        padding: 6px;
        border: 1px solid #3a8ee6;
        width:88px;
        margin: 0 30px 0 0;
      }
    }
  }
  .register .enter{
    display: block;
    width: 257px;
    margin:40px auto 20px;
    padding: 10px 0;
    background-color: #3a8ee6;
    color: #fff;
    cursor:pointer;
    text-align: center;
    border-radius: 5px;
  }
  .register .enter:hover{
    background-color: #0c73c2;
  }
  /*邮箱*/
  .email{
    width: 220px;
    margin: 20px auto;
  }
  .email >div{
    font-size: 14px;
    margin: 0 0 10px 0;
  }
  .email input{
    height: 30px;
    width: 200px;
    border: 1px solid #3a8ee6;
    padding: 0 0 0 15px;
  }
  .email .verify{
    margin: 20px 0 0 0;
    display: flex;
    width: 150px;
    justify-content: space-between;
  }
  .email .verify button{
    padding: 5px 10px;
    font-size: 13px;
    background-color: #3a8ee6;
    color: #fff;
  }
  .verify input{
    width: 80px;
    height: 25px;
  }
  .register-enter-from{
    opacity: 0;
  }
  .register-enter-active{
    transition:opacity 0.3s;
    opacity: 0;
  }
  .register-enter-to{
    opacity: 1;
  }
  .register-leave-from{
    opacity: 1;
  }
  .register-leave-active{
    transition:opacity 1s;
    opacity: 1;
  }
  .register-leave-to{
    opacity: 0;
  }
</style>