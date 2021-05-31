<!--为所有的list-item封装-->
<template>
  <div class="list-item">
    <!--图片-->
    <div class="img-container" :style="{height:imgContainerHeight}" :class="{active:isShowPlay}">
      <slot name="img-container"></slot>
      <div class="play" :style="{width:parseInt(imgContainerHeight)*0.4+'px',
                                 height: parseInt(imgContainerHeight)*0.4+'px',
                                 lineHeight:parseInt(imgContainerHeight)*0.4+'px'}"
                         v-show="isShowPlay">
        <i class="iconfont icon-play" :style="{fontSize:parseInt(imgContainerHeight)*0.25+'px'}"></i>
      </div>
      <div class="play-count-item" v-show="isShowTime">
        <i class="iconfont icon-play1"></i>
        <slot name="playCount"></slot>
      </div>
      <div class="dt" v-show="isShowTime">
        <slot name="dt"></slot>
      </div>
    </div>
    <!--标题-->
    <div class="state text-nowrap" :style="{width:itemWidth}" >
      <slot name="state"></slot>
    </div>
    <!--作者-->
    <div class="creator" :style="{top:creatorTop}">
      <div class="avatar">
        <slot name="avatarUrl"></slot>
      </div>
      <div class="user-name">
        <slot name="userName"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "MsgList",
  props:{
    imgContainerHeight:{
      type:String,
      default:"104px"
    },
    isShowPlay:{
      type:Boolean,
      default:true
    },
    isShowTime:{
      type:Boolean,
      default:true
    },
    itemWidth:{
      type:String,
      default:"200px"
    },
    creatorTop:{
      type:String,
      default:"86%"
    }
  }
}
</script>

<style scoped lang="less">
  @itemWidth:200px;
  .center()
  {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .list-item{
    position: relative;
  }
  .img-container{
    border-radius: 5px;
    overflow: hidden;
    background-color: #333;
    position: relative;
    width: 100%;
    img{
      .center();
      width: 100%;
      transition: transform 0.3s;
    }
    .play{
      .center();
      text-align: center;
      background-color:rgba(255,255,255,.58);
      border-radius: 50%;
      i{
        color: #3a8ee6;
      }
      display: none;
    }
      &.active:hover{
        .play{
          display: block;
        }
        img{
          transform:translate(-50%,-50%) scale(1.2);
        }
      }
    /*播放量*/
    .play-count-item{
      position: absolute;
      color: #fff;
      display: flex;
      align-items: center;
      top:5%;
      left: 100%;
      font-size: 13px;
      transform: translate(-110%,0);
      i{
        color: #fff;
      }
    }
    /*持续时间*/
    .dt{
      position: absolute;
      top: 94%;
      left:100%;
      transform: translate(-110%,-100%);
      color: #fff;
      font-size: 13px;
    }
  }
  .state{
    font-size: 14px;
    margin: 15px 0 10px 0;
  }
  .creator{
    cursor: pointer;
    display: flex;
    align-items: center;
    position: absolute;
    left: 5%;
    transform: translate(0,-100%);
    .avatar{
      width: 40px;
      height: 40px;
      overflow: hidden;
      position: relative;
      border-radius: 50%;
      background: #333;
      img{
        .center();
        height: 40px;
      }
    }
    .user-name{
      color: #3a8ee6;
      font-size: 13px;
      margin: 10px 0 0 10px;
    }
  }
</style>