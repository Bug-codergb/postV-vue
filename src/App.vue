<template>
  <div id="app">
    <router-view name="login" class="home-login"/>
    <div class="footer">
      &#169 键行键近
    </div>
  </div>
</template>
<script>
  import Login from "@/components/content/login/Login";
  import TopBar from "@/components/content/topBar/TopBar";
  export default{
    name:'app',
    components: {TopBar, Login},
    mounted() {
      this.$nextTick(()=>{
          let homeContainer=this.$refs.homeContainer;
          document.onselectstart=new Function("return false");
      })
    }
  }
</script>
<style scoped lang="less">
 @import './assets/css/base.css';
 @import './assets/font/postIt_font/iconfont.css';
 @import './assets/less/base.less';
 #app {
   /*background-color: #f6f6f6;*/
   background-image: url("./assets/img/bgc.jpg");
   background-attachment: fixed;
   background-repeat: no-repeat;
   .footer{
     width: 100%;
     height: 100px;
     background-color:rgba(12, 115, 194,.3);
     line-height: 100px;
     text-align: center;
     font-size: 16px;
     color: #fff;
   }
 }
</style>
