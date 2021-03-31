<template>
  <div class="admin">
    <div class="header">
      postIt论坛
    </div>
   <div class="content">
     <div class="nav-bar">
       <ul>
         <li v-for="(item,index) in list" @click="adminRouter(index)" :class="{active:currentIndex===index}">
           {{item}}
         </li>
       </ul>
     </div>
     <router-view class="routerView"/>
   </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data()
  {
    return {
      list:['动态','专题','视频','放映厅','课堂'],
      path:['/admin/moment','/admin/topic','/admin/funny','/admin/movie','/admin/knowledge'],
      currentIndex:0
    }
  },
  methods:{
    adminRouter(index)
    {
      this.currentIndex=index;
      this.$router.push({
        path:this.path[index]
      })
    }
  }
}
</script>

<style scoped lang="less">
  .header{
    height: 76px;
    width: 100%;
    background-color:#fff;
    color:#3a8ee6;
    border-bottom: 1px solid #3a8ee6;
    text-align: center;
    line-height: 76px;
  }
  .admin{
    width: 1140px;
    margin: 0 auto;
    padding: 20px 0 50px 0;
  }
  .nav-bar{
    width: 100px;
    background-color:#fff;
    margin: 10px 0 0 0;
    height: 550px;
    padding: 20px 0;
    ul{
      cursor:pointer;
      text-align: center;
      li{
        margin: 10px 0;
        &:hover{
          color: #3a8ee6;
        }
        &.active{
          color: #3a8ee6;
        }
      }
    }
  }
  .content{
    display: flex;
    .routerView{
      background-color:#fff;
      flex: 1;
      margin: 10px 0 0 10px;
      overflow-y: scroll;
      height: 550px;
      padding: 20px 0;
    }
  }
</style>