<template>
  <transition name="message">
    <div class="message" v-show="isShow">
      <div class="content">{{message}}</div>
      <div class="control-btn">
        <button @click="determine">确定</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
name: "Message",
  data()
  {
    return {
      message:"暂无信息",
      isShow:false,
      isDefine:true,
      resolve:Promise.resolve.bind(Promise),
      reject:Promise.reject.bind(Promise),
    }
  },
  methods:{
    show(message)
    {
      this.isShow=true;
      this.message=message;
      const _this=this;
      return new Promise(function(resolve,reject){
          _this.resolve=resolve;
          _this.reject=reject;
      })
    },
    determine()
    {
      this.isDefine=true;
      this.resolve(this.isDefine);
      this.isShow=false;
    },
    cancel()
    {
      this.isDefine=false;
      this.resolve(this.isDefine);
      this.isShow=false;
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position:fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .message{
    .center();
    background-color: #fff;
    padding: 20px 30px;
    z-index: 9999;
    box-shadow: 0 0 15px rgba(0,0,0,.2);
    border-radius: 5px;
    .content{
      text-align: center;
      font-size: 13px;
    }
    .control-btn{
      margin: 30px 0 0 0;
      button{
        margin: 0 20px;
        padding: 3px 10px;
        font-size: 13px;
        cursor:pointer;
        &:nth-child(1)
        {
          background-color: #3a8ee6;
          color: #fff;
        }
      }
    }
  }
  .message-enter-from{
    opacity: 0;
  }
  .message-enter-active{
    opacity: 0;
    transition: opacity 0.5s;
  }
  .message-enter-to{
    opacity: 1;
  }
</style>