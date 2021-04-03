<template>
  <div class="other-cate">
    <p class="title" @click="detailRouter(cateDetail.name)">{{cateDetail.name}}
      <i class="iconfont icon-svgarrowsright"></i>
    </p>
    <ul class="outer">
      <li v-for="(item,index) in cateDetail.moments" :key="item.momentId">
        <div class="img-container" @click="videoRouter(item)">
          <img :src="item.picUrl[0].picUrl" :class="{active:cateDetail.name==='视频'}" />
          <div class="play" v-show="cateDetail.name==='视频'" >
            <i class="iconfont icon-play"></i>
          </div>
        </div>
        <div class="state text-nowrap">{{item.title}}</div>
        <div class="msg">
          <div class="user-msg">
            <div class="avatar">
              <img :src="item.user.avatarUrl"/>
            </div>
            <div class="user-name">{{item.user.userName}}</div>
          </div>
        </div>
      </li>
      <!--占位-->
      <li v-for="(item,index) in holder(cateDetail.moments.length,3)" style="opacity: 0">
        <div class="img-container"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
name: "OtherCate",
  props:{
    cateDetail:{
      type:Object,
      default()
      {
        return {}
      }
    }
  },
  created() {
    //console.log(this.cateDetail)
  },
  methods:{
    detailRouter(name)
    {
      console.log(name)
      switch(name)
      {
        case '视频':
          this.$router.push({
            path:'/videoCate'
          });break;
        case "图片":
          this.$router.push({
            path:'/imageCate',
            query:{
              categoryId:this.cateDetail.categoryId
            }
          });break;
        case '科技':
          this.$router.push({
            path:'/technologyCate',
            query:{
              categoryId:this.cateDetail.categoryId
            }
          })
      }
    },
    //占位
    holder(count,line)
    {
      let rem=count%line;
      if(rem===0)
      {
        return 0;
      }
      else{
        return count-rem;
      }
    },
    videoRouter(item)
    {
      if(item.type===1)
      {
        this.$router.push({
          path:'/videoDetail',
          query:{
            vid:item.vid
          }
        })
      }
     if(item.name==='图片')
     {
       this.$router.push({
         path:'/imageDetail',
         query:{
           momentId:item.momentId
         }
       })
     }
    }
  }
}
</script>

<style scoped lang="less">
  .title{
    font-weight: bold;
    font-size: 16px;
    cursor:pointer;
    margin: 30px 0 10px 0;
    i{
      font-size: 14px;
    }
  }
  .outer{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      margin: 0 0 15px 0;
    }
    .img-container{
      width: 200px;
      height: 104px;
      overflow: hidden;
      border-radius:3px;
      background-color:#333333;
      text-align: center;
      position: relative;
      img{
        height: 104px;
        transition: transform 0.3s;
      }
      .play{
        width:45px;
        height: 45px;
        background-color:rgba(255,255,255,.7);
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        border-radius: 50%;
        line-height: 45px;
        text-align: center;
        display: none;
        i{
          font-size: 30px;
          color: #3a8ee6;
        }
      }
      &:hover .play{
        display: block;
      }
      &:hover .active{
        transform: scale(1.3);
      }
    }
    /*state*/
    .state{
      font-size: 14px;
      margin: 5px 0;
      width: 200px;
    }
    /*视频信息*/
    .msg{
      .user-msg{
        display: flex;
        align-items: center;
        .avatar{
          width: 20px;
          height: 20px;
          overflow: hidden;
          position: relative;
          border-radius: 50%;
          margin: 0 5px 0 0;
          img{
            height: 20px;
            position: absolute;
            transform: translate(-50%,-50%);
            left: 50%;
            top: 50%;
          }
        }
        .user-name{
          color: #3a8ee6;
          font-size: 12px;
        }
      }
    }
  }
</style>