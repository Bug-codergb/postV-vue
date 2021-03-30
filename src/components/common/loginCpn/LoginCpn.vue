<template>
  <div class="login-cpn">
    <h1>postIt</h1>
    <slot name="transition"></slot>
    <div class="inp">
      <div class="username">
        <div>
          <span>用户名:</span>
          <span v-show="isShowName">用户名不能为空</span>
        </div>
        <input type="text" placeholder="请输入用户名" v-model="userName" @input="isShowNameTip"/>
      </div>
      <div class="password">
        <div>
          <span>密码:</span>
          <span v-show="isShowPass">密码不能为空</span>
        </div>
        <input type="text" placeholder="请输入密码" v-model="password" @input="isShowPassTip"/>
      </div>
    </div>
    <!--邮箱-->
    <slot name="email"></slot>
    <!--登录注册按钮-->
    <div @click="loginEnter">
      <slot name="enter"></slot>
    </div>
    <div class="register-outer">
      <slot name="register"></slot>
    </div>
  </div>
</template>

<script>
export default {
name: "LoginCpn",
  data()
  {
    return {
      userName:'',
      password:'',
      isShowName:false,
      isShowPass:false,
      isShowErr:false
    }
  },
  methods:{
    loginEnter()
    {
      if(this.userName===''||this.userName.trim().length===0)
      {
        this.isShowName=true
      }
      else if(this.password===''||this.password.trim().length===0)
      {
        this.isShowPass=true
      }
      if((this.userName!==''||this.userName.trim().length!==0)&&(this.password!==''||this.password.trim().length!==0))
      {
        this.$emit('enter',this.userName,this.password)
      }
    },
    isShowNameTip()
    {
      if(!this.userName||this.userName.trim().length===0)
      {
        this.isShowName=true
      }
      else{
        this.isShowName=false
      }
    },
    isShowPassTip()
    {
      if(!this.password||this.password.trim().length===0)
      {
        this.isShowPass=true
      }
      else{
        this.isShowPass=false
      }
    }
  }
}
</script>

<style scoped>
h1{
  font-size: 40px;
  text-align: center;
}
.login-cpn{
  width: 400px;
  height:500px;
  position: absolute;
  left: 60%;
  top: 10%;
  padding: 30px 20px 0 20px;
  box-shadow: 0px 0px 20px rgba(58, 142, 230,.3);
  border-radius: 5px;
  background-color: #fff;
  z-index: 99;
}
.inp{
  width: 220px;
  margin: 0 auto;
}
.username{
  margin: 50px 0 20px 0;
}
.username input,.password input{
  height: 30px;
  width: 200px;
  border: 1px solid #3a8ee6;
  padding: 0 0 0 15px;
}
.username div:nth-child(1)
{
  width: 215px;
  font-size: 14px;
  margin: 0 20px 10px 0;
  display: flex;
  justify-content: space-between;
}
.password div:nth-child(1){
  width: 215px;
  font-size: 14px;
  margin: 0 35px 10px 0;
  display: flex;
  justify-content: space-between;
}
.password div span:nth-child(2),.username div span:nth-child(2)
{
  color: #e6021d;
}

.register-outer{
  font-size: 14px;
}
.register-outer span:nth-child(1){
  margin: 0 0 0 210px;
}
.register-outer span:nth-child(2)
{
  color: #3a8ee6;
  text-decoration: underline;
  cursor: pointer;
}

.err-enter{
  opacity: 0;
}
.err-enter-active{
  transition: all 0.5s;
  opacity: 0;
  transform:translateX(-50%) scale(0);
}
.err-enter-to{
  opacity: 1;
  transform:translateX(-50%) scale(1);
}
</style>