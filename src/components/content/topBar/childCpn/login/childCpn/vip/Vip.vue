<template>
  <div class="vip">
    <i class="iconfont icon-VIP"></i>
    <span>会员中心</span>
  </div>
</template>

<script>
export default {
name: "Vip"
}
</script>

<style scoped lang="less">
 .vip{
   padding:15px 20px;
   border-top:1px solid #eeedee;
   color: #fff;
   display: flex;
   align-items: center;
   margin: 100px 0 0 0;
   i{
     color: #333;
     font-size: 20px;
     margin: 0 5px 0 0;
   }
   span{
     font-size: 16px;
     color: #333;
   }
 }
</style>