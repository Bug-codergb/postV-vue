<template>
  <div class="innovate-moment-channel">
    <ul>
      <li @click="publishMoment">
        <i class="iconfont icon-dongtai"></i>
        发动态
      </li>
      <li @click="publishChannel">
        <i class="iconfont icon-channel2"></i>
        专栏创作
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Innovate",
  methods:{
    publishMoment(){
      console.log("789");
      this.$emit("publishMoment")
    },
    publishChannel(){
      this.$emit('publishChannel')
    }
  }
}
</script>

<style scoped lang="less">
  .innovate-moment-channel{
    position: absolute;
    top: 100%;
    left: 65%;
    transform: translate(-50%,0);
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.12);
    ul{
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 15px 0;
      li{
        white-space: nowrap;
        margin:0 10px;
        display: flex;
        align-items: center;
        color: #757575;
        cursor:pointer;
        i{
          margin: 0 5px 0 0;
        }
        &:nth-child(1)
        {
          i{
            font-size: 25px;
          }
        }
      }
    }
  }
</style>