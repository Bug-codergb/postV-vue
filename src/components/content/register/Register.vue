<template>
  <div class="register">
    <login-cpn @enter="enter">
      <div slot="enter" class="enter">注册</div>
      <div slot="email">
        <div class="email">
          <div>邮箱</div>
          <input type="text" placeholder="请输入邮箱"/>
          <div class="verify">
            <input type="text" />
            <button>发送</button>
          </div>
        </div>
      </div>
    </login-cpn>
  </div>
</template>

<script>
import {register} from "@/network/login";
import LoginCpn from '@/components/common/loginCpn/LoginCpn'
export default {
  name: "Register",
  components: {LoginCpn},
  methods:{
    enter(userName,password)
    {
      register( userName,password).then(data=>{
        console.log(data);
        this.$router.push({
          path:'Login',
        })
      })
    }
  }
}
</script>

<style scoped>
  .register{
    width:440px;
    height: 600px;
    position: relative;
    left: 15%;
  }
  .register .enter{
    display: block;
    width: 220px;
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
</style>