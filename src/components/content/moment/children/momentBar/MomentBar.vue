<!--设置动态的点赞数，评论数，点击量-->
<template>
  <div class="moment-bar">
    <div class="time">
      <i class="iconfont icon-shijian"></i>
      {{momentDetail.updateTime.toString().substr(0,10)}}
    </div>
    <div class="views">
      <i class="iconfont icon-chakan"></i>
      <span>{{momentDetail.views}}</span>
    </div>
    <div class="thumbs">
      <i class="iconfont icon-dianzan1"></i>
      <span>{{momentDetail.thumbs}}</span>
    </div>
  </div>
</template>

<script>
export default {
name: "MomentBar",
  props:{
    momentDetail:{
      type:Object,
      default()
      {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="less">
/*点击量和时间*/
.moment-bar{
  display: flex;
  align-items: center;
  margin: 10px 0;
  .time, .views ,.thumbs{
    font-size: 14px;
    color: #9b9b9b;
    margin: 0 10px 0 0;
    display: flex;
    align-items: center;
    i{
      margin: 0 5px 0 0;
    }
  }
  .views{
    i{
      font-size: 20px;
    }
  }
  .thumbs{
    i{
      font-size: 16px;
    }
  }
}
</style>