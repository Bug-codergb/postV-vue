<template>
  <div class="bav-bar-control">
    <ul class="nav-list" :style="{width:listStyle.width,background:listStyle.background,height:listStyle.height}">
      <li v-for="(item,index) in list"
          :key="item.user.userId" @click="liClick(item,index)"
          :class="{active:currentIndex===index}">
        <div class="avatar" v-if="item.user.userId!==currentUser">
          <img :src="item.user.avatarUrl" />
        </div>
        <div class="user-name" v-if="item.user.userId!==currentUser">
          {{item.user.userName}}
        </div>
      </li>
    </ul>
    <div v-for="(item,index) in list" v-if="currentIndex===index" class="nav-control-content">
      <slot :name="item.user.userId"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarControl",
  props:{
    list:{
      type:Array,
      default()
      {
        return []
      }
    },
    listStyle:{
      type:Object,
      default()
      {
        return {
          width:"150px",
          background:"#89bbf0",
          height:"550px"
        }
      }
    },
    currentUser:{
      type:String,
      default:''
    }
  },
  data()
  {
    return {
      currentIndex:0
    }
  },
  methods:{
    liClick(item,index)
    {
      this.currentIndex=index;
      this.$emit("currentChat",item)
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .bav-bar-control{
    display: flex;
    align-items: flex-start;
    .nav-control-content{
      flex: 1;
    }
  }
  .nav-list{
    li{
      cursor: pointer;
      padding:5px;
      &.active{
        background-color: rgba(0,0,0,.1);
      }
      display: flex;
      align-items: center;
      .avatar{
        width: 30px;
        height: 30px;
        overflow: hidden;
        position: relative;
        border-radius: 50%;
        img{
          .center();
          height: 100%;
        }
      }
      .user-name{
        font-size: 13px;
        margin: 0 0 0 5px;
      }
    }
  }
</style>