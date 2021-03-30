<template>
  <div class="control-btn">
    <ul>
      <li v-show="isShow('time')">
        <i class="iconfont icon-shijian" :style="{fontSize:`${size}px`}"></i>
        <div>
          <slot name="time"></slot>
        </div>
      </li>
      <li v-show="isShow('thumb')">
        <i class="iconfont icon-dianzan1" :style="{fontSize:`${size*1.1}px`}"></i>
        <div>
          <slot name="thumb"></slot>
        </div>
      </li>
      <li v-show="isShow('comment')">
        <i class="iconfont icon-pinglun2" :style="{fontSize:`${size}px`}"></i>
        <div>
          <slot name="comment"></slot>
        </div>
      </li>
      <li v-show="isShow('sub')">
        <i class="iconfont icon-shoucang-tianchong" :style="{fontSize:`${size}px`}"></i>
        <div>
          <slot name="sub"></slot>
        </div>
      </li>
      <li v-show="isShow('view')">
        <i class="iconfont icon-chakan" :style="{fontSize:`${size*1.2}px`}"></i>
        <div>
          <slot name="view"></slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ControlBtn",
  props:{
    size:{
      type:Number,
      default:16
    },
    notShow:{
      type:String,
      default:''
    }
  },
  data()
  {
    return {
      notShowList:[]
    }
  },
  created() {
    this.notShowList=this.notShow.split(" ")
  },
  computed:{
    isShow(str)
    {
      return function(str)
      {
        /*console.log(this.notShowList)*/
        const flag=this.notShowList.findIndex((item,index)=>{
          return item===str
        })
        return flag < 0;
      }
    }
  }
}
</script>

<style scoped lang="less">
  .control-btn{
    ul{
      align-items: center;
      display: flex;
      li{
        margin: 0 5px;
        display: flex;
        align-items: center;
        i{
          color: #9ca3ab;
        }
      }
    }
  }
</style>